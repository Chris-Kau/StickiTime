import { app, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import StickyNoteManager from './StickyNoteManager';
let stickyNoteWindow;
let stickyFolderWindow;
let screenSize;
let macMenuBarHeight;

function cleanupStickyFolder(){
  if(stickyFolderWindow){
    console.log("close sticky folder")
    StickyNoteManager.clearFolder();
    stickyFolderWindow.removeAllListeners("close");
    stickyFolderWindow.destroy();
    stickyFolderWindow = null;
  }
}

function LoadStickyNote() {
  function createStickyFolder() {
    if (!stickyFolderWindow) {
      stickyFolderWindow = new BrowserWindow({
        width: Math.floor(screenSize.width / 2),
        height: 70,
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        alwaysOnTop: true,
        scrollbar: false,
        frame: false,
        roundedCorners: false,
        thickFrame: false,
        resizable: true,
        fullscreenable: false,
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      });
      stickyFolderWindow.hide()
      stickyFolderWindow.setIcon(join(__dirname, "../../resources/icon.png"))
      if (process.platform == "darwin") { //hide macOS traffic lights
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

      stickyFolderWindow.on("close",(e)=>{
        e.preventDefault();
      })
      
      StickyNoteManager.folderWindow = stickyFolderWindow;
    }
  }



  ipcMain.handle('open-sticky-note', () => {
    stickyNoteWindow = StickyNoteManager.createNote()

    if (process.platform == "darwin") { //hide macOS traffic lights
      stickyNoteWindow.setWindowButtonVisibility(false);
    }
    stickyFolderWindow.webContents.send('receive-id', stickyNoteWindow.id)
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      stickyNoteWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/stickynote`)
    } else {
      stickyNoteWindow.loadURL(`file://${join(__dirname, '../renderer/index.html')}#/stickynote`)
    }
  })



  ipcMain.on('reopen-sticky-note', (event, id) => {
    const note = StickyNoteManager.notes.get(id);
    if (note) {
      note.window.show();
      StickyNoteManager.restoreNote(id);
    }
  });

  ipcMain.on('update-sticky-name', (event, id, name) => {
    StickyNoteManager.updateNoteName(id, name);
  });

  ipcMain.on('update-sticky-color', (event, id, color) => {
    StickyNoteManager.updateNoteColor(id, color)
  })

  ipcMain.on('minimize-window', (event, isStickyNote) => {
    const window = BrowserWindow.getFocusedWindow();
    if (window && isStickyNote) {
      const note = StickyNoteManager.notes.get(window.id);
      if (note) {
        window.hide();
        note.minimized = true;
        StickyNoteManager.updateFolder();
      }
    }
  });
  app.whenReady().then(() => {
    screenSize = screen.getPrimaryDisplay().size
    macMenuBarHeight = screen.getPrimaryDisplay().workArea.y;
    createStickyFolder()
  })
}

export default LoadStickyNote;
export { cleanupStickyFolder };