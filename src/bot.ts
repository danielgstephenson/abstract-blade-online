import { Vec2 } from 'planck'
import { Fighter } from './actors/fighter'
import { Game } from './game'
import { angleToDir, choose, clamp, dirToFrom, whichMin } from './math'
import { Arena } from './actors/arena'

export class Bot {
  game: Game
  id: string
  fighter: Fighter
  centerPoint = Vec2.zero()
  tactic = 0

  constructor (game: Game, id: string) {
    this.game = game
    this.id = id
    this.fighter = new Fighter(game, id)
    this.game.bots.set(id, this)
    this.chooseCenterPoint()
    this.chooseTactic()
  }

  preStep (dt: number): void {
    this.updateTactics(dt)
    this.move()
  }

  updateTactics (dt: number): void {
    if (Math.random() < dt) this.chooseCenterPoint()
    if (Math.random() < dt / 5) this.chooseTactic()
  }

  chooseTactic (): void {
    this.tactic = choose([1, 2])
  }

  move (): void {
    const swingMoveDir = this.getSwingMoveDir()
    const centerMoveDir = this.getCenterMoveDir()
    const spinRate = Math.abs(this.fighter.spin) / Fighter.maxSpin
    const weight = clamp(0, 1, this.tactic * spinRate)
    this.fighter.move = Vec2.combine(weight, centerMoveDir, 1 - weight, swingMoveDir)
  }

  getSwingMoveDir (): Vec2 {
    const spinSign = this.fighter.spin === 0 ? choose([-1, 1]) : Math.sign(this.fighter.spin)
    const swingAngle = this.fighter.angle - 0.7 * Math.PI * spinSign
    return angleToDir(swingAngle)
  }

  getCenterMoveDir (): Vec2 {
    const targetVelocity = Vec2.mul(0.5, Vec2.sub(this.centerPoint, this.fighter.position))
    return dirToFrom(targetVelocity, this.fighter.velocity)
  }

  chooseCenterPoint (): void {
    const radius = 0.8 * Arena.criticalRadius
    const angle = 2 * Math.PI * Math.random()
    this.centerPoint = Vec2(radius * Math.cos(angle), radius * Math.sin(angle))
  }

  getNearestEnemy (): Fighter | null {
    const fighters = [...this.game.fighters.values()]
    const enemies = fighters.filter(fighter => fighter.team !== this.fighter.team)
    if (enemies.length === 0) return null
    const distances = enemies.map(enemy => Vec2.distance(enemy.position, this.fighter.position))
    return enemies[whichMin(distances)]
  }

  remove (): void {
    this.fighter.remove()
    this.game.bots.delete(this.id)
  }
}
