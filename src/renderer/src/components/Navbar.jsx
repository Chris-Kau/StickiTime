import ClockIcon from '../../../../resources/icons/mintcat_icons/clock_20.svg?react';
import StickyNotesFolderIcon from '../../../../resources/icons/mintcat_icons/note_stack_20.svg?react';

import BmIcon from '../../../../resources/icons/mintcat_icons/bookmark.svg?react';
import NewNoteIcon from '../../../../resources/icons/mintcat_icons/new_note.svg?react';

import UpIcon from '../../../../resources/icons/regular/chevron-up.svg?react';
import CloseIcon from '../../../../resources/icons/regular/window-close.svg?react';

import SpriteAnimation from './SpriteAnimation';
import { useState } from 'react';

function Navbar() {
    const [bookmarksWindowState, setBookmarksWindowState] = useState("open")
    const [stickyFolderWindowState, setStickyFolderWindowState] = useState("open")
    const openTimer = () => window.electron.ipcRenderer.send('open-timer')
    const openStickyNote = () => window.electron.ipcRenderer.invoke('open-sticky-note')
    const openBookmarks = () => {
        window.electron.ipcRenderer.send("close-open-window", bookmarksWindowState, "bookmarksWindow")
        if (bookmarksWindowState == "open") {
            setBookmarksWindowState("close")
            setStickyFolderWindowState("open")
            window.electron.ipcRenderer.send('close-open-window', "close", "stickyFolderWindow")
        } else {
            setBookmarksWindowState("open")
        }

    }
    const openStickyFolder = () => {
        window.electron.ipcRenderer.send('close-open-window', stickyFolderWindowState, "stickyFolderWindow")
        if (stickyFolderWindowState == "open") {
            setStickyFolderWindowState("close")
            setBookmarksWindowState("open")
            window.electron.ipcRenderer.send('close-open-window', "close", "bookmarksWindow")
        } else {
            setStickyFolderWindowState("open")
        }
    }

    const minimizeNavbar = () => {
        setStickyFolderWindowState("open")
        setBookmarksWindowState("open")
        window.electron.ipcRenderer.send('minimize-navbar', "close")
        window.electron.ipcRenderer.send('close-open-window', "close", "stickyFolderWindow")
        window.electron.ipcRenderer.send('close-open-window', "close", "bookmarksWindow")
    }

    const closeNavbar = () => {
        window.electron.ipcRenderer.send('close-app')
    }



    return (
        <div className="flex bg-[#D9D9D9] w-screen h-screen justify-center p-1">

            <div className="flex w-full max-w-[100% - 4px] h-full max-h-[100% - 4px]  bg-[#FFFBF5]">

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform pb-2 flex gap-2">
                    <div onClick={minimizeNavbar} className="cursor-pointer">
                        <UpIcon className="w-4 h-4 fill-[#747474]" />
                    </div>
                </div>



                <div className="flex w-full items-center pl-5">
                    <SpriteAnimation />
                </div>



                <div className="flex flex-row gap-3 justify-end w-full max-w-[100% - 4px] h-full max-h-[100% - 4px] p-[2px]">

                    {/* Bookmark */}
                    <div onClick={() => openBookmarks()}
                        className={`flex flex-col justify-center items-center gap-0 max-h-20 transition-all duration-200 w-15 h-15 ${bookmarksWindowState == "open"
                            ? "hover:bg-[#EFBFA7]"
                            : "bg-[#EFBFA7]"
                            }`}
                    >
                        <BmIcon className="w-6 h-6 mt-1 fill-[#747474]" />
                        <button className=" text-[#747474]">Bookmarks</button>
                    </div>

                    {/* Timer */}
                    <div onClick={() => openTimer()} className="flex flex-col justify-center items-center  gap-0 max-h-20 transition-all duration-200 hover:bg-black/20 w-15 h-15">
                        <ClockIcon className="w-6 h-6 mt-1 fill-[#747474]" />
                        <button className=" text-[#747474]">Timer</button>
                    </div>

                    {/* New Note */}
                    <div
                        onClick={() => openStickyNote()} className="flex flex-col justify-center items-center  gap-0 max-h-20 transition-all duration-200 hover:bg-black/20 w-15 h-15">
                        <NewNoteIcon className="w-6 h-6 mt-1 fill-[#747474]" />
                        <button className=" text-[#747474]" >+ Sticky</button>
                    </div>

                    {/* Sticky Notes */}
                    <div
                        onClick={() => openStickyFolder()}
                        className={`flex flex-col justify-center items-center gap-0 max-h-20 transition-all duration-200 w-15 h-15 ${stickyFolderWindowState == "open"
                            ? "hover:bg-[#F8EAA6]"
                            : "bg-[#F8EAA6]"
                            }`}
                    >
                        <StickyNotesFolderIcon className="w-6 h-6 mt-1 fill-[#747474]" />
                        <button className=" text-[#747474]">Stickies</button>
                    </div>
                    <div onClick={()=>closeNavbar()} className='flex bg-[#fcd7d7] max-w-3 max-h-3 align-middle items-center justify-center'>
                        <CloseIcon className="w-3 h-3 fill-[#747474] opacity-70 hover:opacity-100" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar;
