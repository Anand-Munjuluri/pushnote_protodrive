import { nanoid } from 'nanoid';
import React from 'react'
import {IoAddCircle} from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Task(props) {

  const {manager} = props;
  const tasks = manager.tasks

  console.log(manager.name)
  return (
    <>
      <div className = "task-header">
          <div>
            <p className='designation'>{manager.designation} - </p>
            <p className='manager-name'>{manager.name}</p>
          </div>
          <IoAddCircle size={35} onClick={() => props.changeTab("add-task")} className='add-icon'/>
      </div>

      <div className='tasks'>

        {tasks.length > 0 && tasks.map((task) => (
          <div key={nanoid()} className='sub-task-task'>
            <div className="sub-task">
              <span>{task.name}</span>
              <span className='status'>{task.status}</span>
            </div>

            <div className='description-container'>
              <textarea maxLength={50} disabled value={task.description}/>
              <MdDeleteOutline size={20} className='delete-icon'/>
            </div>   

            <div className="sub-task">
              <span className='deadline'>Due By <span className='date'>{task.deadline}</span></span>
              <span className='priority'>{task.priority}</span>
            </div>
          </div>

        ))}

      </div>

        {tasks.length === 0 && <p className='no-tasks'>No tasks added yet</p>}
    </>
  )
}
