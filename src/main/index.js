import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import StickyFolder from '../renderer/src/components/StickyFolder'
const fetch = require('node-fetch')
let timerWindow;
let bookmarksWindow;
let addBookmarkWindow;
let screenSize;
let stickyNoteWindow;
let stickyFolderWindow;



function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: screenSize.width / 2, // aAAAAAAAAAAAAHHHHHHHHHHH
    // width: 800,
    height: 70,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    alwaysOnTop: true,
    frame: false,
    thickFrame: false,
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
  ipcMain.on('open-timer', () => {
    if(!timerWindow){
      timerWindow = new BrowserWindow({
        width: 350,
        height: 250,
        resizable: false,
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        webPreferences:{
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      });
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        timerWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/timer`)
      } else {
        timerWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}#/timer`)
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
  function openBookmark() {
    if(!bookmarksWindow){
      bookmarksWindow = new BrowserWindow({
        width: 200,
        height: 500, // AAAAAAAAAAAAAHHHHHHHHHHHHHHHHHH
        // height: 500,
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        alwaysOnTop: true,
        scrollbar: false,
        frame: false,
        thickFrame: false,
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      });

      bookmarksWindow.setPosition(screenSize.width / 2 - 10, 71)
      bookmarksWindow.on('ready-to-show', () => {
        // bookmarksWindow.show()
        bookmarksWindow.hide()
      })

      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        bookmarksWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/bookmarks`)
      } else {
        bookmarksWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}#/bookmarks`)
      }

      bookmarksWindow.on('close', ()=>{
        bookmarksWindow = null;
      })
    }else{
      bookmarksWindow.focus()
    }
  
    bookmarksWindow.webContents.setWindowOpenHandler(({ url }) => {
      console.log(url)
      OpenURL(url);
      return { action: 'deny' };
    });
    
    async function OpenURL(url) {
      await shell.openExternal(url)
    }
  }
  openBookmark()


  ipcMain.on('open-addBookmark', () => {
    if(!addBookmarkWindow){
      addBookmarkWindow = new BrowserWindow({
        width: 400,
        height: 250,
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        alwaysOnTop: true,
        scrollbar: false,

        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      });
      
      addBookmarkWindow.setPosition(screenSize.width/2 - screenSize.width/4, screenSize.height/2 - screenSize.height / 4)
      addBookmarkWindow.on('ready-to-show', () => {
        addBookmarkWindow.show()
      })

      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        addBookmarkWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/addbookmark`)
      } else {
        addBookmarkWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}#/addbookmark`)
      }

      addBookmarkWindow.on('close', ()=>{
        addBookmarkWindow = null;
      })
    }else{
      addBookmarkWindow.focus()
    }
  })

  function openStickyFolder() {
    if(!stickyFolderWindow){
      stickyFolderWindow = new BrowserWindow({
        width: 190,
        height: 500, // AAAAAAAAAAAAAHHHHHHHHHHHHHHHHHH
        // height: 500,
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        alwaysOnTop: true,
        scrollbar: false,
        frame: false,
        thickFrame: false,
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      });
      stickyFolderWindow.hide()

      stickyFolderWindow.on('ready-to-show', () => {
        stickyFolderWindow.setPosition(screenSize.width / 2 + 191, 72)

        // stickyFolderWindow.show()
      })

      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        stickyFolderWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/stickynotefolder`)
      } else {
        stickyFolderWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}#/stickynotefolder`)
      }

      stickyFolderWindow.on('close', ()=>{
        stickyFolderWindow = null;
      })
    }else{
      stickyFolderWindow.focus()
    }
  
  }
  openStickyFolder()

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

// Handle the minimize event
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

ipcMain.on('pin-window', () => {
  const window = BrowserWindow.getFocusedWindow();
  if (window) {
      window.setAlwaysOnTop(!window.isAlwaysOnTop());
  }
});

ipcMain.on('addingBookMark', function(event, data) {
  console.log(data)
  bookmarksWindow.webContents.send('receive-bookmark', data);
});



ipcMain.handle('fetch-favicon', async (_, url) => {
  try {
    const domain = new URL(url).hostname
    const response = await fetch(`https://www.google.com/s2/favicons?domain=${domain}&sz=64`)
    const buffer = await response.buffer()
    return `data:image/png;base64,${buffer.toString('base64')}`
  } catch (error) {
    // Return a default icon as base64
    return "data:image/png;base64,..."
  }
})

ipcMain.on('close-open-window', (event, action = 'close', window) => {
  const win = eval(window);
  if (!win) return;

  if (action == 'close') {
    win.hide()
  } else {
    win.show()
  }
})

ipcMain.on('reopen-sticky-note', (event, data) => {
  console.log(data)
  const win = BrowserWindow.fromId(data)
  win.show()
})