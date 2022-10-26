const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const database = require('../data_final.json')

const {CitiesData, CitiesDataRent} = require('../models/City')

////////////////////////////  BUY/SELL  ////////////////////////////
/* Create region */
router.post('/create-city', (req,res) => {
    const {city} = req.body;

    let data = new CitiesData({
        name: city,
        number: 1
    })
    data.save()

    res.send('recibido')
})
/* Get info from 1 city */
router.get('/get-cities/:city', (req,res) => {
    const {city} = req.params;
    CitiesData.find({name:city}).then(result => {
        res.send(result)
    })
})
/* Get all cities data from 1 region */
router.get('/get-cities-from-region/:province/:region', (req,res) => {
    const {province, region} = req.params;
    let _province = database.filter(element => element.nm.toLowerCase() === province.toLowerCase())[0]
    let _region = _province.regions.filter(element => element.name.toLowerCase() === region.toLowerCase())
    let _cities = _region[0].cities
    console.log(region)
    let _temp = []
    let _ref = 0;
    _cities.forEach(element => {
        CitiesData.find({name: element.name}).then(result => {
            _temp.push({
                name: element.name,
                number: result[0] === undefined ? 0 : result[0].number
            })
          
            _ref ++;
            if(_ref === _cities.length){
                res.send(_temp)
            }
        })

    })

    
})

////////////////////////////  RENT  ////////////////////////////
/* Create region */
router.post('/create-city-rent', (req,res) => {
    const {city} = req.body;

    let data = new CitiesDataRent({
        name: city,
        number: 1
    })
    data.save()

    res.send('recibido')
})
/* Get info from 1 city */
router.get('/get-cities-rent/:city', (req,res) => {
    const {city} = req.params;
    CitiesDataRent.find({name:city}).then(result => {
        res.send(result)
    })
})
/* Get all cities data from 1 region */
router.get('/get-cities-from-region-rent/:province/:region', (req,res) => {
    const {province, region} = req.params;
    let _province = database.filter(element => element.nm.toLowerCase() === province.toLowerCase())[0]
    let _region = _province.regions.filter(element => element.name.toLowerCase() === region.toLowerCase())
    let _cities = _region[0].cities
    console.log(region)
    let _temp = []
    let _ref = 0;
    _cities.forEach(element => {
        CitiesDataRent.find({name: element.name}).then(result => {
            _temp.push({
                name: element.name,
                number: result[0] === undefined ? 0 : result[0].number
            })
          
            _ref ++;
            if(_ref === _cities.length){
                res.send(_temp)
            }
        })

    })

    
})




module.exports = router;