import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import {  is } from '@electron-toolkit/utils'
const fetch = require('node-fetch')

let bookmarksWindow;
let addBookmarkWindow;
let screenSize;
function BookmarkHandler(){
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
            resizable: false,
            webPreferences: {
              preload: join(__dirname, '../preload/index.js'),
              sandbox: false
            }
          });
      
          bookmarksWindow.hide()
          bookmarksWindow.setPosition(screenSize.width / 2 - 10, 71)
          bookmarksWindow.on('ready-to-show', () => {
            // bookmarksWindow.show()
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
      
      ipcMain.on('open-addBookmark', () => {
        if(!addBookmarkWindow){
          addBookmarkWindow = new BrowserWindow({
            width: 400,
            height: 250,
            autoHideMenuBar: true,
            titleBarStyle: "hidden",
            alwaysOnTop: true,
            scrollbar: false,
            resizable: false,
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
      
      ipcMain.on('addingBookMark', function(event, data) {
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
    app.whenReady().then(()=>{
        screenSize = screen.getPrimaryDisplay().size
        openBookmark();
  })
}

export default BookmarkHandler