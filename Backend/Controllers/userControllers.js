const { generateToken } = require('../jwt')
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const signUpUser = async (req ,res) =>{

    try {
        
        const {username , email , password} = req.body

        if(!username || !email || !password){
            return res.status(400).json({
                message:'Invalid Data'
            })
        }
        
        const existingEmail = await User.findOne({email})

        if(existingEmail){
            return res.status(400).json({
                message:'Email Already Exists'
            })
        }

        
        const existingUser = await User.findOne({username})

        if(existingUser){
            return res.status(400).json({
                message:'Username Already Exists'
            })
        }
        

        const hashPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            username,
            email,
            password: hashPassword
        })
       
        const userId = user._id;
        const userEmail = user.email;
        const token = generateToken(userId ,userEmail)

        res.status(200).json({
            message:'Register successfuly!',
            token,
            user,
            success:true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal Server error',
            success:false
        })
    }
}



const loginUser = async (req , res) => {
    
    try {
    
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(401).json({
                message:'Please Enter Email And Password',
                success:false
            })
        }
        

        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                message:'User Not Found',
                success:false
            })
        }


        const isMatched = await bcrypt.compare(password,user.password)

        if(!isMatched){
            return res.status(401).json({
                message:'Password does not matched'
            })
        }

        const token = generateToken(user._id,user.email)

        res.status(200).json({
            message:'User Logged In Successfuly !',
            success:true,
            token
        })
    } catch (error) {
        res.status(500).json({
            message:'Internal Server error',
            success:false
        })
    }
}


const isLogin = async (req , res) =>{
    try {
        
        const user = req.user

        if(!user){
            return res.status(404).json({
                success:true,
                isLogin: false
            })
        }

        if(user){
            res.status(200).json({
                success:true,
                isLogin:true
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
          message:error.message,
            success:false,
           
        })
    }
}



const getUser = async (req ,res) =>{

    try {
       
        

        res.status(200).json({
            success:true,
            user: req.user
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {signUpUser,loginUser,isLogin,getUser}