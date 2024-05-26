import { Vec2 } from 'planck'
import { Input } from '../public/input'
import { normalize } from '../math'

export class InputSummary {
  moveDir: Vec2

  constructor (input: Input) {
    let x = 0
    let y = 0
    if (input.isKeyDown('KeyW') || input.isKeyDown('ArrowUp')) y += 1
    if (input.isKeyDown('KeyS') || input.isKeyDown('ArrowDown')) y -= 1
    if (input.isKeyDown('KeyA') || input.isKeyDown('ArrowLeft')) x -= 1
    if (input.isKeyDown('KeyD') || input.isKeyDown('ArrowRight')) x += 1
    this.moveDir = normalize(Vec2(x, y))
  }
}
