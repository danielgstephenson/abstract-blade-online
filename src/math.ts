import { Vec2 } from 'planck'

export function normalize (vector: Vec2): Vec2 {
  const normalized = vector.clone()
  normalized.normalize()
  return normalized
}

export function clamp (a: number, b: number, x: number): number {
  return Math.max(a, Math.min(x, b))
}

export function clampVec (vector: Vec2, maxLength: number): Vec2 {
  const length = vector.length()
  if (length < maxLength) return vector
  const direction = normalize(vector)
  return Vec2.mul(direction, maxLength)
}
