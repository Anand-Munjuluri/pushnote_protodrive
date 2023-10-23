import React from 'react'
import VectorImage from '../Assets/home_vector.png';
import { useNavigate } from 'react-router';

export default function ForgotPassword() {

  const [form, setForm] = React.useState({
    email: '',
  })
  
  const navigate = useNavigate();

   function handleChange(e) {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(form)
  }

  return (
    <div className = "login">

      <div className="header">
        <img src={VectorImage}  alt="vector_image" />
        
        <div className = 'for-mobile'>
          <h1>PUSHNOTE</h1>
          <p>YOUR TASKS YOUR WAY</p>
        </div>
      </div>

      <form className = "login-form" >

        <div className = "for-desktop">
          <h1>PUSHNOTE</h1>
          <p>YOUR TASKS YOUR WAY</p>
        </div>

        <input onChange = {handleChange} type="email" placeholder="Email" name="email" id="email" />
        
        <div className='form-links'>
          <p onClick = {() => {navigate('/')}}>Login</p>
          <p onClick = {() => {navigate('/register')}}>Register</p>
        </div>
        
        <button onClick = {handleSubmit}>Send Reset Link</button>
      </form>

    </div>
  )
}
