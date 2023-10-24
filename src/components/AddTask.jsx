/**Importing React Components */
import React, { useState } from 'react'

/**Importing React Icons */
import {IoReturnDownBackOutline} from 'react-icons/io5'

/**Importing Firebase Components */
import { db } from '../Firebase';
import { collection, query, where, updateDoc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function AddTask(props) {
  const { manager } = props;
  const [taskDetails, setTaskDetails] = useState({
    name: '',
    description: '',
    status: 'todo',
    priority: 'low',
    deadline: '',
  });
  const [charCount, setCharCount] = useState(0);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setTaskDetails((prevTaskDetails) => ({
      ...prevTaskDetails,
      [name]: value,
    }));

    if (name === 'description') {
      setCharCount(value.length);
    }
  };

  const addTaskToManager = async (managerEmail, taskDetails) => {
    try {
      const managerRef = collection(db, 'managers');
      const querySnapshot = await getDocs(query(managerRef, where('email', '==', managerEmail)));
  
      querySnapshot.forEach((doc) => {
        const tasks = doc.data().tasks || [];
        tasks.push(taskDetails);
        updateDoc(doc.ref, { tasks: tasks });
      });
    } catch (error) {
      console.error('Error adding task to manager:', error);
      // Handle the error here
    }
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    // checking if deadline is in the past
    if (new Date(taskDetails.deadline) < new Date()) {
      toast.error('Deadline cannot be in the past');
      return;
    }
    addTaskToManager(manager.email, taskDetails);
    toast.success('Task added successfully');
  };

  return (
    <>
      <div className="header">
        <p>Add Task</p>
        <IoReturnDownBackOutline onClick={() => props.changeTab('sub-task')} className="add-icon" />
      </div>

      <div className="add-task-form">
        <input type="text" placeholder='Name' name="name" id="name" value={taskDetails.name} onChange={handleChange} />

        <div className='description-container'>
          <textarea
            name="description"
            placeholder='Description'
            id="description"
            value={taskDetails.description}
            onChange={handleChange}
            maxLength={300}
          />
          <div className="char-count">{charCount}/300</div>
        </div>
      
        <select name="status" id="status" value={taskDetails.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select name="priority" id="priority" value={taskDetails.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input type="date" name="deadline" id="deadline" value={taskDetails.deadline} onChange={handleChange} />

        <button type="submit" onClick={handleSubmit}>Add Task</button>
      </div>
    </>
  );
}