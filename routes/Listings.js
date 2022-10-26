const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
require("dotenv").config()
const axios = require('axios')
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)
//const database = require('../final_data_slugs.json')


//FIXME: ALL THE REQUESTS MUST HAVE UID INSTEAD OF EMAIL
const database = require('../bigdata_ultimate_onlySlugs.json') // => only slugs

/* Models */
const ListingData = require('../models/Listing');
const { ProvincesData, ProvincesDataRent } = require('../models/Province');
const { RegionsData, RegionsDataRent } = require('../models/Region');
const { CitiesData, CitiesDataRent } = require('../models/City');
const PaymentData = require('../models/Payment')
const UserData = require('../models/User')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const paymentOptions = [
    {
        name: '2 semanas',
        price: 6.99,
        duration: 14 * 86400000 // 86400000 milliseconds per days
    },
    {
        name: '1 mes',
        price: 11.99,
        duration: 30 * 86400000
    },
    {
        name: '3 meses',
        price: 29.99,
        duration: 90 * 86400000
    },
    {
        name: '6 meses',
        price: 44.99,
        duration: 180 * 86400000
    },
]


///////// ADD PROVINCES + REGIONS + CITIES - ADMIN USE ONLY ///////// 
/* BUY/SELL */
router.post('/add-listing-info', (req,res) => {
    /* PROVINCES */
    // database.forEach(async(element) => {
    //     console.log(element)
    //     await sleep(1000)
    //     ProvincesData.find({name: element.name}).then(result => {
    //         if(result.length === 0){
    //             console.log('PROVINCE IS NOT CREATED')
    //             // PROVINCE IS NOT CREATED
    //             let temp = {
    //                 name: element.name,
    //                 slug: element.slug,
    //                 number: 0
    //             }
    //             let data = new ProvincesData(temp);
    //             data.save().then(() => {console.log('saved')})
    //         }else{
    //             console.log('PROVINCE IS ALREADY CREATED')
    //         }
    //     })
    // })


    /* REGIONS */
    /* let barcelonaProvince = provinces.filter(element => element.nm === 'barcelona')[0] */
    // database.forEach(async(element) => {
    //     await sleep(1000)
    //     if(element.regions !== undefined){
    //         element.regions.forEach(el => {
    //             RegionsData.find({name: el.name}).then(res => {
    //                 if(res.length !== 0){
    //                     // ALREADY EXISTS
    //                 }else{
    //                     // SAVE  REGION
    //                     let temp = {
    //                         name: el.name,
    //                         slug: el.slug,
    //                         province:element.name,
    //                         provinceSlug:element.slug,
    //                         number: 0
    //                     }
    //                     let data = new RegionsData(temp)
    //                     data.save().then(console.log('saved'))
    //                 }
    //             })
    //         })
    //     }
    // })

    /* CITIES */
    database.forEach(element => {
        element.regions.forEach(ele => {
            ele.cities.forEach(el => {
                CitiesData.find({name: el.name}).then(res => {
                    if(res.length !== 0){
                        // ALREADY EXISTS - NOTHING TO DO
                    }else{
                        let temp = {
                            name: el.name === 'not found' ? 'Todas las zonas' : el.name,
                            slug: el.slug,
                            province: element.name,
                            provinceSlug: element.slug,
                            region: ele.name,
                            regionSlug: ele.slug,
                            number: 0
                        }
                        let data = new CitiesData(temp)
                        data.save().then(console.log('saved'))
                    }
                })
            })
        })
       /*  if(element.cities !== undefined){
            element.regions.forEach(el => {
                RegionsData.find({name: el.name}).then(res => {
                    if(res.length !== 0){
                        // ALREADY EXISTS
                    }else{
                        // SAVE  REGION
                        let temp = {
                            name: el.name,
                            province:element.nm,
                            number: 0
                        }
                        let data = new RegionsData(temp)
                        data.save().then(console.log('saved'))
                    }
                })
            })
        } */
    })
    res.send('okey')
   
})
/* RENT */
router.post('/add-listing-info-rent', (req,res) => {
    /* PROVINCES */
    database.forEach(element => {
        console.log(element.nm)
        
        ProvincesDataRent.find({name: element.nm}).then(result => {
            if(result.length === 0){
                console.log('PROVINCE IS NOT CREATED')
                // PROVINCE IS NOT CREATED
                let temp = {
                    name: element.name,
                    slug: element.slug,
                    number: 0
                }
                let data = new ProvincesDataRent(temp);
                data.save().then(() => {console.log('saved')})
            }else{
                console.log('PROVINCE IS ALREADY CREATED')
            }
        })
    })


    /* REGIONS */
    /* let barcelonaProvince = provinces.filter(element => element.nm === 'barcelona')[0] */
    // database.forEach(element => {
    //     if(element.regions !== undefined){
    //         element.regions.forEach(el => {
    //             RegionsDataRent.find({name: el.name}).then(res => {
    //                 if(res.length !== 0){
    //                     // ALREADY EXISTS
    //                 }else{
    //                     // SAVE  REGION
    //                     let temp = {
    //                         name: el.name,
    //                         slug: el.slug,
    //                         province:element.name,
    //                         provinceSlug:element.slug,
    //                         number: 0
    //                     }
    //                     let data = new RegionsDataRent(temp)
    //                     data.save().then(console.log('saved'))
    //                 }
    //             })
    //         })
    //     }
    // })

    /* CITIES */
    // database.forEach(element => {
    //     element.regions.forEach(ele => {
    //         ele.cities.forEach(el => {
    //             CitiesDataRent.find({name: el.name}).then(res => {
    //                 if(res.length !== 0){
    //                     // ALREADY EXISTS - NOTHING TO DO
    //                 }else{
    //                     let temp = {
    //                         name: el.name === 'not found' ? 'Todas las zonas' : el.name,
    //                         slug: el.slug,
    //                         province: element.name,
    //                         provinceSlug: element.slug,
    //                         region: ele.name,
    //                         regionSlug: ele.slug,
    //                         number: 0
    //                     }
    //                     let data = new CitiesDataRent(temp)
    //                     data.save().then(console.log('saved'))
    //                 }
    //             })
    //         })
    //     })
    // })
    res.send('okey')
   
})
//////////////////////////////////////////////////////////////////////// 


