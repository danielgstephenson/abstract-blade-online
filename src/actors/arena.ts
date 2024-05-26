import { Actor } from './actor'
import { Game } from '../game'
import { Wall } from '../features/wall'
import { Vec2 } from 'planck'

export class Arena extends Actor {
  static width = 2
  static height = 2
  northWall: Wall
  southWall: Wall
  eastWall: Wall
  westWall: Wall

  constructor (game: Game, id: string) {
    super(game, id, {
      type: 'static',
      bullet: true,
      linearDamping: 0,
      angularDamping: 0
    })
    this.label = 'arena'
    const northEast = Vec2(Arena.height, Arena.width)
    const northWest = Vec2(Arena.height, -Arena.width)
    const southEast = Vec2(-Arena.height, Arena.width)
    const southWest = Vec2(-Arena.height, -Arena.width)
    this.northWall = new Wall(this, [northWest, northEast])
    this.southWall = new Wall(this, [southEast, southWest])
    this.eastWall = new Wall(this, [northEast, southEast])
    this.westWall = new Wall(this, [northWest, southWest])
  }
}
