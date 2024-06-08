import { Actor } from './actor'
import { Game } from '../game'
import { Torso } from '../features/torso'
import { Vec2 } from 'planck'
import { clamp, clampVec, normalize } from '../math'
import { Blade } from '../features/blade'

export class Fighter extends Actor {
  static movePower = 0.15
  static maxSpeed = 1
  static swingPower = 0.015
  static maxSpin = 0.8
  position = Vec2(0, 0)
  velocity = Vec2(0, 0)
  move = Vec2(0, 0)
  angle = 0
  spin = 0
  swing = 0
  torso: Torso
  blade: Blade
  team = 0
  spawnSign = 0
  spawnX = 0
  spawnAngle = 0

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
    this.body.setMassData({
      mass: 1,
      center: Vec2(0.1, 0),
      I: 0.1
    })
    this.game.fighters.set(this.id, this)
    this.joinSmallTeam()
    this.respawn()
  }

  joinSmallTeam (): void {
    this.team = this.game.getSmallTeam()
    this.spawnSign = 2 * this.team - 3
    this.spawnX = 20 * this.spawnSign
    this.spawnAngle = -this.spawnSign * Math.PI
  }

  respawn (): void {
    this.body.setPosition(Vec2(this.spawnX, 0))
    this.body.setLinearVelocity(Vec2(0, 0))
    this.body.setAngle(this.spawnAngle)
    this.body.setAngularVelocity(0)
    this.torso.alive = true
    console.log('getPosition', this.body.getPosition())
    console.log('getWorldCenter', this.body.getWorldCenter())
  }

  preStep (): void {
    this.move = normalize(this.move)
    const move = this.move.length() > 0 ? this.move : Vec2.mul(this.velocity, -1)
    const force = Vec2.mul(move, Fighter.movePower)
    this.body.applyForce(force, this.body.getPosition())
    this.swing = Math.sign(this.swing)
    // const swing = this.swing !== 0 ? this.swing : -Math.sign(this.spin)
    // this.body.applyTorque(swing * Fighter.swingPower)
  }

  postStep (): void {
    if (this.removed) {
      this.game.world.destroyBody(this.body)
      this.game.fighters.delete(this.id)
      return
    }
    this.position = this.body.getPosition()
    this.velocity = clampVec(this.body.getLinearVelocity(), Fighter.maxSpeed)
    this.body.setLinearVelocity(this.velocity)
    this.angle = this.body.getAngle()
    this.spin = clamp(-Fighter.maxSpin, Fighter.maxSpin, this.body.getAngularVelocity())
    this.body.setAngularVelocity(this.spin)
    if (!this.torso.alive) this.respawn()
  }

  remove (): void {
    this.game.actors.delete(this.id)
    this.removed = true
  }
}
