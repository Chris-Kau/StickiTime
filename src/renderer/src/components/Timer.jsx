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
  const handleTimeChange = (e) => {
    setMinutes(e.target.value); // Allow full user input
  };




  const handleBlur = () => {
    let value = Number(minutes);
    if (isNaN(value) || value < 1) value = 1;
    if (value > 99) value = 99;

    setMinutes(value);
    if (isWorkPhase) {
      setWorkMinutes(value);
    } else {
      setBreakMinutes(value);
    }
    setEditing(false);
  };


  return (
    <div className="flex flex-col bg-[#C9C6E9] p-2 pt-0 h-screen">
      <TitleBar topleftText={"Pomodoro Timer"}/>

      <div className="flex h-[calc(100%-41px)] justify-center items-center shadow-md w-full mx-auto bg-[#747474] p-1">
        <div className="max-h-screen w-full max-w-screen space-y-1 bg-[url(../../../../resources/citybackdrop.jpg)] bg-cover bg-center">
          {/* Work Phase */}
          <div className="flex justify-center align-middle items-center space-x-2 text-4xl text-white mt-5">
            <span style={{ textShadow: "1px 4px 10px rgba(0, 0, 0, 0.8)" }}>
              {isWorkPhase ? "Work Time!" : "Break Time!"}
            </span>
          </div>

          {/* Timer Container */}
          <div className="flex w-full items-center relative">
            {/* Centered Timer Content */}
            <div className="flex-1 flex justify-center ml-12">
              <div className="flex space-x-2 items-center text-white text-6xl" style={{ textShadow: "1px 4px 10px rgba(0, 0, 0, 0.8)" }}>
                {editing ? (
                  <input
                    type="number"
                    enterKeyHint="false"
                    value={minutes}
                    onChange={handleTimeChange}
                    onBlur={handleBlur}
                    autoFocus
                    className="w-16 text-center text-white bg-transparent border-none outline-none overflow-hidden appearance-none"
                    min="1"
                    max="99"
                    style={{
                      WebkitAppearance: "none",
                    }}
                  />
                ) : (
                  <span onClick={() => {
                    handleTimeClick()
                    setEditing(true)
                  }} className="cursor-pointer">
                    {String(minutes).padStart(2, "0")}
                  </span>
                )}
                <span>:</span>
                <span>{String(seconds).padStart(2, "0")}</span>
                <span className="text-[#BCBFD4] text-3xl bg-transparent " style={{ textShadow: "1px 4px 10px rgba(0, 0, 0, 0.8)" }}>
                  / {String(isWorkPhase ? workMinutes : breakMinutes).padStart(2, "0")}:00
                </span>
              </div>
            </div>

            {/* Right-aligned Skip Button */}
            <div
              className="ml-auto pr-4 cursor-pointer"
            >
              <div onClick={skipPhase} className="flex justify-center align-middle items-center transition-all duration-200 hover:bg-black/20 rounded-md hover:scale-105">
                <SkipIcon className="w-6 h-6 fill-white" />
                <SkipIcon className="w-6 h-6 fill-white -ml-3" />
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
