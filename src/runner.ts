import { Game } from './game'

export class Runner {
  game: Game
  stepSize = 0.005

  constructor (game: Game) {
    this.game = game
  }

  step (): void {
    this.game.fighters.forEach(fighter => fighter.preStep())
    this.game.world.step(this.stepSize)
    this.game.postStep()
  }
}
