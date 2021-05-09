const { Schema, model } = require('mongoose')

module.exports = model (
    "tikcreate",
    new Schema({
        userID: String,
        phone: String,
        name: String,
        description: String
    })
)