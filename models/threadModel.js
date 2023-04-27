const mongoose = require('mongoose');
const { Schema } = mongoose;

const ThreadsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        default: 'new thread'
    },
    threadArray: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now

    },

});

module.exports = mongoose.model('Threads', ThreadsSchema)