import Bookmark from "./Bookmark"
import { useState } from "react";

function Bookmarks() {
    const openAddBookmark = () => window.electron.ipcRenderer.send('open-addBookmark')

    const [bookmarks, setBookmarks] = useState([]);
    function addBookmark() {
        setBookmarks([...bookmarks, { classname: "", hyperlink: "Hello" }]);
    }

    return (
        <div>
            <div
                id="mainGrid" 
                className="grid grid-cols-1 auto-rows-min w-full h-screen scrollbar-hide px-5 overflow-hidden" 
                style={{ overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <div className="bg-red-50 sticky top-0 w-fill h-12 flex items-center px-4 overflow-hidden">
                    <button className="bg-amber-400" onClick={() => openAddBookmark()}>+ Add Bookmark</button>
                </div>

                {bookmarks.map((bookmark, index) => (
                    <Bookmark key={index} classname={bookmark.classname} hyperlink={bookmark.hyperlink} />
                ))}
                
            </div>
        </div>
    )
}

export default Bookmarks;