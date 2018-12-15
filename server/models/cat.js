const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CatSchema = new Schema({
    hash: String,
    name: String,
    description: String,
    price: Number,
    filename: String
});

var Cat = mongoose.model("Cat", CatSchema);
module.exports = Cat;
