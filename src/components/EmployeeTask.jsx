import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react'
import {IoAddCircle} from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md';
import {IoReturnDownBackOutline} from 'react-icons/io5'
import { toast } from 'react-toastify';
import {db} from '../Firebase'

export default function EmployeeTask(props) {

  const {employee} = props;
  const [tasks, setTasks] = useState(null);

  useEffect(() => {    
    getEmployeesData();
  }, [])

  const getEmployeesData = async () => {

    const employeeCollectionRef = collection(db, "employees")
    const data = await getDocs(employeeCollectionRef);

    // checking for employee with email same as employee.email
    const employeeData = data.docs.filter((doc) => doc.data().email === employee.email)[0].data();
    setTasks(employeeData.tasks);
  }

  const deleteTask = async (taskName) => {
    console.log("Trying to delete",taskName)
    try {
      const employeeCollectionRef = collection(db, 'employees');
      const querySnapshot = await getDocs(query(employeeCollectionRef, where('email', '==', employee.email)));
      const employeeDoc = querySnapshot.docs[0];
      const tasks = employeeDoc.data().tasks;
      const updatedTasks = tasks.filter((task) => task.name !== taskName);
      await updateDoc(employeeDoc.ref, { tasks: updatedTasks });
      toast.success('Task deleted successfully');
      getEmployeesData();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  return (
    <div className='task-board'>
      <div className = "task-header">
          <div>
            <p className='designation'>{employee.designation} - </p>
            <p className='employee-name'>{employee.name}</p>
          </div>
          <IoAddCircle size={35} onClick={() => props.changeTab("add-task")} className='add-task-icon'/>
          <IoReturnDownBackOutline size={35} onClick={() => props.changeTab("view-employees")} className='add-back-icon'/>
      </div>

      

        {tasks && tasks.length > 0 && 
        <div className='tasks'>
            
            {tasks.map((task) => (
            <div key={nanoid()} className='sub-task-task'>
                
                <div className="sub-task">
                <p>Name:     <span className='task-name'> {task.name}     </span></p>
                <p>Status:   <span className='status'>    {task.status}   </span></p>
                <p>Due By:   <span className='date'>      {task.deadline} </span></p>
                <p>Priority: <span className='priority'>  {task.priority} </span></p>
                </div>

                <h5 className='desc-title'>Description</h5>
                <p>{task.description}</p>
                <MdDeleteOutline onClick= {() => deleteTask(task.name)} size={20} className='delete-icon'/>
            </div>

            ))}

            </div>
        }

      {tasks && tasks.length === 0 && <p className='no-tasks'>No tasks added yet</p>}
      {!tasks && <p className='no-tasks'>Loading...</p>}
    </div>
  )
}
