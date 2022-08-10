// import modules
const router = require('express').Router()
const { User, Blog, Comment } = require('../../models')


// GET all User
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userData => {
            //if found, return data
            res.status(200).json(userData)
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// GET User by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
            {
                model: Blog,
                attributes: ['id', 'title', 'blog_body', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'blog_id', 'user_id', 'created_at'],
                include: {
                    model: Blog,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(userData => {
            // if not found, show message
            if (!userData) {
                return res.status(404).json({ message: 'Cannot found user with this id!' })
            }
            // else return data
            res.status(200).json(userData)
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// Create a new User when sign up
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(userData => {
            // user data to session
            req.session.save(() => {
                req.session.user_id = userData.id
                req.session.username = userData.username
                req.session.loggedIn = true
                res.status(200).json(userData)
            })
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// login validation
router.post('/login', (req, res) => {
    User.findOne({
        where: { username: req.body.username }
    })
        .then(userData => {
            // Validate username
            if (!userData) {
                return res.status(400).json({ message: 'Incorrect username or password!' })
            }

            // Validate password
            const password = userData.checkPassword(req.body.password)

            // if password not match, show message
            if (!password) {
                return res.status(400).json({ message: 'Incorrect username or password!' })
            }
            // else, validate data and login
            req.session.save(() => {
                req.session.user_id = userData.id
                req.session.username = userData.username
                req.session.loggedIn = true
                res.status(200).json({
                    user: userData,
                    message: 'LOGGIN SUCCESS!'
                })
            })
        })
        // handle err
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


// log out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    }
    res.status(404).end()
})

module.exports = router