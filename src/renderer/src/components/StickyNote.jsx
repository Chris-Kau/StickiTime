function StickyNote(){
    const brownPrimary = "#DDC7B9";
    const brownSecondary = "#FFF5F7";
    const minimizeWindow = () => window.electron.ipcRenderer.send('minimize-window')
    return(
            <div className="grid  grid-rows-[auto_1fr] w-screen h-screen bg-[#DDC7B9] gap-0">
                {/* Top Bar */}
                <div className="flex justify-center self-center items-center w-[95%] min-h-[15%] mx-auto" id="draggable">
                    <div className = "grid grid-cols-2 grid-rows-1 min-w-full">
                        <div className = "flex float-left">
                            <p id="not-draggable"><b>+</b></p>
                        </div>
                        <div className = "flex justify-end gap-3">
                            <p onClick = {()=>minimizeWindow()} id="not-draggable"><b>-</b></p>
                            <p onClick = {()=>window.close()} id="not-draggable"><b>x</b></p>
                        </div>
                    </div>
                </div>

                {/* //Text Area */}
                <div className="flex justify-center items-center w-[96%] min-h-[65%] mx-auto">
                    <div className="flex bg-[#FFF5F7] min-h-full min-w-full rounded-t-md p-2 ">
                        <input className="min-h-full min-w-full" type="text" placeholder="Start typing..."></input>
                    </div>
                </div>

                {/* //Footer */}
                <div className="flex justify-center items-center w-[96%] min-h-[10%] mt-1 mb-3 mx-auto">
                    <div className="flex bg-[#FFF5F7] min-h-full min-w-full rounded-b-md p-2 ">
                    <div className = "grid grid-cols-2 grid-rows-1 min-w-full">
                        <div className = "flex float-left gap-1">
                            <p>B</p>
                            <p><i>I</i></p>
                            <p>U</p>
                            <p>abc</p>
                            <p>=</p>
                            <p>o</p>
                        </div>
                        <div className = "flex justify-end gap-3">
                            <p>//</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>


    )
}

export default StickyNote