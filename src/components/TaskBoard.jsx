import React, { useEffect, useState } from 'react'
import {IoAddCircle} from 'react-icons/io5'
import {db} from '../Firebase'
import { collection, getDocs} from 'firebase/firestore';
import { nanoid } from 'nanoid'
import Loader from '../Assets/Loader.svg'

export default function TaskBoard(props) {
  
  const [managers, setManagers] = useState(null);

  useEffect(() => {
  
    const getManagersData = async () => {

      const managerCollectionRef = collection(db, "managers")
      const data = await getDocs(managerCollectionRef);

      setManagers(data.docs.map((doc) => {
        return {...doc.data()}
      }
      ))
    }

    getManagersData();
    setTimeout(() =>{
      console.log(managers)
    },2000)
    
  }, [])

  return (
    <>
        <div className = "header">
          <p>Task Board</p>
          <IoAddCircle onClick={() => props.changeTab("add-manager")} className='add-icon'/>
        </div>

        {managers && <div className="task-board">
          {managers.length > 0 &&
            managers.map((manager) => (
              <div
                onClick={() => {props.changeManager(manager);props.changeTab("sub-task");}}
                className="task"
                key={nanoid()}
              >
                <span>{manager.name}</span>
                <span>
                  {manager.tasks.length === 0 ? 'No tasks' : `${manager.completed}/${manager.tasks.length}`}
                </span>
              </div>
            ))
          }

          {managers.length === 0 && <p className='no-managers'>No managers added yet</p>}

        </div>}

        {!managers && 
        <div className='loader-container'>
          <img src={Loader} alt=''/>
        </div>
        }
    </>
  )
}
