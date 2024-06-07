import { Vec2 } from 'planck'
import { Input } from '../public/input'
import { normalize, vecToAngle } from '../math'

export class InputSummary {
  move: Vec2
  swing = 0
  mouseAngle = 0
  mouseDown = false

  constructor (input: Input) {
    let x = 0
    let y = 0
    if (input.isKeyDown('KeyW') || input.isKeyDown('ArrowUp')) y += 1
    if (input.isKeyDown('KeyS') || input.isKeyDown('ArrowDown')) y -= 1
    if (input.isKeyDown('KeyA') || input.isKeyDown('ArrowLeft')) x -= 1
    if (input.isKeyDown('KeyD') || input.isKeyDown('ArrowRight')) x += 1
    this.move = normalize(Vec2(x, y))
    if (input.isKeyDown('KeyJ')) this.swing += 1
    if (input.isKeyDown('KeyK')) this.swing -= 1
    this.mouseDown = input.isMouseButtonDown(0)
    if (input.mousePosition.length() > 0) {
      this.mouseAngle = vecToAngle(input.mousePosition)
    }
  }
}
