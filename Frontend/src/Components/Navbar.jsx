import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, Avatar, Menu, MenuItem, Popover } from '@mui/material';
import { FaBars } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import {IsLogin} from '../Actions/userActions'


const avatars = [
  {
    src: '/images/p.jpg',

  },
  {
    src: '/images/p2.webp',
  },
  {
    src: '/images/p3.png',
  },
  {
    src: '/images/p4.jpg'
  }
]
const Navbar = () => {

  const { user, isLogin } = useSelector(state => state.user)
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAvatar, setUserAvatar] = useState("");
  const [toggle, setToggle] = useState(false);
  const userEmail = user.email || "";
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const simpleHash = (str) => {

    let hash = 0

    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)

      hash = (0 << 5) - hash + char;

      hash &= hash;


    }
    return Math.abs(hash)
  }
   

  const getProfileImageIndex = (userEmail) => {
    const hashedInt = simpleHash(userEmail);
    return hashedInt % avatars.length;
  };

  useEffect(() => {
    if (userEmail) {
      const avatarIndex = getProfileImageIndex(userEmail);
      setUserAvatar(avatars[avatarIndex].src);
    }
  }, [userEmail]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    localStorage.removeItem('accesstoken')
    dispatch(IsLogin())
    navigate('/')
    setToggle(false)
    toast.success('Logout Successfuly !')
  }
  return (
    <>
      <nav className='bg-white backdrop:filter backdrop:blur-sm border-b py-3 md:py-4 bg-opacity-85 min-w-full z-10 fixed'>
        <div className='flex px-5 md:px-12 justify-between items-center'>
          <Link to='/' className='text-black md:text-3xl font-bold text-2xl'>
            <span className='text-orange-500'>Bite</span>Rush
          </Link>

          <div className='flex justify-center items-center gap-12'>
            <ul className='md:flex hidden gap-12 justify-center items-center'>

              {isLogin && <Link to='/recipes' className="text-black hover:text-orange-500 text-lg font-semibold">
                Recipes
              </Link>}


              <Link className='text-black font-semibold hover:text-orange-500 text-lg'>
                About
              </Link>

              <Link className='text-black font-semibold hover:text-orange-500 text-lg'>
                Contact
              </Link>
            </ul>



            {isLogin ? <div className='flex'>
              <IconButton sx={{ p: 0 }} onClick={handleMenuOpen}>
                <Avatar alt="Remy Sharp" src={userAvatar} sx={{ width: 35, height: 35 }} />
              </IconButton>
            </div> : <Link className='bg-orange-500 text-white md:flex hidden md:text-sm text-xs hover:bg-orange-600 py-2 px-4 rounded-md font-semibold' to='/register'>
              Sign In</Link>}


            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            // disableScrollLock={true}

            >
              <MenuItem onClick={() => {
                navigate("/profile")
                handleMenuClose()
              }} >

                <p className='font-semibold'>Profile</p>
              </MenuItem>
              <MenuItem onClick={() => {
              logOut()
              handleMenuClose()
            }}  >
              <p className='text-red-600 font-semibold'>Logout</p>
            </MenuItem>
            </Menu>




            <div className='md:hidden flex'>
              <div onClick={()=> setToggle(!toggle)}>
                {toggle ? <RxCross2 size={27} /> : <FaBars size={25}/>}
              </div>
            </div>
          </div>
        </div>



        <div className={`md:hidden ${toggle ? 'flex': 'hidden'} pt-6 pb-3 pl-8`}>
          <ul className='flex flex-col gap-5'>
            
          {isLogin && <Link to="/recipes" onClick={() => setToggle(!toggle)} className="text-black hover:text-orange-500 text-lg font-semibold">
            Recipes
          </Link>}

          <Link to="/about" onClick={() => setToggle(!toggle)} className="text-black hover:text-orange-500 text-lg font-semibold">
            About
          </Link>

          <Link to="/contact" onClick={() => setToggle(!toggle)} className="text-black hover:text-orange-500 text-lg font-semibold">
            Contact
          </Link>

          <Link to="/login" onClick={() => setToggle(!toggle)} className="text-black hover:text-orange-500 text-lg font-semibold">
            Sign In
          </Link>

          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar