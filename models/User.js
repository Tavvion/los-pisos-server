const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var Schema = mongoose.Schema;


var userDataSchema = new Schema({
    email: String,
    name: String,
    favorites: { type: Array, default: [] },
    listings: { type: Number, default: 0 },
    uid: String,
    blacklist: {type: Array, default: []},
}, {collection: 'users'})
var UserData = mongoose.model('UserData', userDataSchema);

module.exports = UserData;