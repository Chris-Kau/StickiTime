import MenuBar from "./components/MenuBar"
import Timer from "./components/Timer";
import StickyNote from "./components/StickyNote"
import Bookmarks from "./components/Bookmarks";
import AddBookMark from "./components/AddBookMark";
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<MenuBar/>} />
        <Route path="/timer" element={<Timer/>} />
        <Route path="/stickynote" element={<StickyNote/>} />
        <Route path="/bookmarks" element={<Bookmarks/>} />
        <Route path="/addbookmark" element={<AddBookMark/>} />
      </Routes>
    </HashRouter>

    </>
  )
}

export default App
