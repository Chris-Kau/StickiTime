import { BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
class StickyNoteManager {
    constructor() {
        this.notes = new Map();
        this.folderWindow = null;

        ipcMain.handle('getAllNotes', () => {
            return Array.from(this.notes.values()).map(note => ({
                id: note.id,
            }));
        });
        ipcMain.handle('get-window-id', (event) => {
            const win = BrowserWindow.fromWebContents(event.sender);
            return win.id;
        });

    }

    createNote() {
        const noteWindow = new BrowserWindow({
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
            webPreferences: {
                preload: join(__dirname, '../preload/index.js'),
                sandbox: false
            }
        });

        const noteId = noteWindow.id
        this.notes.set(noteId, {
            id: noteId,
            window: noteWindow,
            minimized: false,
            name: "",
            color: "#DDC7B9",
        });
        noteWindow.on('closed', () => {
            this.notes.delete(noteId);
            this.updateFolder();
        });
        this.updateFolder();
        return noteWindow
    }

    updateFolder() {
        if (this.folderWindow) {
            const minimizedNotes = Array.from(this.notes.values())
                .filter(note => note.minimized)
                .map(note => ({
                    id: note.id,
                    name: note.name,
                    color: note.color,
                }));

            this.folderWindow.webContents.send('receive-notes', minimizedNotes);
        }
    }

    restoreNote(id) {
        const note = this.notes.get(id);
        if (note) {
            note.minimized = false;
            this.updateFolder();
        }
    }

    updateNoteName(id, newName) { 
        const note = this.notes.get(id);
        if (note) {
            note.name = newName;
            this.updateFolder();
            note.window.webContents.send('update-name', newName);
        }
    }

    updateNoteColor(id, newColor) {
        const note = this.notes.get(id);
        if (note) {
            note.color = newColor;
            this.updateFolder();
        }
    }


}

export default new StickyNoteManager();