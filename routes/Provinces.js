const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {ProvincesData, ProvincesDataRent} = require('../models/Province')

/////////////  BUY/SELL  /////////////
/* Create provinces */
router.post('/create-province', (req,res) => {
    const {province} = req.body;
    
    let data = new ProvincesData({
        name: province,
        number: 1
    })
    data.save()
    
    res.send('recibido')
    
})
/* Get data from provinces */
router.get('/get-provinces', (req,res) => {
    ProvincesData.find().then(result => {
        res.send(result)
    })
})
/* Get data from 1 province */
router.get('/get-provinces/:province', (req,res) => {
    const {province} = req.params;
    ProvincesData.find({name:province}).then(result => {
        res.send(result)
    })
})


/////////////////  RENT  /////////////////
/* Create provinces */
router.post('/create-province-rent', (req,res) => {
    const {province} = req.body;
    
    let data = new ProvincesDataRent({
        name: province,
        number: 1
    })
    data.save()
    
    res.send('recibido')
})
/* Get data from provinces */
router.get('/get-provinces-rent', (req,res) => {
    ProvincesDataRent.find().then(result => {
        res.send(result)
    })
})
/* Get data from 1 province */
router.get('/get-provinces-rent/:province', (req,res) => {
    const {province} = req.params;
    ProvincesDataRent.find({name:province}).then(result => {
        res.send(result)
    })
})


module.exports = router;