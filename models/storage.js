const { Schema, model } = require('mongoose')

module.exports = model (
    "storage",
    new Schema({
        guildID: String,
        userID: String,
        storage: String,
        count: {type: Number, default: 0}
    })
)