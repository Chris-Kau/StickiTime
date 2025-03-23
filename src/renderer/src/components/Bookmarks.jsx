import Bookmark from "./Bookmark"
import { useState, useEffect } from "react";

function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([])

    const openAddBookmark = () => window.electron.ipcRenderer.send('open-addBookmark')
    // const receiverBookmark = () => window.electron.ipcRenderer.receive('receive-bookmark')

    // useEffect(() => {
    //     // Add IPC listener when component mounts
    //     const receiveBookmarkHandler = (event, data) => {
    //         console.log("Received bookmark:", data)
    //         setBookmarks(prev => [...prev, {
    //             hyperlink: data.hyperlink,
    //             name: data.name,
    //             icon: data.icon,
    //         }])
    //     }

    //     window.electron.ipcRenderer.on('receive-bookmark', (e, d) => {receiveBookmarkHandler(e, d)})

    //     // Cleanup listener when component unmounts
    //     return () => {
    //         // window.electron.ipcRenderer.removeListener('receive-bookmark', handleBookmarkReceive)
    //     }
    // }, []) // Empty dependency array means this runs once on mount

    window.electron.ipcRenderer.on('receive-bookmark', function(event, data) {
        console.log("data".concat(' ', data))
        addBookmark(data.name, data.hyperlink, data.icon)
    })
    function addBookmark(name, hyperlink, icon) {
        setBookmarks([...bookmarks, { name: name, hyperlink: hyperlink, icon: icon }]);
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
                    <Bookmark key={index} name={bookmark.name} hyperlink={bookmark.hyperlink} icon={bookmark.icon}/>
                ))}
                
            </div>
        </div>
    )
}

export default Bookmarks;