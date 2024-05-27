import { Game } from './game'

export class Runner {
  game: Game
  stepTime = 0.02
  timeScale = 2

  constructor (game: Game) {
    this.game = game
    console.time()
    setInterval(() => this.step(), this.stepTime * 1000)
  }

  step (): void {
    console.timeEnd()
    console.time()
    this.game.fighters.forEach(fighter => fighter.preStep())
    this.game.world.step(this.stepTime * this.timeScale)
    this.game.postStep()
    this.game.fighters.forEach(fighter => fighter.postStep())
  }
}
