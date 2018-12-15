const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const Cat = require("../models/cat");
const Account = require("../models/account");

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// DB
mongoose.connect('mongodb://localhost:27017/cats', { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection Succeeded");
});

// API
app.get('/posts', (req, res) => {
    Cat.find({}, 'name description', function (error, cats) {
        if (error) { console.error(error); }
        res.send({
            cats: cats
        })
    }).sort({_id:-1})
})

app.listen(process.env.PORT || 8081)

