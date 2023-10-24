/* importing react necessary components */
import React, { useEffect, useState } from 'react'

/* importing components */
import TaskBoard from '../components/TaskBoard'
import AddManager from '../components/AddManager'
import Profile from '../components/Profile'
import Task from '../components/Task'

/* importing firebase components */
import {db} from '../Firebase'
import { collection, getDocs, updateDoc } from 'firebase/firestore';
import AddTask from '../components/AddTask'

export default function AdminDashBoard() {

  const [managers, setManagers] = useState([]);
  const [activeTab, setActiveTab] = useState('task-board');
  const [activeManager, setActiveManager] = useState(null);

  useEffect(() => {
    const addTaskField = async () => {
      const managersRef = collection(db, 'managers');
      const snapshot = await getDocs(managersRef);
      snapshot.forEach(async (doc) => {
        if (!doc.data().tasks) {
          await updateDoc(doc.ref, { tasks: [] });
        }
      });
    };

    const getManagersData = async () => {

      const managerCollectionRef = collection(db, "managers")
      const data = await getDocs(managerCollectionRef);

      setManagers(data.docs.map((doc) => {
        return {...doc.data()}
      }
      ))
    }

    addTaskField();
    getManagersData();
  }, []);

  const handleManagerClick = (manager) => {
    setActiveManager(manager);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='admin'>
        <Profile/>

        <div className="task-board">

        {activeTab === 'task-board' && (
          <TaskBoard
            changeTab={(tab) => handleTabChange(tab)}
            managers={managers}
            changeManager={(manager) => handleManagerClick(manager)} // Pass the changeManager prop here
          />
        )}

        {activeTab === 'add-manager' && 
          <AddManager 
          changeTab = {(tab) => handleTabChange(tab)} 
          managers={managers}
        />}

        {activeTab === 'sub-task' && 
          <Task 
          manager={activeManager}
          changeTab = {(tab) => handleTabChange(tab)}
          />
        }

        {activeTab === 'add-task' &&
          <AddTask
            changeTab={(tab) => handleTabChange(tab)}
            manager={activeManager}
          />

        }

      </div>

    </div>
  )
}
