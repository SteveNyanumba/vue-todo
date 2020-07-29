const User = require('../app/User')
const Todo = require('../app/Todo')
const router = require('express').Router()

//middleware
const auth = (req,res,next)=>{
    if(req.session.user && req.cookies.user_sid){
        res.status(403).json({
            message:'You must log in first!'
        }).redirect('/login')
    }else{
        next()
    }
}

router.post('/login', async (req,res)=>{
    const {username, password} = req.body

    try {
        const userExists = await User.findOne({where:{username}})
        if(userExists === null){
            return res.status(404).json({
                message: 'User not found'
            })
        }else if(!userExists === null && !userExists.validPassword(password)){
            return res.status(400).json({
                message: 'Password is invalid'
            })
        }else{

            req.session.user = userExists.dataValues;
            res.status(200).redirect('/todos');
            res.json({success:true})
        }
    } catch (err) {
        res.json({message:err}).status(500)
    }
})



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
        }).then((user)=>{
            req.session.user = user.dataValues
            res.status(200).json({
                success:true,
                message:'Successfully created a new User'
            }).redirect('/todos')
            .catch((err)=>{
                res.json({message:err}).status(500)
            })
        })
        
    }
})

router.get('/todos', auth, (req,res)=>{
    if(!req.session.user && !req.cookies.user_sid){
        return res.status(403).json({
            message:'You must log in first!'
        })

    }
    const {user} = req.session
    const todos = Todo.findAll({
        where: id === user.id
    })
    if (todos.length === 0) {
        return res.status(200).json({
            message:'There are no todos here for you'
        })
    } else res.status(200).json({success:true, todos})
})

router.post('/todos',auth, (req,res)=>{
    if(!req.session.user && !req.Cookie.user_sid){
        return res.status(403).json({
            message:'You must log in first!'
        })
    }
    const {user} = req.session
    const {title, description, deadline} = req.body
    const todo = new Todo({
        title,
        description,
        deadline,
        userId:user.id
    })
    todo.save()
        .then(() => {
            res.json({
                success:true,
                message:'Successfully added a new Todo'
            })
        }).catch((err) => {
            console.error(err)
        });

})
router.delete('/todos/:id',auth, async (req,res)=>{
    if(!req.session.user && !req.cookies.user_sid){
        return res.status(403).json({
            message:'You must log in first!'
        })
    }
    const {id} = req.params
    try {
        const todo = await Todo.destroy({where: id})
        res.status(200).json({
            success:true,
            message:'Successfully deleted Todo Item'
        })
    } catch (err) {
        res.status(400).json({
            message:err
        })
    }
})

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