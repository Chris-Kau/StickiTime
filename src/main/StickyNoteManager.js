import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
class StickyNoteManager{
    constructor(){
        this.notes = new Map();
        this.folderWindow = null;

        ipcMain.handle('getAllNotes', () => {
            return Array.from(this.notes.values()).map(note => ({
                id: note.id,
                props: note.props
            }));
        });
    }

    createNote(initialProps = {}){
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
            webPreferences:{
                preload: join(__dirname, '../preload/index.js'),
                sandbox: false
            }
        });

        const noteId = noteWindow.id
        this.notes.set(noteId, {
            id: noteId,
            window: noteWindow,
            props: initialProps,
            minimized: false
        });
        noteWindow.on('closed', () => {
            this.notes.delete(noteId);
            this.updateFolder();
        });
        this.updateFolder();
        return noteWindow
    }

    updateFolder() {
        if(this.folderWindow) {
            // Only send minimized notes
            const minimizedNotes = Array.from(this.notes.values())
                .filter(note => note.minimized)
                .map(note => ({
                    id: note.id,
                    props: note.props
                }));
            
            this.folderWindow.webContents.send('receive-notes', minimizedNotes);
        }
    }

    restoreNote(id) {
        const note = this.notes.get(id);
        if(note) {
            note.minimized = false;
            this.updateFolder();
        }
    }


}

export default new StickyNoteManager();