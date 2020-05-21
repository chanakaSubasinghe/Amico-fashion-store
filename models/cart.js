//declaring dependancies
const mongoose = require('mongoose');

//define mongoose schema
const Schema = mongoose.Schema;

//declaring cart schema
const cartSchema = new Schema({
    userID:{
        type: String,
    },
    quantity:{
        type: Number,
        
    },
    itemName:{
        type: String
    },
    discountedPrice: {
        type: Number
    },
    itemID:{
        type:String
    }
},{
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart