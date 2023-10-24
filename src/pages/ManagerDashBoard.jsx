import React, { useState } from 'react'
import Profile from '../components/Profile'
import ManagerTasks from '../components/ManagerTasks';
import AddEmployee from '../components/AddEmployee';
import EmployeesBoard from '../components/EmployeesBoard';

export default function ManagerDashBoard() {

  const [tab, setTab] = useState("main");

  const changeTab = (tab) => {
    setTab(tab);
  }


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
              email={"munjulurianand@gmail.com"}
              changeTab = {(tab) => changeTab(tab)}
            />
          }

          {tab === 'add-employee' &&
            <AddEmployee
              changeTab = {(tab) => changeTab(tab)
            }
            />
          }

          {tab === 'view-employees' &&
            <EmployeesBoard
              changeTab = {(tab) => changeTab(tab)}
            />
          }

        </div>
      </div>
  )
}
