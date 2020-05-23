//declaring dependencies
const mongoose = require('mongoose')

//define mongoose schema
const Schema = mongoose.Schema

//declaring item schema
const itemSchema = new Schema({

    itemPhoto: {
        type: Buffer,
        required: true

    },
    itemName: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemCategory',
        required: true,
    },
    discount: {
        type: Number
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    averageRate: {
        type: Number,
        default: 1.0
    }
}, {
    timestamps: true,
});


itemSchema.statics.findDiscountedPrice = async (totalPrice, discount) => {

    const discountedPrice = totalPrice - (totalPrice * (discount / 100))

    return discountedPrice;
};



const Item = mongoose.model('Item', itemSchema);

module.exports = Item 