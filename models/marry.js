const { Schema, model } = require("mongoose");
module.exports = model(
  "Marry",
  new Schema({
    User: String,
    MarriedUser: String,
    Marriedtimes: String,
    Divorcedtimes: String
  })
);
