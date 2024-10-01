var express = require('express');
var router = express.Router();
//get the package for mongodb
const { MongoClient } = require("mongodb");
var functions = require('./functions');

//set the url for the connection to that database
const uri = "mongodb://localhost:27017/";


/* GET home page. */
router.get('/', async function(req, res, next) {

  if(!await functions.CheckToken(req.cookies.token))
  {
    res.redirect('/login')
  }else{
    //connect to the database
    const client = new MongoClient(uri);

    //select the database from the server
    const database = client.db("forum");
    //select the collection to use within the database
    const collection = database.collection("posts");

    //find will get the whole contents of the database
    //.toArray() converts this to an array so we can use it easily
    const posts = await collection.find().toArray();

    

    returnPosts = []
    for (const post of posts){
      console.log(post.user)
      var email = await functions.EmailToken(post.user);
      returnPosts.push({
        _id:post._id,
        title:post.title,
        content:post.content,
        user:email
      })
    }

    // go through each post and run the above line for each
    

    //return a response with the index page
    //pass it through the posts that we found
    res.render('index', { posts:returnPosts});
  }

});

module.exports = router;
