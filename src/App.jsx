import React, { useEffect } from 'react'
import Home from './pages/Home'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Player from './pages/Player.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In")
       
        if (location.pathname === '/login') {
          navigate('/')
        }
      } else {
        console.log("Logged Out")
        navigate('/login')
      }
    })
  }, [])

  return (
    <div>
<ToastContainer theme='dark'/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  )
}

export default App



