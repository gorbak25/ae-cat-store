const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//These will be details for creating/reestablishing the channel
var ChannelSchema = new Schema({
    channel_id: String,
    pushAmount: Number,
    initiatorAmount: Number,
    host: String,
    port: Number
});

var Channel = mongoose.model("Channel", ChannelSchema);
module.exports = {model: Channel, schema: ChannelSchema};
