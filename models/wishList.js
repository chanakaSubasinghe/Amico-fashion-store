//declaring dependancies
const mongoose = require('mongoose');

//define mongoose schema
const Schema = mongoose.Schema;

//declaring wishlist schema
const wishListSchema = new Schema({
    userID: {
        type: String,
    },
    itemName: {
        type: String,
    },
    discountedPrice: {
        type: Number,
    },
    itemID: {
        type: String
    }
},
    {
        timestamps: true,
    }
);

const WishList = mongoose.model('WishList', wishListSchema)

module.exports = WishList