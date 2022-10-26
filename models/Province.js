const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var Schema = mongoose.Schema;


/* PROVINCES - BUY / SELL */
var provincesDataSchema = new Schema({
    name: String,
    slug: String,
    number: Number,
}, {collection: 'provinces'})
var ProvincesData = mongoose.model('ProvincesData', provincesDataSchema);
/* PROVINCES - RENT */
var provincesDataSchemaRent = new Schema({
    name: String,
    slug: String,
    number: Number,
}, {collection: 'provincesRent'})
var ProvincesDataRent = mongoose.model('ProvincesDataRent', provincesDataSchemaRent);

module.exports = {ProvincesData, ProvincesDataRent};
