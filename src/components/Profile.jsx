import React, { useState } from 'react';
/* importing images */
import profilePhoto from '../Assets/profile.png'
import chat from '../Assets/chat.png'
import bell from '../Assets/bell.png'

export default function Profile() {
  const [showPlayer, setShowPlayer] = useState(false);

  const handleClick = () => {
    setShowPlayer(true);
  }

  const handleBack = () => {
    setShowPlayer(false);
  }

  return (
    <div className="profile">
        <div className="details">
            <img src={profilePhoto} alt="" />
            <p>Landeri Srujan</p>
        </div>

        <div className='functions'>
          <img src={chat} alt="" />
          <img src="https://cdn-icons-png.flaticon.com/512/3663/3663335.png" alt="" onClick={handleClick} />
          <img src={bell} alt="" />
        </div>

        {showPlayer && (
          <div className="modal">
            <h2>Relaxing Zone</h2>
            <audio controls autoPlay>
              <source src="https://nsdr.b-cdn.net/new/1%20-%20NSDR.wav" type="audio/wav" />
            </audio>
            <button onClick={handleBack} >Go Back</button>
          </div>
        )}
    </div>
  )
}
