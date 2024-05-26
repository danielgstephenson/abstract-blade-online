import * as express from 'express'
import * as http from 'http'
import * as https from 'https'
import * as fs from 'fs-extra'
import * as path from 'path'
import { Server } from 'socket.io'

const config = {
  port: 3000,
  secure: false
}
const dirname = path.dirname(__filename)
const configPath = path.join(dirname, '../config.json')
const fileExists: boolean = fs.existsSync(configPath)
if (fileExists) {
  const json = fs.readJSONSync(configPath)
  if (typeof json.port === 'number') config.port = json.port
  if (typeof json.secure === 'boolean') config.secure = json.secure
}
console.log(config)

const app = express()
const staticPath = path.join(dirname, 'public')
const staticMiddleware = express.static(staticPath)
app.use(staticMiddleware)
const clientHtmlPath = path.join(dirname, 'public', 'client.html')
app.get('/', function (req, res) { res.sendFile(clientHtmlPath) })
const socketIoPath = path.join(dirname, 'node_modules', 'socket.io', 'client-dist')
app.get('/socketIo/:fileName', function (req, res) {
  const filePath = path.join(socketIoPath, req.params.fileName)
  res.sendFile(filePath)
})

function getServer (): https.Server | http.Server {
  if (config.secure) {
    const key = fs.readFileSync('./sis-key.pem')
    const cert = fs.readFileSync('./sis-cert.pem')
    const credentials = { key, cert }
    return new https.Server(credentials, app)
  } else {
    return new http.Server(app)
  }
}

function getIo (onListen: (() => void) | null): Server {
  const server = getServer()
  const io = new Server(server)
  io.path(staticPath)
  server.listen(config.port, () => {
    console.log(`Listening on :${config.port}`)
    if (onListen != null) onListen()
  })
  return io
}

export { getIo }
