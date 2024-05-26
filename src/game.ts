import { World, Body, Fixture } from 'planck'
import { Player } from './actors/player'
import { Actor } from './actors/actor'
import { GameSummary } from './summaries/gameSummary'

export class Game {
  world = new World()
  actors = new Map<number, Actor>()
  players = new Map<string, Player>()
  summary = new GameSummary(this)

  getBodies (): Body[] {
    const bodies = []
    for (
      let body = this.world.getBodyList();
      body != null;
      body = body.getNext()
    ) {
      bodies.push(body)
    }
    return bodies
  }

  getFixtures (): Fixture[] {
    const fixtures: Fixture[] = []
    const bodies = this.getBodies()
    bodies.forEach(body => {
      for (let fixture = body.getFixtureList(); fixture != null; fixture = fixture.getNext()) {
        fixtures.push(fixture)
      }
    })
    return fixtures
  }
}
