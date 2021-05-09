const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    channelid: String,
    guild: String,
});
module.exports = mongoose.model("welcome-channel", schema)