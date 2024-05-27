import { Actor } from './actor'
import { Game } from '../game'
import { Torso } from '../features/torso'
import { Vec2 } from 'planck'
import { clamp, clampVec, normalize } from '../math'
import { Blade } from '../features/blade'

export class Fighter extends Actor {
  movePower = 0.2
  maxSpeed = 1
  swingPower = 0.02
  maxSpin = 1
  position = Vec2(0, 0)
  velocity = Vec2(0, 0)
  move = Vec2(0, 0)
  angle = 0
  spin = 0
  swing = 0
  torso: Torso
  blade: Blade

  constructor (game: Game, id: string) {
    super(game, id, {
      type: 'dynamic',
      bullet: true,
      linearDamping: 0,
      angularDamping: 0
    })
    this.torso = new Torso(this)
    this.blade = new Blade(this)
    this.label = 'fighter'
    this.game.fighters.set(this.id, this)
  }

  preStep (): void {
    if (this.move.length() === 0) this.move = Vec2.mul(this.velocity, -1)
    this.move = normalize(this.move)
    const force = Vec2.mul(this.move, this.movePower)
    this.body.applyForce(force, this.body.getWorldCenter())
    if (this.swing === 0) this.swing = -this.spin
    this.swing = Math.sign(this.swing)
    this.body.applyTorque(this.swing * this.swingPower)
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
    this.angle = this.body.getAngle()
    this.spin = clamp(-this.maxSpin, this.maxSpin, this.body.getAngularVelocity())
    this.body.setAngularVelocity(this.spin)
  }

  remove (): void {
    console.log('remove fighter')
    this.game.actors.delete(this.id)
    this.removed = true
  }
}
