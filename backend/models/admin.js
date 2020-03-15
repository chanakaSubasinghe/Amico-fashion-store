// declaring dependencies

const mongoose = require('mongoose')
const validator = require('validator')

// define mongoose Schema
const Schema = mongoose.Schema

// declaring admin Schema
const adminSchema = new Schema({
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
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 4,
        maxlength: 10,
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

const Admin = mongoose.model('Admin', adminSchema)

// exporting Admin schema
module.exports = Admin 