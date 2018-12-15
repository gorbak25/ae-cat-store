const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var AccountSchema = new Schema({
    public_key: String,
    channel_id: String,
    purchase_in_progres: { type: Schema.Types.ObjectId, ref: 'Cat' },
    purchases: [{ type: Schema.Types.ObjectId, ref: 'Cat' }]
});

var Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
