//declaring dependancies
const mongoose = require('mongoose');

//define mongoose schema
const Schema = mongoose.Schema;

//importing user model and item
const User = require('./user');
const Item = require('./item');

//declaring cart schema
const cartSchema = new Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subTotal:{
        type: Number,
        
    },
    items:[{
        quantity:{
            type: Number,
            default: 1
        },
        item:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        },
        price:{
            type: Number,
            default: 0
        } 
    }]
},{
    timestamps: true,
});


cartSchema.statics.findSubTotal = async (price, quantity) => {

    const subTotal = price * quantity

    return subTotal;
};


const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart