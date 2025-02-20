import React, { useEffect, useState } from 'react'
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { TbLoader2 } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { loginUser } from '../Actions/userActions';

const Login = () => {

    const [userData, setUserData] = useState({});

    const { loading, isLogin } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
       if(isLogin){
        navigate('/')
       }
    },[navigate,isLogin])

    const loginHandler = (e) =>{
        e.preventDefault()

        const data = {
            email: userData.email,
            password: userData.password,
            googleLogin: false
        }
        dispatch(loginUser(data))
    }
  return (
  <>
  <div className='min-h-screen bg-custom-color md:px-12  px-4 md:pb-7  pb-24 flex justify-center items-center'>
   <div className='md:w-1/3 bg-white'>
    <div className='shadow-gray-500 py-6 px-7 md:px-8 w-full shadow-sm rounded'>
        <div className='text-4xl font-semibold text-gray-900 text-center'>Login</div>
        <form action="" className='flex flex-col gap-4 mt-8' onSubmit={loginHandler}>
            <div className='flex flex-col'>
                <div className='border border-gray-500 pl-1 py-1 flex items-center'>
                <MdOutlineMailOutline className="text-gray-400" size={25} />
                <input
                  type="text"
                  required
                  placeholder="Enter your email"
                  className="px-2 py-1 w-full outline-none"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                />
                </div>
            </div>



            <div className='flex flex-col'>
                <div  className='border border-gray-500 pl-1 py-1 flex items-center'>
                <RiLockPasswordLine className="text-gray-400" size={25} />
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="px-2 py-1 w-full outline-none"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      password: e.target.value,
                    })
                  }
                />
                </div>
            </div>

            <div>
                {
                    !loading ? (
                        <button type='submit' className='bg-orange-500 text-white w-full flex justify-center items-center rounded py-1.5'>
                          Login
                        </button>
                    ) : (<button disabled={true} className="w-full font-semibold flex justify-center items-center bg-orange-600 py-1.5 rounded text-white">
                        <span className="animate-spin"><TbLoader2 size={25} /></span>
                    </button>)
                }
            </div>
            <div className="text-sm">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 underline">
                  Sign up
                </Link>{" "}
                now.
              </p>
            </div>
        </form>
    </div>
   </div>
  </div>
  </>
  )
}

export default Login