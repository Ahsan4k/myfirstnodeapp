const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()

app.use(express.json());

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
                res.send(JSON.stringify({ status: 'News was posted' }));
            })
        })
})

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

app.post('/api/postnotes', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
            const notes = {
                term: req.body.term
                // classes:[{class:"BASIC7"},{class:"BASIC8"},{class:"BASIC9"}]
            }
            dbo.collection('lessonnotes').insertOne(notes, (err, result) => {
                if (err) {
                    res.send('error')
                    return;
                }
                db.close();
                res.send(JSON.stringify({ status: 'The account was created' }));
            })
        })
})

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

app.post('/api/examqs/post', (req, res) => {

    const url = "mongodb://localhost:27017/";

    MongoClient.connect(url,
        (err, db) => {
            if (err) throw err;
            const dbo = db.db("mydb");
            const notes = {
                class: req.body.class,
                classes: [{ grade: req.body.grade, file: req.body.file }]
            };
            dbo.collection('exams').insertOne(notes, (err, result) => {
                if (err) {
                    res.send('error')
                    return;
                }
                db.close();
                res.send(JSON.stringify({ status: 'The exam papers were created' }));
            });
        });
});

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
                res.send(JSON.stringify({ status: 'The books were entered' }));
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

app.put('/api/lessonnotes/put/:class', (req, res) => {

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
                    classes:{class:10}
                }
            },
            (err,result) => {
                if (err) throw err;
                db.close;
                res.send(req.params.class)
            }   
        )
    })
})

app.post('/api/uploadfile/post', (req, res) => {
    if (req.files) {
        const file = req.files.file
        const filename = file.name
        file.mv('./files/' + filename, (err) => {
            if (err) {
                res.send(JSON.stringify({ message: "Sorry, the file could'nt be uploaded" }))
            }
            else {
                res.send(JSON.stringify({ message: "Success, the file was uploaded" }))
            }
        })
    }
})

app.get('/api/downloadfile/get/:filename', (req,res) => {
    const file = `${__dirname}/files/${req.params.filename}`;
    res.download(file);
})

app.listen(3000, () => console.log('listening to port 3000'))