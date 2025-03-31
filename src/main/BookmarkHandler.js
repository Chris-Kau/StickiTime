import { app, shell, BrowserWindow, ipcMain, screen } from 'electron';
import { join } from 'path';
import {  is } from '@electron-toolkit/utils';
import BookmarkManager from './BookMarkManager';
const fetch = require('node-fetch');

let bookmarksWindow;
let addBookmarkWindow;
let screenSize;
let macMenuBarHeight;
function BookmarkHandler(){
    function openBookmark() {
        if(!bookmarksWindow){
          bookmarksWindow = new BrowserWindow({
            width: Math.floor(screenSize.width / 2),
            height: 70, 
            autoHideMenuBar: true,
            titleBarStyle: "hidden",
            alwaysOnTop: true,
            scrollbar: false,
            frame: false,
            thickFrame: false,
            resizable: true,
            fullscreenable: false,
            roundedCorners: false,
            webPreferences: {
              preload: join(__dirname, '../preload/index.js'),
              sandbox: false
            }
          });
      
          bookmarksWindow.hide()
          if(process.platform == "darwin"){//checks to see if user is on mac :D
            bookmarksWindow.setPosition(Math.floor(screenSize.width / 2 - screenSize.width / 4), (process.platform == "darwin" ? (71 + macMenuBarHeight) : 71))
            bookmarksWindow.setWindowButtonVisibility(false);
          } else{
            bookmarksWindow.setPosition(Math.floor(screenSize.width / 2 - screenSize.width / 4), 71)
          }

          if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            bookmarksWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/bookmarks`)
          } else {
            bookmarksWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}#/bookmarks`)
          }
          BookmarkManager.bookmarksFolder = bookmarksWindow;
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
            resizable: true,
            roundedCorners: false,
            frame: false,
            thickFrame: false,
            webPreferences: {
              preload: join(__dirname, '../preload/index.js'),
              sandbox: false
            }
          });
          if(process.platform == "darwin"){
            bookmarksWindow.setWindowButtonVisibility(false);
          }
          addBookmarkWindow.setPosition(Math.floor(screenSize.width/2 - screenSize.width/4), Math.floor(screenSize.height/2 - screenSize.height / 4))
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
        BookmarkManager.CreateBookmark(data.name, data.hyperlink)
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

      ipcMain.on('delete-bookmark', (event, id) => {
        BookmarkManager.DeleteBookmark(id);
    });
    app.whenReady().then(()=>{
        screenSize = screen.getPrimaryDisplay().size
        macMenuBarHeight = screen.getPrimaryDisplay().workArea.y;
        openBookmark();
  })
}

export default BookmarkHandler