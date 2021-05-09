const { Schema, model } = require("mongoose");
module.exports = model(
  "used",
  new Schema({
    user: String,
    times: String
  })
);
