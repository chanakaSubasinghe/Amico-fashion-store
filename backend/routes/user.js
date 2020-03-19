// declaring dependencies
const express = require('express')
const passport = require('passport')
const LocalStrategy = require('passport-local')

// importing user model
const User = require('../models/user')

// configuration
const router = express.Router();

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// get user
router.get('/current', (req, res) => {
    
    // print details of req user to console
    console.log('current user ' + req.user)

    // condition
    if (req.user) {

        res.json({ user: req.user })
    } else {

        res.json({ user: null })    
    }
})

// create user
router.post('/users', async(req, res) => {
    try {

        // condition
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).send('Your password does not match confirmation!')
        }


        // creating new user and assign to a variable
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email
        })

        // handle register logic
        User.register(user, req.body.password , (err, user) => {
            if (err) {

                return res.send(err.message)
            }

            passport.authenticate('local')(req, res, () => {
                
 
                res.status(201).send(user)
            })
        })

    } catch (e) {
        res.status(400).send(e.message)
    }
})

// login user
router.post('/users/login', passport.authenticate('local'), (req, res, next) => {

    res.send(req.user)
    next()

})

// logout user
router.post('/users/logout', (req, res) => {
    req.logOut()
    res.send('Successfully logged out')
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