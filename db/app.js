var MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/mydb";

 await MongoClient.connect(url, async(err,db) => {
    if(err,db) console.log(err);
    console.log("Database created!");
    db.close();
})