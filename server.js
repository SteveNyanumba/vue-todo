const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const apiRoutes = require('./routes/api')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

dotenv.config({
    path:'./.env'
})
const {PORT, DB_CONNECTION, NODE_ENV, APP_SECRET} = process.env
if(NODE_ENV === 'development'){
    morgan('dev')
}

app.use(bodyParser.json())

app.use(cookieParser())

app.use(session({
    key:'user_sid',
    secret: APP_SECRET,
    resave:false,
    saveUninitialized: false,
    cookie:{
        expires: 300000
    }
}))

//clear cookies if session expires
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});


app.use(express.static('./public'))

app.use('/api',apiRoutes)




app.listen(PORT, ()=>{
    console.log(`Started App on http://localhost:${PORT}`);
    console.log(`On the Network on http://192.168.0.102:${PORT}`);
})
