import React, { useState, useEffect } from 'react';
import './Timer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Timer = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsBreak((prevIsBreak) => !prevIsBreak);
            // return prevIsBreak ? 1500 : 300; // 25 minutes or 5 minutes
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(1500);
    setIsBreak(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="timer-container">
      <h1>{isBreak ? 'Break Time!' : 'Work Time!'}</h1>
      <div className="timer">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleStartPause} className={`btn ${isActive ? 'btn-pause' : 'btn-start'}`} data-text={isActive ? 'Pause' : 'Start'}>
          <FontAwesomeIcon icon={isActive ? faPause : faPlay} />
        </button>
        <button onClick={handleReset} className="btn btn-reset" data-text="Reset">
          <FontAwesomeIcon icon={faRedo} />
        </button>
        <button onClick={handleLogout} className="btn btn-logout" data-text="Logout">
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>
    </div>
  );
};

export default Timer;
