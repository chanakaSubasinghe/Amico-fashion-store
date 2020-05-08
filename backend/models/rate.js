//declaring dependencies
const mongoose = require('mongoose');

//define mongoose schema
const Schema = mongoose.Schema;

//declaring rate schema
const rateSchema = new Schema({
    rate: {
        type: Number,
        required: true,
    },

    comment: {
        type: String,
    }

}, {
    timestamps: true
});

const Rate = mongoose.model('rate', rateSchema)

module.exports = Rate