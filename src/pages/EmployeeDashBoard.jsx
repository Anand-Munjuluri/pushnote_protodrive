import { auth, db } from '../Firebase';
import { nanoid } from 'nanoid';
import { collection, query, where, getDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { IoAddCircle, IoReturnDownBackOutline } from 'react-icons/io5';
import Profile from '../components/Profile';
import { useLoaderData } from 'react-router';
import Loader from '../Assets/Loader.svg'
export default function EmployeeDashboard(props) {

    const email = auth.currentUser.email
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        const fetchTasks = async (email) => {
            try {
              const employeesCollectionRef = collection(db, 'employees');
              const querySnapshot = await getDocs(query(employeesCollectionRef, where('email', '==', email)));
              const employeeDoc = querySnapshot.docs[0];
              console.log('Tasks:', employeeDoc.data().tasks);
              setTasks(employeeDoc.data().tasks);
              // Further processing or state update with tasks
            } catch (error) {
              console.error('Error fetching tasks:', error);
            }
          };
          fetchTasks(email);
    }, []);

    return (
        <>

            <Profile/>
            
            <div style={{height:"80%"}} className='task-board'>
                <div className = "header">
                    <p>Task Board</p>
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