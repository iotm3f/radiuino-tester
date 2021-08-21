const { app, BrowserWindow } = require('electron')

const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 660,
        resizable: false,
        icon: path.join(__dirname, '/src/assets/icons/favicon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'src/js/preload.js'),
            nodeIntegration: true,
            contextIsolation: false
          }
    })

    win.setMenuBarVisibility(false)

    win.loadFile('src/index.html')
}

app.allowRendererProcessReuse = false;

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

