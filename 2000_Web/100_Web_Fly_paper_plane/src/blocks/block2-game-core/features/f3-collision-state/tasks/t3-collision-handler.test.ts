import { describe, it, expect, vi } from 'vitest'
import { CollisionHandler } from './t3-collision-handler'

describe('Task 2.3.3: Collision Handler', () => {
  let handler: CollisionHandler

  beforeEach(() => {
    handler = new CollisionHandler()
  })

  it('should trigger callback on collision', () => {
    const callback = vi.fn()
    handler.onCollision(callback)
    handler.handleCollision('obstacle1')
    expect(callback).toHaveBeenCalledWith('obstacle1')
  })

  it('should trigger checkpoint callback', () => {
    const callback = vi.fn()
    handler.onCheckpoint(callback)
    handler.handleCheckpoint('cp1')
    expect(callback).toHaveBeenCalledWith('cp1')
  })
})
