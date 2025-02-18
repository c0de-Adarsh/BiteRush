const express = require('express')

const router = express.Router()


const {signUpUser, loginUser, isLogin, getUser} = require('../Controllers/userControllers')
const { jwtAuthMiddleWare } = require('../jwt')

router.route('/register').post(signUpUser)
router.route('/login').post(loginUser)
router.route('/islogin').get(jwtAuthMiddleWare,isLogin)
router.route('/getuser').get(getUser)


module.exports = router;