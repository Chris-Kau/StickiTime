import { useState } from "react";
import StickyNoteIcon from "./StickyNoteIcon"

function StickyFolder(id, name) {
    const [stickynotes, setStickynotes] = useState([])

    window.electron.ipcRenderer.on('receive-stickynote', function(event, data) {
        console.log("data".concat(' ', data))
        addStickyNote(data.name)
    })

    function addStickyNote(name) {
        setStickynotes([...stickynotes, { id: crypto.randomUUID(), name: name}]);
    }
    
    function deleteStickyNote(id) {
        setStickynotes(prev => prev.filter(stickynote => stickynote.id !== id));
    }

    return (
        <div className="flex flex-col h-screen bg-red-400">
            {/* Scrollable Content Area */}
            <div 
                className="flex-1 overflow-y-auto p-2 space-y-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                {/* Dynamic Bookmarks */}
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
    )
}

export default StickyFolder