const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        title: { type: String, required: true, minLenghth: 4 },
        body: String,
        pub: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
    }
)

const postModel = mongoose.model('post', postSchema)

module.exports = postModel