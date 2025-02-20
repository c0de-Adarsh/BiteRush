import React, { useEffect, useState } from 'react'
import {MdOutlineMailOutline, MdOutlinePersonOutline} from 'react-icons/md'
import {RiLockPasswordLine} from 'react-icons/ri'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { TbLoader2 } from 'react-icons/tb'
import { registerUser } from '../Actions/userActions'
const Signup = () => {

  const { loading, isLogin } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
 

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);


  const registerHandler = (e) => {
     e.preventDefault()

     const data = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
     }
   
     console.log(data)
     dispatch(registerUser(data))
  }
  return (
   <>
   <div className='min-h-screen bg-custom-color md:px-12 px-4 flex justify-center items-center md:pb-7 pb-24 '>
        
        <div className='md:w-1/3 bg-white'>
         <div className='py-6 px-7 md:px-8 rounded shadow-sm shadow-gray-400 w-full'>
            <div className='text-gray-900 font-semibold text-center text-4xl'>Signup</div>


            <form action="" onSubmit={registerHandler} className='flex flex-col gap-3 mt-8'>
                <div className='flex flex-col'>
                    <div className='border flex items-center pl-1 py-1 border-gray-600'>
                    <MdOutlinePersonOutline className="text-gray-400" size={25} />
                    <input type="text" placeholder='Enter Your Name' onChange={(e)=> setUserData({
                      ...userData,
                      username: e.target.value
                    })} className='w-full outline-none px-2 py-1' />
                    </div>
                </div>


                <div>
                    <div className='border flex items-center pl-1 py-1 border-gray-600'>
                    <MdOutlineMailOutline className="text-gray-400" size={25} />
                    <input type="email" placeholder='Enter Your Email' onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  } className='w-full outline-none px-2 py-1' />
                    </div>
                </div>


                <div>
                    <div className='border flex items-center pl-1 py-1 border-gray-600'>
                    <RiLockPasswordLine className="text-gray-400" size={25} />
                    <input type="password" placeholder='Enter Your Password'  onChange={(e) =>
                    setUserData({
                      ...userData,
                      password: e.target.value,
                    })
                  } className='w-full outline-none px-2 py-1' />
                    </div>
                </div>

                
              

           <div className='pt-1'>
            {
              !loading ? (
                <button type='submit' className='w-full bg-orange-500 hover:bg-orange-600 rounded text-white py-1.5 font-semibold '>
                  Sign up
                </button>
              ) : (
                <button disabled={true}  className="w-full font-semibold flex justify-center items-center bg-orange-600 py-1.5 rounded text-white">
                       <span className="animate-spin"><TbLoader2 size={25} /></span>
                </button>
              )
            }
           </div>

             
             <div className='text-sm'>
             <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 underline">
                  Sign in
                </Link>{" "}
                here.
              </p>
             </div>
                
            </form>
         </div>
        </div>
   </div>
   </>
  )
}

export default Signup