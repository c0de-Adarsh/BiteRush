const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db')


const PORT = process.env.PORT || 5000


app.get('/',(req , res)=>{
    res.send('Hello world')
})


app.listen(PORT,()=>{
    console.log(`The server is up and listing on ${PORT}`)
})
