function StickyNote(){
    const brownPrimary = "#DDC7B9";
    const brownSecondary = "#FFF5F7";
    return(
            <div className="grid  grid-rows-[auto_1fr] w-screen h-screen bg-[#DDC7B9] gap-0">
                {/* Top Bar */}
                <div className="flex justify-center self-center items-center w-[95%] min-h-[15%] mx-auto">
                    <div className = "grid grid-cols-2 grid-rows-1 min-w-full">
                        <div className = "flex float-left">
                            <p><b>+</b></p>
                        </div>
                        <div className = "flex justify-end gap-3">
                            <p><b>-</b></p>
                            <p><b>x</b></p>
                        </div>
                    </div>
                </div>

                {/* //Text Area */}
                <div className="flex justify-center items-center w-[96%] min-h-[65%] mx-auto">
                    <div className="flex bg-[#FFF5F7] min-h-full min-w-full rounded-t-md p-2 ">
                        <p>Text</p>
                    </div>
                </div>

                {/* //Footer */}
                <div className="flex justify-center items-center w-[96%] min-h-[10%] mt-1 mb-3 mx-auto">
                    <div className="flex bg-[#FFF5F7] min-h-full min-w-full rounded-b-md p-2 ">
                        <p>Text</p>
                    </div>
                </div>
            </div>


    )
}

export default StickyNote