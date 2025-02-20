import axios from "axios"
import { getUserFail, isLoginRequest, isLoginSuccess, loginRequest, loginSuccess, registerFail, registerRequest, registerSuccess } from "../Slices/userSlice"
import API from "../Utils"
import { toast } from "react-toastify"




export const loginUser = (userData) => async(dispatch)=>{
    try {
        
        dispatch(loginRequest())

        const {data} = await axios.post(`${API}/login`,userData)

        dispatch(loginSuccess())
        localStorage.setItem('accesstoken',data.token)
        toast.success('Login Successfuly !')
    } catch (error) {
        dispatch(error.response.data.message)
        toast.error(error.response.data.message)
    }
}

export const registerUser = (userData) => async (dispatch) =>{

    try {
       
        dispatch(registerRequest())

        const {data} = await axios.post(`${API}/register`,userData)

        dispatch(registerSuccess())
        localStorage.setItem('accesstoken',data.token)
        toast.success('Register Successfuly!')
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
        console.log(error.response.data.message)
        if(error.response.data.message.includes('duplicates')){
            toast.error('User Already Exist !')
        } else {
            toast.error(error.response.data.message)
        }
    }
}


export const islogin = () => async (dispatch) =>{
    try {
       
        dispatch(isLoginRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
            }
        }

        const {data} = await axios.get(`${API}/islogin`,)

        dispatch(isLoginSuccess(data))
    } catch (error) {
        dispatch(getUserFail(error.response.data.message))
    }
}