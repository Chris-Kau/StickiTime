import ClockIcon from '../../../../resources/icons/regular/clock.svg?react';
import StickyNotesFolderIcon from '../../../../resources/icons/regular/folder-open.svg?react';
import StickyNoteIcon from '../../../../resources/icons/regular/edit.svg?react';
import BookmarkIcon from '../../../../resources/icons/regular/bookmark.svg?react';
import SpriteAnimation from './SpriteAnimation';
import { useState } from 'react';

function MenuBar() {
    const [bookmarksWindowState, setBookmarksWindowState] = useState("open")
    const [stickyFolderWindowState, setStickyFolderWindowState] = useState("open")
    const [mainState, setMainState] = useState("close")
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

    const openMain = () =>  {
        window.electron.ipcRenderer.send('close-open-window', mainState, "mainWindow")
        if (mainState == "open") {
            setMainState("close")
        } else {
            setMainState("open")
        }
        window.electron.ipcRenderer.send('close-open-window', "close", "stickyFolderWindow")
        window.electron.ipcRenderer.send('close-open-window', "close", "bookmarksWindow")
    }



  return (
    <div className = "flex bg-[#D9D9D9] w-screen h-screen justify-center p-1">
      <div className = "flex w-full max-w-[100% - 4px] h-full max-h-[100% - 4px]  bg-[#FFFBF5]"> {/* light bg and size */}
            
        <div className = "flex w-full items-center pl-5">
            <SpriteAnimation/>
        </div>

        <div className = "flex flex-row gap-3 justify-end w-full max-w-[100% - 4px] h-full max-h-[100% - 4px] p-[2px]">

            {/* Bookmark */}
            <div 
                onClick={() => openBookmarks()} 
                className={`flex flex-col justify-center items-center gap-0 max-h-20 transition-all duration-200 ${
                    bookmarksWindowState == "open" 
                    ? "hover:bg-[#EFBFA7]" 
                    : "bg-[#EFBFA7]"
                }`}
                >
                <BookmarkIcon className="w-6 h-6 mt-1 fill-[#747474]"/>
                <button className="-mt-1 text-[#747474]">Bookmarks</button>
            </div>
            
            {/* Timer */}
            <div onClick = {() => openTimer()} className = "flex flex-col justify-center items-center  gap-0 max-h-20 transition-all duration-200 hover:bg-black/20">
                <ClockIcon className = "w-6 h-6 mt-1 fill-[#747474]"/>
                <button className="-mt-1 text-[#747474]">Timer</button>
            </div>

            {/* New Note */}
            <div onClick = {() => openStickyNote()} className = "flex flex-col justify-center items-center  gap-0 max-h-20 transition-all duration-200 hover:bg-black/20">
                <StickyNoteIcon className = "w-6 h-6 mt-1 fill-[#747474]"/>
                <button className="-mt-1 text-[#747474]" >New Note</button>
            </div>

            {/* Sticky Notes */}
            <div 
                onClick={() => openStickyFolder()} 
                className={`flex flex-col justify-center items-center gap-0 max-h-20 transition-all duration-200 ${
                    stickyFolderWindowState == "open" 
                    ? "hover:bg-[#F8EAA6]" 
                    : "bg-[#F8EAA6]"
                }`}
                >
                <StickyNotesFolderIcon className="w-6 h-6 mt-1 fill-[#747474]"/>
                <button className="-mt-1 text-[#747474]">Sticky Notes</button>
            </div>
        </div>
        
      </div>
    </div>
    )
}

export default MenuBar;
