var express = require('express');
const { MongoClient } = require('mongodb');
var router = express.Router();
var mongo = require('mongodb');

const uri = "mongodb://127.0.0.1:27017";

// localhost:3000/products/drinks - GET
router.get('/drinks', async function (req, res, next) {
	try{

		const client = new MongoClient(uri);
		const database = client.db('coffee');
		const collection = database.collection('products');
        var drinks = await collection.find({type:'drink'}).toArray();

		res.json(drinks);

		client.close();

	}catch(error){

		res.status(500).json({error:"Cannot get drinks"})

	}  
});

// localhost:3000/products/food - GET
router.get('/food', async function (req, res, next) {
	try{

		const client = new MongoClient(uri);
		const database = client.db('coffee');
		const collection = database.collection('products');
        var food = await collection.find({type:'food'}).toArray();

		res.json(food);

		client.close();

	}catch(error){

		res.status(500).json({error:"Cannot get food"})

	}  
});

module.exports = router;