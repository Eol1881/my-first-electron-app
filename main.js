const { app, BrowserWindow, ipcMain} = require('electron');
const Store = require('electron-store');
const path = require('path')

const store = new Store();

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    icon: path.join(__dirname, 'icon.ico'),
    width: 460,
    height: 180,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    alwaysOnTop: true,
    minHeight: 190
  })

  // Load the index.html file.
  win.loadFile('index.html');

  // Load background color from electron store
  const backgroundColor = store.get('backgroundColor', '#ffffff');
  win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(`document.body.style.backgroundColor = '${backgroundColor}';`);
    win.webContents.executeJavaScript(`document.querySelector('.color-picker').value = '${backgroundColor}';`);
  })
}

// Get background color handler
ipcMain.handle('getBackgroundColor', async () => {
  return store.get('backgroundColor', '#ffffff');
})

// Set background color handler
ipcMain.handle('setBackgroundColor', async (event, color) => {
  store.set('backgroundColor', color);
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

// TODO: convert callbacks to async/await
