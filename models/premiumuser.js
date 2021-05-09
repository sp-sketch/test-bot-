const {Schema, model} = require("mongoose")
module.exports = model(
    "premiumuser",
    new Schema({
        user: String
    })
)