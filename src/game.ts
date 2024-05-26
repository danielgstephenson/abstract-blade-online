import { World } from 'planck'
import { Fighter } from './actors/fighter'
import { Actor } from './actors/actor'
import { GameSummary } from './summaries/gameSummary'
import { Player } from './player'
import { Arena } from './actors/arena'

export class Game {
  world = new World()
  actors = new Map<string, Actor>()
  fighters = new Map<string, Fighter>()
  players = new Map<string, Player>()
  arena: Arena
  summary: GameSummary

  constructor () {
    this.arena = new Arena(this, 'arena')
    this.summary = new GameSummary(this)
  }

  postStep (): void {
    this.summary = new GameSummary(this)
  }
}
