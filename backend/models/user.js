
// declaring dependencies
const mongoose = require('mongoose')
const validator = require('validator')

// define mongoose Schema
const Schema = mongoose.Schema

// declaring user Schema
const userSchema = new Schema({
    firstName : {
        type: String,
        required: true,
        lowercase:true,
        trim: true,
        minlength: 2,
        maxlength: 10,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 2,
        maxlength: 15,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 2,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password cannot contain "password"');
            }
        }

    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

// exporting User schema
module.exports = User 