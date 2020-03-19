const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    image: String,

    description:String,

    datetime: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


});
const Post = mongoose.model('Post',PostSchema);

module.exports = Post;