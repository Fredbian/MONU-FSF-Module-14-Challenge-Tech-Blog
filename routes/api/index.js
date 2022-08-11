// import modules
const router = require('express').Router()
const userRoute = require('./userRoute')
const blogRoute = require('./blogRoute')
const commentRoute = require('./commentRoute')


// path for users
router.use('/users', userRoute)
// path for blogs
router.use('/blogs', blogRoute)
// path for comments
router.use('/comments', commentRoute)


module.exports = router