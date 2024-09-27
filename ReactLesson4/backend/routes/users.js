var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");
var mongo = require('mongodb');
var CryptoJS = require('crypto-js');

const uri = "mongodb://localhost:27017";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id/email', async function(req, res, next) {
  try{
    id = req.params.id
    const client = new MongoClient(uri);
    const database = client.db("coffee");
    const collection = database.collection("users");
    const user = await collection.findOne({
      _id: new mongo.ObjectId(id)
    })
    res.json({email:user.email, fname:user.fname, sname:user.sname})
  }catch{
    res.status(500).json({error:"Not signed in"})
  }
  
});

router.post('/', async function(req, res, next) {
  const client = new MongoClient(uri);
  const database = client.db("coffee");
  const collection = database.collection("users");
  
  var fname = req.body.fname;
  var sname = req.body.sname;
  var address1 = req.body.address1;
  var address2 = req.body.address2;
  var addressCity = req.body.addressCity;
  var addressCounty = req.body.addressCounty;
  var addressCountry = req.body.addressCountry;
  var postcode = req.body.postcode;
  var email = req.body.email;
  var password = CryptoJS.SHA512(req.body.password).toString();

  var email_check = await collection.countDocuments({
    email:email
  })
  if(email_check!=0)
  {
    res.status(500).json({error:"Email Already Exists"})
  }else{
    var result = await collection.insertOne({
      fname:fname,
      sname:sname,
      address1:address1,
      address2:address2,
      addressCity:addressCity,
      addressCounty:addressCounty,
      addressCountry:addressCountry,
      postcode:postcode,
      email:email,
      password:password
    })
    res.json({cookie:result.insertedId.toString()})
  }
  client.close();
});

router.post('/login', async function(req, res, next) {
  const client = new MongoClient(uri);
  const database = client.db("coffee");
  const collection = database.collection("users");
  var email = req.body.email
  var password = CryptoJS.SHA512(req.body.password).toString();
  var numUsers = await collection.countDocuments({
    email:email,
    password:password
  })
  if(numUsers === 1)
  {
      var user = await collection.findOne({
        email:email,
        password:password
      })
      res.json({cookie:user._id})
  }else{
      res.status(500).json({error:"Email or password are not correct, please try and sign in again!"})
  }
  
})

module.exports = router;
