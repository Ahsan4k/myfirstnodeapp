const MongoClient = require('mongodb').MongoClient;
const express = require('express')
const app = express()

app.use(express.json());

app.post('/api/uploadfile/post', (req, res) => {
    if (req.files) {
        const file = req.files.file
        const filename = file.name
        file.mv('./files/' + filename, (err) => {
            if (err) {
                res.send(JSON.stringify({ success:true, message: "Sorry, the file could'nt be uploaded" }))
            }
            else {
                res.send(JSON.stringify({ success:true, message: "Success, the file was uploaded" }))
            }
        })
    }
})

app.get('/api/downloadfile/get/:filename', (req,res) => {
    const file = `${__dirname}/files/${req.params.filename}`;
    res.download(file);
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('listening to port 3000'))