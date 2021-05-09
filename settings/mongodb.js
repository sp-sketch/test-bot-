const MongoClient = require('mongodb').MongoClient
const mongoURI = require('../../config.json').mongoPath

MongoClient.connect(mongoURI, { useUnifiedTopology: true}, function(err, db){
    if(!err) {
        console.log(`Mongo.db is connected!`)
    } else if(err){
        throw err;
    }
})