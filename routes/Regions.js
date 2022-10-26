const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const database = require('../pisos_slugs.json');
const {RegionsData, RegionsDataRent} = require('../models/Region')

//////////////  BUY/SELL //////////////
/* Create region */
router.post('/create-region', (req,res) => {
    const {region} = req.body;

    let data = new RegionsData({
        name: region,
        number: 1
    })
    data.save()

    res.send('recibido')
})
/* Get info from 1 region */
router.get('/get-regions/:region', (req,res) => {
    const {region} = req.params;
    console.log(region)
    RegionsData.find({name:region}).then(result => {
        res.send(result)
    })
})
/* Get all regions data from 1 province */
router.get('/get-regions-from-province/:province', async(req,res) => {
    const {province} = req.params;
    console.log(province)
    let data = database.filter(element => element.name.toLowerCase() === province.toLowerCase());
    console.log(data[0].regions)
    let temp = []
    let ref = 0;

    await data[0].regions.forEach(async(element,i) => {
        await RegionsData.find({name: element.name}).then(result => {
            /* console.log(result) */
            temp.push({
                name: element.name,
                number: result[0] === undefined ? 0 : result[0].number
            })
        })
        ref ++;
        if(ref === data[0].regions.length ){
            res.send(temp)
        }
    })

})

//////////////  RENT //////////////
/* Create region */
router.post('/create-region-rent', (req,res) => {
    const {region} = req.body;

    let data = new RegionsDataRent({
        name: region,
        number: 1
    })
    data.save()

    res.send('recibido')
})
/* Get info from 1 region */
router.get('/get-regions-rent/:region', (req,res) => {
    const {region} = req.params;
    console.log(region)
    RegionsDataRent.find({name:region}).then(result => {
        res.send(result)
    })
})
/* Get all regions data from 1 province */
router.get('/get-regions-from-province-rent/:province', async(req,res) => {
    const {province} = req.params;

    let data = database.filter(element => element.name.toLowerCase() === province.toLowerCase());
    let temp = []
    let ref = 0;

    await data[0].regions.forEach(async(element,i) => {
        await RegionsDataRent.find({name: element.name}).then(result => {
            temp.push({
                name: element.name,
                number: result[0] === undefined ? 0 : result[0].number
            })
        })
        ref ++;
        if(ref === data[0].regions.length ){
            res.send(temp)
        }
    })

})




module.exports = router;