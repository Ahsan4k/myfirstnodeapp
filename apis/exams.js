const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()

app.use(express.json());

// for admin

app.post('/api/examqs/post', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
            const notes = {
                class: req.body.class,
                classes: [{ grade: req.body.grade, file:req.body.file }, ]
            };
            dbo.collection('exams').insertOne(notes, (err, result) => {
                if (err) {
                    res.send('error')
                    return;
                }
                db.close();
                res.send(JSON.stringify({ success:true, status: 'The exam papers were created' }));
            });
        });
});

app.put('/api/exams/put/:class/:file', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {

        if (err) throw err;

        const dbo = db.db("mydb");

        dbo.collection("exams").updateOne(
            {
                term: req.params.class
            },
            {
                $addToSet:{
                    classes:{class:req.params.grade, file:req.params.file}
                }
            },
            (err,result) => {
                if (err) throw err;
                db.close;
                res.json({ success:true, status:'File was added'  }))
            }   
        )
    })
})

// for client

app.get('/api/examqs/get', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
            dbo.collection('exams').find({}).toArray((err, result) => {
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