/**
 * Task 2.1.3: Obstacle Manager
 *
 * Manages obstacles placed throughout the course:
 * - Add/remove obstacles with 3D position and size
 * - Collision detection (point-in-box)
 * - Spatial queries (find nearby obstacles)
 * - Filter by obstacle type
 *
 * @example
 * const manager = new ObstacleManager()
 * manager.addObstacle({ id: 'building1', type: 'building', position: {...}, size: {...} })
 * const hit = manager.checkCollisionWithAny(planePosition)
 */

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface ObstacleSize {
  width: number
  height: number
  depth: number
}

export type ObstacleType = 'building' | 'ring' | 'wall' | 'other'

export interface Obstacle {
  id: string
  type: ObstacleType
  position: Vec3
  size: ObstacleSize
}

// Default obstacle size (Explicit)
export const DEFAULT_OBSTACLE_SIZE: ObstacleSize = {
  width: 5,
  height: 20,
  depth: 5,
}

export class ObstacleManager {
  private obstacles: Map<string, Obstacle> = new Map()

  /**
   * Adds an obstacle to the manager
   */
  public addObstacle(obstacle: Obstacle): void {
    this.obstacles.set(obstacle.id, obstacle)
  }

  /**
   * Gets an obstacle by ID
   */
  public getObstacle(id: string): Obstacle | undefined {
    return this.obstacles.get(id)
  }

  /**
   * Removes an obstacle by ID
   */
  public removeObstacle(id: string): void {
    this.obstacles.delete(id)
  }

  /**
   * Clears all obstacles
   */
  public clearAll(): void {
    this.obstacles.clear()
  }

  /**
   * Gets all obstacles
   */
  public getAllObstacles(): Obstacle[] {
    return Array.from(this.obstacles.values())
  }

  /**
   * Gets total obstacle count
   */
  public getObstacleCount(): number {
    return this.obstacles.size
  }

  /**
   * Checks if a point is inside a specific obstacle's bounding box
   */
  public isPointInObstacle(point: Vec3, obstacleId: string): boolean {
    const obstacle = this.obstacles.get(obstacleId)
    if (!obstacle) return false

    return this.isPointInBox(point, obstacle.position, obstacle.size)
  }

  /**
   * Checks collision with any obstacle (returns first hit)
   */
  public checkCollisionWithAny(point: Vec3): Obstacle | null {
    for (const obstacle of this.obstacles.values()) {
      if (this.isPointInBox(point, obstacle.position, obstacle.size)) {
        return obstacle
      }
    }
    return null
  }

  /**
   * Gets obstacles near a point within a radius
   */
  public getObstaclesNearPoint(point: Vec3, radius: number): Obstacle[] {
    const nearby: Obstacle[] = []

    for (const obstacle of this.obstacles.values()) {
      const distance = this.calculateDistance(point, obstacle.position)
      if (distance <= radius) {
        nearby.push(obstacle)
      }
    }

    return nearby
  }

  /**
   * Gets obstacles by type
   */
  public getObstaclesByType(type: ObstacleType): Obstacle[] {
    return this.getAllObstacles().filter((obs) => obs.type === type)
  }

  /**
   * Checks if a point is inside a 3D bounding box
   */
  private isPointInBox(point: Vec3, position: Vec3, size: ObstacleSize): boolean {
    const halfWidth = size.width / 2
    const halfHeight = size.height / 2
    const halfDepth = size.depth / 2

    const inX = point.x >= position.x - halfWidth && point.x <= position.x + halfWidth
    const inY = point.y >= position.y - halfHeight && point.y <= position.y + halfHeight
    const inZ = point.z >= position.z - halfDepth && point.z <= position.z + halfDepth

    return inX && inY && inZ
  }

  /**
   * Calculates Euclidean distance between two points
   */
  private calculateDistance(p1: Vec3, p2: Vec3): number {
    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    const dz = p2.z - p1.z

    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }
}
