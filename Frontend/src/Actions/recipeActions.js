import axios from "axios"
import { addRecipeFail, addRecipeRequest, addRecipeSuccess, deleteRecipeFail, deleteRecipeRequest, deleteRecipeSuccess, getAllrecipesFail, getAllrecipesRequest, getAllrecipesSuccess, getRecipeFail, getRecipeRequest, getRecipeSuccess, getUserRecipesFail, getUserRecipesRequest, getUserRecipesSuccess, updateRecipeFail, updateRecipeRequest, updateRecipeSuccess } from "../Slices/recipeSlice"
import API from "../Utils"
import { toast } from "react-toastify"

export const createRecipe = (resetData , recipeData) => async (dispatch) => {
    try {
       
        
        dispatch(addRecipeRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const {data} = await axios.post(`${API}/newrecipe`,recipeData,config)

        dispatch(addRecipeSuccess())

        if(data.success){
            resetData()
        }

        toast.success('Recipe Added Successfuly !')
    } catch (error) {
        dispatch(addRecipeFail(error.response.data.message))
    }
}


export const getMyRecipes = () => async (dispatch) => {

    try {
       
        dispatch(getUserRecipesRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const {data} = await axios.get(`${API}/allrecipeuser`,config)
     
        dispatch(getUserRecipesSuccess(data.recipe))
    } catch (error) {
        dispatch(getUserRecipesFail(error.response.data.message))
    }
}


export const getRecipe = (id) => async (dispatch) =>{

    try {
       
        dispatch(getRecipeRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const {data} = await axios.get(`${API}/onerecipe/${id}` ,config)

        dispatch(getRecipeSuccess(data.recipe))
    } catch (error) {
        dispatch(getRecipeFail(error.response.data.message))
    }
}


export const getAllRecipes = () => async (dispatch) => {

    try {
        
        dispatch(getAllrecipesRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const {data} = await axios.get(`${API}/allrecipe`,config)

        
        dispatch(getAllrecipesSuccess(data.recipes))

    } catch (error) {
        dispatch(getAllrecipesFail(error.response.data.message))
    }
}


export const  updateRecipe = (id,recipeData) => async (dispatch) =>{
   
    try {
       
        dispatch(updateRecipeRequest())
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const {data} = await axios.put(`${API}/updaterecipe/${id}`,recipeData,config)

        dispatch(updateRecipeSuccess())

        toast.success("Recipe updated successfully!");
    } catch (error) {
        dispatch(updateRecipeFail(error.response.data.message))
    }
}


export const deleteRecipe = (id) => async (dispatch) =>{

    try {
        
        dispatch(deleteRecipeRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const {data} = await axios.delete(`${API}/deleterecipe/${id}`,config)
        dispatch(deleteRecipeSuccess())

        toast.success("Recipe deleted successfully!");
        dispatch(getMyRecipes())
    } catch (error) {
        dispatch(deleteRecipeFail(error.response.data.message))
    }
}