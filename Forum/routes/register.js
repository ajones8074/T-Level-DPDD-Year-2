var express = require('express');
var router = express.Router();
//Get the package for mongodb
const { MongoClient } = require("mongodb");
var CryptoJS = require('crypto-js')

//set the url for the connection with the database
const uri = "mongodb://localhost:27017/";


// Get home page
router.get('/', async function(req, res, next) {
    res.render('register');
});

router.post('/', async function(req, res, next) {
    //Connect to the database
    const client = new MongoClient(uri);

    //Select the database on the server
    const database = client.db("forum");
    //select the collection to use within the database
    const collection = database.collection("users");

    //get the new users email and password from the requests body
    //hash the passwords
    var email = req.body.email;
    var password = CryptoJS.SHA512(req.body.password).toString();
    var password_check = CryptoJS.SHA512(req.body.password_check).toString();

    //if password hashes don't match
    if(password!=password_check){
        //load register page, give message saying passwords don't match
        res.render('register',{message:"Passwords do not match"})
    }else{
        //count number of documents with email provided
        var email_check = await collection.countDocuments({
            email:email
        })
        //if the email check gives back not 0
        //i.e. email appears in db
        if(email_check!=0)
        {
            //load register page and give message that email exists
            res.render('regsiter',{message:"Email already exists"})
        }else{
            //register user account
            await collection.insertOne({
                email:email,
                password:password
            })
            //redirect them to the login page so they can now login
            res.redirect('/login');
        }
    }
    client.close();
});

module.exports = router;
