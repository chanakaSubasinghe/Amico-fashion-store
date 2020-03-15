// declaring dependencies
const express = require('express')

// importing user model
const Admin = require('../models/admin')

// configuration
const router = express.Router();

// create admin
router.post('/admins', async(req, res) => {
    try {
        // creating new admin and assign to a variable
        const admin = new Admin(req.body)

        // save newAdmin to DB
        await admin.save()
    
        // send response with status
        res.status(201).send(admin)

    } catch (e) {
        res.status(400).send(e.message)
    }
})

// read admin
router.get('/admins/:id', async (req, res) => {
    try {
        // assigning provided id
        const _id = req.params.id

        // find specific admin
        const admin = await Admin.findOne({_id})

        // condition
        if (!admin) {
            throw new Error('Admin not found!')
        }
        // send response
        res.status(200).send(admin)

    } catch (e) {
        res.status(400).send(e.message)
    }
})


// read all admins
router.get('/admins', async (req, res) => {
    
    try {
        // assigning all admins
        const admins = await Admin.find({})

        // send response
        res.status(200).send(admins)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

// updating admin
router.patch('/admins/:id', async (req, res) => {

    // assigning provided id
    const _id = req.params.id

    // declaring variables to more secure 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName','lastName','password', 'newPassword', 'conNewPassword']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // conditions
    if (!isValidOperation) {
        return  res.status(400).send('Invalid updates')
    }

    if (req.body.newPassword !== req.body.conNewPassword) {
        return res.status(400).send('Your new password does not match confirmation!')
    }

    try {
        // assigning admin provided id
        const admin = await Admin.findOne({_id})

        // updating fields
        admin.firstName = req.body.firstName
        admin.lastName = req.body.lastName
        admin.password = req.body.newPassword

        // save back to DB
        await admin.save()

        // send response
        res.status(200).send(admin)

    } catch (e) {
        res.status(400).send(e)
    }
})

// deleting admin
router.delete('/admins/:id', async (req, res) => {

    try {
        // assigning provided id
        const _id = req.params.id

        // delete specific admin
        const admin = await Admin.findOneAndDelete({_id})

        // send response
        res.status(200).send(admin)

    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router