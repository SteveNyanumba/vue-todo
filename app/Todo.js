const {Sequelize, INTEGER, STRING, TEXT, DATE, BOOLEAN} = require('sequelize')
const { increment, primaryKeyAttribute } = require('./User')
const sequelize = new Sequelize('mysql://root@localhost:3306/todoapp',{
    dialect:'mysql'
})

const Todo = sequelize.define('todos', {
    id:{
        type: INTEGER,
        unique: true,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:STRING,
        allowNull:false,

    },
    priority:{
        type:STRING,
        allowNull:false,

    },
    description:{
        type:TEXT,
        allowNull:false,
    },
    deadline:{
        type:DATE,
        allowNull:false,

    },
    userId:{
        type:INTEGER,
        allowNull:false,
        
    },
    completed:{
        type:BOOLEAN,
        defaultValue:false,
        allowNull:false
    }

})

sequelize.sync()
        .then(() => {
            console.log('Todos table has been successfully created')
        }).catch((err) => {
            console.log(err);
        });

module.exports = Todo