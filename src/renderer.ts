import { Torso } from './features/torso'
import { FighterSummary } from './summaries/fighterSummary'
import { PlayerSummary } from './summaries/playerSummary'
import { Camera } from './public/camera'

export class Renderer {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  camera = new Camera()
  fighterSummaries: FighterSummary[] = []
  id = ''

  constructor () {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.draw()
  }

  readSummary (summary: PlayerSummary): void {
    this.fighterSummaries = summary.game.fighters
    this.id = summary.id
  }

  draw (): void {
    window.requestAnimationFrame(() => this.draw())
    this.setupCanvas()
    this.fighterSummaries.forEach(fighterSummary => {
      this.drawTorso(fighterSummary)
    })
  }

  drawTorso (fighterSummary: FighterSummary): void {
    this.followCamera()
    this.context.fillStyle = 'blue'
    this.context.beginPath()
    this.context.arc(
      fighterSummary.position.x,
      fighterSummary.position.y,
      Torso.radius, 0, 2 * Math.PI
    )
    this.context.fill()
  }

  setupCanvas (): void {
    this.canvas.width = window.visualViewport?.width ?? window.innerWidth
    this.canvas.height = window.visualViewport?.height ?? window.innerHeight
  }

  followCamera (): void {
    this.context.resetTransform()
    this.context.translate(0.5 * this.canvas.width, 0.5 * this.canvas.height)
    const vmin = Math.min(this.canvas.width, this.canvas.height)
    this.context.scale(0.1 * vmin, -0.1 * vmin)
    const cameraScale = Math.exp(0.1 * this.camera.zoom)
    this.context.scale(cameraScale, cameraScale)
    this.context.translate(-this.camera.position.x, -this.camera.position.y)
  }
}
