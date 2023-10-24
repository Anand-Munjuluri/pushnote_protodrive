/* importing react necessary components */
import React from 'react'

/*importing Router components*/
import {BrowserRouter, Routes, Route} from 'react-router-dom'

/*importing pages*/
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import AdminDashBoard from './pages/AdminDashBoard'
import ManagerDashBoard from './pages/ManagerDashBoard'

/*importing toaster components*/ 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div className = "App">

      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin-dashboard" element={<AdminDashBoard/>}/>
          <Route path="/manager-dashboard" element={<ManagerDashBoard/>}></Route>

        </Routes>
      </BrowserRouter>


      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />

    </div>
  )
}
