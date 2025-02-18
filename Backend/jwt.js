const jwt = require('jsonwebtoken');
const User = require('./Models/User')

//create token

const generateToken = (userData) =>{
     
   try {
    
    const payload = {
        userId: userData._id,
        email: userData.email,
    }


    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '5d'})

    return token
   } catch (error) {
     console.log('Error While creating token',error)
   }
}


const jwtAuthMiddleWare = async(req,res,next) => {
    
    try {
        
       const authorization = req.headers.authorization

       if(!authorization){
        return res.status(401).json({
            message:'Token Not Found',
            success:false
        })
       }

       const token = authorization.split(' ')[1]

       if(!token){
        return res.status(400).json({
            message:'Invalid Token',
            success:false
        })
       }


       jwt.verify(token,process.env.JWT_SECRET , async (err , decoded) =>{
         
         if(err){
            return res.status(400).json({
                message:'Invalid Token',
                success:false
            })
         }

         const user = await User.findById(decoded.userId)

         if(!user){
            return res.status(401).json({
                message:'User Not Found',
                success:false
            })
         }
         req.user = user;
         next();
       })
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
    
}


module.exports = {generateToken , jwtAuthMiddleWare}