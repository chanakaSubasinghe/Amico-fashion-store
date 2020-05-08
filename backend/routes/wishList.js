//dependancy
const express = require('express')

//import the model
const WishList = require('../models/wishList');

//configuration
const router = express.Router();

//create a new wishList
router.post('/wishList', async(req,res) => {
    try{
        
        //create a new wishList
        const wishList = new WishList(req.body);

        //save to DB
        await wishList.save()

        //send response
        res.status(201).send(wishList)
    } catch(e) {

        res.status(400).send(e.message)
    }
})

//read wishList
router.get('/wishList/:id', async(req,res) => {
    try{
         //assign id
         const _id = req.params.id

         //find the specific wishList
         const wishList = await WishList.findOne({_id})

         //send response
         res.status(200).send(wishList)
    } catch(e) {
        res.status(400).send(e.message)
    }
})

//read the wishList
router.get('/wishList', async(req,res) => {
    try{

        //assign all wishLists
        const wishList = await WishList.find({})

        //send response
        res.status(200).send(wishList)
    } catch(e) {
        res.status(400).send(e.message)
    }
})

//updating the wishList
router.patch('/wishList/:id', async(req,res) => {

    //assigning provided id
    const _id = req.params.id

    //decalring variables
    const updates = Object.keys(req.body)
    const allowedUpdates = ['itemCode']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(updates))

    //condition
    if(!isValidOperation) {
        return res.status(400).send('Invalid update')
    }

    try{

        //assigning wishList
        const wishList = await WishList.findOne({_id})

        //update fields
        wishList.itemCode = req.body.itemCode

        //save back to DB
        await wishList.save()

        //send response
        res.status(200).send(wishList)
    } catch(e) {
        res.status(400).send(e)
    }
})

//deleting a wishList
router.delete('/wishList/:id', async(req,res) => {
    try{

        //assigning provided id
        const _id = req.params.id

        //deleting the specific wishList
        const wishList = await WishList.findByIdAndDelete({_id})

        //send response
        res.status(200).send(wishList)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router