const {Schema, model} = require("mongoose")
module.exports = model(
    "hunted",
    new Schema({
        user: String,
        amount: String,
        rifle: String,
        riflestrength: String
    })
)