import { Polygon, Vec2 } from 'planck'
import { Actor } from '../actors/actor'
import { Feature } from './feature'

export class Blade extends Feature {
  static hy = 0.17
  static start = 1.5
  static narrow = 6
  static reach = 7

  constructor (actor: Actor) {
    const vertices = [
      Vec2(Blade.start, -Blade.hy),
      Vec2(Blade.narrow, -Blade.hy),
      Vec2(Blade.reach, 0),
      Vec2(Blade.narrow, Blade.hy),
      Vec2(Blade.start, Blade.hy)
    ]
    super(actor, {
      shape: new Polygon(vertices),
      density: 0.00001,
      friction: 0,
      restitution: 0
    })
  }
}