/* Create listing */
router.post('/create-listing', (req,res) => {
    const {
        type, 
        operation, 

        province, 
        provinceSlug, 
        region, 
        regionSlug, 
        city, 
        citySlug, 

        street, 
        number, 
        lat,
        lon,
        geolocationData,
        constructionDate, 
        floor, 
        door, 
        hideInfo,
        goodCondition, 
        m2, 
        bedrooms, 
        baths, 
        exterior, 
        elevator, 
        price, 
        description, 
        mail, 
        phone, 
        images, 
        isNew, 
        name, 
        uid,

        terrace,
        balcony,
        garage,
        furnished,
        fittedWardrobes,
        storageRoom,
        heating,
        airConditioning,
        garden,
        energyCertificate,
    } = req.body;
    
    var item = {
        type, 
        operation, 

        province, 
        provinceSlug, 
        region, 
        regionSlug, 
        city, 
        citySlug, 

        street, 
        number, 
        lat,
        lon,
        geolocationData,
        constructionDate, 
        floor, 
        door, 
        hideInfo,
        goodCondition, 
        m2, 
        bedrooms, 
        baths, 
        exterior, 
        elevator, 
        price, 
        description, 
        mail, 
        phone, 
        images, 
        isNew, 
        name, 
        uid,
        created: new Date(),
        free: true,
        endTimestamp: 4096606703000, // year 2099
        terrace,
        balcony,
        garage,
        furnished,
        fittedWardrobes,
        storageRoom,
        heating,
        airConditioning,
        garden,
        energyCertificate,
        disabled: false
    }
    var data = new ListingData(item)
    data.save()
    console.log(provinceSlug, regionSlug, citySlug)


    // TODO: PREVENT HACKERS - MUST CHECK USER (WITH UID) TO SEE IF THERES MORE THAN 3 LISTINGS
    // IF THE USER DOESNT EXIST OR THE USER HAS MORE THAN 3 LISTINGS, RETURN.

    if(operation === 'buy'){
        /* Provinces */
        ProvincesData.find({slug: provinceSlug}).then(result => {
            let currentValue = result[0].number;
            currentValue ++;
            ProvincesData.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                regions()  
            })
        })
        /* Regions */
        const regions = () => {
            /* Regions */
            RegionsData.find({slug: regionSlug}).then(result => {
                let currentValue = result[0].number;
                currentValue ++;
                RegionsData.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                    cities()
                })
            })
        }
        /* Cities */
        const cities = () => {
            /* Cities */
            if(citySlug === 'Todas las zonas'){

            }else{
                CitiesData.find({slug: citySlug}).then(result => {
                    let currentValue = result[0].number;
                    currentValue ++;
                    CitiesData.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                       /*  res.send('recibido sin errores')  */
                    })
                })
            }
        }
    }else if(operation === 'rent'){
         /* Provinces */
         ProvincesDataRent.find({name: province}).then(result => {
            let currentValue = result[0].number;
            currentValue ++;
            ProvincesDataRent.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                regions()  
            })
        })
        /* Regions */
        const regions = () => {
            /* Regions */
            RegionsDataRent.find({name: region}).then(result => {
                let currentValue = result[0].number;
                currentValue ++;
                RegionsDataRent.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                    cities()
                })
            })
        }
        /* Cities */
        const cities = () => {
            /* Cities */
            CitiesDataRent.find({name: city}).then(result => {
                let currentValue = result[0].number;
                currentValue ++;
                CitiesDataRent.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                   /*  res.send('recibido sin errores')  */
                })
            })
        }
    }

    // Update user listings info (number of listings uploaded)
    UserData.find({/* email: mail */uid: uid}).then(response => {
        console.log(response)
        UserData.findByIdAndUpdate(response[0]._id, {listings:  response[0].listings +1}).then(resp => res.send('updated'))
    })
})


