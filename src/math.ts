import { Vec2 } from 'planck'

export function normalize (vector: Vec2): Vec2 {
  const normalized = vector.clone()
  normalized.normalize()
  return normalized
}
