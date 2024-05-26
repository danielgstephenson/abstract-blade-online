import { CircleShape, EdgeShape, PolygonShape, Vec2 } from 'planck'
import { Feature } from '../features/feature'

export class FeatureSummary {
  position: Vec2
  angle: number

  circle?: {
    center: Vec2
    radius: number
  }

  polygon?: {
    vertices: Vec2[]
  }

  edge?: {
    vertices: Vec2[]
  }

  constructor (feature: Feature) {
    this.position = feature.actor.body.getPosition()
    this.angle = feature.actor.body.getAngle()
    const shape = feature.fixture.getShape()
    if (shape instanceof CircleShape) {
      this.circle = {
        center: shape.getCenter(),
        radius: shape.getRadius()
      }
    } else if (shape instanceof PolygonShape) {
      this.polygon = {
        vertices: shape.m_vertices
      }
    } else if (shape instanceof EdgeShape) {
      this.edge = {
        vertices: [shape.m_vertex1, shape.m_vertex2]
      }
    } else {
      const type: string = shape.getType()
      throw new Error(`Invalid shape ${type}`)
    }
  }
}
