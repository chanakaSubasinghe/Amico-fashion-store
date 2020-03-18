//declaring dependencies
const mongoose = require('mongoose')


//define mongoose schema
const Schema = mongoose.Schema 

//declaring item category schema
const itemCategorySchema = new Schema ({
    categoryName :{
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        minlength : 2,
        maxlength : 10,
    },
},{
    timestamps : true
})

const ItemCategory = mongoose.model('ItemCategory',itemCategorySchema)

// exporting item category schema
module.exports = ItemCategory 