const express = require('express')

const router = express.Router()


const {signUpUser, loginUser, isLogin, getUser} = require('../Controllers/userControllers')
const { jwtAuthMiddleWare } = require('../jwt')
const { CreateNewRecipe, getAllRecipes, getRecipe, getAllRecipesOfUser, updateRecipe, deleteRecipe } = require('../Controllers/recipeControllers')


//user routes
router.route('/register').post(signUpUser)
router.route('/login').post(loginUser)
router.route('/islogin').get(jwtAuthMiddleWare,isLogin)
router.route('/getuser').get(jwtAuthMiddleWare,getUser)


//recipe routes

router.route('/newrecipe').post(jwtAuthMiddleWare,CreateNewRecipe)
router.route('/allrecipe').get(jwtAuthMiddleWare,getAllRecipes)
router.route('/onerecipe/:recipeId').get(jwtAuthMiddleWare,getRecipe)
router.route('/allrecipeuser').get(jwtAuthMiddleWare,getAllRecipesOfUser)
router.route('/updaterecipe/:recipeId').put(jwtAuthMiddleWare,updateRecipe)
router.route('/deleterecipe/:recipeId').delete(jwtAuthMiddleWare,deleteRecipe)

module.exports = router;