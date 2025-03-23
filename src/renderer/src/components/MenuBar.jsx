import ClockIcon from '../../../../resources/icons/regular/clock.svg?react';
import StickyNotesFolderIcon from '../../../../resources/icons/regular/folder-open.svg?react';
import StickyNoteIcon from '../../../../resources/icons/regular/edit.svg?react';
import BookmarkIcon from '../../../../resources/icons/regular/bookmark.svg?react';
import { useState } from 'react';

function MenuBar() {
    const [bookmarksWindowState, setBookmarksWindowState] = useState("open")
    const [stickyFolderWindowState, setStickyFolderWindowState] = useState("open")
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
    const openStickyFolder = () => {
        window.electron.ipcRenderer.send('close-open-window', stickyFolderWindowState, "stickyFolderWindow")
        if (stickyFolderWindowState == "open") {
            setStickyFolderWindowState("close")
        } else {
            setStickyFolderWindowState("open")
        }
    }



    return (
        <div className = "flex bg-[#D9D9D9] w-screen h-screen justify-center align-middle items-center p-1">
            <div className = "flex flex-row justify-end gap-3 w-full max-w-[100% - 4px] h-full max-h-[100% - 4px]  bg-[#FFFBF5] p-[2px]">

                {/* Bookmark */}
                <div onClick = {() => openBookmarks()} className = "flex flex-col justify-center items-center  gap-0 max-h-20 transition-all duration-200 hover:bg-black/20">
                    <BookmarkIcon className = "w-6 h-6 mt-1 fill-[#747474]"/>
                    <button className="-mt-1 text-[#747474]" >Bookmark</button>
                </div>
                
                {/* Timer */}
                <div onClick = {() => openTimer()} className = "flex flex-col justify-center items-center  gap-0 max-h-20 transition-all duration-200 hover:bg-black/20" >
                    <ClockIcon className = "w-6 h-6 mt-1 fill-[#747474]"/>
                    <button className="-mt-1 text-[#747474]">Timer</button>
                </div>

                {/* New Note */}
                <div onClick = {() => openStickyNote()} className = "flex flex-col justify-center items-center  gap-0 max-h-20 transition-all duration-200 hover:bg-black/20">
                    <StickyNoteIcon className = "w-6 h-6 mt-1 fill-[#747474]"/>
                    <button className="-mt-1 text-[#747474]" >New Note</button>
                </div>

                {/* Sticky Notes */}
                <div onClick = {() => openStickyFolder()} className = "flex flex-col justify-center items-center  gap-0 max-h-20 transition-all duration-200 hover:bg-black/20">
                    <StickyNotesFolderIcon className = "w-6 h-6 mt-1 fill-[#747474]"/>
                    <button className="-mt-1 text-[#747474]" >Sticky Notes</button>
                </div>

            </div>
        </div>
       
    )
}

export default MenuBar
