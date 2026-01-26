import { describe, it, expect } from 'vitest'
import { GameController } from './t5-game-controller'
import { createGameStateStore } from './t4-game-state-store'

describe('Task 2.3.5: Game Controller', () => {
  let controller: GameController
  let store: ReturnType<typeof createGameStateStore>

  beforeEach(() => {
    store = createGameStateStore()
    controller = new GameController(store)
  })

  it('should start game', () => {
    controller.startGame()
    expect(store.getState().gameState).toBe('playing')
  })

  it('should finish game', () => {
    controller.startGame()
    controller.finishGame()
    expect(store.getState().gameState).toBe('finished')
  })

  it('should handle collision', () => {
    controller.startGame()
    controller.handleObstacleCollision('obs1')
    expect(store.getState().collisionCount).toBe(1)
  })

  it('should handle checkpoint', () => {
    controller.startGame()
    controller.handleCheckpointPass('cp1')
    expect(store.getState().checkpointsPassed).toBe(1)
  })
})
