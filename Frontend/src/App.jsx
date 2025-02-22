import React, { useEffect } from 'react'
import {BrowserRouter, Navigate, Route, Routes, useLocation} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import { getUser, IsLogin } from './Actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Login from './Pages/Login'
import Account from './Pages/Account'
import CreateRecipe from './Pages/CreateRecipe'
import MyRecipe from './Pages/MyRecipe'
import EditRecipe from './Pages/EditRecipe'
import Recipe from './Pages/Recipe'
import Recipes from './Pages/Recipes'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Footer from './Pages/Footer'



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
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>


      <Route path='/profile' element={
        <ProtectedRoute>
          <Account/>
        </ProtectedRoute>
      }/>

      <Route path='/createrecipe' element={
        <ProtectedRoute>
          <CreateRecipe />
        </ProtectedRoute>
      }/>

      <Route path='/myrecipe' element={
        <ProtectedRoute>
          <MyRecipe />
        </ProtectedRoute>
      }/>

      <Route path='/editrecipe/:recipeId' element={
        <ProtectedRoute>
          <EditRecipe />
        </ProtectedRoute>
      }/>

<Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
<Route path="/recipe/:recipeId" element={<ProtectedRoute><Recipe /></ProtectedRoute>} />
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
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App