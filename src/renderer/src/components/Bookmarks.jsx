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
        <div className = "flex bg-[#D9D9D9] w-screen h-screen justify-center align-middle items-center p-1">
            <div className="flex flex-col w-full max-w-[100% - 4px] h-full max-h-[100% - 4px]  bg-[#FFFBF5] p-[2px]">
                {/* Scrollable Content Area */}
                <div 
                    className="flex-1 overflow-y-auto p-2 space-y-2"
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
                <div className="sticky bottom-0 p-3 max-h-5 bg-[#D9D9D9]">
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


