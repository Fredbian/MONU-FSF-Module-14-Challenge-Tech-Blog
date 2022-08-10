// import modules
const router = require('express').Router()
const userRoute = require('./userRoute')
const blogRoute = require('./blogRoute')
const commentRoute = require('./commentRoute')

router.use('/users', userRoute)
router.use('/blogs', blogRoute)
router.use('/comments', commentRoute)


module.exports = router