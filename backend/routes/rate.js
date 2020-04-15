//dependancy
const router = require('express').Router();

//import the model
const Rate = require('../models/rate');


//create a new rate
router.post('/rate', async(req,res) => {
    try{

        //create a new rate
        const rate = new Rate({
            rate: req.body.rate,
            comment: req.body.comment
        })

        //save to DB
        await rate.save()

        //send response
        res.status(201).send(rate)
    }
    catch(e) {
        res.status(400).send(e.message)
    }
})


//read rate
router.get('/rate/:id', async(req,res) => {
    try{
        //assign id
        const _id = req.params.id

        //find the specific rate
        const rate = await Rate.findOne({_id})

        //send the response
        res.status(200).send(rate)
    }
    catch (e) {
        res.status(400).send(e.message)
    }
})

//read the rate
router.get('/rate', async (req,res) => {
     try{
         //assign all rates
         const rate = await Rate.find({})

         //send response
         res.status(200).send(rate)
     }catch (e) {
         res.status(400).send(e.message)
     }
})

//updatind the rate
router.patch('/rate/:id', async (req,res) =>{

    //assignin provided id
    const _id = req.params._id

    //declaring variables
    const updates = Object.keys(req.body)
    const allowedUpdates = ['rate','comment']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    //conditions
    if(!isValidOperation) {
        return res.status(400).send('Invalid update')
    }

    try{

        //assigning rate
        const rate = await Rate.findOne({_id})

        //updating fields
        rate.rate = req.body.rate
        rate.comment = req.body.comment

        //save back to DB
        await rate.save()

        //send response
        res.status(200).send(rate)

    } catch (e) {
        res.status(400).send(e)
    }
})

//deleting a rate
router.delete('/rate/:id',async(req,res) => {

    try{

        //assigning provided id
        const _id = req.params.id

        //deleting the specific rate
        const rate = await Rate.findByIdAndDelete({_id})

        //send response
        res.status(200).send(rate)

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router