import { BodyDef, Body } from 'planck'
import { Game } from '../game'

export class Actor {
  static count = 0
  game: Game
  body: Body
  actorId: number
  destroyed = false
  label = ''

  constructor (game: Game, bodyDef: BodyDef) {
    this.game = game
    this.body = this.game.world.createBody(bodyDef)
    this.body.setUserData(this)
    Actor.count += 1
    this.actorId = Actor.count
    this.game.actors.set(this.actorId, this)
  }

  destroy (): void {
    this.destroyed = true
  }
}