/* Delete listing */
router.post('/delete-listing', (req,res) => {
    const {id, email, uid} = req.body;

    ListingData.findById(id).then(response => {
        if(response.uid === uid){
           
            ListingData.findByIdAndDelete(id).then(() => {
                if(response.operation === 'buy'){
                    ProvincesData.findOne({name: response.province}).then(result => {
                        let _updatedNumber = result.number - 1;
                        console.log(_updatedNumber)
                        console.log(result._id)
                        ProvincesData.findByIdAndUpdate(result._id,{number: _updatedNumber}).then( () => {
                            updateRegion()
                        })
                    })
                    const updateRegion = () => {
                        RegionsData.findOne({name: response.region}).then(result => {
                            let _updatedNumber = result.number - 1;
                            console.log(_updatedNumber)
                            console.log(result._id)
                            RegionsData.findByIdAndUpdate(result._id,{number: _updatedNumber}).then( () => {
                                updateCity()
                            })
                        })
                    }
                    const updateCity = () => {
                        CitiesData.findOne({name: response.city}).then(result => {
                            let _updatedNumber = result.number - 1;
                            console.log(_updatedNumber)
                            console.log(result._id)
                            CitiesData.findByIdAndUpdate(result._id,{number: _updatedNumber}).then( () => {
                                res.send('Deleted and updated')
                            })
                        })
                    }

                }else if(response.operation === 'rent'){
                    ProvincesDataRent.findOne({name: response.province}).then(result => {
                        let _updatedNumber = result.number - 1;
                        console.log(_updatedNumber)
                        console.log(result._id)
                        ProvincesDataRent.findByIdAndUpdate(result._id,{number: _updatedNumber}).then( () => {
                            updateRegion()
                        })
                    })
                    const updateRegion = () => {
                        RegionsDataRent.findOne({name: response.region}).then(result => {
                            let _updatedNumber = result.number - 1;
                            console.log(_updatedNumber)
                            console.log(result._id)
                            RegionsDataRent.findByIdAndUpdate(result._id,{number: _updatedNumber}).then( () => {
                                updateCity()
                            })
                        })
                    }
                    const updateCity = () => {
                        CitiesDataRent.findOne({name: response.city}).then(result => {
                            let _updatedNumber = result.number - 1;
                            console.log(_updatedNumber)
                            console.log(result._id)
                            CitiesDataRent.findByIdAndUpdate(result._id,{number: _updatedNumber}).then( () => {
                                res.send('Deleted and updated')
                            })
                        })
                    }
                }


            })
           
        }else{
            res.send('user is not the owner')
        }   
    })

})
/* Disable listing */
router.post('/disable-listing', async(req,res) => {
    const {id, email, uid} = req.body;

    let listingData;

    await ListingData.findById(id).then(response => {
        listingData = response
    
    })
    console.log('Listing UID '+listingData.uid)
    if(listingData.uid !== uid){
        console.log('Access denied')
        res.send('Access denied')
        return
    }

    await ListingData.findByIdAndUpdate(id, {disabled:true}).then(response => {listingData = response})
    // update listingInfo (province, regions, city)
    ProvincesData.find({slug: listingData.provinceSlug}).then(response => {
        ProvincesData.findByIdAndUpdate(response[0]._id, {number: response[0].number - 1}).then(() => updateRegion())
    })

    const updateRegion = async() => {
        RegionsData.find({slug: listingData.regionSlug}).then(response => {
            RegionsData.findByIdAndUpdate(response[0]._id, {number: response[0].number - 1}).then(() => updateCity())
        })
    }

    const updateCity = async() => {
        if(listingData.citySlug === 'Todas las zonas'){
            res.send('updated')
        }else{
            CitiesData.find({slug: listingData.citySlug}).then(response => {
                CitiesData.findByIdAndUpdate(response[0]._id, {number: response[0].number - 1}).then(resp => res.send('updated'))
            })
        }
    }
})
/* Active listing */
router.post('/enable-listing', async(req,res) => {
    const {id, email, uid} = req.body;

    let listingData;
    await ListingData.findById(id).then(response => {listingData = response})
    console.log(uid)
    console.log('Listing UID '+listingData.uid)
    if(listingData.uid !== uid){
        console.log('Access denied')
        res.send('Access denied')
        return
    }

    await ListingData.findByIdAndUpdate(id, {disabled:false}).then(response => {listingData = response})

    // update listingInfo (province, regions, city)
    ProvincesData.find({slug: listingData.provinceSlug}).then(response => {
        ProvincesData.findByIdAndUpdate(response[0]._id, {number: response[0].number + 1}).then(() => updateRegion())
    })

    const updateRegion = async() => {
        RegionsData.find({slug: listingData.regionSlug}).then(response => {
            RegionsData.findByIdAndUpdate(response[0]._id, {number: response[0].number + 1}).then(() => updateCity())
        })
    }

    const updateCity = async() => {
        if(listingData.citySlug === 'Todas las zonas'){
            res.send('updated')
        }else{
            CitiesData.find({slug: listingData.citySlug}).then(response => {
                CitiesData.findByIdAndUpdate(response[0]._id, {number: response[0].number + 1}).then(resp => res.send('updated'))
            })
        }
    }
})



