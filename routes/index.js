const router = require('express').Router()
const api = require('./api')
const deshboardRoute = require('./dashboardRoute')
const homeRoute = require('./homeRoute')

// path for all APIs
router.use('/api', api)

// path for home page
router.use('/', homeRoute)

// path for deshboard
router.use('/dashboard', deshboardRoute)

// 404 page
router.use((req, res) => res.status(404).end())

module.exports = router