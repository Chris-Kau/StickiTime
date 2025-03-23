import { useState, useEffect } from "react";


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
      <div className="p-4 flex flex-col justify-center items-center space-y-4 bg-gray-100 rounded-lg shadow-md min-w-screen min-h-screen bg-[url(../../../../resources/timerbg.gif)] bg-no-repeat bg-cover">
        <div className="flex space-x-2 text-2xl">
            <span>{isWorkPhase ? "Work Time!" : "Break Time!"}</span>
        </div>

        <div className="flex space-x-2 text-2xl">
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

        <div className="flex space-x-3">
          <button
            onClick={resetTimer}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600">
            Reset
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={skipPhase}
            className="px-3 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600">
            Skip
          </button>
        </div>
      </div>
    );

}

export default Timer