/* Listing Info with numbers */
router.get('/get-listings-info/:operation/:location', async(req,res) => {
    const {operation, location} = req.params;
    console.log(location)
    // Check if location is province or region
    let _filteredArray = database.filter(element => element.slug === location)

    // Return regions or cities with numbers
    if(_filteredArray.length !== 0){
        console.log('es una provincia')
       
        if(operation === 'buy'){
            let provinceData = await ProvincesData.find({slug: location})
    
            RegionsData.find({provinceSlug: location}).then(response => {
                res.send({data: response, locationType:'province', currentData: provinceData})
            });
            
        }else if(operation === 'rent'){
            let provinceData = await ProvincesDataRent.find({slug: location})
    
            RegionsDataRent.find({provinceSlug: location}).then(response => {
                res.send({data: response, locationType:'province', currentData: provinceData})
            });

        }

    }else{
        console.log('es una region')

        if(operation === 'buy'){
            let provinceData = await RegionsData.find({slug: location})
            console.log(provinceData)
            CitiesData.find({regionSlug: location}).then(response => {
                res.send({data: response, locationType:'region', currentData: provinceData})
            });
            
        }else if(operation === 'rent'){
            let provinceData = await RegionsDataRent.find({slug: location})
    
            CitiesData.find({regionSlug: location}).then(response => {
                res.send({data: response, locationType:'region', currentData: provinceData})
            });

        }
    }

})

/* Get listing dynamicly */
router.get('/get-listings/:operation/:location/:page', async(req,res) => {
    const {operation, location, page} = req.params;
    console.log(operation, location)
    let searchLimit = 20; // per page
    let toSkip = page * searchLimit;

    //TODO: USE .skip() after .limit (.limit().skip()) TO SKIP X NUMBER OF ITEMS (PAGINATION)
    //FIXME: WHEN A ITEM HAS NO "endTimestamp" field, at the moment, it will not appear on the response ): FIX IT

    let _filteredArray = database.filter(element => element.slug === location)
    if(_filteredArray.length !== 0){
        // ES UNA PROVINCIA

        console.log('es provincia')
        ListingData.find({provinceSlug: location, disabled: false, endTimestamp: {$gte: Date.now()}}).select("-uid").limit(searchLimit).skip(toSkip).then(response => {
            res.send({response, locationType: 'province'})
        })    
    }else{
        let _filtArray = database.filter(element => element.regions.some(el => el.slug === location))
        if(_filtArray.length !== 0){
            // ES UNA REGION
            console.log('es una region')
            ListingData.find({regionSlug: location, disabled: false, endTimestamp: {$gte: Date.now()}}).select("-uid").limit(searchLimit).skip(toSkip).then(response => {
                res.send({response, locationType: 'region'})
            })    
            
        }else{
            // ES UNA CIUDAD
            console.log('es ciudad')
            let count = await ListingData.countDocuments({citySlug: location, disabled: false, endTimestamp: {$gte: Date.now()}})

            ListingData.find({citySlug: location, disabled: false, endTimestamp: {$gte: Date.now()}}).select("-uid").limit(searchLimit).skip(toSkip).then(response => {
                res.send({response, locationType: 'city', count})
            })    
        }
    }


    


})

