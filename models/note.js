const {Schema, model} = require("mongoose")
module.exports = model(
    "note",
    new Schema({
        user: String,
        amount: String
    })
)