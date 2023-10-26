/* importing react necessary components */
import React, { useEffect, useState } from 'react'

/* importing images */
import VectorImage from '../Assets/home_vector.png';

/*importing Router components */
import { useNavigate } from 'react-router';

/**importing Toaster */
import { toast } from 'react-toastify';

/*importign firebase components */
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {db} from '../Firebase'
import { collection, getDocs } from "firebase/firestore";

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

  
  const [admins, setAdmins] = useState([]);
  const [managers, setManagers] = useState([]);
  const [employees, setEmployees] = useState([]);

  const adminsCollectionRef = collection(db, "admins")
  const managerCollectionRef = collection(db, "managers")
  const employeesCollectionRef = collection(db, "employees")

  useEffect( () => {

        // getting all the admins
        const getAdmins = async() => {
            const data = await getDocs(adminsCollectionRef);
            setAdmins(data.docs.map((doc) => {
                return {...doc.data()}
            }))
        }

        // getting all the managers 
        const getManagers = async() => {
            const data = await getDocs(managerCollectionRef);
            setManagers(data.docs.map((doc) => {
                return {...doc.data()}
            }))
        }

        // getting all the employees
        const getEmployees = async() => {
            const data = await getDocs(employeesCollectionRef);
            setEmployees(data.docs.map((doc) => {
                return {...doc.data()}
            }))
        }

        getAdmins()
        getManagers()
        getEmployees()

  },[])


  async function handleSubmit(e) {
    e.preventDefault();
    const email = form.email.trim()

    if(!isAdmin(email) && !isManager(email) && !isEmployee(email)){
      toast.error("No account found with given email");
      return;
    }
    if (email !== '') {
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

  function isAdmin(email){
      let flag = false
      admins.forEach((admin) => {
          if(admin.email === email){
              flag = true
          }
      })
      return flag
  }

  function isManager(email){
      let flag = false
      managers.forEach((manager) => {
          if(manager.email === email){
              flag = true
          }
      })
      return flag
  }

  function isEmployee(email){
      let flag = false
      employees.forEach((employee) => {
          if(employee.email === email){
              flag = true
          }
      })
      return flag
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