// /* Get user listings */
router.get('/get-listings/:user', (req,res) => {
    const {user} = req.params;

    ListingData.find({mail: user}).select("-uid").then(response => {
        return res.send(response);
    })
})
// /* Get user listings number */
router.get('/get-listings-number/:user', (req,res) => {
    const {user} = req.params;

    UserData.find({email: user}).then(response => {
        console.log(response[0].listings)
        res.send({number: response[0].listings})
    })
})

// /* Get listings with multiple filters (province, region and city REQUIRED)*/
router.get('/get-listings-filter-long/:operation/:province/:region/:city/:query/:page', async(req,res) => {
    const {operation, province, region, city, query, page} = req.params;
    console.log('page -> '+page)
    let searchLimit = 20; // per page
    let toSkip = page * 20;


    console.log(operation)
    console.log(province)
    console.log(region)
    console.log(city)
    console.log(query)
    console.log('LONG QUERY SEARCH')
    console.log('Query -> ' + query)
    let _cleanOperation = operation;
    
    const queryBigArray = query.split('&')

    /* Query and value */
    const queryLargeArray = []
    /* Only queries, for verification */
    const queryArray = []
    
    let minPrice;
    let maxPrice;
    let minSize;
    let maxSize;

    let hasOrderSort = false;
    let order;

    let hasFeatures = false;
    let features = []

    for(let i = 0; i<queryBigArray.length; i++){
        
        if(query.split('&')[i].split('=')[0] === 'type'){
            queryLargeArray.push({
                "type": query.split('&')[i].split('=')[1]
            })
        }
        if(query.split('&')[i].split('=')[0] === 'minPrice'){
            queryLargeArray.push({
                "minPrice": Number(query.split('&')[i].split('=')[1])
            })
            minPrice = Number(query.split('&')[i].split('=')[1])
        }
        if(query.split('&')[i].split('=')[0] === 'maxPrice'){
            queryLargeArray.push({
                "maxPrice": Number(query.split('&')[i].split('=')[1])
            })
            maxPrice = Number(query.split('&')[i].split('=')[1])
        }
        if(query.split('&')[i].split('=')[0] === 'minSize'){
            queryLargeArray.push({
                "minSize": Number(query.split('&')[i].split('=')[1])
            })
            minSize = Number(query.split('&')[i].split('=')[1])
        }
        if(query.split('&')[i].split('=')[0] === 'maxSize'){
            queryLargeArray.push({
                "maxSize": Number(query.split('&')[i].split('=')[1])
            })
            maxSize = Number(query.split('&')[i].split('=')[1])
        }
        if(query.split('&')[i].split('=')[0] === 'bedrooms'){
            queryLargeArray.push({
                "bedrooms": Number(query.split('&')[i].split('=')[1])
            })
        }
        if(query.split('&')[i].split('=')[0] === 'baths'){
            queryLargeArray.push({
                "baths": Number(query.split('&')[i].split('=')[1])
            })
        }
        if(query.split('&')[i].split('=')[0] === 'condition'){
            queryLargeArray.push({
                "goodCondition": query.split('&')[i].split('=')[1] === 'good' ? true : false
            })
        }
        if(query.split('&')[i].split('=')[0] === 'features'){
            hasFeatures = true;
            features = query.split('&')[i].split('=')[1].split('+')
        }
        
        



        if(query.split('&')[i].split('=')[0] === 'order'){
            hasOrderSort = true;
            order = query.split('&')[i].split('=')[1]
        }

        queryArray.push(query.split('&')[i].split('=')[0])
    }
    console.log(queryLargeArray)
    let isDoublePriceQuery;
    let isDoubleSizeQuery;

    if(queryArray.includes('minPrice') && queryArray.includes('maxPrice')){
        /* INCLUDES MINPRICE AND MAXPRICE */
        isDoublePriceQuery = true;
    }else{
        /* ONLY INCLUDES ONE PRICE QUERY */
        isDoublePriceQuery = false;
    }
    if(queryArray.includes('minSize') && queryArray.includes('maxSize')){
        /* INCLUDES MINSIZE AND MAXSIZE */
        isDoubleSizeQuery = true;
    }else{
        /* ONLY INCLUDES ONE SIZE QUERY */
        isDoubleSizeQuery = false;
    }


   
    const finalQueryArray = [
        {operation: _cleanOperation},
        {provinceSlug: province},
        {regionSlug: region},
        {citySlug: city},
        {endTimestamp: {$gte: Date.now()}},
        {disabled:false}
    ]


    if(isDoublePriceQuery){
        finalQueryArray.push({price: { $gt: minPrice , $lt: maxPrice}})
    }
    if(isDoubleSizeQuery){
        finalQueryArray.push({size: { $gt: minSize , $lt: maxSize}})
    }


    for(let i = 0; i<queryLargeArray.length; i++){
        if((Object.keys(queryLargeArray[i])[0] === 'minPrice' || Object.keys(queryLargeArray[i])[0] === 'maxPrice') && isDoublePriceQuery){
           
        }else{
            if(Object.keys(queryLargeArray[i])[0] === 'minPrice'){
                finalQueryArray.push({price: {$gte: queryLargeArray[i].minPrice}})
            }else if(Object.keys(queryLargeArray[i])[0] === 'maxPrice'){
                finalQueryArray.push({price: {$lte: queryLargeArray[i].maxPrice}})
            }else if(Object.keys(queryLargeArray[i])[0] === 'minSize'){
                finalQueryArray.push({m2: {$gte: queryLargeArray[i].minSize}})
            }else if(Object.keys(queryLargeArray[i])[0] === 'maxSize'){
                finalQueryArray.push({m2: {$lte: queryLargeArray[i].maxSize}})
            }else if(Object.keys(queryLargeArray[i])[0] === 'bedrooms'){
                finalQueryArray.push({bedrooms: {$gte: queryLargeArray[i].bedrooms}})
            }else if(Object.keys(queryLargeArray[i])[0] === 'baths'){
                finalQueryArray.push({baths: {$gte: queryLargeArray[i].baths}})
            }
            
            else{
                finalQueryArray.push(queryLargeArray[i])
            }
        }
    }

    if(hasFeatures){
        features.forEach(element => {
            if(element === 'aire_acondicionado'){
                finalQueryArray.push({airConditioning: true})
            }else if(element === 'armarios_empotrados'){
                finalQueryArray.push({fittedWardrobes: true})
            }else if(element === 'ascensor'){
                finalQueryArray.push({elevator: true})
            }else if(element === 'garaje'){
                finalQueryArray.push({garage: true})
            }else if(element === 'jardín'){
                finalQueryArray.push({garden: true})
            }else if(element === 'terraza'){
                finalQueryArray.push({terrace: true})
            }else if(element === 'trastero'){
                finalQueryArray.push({storageRoom: true})
            }
        })

        
    }
    console.log(finalQueryArray)

    if(hasOrderSort){
        if(order === 'ascending'){
            ListingData.find({
                $and: finalQueryArray
            }).select("-uid").sort({price:1}).limit(searchLimit).skip(toSkip).then(response => {
                console.log(response)
               return res.send(response);
            })
        }else{
            ListingData.find({
                $and: finalQueryArray
            }).select("-uid").sort({price:-1}).limit(searchLimit).skip(toSkip).then(response => {
                console.log(response)
               return res.send(response);
            })
        }
    }else{
        let count = await ListingData.countDocuments({$and: finalQueryArray})

        ListingData.find({
            $and: finalQueryArray
        }).select("-uid").limit(searchLimit).skip(toSkip).then(async(response) => {
            return res.send({response, count});
        })
    }

})
// /* Get only 1 listing */
router.get('/get-listing/:id', (req,res) => {
    const {id} = req.params;

    try {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            // it's an ObjectID   
            console.log('es un id válido') 
            ListingData.findById(id).select('-number').then(response => res.send(response))
        } else {
            // nope 
            console.log('no es un id válido')   
            res.send('error')
        }



    } catch (error) {
        console.log(error)
        res.send('error')
    }
})


