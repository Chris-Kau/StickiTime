import { app, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
let stickyNoteWindow;
let stickyFolderWindow;
let screenSize;
function LoadStickyNote(){
    function openStickyFolder() {
      if(!stickyFolderWindow){
        stickyFolderWindow = new BrowserWindow({
          width: 85,
          height: 500, // AAAAAAAAAAAAAHHHHHHHHHHHHHHHHHH
          // height: 500,
          autoHideMenuBar: true,
          titleBarStyle: "hidden",
          alwaysOnTop: true,
          scrollbar: false,
          frame: false,
          thickFrame: false,
          resizable: false,
          fullscreenable: false,
          webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
          }
        });
        stickyFolderWindow.hide()
    
        stickyFolderWindow.on('ready-to-show', () => {
          stickyFolderWindow.setPosition(screenSize.width / 2 + 296, 72)
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
        
        webPreferences:{
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      });
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
          openStickyFolder()
    })
}

export default LoadStickyNote;