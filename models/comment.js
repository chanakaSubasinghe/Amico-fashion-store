//declaring dependencies
const mongoose = require('mongoose');

//define mongoose schema
const Schema = mongoose.Schema;

//declaring comment schema
const commentSchema = new Schema({
    comment: {
        type: String
    },
    itemid:
    {
        type: String
    },

}, {
    timestamps: true
});

const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment