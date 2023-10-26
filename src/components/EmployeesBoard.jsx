import React, { useEffect, useState } from 'react'
import {IoAddCircle} from 'react-icons/io5'
import {db} from '../Firebase'
import { collection, getDocs} from 'firebase/firestore';
import { nanoid } from 'nanoid'
import Loader from '../Assets/Loader.svg'

export default function EmployeesBoard(props) {
  
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
  
    const getEmployeesData = async () => {

      const employeeCollectionRef = collection(db, "employees")
      const data = await getDocs(employeeCollectionRef);

      setEmployees(data.docs.map((doc) => {
        return {...doc.data()}
      }
      ))
    }
    getEmployeesData();
  }, [])

  return (
    <>

      <div className='task-board'>
        <div className = "header">
          <p>Task Board</p>
          <IoAddCircle onClick={() => props.changeTab("add-employee")} className='add-icon'/>
        </div>

        {employees && <div className="task-board">
          {employees.length > 0 &&
            employees.map((employee) => (
              <div
                onClick={() => {props.changeEmployee(employee);props.changeTab("sub-task");}}
                className="task"
                key={nanoid()}
              >
                <span>{employee.name}</span>
                <span>
                  {employee.tasks.length === 0 ? 'No tasks' : `${employee.completed}/${employee.tasks.length}`}
                </span>
              </div>
            ))
          }

          {employees.length === 0 && <p className='no-employees'>No employees added yet</p>}

        </div>}

        {!employees && 
        <div className='loader-container'>
          <img src={Loader} />
        </div>
        }
      </div>
    </>
  )
}
