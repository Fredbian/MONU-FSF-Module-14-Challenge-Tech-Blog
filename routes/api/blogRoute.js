// import modules
const router = require('express').Router()
const { User, Blog, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// GET all Blog
router.get('/', (req, res) => {
    Blog.findAll({
        // Get blog id, title, and blog and timstamp from Blog table
        attributes: ['id', 'title', 'blog_body', 'create_at'],
        order: [
            ['created_at', 'DESC']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'blog_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username'],
                }
            }
        ]
    })
        // return blogs
        .then((blogData) => res.status(200).json(blogData))
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// GET a blog by id
router.get('/:id', (req, res) => {
    Blog.findOne({
        where: { id: req.params.id },
        attributes: [
            'id',
            'blog_body',
            'title',
            'create_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'blog_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(blogData => {
            // if not found, return message
            if (!blogData) {
                return res.status(404).json({ message: 'Cannot found blog by this id!' })
            }
            // else, return data
            res.status(200).json(blogData)
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Create a new blog
router.post('/', withAuth, (req, res) => {
    Blog.create({
        title: req.body.title,
        blog_body: req.body.blog_body,
        user_id: req.session.user_id
    })
        // if no err, return data
        .then(blogData => res.status(200).json(blogData))
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Update a blog
router.put('/:id', withAuth, (req, res) => {
    Blog.update(req.body, {
        where: { id: req.params.id }
    })
        .then(blogData => {
            if (!blogData) {
                return res.status(404).json({ message: 'Cannot found blog by this id!' })
            }
            res.status(200).json(blogData)
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// DELETE a blog
router.delete('/:id', withAuth, (req, res) => {
    Blog.destroy({
        where: { id: req.params.id }
    })
        .then(blogData => {
            if (!blogData) {
                return res.status(404).json({ message: 'Cannot found blog by this id!' })
            }
            res.status(200).json(blogData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router