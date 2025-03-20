import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Page/Register'
import Login from './Page/Login'
import Home from './Page/Home'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </div>
  )
}

export default App