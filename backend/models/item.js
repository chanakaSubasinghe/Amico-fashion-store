//declaring dependencies

const mongoose = require('mongoose')

//define mongoose schema
const Schema = mongoose.Schema 

//declaring item schema
const itemSchema = new Schema({
    itemName:{
        type: String,
        required: true,
        trim : true,
    },
    category: {
        type: String,
        required,
        trim:true
    },

    description:{
        type: String,
        required: true,
    },

    discount:{
        type: Number,

    },

    price:{
        type: Number,
        required: true,
    },

    averageRate:{
        type: Number,
    },

    comments:{
        type: String,
    },


},{
    timestamps: true,
});


const Item = mongoose.model('Item',itemSchema);

module.exports = Item 