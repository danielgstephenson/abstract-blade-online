import { Game } from './game'
import { getIo } from './server'
import { Player } from './player'
import { PlayerSummary } from './summaries/playerSummary'
import { InputSummary } from './summaries/inputSummary'
import { Vec2 } from 'planck'
import { Arena } from './actors/arena'
import { Config } from './config'

const game = new Game()
const config = new Config()
const io = getIo(config)

io.on('connection', socket => {
  console.log('connect:', socket.id)
  socket.emit('connected')
  const player = new Player(game, socket.id)
  player.fighter.body.setPosition(Vec2(-0.85 * Arena.hx, 0))
  socket.on('input', (input: InputSummary) => {
    player.fighter.moveDir.x = input.moveDir.x ?? 0
    player.fighter.moveDir.y = input.moveDir.y ?? 0
    const summary = new PlayerSummary(player)
    socket.emit('summary', summary)
  })
  socket.on('click', () => {
    // console.log('click')
  })
  socket.on('disconnect', () => {
    console.log('disconnect:', socket.id)
    player.remove()
  })
})
