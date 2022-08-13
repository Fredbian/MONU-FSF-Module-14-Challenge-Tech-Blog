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
const userSeed = async () => {
  
  await User.bulkCreate(userData, {
    individualHooks: true, // to trigger before save hook
  });
}

// export moduels
module.exports = userSeed