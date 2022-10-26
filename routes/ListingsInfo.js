const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const database = require('../final_data_slugs.json')

const ListingInfo = require('../models/ListingInfo')


// router.post('/', (req,res) => {
    
//     database.forEach((element, i) => {
//         let data = new ListingInfo({
//             buy:{
//                 name: element.name,
//                 slug: element.slug,
//                 regions: element.regions
//             },
//             rent:{
//                 name: element.name,
//                 slug: element.slug,
//                 regions: element.regions
//             }
//         })
//         data.save()

//     })
//     res.send('okey')
// })


/* Get Provinces with Number of Listings */
router.get('/provinces/:operation', (req,res) => {

    const {operation} = req.params;

    ListingInfo.find({},`${operation}.number ${operation}.slug ${operation}.name`).then(response => {
        res.send(response)
    })

})

/* Get ONLY Regions of Province with Number of Listings */
router.get('/regions/:operation/:provinceSlug', (req,res) => {

    const {operation, provinceSlug} = req.params;

    let query = operation + '.slug'
    console.log(query)

    ListingInfo.find({[query]:provinceSlug}, `${operation}.name ${operation}.slug ${operation}.number ${operation}.regions.name ${operation}.regions.slug ${operation}.regions.number`)
    .then(response => {
        res.send(response)
    })
    
})

/* Get ONLY Cities of Region with Number of Listings */
router.get('/cities/:operation/:regionSlug', (req,res) => {

    const {operation, regionSlug} = req.params

    let query = operation +'.regions.slug'
    console.log(query)
   /*  ListingInfo.aggregate([
        { $unwind: '$buy.regions'},
        { $match: { 'buy.regions.slug': regionSlug } },
    ]).then(response => {
        res.send(response)
    }) */

   /*  ListingInfo.findOne({[query]: regionSlug},  `${operation}.regions.cities`)
    .then(response => {
        res.send(response)
    })  */
    ListingInfo.aggregate([
        { $unwind: `$${operation}`},
        { $unwind: `$${operation}.regions`},
        { $match: { 'buy.regions.slug': regionSlug } },
    ]).then(response => {
        res.send(response[0][operation])
    })
})



/* Update number (buy/rent) */

/* Substract number (sell/rented) */






module.exports = router;