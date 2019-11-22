'use strict';

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(__dirname));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useCreateIndex: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to DB.')
});

const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    pic: String
});

const Item = mongoose.model('Item', ItemSchema);

const port = process.env.PORT || 8042;

app.listen(port,
    () => console.log('Server start on port', port));

app.get('/', (req, res) => {
    Item.find({}, function (err, items) {
        if (err) return console.error(err);
        res.json(items);
    })
});

app.post('/', function(req, res) {
    const newItem = new Item(req.body);
    newItem.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(newItem);
    });
});

app.post('/upload', upload.single('file'), function(req, res) {
    const tempPath = req.file.path;
    const extension = path.extname(req.file.originalname).toLowerCase();
    const dest = './uploads/' + req.file.originalname;
    const targetPath = path.join(__dirname, dest);
    const supportedFormats = ['.jpg', '.png'];

    if (supportedFormats.includes(extension)) {
        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
            res
                .status(200)
                .contentType('text/plain')
                .end();
        });
    } else {
        fs.unlink(tempPath, err => {
            if (err) return handleError(err, res);
            res
                .status(403)
                .contentType('text/plain')
                .end('Not supported file extension.');
        });
    }
});

app.delete('/:id', function(req, res) {
    Item.findByIdAndRemove(req.params.id, function (err, item){
        if (err) return res.status(500).send(err);
        res.send('item deleted');
    });
});
