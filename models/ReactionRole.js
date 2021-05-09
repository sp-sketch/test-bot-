const { Schema, model } = require("mongoose");
module.exports = model(
  "ReactionRole",
  new Schema({
    Guild: String,
    MessageID: String,
    Reaction: Array,
    Role: Array,
  })
);
