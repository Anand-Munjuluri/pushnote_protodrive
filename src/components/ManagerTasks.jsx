import { db } from '../Firebase';
import { nanoid } from 'nanoid';
import { collection, query, where, getDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IoAddCircle, IoReturnDownBackOutline } from 'react-icons/io5';
import Loader from '../Assets/Loader.svg'

export default function ManagerTasks(props) {
    const { email } = props;
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        const fetchTasks = async (email) => {
            try {
              const managersCollectionRef = collection(db, 'managers');
              const querySnapshot = await getDocs(query(managersCollectionRef, where('email', '==', email)));
              const managerDoc = querySnapshot.docs[0];
              console.log('Tasks:', managerDoc.data().tasks);
              setTasks(managerDoc.data().tasks);
              // Further processing or state update with tasks
            } catch (error) {
              console.error('Error fetching tasks:', error);
            }
          };
          fetchTasks(email);
    }, []);

    return (
        <>
            <div className='task-board'>
                <div className = "header">
                    <p>Task Board</p>
                    <IoReturnDownBackOutline size={35} onClick={() => props.changeTab("main")} className='add-back-icon'/>
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
                    </div>
                    ))}

                    {tasks && tasks.length === 0 && <p>No tasks found</p>}
                    {!tasks && 
                        <div className='loader-container'>
                            <img src={Loader} />
                        </div>
                    }
                </div>
            </div>
        </>
    );
}