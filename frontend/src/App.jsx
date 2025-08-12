import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import './index.css'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import { useState } from 'react'
import RefreshHandler from './refreshHandler.js'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }

  return (
    <div className='App'>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<PrivateRoute element ={<Home/>}/>}/>
      </Routes>
    </div>
  )
}

export default App
