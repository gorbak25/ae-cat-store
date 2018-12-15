const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const image2base64 = require('image-to-base64');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Cat = require("../models/cat");
const Account = require("../models/account");

const appDir = path.dirname(require.main.filename);

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// DB
mongoose.connect('mongodb://localhost:27017/cats', { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection Succeeded");
});

// Authorization
function autorize(req) {
    public_key = req.get('public_key');
    signed_token = req.get('auth_token');

    if(public_key === undefined || signed_token === undefined)
        return {
            authorized: false,
            public_key: public_key
        }

    //check signature
    ///...

    return {
        authorized: true,
        public_key: public_key
    }
}

// API
// Get all cats in the store
app.get('/cats', async (req, res) => {
    const {
        authorized: authorized,
        public_key: public_key
    } = autorize(req);

    var cats = await Cat.find({}, 'name description price thumbnail', function (error, cats) {
        if (error) { console.error(error); return undefined; }
        return cats
    }).sort({_id:-1}).lean();

    if(cats === undefined) {
        res.send([]);
        return;
    }

    for(i in cats)
        cats[i]['bought'] = false;

    if(authorized) {

    }

    res.send(cats);
});

// Retrieve a high resolution picture of a bought item
app.get('/download_cat/:id', (req, res) => {
    const {
        authorized: authorized,
        public_key: public_key
    } = autorize(req);

    Cat.findById(req.params.id, 'filename', function (error, cat) {
        image2base64(path.resolve(appDir + "/../cats/" + cat.filename)).then(
            (base64_encoded_img) => {
                res.send(base64_encoded_img);
            }
        )
    });
});

app.listen(process.env.PORT || 8081);
