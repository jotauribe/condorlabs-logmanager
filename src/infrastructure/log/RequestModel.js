'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let RequestSchema = new Schema({
    response_time: Number,
    date: Date,
    parameters: String
});

export let RequestModel = mongoose.model('Requests', RequestSchema);