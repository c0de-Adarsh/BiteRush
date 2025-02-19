const express = require('express')
const app = express()
require('dotenv').config()
const db = require('./db')
const route = require('./Routes/Route')
const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload')
const apiErrors = require('./Utils/apiError')

const PORT = process.env.PORT || 5000



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.get('/',(req , res)=>{
    res.send('Hello world')
})

app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(route)
 
app.use(apiErrors)
app.listen(PORT,()=>{
    console.log(`The server is up and listing on ${PORT}`)
})
