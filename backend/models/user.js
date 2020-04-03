// declaring dependencies
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// define mongoose Schema
const Schema = mongoose.Schema

// declaring user Schema
const userSchema = new Schema({
    avatar: {
        type: Buffer
    },
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
        trim: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password cannot contain "password"');
            }
        }

    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user','admin','storeManager']
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

// to hide unnecessary details
// userSchema.methods.toJSON = function() {
// 	const user = this;

// 	const userObject = user.toObject();

// 	delete userObject.salt;
// 	delete userObject.hash;

// 	return userObject;
// };

userSchema.methods.generateAuthToken = async function() {

    const user = this;

    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})

    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
 
    const user = await User.findOne({email})

    if (!user) {
        throw new Error(`The email address that you've entered is invalid!`)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw Error('Your password does not match with your account')
    }

    return user
}


userSchema.pre('save', async function(next) {

    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

// exporting User schema
module.exports = User 