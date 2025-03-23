import { useState, useEffect } from "react";
import TitleBar from './TitleBar';
import PauseIcon from '../../../../resources/icons/regular/pause.svg?react';
import PlayIcon from '../../../../resources/icons/regular/play.svg?react';
import RestartIcon from '../../../../resources/icons/regular/refresh.svg?react';
import SkipIcon from '../../../../resources/icons/solid/angle-right-solid.svg?react';
function Timer({ }) {

    const [workMinutes, setWorkMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);

    const [minutes, setMinutes] = useState(workMinutes);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkPhase, setIsWorkPhase] = useState(true); // Tracks work/break phase
    const [editing, setEditing] = useState(false);


    useEffect(() => {
        let timer;
        if (isRunning) {
          timer = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                setIsWorkPhase((prev) => !prev); // toggle work/break time
                const newMinutes = isWorkPhase ? workMinutes : breakMinutes;
                setMinutes(newMinutes);
                setSeconds(0);
            } else {
                if (seconds === 0) {
                    setMinutes((m) => m - 1);
                    setSeconds(59)
                } else {
                    setSeconds((s) => s - 1);
                }
            }
          }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, minutes, seconds, isWorkPhase, workMinutes, breakMinutes]);


    const skipPhase = () => {
        setIsWorkPhase((prev) => !prev);
        setMinutes(isWorkPhase ? breakMinutes : workMinutes);
        setSeconds(0);
    };

    const resetTimer = () => {
        setIsWorkPhase(true);
        setMinutes(workMinutes);
        setSeconds(0);
        setIsRunning(false);
    };

    const handleTimeClick = () => {
        setEditing(true);
    };

    // when user edits the total time
    const handleTimeChange = (e, type) => { 
        const value = Math.max(1, Math.min(99, Number(e.target.value) || 0)); // Restrict values between 1-99
        if (type === "work") {
          setWorkMinutes(value);
          if (isWorkPhase) setMinutes(value);
        } else {
          setBreakMinutes(value);
          if (!isWorkPhase) setMinutes(value);
        }
    };

    const handleBlur = () => {
    setEditing(false);
    };


    return (
      <div className="flex flex-col bg-[#454A68] p-2 -mt-0.5 h-screen">
        <TitleBar/>

        <div className="flex  justify-center items-center shadow-md w-full mx-auto bg-blue-100 p-1">
          <div className="max-h-screen w-full max-w-screen space-y-1 bg-[url(../../../../resources/citybackdrop.jpg)] bg-cover bg-center">
            {/* Work Phase */}
            <div className="flex justify-center align-middle items-center space-x-2 text-4xl text-white mt-5">
            <span style={{ textShadow: "1px 4px 10px rgba(0, 0, 0, 0.8)" }}>
                  {isWorkPhase ? "Work Time!" : "Break Time!"}
                </span>
            </div>

            {/* Timer */}
            <div className="flex justify-center w-full">
              <div className="grid grid-flow-col auto-cols-max items-center gap-1.5 p-2">
                <div className="flex space-x-2 items-center text-white text-5xl">
                    {editing ? (
                    <input
                        type="number"
                        value={minutes}
                        onChange={handleTimeChange}
                        onBlur={handleBlur}
                        autoFocus
                        className="w-12 text-center bg-white border rounded-md"
                        min="1"
                        max="99"
                    />
                    ) : (
                    <span onClick={handleTimeClick} className="cursor-pointer">
                        {String(minutes).padStart(2, "0")}
                    </span>
                    )}
                    <span>:</span>
                    <span>{String(seconds).padStart(2, "0")}</span>
                    <span className="text-[#BCBFD4] text-3xl"  style={{ textShadow: "1px 4px 10px rgba(0, 0, 0, 0.8)" }}>
                    /&nbsp;{String(isWorkPhase ? workMinutes : breakMinutes).padStart(2, "0")}:00
                    </span>
                </div>
                <div className="flex justify-center w-full text-white transition-all duration-200 hover:bg-black/20 rounded-md hover:scale-105" onClick={skipPhase}>
                  <SkipIcon className = "ml-1 w-6 h-6 fill-white"/> <SkipIcon className = "-ml-3 w-6 h-6 fill-white"/>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="flex justify-center w-full">
              <div className="grid grid-cols-2 gap-3 w-full max-w-[300px] text-4xl mb-5">
                {/* Reset Button */}
                <button
                  onClick={resetTimer}
                  className="text-white w-full min-w-[120px] flex justify-center items-center gap-2  transition-all duration-200 hover:scale-105 hover:bg-black/20 rounded-md"
                >
                  <RestartIcon className="w-6 h-6 fill-white" />
                  <span style={{ textShadow: "1px 4px 10px rgba(0, 0, 0, 0.8)" }}>Reset</span>
                </button>

                {/* Start/Stop Button */}
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="text-white w-full min-w-[120px] flex justify-center items-center gap-2 transition-all duration-200 hover:scale-105 hover:bg-black/20 rounded-md"
                >
                  {isRunning ? (
                    <>
                      <PauseIcon className="w-6 h-6 fill-white" />
                      <span style={{ textShadow: "1px 4px 10px rgba(0, 0, 0, 0.8)" }}>Stop</span>
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-6 h-6 fill-white" />
                      <span style={{ textShadow: "1px 4px 10px rgba(0, 0, 0, 0.8)" }}>Start</span>
                    </>
                  )}
                </button>
              </div>
            </div>
              
            
          </div>
        </div>
      </div>
     
    );

}

export default Timer
