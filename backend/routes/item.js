//dependency
const express = require('express');

//import the model
const Item = require('../models/item');

//configuration
const router = express.Router();

//create a new item
router.post('/items', async (req,res) => {
    try{


        //create a new item
        const item = new Item(req.body);

        //save to DB
        await item.save()

        //send response
        res.status(201).send(item)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

//read item
router.get('/items/:id', async(rea,res) => {
    try{
        //assign id
        const _id = req.params._id

        //find the specific id
        const item = await Item.findOne({_id})

        //if condition
        if(!item) {
            throw new Error('Item is not found')
        }
    }catch (e){
        res.status(400).send(e.message)
    }
})


//read all items
router.get('/items' , async(req,res) => {

    try{
        //assign all items
        const items = await Item.find({})

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
        const allowedUpdates = ['itemName' , 'category','description' , 'discount' , 'price' , 'averageRate' ,'comments']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        //conditions
        if(!isValidOperation){
            return res.status(400).send('Invalid Update!')
        }
        
    try{
        //assign item
        const item = await Item.findOne({_id})

        //update field
        item.itemName = req.body.itemName;
        item.category = req.body.category;
        item.description = req.body.description;
        item.discount = req.body.discount;
        item.price = req.body.price;
        item.averageRate = req.body.averageRate;
        item.comments = req.body.comments;

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
        const _id = req.params._id

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

