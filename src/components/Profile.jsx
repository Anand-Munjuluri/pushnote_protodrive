import React from 'react'

/* importing images */
import profilePhoto from '../Assets/profile.png'
import chat from '../Assets/chat.png'
import bell from '../Assets/bell.png'

export default function Profile() {
  return (
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
  )
}
