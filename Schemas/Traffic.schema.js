const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Traffic = new Schema({
    url : String,
    sessionId: String,
    time: Date
});

module.exports = mongoose.model('Traffic', Traffic);