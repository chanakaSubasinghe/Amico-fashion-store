//declaring dependencies
const express = require('express')

//import model
const ItemCategory = require('../models/itemCategory')

//configuration
const router = express.Router();

//create item category
router.post('/itemCategories', async(req,res) => {
    try{
        //creating a new item category
        const itemCategory = new ItemCategory(req.body);

        //save new category to DB
        await itemCategory.save()

        //send response with status
        res.status(201).send(itemCategory)
    }catch (e){

        res.status(400).send(e.message)
    }
})

//read item categories
router.get('/itemCategories/:id', async(req,res) => {

        try{
            //assigning ID
            const _id = req.params.id

            //find specific item category
            const itemCategory = await ItemCategory.findOne({_id})

            //if condition
            if(!itemCategory) {
                throw new Error('Item category not found !')
            }

            //send response
            res.status(200).send(itemCategory)

        } catch (e){

            res.status(400).send(e.message)
        }
})



//read all item categories
router.get('/itemCategories' , async(req,res) => {

    try{
        //assign all item categories
        const itemCategories = await ItemCategory.find({})

        //send response
        res.status(200).send(itemCategories)

    }catch (e){
        res.status(400).send(e.message)
    }
})



//update item category

router.patch('/itemCategories/:id' , async(req,res) =>{

    //assign id
    const _id = req.params.id

    //declaring variables to more secure
    const updates = Object.keys(req.body)
    const allowedUpdates = ['categoryName']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    //conditions
    if(!isValidOperation){
        return res.status(400).send('Invalid updates')
    }

    try {

        //assign the provided item category
        const itemCategory = await ItemCategory.findOne({_id})

        //update fields
        itemCategory.categoryName = req.body.categoryName 

        //save to DB
        await itemCategory.save()

        //send response
        res.status(200).send(itemCategory)

    } catch (e) {

        res.status(400).send(e)
    }
})


//deleting a item category

router.delete('/itemCategories/:id' , async (req,res) => {

    try{
        //assign the id
        const _id = req.params.id

        //delete specific item category
        const itemCategory = await ItemCategory.findOneAndDelete({_id})

        //send response
        res.status(200).send(itemCategory)

    }catch (e){
        res.status(400).send(e)
    }
})

module.exports = router 