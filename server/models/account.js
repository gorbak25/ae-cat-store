const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {schema: ChannelSchema} = require("./channel.js");

var AccountSchema = new Schema({
    public_key: String,
    channel: ChannelSchema,
    purchase_in_progres: { type: Schema.Types.ObjectId, ref: 'Cat' },
    purchases: [{ type: Schema.Types.ObjectId, ref: 'Cat' }]
});

var Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
