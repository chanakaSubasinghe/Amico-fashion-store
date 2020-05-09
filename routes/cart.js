//dependancy
const router = require('express').Router();

//import the model
const Cart = require('../models/cart');


//create a new cart
router.post('/cart', async(req,res) => {
    try{

        //create a new cart
        const cart = new Cart({
            subTotal: req.body.subTotal,
            quantity: req.body.quantity
        })

        //save to DB
        await cart.save()

        //send response
        res.status(201).send(cart)
    }
    catch(e) {
        res.status(400).send(e.message)
    }
})


//read cart
router.get('/cart/:id', async(req,res) => {
    try{
        //assign id
        const _id = req.params.id

        //find the specific cart
        const cart = await Cart.findOne({_id})

        //send the response
        res.status(200).send(cart)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

//read the cart
router.get('/cart', async (req,res) => {
     try{
         //assign all carts
         const cart = await Cart.find({})

         //send response
         res.status(200).send(cart)
     }catch (e) {
         res.status(400).send(e.message)
     }
})

//updatind the cart
router.patch('/cart/:id', async (req,res) =>{

    //assignin provided id
    const _id = req.params._id

    //declaring variables
    const updates = Object.keys(req.body)
    const allowedUpdates = ['subTotal','quantity']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    //conditions
    if(!isValidOperation) {
        return res.status(400).send('Invalid update')
    }

    try{

        //assigning cart
        const cart = await Cart.findOne({_id})

        //updating fields
        cart.subTotal = req.body.subTotal
        cart.quantity = req.body.quantity

        //save back to DB
        await cart.save()

        //send response
        res.status(200).send(cart)

    } catch (e) {
        res.status(400).send(e)
    }
})

//deleting a cart
router.delete('/cart/:id',async(req,res) => {

    try{

        //assigning provided id
        const _id = req.params.id

        //deleting the specific cart
        const cart = await Cart.findByIdAndDelete({_id})

        //send response
        res.status(200).send(cart)

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
