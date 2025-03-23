import ClockIcon from '../../../../resources/icons/regular/clock.svg?react';
import StickyNotesFolderIcon from '../../../../resources/icons/regular/folder-open.svg?react';
import StickyNoteIcon from '../../../../resources/icons/regular/edit.svg?react';
import BookmarkIcon from '../../../../resources/icons/regular/bookmark.svg?react';
import { useState } from 'react';

function MenuBar() {
    const [bookmarksWindowState, setBookmarksWindowState] = useState("open")
    const openTimer = () => window.electron.ipcRenderer.send('open-timer')
    const openStickyNote = () => window.electron.ipcRenderer.send('open-sticky-note')
    const openBookmarks = () => {
        window.electron.ipcRenderer.send("close-open-window", bookmarksWindowState, "bookmarksWindow")
        if (bookmarksWindowState == "open") {
            setBookmarksWindowState("close")
        } else {
            setBookmarksWindowState("open")
        }
    }




    return (
        <div className = "flex bg-[#D9D9D9] w-screen h-screen justify-center align-middle items-center p-1">
            <div className = "flex flex-row justify-end gap-3 w-full max-w-[100% - 4px] h-full max-h-[100% - 4px]  bg-[#FFFBF5] p-[2px]">

                {/* Bookmark */}
                <div className = "flex flex-col justify-center items-center  gap-0 max-h-11 transition-all duration-200 hover:bg-black/20">
                    <BookmarkIcon className = "w-6 h-6 mt-1 fill-[#747474]"/>
                    <button className="-mt-1 text-[#747474]" onClick = {() => openBookmarks()}>Bookmark</button>
                </div>
                
                {/* Timer */}
                <div className = "flex flex-col justify-center items-center  gap-0 max-h-11 transition-all duration-200 hover:bg-black/20" onClick = {() => openTimer()}>
                    <ClockIcon className = "w-6 h-6 mt-1 fill-[#747474]"/>
                    <button className="-mt-1 text-[#747474]">Timer</button>
                </div>

                {/* New Note */}
                <div className = "flex flex-col justify-center items-center  gap-0 max-h-11 transition-all duration-200 hover:bg-black/20">
                    <StickyNoteIcon className = "w-6 h-6 mt-1 fill-[#747474]"/>
                    <button className="-mt-1 text-[#747474]" onClick = {() => openStickyNote()}>New Note</button>
                </div>

                {/* Sticky Notes */}
                <div className = "flex flex-col justify-center items-center  gap-0 max-h-11 transition-all duration-200 hover:bg-black/20">
                    <StickyNotesFolderIcon className = "w-6 h-6 mt-1 fill-[#747474]"/>
                    <button className="-mt-1 text-[#747474]" onClick = {() => openBookmarks()}>Sticky Notes</button>
                </div>

            </div>
        </div>
       
    )
}

export default MenuBar
