import { Vec2 } from 'planck'
import { Arena } from '../actors/arena'
import { Blade } from '../features/blade'
import { Torso } from '../features/torso'
import { FighterSummary } from '../summaries/fighterSummary'
import { PlayerSummary } from '../summaries/playerSummary'
import { Camera } from './camera'

export class Renderer {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  camera = new Camera()
  fighterSummaries: FighterSummary[] = []
  id = ''
  bladeVertices = [
    Vec2(Blade.start, -Blade.hy),
    Vec2(Blade.narrow, -Blade.hy),
    Vec2(Blade.reach, 0),
    Vec2(Blade.narrow, Blade.hy),
    Vec2(Blade.start, Blade.hy)
  ]

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
    this.setupCamera()
    this.drawArena()
    this.fighterSummaries.forEach(fighter => {
      this.drawTorso(fighter)
    })
    this.fighterSummaries.forEach(fighter => {
      this.drawBlade(fighter)
    })
  }

  drawBlade (fighter: FighterSummary): void {
    this.setupContext()
    this.context.fillStyle = 'hsl(0 0 50)'
    this.context.translate(fighter.position.x, fighter.position.y)
    this.context.rotate(fighter.angle)
    this.context.beginPath()
    this.bladeVertices.forEach((vertex, i) => {
      if (i === 0) this.context.moveTo(vertex.x, vertex.y)
      else this.context.lineTo(vertex.x, vertex.y)
    })
    this.context.fill()
  }

  drawTorso (fighter: FighterSummary): void {
    this.setupContext()
    this.context.fillStyle = 'blue'
    this.context.beginPath()
    this.context.arc(
      fighter.position.x,
      fighter.position.y,
      Torso.radius, 0, 2 * Math.PI
    )
    this.context.fill()
  }

  drawArena (): void {
    this.setupContext()
    this.context.strokeStyle = 'hsl(0 0 20)'
    this.context.lineWidth = 1
    this.context.fillStyle = 'black'
    this.context.beginPath()
    this.context.rect(-Arena.hx, -Arena.hy, 2 * Arena.hx, 2 * Arena.hy)
    this.context.stroke()
    this.context.beginPath()
    this.context.rect(-Arena.hx, -Arena.hy, 2 * Arena.hx, 2 * Arena.hy)
    this.context.fill()
    this.context.strokeStyle = 'hsl(0 0 5)'
    this.context.lineWidth = 0.1
    this.context.beginPath()
    const startLine = -0.7 * Arena.hx
    this.context.moveTo(-startLine, 0)
    this.context.lineTo(startLine, 0)
    this.context.moveTo(-startLine, Arena.hy)
    this.context.lineTo(-startLine, -Arena.hy)
    this.context.moveTo(0, Arena.hy)
    this.context.lineTo(0, -Arena.hy)
    this.context.moveTo(startLine, Arena.hy)
    this.context.lineTo(startLine, -Arena.hy)
    this.context.stroke()
    this.context.beginPath()
    this.context.arc(0, 0, 1 * Arena.hy, 0, 2 * Math.PI)
    this.context.stroke()
    this.context.beginPath()
    this.context.arc(0, 0, 0.5 * Arena.hy, 0, 2 * Math.PI)
    this.context.stroke()
    this.context.fillStyle = 'hsl(240 100 50 / 0.25)'
    this.context.beginPath()
    this.context.arc(0, 0, 0.05 * Arena.hy, 0, 2 * Math.PI)
    this.context.fill()
  }

  setupCanvas (): void {
    this.canvas.width = window.visualViewport?.width ?? window.innerWidth
    this.canvas.height = window.visualViewport?.height ?? window.innerHeight
  }

  setupCamera (): void {
    this.fighterSummaries.forEach(fighter => {
      if (fighter.id === this.id) {
        this.camera.position = fighter.position
      }
    })
  }

  setupContext (): void {
    this.context.resetTransform()
    this.context.translate(0.5 * this.canvas.width, 0.5 * this.canvas.height)
    const vmin = Math.min(this.canvas.width, this.canvas.height)
    this.context.scale(0.1 * vmin, -0.1 * vmin)
    const cameraScale = Math.exp(0.1 * this.camera.zoom - 1.2)
    this.context.scale(cameraScale, cameraScale)
    this.context.translate(-this.camera.position.x, -this.camera.position.y)
  }
}
