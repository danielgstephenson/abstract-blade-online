import { Circle } from 'planck'
import { Actor } from './actor'
import { Game } from '../game'
import { Feature } from '../features/feature'

export class Player extends Actor {
  playerId: string
  torso: Feature
  radius = 0.5

  constructor (game: Game, playerId: string) {
    super(game, {
      type: 'dynamic',
      bullet: true,
      linearDamping: 0,
      angularDamping: 0
    })
    this.torso = new Feature(this, {
      shape: new Circle(this.radius),
      density: 1,
      friction: 0,
      restitution: 0
    })
    this.label = 'player'
    this.playerId = playerId
    this.game.players.set(this.playerId, this)
  }

  destroy (): void {
    super.destroy()
    this.game.players.delete(this.playerId)
  }
}
