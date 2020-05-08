//declaring dependancies
const mongoose = require('mongoose');

//define mongoose schema
const Schema = mongoose.Schema;

//declaring cart schema
const cartSchema = new Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subTotal:{
        type: Number,
        default: 0
    },
    items:[
        {
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
        }
    ]
},{
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart