const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()

app.use(express.json());

// for admin

app.post('/api/postnotes', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
            const notes = {
                term: req.body.term,
                file: req.body.file
            }
            dbo.collection('lessonnotes').insertOne(notes, (err, result) => {
                if (err) {
                    res.send('error')
                    return;
                }
                db.close();
                res.send(JSON.stringify({ success:true, status: 'The class was created' }));
            })
        })
})

// for admin : adding class
app.put('/api/lessonnotes/put/:class/:grade/:file', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url, (err, db) => {

        if (err) throw err;

        const dbo = db.db("mydb");

        dbo.collection("lessonnotes").updateOne(
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
                res.json({ success:true, message:'The class was added' })
            }   
        )
    })
})

// for admin : for deleting data
app.put('/api/admin/delete/:term/:class/:file', (req,res) => {

    const url = "mongodb://localhost:27017/";

        const grade = req.params.term
    
        MongoClient.connect(url, (err, db) => {
    
            if (err) throw err;
    
            const dbo = db.db("mydb");
            
            dbo.collection("lessonnotes").updateOne(
                 {
                    term:grade
                 },
                 {
                     $pull:{
                         classes:{class:req.params.class, file:req.params.file}
                     }
                 },
                 (err,result) => {
                    if (err) throw err;
                    db.close;
                    res.json({ success:true, status:'The class was deleted' })
                }
            )
            
        })
})

// for client

app.get('/api/lessonnotes', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
            dbo.collection('lessonnotes').find({}).toArray((err, result) => {
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