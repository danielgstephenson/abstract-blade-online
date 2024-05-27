import { World } from 'planck'
import { Fighter } from './actors/fighter'
import { Actor } from './actors/actor'
import { GameSummary } from './summaries/gameSummary'
import { Player } from './player'
import { Arena } from './actors/arena'
import { Runner } from './runner'
import { Config } from './config'

export class Game {
  world = new World()
  actors = new Map<string, Actor>()
  fighters = new Map<string, Fighter>()
  players = new Map<string, Player>()
  runner = new Runner(this)
  summary = new GameSummary(this)
  arena = new Arena(this, 'arena')
  config = new Config()

  postStep (): void {
    this.summary = new GameSummary(this)
  }
}
