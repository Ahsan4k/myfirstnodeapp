var MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url,function(err,db) {
    if(err,db) console.log(err);
    console.log("Database created!");
    db.close();
})