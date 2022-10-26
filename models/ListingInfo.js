const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var cityInfoSchema = new Schema({
    name: String,
    slug: String,
    area: String,
    number: { type: Number, default: 0 }
})
/* var CityInfo = mongoose.model('CityInfo', cityInfoSchema) */

var regionInfoSchema = new Schema({
    name: String,
    slug: String,
    number: { type: Number, default: 0 },
    cities: [cityInfoSchema]
})
/* var RegionInfo = mongoose.model('RegionInfo', regionInfoSchema) */


var listingInfoSchema = new Schema({
    buy:{
        name: String,
        slug: String,
        number: { type: Number, default: 0 },
        regions: [regionInfoSchema]
    },
    rent:{
        name: String,
        slug: String,
        number: { type: Number, default: 0 },
        regions: [regionInfoSchema]
    }
},{collection:'listingsInfo'})
var ListingInfo = mongoose.model('ListingInfo', listingInfoSchema);






module.exports = ListingInfo;