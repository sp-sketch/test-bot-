const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  Channel: String,
  Guild: String,
});
module.exports = mongoose.model("logchannel", Schema);