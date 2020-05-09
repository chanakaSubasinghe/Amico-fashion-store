//declaring dependancies
const mongoose = require('mongoose');

//define mongoose schema
const Schema = mongoose.Schema;

//declaring cart schema
const cartSchema = new Schema({
    subTotal: {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart