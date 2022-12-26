import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup'

const App = () => {
  return (
   <React.Fragment>
    <Header />
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />

    </Routes>
   </React.Fragment>
  )
}

export default App