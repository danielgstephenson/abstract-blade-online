import { Vec2 } from 'planck'
import { Renderer } from './renderer'

export class Input {
  keyboard = new Map<string, boolean>()
  mousePosition = Vec2(0, 0)
  mouseButtons = new Map<number, boolean>()
  renderer: Renderer

  constructor (renderer: Renderer) {
    this.renderer = renderer
    window.onkeydown = (event: KeyboardEvent) => this.onkeydown(event)
    window.onkeyup = (event: KeyboardEvent) => this.onkeyup(event)
    window.onwheel = (event: WheelEvent) => this.onwheel(event)
    window.onmousemove = (event: MouseEvent) => this.onmousemove(event)
    window.onmousedown = (event: MouseEvent) => this.onmousedown(event)
    window.onmouseup = (event: MouseEvent) => this.onmouseup(event)
  }

  onkeydown (event: KeyboardEvent): void {
    this.keyboard.set(event.code, true)
  }

  onkeyup (event: KeyboardEvent): void {
    this.keyboard.set(event.code, false)
  }

  isKeyDown (key: string): boolean {
    return this.keyboard.get(key) ?? false
  }

  onwheel (event: WheelEvent): void {
    this.renderer.camera.adjustZoom(-0.01 * event.deltaY)
    console.log('zoom', this.renderer.camera.zoom)
  }

  onmousemove (event: MouseEvent): void {
    this.mousePosition.x = event.clientX - 0.5 * window.innerWidth
    this.mousePosition.y = 0.5 * window.innerHeight - event.clientY
  }

  onmousedown (event: MouseEvent): void {
    this.mouseButtons.set(event.button, true)
  }

  onmouseup (event: MouseEvent): void {
    this.mouseButtons.set(event.button, false)
  }

  isMouseButtonDown (button: number): boolean {
    return this.mouseButtons.get(button) ?? false
  }
}
