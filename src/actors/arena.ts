import { Actor } from './actor'
import { Game } from '../game'
import { Wall } from '../features/wall'
import { Vec2 } from 'planck'

export class Arena extends Actor {
  static hx = 28
  static hy = 14
  static safeX = 17
  static scoreRadius = 3
  static indicatorRadius = 8
  static outerRadius = 13
  northWall: Wall
  southWall: Wall
  eastWall: Wall
  westWall: Wall

  constructor (game: Game) {
    super(game, 'arena', {
      type: 'static',
      bullet: true,
      linearDamping: 0,
      angularDamping: 0
    })
    this.label = 'arena'
    const northEast = Vec2(Arena.hx, Arena.hy)
    const northWest = Vec2(-Arena.hx, Arena.hy)
    const southEast = Vec2(Arena.hx, -Arena.hy)
    const southWest = Vec2(-Arena.hx, -Arena.hy)
    this.northWall = new Wall(this, [northEast, northWest])
    this.southWall = new Wall(this, [southEast, southWest])
    this.eastWall = new Wall(this, [northEast, southEast])
    this.westWall = new Wall(this, [northWest, southWest])
  }
}
