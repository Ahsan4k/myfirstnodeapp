var MongoClient = require('mongodb').MongoClient;

//const url = "mongodb://localhost:27017/mydb";

const url = "mongodb+srv://ahsan123:ksingh1@cluster0.ihdsy.mongodb.net/myFirstDatabase"

 MongoClient.connect(url, (err,db) => {
    if(err,db) console.log(err);
    console.log("Database created!");
    db.close();
})