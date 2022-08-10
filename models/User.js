// import modules
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

// set up User model
class User extends Model {
    // method for checking password
    checkPassword(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    }
}

User.init({
    // define columns on User model
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // password length
            len: [6]
        }
    }
}, {
    // set up hooks (lifecycle events) to hash the password before the object is created in the database
    hooks: {
        beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10)
            return newUserData
        },
        beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
            return updatedUserData
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
})

// export module
module.exports = User