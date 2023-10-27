import React, { useEffect, useState } from 'react'
import Profile from '../components/Profile'
import ManagerTasks from '../components/ManagerTasks';
import AddEmployee from '../components/AddEmployee';
import EmployeesBoard from '../components/EmployeesBoard';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../Firebase';
import EmployeeTask from '../components/EmployeeTask';
import AddEmployeeTask from '../components/AddEmployeeTask';
export default function ManagerDashBoard() {

  const [tab, setTab] = useState("main");
  const [employees, setEmployees] = useState([]);
  const [activeEmployee, setActiveEmployee] = useState(null);

  const changeTab = (tab) => {
    setTab(tab);
  }

  function changeEmployee(employee) {
    setActiveEmployee(employee);
  }

  useEffect(() => { 
    const getManagersData = async () => {

      const managerCollectionRef = collection(db, "managers")
      const data = await getDocs(managerCollectionRef);

      setEmployees(data.docs.map((doc) => {
        return {...doc.data()}
      }
      ))
    }
  }, [])

  return (
      <div className='manager'>
        <Profile/>
        <div className='dashboard'>

          {tab === 'main' && 
            <div>
              <button 
                email={"munjulurianand@gmail.com"}
                onClick={() => changeTab("view-tasks")}  
              >
                View Tasks
              </button>
              <button
                onClick={() => changeTab("view-employees")}
              >
                View Employees
              </button>
            </div>
          }

          {tab === 'view-tasks' &&
            <ManagerTasks
              email={auth.currentUser.email}
              changeTab = {(tab) => changeTab(tab)}
            />
          }

          {tab === 'add-employee' &&
            <AddEmployee
              changeTab = {(tab) => changeTab(tab)}
              employees = {employees}
            />
          }

          {tab === 'view-employees' &&
            <EmployeesBoard
              changeTab = {(tab) => changeTab(tab)}
              changeEmployee = {(employee) => changeEmployee(employee)}
            />
          }

          {tab === 'sub-task' && 
              <EmployeeTask 
              employee={activeEmployee}
              changeTab = {(tab) => changeTab(tab)}
              />
          }

          {tab === 'add-task' &&
            <AddEmployeeTask
              changeTab={(tab) => changeTab(tab)}
              employee={activeEmployee}
            />
          }

        </div>
      </div>
  )
}
