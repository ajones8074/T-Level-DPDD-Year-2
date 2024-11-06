var express = require('express');
const { MongoClient } = require('mongodb');
var router = express.Router();
var mongo = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";

/* Get all sites  */
router.get('/', async function (req, res, next) {
    try{
    
        const client = new MongoClient(uri);
        const database = client.db('coffee');
        const collection = database.collection('sites');

        const sites = await collection.find().toArray();
    
        res.json(sites);

        client.close();
      }catch{
        res.status(500).json({error:"Cannot find sites"})
      }  
});

/* Get specific site selected */
router.get('/:site', async function (req, res, next) {
    try {
        var siteid = req.params.site;
    
        const client = new MongoClient(uri);
        const database = client.db('coffee');
        const collection = database.collection('sites');

        const site = await collection.findOne({
          _id: new mongo.ObjectId(siteid)
        })
    
        res.json(site);
        client.close();
      } catch (error) {
        res.status(500).json({error:"Cannot find site"})
      }
})

module.exports = router;