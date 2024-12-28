const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, { dbName: 'fundflow'}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB", error);
});

module.exports = { mongoose };


// const client = new MongoClient(process.env.MONGODB_URL);
// client.connect().then(() => {
//     console.log("Connected to MongoDB");
// }).catch((error) => {
//     console.log("Error connecting to MongoDB", error);
// });


// module.exports = { client };