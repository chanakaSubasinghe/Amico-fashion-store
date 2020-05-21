//declaring dependencies
const mongoose = require('mongoose');

//define mongoose schema
const Schema = mongoose.Schema;

//declaring comment schema
const commentSchema = new Schema({
    comment: {
        type: String,
        default: null
    },
    rate:{
        type:Number
    },
    itemid:
    {
        type: String
    },
    userid:{
        type:String
    },
    userName:{
        type:String
    }

}, {
    timestamps: true
});

const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment