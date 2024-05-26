import { Box, Vec2 } from 'planck'
import { Actor } from '../actors/actor'
import { Feature } from './feature'

export class Blade extends Feature {
  static length = 4
  static reach = 7.5
  static hx = 3
  static hy = 0.2
  static center = Vec2(this.reach - this.hx, 0)

  constructor (actor: Actor) {
    super(actor, {
      shape: new Box(Blade.hx, Blade.hy, Blade.center),
      density: 0.00001,
      friction: 0,
      restitution: 0
    })
  }
}
