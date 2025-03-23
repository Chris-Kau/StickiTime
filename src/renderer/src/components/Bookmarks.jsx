import Bookmark from "./Bookmark"
import { useState, useEffect } from "react";
function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([])

    // Animation handler
    // const handleClose = () => {
    //     window.electron.ipcRenderer.send('animate-close-window');
    // };

    const openAddBookmark = () => window.electron.ipcRenderer.send('open-addBookmark')

    window.electron.ipcRenderer.on('receive-bookmark', function(event, data) {
        console.log("data".concat(' ', data))
        addBookmark(data.name, data.hyperlink)
    })

    function addBookmark(name, hyperlink) {
        setBookmarks([...bookmarks, { id: crypto.randomUUID(), name: name, hyperlink: hyperlink}]);
    }
    
    function deleteBookmark(id) {
        setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
    }

    return (
        <div className = "flex bg-[#EFBFA7] w-screen h-screen justify-center align-middle items-center p-1">
            <div className="flex flex-col min-w-screen max-w-[100% - 10px] h-full min-h-screen max-h-[100% - 4px] bg-[#EFBFA7] ">
                {/* Scrollable Content Area */}
                <div 
                    className="flex-1 overflow-y-hidden p-2 space-y-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                    {/* Dynamic Bookmarks */}
                    {bookmarks.map((bookmark) => (
                    <Bookmark
                        key={bookmark.id}
                        id={bookmark.id}
                        name={bookmark.name}
                        hyperlink={bookmark.hyperlink}
                        onDelete={deleteBookmark}
                    />
                    ))}
                </div>

                {/* Sticky Add Button */}
                <div className="sticky bottom-0 p-5 max-h-5 h-full bg-[#EFBFA7]">
                    <button
                        className=" flex items-center justify-center align-middle text-center w-full h-full text-gray-500 hover:text-black"
                        onClick={openAddBookmark}
                    >
                        + Add Bookmark
                    </button>
                </div>
            </div>
        </div>
       
    )
}

export default Bookmarks;


