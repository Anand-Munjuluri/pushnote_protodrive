import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react'
import {IoAddCircle} from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md';
import {IoReturnDownBackOutline} from 'react-icons/io5'
import { toast } from 'react-toastify';
import {db} from '../Firebase'

export default function Task(props) {

  const {manager} = props;
  const [tasks, setTasks] = useState(null);

  useEffect(() => {    
    getManagersData();
  }, [])

  const getManagersData = async () => {

    const managerCollectionRef = collection(db, "managers")
    const data = await getDocs(managerCollectionRef);

    // checking for manager with email same as manager.email
    const managerData = data.docs.filter((doc) => doc.data().email === manager.email)[0].data();
    setTasks(managerData.tasks);
  }

  const deleteTask = async (taskName) => {
    console.log("Trying to delete",taskName)
    try {
      const managerCollectionRef = collection(db, 'managers');
      const querySnapshot = await getDocs(query(managerCollectionRef, where('email', '==', manager.email)));
      const managerDoc = querySnapshot.docs[0];
      const tasks = managerDoc.data().tasks;
      const updatedTasks = tasks.filter((task) => task.name !== taskName);
      await updateDoc(managerDoc.ref, { tasks: updatedTasks });
      toast.success('Task deleted successfully');
      getManagersData();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  return (
    <>
      <div className = "task-header">
          <div>
            <p className='designation'>{manager.designation} - </p>
            <p className='manager-name'>{manager.name}</p>
          </div>
          <IoAddCircle size={35} onClick={() => props.changeTab("add-task")} className='add-task-icon'/>
          <IoReturnDownBackOutline size={35} onClick={() => props.changeTab("task-board")} className='add-back-icon'/>
      </div>

      <div className='tasks'>

        {tasks && tasks.length > 0 && tasks.map((task) => (
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

      {tasks && tasks.length === 0 && <p className=''>No tasks added yet</p>}
      {!tasks && <p className='no-tasks'>Loading...</p>}
    </>
  )
}
