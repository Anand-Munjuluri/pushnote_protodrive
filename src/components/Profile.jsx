import React, { useState } from 'react';
/* importing images */
import profilePhoto from '../Assets/profile.png'
import chat from '../Assets/chat.png'
import logout from '../Assets/logout.png'

import {auth} from '../Firebase';
import { toast } from 'react-toastify';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router';

export default function Profile() {
  const [showPlayer, setShowPlayer] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowPlayer(true);
  }

  const handleBack = () => {
    setShowPlayer(false);
  }

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success('Logged out successfully');
      navigate('/')
    }).catch((error) => {
      // An error happened.
      toast.error('Error logging out');
    });
  }
  

  return (
    <div className="profile">
        <div className="details">
            <img src={profilePhoto} alt="" />
            <p>{auth.currentUser.displayName}</p>
        </div>

        <div className='functions'>
          <img src={chat} alt="" />
          <img src="https://cdn-icons-png.flaticon.com/512/3663/3663335.png" alt="" onClick={handleClick} />
          <img onClick={handleLogout} src={logout} alt="" />
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
