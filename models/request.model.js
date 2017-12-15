var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
    response_time: Number,
    date: Date,
    parameters: String
},
{
    versionKey:false //to not add field "_v" in json
}
);

module.exports = mongoose.model('Requests', RequestSchema);