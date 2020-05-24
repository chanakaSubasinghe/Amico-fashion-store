//dependency
const express = require('express');
const multer = require('multer')
const sharp = require('sharp')

//import the model
const Item = require('../models/item');

//configuration
const router = express.Router();

//uploading images and validations
const upload = multer({
	limits: {
		fileSize: 1000000 //maximum size of an image
	},
	fileFilter(req, file, cb) {
		// checking if file extension does not match with jpg,png,jpeg
		if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
			return cb(new Error('Please upload a image.')); // if it is then throw an error
		}
		cb(undefined, true);
	}
});

//create a new item
router.post('/items',upload.single('itemPhoto'), async (req,res) => {

        // uploading image and resize with sharp and save it in a variable as a buffer
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

        // get discounted price
        const discountedPrice = await Item.findDiscountedPrice(req.body.totalPrice, req.body.discount)

        //create a new item
        const item = new Item({
            ...req.body,
            discountedPrice: discountedPrice,
            itemPhoto: buffer
        });

        // //save to DB
        await item.save()

        //send response
        res.status(201).send(item)
    },(error, req, res, next) => {
        res.status(400).send({error: error.message})
    }
)

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
router.patch('/items/:id',upload.single('itemPhoto'), async(req,res) => {
 
        //assign id
        const _id = req.params.id

        //declaring variables to more secure
        const updates = Object.keys(req.body)
        const allowedUpdates = ['itemPhoto','itemName' , 'category' , 'discount' , 'totalPrice']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        //conditions
        if(!isValidOperation){
            return res.status(400).send('Invalid Update!')
        }
        
    try{

        // uploading image and resize with sharp and save it in a variable as a buffer
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

        //assign item
        const item = await Item.findOne({_id})

        // get discounted price
        const discountedPrice = await Item.findDiscountedPrice(req.body.totalPrice, req.body.discount)

        //update field
        item.itemPhoto = buffer
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

// fetching item image
router.get('/items/:id/itemPhoto', async (req, res) => {
	try {
		// find an item by given id
		const item = await Item.findById(req.params.id);

		// set the response as image/png and send it
		res.set('Content-Type', 'image/png');
		res.send(item.itemPhoto);
	} catch (e) {
		res.status(500).redirect('/items');
	}
});


module.exports = router

