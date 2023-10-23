import React from 'react'
import {BrowserRouter, Routes, Route, Switch} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashBoard from './pages/AdminDashBoard'

export default function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashBoard/>}/>

        </Routes>
      </BrowserRouter>

    </>
  )
}
