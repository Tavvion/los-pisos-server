const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var Schema = mongoose.Schema;


var messageDataSchema = new Schema({
    estateData: Map,
    messages: Array,
    users: [String]
},{collection: 'messages'})
var MessageData = mongoose.model('MessageData', messageDataSchema);

module.exports = MessageData;