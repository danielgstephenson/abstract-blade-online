import { Vec2 } from 'planck'
import { Fighter } from './actors/fighter'
import { Game } from './game'
import { choose, dirToFrom, getAngleDiff, vecToAngle, whichMin } from './math'
import { Arena } from './actors/arena'

export class Bot {
  game: Game
  id: string
  fighter: Fighter
  centerPoint = Vec2.zero()
  tactic = 0
  swingSpeed = 1

  constructor (game: Game, id: string) {
    this.game = game
    this.id = id
    this.fighter = new Fighter(game, id)
    this.game.bots.set(id, this)
    this.chooseCenterPoint()
    this.chooseSwingSign()
    this.chooseSwingSpeed()
  }

  preStep (dt: number): void {
    this.updateTactics(dt)
    this.moveToCenter()
    this.aim()
  }

  updateTactics (dt: number): void {
    if (Math.random() < dt) this.chooseCenterPoint()
    if (Math.random() < dt / 5) this.chooseSwingSign()
    if (Math.random() < dt / 5) this.chooseSwingSpeed()
  }

  chooseSwingSpeed (): void {
    this.swingSpeed = 1 + 10 * Math.random()
  }

  chooseSwingSign (): void {
    this.tactic = choose([-1, 0, 0, 0, 1])
  }

  chooseCenterPoint (): void {
    const radius = 0.8 * Arena.criticalRadius
    const angle = 2 * Math.PI * Math.random()
    this.centerPoint = Vec2(radius * Math.cos(angle), radius * Math.sin(angle))
  }

  aim (): void {
    if (this.tactic === 0) {
      this.aimAtNearestEnemy()
      return
    }
    if (this.tactic === 3) {
      return
    }
    this.fighter.swing = this.tactic
  }

  aimAtNearestEnemy (): void {
    const nearestEnemy = this.getNearestEnemy()
    if (nearestEnemy == null) return
    const toEnemyVec = dirToFrom(nearestEnemy.position, this.fighter.position)
    const toEnemyAngle = vecToAngle(toEnemyVec)
    const angleDiff = getAngleDiff(toEnemyAngle, this.fighter.angle)
    const targetSpin = this.swingSpeed * Fighter.maxSpin * angleDiff / Math.PI
    this.fighter.swing = Math.sign(targetSpin - this.fighter.spin)
  }

  moveToCenter (): void {
    const targetVelocity = Vec2.mul(0.5, Vec2.sub(this.centerPoint, this.fighter.position))
    this.fighter.move = dirToFrom(targetVelocity, this.fighter.velocity)
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
