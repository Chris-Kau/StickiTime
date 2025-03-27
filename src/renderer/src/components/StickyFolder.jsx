import { useState } from "react";
import StickyNoteIcon from "./StickyNoteIcon"

function StickyFolder(id, name) {
    const [stickynotes, setStickynotes] = useState([])

    window.electron.ipcRenderer.on('receive-stickynote', function(event, data) {
        console.log("data".concat(' ', data))
        addStickyNote(data.name, data.id)
    })

    window.electron.ipcRenderer.on('receive-id', function(e, d) {

    })

    function addStickyNote(name, id) {
        setStickynotes([...stickynotes, { id: id, name: name}]);

    }
    
    function deleteStickyNote(id) {
        setStickynotes(prev => prev.filter(stickynote => stickynote.id !== id));
        window.electron.ipcRenderer.send("reopen-sticky-note", id)
    }

    return (
        <div className="flex bg-[#F8EAA6] w-screen h-screen justify-center align-middle items-center p-1">
            <div className="flex flex-col w-full max-w-[100% - 4px] h-full max-h-[100% - 4px]  bg-[#F8EAA6] p-[2px]">
                {/* Scrollable Content Area */}
                <div 
                    className="flex flex-row overflow-x-auto overflow-y-hidden gap-2 "
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                    {/* Dynamic Sticky */}
                    {stickynotes.map((stickynote) => (
                    <StickyNoteIcon
                        key={stickynote.id}
                        id={stickynote.id}
                        name={stickynote.name}
                        onDelete={deleteStickyNote}
                    />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StickyFolder