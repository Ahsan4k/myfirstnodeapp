const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()

app.use(express.json());

app.post('/api/books/post', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
            const notes = {
                book: req.body.book
            };
            dbo.collection('books').insertOne(notes, (err, result) => {
                if (err) {
                    res.send('error')
                    return;
                }
                db.close();
                res.send(JSON.stringify({ success:true, status: 'The books were entered' }));
            });
        });
})

app.get('/api/books/get', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
            dbo.collection('books').find({}).toArray((err, result) => {
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