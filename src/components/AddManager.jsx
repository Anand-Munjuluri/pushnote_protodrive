/**Importing React Components */
import React from 'react'

/**Importing React Icons */
import {IoReturnDownBackOutline} from 'react-icons/io5'

/**Importing Firebase Components */
import { db } from '../Firebase';
import { collection, addDoc, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function AddManager(props) {

    const [form, setForm] = React.useState({
        name: '',
        email: '',
        designation: '',
        tasks: []
    })

    const {managers} = props

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addManager(form)
        managers.push(form)
    }

    const isPresent = (email) => {
        for (let i = 0; i < managers.length; i++) {
          if (managers[i].email === email) {
            return true;
          }
        }
        return false;
      }

    const addManager = async (managerData) => {
        const managersRef = collection(db, 'managers');
        if (isPresent(managerData.email)) {
          toast.error('A manager with the same email already exists');
          return;
        }
        
        try {
          await addDoc(managersRef, managerData);
          toast.success('Manager added successfully');
          
        } catch (error) {
          toast.error('Error adding manager');
        }
      };

    return (
        <>
            <div className = "header">
            <p>Add Manager</p>
            <IoReturnDownBackOutline onClick={() => props.changeTab("task-board")} className='add-icon'/>
            </div>

            <form className="add-manager-form">
                <input type="text" onChange={handleChange} placeholder= "Name" name="name" id="" />
                <input type="email" onChange={handleChange} placeholder= "Email" name="email" id="" />
                <input type="text" onChange={handleChange} placeholder= "Designation" name="designation" id="" />
                <button onClick={handleSubmit}>Add Manager</button>
            </form>
        </>
    )
}
