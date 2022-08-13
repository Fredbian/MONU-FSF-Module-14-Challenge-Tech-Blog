// import modules
const router = require('express').Router()
const sequelize = require('../config/connection')
const { User, Blog, Comment } = require('../models')


// rander home page
router.get('/', (req, res) => {
    Blog.findAll({
        // GET id, title, body and timstamp from blog table
        // ORDER BY desc
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
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(blogData => {
            // map all blogs create a array
            const blogs = blogData.map(blog => blog.get({ plain: true }))
            // pass all blogs to homepage
            res.render('homepage', {
                blogs,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Render one blog
router.get('/blog/:id', (req, res) => {
    Blog.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
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

            const blog = blogData.get({ plain: true })
            res.render('one-blog', {
                blog,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})



// login page
router.get('/login', (req, res) => {
    // if login success, redirect to home page
    if (req.session.loggedIn) {
       return res.redirect('/')
    }
    res.render('login')
})


// sign up page
router.get('/signup', (req, res) => {
    // after sign up, redirect to home page 
    if (req.session.loggedIn) {
        return res.redirect('/')
    }
    res.render('signup')
})


module.exports = router