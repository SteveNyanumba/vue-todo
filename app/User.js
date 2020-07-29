const {Sequelize, STRING, INTEGER} = require('sequelize')
const dotenv = require('dotenv')
dotenv.config({
  path:'../.env'
})
const bcrypt = require('bcrypt')
const DB = process.env.DB_CONNECTION


const sequelize = new Sequelize('mysql://root@localhost:3306/todoapp',{
  dialect:'mysql'
})

const User = sequelize.define('users', {
    id:{
        type:INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true,
    },
    username:{
        type:STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:STRING,
        allowNull:false,
    },

},{
    hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      instanceMethods: {
        validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        }
      }    
})

sequelize.sync()
    .then(() => console.log('Users table has been successfully created'))
    .catch(error => console.log('This error occured', error));


module.exports = User;