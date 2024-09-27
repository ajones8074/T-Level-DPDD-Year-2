var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
var mongo = require('mongodb');

const uri = "mongodb://localhost:27017/";

/* GET home page */
router.get('/', async function(req, res, next) {
    var user = req.query.user;
    const client = new MongoClient(uri);
    const database = client.db("coffee");
    try{
        var basket = await database.collection("basket").findOne({
            user:user
        })
        var products = await database.collection("products").find().toArray();

        var total = 0
        var newBasket = []
        for(const item of basket.items)
        {
            for(const product of products)
            {
                if(product._id==item.item)
                {
                    newBasket.push({
                        price:product.price,
                        name:product.name,
                        quantity:item.quantity,
                        id:item.item
                    })
                    total = total + (item.quantity * product.price);
                }
            }
        }

        res.json({
            items:newBasket,
            total:total
        })
    }catch(error){
        console.log(error)
    }


});

router.post('/item', async function(req, res, next) {
    try{
        var user = req.body.user;
        var item = req.body.item;
        console.log(req.body)
        const client = new MongoClient(uri);
        const database = client.db("coffee");
        const collection = database.collection("basket");
        if(await CheckExistingBasket(user))
        {
            var basket = await collection.findOne({
                user:user
            })

            var items = basket.items;
            var newItems = []
            var itemInArray = false;
            for (const dbitem of items)
            {
                if(dbitem.item == item)
                {
                    dbitem.quantity = dbitem.quantity + 1
                    itemInArray = true;
                }
                newItems.push(dbitem)
            }

            if(itemInArray==false)
            {
                newItems.push({
                    item:item,
                    quantity:1
                })
            }

            await collection.updateOne({
                user:user
            },
            {
                "$set":{
                    items:newItems
                }
            })
        }else{
            var result = await collection.insertOne({
                user:user,
                items:[{
                    item:item,
                    quantity:1
                }]
            })
        }
        res.json({"success":1});
        client.close();
    }catch{
        res.status(500).json({message:"Could not insert item into basket"})
    }

});

router.delete('/item', async function(req, res, next) {
    const client = new MongoClient(uri);
    const database = client.db("coffee");
    const collection = database.collection("basket");
    var basket = await collection.findOne({user:req.query.user})

    var newItems = [];
    for(const item of basket.items)
    {
        if(item.item == req.query.item)
        {
            if(item.quantity>1)
            {
                newItems.push({
                    item:item.item,
                    quantity:item.quantity-1
                })
            }
        }else{
            newItems.push({
                item:item.item,
                quantity:item.quantity
            })
        }
    }

    await collection.updateOne({
        user:req.query.user
    },
    {
        "$set":{
            items:newItems
        }
    })

    res.json({"Success":1})
})

async function CheckExistingBasket(userid) {
    const client = new MongoClient(uri);
    const database = client.db("coffee");
    const collection = database.collection("basket");
    const basket = await collection.countDocuments({
        user:userid
    });
    return basket==1;
}


function findItemById(list, id) {
    return list.find((obj) => obj._id === new mongo.ObjectId(id));
}


module.exports = router;
