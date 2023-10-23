import React, { useEffect, useState } from 'react'
import VectorImage from '../Assets/home_vector.png';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase';
import {db} from '../Firebase'
import { collection, getDocs } from "firebase/firestore";
import { toast } from 'react-toastify';

export default function Register() {

  const [form, setForm] = React.useState({
    name: '',
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



  async function handleSubmit(e) {
    e.preventDefault()
    if(!isAdmin(form.email) && !isManager(form.email) && !isEmployee(form.email)){
        toast.error("You are not authorized to register");
        return;
    }

    try{
        await createUserWithEmailAndPassword(
            auth,
            form.email,
            form.password
        );

        updateProfile(auth.currentUser, {
            displayName:form.name
        })
        toast.success("You are successfully registered");
        navigate('/');
    }
    catch(error){
        toast.error("Something went wrong");
    }
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

        <input onChange = {handleChange} type="name" placeholder="Name" name="name" id="name" />
        <input onChange = {handleChange} type="email" placeholder="Email" name="email" id="email" />
        <input autoComplete='true' onChange = {handleChange} type="password" placeholder="Password" name="password" id="password" />
        
        <div className='form-links'>
            <p onClick = {() => {navigate('/')}}>Login</p>
        </div>
        
        <button onClick = {handleSubmit}>Register</button>
      </form>

    </div>
  )
}