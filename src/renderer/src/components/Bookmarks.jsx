import Bookmark from "./Bookmark"
import { useState, useEffect } from "react";
function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([])

    const openAddBookmark = () => window.electron.ipcRenderer.send('open-addBookmark')

    useEffect(() => {
        window.electron.ipcRenderer.invoke('getAllBookmarks').then((e) => setBookmarks(e));
        const updateBookmarks = (event, data) => setBookmarks(data);
        window.electron.ipcRenderer.on('receive-bookmarks', updateBookmarks);

        return () => {
            window.electron.ipcRenderer.removeListener('receive-bookmarks', updateBookmarks);
        };
    }, []);


    return (
        <div className="flex bg-[#debba9] w-screen h-screen justify-center align-middle items-center p-1">
            <div className="flex flex-col w-full max-w-[100% - 4px] h-full bg-[#FFFBF5] p-[2px] ">
                {/* Scrollable Content Area */}
                <div
                    className="flex flex-row flex-1 overflow-x-auto overflow-y-hidden  gap-2"
                    style={{
                        msOverflowStyle: 'none',
                        scrollbarWidth: "thin",
                        scrollbarColor: "#cbad9e transparent"
                    }}
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
                        />
                    ))}
                </div>

                {/* Boomark Add Button */}
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


