// declaring dependencies
const mongoose = require('mongoose')
const validator = require('validator')
const passportLocalMongoose = require('passport-local-mongoose')

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
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 2,
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

// to hide unnecessary details
userSchema.methods.toJSON = function() {
	const user = this;

	const userObject = user.toObject();

	delete userObject.salt;
	delete userObject.hash;

	return userObject;
};

userSchema.plugin(passportLocalMongoose)


const User = mongoose.model('User', userSchema)

// exporting User schema
module.exports = User 