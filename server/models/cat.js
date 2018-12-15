const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CatSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    filename: String,
    thumbnail: String
});

var Cat = mongoose.model("Cat", CatSchema);
module.exports = Cat;
