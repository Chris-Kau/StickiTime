import { app, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
let screenSize;
let closedNavbar
function closedNavbarHandler() {
  function openclosedNavbar() {
    if (!closedNavbar) {
      closedNavbar = new BrowserWindow({
        width: 21,
        height: 21,
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        alwaysOnTop: true,
        scrollbar: false,
        frame: false,
        thickFrame: false,
        resizable: false,
        fullscreenable: false,
        roundedCorners: false,
        transparent: true,
        backgroundColor: "#00ffffff",
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      });

      closedNavbar.hide()
      if (process.platform == "darwin") { //hide macOS traffic lights
        closedNavbar.setWindowButtonVisibility(false);
      }
      closedNavbar.on('ready-to-show', () => {
        closedNavbar.setPosition(Math.floor(screenSize.width / 2 - 15), 0)
      })

      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        closedNavbar.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/closednavbar`)
      } else {
        closedNavbar.loadURL(`file://${join(__dirname, '../renderer/index.html')}#/closednavbar`)
      }
    }
  }

  app.whenReady().then(() => {
    screenSize = screen.getPrimaryDisplay().size
    openclosedNavbar()
  })

  ipcMain.on("minimize-navbar", (event, action, window) => {
    if (!closedNavbar) return;
    console.log("test1");
    if (action == 'close') {
      closedNavbar.show()
    } else {
      closedNavbar.hide()
    }
  })



}

export default closedNavbarHandler;