const {Schema, model} = require("mongoose")
module.exports = model(
    "travel",
    new Schema({
        user: String,
        currentPlace: String,
        totalTraveledPlaces: String,
        job: String,
        totalMoneySpent: String,
        Time: String,
        trip: String 
    })
)