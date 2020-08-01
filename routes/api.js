const User = require('../app/User')
const Todo = require('../app/Todo')
const router = require('express').Router()
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwtDecode = require('jwt-decode')


// dotenv.config({
//     path:'../.env'
// })
const {APP_SECRET} = process.env

const auth = (req,res,next)=>{
    if(req.headers['authorization']){
        next()
    }else {
        return res.status(403).json({success:false, message:'You must Log in first!'})
    }
}


// Login as Existing User
router.post('/login', async (req,res)=>{
        const {username, password} = req.body
        try {
            const user = await User.findOne({
                where:{
                    username
                }
            })
            if(!user){
                return res.status(404).json({
                    success:false, 
                    message: 'User not found'
                })
            }
            const validUser = bcrypt.compareSync(password, user.password)
            if(user && !validUser){
                return res.status(400).json({
                    success:false, 
                    message: 'Password is invalid'
                })
            }
            const payload = {
                id: user.id, 
                username: user.username,
                password: user.password, 
                email: user.email
            }
            jwt.sign(payload, APP_SECRET, {expiresIn: 1200},(err,token)=>{
                    if (err) return res.json({success:false, message: 'Failed to Log In'})
                    res.status(200).json({
                        success:true,
                        message:'Successfully logged in!',
                        token: `Bearer ${token}`,
                        user
                    })
                })
        } catch (error) {
            res.status(400).json({success:false, message:'Failed to log in'})
            console.log(error,'logging in')
        }
        // return
})


// register a new user
router.post('/register', async (req,res)=>{
    const {username, password, email, confirmPassword} = req.body
    User.findOne({where: {username}})
    .then((usernameExists) => {
        if (usernameExists)return res.status(400).json({success:false, message: 'Username already exists!'})
    }).catch((err) => {
        res.json({message: err}).status(400)
    });
    User.findOne({where: {email}})
    .then((emailExists) => {
        if (emailExists)return res.status(400).json({success:false, message: 'email already exists!'})
    }).catch((err) => {
        res.json({success:false, message: err}).status(400)
    });
    
    if(username === '') return res.status(400).json({success:false, message:'Username Field is required'})
    if(password === '') return res.status(400).json({success:false, message:'Password Field is required'})
    if(confirmPassword === '') return res.status(400).json({success:false, message:'Please confirm your password'})
    if (password !== confirmPassword) return res.status(400).json({success:false, message:'Passwords do not match!'})
    try {
        const newUser = await User.create({
            username,
            password,
            email
        })
        res.status(200).json({
            success:'true',
            message:'Successfully Registered!',
            user:newUser
        })
        console.log(newUser)
    } catch (err) {
        res.json({success:false, message:err}).status(400)
        console.log(err,'registering')
    }
       
})

//Get the Todos belonging to the User
router.get('/todos',auth, async(req,res)=>{
    try {
        let token = req.headers.authorization
        const user = jwtDecode(token)

        const todos = await Todo.findAll({
            where: {userId: user.id},
            order: [ [ 'createdAt', 'DESC' ]]
        })
        if (todos.length === 0) {
            return res.status(200).json({
                success:true, 
                message:'There are no todos here for you',
                todos
            })
        } else {
            res.json({succes:true, todos})
        }
    } catch (err) {
        res.json({success:false, message:err}).status(400)
    }
})
    
// Post a new Todo Item
router.post('/todos',auth, async(req,res)=>{
    try {
        const {title, description, priority, deadline, token} = req.body
        const user = jwtDecode(token)
        const todo = await Todo.create({
            title,
            description,
            deadline,
            priority,
            userId:user.id
        })
        res.json({success:true, message:'Successfully added a new Todo!', todo}).status(200)
    } catch (err) {
        res.json({success:false, message:err}).status(400)
    }
})

// 
router.put('/todos/:id',auth, async(req,res)=>{
    try {
        const {id} = req.params
        const {completed} = req.body
        const todo = await Todo.findOne({where:{id}})
        todo.completed = completed
        todo.update()
        res.json({success:true, message:'Successfully added a new Todo!', todo}).status(200)
    } catch (err) {
        res.json({success:false, message:err}).status(400)
    }
})

// Delete a todo item
router.delete('/todos/:id',auth, async (req,res)=>{
    try {
        const {id} = req.params
        const todo = await Todo.destroy({where: {id}})
        res.status(200).json({
            success:true,
            message:'Successfully deleted Todo Item',
            todo
        })
    } catch (err) {
        res.status(400).json({
            message:err
        })
    }
})



module.exports = router