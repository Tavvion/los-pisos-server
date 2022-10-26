const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var Schema = mongoose.Schema;


/* CITIES - BUY / SELL */
var citiesDatSchema = new Schema({
    name: String,
    slug: String,
    province: String,
    provinceSlug: String,
    region: String,
    regionSlug: String,
    number: Number
}, {collection: 'cities'})
var CitiesData = mongoose.model('CitiesData', citiesDatSchema);


/* CITIES - RENT */
var citiesDatSchemaRent = new Schema({
    name: String,
    slug: String,
    province: String,
    provinceSlug: String,
    region: String,
    regionSlug: String,
    number: Number
}, {collection: 'citiesRent'})
var CitiesDataRent = mongoose.model('CitiesDataRent', citiesDatSchemaRent);

module.exports = {CitiesData, CitiesDataRent};