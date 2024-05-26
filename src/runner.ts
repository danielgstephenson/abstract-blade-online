import { Game } from './game'
import { GameSummary } from './summaries/gameSummary'

export class Runner {
  game: Game
  stepSize = 0.005

  constructor (game: Game) {
    this.game = game
  }

  step (): void {
    this.game.world.step(this.stepSize)
    this.game.summary = new GameSummary(this.game)
  }
}
