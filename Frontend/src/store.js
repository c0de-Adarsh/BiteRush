import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slices/userSlice'
import recipeReducer from './Slices/recipeSlice'
export const store = configureStore({
    reducer:{
        user:userReducer,
        recipe: recipeReducer
    }
})