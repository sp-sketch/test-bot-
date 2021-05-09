const {Schema, model} = require("mongoose")
module.exports = model(
    "rpguser",
    new Schema({
        user: String,
        amount: String,
    })
)