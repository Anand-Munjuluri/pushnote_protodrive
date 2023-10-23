/* importing react necessary components */
import React, { useState } from 'react'

/* importing images */
import VectorImage from '../Assets/home_vector.png';

/*importing Router components */
import { useNavigate } from 'react-router';

/**importing Toaster */
import { toast } from 'react-toastify';

/*importign firebase components */
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';


export default function ForgotPassword() {

  const [form, setForm] = useState({
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.email.trim() !== '') {
      try {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, form.email);
        toast.success('mail was successfully sent');
      } catch (error) {
        console.log(error);
        toast.error("Couldn't send reset password to given mail id");
      }
    } else {
      toast.error('Enter a valid Email');
    }
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
