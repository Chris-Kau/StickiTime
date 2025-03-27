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
        <div className = "flex bg-[#debba9] w-screen h-screen justify-center align-middle items-center p-1">
            <div className="flex flex-col w-full max-w-[100% - 4px] h-full bg-[#FFFBF5] p-[2px] ">
                {/* Scrollable Content Area */}
                <div 
                    className="flex flex-row flex-1 overflow-x-auto overflow-y-hidden  gap-2"
                    style={{ 
                        msOverflowStyle: 'none',
                        scrollbarWidth: "thin",
                        scrollbarColor: "#cbad9e transparent"}}
                    onWheel={(e) => {
                        e.currentTarget.scrollLeft += e.deltaY / 2; 
                    }}
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

                {/* Boomark Add Button */}
                {/* bg-[#EFBFA7] */}
                <div className="sticky bottom-0 items-center bg-[#EFBFA7]">
                    <button
                        className=" w-full text-gray-500 hover:text-black text-center"
                        onClick={openAddBookmark}>
                        + Add Bookmark
                    </button>
                </div>
            </div>
        </div>
       
    )
}

export default Bookmarks;


