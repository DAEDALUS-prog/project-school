const { app, BrowserWindow, Menu } = require('electron')
const { join } = require('path')

let mainWindow = null

const dev = process.argv.indexOf('--dev') != -1

if (process.platform == 'linux') {
  app.disableHardwareAcceleration()
  app.commandLine.appendSwitch("disable-software-rasterizer")
}

async function initialize() {
  makeSingleInstance()

  async function createWindow() {
    Menu.setApplicationMenu(new Menu())

    const windowOptions = {
      width: 1000,
      minWidth: 880,
      height: 720,
      minHeight: 680,
      icon: join(__dirname, '/faficon.ico')
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadFile('index.html')

    if (dev)
      mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    app.quit()
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

function makeSingleInstance() {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

initialize().catch(console.log)