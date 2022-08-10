// import moduels
const { Comment } = require('../models')

// prepare data
const commentData = [
  {
    user_id: 1,
    blog_id: 2,
    comment_body: 'Comment for blog 2'
  },
  {
    user_id: 2,
    blog_id: 1,
    comment_body: 'Comment for blog 1'
  }
]

// bulk create data
const commentSeed = () => {
	Comment.bulkCreate(commentData)
}

// export moduels
module.exports = commentSeed




