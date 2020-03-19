// declaring dependencies
const express = require('express')
const bcrypt = require('bcrypt')

// importing user model
const StoreManager = require('../models/storeManager')

// configuration
const router = express.Router();

// create storeManager
router.post('/storeManagers', async(req, res) => {
    try {

        //hashing store manager password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // creating new storeManager and assign to a variable
        const storeManager = new StoreManager({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
        })

        // save storeManager to DB
        await storeManager.save()
    
        // send response with status
        res.status(201).send(storeManager)

    } catch (e) {
        res.status(400).send(e.message)
    }
})

// read storeManager
router.get('/storeManagers/:id', async (req, res) => {
    try {
        // assigning provided id
        const _id = req.params.id

        // find specific storeManager
        const storeManager = await StoreManager.findOne({_id})

        // send response
        res.status(200).send(storeManager)

    } catch (e) {
        res.status(400).send(e.message)
    }
})


// read all storeManagers
router.get('/storeManagers', async (req, res) => {
    
    try {
        // assigning all admins
        const storeManagers = await StoreManager.find({})

        // send response
        res.status(200).send(storeManagers)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

// updating storeManager
router.patch('/storeManagers/:id', async (req, res) => {

    // assigning provided id
    const _id = req.params.id

    // declaring variables to more secure 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName','lastName', 'email','password', 'newPassword', 'conNewPassword']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // conditions
    if (!isValidOperation) {
        return  res.status(400).send('Invalid updates')
    }

    if (req.body.newPassword !== req.body.conNewPassword) {
        return res.status(400).send('Your new password does not match confirmation!')
    }

    try {
        // assigning storeManager provided id
        const storeManager = await StoreManager.findOne({_id})

        // updating fields
        storeManager.firstName = req.body.firstName
        storeManager.lastName = req.body.lastName
        storeManager.email = req.body.email
        storeManager.password = req.body.newPassword

        // save back to DB
        await storeManager.save()

        // send response
        res.status(200).send(storeManager)

    } catch (e) {
        res.status(400).send(e)
    }
})

// deleting storeManager
router.delete('/storeManagers/:id', async (req, res) => {

    try {
        // assigning provided id
        const _id = req.params.id

        // delete specific storeManager
        const storeManager = await StoreManager.findOneAndDelete({_id})

        // send response
        res.status(200).send(storeManager)

    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router