const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const mapsDatabase = require('../utils/ultimate_data_with_areas_map.json')
const path = require('path')

router.get('/images/:idMap', (req,res) => {
    const {idMap} = req.params;
    console.log(idMap)
    
    res.sendFile(path.join(__dirname, `../utils/maps/${idMap}.svg`))

})
/* Get Map of a location (province or region) */
router.get('/getmap/:location', (req,res) => {

    const {location} = req.params;

    let _findMap = mapsDatabase.filter(element => element.slug === location)
    if(_findMap.length !==0){
        // Es provincia
        res.send(_findMap[0])
    }else{
        // Es region
        _findMap = mapsDatabase.filter(element => element.regions.some(el => el.slug === location))
        
        let _findMapFiltered = _findMap[0].regions.filter(element => element.slug === location)
        res.send(_findMapFiltered[0])        
    }

})




module.exports = router;