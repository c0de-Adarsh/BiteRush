import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import Loader from '../Components/Loader'
import { getUser } from '../Actions/userActions';

const Account = () => {

    const { isLogin, user, loading } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    
     useEffect(()=>{
        if(!isLogin){
           navigate('/')
        }
     },[isLogin,navigate])  

     useEffect(()=>{
        dispatch(getUser())
     },[])

    const changeDateFormat = (str) => {
        return str.split("/")[0] + "/" + str.split("/")[1] + "/" + str.split("/")[2];
    };
  return (
  <>
  <div className='min-h-screen pt-20 bg-white flex flex-col items-center md:px-14 px-10 '>
    {
        loading ? <div className='mt-10'> <Loader/> </div> :
        <div className='w-full  mt-10 md:mt-10 flex flex-col md:flex-row text-center md:justify-around'>
         <div className='mt-4 text-left '>
            <h1 className='md:text-5xl text-4xl font-semibold text-orange-500'>Profile</h1>
            <p className='md:text-2xl text-xl font-semibold text-gray-700 mt-4'>
                Name: <span className='text-gray-900'>{user.username || ''}</span>
            </p>
            <p className='md:text-2xl text-xl font-semibold text-gray-700 mt-4'>
                Email <span>{user.email || ''}</span>
            </p>
            <p className='md:text-2xl text-xl font-semibold text-gray-700 mt-4'>
                Joined on: <span>{user.createdAt ? changeDateFormat(new Date(user.createdAt).toLocaleDateString()): ''} </span> 
            </p>
         </div>

         <div className='flex flex-col gap-8 md:mt-6 mt-12 px-8 md:px-0'>
            <Link to='/myrecipe' className='text-lg px-10 py-2 bg-orange-500 text-white font-semibold rounded-md'>My Recipes</Link>
            <Link to='/createrecipe' className='text-lg px-10 py-2 bg-orange-500 text-white font-semibold rounded-md'>Add Recipe</Link>
         </div>
        </div>
    }
  </div>
  </>
  )
}

export default Account