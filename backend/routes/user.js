// declaring dependencies
const express = require('express')

//importing middleware
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/admin')

// importing user model
const User = require('../models/user')

// configuration
const router = new express.Router();


// create user
router.post('/users', async(req, res) => {
    try {

        if (req.body.password !== req.body.confirmPassword) {
            throw new Error('Your password does not match confirmation!')
        }

        const user = new User(req.body)

        await user.save()

        if (user.role === 'storeManager' || user.role === 'admin') {
            return res.status(201).send(user)
        }

        const token = await user.generateAuthToken()
        res.status(201).send({user, token})

    } catch (e) {
        res.status(400).send(e.message)
    }
})

// login user
router.post('/users/login', async (req, res) => {
    try {
 
        const user = await User.findByCredentials(req.body.email,req.body.password)

        const token = await user.generateAuthToken()

        res.status(200).send({user, token})

    } catch (e) {
        res.status(400).json(e.message)
    }
})

// logout user
router.post('/users/logout', auth, async (req, res) => {

    try {

        const user = req.user

        user.tokens = user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await user.save()

        res.send('loggedOut')    
    } catch (e) {
        
    }
})


router.post('/users/logoutAll', auth, async (req, res) => {

    try {
        
        const user = req.user

        user.tokens = []

        await user.save()

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
router.get('/users', isAdmin, async (req, res) => {
    
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
router.delete('/users/:id',isAdmin, async (req, res) => {

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