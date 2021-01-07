const express = require('express')
const router = express.Router()
const Post = require('../models/posts')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        console.log(err)
    }
})

router.post('/', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    post.save().then(() => { 
        console.log(post)
    }).catch((err) => {
        console.log(err)
    }) 
})

module.exports = router