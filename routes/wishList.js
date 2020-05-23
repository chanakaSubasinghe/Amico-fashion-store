//dependancy
const router = require('express').Router();

//import the model
const WishList = require('../models/wishList');

//create a new wishList
router.post('/wishlist',(req,res) => {
const itemID =  req.body.itemID
const itemName = req.body.itemName
const discountedPrice =req.body.discountedPrice
const userID = req.body.userID
const InWishList = req.body.alreadyInWishList

if(InWishList){
 console.log(req.body.wishListid);
 WishList.findOneAndUpdate(
        { _id: req.body.wishListid},
        { new: true },
        () => {
            res.status(200).json({success: true})
        }
    )
}
else{

//create a new wishlist
const newWishList = new WishList({
userID,
itemName,
discountedPrice,
itemID
})
console.log(newWishList)

//save to DB
newWishList.save()
.then(() => res.json({status: 201,_id: newWishList._id,}))
.catch(err => res.status(400).json('Error : ' + err));
}
}
)

//read the wishlist
router.route('/wishlist/:id').get((req, res) => {

WishList.find({"userID":req.params.id})
.then(wishlist => res.json(wishlist))
.catch(err => res.status(400).json('Error: ' + err));
});

//read wishlist for specific items 
router.route('/wishlistDetails/:id/:itemid').get((req, res) => {

console.log(req.params.id ,req.params.itemid);
WishList.find({$and:[{"userID":req.params.id},{"itemID":req.params.itemid}]})
.then(wishlist => res.json(wishlist))
.catch(err => res.status(400).json('Error: ' + err));
});

//deleting a wishlist item
router.delete('/wishlist/:id' , async(req,res) => {
    
    try{
        //assign id
        const _id = req.params.id
        console.log(_id);

        //delete specific item
        const wishlist = await WishList.findOneAndDelete({_id})        

        //send response
        res.status(200).send(wishList)
    }
    catch (e){
        res.status(400).send(e)
    }
})

module.exports = router

