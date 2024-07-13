// src/components/Timer.js
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const WORK_TIME = 25 * 60; // 25 minutes in seconds
  const BREAK_TIME = 5 * 60; // 5 minutes in seconds

  const [time, setTime] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsBreak((prevIsBreak) => !prevIsBreak);
            return isBreak ? WORK_TIME : BREAK_TIME;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, isBreak]);

  const handleStartPause = () => setIsRunning((prev) => !prev);

  const handleReset = () => {
    setIsRunning(false);
    setTime(isBreak ? BREAK_TIME : WORK_TIME);
  };

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="timer-container">
      <h1>{isBreak ? 'Break Time' : 'Work Time'}</h1>
      <h2>{formatTime(time)}</h2>
      <button onClick={handleStartPause}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
