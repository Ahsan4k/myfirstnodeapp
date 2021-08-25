const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url,function(err,db) {
    if(err,db) console.log(err);
    console.log("Database created!");
    const dbo = db.db("mydb");
    dbo.createCollection("sponsorpost",
    (err,res) => {
        if (err) console.log(err);
        console.log("Collection created!");
        db.close();
    }
    );
});