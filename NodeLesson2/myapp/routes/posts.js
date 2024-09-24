var express = require('express');
var router = express.Router();
//Get the package for mongodb
const { MongoClient } = require("mongodb");
var mongo = require('mongodb');
const { post } = require('./posts');
var functions = require('./functions');

//set the url for the connection to the database
const uri = "mongodb://localhost:27017/";


/* GET home page. */
router.post('/', async function(req, res, next) {
    //connect to the database
    const client = new MongoClient(uri);
  
    //select the database from the server
    const database = client.db("forum");
    //select the collection to use within the database
    const collection = database.collection("posts");
    
    //this line gets the title front the requests body
    //within post requests content is passed through as part of the body
    //we then do the same for the content
    var title = req.body.title;
    var content = req.body.content;

    //here we insert the data into the database
    //to do this we need to create a new javascript object
    //javascript objects are very similar to python documents
    await collection.insertOne({
        content:content,
        title:title,
        user:req.cookies.token
    })

    //redirect the user back to the home page
    res.redirect('/')
});

router.get('/:id', async function(req, res, next) {

    if(!await functions.CheckToken(req.cookies.token))
    {
        res.redirect('/login')
    }else{
        id = req.params.id

        //connect to the database
        const client = new MongoClient(uri);

        //select the database on the server
        const database = client.db("forum");
        //select the collection to use within the database
        const collection = database.collection("posts");

        //this will find just one document, based upon the ID
        //ignore the fact that "ObjectId" has a line through it
        const post = await collection.findOne({
            _id: new mongo.ObjectId(id)
        })

        var email = await functions.EmailToken(post.user);

        res.render('post',{post:{
            title:post.title,
            content:post.content,
            user: email
        }})
    }
});

router.get('/:id/comment', async function(req, res, next) {
    //connect to the database
    const client = new MongoClient(uri);

    //select the collection to use within the database
    const database = client.db("forum");
    //select the collection to use within the database
    const collection = database.collection("comments")

    //this line gets the title front the requests body
    //within post requests content is passed through as part of the body
    //we then do the same for the content
    var title = req.body.title;
    var content = req.body.content;
    var comment = req.body.comment;

    //here we insert the data into the database
    //to do this we need to create a new javascript object
    //javascript objects are very similar to python documents
    await collection.insertOne({
        content:content,
        title:title,
        comment:comment,
        user:1
    })
    res.render('post',{comment:comment})
    res.redirect('/post/'+id)
});

module.exports = router;