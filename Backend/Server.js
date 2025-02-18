const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db')
const route = require('./Routes/Route')


const PORT = process.env.PORT || 5000


app.get('/',(req , res)=>{
    res.send('Hello world')
})

app.use(express.json())

app.use(route)

app.listen(PORT,()=>{
    console.log(`The server is up and listing on ${PORT}`)
})
