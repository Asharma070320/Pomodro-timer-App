import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsBreak((prevIsBreak) => !prevIsBreak);
            // return  ? 1500 : 300; // 25 minutes or 5 minutes
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

  return (
    <div className="timer-container">
      <h1>{isBreak ? 'Break Time!' : 'Work Time!'}</h1>
      <div className="timer">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={handleStartPause} className="btn">
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="btn">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
