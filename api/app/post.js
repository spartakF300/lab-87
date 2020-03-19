const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const router = express.Router();
const path = require('path');
const auth = require('../middleware/auth');

const Post = require('../model/Post');
const config =require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.get('/',  async (req, res) => {

    try {
        const posts = await Post.find().sort({datetime: -1}).populate('user');
        res.send(posts)
    } catch (e) {
        res.status(404).send({message: 'Not found'});
    }

});

router.get('/:id',  async (req, res) => {

    try {
        const post = await Post.find({_id: req.params.id}).populate('user');
        res.send(post)
    } catch (e) {
        res.status(404).send({message: 'Not found'});
    }

});


router.post('/',[auth,upload.single('image')], async (req, res) => {
    if (!!req.body.description || !!req.file){
        const postData = req.body;

    if (req.file) {
        postData.image = req.file.filename;
    }
    postData.user = req.user._id;
    const post = new Post(postData);

    try {

        await post.save();
        return res.send({id: post._id})

    } catch (e) {

        return res.status(404).send(e);
    }
    }else {
        return res.status(404).send('error');
    }
});

module.exports = router;