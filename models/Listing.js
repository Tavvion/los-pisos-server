const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var Schema = mongoose.Schema;


var listingDataSchema = new Schema({
    type: {
        type: String,
        trim: true,
        required: true
    }, 
    operation: {
        type: String,
        trim: true,
        required: true
    }, 

    province: {
        type: String,
        trim: true,
        required: true
    }, 
    provinceSlug: {
        type: String,
        trim: true,
        required: true
    }, 
    
    region: {
        type: String,
        trim: true,
        required: true
    }, 
    regionSlug: {
        type: String,
        trim: true,
        required: true
    }, 
    
    city: {
        type: String,
        trim: true,
        required: true
    }, 
    citySlug: {
        type: String,
        trim: true,
        required: true
    }, 
    
    street: {
        type: String,
        trim: true,
        required: true
    }, 
    number: {
        type: String,
        trim: true,
        required: true
    }, 
    
    lat: Number,
    lon: Number,
    geolocationData: Map,

    m2: {
        type: Number,
        requried: true
    }, 
    constructionDate: {
        type: Number,
        required: true
    }, 
    floor: {
        type: String,
        trim: true
    }, 
    door: {
        type: String,
        trim: true
    }, 
    hideInfo: Boolean,
    goodCondition: Boolean, 
    
    bedrooms: {
        type: Number,
        required: true
    }, 
    baths: {
        type: Number,
        required: true
    }, 
    
    exterior: Boolean, 
    elevator: Boolean, 
    
    terrace: Boolean,
    balcony: Boolean,
    garage: Boolean,
    furnished: Boolean,
    fittedWardrobes: Boolean,
    storageRoom: Boolean,
    heating: Boolean,
    airConditioning: Boolean,
    garden: Boolean,
    energyCertificate: Map,

    price: {
        type: Number,
        required: true
    }, 
    description: {
        type: String,
        trim: true
    }, 
    
    created: {
        type: Number,
        required: true
    },
    free: {
        type: Boolean,
        required: true
    },
    duration: Number,
    startDuration: Number,
    endTimestamp: Number,
    premium: Boolean,
    premiumDuration: Number,
    startPremium: Number,
    endPremiumTimestamp: Number,
    disabled: {
        type: Boolean, 
        default: false
    },

    mail: {
        type: String,
        trim: true,
        required: true
    }, 
    phone: {
        type: String,
        trim: true,
        required: true
    }, 
    images: Array, 
    isNew: Boolean, 
    name: {
        type: String,
        trim: true,
        required: true
    },
    uid: {
        type: String,
        trim: true,
        required: true
    }
}, {collection: 'listings'})
var ListingData = mongoose.model('ListingData', listingDataSchema);

module.exports = ListingData;