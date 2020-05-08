//declaring dependancies
const mongoose = require('mongoose');

//define mongoose schema
const Schema = mongoose.Schema;

//declaring wishList schema
const wishListSchema = new Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    item:[
        {
            itemPhoto:{
                type: Buffer,
                required: true
            },
            itemName:{
                type: String,
                required: true,
                trim: true
            },
            itemCategory:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ItemCategory',
                required: true
            },
            price:{
                type: Number,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const WishList = mongoose.model('WishList', wishListSchema)

module.exports = WishList