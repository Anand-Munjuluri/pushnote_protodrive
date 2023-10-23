/* importing react necessary components */
import React, {useEffect, useState} from 'react'

/* importing images */
import VectorImage from '../Assets/home_vector.png';

/*importing Router components */
import { useNavigate } from 'react-router';

/*importign firebase components */
import { auth } from '../Firebase';
import {db} from '../Firebase'
import { collection, getDocs } from "firebase/firestore";
import {
    signInWithEmailAndPassword,
} from 'firebase/auth';

/**importing Toaster */
import { toast } from 'react-toastify';

export default function Login() {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [admins, setAdmins] = useState([]);
  const [managers, setManagers] = useState([]);
    const [employees, setEmployees] = useState([]);

  const navigate = useNavigate()

   function handleChange(e) {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

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

  function handleSubmit(e) {
    e.preventDefault()

    // if the user is admin
    if(isAdmin(form.email)){
        signInWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
            // Signed in
            toast.success("Logged in succesfully")
            navigate('/admin-dashboard')
        })
        .catch((error) => {
            console.log(error.message)
            if(error.message.includes("auth/invalid-login-credentials")){
                toast.error('Admin not registered')
            }
        });
    }

    // if the user is manager
    else if(isManager(form.email)){
        signInWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
            // Signed in
            toast.success("Logged in succesfully")
            navigate('/manager-dashboard')
        })
        .catch((error) => {
            console.log(error.message)
            if(error.message.includes("auth/invalid-login-credentials")){

                toast.error('Manager not registered')
            }
        });
    }

    // if the user is employee
    else if(isEmployee(form.email)){
        signInWithEmailAndPassword(auth, form.email, form.password)
        .then((userCredential) => {
            // Signed in
            toast.success("Logged in succesfully")
            navigate('/employee-dashboard')
        })
        .catch((error) => {
            console.log(error.message)
            if(error.message.includes("auth/invalid-login-credentials")){

                toast.error('Employee not registered')
            }
        });
    }

    // if the user is not registered
    else{
        toast.error('User role not assigned in organization')
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
        <input autoComplete='true' onChange = {handleChange} type="password" placeholder="Password" name="password" id="password" />
        
        <div className='form-links'>
          <p onClick = {() => {navigate('/register')}}>Register</p>
          <p onClick = {() => {navigate('/forgot-password')}}>Forgot Password?</p>
        </div>
        
        <button onClick = {handleSubmit}>Log In</button>
      </form>

    </div>
  )
}