/* Listing Payment */
router.post('/payment', async(req,res) => {
    let {amount, id, listingData} = req.body;

    let planFiltered = paymentOptions.filter(plan => plan.price*100 === amount)[0];

    try {
        const payment = await stripe.paymentIntents.create({
            amount: planFiltered.price*100,
            currency: "EUR",
            description: planFiltered.name,
            payment_method: id,
            confirm: true
        })
        console.log("Payment",payment)

        let {
            type, 
            operation, 

            province, 
            provinceSlug, 
            region, 
            regionSlug, 
            city, 
            citySlug, 

            street, 
            number, 
            lat,
            lon,
            geolocationData,
            constructionDate, 
            floor, 
            door, 
            hideInfo,
            goodCondition, 
            m2, 
            bedrooms, 
            baths, 
            exterior, 
            elevator, 
            price, 
            description, 
            mail, 
            phone, 
            images, 
            isNew, 
            name, 
            uid,

            terrace,
            balcony,
            garage,
            furnished,
            fittedWardrobes,
            storageRoom,
            heating,
            airConditioning,
            garden,
            energyCertificate,
        } = listingData;

        var item = {
            type, 
            operation, 
    
            province, 
            provinceSlug, 
            region, 
            regionSlug, 
            city, 
            citySlug, 
    
            street, 
            number, 
            lat,
            lon,
            geolocationData,
            constructionDate, 
            floor, 
            door, 
            hideInfo,
            goodCondition, 
            m2, 
            bedrooms, 
            baths, 
            exterior, 
            elevator, 
            price, 
            description, 
            mail, 
            phone, 
            images, 
            isNew, 
            name, 
            uid,

            created: Date.now(),
            free: false,

            duration: planFiltered.duration,
            startDuration: Date.now(),
            endTimestamp: Date.now() + planFiltered.duration,
            premium: false,

            terrace,
            balcony,
            garage,
            furnished,
            fittedWardrobes,
            storageRoom,
            heating,
            airConditioning,
            garden,
            energyCertificate,
            disabled: false
        }
        console.log(item)
        var data = new ListingData(item)
        data.save()

        var _payment = new PaymentData({data: payment, listingData: item })
        _payment.save()
   
        if(operation === 'buy'){
            /* BUY SELL */
   
            /* Provinces */
            ProvincesData.find({slug: provinceSlug}).then(result => {
                let currentValue = result[0].number;
                currentValue ++;
                ProvincesData.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                    regions()  
                })
            })
            /* Regions */
            const regions = () => {
                /* Regions */
                RegionsData.find({slug: regionSlug}).then(result => {
                    let currentValue = result[0].number;
                    currentValue ++;
                    RegionsData.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                        cities()
                    })
                })
            }
            /* Cities */
            const cities = () => {
                /* Cities */
                if(citySlug === 'Todas las zonas'){
    
                }else{
                    CitiesData.find({slug: citySlug}).then(result => {
                        let currentValue = result[0].number;
                        currentValue ++;
                        CitiesData.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                        })
                    })
                }
            }
        }else if(operation === 'rent'){
                /* Provinces */
                ProvincesDataRent.find({name: province}).then(result => {
                let currentValue = result[0].number;
                currentValue ++;
                ProvincesDataRent.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                    regions()  
                })
            })
            /* Regions */
            const regions = () => {
                /* Regions */
                RegionsDataRent.find({name: region}).then(result => {
                    let currentValue = result[0].number;
                    currentValue ++;
                    RegionsDataRent.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                        cities()
                    })
                })
            }
            /* Cities */
            const cities = () => {
                /* Cities */
                CitiesDataRent.find({name: city}).then(result => {
                    let currentValue = result[0].number;
                    currentValue ++;
                    CitiesDataRent.findByIdAndUpdate(result[0]._id.toString(), {number: currentValue}).then(result => {
                    })
                })
            }
       }
       

        // Update user listings info (number of listings uploaded)
        UserData.find({email: mail}).then(response => {
            console.log(response)
            UserData.findByIdAndUpdate(response[0]._id, {listings:  response[0].listings +1}).then(resp => res.send('created successfully'))
        })

        


    } catch (error) {
        console.log("Error", error)
        res.send({
            message: "Payment failed",
            success: false
        })
    }
})



