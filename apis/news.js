const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()

app.use(express.json());

// for admin

app.post('/api/addnews', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
            const news = {
                title: req.body.title,
                des: req.body.des
            }
            dbo.collection('news').insertOne(news, (err, result) => {
                if (err) {
                    res.send('error')
                    return;
                };
                db.close();
                res.send(JSON.stringify({ success:true, status: 'News was posted' }));
            })
        })
})

// for client

app.get('/api/news', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
            dbo.collection('news').find({}).toArray((err, result) => {
                if (err) {
                    res.send('error')
                    return;
                }
                db.close();
                res.send(JSON.stringify({ result }));
            })
        })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('listening to port 3000'))