import { useState, useEffect } from "react";
import StickyNoteIcon from "./StickyNoteIcon";

function StickyFolder() {
    const [stickynotes, setStickynotes] = useState([]);

    const handleReopenNote = (id) => {
        setStickynotes(prev => prev.filter(note => note.id !== id));
        window.electron.ipcRenderer.send('reopen-sticky-note', id);
    };

    useEffect(() => {
        const handleReceiveNotes = (event, data) => {
            setStickynotes(data);
        };

        window.electron.ipcRenderer.on('receive-notes', handleReceiveNotes);
        window.electron.ipcRenderer.send('getAllNotes');

        return () => {
            window.electron.ipcRenderer.removeListener(
                'receive-notes', 
                handleReceiveNotes
            );
        };
    }, []);

    return (
        <div className="flex bg-[#F8EAA6] w-screen h-screen justify-center align-middle items-center p-1">
            <div className="flex flex-col w-full max-w-[100% - 4px] h-full max-h-[100% - 4px] bg-[#F8EAA6] p-[2px]">
                <div className="flex flex-row min-h-14 overflow-x-auto overflow-y-hidden gap-2">
                    {stickynotes.map((note) => (
                        <StickyNoteIcon 
                            key={note.id}
                            id={note.id}
                            onReopen={handleReopenNote}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StickyFolder;