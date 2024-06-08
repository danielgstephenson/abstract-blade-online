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
import { choose } from './math'
import { Collider } from './collider'
import { Bot } from './bot'

// make swingless

export class Game {
  world = new World()
  actors = new Map<string, Actor>()
  fighters = new Map<string, Fighter>()
  players = new Map<string, Player>()
  bots = new Map<string, Bot>()
  config = new Config()
  runner = new Runner(this)
  summary = new GameSummary(this)
  arena = new Arena(this)
  collider = new Collider(this)

  timeScale = 1
  timeToWin = 40 // 40
  timeToWait = 5 // 5
  waited = 0
  score1 = 0
  score2 = 0
  scoreDiff = 0

  constructor () {
    this.timeScale = this.config.timeScale
    const io = getIo(this.config)
    io.on('connection', socket => {
      console.log('connect:', socket.id)
      socket.emit('connected')
      const player = new Player(this, socket.id)
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

  preStep (): void {
    if (this.players.size === 1 && this.bots.size === 0 && this.config.bot) {
      void new Bot(this, 'bot1')
    }
    if (this.players.size !== 1 && this.bots.size !== 0) {
      const botArray = [...this.bots.values()]
      botArray[0].remove()
    }
  }

  getSmallTeam (): number {
    let count1 = 0
    let count2 = 0
    this.fighters.forEach(fighter => {
      if (fighter.team === 1) count1 += 1
      if (fighter.team === 2) count2 += 1
    })
    if (count1 === count2) return choose([1, 2])
    return count2 > count1 ? 1 : 2
  }
}
