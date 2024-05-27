import { Vec2, World } from 'planck'
import { Fighter } from './actors/fighter'
import { Actor } from './actors/actor'
import { GameSummary } from './summaries/gameSummary'
import { Player } from './player'
import { Arena } from './actors/arena'
import { Runner } from './runner'
import { Config } from './config'
import { getIo } from './server'
import { InputSummary } from './summaries/inputSummary'
import { PlayerSummary } from './summaries/playerSummary'

export class Game {
  world = new World()
  actors = new Map<string, Actor>()
  fighters = new Map<string, Fighter>()
  players = new Map<string, Player>()
  runner = new Runner(this)
  summary = new GameSummary(this)
  arena = new Arena(this, 'arena')
  config = new Config()

  constructor () {
    const io = getIo(this.config)
    io.on('connection', socket => {
      console.log('connect:', socket.id)
      socket.emit('connected')
      const player = new Player(this, socket.id)
      player.fighter.body.setPosition(Vec2(-0.85 * Arena.hx, 0))
      socket.on('input', (input: InputSummary) => {
        const move = input.move ?? Vec2(0, 0)
        player.fighter.move.x = move.x ?? 0
        player.fighter.move.y = move.y ?? 0
        player.fighter.swing = input.swing ?? 0
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
  }

  postStep (): void {
    this.summary = new GameSummary(this)
  }
}
