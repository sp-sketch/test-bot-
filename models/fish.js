const {Schema, model} = require("mongoose")
module.exports = model(
    "seacreatures",
    new Schema({
        user: String,
        amount: String,
        pole: String,
        polestrength: String
    })
)