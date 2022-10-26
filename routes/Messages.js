const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const MessageData = require('../models/Message');


/* Create first message from estate details page */
router.post('/create-message', (req,res) => {
    const {id, image, province, region, city, price, type, message, sender, users} = req.body;

    var item = {
        estateData:{
            id: id,
            image: image,
            price: price,
            type: type,
            province:province,
            region:region,
            city:city,
        },
        messages: [
            {
                message: message,
                sender: sender,
                timestamp: new Date().valueOf()
            }
        ],
        users: users
    }

    var _message = new MessageData(item)
    _message.save()

    res.send('received')
})

/* Get user messages */
router.get('/get-messages/:email', (req,res) => {
    const {email} = req.params;
    MessageData.find({users: { $in: [email] }}).then(response => {
        return res.send(response);
    })
})

/* Get user messages to an especific user */
router.get('/get-messages-by-id/:id/:email', (req,res) => {
    const {id, email} = req.params;
    MessageData.find({users: { $in: [email] }, 'estateData.id': id}).then(response => {
        return res.send(response)
    })
})

/* Send message (update) in online conversation */
router.post('/send-message', async(req,res) => {
    const {sender, message, id} = req.body;

    /* First, we get the actual converstation */
    let currentConversation = MessageData.findById(id).then(response => {

        let temp = response.messages;
        temp.push({
            message: message,
            sender: sender,
            timestamp: new Date().valueOf()
        })

        let docToUpdate = MessageData.findByIdAndUpdate(id, { messages: temp },
        function (err, docs) {
            if (err){
                console.log(err)
            }else{
                res.send('sended')
            }
        });
    }); 
})

router.post('/delete-message', async(req,res) => {
    const {messageId} = req.body;
    console.log(messageId)

    MessageData.findByIdAndDelete(messageId).then(() => res.send('deleted'))
})




module.exports = router;