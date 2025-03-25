import Navbar from "./components/Navbar"
import Timer from "./components/Timer";
import StickyNote from "./components/StickyNote"
import Bookmarks from "./components/Bookmarks";
import AddBookMark from "./components/AddBookMark";
import StickyFolder from "./components/StickyFolder";
import ClosedNavbar from "./components/ClosedNavBar";
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar/>} />
        <Route path="/timer" element={<Timer/>} />
        <Route path="/stickynote" element={<StickyNote/>} />
        <Route path="/bookmarks" element={<Bookmarks/>} />
        <Route path="/addbookmark" element={<AddBookMark/>} />
        <Route path="/stickynotefolder" element={<StickyFolder/>}></Route>
        <Route path="/closednavbar" element={<ClosedNavbar/>}></Route>
      </Routes>
    </HashRouter>

    </>
  )
}

export default App
