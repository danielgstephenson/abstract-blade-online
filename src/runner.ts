import { Game } from './game'

export class Runner {
  game: Game
  targetTimeStep = 0.02
  time: number

  constructor (game: Game) {
    this.game = game
    this.time = performance.now()
    setInterval(() => this.step(), this.targetTimeStep * 1000)
  }

  step (): void {
    const oldTime = this.time
    this.time = performance.now()
    const timeStep = (this.time - oldTime) / 1000
    this.game.fighters.forEach(fighter => fighter.preStep())
    this.game.world.step(timeStep * this.game.config.timeScale)
    this.game.postStep()
    this.game.fighters.forEach(fighter => fighter.postStep())
  }
}
