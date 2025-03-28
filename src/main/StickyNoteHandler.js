import { app, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
let stickyNoteWindow;
let stickyFolderWindow;
let screenSize;
let macMenuBarHeight;
function LoadStickyNote(){
    function openStickyFolder() {
      if(!stickyFolderWindow){
        stickyFolderWindow = new BrowserWindow({
          width: Math.floor(screenSize.width/2),
          height: 70,
          autoHideMenuBar: true,
          titleBarStyle: "hidden",
          alwaysOnTop: true,
          scrollbar: false,
          frame: false,
          roundedCorners: false,
          thickFrame: false,
          resizable: false,
          fullscreenable: false,
          webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
          }
        });
        stickyFolderWindow.hide()
    
        if(process.platform == "darwin"){ //hide macOS traffic lights
          stickyFolderWindow.setWindowButtonVisibility(false);
        }
        stickyFolderWindow.on('ready-to-show', () => {
          stickyFolderWindow.setPosition(Math.floor(screenSize.width / 2 - screenSize.width / 4), (process.platform == "darwin" ? (71 + macMenuBarHeight) : 71))
        })
    
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
          stickyFolderWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/stickynotefolder`)
        } else {
          stickyFolderWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}#/stickynotefolder`)
        }
      }
    }
    ipcMain.on('open-sticky-note', () => {
      stickyNoteWindow = new BrowserWindow({
        width: 300,
        height: 300,
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        maxWidth: 450,
        maxHeight: 450,
        minWidth: 200,
        minHeight: 200,
        roundedCorners: false,
        frame: false,
        thickFrame: false,
        webPreferences:{
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      });
      if(process.platform == "darwin"){ //hide macOS traffic lights
        stickyNoteWindow.setWindowButtonVisibility(false);
      }
      stickyFolderWindow.webContents.send('receive-id', stickyNoteWindow.id )
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        stickyNoteWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/stickynote`)
      } else {
        stickyNoteWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}#/stickynote`)
      }
    
    })
    ipcMain.on('reopen-sticky-note', (event, data) => {
      console.log(data)
      const win = BrowserWindow.fromId(data)
      win.show()
    })
    ipcMain.on('minimize-window', (event, isStickyNote) => {
        const window = BrowserWindow.getFocusedWindow();
        if (window) {
          if(!isStickyNote)
            window.minimize();
          else{
            window.hide()
            stickyFolderWindow.webContents.send('receive-stickynote', {name: "name", id: window.id})
          }
        }
      });
    app.whenReady().then(()=>{
          screenSize = screen.getPrimaryDisplay().size
          macMenuBarHeight = screen.getPrimaryDisplay().workArea.y;
          openStickyFolder()
    })
}

export default LoadStickyNote;