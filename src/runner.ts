import { Game } from './game'

export class Runner {
  game: Game
  stepTime = 1 / 60
  timeScale = 0.3

  constructor (game: Game) {
    this.game = game
    setInterval(() => this.step(), this.stepTime)
  }

  step (): void {
    this.game.fighters.forEach(fighter => fighter.preStep())
    this.game.world.step(this.stepTime * this.timeScale)
    this.game.postStep()
    this.game.fighters.forEach(fighter => fighter.postStep())
  }
}
