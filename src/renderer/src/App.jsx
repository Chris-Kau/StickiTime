import MenuBar from "./components/MenuBar"
import StickyNote from "./components/StickyNote"
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<MenuBar/>} />
        <Route path="/timer" element={<MenuBar/>} />
        <Route path="/stickynote" element={<StickyNote/>} />
        <Route path="/bookmarks" element={<MenuBar/>} />
      </Routes>
    </HashRouter>

    </>
  )
}

export default App
