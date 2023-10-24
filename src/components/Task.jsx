import React from 'react'
import {IoAddCircle} from 'react-icons/io5'
import { toast } from 'react-toastify';
export default function Task(props) {

  const {manager} = props;
  toast.success(manager.name)
  console.log(manager)

  return (
    <>
      <div className = "task-header">
          <p>Product Manager</p>
          <IoAddCircle size={35} onClick={() => props.changeTab("add-task")} className='add-icon'/>
      </div>




    </>
  )
}