// /* Get listings */
// router.get('/get-listings/:operation/:city', (req,res) => {
//     const {operation, city} = req.params;
    
//     ListingData.find({$and: [{operation: operation},{province: city},{disabled:false}]}).then(response => {
//         return res.send(response);
//     })

//     /* res.send(data) */
// })
// /* Get listings with PROVINCE + REGION + CITY - NEW METHOD TO IMPLEMENT */
// router.get('/get-listings/:operation/:province/:region/:city', (req,res) => {
//     const {operation, province, region, city} = req.params;
//     console.log(operation, province, region, city)
//     ListingData.find({$and: [
//         {operation: operation},
//         {province: province},
//         {region: region},
//         {city: city},
//         {disabled:false}
//     ]}).then(response => {
//         return res.send(response)
//     })
// })

// /* Get listings with multiple filters */
// router.get('/get-listings-filter/:operation/:city/:query', (req,res) => {
//     const {operation, city, query} = req.params;
//     console.log(city
//         ,query)
//     let _cleanOperation = operation;

//     const queryBigArray = query.split('&')

//     /* Query and value */
//     const queryLargeArray = []
//     /* Only queries, for verification */
//     const queryArray = []
//     let minPrice;
//     let maxPrice;
//     let minSize;
//     let maxSize;

