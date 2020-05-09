const jwt = require('jsonwebtoken')
const User = require('../models/user')

const isStoreManager = async (req, res, next) => {

    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)        

        const user = await User.findOne({_id: decoded._id, role: 'storeManager', 'tokens.token': token})

        if (!user) {
            throw new Error('No admin found!')
        }

        req.token = token
        req.user = user

        next()
    } catch (e) {
        res.status(400).send({error: 'please authenticate'})
    }
}

module.exports = isStoreManager