import { useState, useEffect } from "react";


function Timer({ }) {

    const WORK_DURATION = 25 * 60; // 25 minutes
    const BREAK_DURATION = 5 * 60; // 5 minutes

    const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [onBreak, setOnBreak] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
            if (prev === 1) {
                setOnBreak(!onBreak);
                return onBreak ? WORK_DURATION : BREAK_DURATION;
            }
            return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, onBreak]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
          <h1 className="text-3xl font-bold mb-4">{onBreak ? "Break Time!" : "Work Time!"}</h1>
          <div className="text-6xl font-mono">{formatTime(timeLeft)}</div>
          <div className="mt-4 space-x-3">
            <button onClick={() => { setIsRunning(false); setTimeLeft(WORK_DURATION); setOnBreak(false); }} className="px-4 py-2 bg-red-500 rounded-lg">
              Reset
            </button>
            <button onClick={() => setIsRunning(!isRunning)} className="px-4 py-2 bg-blue-500 rounded-lg">
              {isRunning ? "Pause" : "Start"}
            </button>
          </div>
        </div>
      );

}

export default Timer
