/* importing react necessary components */
import React from 'react'

/* importing images */
import profilePhoto from '../Assets/profile.png'
import chat from '../Assets/chat.png'
import bell from '../Assets/bell.png'

/* importing icons */
import {IoAddCircle} from 'react-icons/io5'

export default function AdminDashBoard() {
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
        <div class = "header">
          <p>Task Board</p>
          <IoAddCircle className='add-icon'/>
        </div>

        <div className= 'task'>
          <span>Manager 1</span>
          <span>3/5</span>
        </div>

        <div className= 'task'>
          <span>Manager 2</span>
          <span>2/5</span>
        </div>

        <div className= 'task'>
          <span>Manager 3</span>
          <span>1/5</span>
        </div>

        <div className= 'task'>
          <span>Manager 4</span>
          <span>0/5</span>
        </div>

        <div className= 'task'>
          <span>Manager 5</span>
          <span>0/5</span>
        </div>

        <div className='task'>
          <span>Manager 6</span>
          <span>0/5</span>
        </div>

        <div className='task'>
          <span>Manager 7</span>
          <span>0/5</span>
        </div>

      </div>

    </div>
  )
}
