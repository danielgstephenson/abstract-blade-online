import { Game } from './game'
import { Runner } from './runner'
import { getIo } from './server'
import { Player } from './player'
import { PlayerSummary } from './summaries/playerSummary'
import { InputSummary } from './summaries/inputSummary'

const game = new Game()
const runner = new Runner(game)
const updateInterval = 1 / 60

const io = getIo(() => {
  setInterval(update, updateInterval * 1000)
})

io.on('connection', socket => {
  console.log('connect:', socket.id)
  socket.emit('connected')
  const player = new Player(game, socket.id)
  socket.on('input', (input: InputSummary) => {
    player.fighter.moveDir.x = input.moveDir.x ?? 0
    player.fighter.moveDir.y = input.moveDir.y ?? 0
    const summary = new PlayerSummary(player)
    socket.emit('summary', summary)
  })
  socket.on('disconnect', () => {
    console.log('disconnect:', socket.id)
    player.remove()
  })
})

function update (): void {
  runner.step()
}
