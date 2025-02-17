const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})


const db = mongoose.connection

db.on('connected',()=>{
    console.log('MONGODB conntected successfully')
})

db.on('disconnted',()=>{
    console.log('MONGODB disconnected successufully')
})


db.on('error',(err)=>{
    console.log('MONGODB connection error',err)
})

module.exports = db