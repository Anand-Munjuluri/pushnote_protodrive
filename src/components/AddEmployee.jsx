/**Importing React Components */
import React from 'react'

/**Importing React Icons */
import {IoReturnDownBackOutline} from 'react-icons/io5'

/**Importing Firebase Components */
import { db } from '../Firebase';
import { collection, addDoc, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function AddEmployee(props) {

    const [form, setForm] = React.useState({
        name: '',
        email: '',
        designation: '',
        projectAssignedTo:'',
        completed: 0,
        tasks: []
    })

    const {employees} = props

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addEmployee(form)
        employees.push(form)
    }

    const isPresent = (email) => {
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].email === email) {
            return true;
          }
        }
        return false;
      }

    const addEmployee = async (employeeData) => {
        const employeesRef = collection(db, 'employees');
        if (isPresent(employeeData.email)) {
          toast.error('A employee with the same email already exists');
          return;
        }
        
        try {
          await addDoc(employeesRef, employeeData);
          toast.success('Employee added successfully');
          
        } catch (error) {
          toast.error('Error adding employee');
        }
      };

    return (
        <div className='task-board'>
            <div className = "header">
            <p>Add Employee</p>
            <IoReturnDownBackOutline onClick={() => props.changeTab("view-tasks")} className='add-icon'/>
            </div>

            <form className="add-manager-form">
                <input type="text" onChange={handleChange} placeholder= "Name" name="name" id="" />
                <input type="email" onChange={handleChange} placeholder= "Email" name="email" id="" />
                <input type="text" onChange={handleChange} placeholder= "Designation" name="designation" id="" />
                <input type="text" onChange={handleChange} placeholder= "Project Assigned" name="projectAssignedTo" id="" />
                <button onClick={handleSubmit}>Add Employee</button>
            </form>
        </div>
    )
}
