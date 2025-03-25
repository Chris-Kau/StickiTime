import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
const fetch = require('node-fetch')
import icon from '../../resources/icon.png?asset'
import stickyNoteHandler from "./StickyNoteHandler.js"
import bookmarkHandler from "./BookmarkHandler.js"
import timerHandler from "./PomodoroTimerHandler.js"
let screenSize;
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: screenSize.width / 2, // aAAAAAAAAAAAAHHHHHHHHHHH
    // width: 800,
    height: 70,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    alwaysOnTop: true,
    frame: false,
    thickFrame: false,
    resizable: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.setPosition(screenSize.width/2 - screenSize.width / 4, 0) // aAAAAAAAAAAAAHHHHHHHHHHH
    // mainWindow.setPosition(500, 0)
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  mainWindow.on('closed', ()=>{
    if (process.platform !== 'darwin') {
      console.log(process.platform)
      app.quit()
    }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/`)
  } else {
    mainWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}#/`)
  }
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  screenSize = screen.getPrimaryDisplay().size // or ?????????????????????????

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC open windows
  bookmarkHandler();
  stickyNoteHandler();
  timerHandler();
  createWindow();
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('minimize-window', (event, isStickyNote) => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
    if(!isStickyNote)
      window.minimize();
  }
});
ipcMain.on('pin-window', () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
      window.setAlwaysOnTop(!window.isAlwaysOnTop());
  }
});


ipcMain.on('close-open-window', (event, action = 'close', window) => {
  const win = eval(window);
  if (!win) return;
  if (action == 'close') {
    win.hide()
  } else {
    win.show()
  }
})

ipcMain.on("minimize-main", (event, action, window) => {
  const win = mainWindow
  if (!win) return;
  if (action == 'close') {
    mainWindow.setPosition(screenSize.width / 2 - screenSize.width / 4, -57)
  } else {
    mainWindow.setPosition(screenSize.width / 2 - screenSize.width / 4, 0)
  }

})
