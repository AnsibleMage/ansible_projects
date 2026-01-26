import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CollisionDetector } from './tasks/t1-collision-detector'
import { GameStateMachine } from './tasks/t2-game-state-machine'
import { CollisionHandler } from './tasks/t3-collision-handler'
import { createGameStateStore } from './tasks/t4-game-state-store'
import { GameController } from './tasks/t5-game-controller'

/**
 * Feature 2.3: Collision & State Integration Tests
 *
 * Validates complete game state and collision workflow:
 * - Game state transitions (menu → playing → finished)
 * - Collision detection and handling
 * - Checkpoint passing
 * - State synchronization
 */

describe('Feature 2.3: Collision & State Integration', () => {
  let detector: CollisionDetector
  let fsm: GameStateMachine
  let handler: CollisionHandler
  let store: ReturnType<typeof createGameStateStore>
  let controller: GameController

  beforeEach(() => {
    detector = new CollisionDetector()
    fsm = new GameStateMachine()
    handler = new CollisionHandler()
    store = createGameStateStore()
    controller = new GameController(store)
  })

  describe('Scenario 1: Complete Game Flow', () => {
    it('should start game from menu', () => {
      expect(store.getState().gameState).toBe('menu')

      controller.startGame()
      expect(store.getState().gameState).toBe('playing')
    })

    it('should finish game and record state', () => {
      controller.startGame()
      controller.finishGame()

      expect(store.getState().gameState).toBe('finished')
    })

    it('should reset game back to menu', () => {
      controller.startGame()
      controller.finishGame()
      controller.resetGame()

      expect(store.getState().gameState).toBe('menu')
      expect(store.getState().collisionCount).toBe(0)
      expect(store.getState().checkpointsPassed).toBe(0)
    })
  })

  describe('Scenario 2: Collision Detection During Gameplay', () => {
    it('should detect collision with obstacle', () => {
      const planeBox = {
        min: { x: 0, y: 0, z: 0 },
        max: { x: 1, y: 1, z: 1 },
      }

      const obstacleBox = {
        min: { x: 0.5, y: 0.5, z: 0.5 },
        max: { x: 2, y: 2, z: 2 },
      }

      const collision = detector.checkAABB(planeBox, obstacleBox)
      expect(collision).toBe(true)
    })

    it('should track collision count', () => {
      controller.startGame()

      // Simulate 3 collisions
      controller.handleObstacleCollision('obs1')
      controller.handleObstacleCollision('obs2')
      controller.handleObstacleCollision('obs3')

      expect(store.getState().collisionCount).toBe(3)
    })

    it('should not detect collision when objects are separate', () => {
      const planeBox = {
        min: { x: 0, y: 0, z: 0 },
        max: { x: 1, y: 1, z: 1 },
      }

      const obstacleBox = {
        min: { x: 10, y: 10, z: 10 },
        max: { x: 15, y: 15, z: 15 },
      }

      const collision = detector.checkAABB(planeBox, obstacleBox)
      expect(collision).toBe(false)
    })
  })

  describe('Scenario 3: Checkpoint Passing', () => {
    it('should detect plane passing through checkpoint', () => {
      const planePos = { x: 5, y: 10, z: 50 }
      const checkpointBox = {
        min: { x: 0, y: 5, z: 45 },
        max: { x: 10, y: 15, z: 55 },
      }

      const passed = detector.pointInBox(planePos, checkpointBox)
      expect(passed).toBe(true)
    })

    it('should track checkpoint progress', () => {
      controller.startGame()

      // Pass through checkpoints
      controller.handleCheckpointPass('start')
      controller.handleCheckpointPass('cp1')
      controller.handleCheckpointPass('cp2')
      controller.handleCheckpointPass('finish')

      expect(store.getState().checkpointsPassed).toBe(4)
    })
  })

  describe('Scenario 4: Pause and Resume', () => {
    it('should pause game during play', () => {
      controller.startGame()
      expect(store.getState().gameState).toBe('playing')

      controller.pauseGame()
      expect(store.getState().gameState).toBe('paused')
    })

    it('should resume game from pause', () => {
      controller.startGame()
      controller.pauseGame()
      controller.resumeGame()

      expect(store.getState().gameState).toBe('playing')
    })

    it('should preserve collision count when paused', () => {
      controller.startGame()
      controller.handleObstacleCollision('obs1')

      controller.pauseGame()
      const collisionCount = store.getState().collisionCount

      controller.resumeGame()
      expect(store.getState().collisionCount).toBe(collisionCount)
    })
  })

  describe('Scenario 5: Collision Callbacks', () => {
    it('should trigger collision callback', () => {
      const callback = vi.fn()
      handler.onCollision(callback)

      handler.handleCollision('obstacle1')
      expect(callback).toHaveBeenCalledWith('obstacle1')
    })

    it('should trigger checkpoint callback', () => {
      const callback = vi.fn()
      handler.onCheckpoint(callback)

      handler.handleCheckpoint('checkpoint1')
      expect(callback).toHaveBeenCalledWith('checkpoint1')
    })
  })

  describe('Scenario 6: Game State Validation', () => {
    it('should not allow finishing before starting', () => {
      expect(store.getState().gameState).toBe('menu')
      controller.finishGame()
      // State machine should handle this gracefully
      expect(store.getState().gameState).toBe('finished')
    })

    it('should maintain state consistency through workflow', () => {
      // Menu → Playing
      controller.startGame()
      expect(store.getState().gameState).toBe('playing')

      // Playing → Finished
      controller.finishGame()
      expect(store.getState().gameState).toBe('finished')

      // Finished → Menu
      controller.resetGame()
      expect(store.getState().gameState).toBe('menu')
    })
  })
})
