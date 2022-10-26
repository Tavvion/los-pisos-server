const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
var Schema = mongoose.Schema;


var paymentDataSchema = new Schema({
    data: Object,
    listingData: Object,
},{collection: 'payments'})
var PaymentData = mongoose.model('PaymentData', paymentDataSchema);

module.exports = PaymentData;