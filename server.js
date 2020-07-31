const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const apiRoutes = require('./routes/api')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')

const history  = require('connect-history-api-fallback')

// const session = require('express-session')
// const webRoutes = require('./routes/web')
// const passport = require('passport')

dotenv.config({
    path:'./.env'
})
const {PORT, NODE_ENV} = process.env
if(NODE_ENV === 'development'){
    morgan('dev')
}

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Setting Up Passport
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(cors())


app.use('/api',apiRoutes)

app.use(history())
app.use(express.static('./public'))


app.listen(PORT, ()=>{
    console.log(`Started App on http://localhost:${PORT}`);
    console.log(`On the Network on http://192.168.100.11:${PORT}`);
})
