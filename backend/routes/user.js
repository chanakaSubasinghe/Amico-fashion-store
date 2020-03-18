// declaring dependencies
const express = require('express')
const bcrypt = require('bcrypt')

// importing user model
const User = require('../models/user')

// configuration
const router = express.Router();

// create user
router.post('/users', async(req, res) => {
    try {

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).send('Your password does not match confirmation!')
        }

        //hashing user password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // creating new user and assign to a variable
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        })

        // save newUser to DB
        await user.save()
    
        // send response with status
        res.status(201).send(user)

    } catch (e) {
        res.status(400).send(e.message)
    }
})

// read user
router.get('/users/:id', async (req, res) => {
    try {
        // assigning provided id
        const _id = req.params.id

        // find specific user
        const user = await User.findOne({_id})

        // condition
        if (!user) {
            throw new Error('User not found!')
        }
        // send response
        res.status(200).send(user)

    } catch (e) {
        res.status(400).send(e.message)
    }
})


// read all users
router.get('/users', async (req, res) => {
    
    try {
        // assigning all users
        const users = await User.find({})

        // send response
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

// updating user
router.patch('/users/:id', async (req, res) => {

    // assigning provided id
    const _id = req.params.id

    // declaring variables to more secure 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName','lastName', 'password', 'newPassword', 'conNewPassword']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // conditions
    if (!isValidOperation) {
        return  res.status(400).send('Invalid updates')
    }

    if (req.body.newPassword !== req.body.conNewPassword) {
        return res.status(400).send('Your new password does not match confirmation!')
    }

    try {
        // assigning user provided id
        const user = await User.findOne({_id})

        // updating fields
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.password = req.body.newPassword

        // save back to DB
        await user.save()

        // send response
        res.status(200).send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})

// deleting user
router.delete('/users/:id', async (req, res) => {

    try {
        // assigning provided id
        const _id = req.params.id

        // delete specific user
        const user = await User.findOneAndDelete({_id})

        // send response
        res.status(200).send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router