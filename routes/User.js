const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const UserData = require('../models/User')

/* Register user */
router.post('/create-user', (req,res) => {
    const {email, name, uid} = req.body;

    const item = {
        email: email,
        name: name,
        uid: uid
    }
    
    var newUser = new UserData(item)
    newUser.save()

    res.send('usuario registrado')
})
/* Get user data */
router.get('/get-user/:email', (req,res) => {
    const {email} = req.params;
    UserData.find({email: email}).then(response => {
        return res.send(response);
    })
})
/* Update user name */
router.post('/update-name', (req,res) => {
    const {email, newName, uid} = req.body;
    if(!email || !newName || !uid){
        res.send('Insufficient data')
        return;
    }
    // we check if user requesting is legit
    UserData.find({email: email}).then(response => {
        if(response[0].uid !== uid){
            res.send('Access not granted')
        }else{
            UserData.findOneAndUpdate({email: email}, {name: newName}).then(res.send('updated'))
        }
    })
})
/* Update user email */
router.post('/update-email', (req,res) => {
    const {currentEmail, newEmail, uid} = req.body;
    if(!currentEmail || !newEmail || !uid){
        res.send('Insufficient data')
        return;
    }
    // we check if user requesting is legit
    UserData.find({email: currentEmail}).then(response => {
        if(response[0].uid !== uid){
            res.send('Access not granted')
        }else{
            UserData.findOneAndUpdate({email: currentEmail}, {email: newEmail}).then(res.send('updated'))
        }
    })
})


//////////  FAVORITES  //////////
/* Add listing to favorites */
router.post('/add-favorites', (req,res) => {
    const {email, listingId, uid} = req.body;

    let favorites = UserData.find({email:email}).then(response => {

        if(response[0].uid !== uid){
            res.send('Access not granted')
            return
        }
        let temp = response[0].favorites;
 
        if(temp.includes(listingId)){
            console.log('ya está agregado')
            res.sendStatus(245)
            return
        }else{
            console.log('aun no está agregado')
            temp.push(listingId);
    
            let docToUpdate = UserData.findOneAndUpdate({email:email}, { favorites: temp },
            function (err, docs) {
                if (err){
                    console.log(err)
                }else{
                    console.log("Updated User : ", docs);
                    res.sendStatus(200)
                }
            });


        }
    })

})

/* Remove listing from favorites */
router.post('/remove-favorites', (req,res) => {
    const {email, listingId} = req.body;

    let favorites = UserData.find({email:email}).then(response => {

        let temp = response[0].favorites;

        if(temp.includes(listingId)){
            /* perfecto, a borrar */
            const index = temp.indexOf(listingId);
            if (index > -1) { // only splice array when item is found
                temp.splice(index, 1); // 2nd parameter means remove one item only
            }

            let docToUpdate = UserData.findOneAndUpdate({email:email}, { favorites: temp },
                function (err, docs) {
                    if (err){
                        console.log(err)
                    }else{
                        console.log("Updated User : ", docs);
                        res.sendStatus(200)
                    }
                });


        }else{
            res.sendStatus(245) // error
           return


        }
    })
})

///////////// BLOCK USER /////////////
router.post('/block-user', (req,res) => {
    const {uid, userToBlockEmail} = req.body;

    UserData.find({uid: uid}).then(response => {
        let _blacklist = response[0].blacklist;
        _blacklist.push(userToBlockEmail);
        UserData.findByIdAndUpdate(response[0]._id, {blacklist: _blacklist}).then(resp => res.send('Blocked'))
    })
})






module.exports = router;