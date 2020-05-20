//declaring dependancies
const mongoose = require('mongoose');

//define mongoose schema
const Schema = mongoose.Schema;

//importing user model and item
const User = require('./user');
const Item = require('./item');

//declaring cart schema
const cartSchema = new Schema({
    userID:{
        type: String,
    },
    quantity:{
        type: Number,
        
    },
    itemName:{
        type: String,
    },
    discountedPrice: {
        type: Number,
    },
    itemID:{
        type:String
    }
},{
    timestamps: true,
});


cartSchema.statics.findSubTotal = async (price, quantity) => {

    const subTotal = price * quantity

    return subTotal;
};


const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart