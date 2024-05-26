import { getIo } from './server'

const updateInterval = 1 / 60

const io = getIo(() => {
  setInterval(update, updateInterval * 1000)
})

io.on('connection', socket => {
  console.log('connection:', socket.id)
})

function update (): void {
  //
}
