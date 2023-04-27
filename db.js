const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("connected to mongo successfully");

    })

}
module.exports = connectToMongo;