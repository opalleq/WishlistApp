'use strict';

const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const upload = multer({ dest: 'uploads/' });

const dbPath = 'mongodb://localhost/wishlistdb';

app.use(express.static(__dirname));
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(dbPath, { useNewUrlParser: true, useCreateIndex: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
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

app.post('/', function (req, res) {
    const newItem = new Item(req.body);
    newItem.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(newItem);
    });
});

app.post('/upload', upload.single('file'), function (req, res) {
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

app.get('/id/:id', function (req, res) {
    Item.findById(req.params.id, function (err, item) {
        if (err) return res.status(500).send(err);
        res.json(item);
    })
});

app.post('/update/:id', function (req, res) {
    Item.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
        if (err) {
            res.send(err)
        }
        else {
            res.send(result)
        }
    })
})

app.delete('/:id', function (req, res) {
    Item.findByIdAndRemove(req.params.id, function (err, item) {
        if (err) return res.status(500).send(err);
        res.send('item deleted');
    });
});
