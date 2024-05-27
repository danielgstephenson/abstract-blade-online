import { Actor } from './actor'
import { Game } from '../game'
import { Torso } from '../features/torso'
import { Vec2 } from 'planck'
import { clampVec, normalize } from '../math'

export class Fighter extends Actor {
  torso: Torso
  movePower = 0.1
  maxSpeed = 1
  position = Vec2(0, 0)
  velocity = Vec2(0, 0)
  moveDir = Vec2(0, 0)
  angle = 0
  spin = 0
  swing = 0

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
    if (this.moveDir.length() === 0) this.moveDir = Vec2.mul(this.velocity, -1)
    this.moveDir = normalize(this.moveDir)
    const force = Vec2.mul(this.moveDir, this.movePower)
    this.body.applyForce(force, this.body.getWorldCenter())
  }

  postStep (): void {
    if (this.removed) {
      console.log('remove body')
      this.game.world.destroyBody(this.body)
      this.game.fighters.delete(this.id)
      return
    }
    this.position = this.body.getPosition()
    this.velocity = clampVec(this.body.getLinearVelocity(), this.maxSpeed)
    this.body.setLinearVelocity(this.velocity)
  }

  remove (): void {
    console.log('remove fighter')
    this.game.actors.delete(this.id)
    this.removed = true
  }
}
