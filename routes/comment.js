//dependancy
const router = require('express').Router();

//import the model
const Comment = require('../models/comment');


//create a new comment
router.post('/comment',(req,res) => {


    const comment = req.body.comment
    const rate = req.body.rate
    const itemid =  req.body.itemid
    const userid = req.body.userid
    const userName = req.body.userName

        //create a new comment
        const newcomment = new Comment({
            comment,
            rate,
            itemid,
            userid,
            userName
        })
        //save to DB
        newcomment.save()
        .then(() => res.json({status: 201,_id: newcomment._id,}))
        .catch(err => res.status(400).json('Error : ' + err));

    }
)


//read comment
router.route('/comment/:id').get((req, res) => {
    Comment.find({"itemid":req.params.id})
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

//updating the comment
router.patch('/comment/:_id', async (req,res) =>{

    //assigning provided id
    const id = req.params._id
    //declaring variables
    const updates = Object.keys(req.body)
    const allowedUpdates = ['comment','rate']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    //conditions
    if(!isValidOperation) {
        return res.status(400).send('Invalid update')
    }

    try{

        //assigning comment
        const comment = await Comment.findOne({"_id":id})

        //updating fields
        comment.comment = req.body.comment
        comment.rate = req.body.rate
        
        //save back to DB
        await comment.save()

        //send response
        res.status(200).send(comment)

    } catch (e) {
        res.status(400).send(e)
    }
})

//deleting a comment
router.delete('/comment/:id',async(req,res) => {

    try{

        //assigning provided id
        const _id = req.params.id
        console.log(_id);

        //deleting the specific comment
        const comment = await Comment.findByIdAndDelete({_id})

        //send response
        res.status(200).send(comment)

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router