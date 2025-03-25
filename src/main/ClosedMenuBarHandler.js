import { app, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
let screenSize;
let closedMenuBar
function ClosedMenuBarHandler(){
    function openClosedMenuBar() {
      if(!closedMenuBar){
        closedMenuBar = new BrowserWindow({
          width: 30,
          height: 30, // AAAAAAAAAAAAAHHHHHHHHHHHHHHHHHH
          // height: 500,
          autoHideMenuBar: true,
          titleBarStyle: "hidden",
          alwaysOnTop: true,
          scrollbar: false,
          frame: false,
          thickFrame: false,
          resizable: false,
          fullscreenable: false,
          transparent: true,
          webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
          }
        });
    
        closedMenuBar.hide()
        closedMenuBar.on('ready-to-show', () => {

          closedMenuBar.setPosition(screenSize.width/2 - 15, 0)
        })
    
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
          closedMenuBar.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/closedmenubar`)
        } else {
          closedMenuBar.loadURL(`file://${join(__dirname, '../renderer/index.html')}#/closedmenubar`)
        }
      }
    }

    app.whenReady().then(()=>{
      screenSize = screen.getPrimaryDisplay().size
      openClosedMenuBar()
    })

    ipcMain.on("minimize-main", (event, action, window) => {
      if (!closedMenuBar) return;
      if (action == 'close') {
        closedMenuBar.show()
      } else {
        closedMenuBar.hide()
      }
    })
    


}

export default ClosedMenuBarHandler;