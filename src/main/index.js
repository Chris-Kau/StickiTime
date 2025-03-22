import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
let timerWindow;
let stickyNoteWindow;
let bookmarksWindow;
function createWindow() {
  // Create the browser window.
  const screenSize = screen.getPrimaryDisplay().workAreaSize
  const mainWindow = new BrowserWindow({
    width: screenSize.width / 2,
    height: 50,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    alwaysOnTop: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.setPosition(screenSize.width/2 - screenSize.width / 4, 0)
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/`)
  } else {
    mainWindow.loadFile(`${join(__dirname, '../renderer/index.html')}#/`)
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC open windows
  ipcMain.on('open-timer', () => {
    if(!timerWindow){
      timerWindow = new BrowserWindow({
        width: 500,
        height: 500
      });
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        timerWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/timer`)
      } else {
        timerWindow.loadFile(`${join(__dirname, '../renderer/index.html')}#/timer`)
      }

      timerWindow.on('close', ()=>{
        timerWindow = null;
      })
    }else{
      timerWindow.focus()
    }

  })

  ipcMain.on('open-sticky-note', () => {
      stickyNoteWindow = new BrowserWindow({
        width: 500,
        height: 500
      });
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        stickyNoteWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/stickynote`)
      } else {
        stickyNoteWindow.loadFile(`${join(__dirname, '../renderer/index.html')}#/stickynote`)
      }

      stickyNoteWindow.on('close', ()=>{
        stickyNoteWindow = null;
      })

  })

  ipcMain.on('open-bookmarks', () => {
    if(!bookmarksWindow){
      bookmarksWindow = new BrowserWindow({
        width: 500,
        height: 500
      });
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        bookmarksWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/bookmarks`)
      } else {
        bookmarksWindow.loadFile(`${join(__dirname, '../renderer/index.html')}#/bookmarks`)
      }

      bookmarksWindow.on('close', ()=>{
        bookmarksWindow = null;
      })
    }else{
      bookmarksWindow.focus()
    }
  })

  createWindow()

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
