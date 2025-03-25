import { BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
let timerWindow;
function Handler(){
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
}

export default Handler