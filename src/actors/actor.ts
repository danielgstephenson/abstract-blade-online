import { BodyDef, Body } from 'planck'
import { Game } from '../game'

export class Actor {
  static count = 0
  game: Game
  body: Body
  id: string
  label = ''
  removed = false

  constructor (game: Game, id: string, bodyDef: BodyDef) {
    if (game.actors.has(id)) {
      throw new Error(`Actor id ${id} is already in use.`)
    } else {
      this.game = game
      this.id = id
      this.body = this.game.world.createBody(bodyDef)
      this.body.setUserData(this)
    }
  }

  remove (): void {
    this.removed = true
  }
}
