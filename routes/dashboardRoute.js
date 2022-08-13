// import modules
const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Blog, Comment } = require('../models')
const withAuth = require('../utils/auth')

//GET info and render dashboard page
router.get('/', withAuth, (req, res) => {
    // all blogs
    Blog.findAll({
        where: { user_id: req.session.user_id },
        // attributes: [
        //     'id',
        //     'title',
        //     'blog_body',
        //     'create_at'
        // ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                // attributes: ['id', 'blog_id', 'user_id', 'comment_body', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(blogData => {
            const blogs = blogData.map(blog => blog.get({ plain: true }))
            res.render('dashboard', {
                blogs,
                loggedIn: true
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// When click on a blog, edit blog
router.get('/edit/:id', withAuth, (req, res) => {
    Blog.findOne({
        where: { id: req.params.id },
        // attributes: ['id', 'title', 'blog_body', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                // attributes: ['id', 'blog_id', 'user_id', 'comment_body', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(blogData => {
            // if not found, show message
            if (!blogData[0]) {
                return res.status(404).json({ message: 'Cannot found blog by this id!' })
            }
            // else return edit blog page
            const blog = blogData.get({ plain: true })
            res.render('edit-blog', {
                blog,
                loggedIn: true
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// new blog
router.get('/new', (req, res) => {
    res.render('add-blog')   
})

module.exports = router