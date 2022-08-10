// import moduels
const sequelize = require('../config/connection')
const { Blog } = require('../models')

// prepare data
const blogData = [
  {
    user_id: 1,
    title: 'Test Blog 1',
    blog_body: 'Test Blog Body 1'
  },
  {
    user_id: 2,
    title: 'Test Blog 2',
    blog_body: 'Test Blog Body 2'
  }
]

// bulk create data
const blogSeed = () => {
  Blog.bulkCreate(blogData)
}

// export moduels
module.exports = blogSeed

