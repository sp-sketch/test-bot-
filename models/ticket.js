const { Schema, model } = require('mongoose')

module.exports = model (
    "ticket",
    new Schema({
        guildID: String,
        userID: String,
        channelID: String,
        logchannel: String
    })
)