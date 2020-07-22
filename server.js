const express = require('express')
const app = express()
const dotenv = require('dotenv')
const morgan = require('morgan')
const apiRoutes = require('./routes/api')

dotenv.config({
    path:'./.env'
})
const {PORT, DB_CONNECTION, NODE_ENV} = process.env
if(NODE_ENV === 'development'){
    morgan('dev')
}

app.use(express.static('./public'))

app.use('/api',apiRoutes)




app.listen(PORT, ()=>{
    console.log(`Started App on http://localhost:${PORT}`);
    console.log(`On the Network on http://192.168.0.102:${PORT}`);
})
