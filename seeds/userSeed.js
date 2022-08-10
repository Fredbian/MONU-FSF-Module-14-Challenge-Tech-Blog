// import moduels
const { User } = require('../models')

// prepare data
const userData = [
  {
    username: 'Test User One',
    password: '111111'
  },
  {
    username: 'Test User Two',
    password: '222222'
  }
]

// bulk create data
const userSeed = () => {
  User.bulkCreate(userData)
}

// export moduels
module.exports = userSeed