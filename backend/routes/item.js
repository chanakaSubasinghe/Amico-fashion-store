//dependency
const express = require('express');

//import the model
const Item = require('../models/item');

//configuration
const router = express.Router();

//create a new item
router.post('/items', async (req,res) => {
    try{

        // get discounted price
        const discountedPrice = await Item.findDiscountedPrice(req.body.totalPrice, req.body.discount)

        //create a new item
        const item = new Item({
            ...req.body,
            discountedPrice: discountedPrice
        });

        // //save to DB
        await item.save()

        //send response
        res.status(201).send(item)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

//read item
router.get('/items/:id', async(req,res) => {
    try{
        //assign id
        const _id = req.params.id

        //find the specific id
        const item = await Item.findOne({_id})

        // populate category property
        await item.populate('category').execPopulate()


        //if condition
        if(!item) {
            throw new Error('Item is not found')
        }

        // send response
        res.status(200).send(item)
    }catch (e){
        res.status(400).send(e.message)
    }
})


//read all items
router.get('/items' , async(req,res) => {

    try{
        //assign all items
        const items = await Item.find({}).populate('category').exec()

        //send response
        res.status(200).send(items)
    }
    catch (e){
        res.status(400).send(e.message)
    }
})

//update items
router.patch('/items/:id', async(req,res) => {
    
        //assign id
        const _id = req.params.id

        //declaring variables to more secure
        const updates = Object.keys(req.body)
        const allowedUpdates = ['itemName' , 'category' , 'discount' , 'totalPrice']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        //conditions
        if(!isValidOperation){
            return res.status(400).send('Invalid Update!')
        }
        
    try{
        //assign item
        const item = await Item.findOne({_id})

        // get discounted price
        const discountedPrice = await Item.findDiscountedPrice(req.body.totalPrice, req.body.discount)

        //update field
        item.itemName = req.body.itemName;
        item.category = req.body.category;
        item.discount = req.body.discount;
        item.totalPrice = req.body.totalPrice;
        item.discountedPrice = discountedPrice;

        //save to database
        await item.save()

        //send response
        res.status(200).send(item)

    } catch (e){
        res.status(400).send(e)
    }
})

//deleting a item
router.delete('/items/:id' , async(req,res) => {
    
    try{
        //assign id
        const _id = req.params.id

        //delete specific item
        const item = await Item.findOneAndDelete({_id})

        //send response
        res.status(200).send(item)
    }
    catch (e){
        res.status(400).send(e)
    }
})

module.exports = router