//     for(let i = 0; i<queryBigArray.length; i++){
        
//         if(query.split('&')[i].split('=')[0] === 'type'){
//             queryLargeArray.push({
//                 "type": query.split('&')[i].split('=')[1]
//             })
//         }
//         if(query.split('&')[i].split('=')[0] === 'minPrice'){
//             queryLargeArray.push({
//                 "minPrice": Number(query.split('&')[i].split('=')[1])
//             })
//             minPrice = Number(query.split('&')[i].split('=')[1])
//         }
//         if(query.split('&')[i].split('=')[0] === 'maxPrice'){
//             queryLargeArray.push({
//                 "maxPrice": Number(query.split('&')[i].split('=')[1])
//             })
//             maxPrice = Number(query.split('&')[i].split('=')[1])
//         }
//         if(query.split('&')[i].split('=')[0] === 'minSize'){
//             queryLargeArray.push({
//                 "minSize": Number(query.split('&')[i].split('=')[1])
//             })
//             minSize = Number(query.split('&')[i].split('=')[1])
//         }
//         if(query.split('&')[i].split('=')[0] === 'maxSize'){
//             queryLargeArray.push({
//                 "maxSize": Number(query.split('&')[i].split('=')[1])
//             })
//             maxSize = Number(query.split('&')[i].split('=')[1])
//         }
//         if(query.split('&')[i].split('=')[0] === 'bedrooms'){
//             queryLargeArray.push({
//                 "bedrooms": Number(query.split('&')[i].split('=')[1])
//             })
//         }
//         if(query.split('&')[i].split('=')[0] === 'baths'){
//             queryLargeArray.push({
//                 "baths": Number(query.split('&')[i].split('=')[1])
//             })
//         }

//         queryArray.push(query.split('&')[i].split('=')[0])
//     }

//     let isDoublePriceQuery;
//     let isDoubleSizeQuery;

//     if(queryArray.includes('minPrice') && queryArray.includes('maxPrice')){
//         /* INCLUDES MINPRICE AND MAXPRICE */
//         isDoublePriceQuery = true;
//     }else{
//         /* ONLY INCLUDES ONE PRICE QUERY */
//         isDoublePriceQuery = false;
//     }
//     if(queryArray.includes('minSize') && queryArray.includes('maxSize')){
//         /* INCLUDES MINSIZE AND MAXSIZE */
//         isDoubleSizeQuery = true;
//     }else{
//         /* ONLY INCLUDES ONE SIZE QUERY */
//         isDoubleSizeQuery = false;
//     }


   
//     const finalQueryArray = [
//         {operation: _cleanOperation},
//         {city: city},
//         {disabled:false}
//     ]


//     if(isDoublePriceQuery){
//         finalQueryArray.push({price: { $gt: minPrice , $lt: maxPrice}})
//     }
//     if(isDoubleSizeQuery){
//         finalQueryArray.push({size: { $gt: minSize , $lt: maxSize}})
//     }


//     for(let i = 0; i<queryLargeArray.length; i++){
 
//         if((Object.keys(queryLargeArray[i])[0] === 'minPrice' || Object.keys(queryLargeArray[i])[0] === 'maxPrice') && isDoublePriceQuery){
           
//         }else{
//             if(Object.keys(queryLargeArray[i])[0] === 'minPrice'){
//                 finalQueryArray.push({price: {$gte: queryLargeArray[i].minPrice}})
//             }else if(Object.keys(queryLargeArray[i])[0] === 'maxPrice'){
//                 finalQueryArray.push({price: {$lte: queryLargeArray[i].maxPrice}})
//             }else if(Object.keys(queryLargeArray[i])[0] === 'minSize'){
//                 finalQueryArray.push({m2: {$gte: queryLargeArray[i].minSize}})
//             }else if(Object.keys(queryLargeArray[i])[0] === 'maxSize'){
//                 finalQueryArray.push({m2: {$lte: queryLargeArray[i].maxSize}})
//             }else if(Object.keys(queryLargeArray[i])[0] === 'bedrooms'){
//                 finalQueryArray.push({bedrooms: {$gte: queryLargeArray[i].bedrooms}})
//             }else if(Object.keys(queryLargeArray[i])[0] === 'baths'){
//                 finalQueryArray.push({baths: {$gte: queryLargeArray[i].baths}})
//             }
            
//             else{
//                 finalQueryArray.push(queryLargeArray[i])
//             }
//         }
//     }

//     ListingData.find({
//         $and: finalQueryArray
//     }).then(response => {
//        return res.send(response);
//     })
// })


module.exports = router;