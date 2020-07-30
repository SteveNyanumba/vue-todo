const User = require('../app/User')
const Todo = require('../app/Todo')
const router = require('express').Router()
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config({
    path:'../.env'
})


//Authentication middleware
const auth = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(301).json({message:'You must log in first!'})
    }else{
        next()
    }
}


// Login as Existing User
router.post('/login', async (req,res)=>{
    try {
        const {APP_SECRET} = process.env
        const {username, password} = req.body
        const userExists = await User.findOne({where:{username}})
        if(userExists === null){
            return res.status(404).json({
                message: 'User not found'
            })
        }else if(!userExists === null && !userExists.validPassword(password)){
            return res.status(400).json({
                message: 'Password is invalid'
            })
        }
        
        let token = jwt.sign(userExists.dataValues, APP_SECRET,{
            expiresIn: 600
        })
        // localStorage.setItem('token',token)
        res.status(200).json({
            success:true,
            message:'Successfully logged in!',
            token
        })
    } catch (err) {
        res.json({message:err}).status(500)
    }
})


// register a new user
router.post('/register', (req,res)=>{
    const usernameExists = User.findOne({where: {username : req.body.username}})
    const emailExists = User.findOne({where: {email : req.body.email}})
    if(!req.body.username === null) return res.status(400).json({mesage:'Username Field is required'})
    if(!req.body.password === null) return res.status(400).json({mesage:'Password Field is required'})
    if(!req.body.confirmPassword === null) return res.status(400).json({mesage:'Please confirm your password'})
    
    if (!req.body.password === req.body.confirmPassword) return res.status(400).json({message:'Passwords do not match!'})
    
    else if (!usernameExists === null){
        return res.status(400).json({
            message: 'Username already exists!'
        })
    }
    
    else if (!emailExists === null){
        return res.status(400).json({
            message: 'email already exists!'
        })
    }
    
    else{
        User.create({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
        .then((user)=>{
            let token = jwt.sign(user)
            res.status(200).json({
                success:'true',
                message:'Successfully Registered!',
                token
            })
            
        })
        .catch((err)=>{
            res.json({message:err}).status(400)
        })
        
    }
})

//Get the Todos belonging to the User
router.get('/todos', auth, async(req,res)=>{
    try {
        const {APP_SECRET} = process.env
        const user = jwt.verify(req.headers['authorization'], APP_SECRET )
        const userTodos = await Todo.findAll({
            where: {userId: user.id}
        })
        if (userTodos.length === 0) {
            return res.status(200).json({
                message:'There are no todos here for you'
            })
        } else {
            res.json({succes:true, userTodos})
        }
    } catch (err) {
        res.json({message:err}).status(400)
    }
})
    
// Post a new Todo Item
router.post('/todos',auth, async(req,res)=>{
    try {
        const {APP_SECRET} = process.env
        let token = req.headers['authorization']
        const user = await jwt.verify(token, APP_SECRET)
        const {title, description, deadline} = req.body
        const todo = await Todo.create({
            title,
            description,
            deadline,
            userId:user.id
        })
        res.json({success:true, message:'Successfully added a new Todo!', todo})
    } catch (err) {
        res.json({message:err}).status(400)
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
        })
    } catch (err) {
        res.status(400).json({
            message:err
        })
    }
})


// Logout of a session
router.post('/logout', auth, (req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        res.clearCookie('user_sid')
        return res.status(200).json({
            message:'You have successffully logout',
            success:true
        })
    }else{
        res.redirect('/login')
    }
})

module.exports = router