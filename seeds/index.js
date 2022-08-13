// import moduels
require('dotenv').config();
const sequelize = require('../config/connection')
const userSeed = require('./userSeed')
const blogSeed = require('./blogSeed')
const commentSeed = require('./commentSeed')


const seed = async () => {
    await sequelize.sync({force: true})

    await userSeed(); // promise
    console.log(`USER SEED ADDED!`)

    await blogSeed()
    console.log(`BLOG SEED ADDED!`)

    await commentSeed()
    console.log(`COMMENT SEED ADDED!`)

    process.exit(0)    
}

seed()