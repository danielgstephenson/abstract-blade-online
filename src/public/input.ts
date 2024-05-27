import { Renderer } from './renderer'

export class Input {
  keyboard = new Map<string, boolean>()
  renderer: Renderer

  constructor (renderer: Renderer) {
    this.renderer = renderer
    window.onkeydown = (event: KeyboardEvent) => this.onkeydown(event)
    window.onkeyup = (event: KeyboardEvent) => this.onkeyup(event)
    window.onwheel = (event: WheelEvent) => this.onwheel(event)
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
}
