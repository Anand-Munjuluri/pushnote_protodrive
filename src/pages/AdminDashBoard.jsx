/* importing react necessary components */
import React, { useEffect, useState } from 'react'

/* importing images */
import profilePhoto from '../Assets/profile.png'
import chat from '../Assets/chat.png'
import bell from '../Assets/bell.png'

/* importing components */
import TaskBoard from '../components/TaskBoard'
import AddManager from '../components/AddManager'

/* importing firebase components */
import {db} from '../Firebase'
import { collection, getDocs, updateDoc } from 'firebase/firestore';

export default function AdminDashBoard() {

  const [managers, setManagers] = useState([]);
  const [activeTab, setActiveTab] = useState('task-board');
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    console.log(tab);
  }

  return (
    <div className='admin'>
      <div className="profile">
        <div className="details">
          <img src={profilePhoto} alt="" />
          <p>Landeri Srujan</p>
        </div>

        <div className="functions">
          <img src={chat} alt="" />
          <img src={bell} alt="" />
        </div>
      </div>

      <div className="task-board">
        {activeTab === 'task-board' && <TaskBoard changeTab = {(tab) => handleTabChange(tab)} managers={managers} />}
        {activeTab === 'add-manager' && <AddManager changeTab = {(tab) => handleTabChange(tab)} managers={managers}/>}
      </div>

    </div>
  )
}
