import { Circle } from 'planck'
import { Actor } from '../actors/actor'
import { Feature } from './feature'

export class Torso extends Feature {
  static radius = 0.5

  constructor (actor: Actor) {
    super(actor, {
      shape: new Circle(Torso.radius),
      density: 1,
      friction: 0,
      restitution: 0
    })
  }
}
