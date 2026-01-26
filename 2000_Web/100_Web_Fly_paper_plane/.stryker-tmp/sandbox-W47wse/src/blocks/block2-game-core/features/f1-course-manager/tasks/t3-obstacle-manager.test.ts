// @ts-nocheck
import { describe, it, expect, beforeEach } from 'vitest'
import {
  Obstacle,
  ObstacleManager,
  ObstacleType,
  DEFAULT_OBSTACLE_SIZE,
} from './t3-obstacle-manager'

/**
 * Task 2.1.3: Obstacle Manager Tests
 *
 * Manages obstacles in the course:
 * - Create obstacles with type, position, size
 * - Add/remove obstacles dynamically
 * - Check collision with obstacles
 * - Get obstacles by region (spatial queries)
 */

describe('Task 2.1.3: Obstacle Manager', () => {
  let manager: ObstacleManager

  beforeEach(() => {
    manager = new ObstacleManager()
  })

  describe('Obstacle Creation', () => {
    it('should create obstacle with position and size', () => {
      const obstacle: Obstacle = {
        id: 'obs1',
        type: 'building',
        position: { x: 10, y: 0, z: 50 },
        size: { width: 5, height: 20, depth: 5 },
      }

      expect(obstacle.position).toBeDefined()
      expect(obstacle.size).toBeDefined()
      expect(obstacle.type).toBe('building')
    })

    it('should support different obstacle types', () => {
      expect(DEFAULT_OBSTACLE_SIZE).toBeDefined()
    })
  })

  describe('Obstacle Manager', () => {
    it('should add obstacle to manager', () => {
      const obstacle: Obstacle = {
        id: 'obs1',
        type: 'building',
        position: { x: 10, y: 0, z: 50 },
        size: DEFAULT_OBSTACLE_SIZE,
      }

      manager.addObstacle(obstacle)
      expect(manager.getAllObstacles()).toHaveLength(1)
    })

    it('should get obstacle by id', () => {
      const obstacle: Obstacle = {
        id: 'obs1',
        type: 'building',
        position: { x: 10, y: 0, z: 50 },
        size: DEFAULT_OBSTACLE_SIZE,
      }

      manager.addObstacle(obstacle)
      const retrieved = manager.getObstacle('obs1')
      expect(retrieved?.id).toBe('obs1')
    })

    it('should remove obstacle', () => {
      const obstacle: Obstacle = {
        id: 'obs1',
        type: 'building',
        position: { x: 10, y: 0, z: 50 },
        size: DEFAULT_OBSTACLE_SIZE,
      }

      manager.addObstacle(obstacle)
      manager.removeObstacle('obs1')
      expect(manager.getObstacle('obs1')).toBeUndefined()
    })

    it('should clear all obstacles', () => {
      manager.addObstacle({
        id: 'obs1',
        type: 'building',
        position: { x: 10, y: 0, z: 50 },
        size: DEFAULT_OBSTACLE_SIZE,
      })
      manager.addObstacle({
        id: 'obs2',
        type: 'building',
        position: { x: 20, y: 0, z: 100 },
        size: DEFAULT_OBSTACLE_SIZE,
      })

      manager.clearAll()
      expect(manager.getAllObstacles()).toHaveLength(0)
    })
  })

  describe('Obstacle Collision', () => {
    it('should detect when point is inside obstacle', () => {
      const obstacle: Obstacle = {
        id: 'obs1',
        type: 'building',
        position: { x: 0, y: 10, z: 50 },
        size: { width: 10, height: 20, depth: 10 },
      }

      manager.addObstacle(obstacle)
      const inside = manager.isPointInObstacle({ x: 0, y: 10, z: 50 }, 'obs1')
      expect(inside).toBe(true)
    })

    it('should detect when point is outside obstacle', () => {
      const obstacle: Obstacle = {
        id: 'obs1',
        type: 'building',
        position: { x: 0, y: 10, z: 50 },
        size: { width: 10, height: 20, depth: 10 },
      }

      manager.addObstacle(obstacle)
      const outside = manager.isPointInObstacle({ x: 100, y: 10, z: 50 }, 'obs1')
      expect(outside).toBe(false)
    })

    it('should check collision with any obstacle', () => {
      manager.addObstacle({
        id: 'obs1',
        type: 'building',
        position: { x: 0, y: 10, z: 50 },
        size: { width: 10, height: 20, depth: 10 },
      })
      manager.addObstacle({
        id: 'obs2',
        type: 'building',
        position: { x: 50, y: 10, z: 50 },
        size: { width: 10, height: 20, depth: 10 },
      })

      const hit = manager.checkCollisionWithAny({ x: 0, y: 10, z: 50 })
      expect(hit).not.toBeNull()
      expect(hit?.id).toBe('obs1')
    })

    it('should return null if no collision', () => {
      manager.addObstacle({
        id: 'obs1',
        type: 'building',
        position: { x: 0, y: 10, z: 50 },
        size: { width: 10, height: 20, depth: 10 },
      })

      const hit = manager.checkCollisionWithAny({ x: 200, y: 10, z: 50 })
      expect(hit).toBeNull()
    })
  })

  describe('Spatial Queries', () => {
    it('should get obstacles within radius', () => {
      manager.addObstacle({
        id: 'obs1',
        type: 'building',
        position: { x: 0, y: 0, z: 0 },
        size: DEFAULT_OBSTACLE_SIZE,
      })
      manager.addObstacle({
        id: 'obs2',
        type: 'building',
        position: { x: 100, y: 0, z: 0 },
        size: DEFAULT_OBSTACLE_SIZE,
      })
      manager.addObstacle({
        id: 'obs3',
        type: 'building',
        position: { x: 10, y: 0, z: 0 },
        size: DEFAULT_OBSTACLE_SIZE,
      })

      const nearby = manager.getObstaclesNearPoint({ x: 0, y: 0, z: 0 }, 20)
      expect(nearby.length).toBe(2) // obs1 and obs3
    })

    it('should get obstacles by type', () => {
      manager.addObstacle({
        id: 'obs1',
        type: 'building',
        position: { x: 0, y: 0, z: 0 },
        size: DEFAULT_OBSTACLE_SIZE,
      })
      manager.addObstacle({
        id: 'obs2',
        type: 'ring',
        position: { x: 10, y: 0, z: 0 },
        size: DEFAULT_OBSTACLE_SIZE,
      })
      manager.addObstacle({
        id: 'obs3',
        type: 'building',
        position: { x: 20, y: 0, z: 0 },
        size: DEFAULT_OBSTACLE_SIZE,
      })

      const buildings = manager.getObstaclesByType('building')
      expect(buildings).toHaveLength(2)

      const rings = manager.getObstaclesByType('ring')
      expect(rings).toHaveLength(1)
    })
  })

  describe('Obstacle Count', () => {
    it('should return total obstacle count', () => {
      expect(manager.getObstacleCount()).toBe(0)

      manager.addObstacle({
        id: 'obs1',
        type: 'building',
        position: { x: 0, y: 0, z: 0 },
        size: DEFAULT_OBSTACLE_SIZE,
      })

      expect(manager.getObstacleCount()).toBe(1)
    })
  })
})
