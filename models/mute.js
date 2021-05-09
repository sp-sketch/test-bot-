const {Schema, model} = require("mongoose")
module.exports = model(
    "mute",
    new Schema({
        guild: String,
        reason: String,
        role: String,
        user: String
    })
)