import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const Home = () => {

  const {isLogin , user} = useSelector(state=> state.user)

  const navigate = useNavigate()

  const recipeExploreHandler = () => {
        if(isLogin){
          navigate('/recipes')
        } else{
          navigate('/login')
          toast.info('Please Login to view Recipes')
        }
  }
  return (
   <>
   <div className='min-h-screen flex items-center flex-col pt-20 md:px-14 px-10'>
     <div className='md:mt-16 mt-10'>
      <p className='md:text-5xl text-4xl font-bold text-center'>Discover the Delight of </p> <p className=' md:text-5xl  text-4xl font-bold text-center md:pt-2'>  <span className='text-orange-500'>Cooking </span>  with <span className='text-orange-500'>BiteRush</span> </p>
      <p className='md:text-sm  text-xs mt-5 text-gray-700 font-semibold text-center'>Step into a world of mouthwatering recipes and irresistible flavors!</p>
     </div>

     <div className='md:mt-8 mt-10'>
      <button onClick={recipeExploreHandler} className='bg-orange-500 text-white py-2 px-8 font-semibold rounded-md md:text-xl text-lg'>Explore Recipes</button>
     </div>
   </div>
   </>
  )
}

export default Home