var express = require('express');
const { MongoClient } = require('mongodb');
var router = express.Router();
var mongo = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";

router.get('/', async function (req, res, next) {
    try{
    
        const client = new MongoClient(uri);
        const database = client.db('coffee');
        const collection = database.collection('products');

        const products = await collection.find().toArray();
    
        res.json(products);

        client.close();
      }catch{
        res.status(500).json({error:"Cannot find products"})
      }  
});