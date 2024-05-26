import { Game } from './game'
import { Player } from './actors/player'
import { Runner } from './runner'
import { getIo } from './server'

const game = new Game()
const runner = new Runner(game)
const updateInterval = 1 // 1 / 60

const io = getIo(() => {
  setInterval(update, updateInterval * 1000)
})

io.on('connection', socket => {
  console.log('connect:', socket.id)
  socket.emit('connected')
  const player = new Player(game, socket.id)
  socket.on('clientUpdateServer', msg => {
    socket.emit('gameSummary', game.summary)
  })
  socket.on('disconnect', () => {
    console.log('disconnect:', socket.id)
    player.destroy()
  })
})

function update (): void {
  runner.step()
}
