//declaring dependencies
const mongoose = require('mongoose')

//importing item model
const Item = require('./item')

//define mongoose schema
const Schema = mongoose.Schema

//declaring item category schema
const itemCategorySchema = new Schema({
    categoryName: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 2,
        maxlength: 20,
    },
},
    {
        timestamps: true
    }
)

// set relationship
itemCategorySchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'category'
})

// remove all items matching with category
itemCategorySchema.pre('findOneAndDelete', async function (next) {
    const category = this;

    await Item.deleteMany({ category: category._conditions._id })

    next();
});

const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema)

// exporting item category schema
module.exports = ItemCategory 