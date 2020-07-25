const User = require('../app/User')
const router = require('express').Router()

//middleware
const auth = (req,res,next)=>{
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/todos')
    }else{
        next()
    }
}

router.post('/login', (req,res)=>{
    const {username, password} = req.body

    User.findOne({
        where:{
            username,
        }
    })
    .then((user) => {
        if(!user){
            res.status(404).json({
                message: 'User not found'
            })
        }else if(!user.ValidPassword(password)){
            res.status(400).json({
                message: 'Password is invalid'
            })
        }else{
            req.session.user = user.dataValues;
            res.redirect('/todos');
        }
    }).catch((err) => {
        
    });
})




module.exports = router