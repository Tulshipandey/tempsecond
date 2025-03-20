const mongoose = require("mongoose");
const config = require("../config/config");

function db() {
    mongoose.connect(config.MONGODB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });
}

module.exports = db ;