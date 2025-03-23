import Bookmark from "./Bookmark"
import { useState, useEffect } from "react";

function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([])

    // Animation handler
    const handleClose = () => {
        window.electron.ipcRenderer.send('animate-close-window');
    };

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
        <div className="flex flex-col h-screen bg-gray-50">
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
            <div className="sticky bottom-0 p-3 bg-white border-t">
                <button
                    className="w-full flex items-center justify-center p-2 space-x-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={openAddBookmark}
                >
                    <span className="text-xl">+</span>
                    <span>Add Bookmark</span>
                </button>
            </div>
        </div>
    )
}

export default Bookmarks;


