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
        async beforeSave(userData){
            console.log('current user data', this);
            if(this.password !== userData.password){
                userData.password = await bcrypt.hash(userData.password, 10)
            }
            return userData
        }      
    }, 
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
})

// export module
module.exports = User