import { Vec2 } from 'planck'
import { Fighter } from '../actors/fighter'

export class FighterSummary {
  position: Vec2
  angle: number
  id: string

  constructor (fighter: Fighter) {
    this.position = fighter.body.getPosition()
    this.angle = fighter.body.getAngle()
    this.id = fighter.id
  }
}
