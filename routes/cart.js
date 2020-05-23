//dependancy
const router = require('express').Router();

//import the model
const Cart = require('../models/cart');

//create a new cart
router.post('/cart',(req,res) => {
    const quantity = req.body.quantity
    const itemID =  req.body.itemID
    const itemName = req.body.itemName
    const discountedPrice = req.body.discountedPrice
    const userID = req.body.userID
    const InCart = req.body.alreadyInCart

    if(InCart){
    console.log(req.body.cartid);
    Cart.findOneAndUpdate(
            { _id: req.body.cartid},
            { $inc: { "quantity": quantity } },
            { new: true },
            () => {
                res.status(200).json({success: true})
            }
        )
    }
    else{
    //create a new cart
        const newcart = new Cart({
            userID,
            quantity,
            itemName,
            discountedPrice,
            itemID
        })

    //save to DB
        newcart.save()
            .then(() => res.json({status: 201,_id: newcart._id,}))
            .catch(err => res.status(400).json('Error : ' + err));
    }
})

//read a cart
router.route('/cart/:id').get((req, res) => {

Cart.find({"userID":req.params.id})
.then(cart => res.json(cart))
.catch(err => res.status(400).json('Error: ' + err));
});

//read a cart for specific items 
router.route('/cartDetails/:id/:itemid').get((req, res) => {

console.log(req.params.id ,req.params.itemid);
Cart.find({$and:[{"userID":req.params.id},{"itemID":req.params.itemid}]})
.then(cart => res.json(cart))
.catch(err => res.status(400).json('Error: ' + err));
});

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


//updating the cart
router.patch('/cart/:id', async (req,res) =>{

    //assignin provided id
    const _id = req.params._id
    console.log(_id)

    //declaring variables
    const updates = Object.keys(req.body)
    const allowedUpdates = ['quantity']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    //conditions
    if(!isValidOperation) {
        return res.status(400).send('Invalid update')
    }

    try{

        //assigning cart
        const cart = await Cart.findOne({_id})

        //save back to DB
        await cart.save()

        //send response
        res.status(200).send(cart)

    } catch (e) {
        res.status(400).send(e)
    }
})

//deleting a cart item
router.delete('/cart/:id' , async(req,res) => {
    
    try{
        //assign id
        const _id = req.params.id
        console.log(_id);

        //delete specific item
        const cart = await Cart.findOneAndDelete({_id})        

        //send response
        res.status(200).send(cart)
    }
    catch (e){
        res.status(400).send(e)
    }
})

//Increment Cart Quantity

router.post('/incrementCartQty/:id',(req,res) => {
    Cart.findOneAndUpdate(
        { _id: req.params.id},
        { $inc: { "quantity": 1 } },
        { new: true },
        () => {
            res.status(200).json({success: true})
        }
    )
})

//Decrement Cart Quantity

router.post('/decrementCartQty/:id',(req,res) => {
    Cart.findOneAndUpdate(
        { _id: req.params.id},
        { $inc: { "quantity": -1 } },
        { new: true },
        () => {
            res.status(200).json({success: true})
        }
    )
})
module.exports = router

