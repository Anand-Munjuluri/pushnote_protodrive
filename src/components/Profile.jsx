import React, { useState } from 'react';
/* importing images */
import profilePhoto from '../Assets/profile.png'
import chat from '../Assets/chat.png'
import logout from '../Assets/logout.png'

import {auth} from '../Firebase';
import { toast } from 'react-toastify';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router';

import {BsDot} from 'react-icons/bs'

export default function Profile() {
  const [showPlayer, setShowPlayer] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowPlayer(true);
  }

  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioToggle = () => {
    setIsPlaying(!isPlaying);
  };

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
            {/* <p>{auth.currentUser.displayName}</p> */}
            <p>John Doe</p>
        </div>

        <div className='functions'>
          <img src={chat} alt="" />
          <div style={{position:"relative"}}>
            <BsDot className={isPlaying ? 'running' : 'display-none'} size={40}/>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3663/3663335.png"
              alt=""
              onClick={handleAudioToggle}
              style={{zIndex: 10,position:'relative'}}
            />          
          </div>
          <img onClick={handleLogout} src={logout} alt="" />
        </div>

        {isPlaying && (
        <audio style={{display:'none'}} controls autoPlay>
          <source
            src="https://nsdr.b-cdn.net/new/1%20-%20NSDR.wav"
            type="audio/wav"
          />
        </audio>
        )}
    </div>
  )
}
