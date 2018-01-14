var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
    response_time: Number,
    date: Date,
    parameters: String
});

module.exports = mongoose.model('Requests', RequestSchema);