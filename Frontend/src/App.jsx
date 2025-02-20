import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar />

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App