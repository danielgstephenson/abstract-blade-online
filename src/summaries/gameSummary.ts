import { Feature } from '../features/feature'
import { Game } from '../game'
import { FeatureSummary } from './featureSummary'

export class GameSummary {
  featureSummaries: FeatureSummary[]

  constructor (game: Game) {
    const fixtures = game.getFixtures()
    this.featureSummaries = fixtures.map(fixture => {
      const feature = fixture.getUserData() as Feature
      return new FeatureSummary(feature)
    })
  }
}
