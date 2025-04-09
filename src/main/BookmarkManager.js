import { ipcMain } from 'electron';
const crypto = require('crypto');

class BookmarkManager {
    constructor() {
        this.bookmarks = new Map();
        this.bookmarksFolder = null;
        ipcMain.handle('getAllBookmarks', () => {
            return Array.from(this.bookmarks.values());
        });
    }

    CreateBookmark(name, hyperlink) {
        const generatedID = crypto.randomUUID();
        this.bookmarks.set(generatedID, { id: generatedID, name, hyperlink });
        this.UpdateFolder();
    }

    DeleteBookmark(id) {
        this.bookmarks.delete(id);
        this.UpdateFolder();
    }

    UpdateFolder() {
        if (this.bookmarksFolder) {
            const bk = Array.from(this.bookmarks.values());
            this.bookmarksFolder.webContents.send('receive-bookmarks', bk);
        }
    }
}

export default new BookmarkManager();