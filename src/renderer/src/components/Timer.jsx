import { useState, useEffect } from "react";
import TitleBar from './TitleBar';

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
      <div className="overflow-hidden overflow-y-hidden">
        <TitleBar/>
        <div className=" flex flex-col justify-center items-center bg-gray-100 rounded-lg shadow-md min-w-screen min-h-[calc(screen - 10%)] ">
        <div className="grid grid-rows-3">
          {/* Work Phase */}
          <div className="flex justify-center align-middle items-center space-x-2 text-4xl ">
              <span>{isWorkPhase ? "Work Time!" : "Break Time!"}</span>
          </div>

          {/* Timer */}
          <div className="flex justify-center w-full  text-4xl">
            <div className="grid grid-flow-col auto-cols-max items-center gap-1.5 p-2">
              <div className="flex space-x-2 items-center">
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
                  <span className="text-gray-500">
                  / {String(isWorkPhase ? workMinutes : breakMinutes).padStart(2, "0")}:00
                  </span>
              </div>
              <div className="flex justify-center w-full" onClick={skipPhase}>
                <p>{">>"}</p>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-[300px]  text-2xl">
              <button
                onClick={resetTimer}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 w-full min-w-[120px]">
                Reset
              </button>

              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 w-full min-w-[120px]">
                {isRunning ? "Pause" : "Start"}
              </button>
        </div>
        </div>
        </div>
      </div>
     
    );

}

export default Timer
