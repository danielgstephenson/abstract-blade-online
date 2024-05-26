import { Actor } from './actor'
import { Game } from '../game'
import { Torso } from '../features/torso'
import { Vec2 } from 'planck'
import { normalize } from '../math'

export class Fighter extends Actor {
  torso: Torso
  movePower = 5
  moveDir = Vec2(0, 0)

  constructor (game: Game, id: string) {
    super(game, id, {
      type: 'dynamic',
      bullet: true,
      linearDamping: 0,
      angularDamping: 0
    })
    this.torso = new Torso(this)
    this.label = 'fighter'
    this.game.fighters.set(this.id, this)
  }

  preStep (): void {
    const force = Vec2.mul(normalize(this.moveDir), this.movePower)
    this.body.applyForce(force, this.body.getWorldCenter())
  }

  remove (): void {
    super.remove()
    this.game.fighters.delete(this.id)
  }
}
