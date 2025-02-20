import React, { useEffect } from 'react'
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import { getUser, IsLogin } from './Actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Login from './Pages/Login'



 const ProtectedRoute = ({ children }) => {
    const { isLogin } = useSelector(state => state.user);
    let location = useLocation();
  
    if (!isLogin) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children
  
  };
const App = () => {

  const { isLogin } = useSelector(state => state.user);


  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getUser());

  }, [dispatch, isLogin]);

  useEffect(() => {
    const LogOrNot = () => {
      dispatch(IsLogin());
    }
    LogOrNot()
  }, []);

 
  return (
    <>
    <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>

    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-14 font-bold  "

      />
    </BrowserRouter>
    </>
  )
}

export default App