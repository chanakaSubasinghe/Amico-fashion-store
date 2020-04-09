// declaring dependencies
const express = require('express')

//importing middleware
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/admin')

// importing user model
const User = require('../models/user')

// configuration
const router = new express.Router();

// importing email function
const {sendWelcomeEmail,sendGoodByeEmail} = require('../email/account')

// create user
router.post('/users', async(req, res) => {
    try {

        // create new user
        const user = new User(req.body)

        // save new user 
        await user.save()

        // if new user is a storeManger or an admin send only user as response 
        if (user.role === 'storeManager' || user.role === 'admin') {

            // send welcome email
            sendWelcomeEmail(user.email)
            return res.status(201).send(user)
        }

        // otherwise generate a token
        const token = await user.generateAuthToken()

        // send response with token and user
        res.status(201).send({user, token})

    } catch (e) {
        res.status(400).send(e.message)
    }
})

// login user
router.post('/users/login', async (req, res) => {
    try {
 
        // find user according to provided details
        const user = await User.findByCredentials(req.body.email,req.body.password)

        // generate a token
        const token = await user.generateAuthToken()

        // send response
        res.status(200).send({user, token})

    } catch (e) {
        res.status(400).json(e.message)
    }
})

// logout user
router.post('/users/logout', auth, async (req, res) => {

    try {

        // assigning loggedIn user to a new variable
        const user = req.user

        // delete the token which used to logging to current session
        user.tokens = user.tokens.filter((token) => {
            return token.token !== req.token
        })

        // save user back
        await user.save()

        // send response
        res.send('loggedOut')    
    } catch (e) {
        res.status(400).send(e.message)
    }
})


router.post('/users/logoutAll', auth, async (req, res) => {

    try {
        
        // save loggedIn user to a variable
        const user = req.user

        // clear all tokens
        user.tokens = []

        // save user back
        await user.save()

        // send response
        res.status(200).send('done')
    } catch (e) {
        res.status(400).send(e.message)        
    }
})

// read user / me
router.get('/users/me', auth, async (req, res) => {
    try {

        // find specific user
        const user = req.user

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
        const users = await User.find({role: 'storeManager'})

        // send response
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

// updating user
router.patch('/users/me', auth, async (req, res) => {

    // declaring variables to more secure 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName','lastName', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // conditions
    if (!isValidOperation) {
        return  res.status(400).send('Invalid updates')
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(400).send('Your new password does not match confirmation!')
    }

    try {
        // assigning user 
        const user = req.user

        // updating fields
        updates.forEach((update) => {
            user[update] = req.body[update]
        })

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

        // send email to deleted user
        sendGoodByeEmail(user.email)

        // send response
        res.status(200).send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router