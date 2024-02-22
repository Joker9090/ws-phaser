const { app, BrowserWindow } = require('electron')
const next = require('next')
const path = require('path')
const { createServer } = require('http')
const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below

const nextApp = next({ 
  dev: false, 
  hostname, 
  port,
  dir: path.join( __dirname, './'),
})
const handle = nextApp.getRequestHandler()
function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    show: false
    // width: 800,
    // height: 600,
  })
  win.loadURL(`http://localhost:3000`)
  // win.webContents.openDevTools()
}



app.whenReady().then(() => {


  nextApp.prepare().then(() => {
    createWindow()
    createServer(async (req, res) => {
      try {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl

        if (pathname === '/') {
          await nextApp.render(req, res, '/', query)
        } else {
          await handle(req, res, parsedUrl)
        }

      } catch (err) {
        console.error('Error occurred handling', req.url, err)
        res.statusCode = 500
        res.end('internal server error')
      }
    })
      .once('error', (err) => {
        console.error(err)
        process.exit(1)
      })
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`)
      })
  })

  // nextApp.prepare().then(() => {
  //   createWindow()
  //   nextApp.
  //     app.on('activate', function () {
  //       if (BrowserWindow.getAllWindows().length === 0) createWindow()
  //     })
  // })
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})