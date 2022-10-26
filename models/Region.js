const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

///////// BUY/SELL /////////
var regionsDataSchema = new Schema({
    name: String,
    slug: String,
    province: String,
    provinceSlug: String,
    number: Number
}, {collection: 'regions'})
var RegionsData = mongoose.model('RegionsData', regionsDataSchema);

///////// RENT /////////
var regionsDataSchemaRent = new Schema({
    name: String,
    slug: String,
    province: String,
    provinceSlug: String,
    number: Number
}, {collection: 'regionsRent'})
var RegionsDataRent = mongoose.model('RegionsDataRent', regionsDataSchemaRent);

module.exports = {RegionsData, RegionsDataRent};