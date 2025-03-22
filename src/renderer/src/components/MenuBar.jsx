
function MenuBar() {
    const openTimer = () => window.electron.ipcRenderer.send('open-timer')
    const openStickyNote = () => window.electron.ipcRenderer.send('open-sticky-note')
    const openBookmarks = () => window.electron.ipcRenderer.send('open-bookmarks')

    return (
        <div className = "grid grid-cols-4 w-screen h-screen">
            <div className = "flex border-2 border-blue-300 justify-center items-center">
                <button onClick = {() => openTimer()}>Timer</button>
            </div>
            <div className = "flex border-2 border-blue-300 justify-center items-center">
                <button onClick = {() => openStickyNote()}>+Note</button>
            </div>
            <div className = "flex border-2 border-blue-300 justify-center items-center">
                <button onClick = {() => openBookmarks()}>Bookmarks</button>
            </div>
            <div className = "flex border-2 border-blue-300 justify-center items-center">
                <button>Close</button>
            </div>

        </div>
    )
}

export default MenuBar
