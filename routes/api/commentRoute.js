// import modules
const router = require('express').Router()
const { Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// Get all comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(commentData => res.status(200).json(commentData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Create a new comment
router.post('/', withAuth, (req, res) => {
    // check session
    if (req.session) {
        Comment.create({
            comment_body: req.body.comment_body,
            blog_id: req.body.blog_id,
            user_id: req.session.user_id
        })
            .then(commentData => res.status(200).json(commentData))
            .catch(err => {
                console.log(err)
                res.status(500).json(err)
            })
    }
})

// Delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(commentData => {
            if (!commentData) {
                return res.status(404).json({ message: 'Cannot found comment by this id!' })
            }
            res.status(200).json(commentData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router