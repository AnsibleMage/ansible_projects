import { describe, it, expect } from 'vitest'
import { createGameStateStore } from './t4-game-state-store'

describe('Task 2.3.4: Game State Store', () => {
  let store: ReturnType<typeof createGameStateStore>

  beforeEach(() => {
    store = createGameStateStore()
  })

  it('should initialize in menu state', () => {
    expect(store.getState().gameState).toBe('menu')
  })

  it('should set game state', () => {
    store.getState().setGameState('playing')
    expect(store.getState().gameState).toBe('playing')
  })

  it('should track collisions', () => {
    store.getState().setCollisionCount(5)
    expect(store.getState().collisionCount).toBe(5)
  })

  it('should reset state', () => {
    store.getState().setGameState('finished')
    store.getState().setCollisionCount(3)
    store.getState().reset()
    expect(store.getState().gameState).toBe('menu')
    expect(store.getState().collisionCount).toBe(0)
  })
})
