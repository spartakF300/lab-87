const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment= require('../model/Comment');

router.get('/',  async (req, res) => {
    try {
        const comments = await Comment.find({post:req.query.postId}).sort({datetime: -1}).populate('post').populate('user');
        res.send(comments)
    } catch (e) {
        res.status(404).send({message: 'Not found'});
    }
});


router.post('/',auth, async (req, res) => {
    const commentData = req.body;

    commentData.user = req.user._id;
    const comment = new Comment(commentData);
    try {
        await comment.save();
        return res.send({id: comment._id})
    } catch (e) {
        return res.status(404).send(e);
    }
});

module.exports = router;