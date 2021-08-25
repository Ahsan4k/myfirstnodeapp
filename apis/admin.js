const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()

app.use(express.json());

//signup api
app.post('/api/admin/signup', (req,res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
            const notes = {
                email: req.body.email,
                password:req.body.password
            };
            dbo.collection('admin').insertOne(notes, (err, result) => {
                if (err) {
                    res.send('error')
                    return;
                }
                db.close();
                res.send(JSON.stringify({ success: true, status: 'The account was entered' }));
            });
        });
})

// signin api
app.post('/api/admin/signin', (req,res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
                const email = req.body.email
                const password = req.body.password
            dbo.collection('admin').find({}).toArray((err, resul) => {
                const result = resul
                if (!result) {
                    console.log(result)
                    db.close();
                    res.send(JSON.stringify({ success:false, message:'Email or password is incorrect'}))
                    return
                }
                else {
                    console.log(result)
                    db.close();
                    res.send(JSON.stringify({success:true, message:'The account exists'}))
                }
            });
        });
})


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
                    const response = result
                    if (err) throw err;
                    db.close;
                    res.json({ success:true, status:'Data was Deleted'})
                }
            )
            
        })
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log('listening to port 3000'))