/**
 * Task 2.1.2: Checkpoint System
 *
 * Manages checkpoints and gates throughout the course:
 * - Create checkpoints with 3D position and size
 * - Detect when plane passes through checkpoint
 * - Track checkpoint order (sequential progression)
 * - Calculate course completion percentage
 *
 * @example
 * const manager = new CheckpointManager()
 * manager.addCheckpoint({ id: 'cp1', position: {...}, size: {...}, order: 1 })
 * const passed = manager.isPointInCheckpoint(planePosition, 'cp1')
 */
// @ts-nocheck


export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface CheckpointSize {
  width: number
  height: number
  depth: number
}

export type CheckpointType = 'start' | 'checkpoint' | 'finish'

export interface Checkpoint {
  id: string
  type: CheckpointType
  position: Vec3
  size: CheckpointSize
  order: number
  passed: boolean
}

// Default checkpoint size (Explicit)
export const DEFAULT_CHECKPOINT_SIZE: CheckpointSize = {
  width: 30,
  height: 20,
  depth: 2,
}

export class CheckpointManager {
  private checkpoints: Map<string, Checkpoint> = new Map()

  /**
   * Adds a checkpoint to the manager
   */
  public addCheckpoint(checkpoint: Checkpoint): void {
    this.checkpoints.set(checkpoint.id, checkpoint)
  }

  /**
   * Gets a checkpoint by ID
   */
  public getCheckpoint(id: string): Checkpoint | undefined {
    return this.checkpoints.get(id)
  }

  /**
   * Removes a checkpoint by ID
   */
  public removeCheckpoint(id: string): void {
    this.checkpoints.delete(id)
  }

  /**
   * Clears all checkpoints
   */
  public clearAll(): void {
    this.checkpoints.clear()
  }

  /**
   * Gets all checkpoints
   */
  public getAllCheckpoints(): Checkpoint[] {
    return Array.from(this.checkpoints.values())
  }

  /**
   * Gets checkpoints sorted by order
   */
  public getCheckpointsInOrder(): Checkpoint[] {
    return this.getAllCheckpoints().sort((a, b) => a.order - b.order)
  }

  /**
   * Gets all passed checkpoints
   */
  public getPassedCheckpoints(): Checkpoint[] {
    return this.getAllCheckpoints().filter((cp) => cp.passed)
  }

  /**
   * Gets the next unpassed checkpoint in sequence
   */
  public getNextCheckpoint(): Checkpoint | undefined {
    const ordered = this.getCheckpointsInOrder()
    return ordered.find((cp) => !cp.passed)
  }

  /**
   * Marks a checkpoint as passed
   */
  public markAsPassed(id: string): void {
    const checkpoint = this.checkpoints.get(id)
    if (checkpoint) {
      checkpoint.passed = true
    }
  }

  /**
   * Resets all checkpoint pass states
   */
  public resetAllPassed(): void {
    this.checkpoints.forEach((checkpoint) => {
      checkpoint.passed = false
    })
  }

  /**
   * Checks if a point is inside a checkpoint's bounding box
   */
  public isPointInCheckpoint(point: Vec3, checkpointId: string): boolean {
    const checkpoint = this.checkpoints.get(checkpointId)
    if (!checkpoint) return false

    const halfWidth = checkpoint.size.width / 2
    const halfHeight = checkpoint.size.height / 2
    const halfDepth = checkpoint.size.depth / 2

    const inX =
      point.x >= checkpoint.position.x - halfWidth &&
      point.x <= checkpoint.position.x + halfWidth

    const inY =
      point.y >= checkpoint.position.y - halfHeight &&
      point.y <= checkpoint.position.y + halfHeight

    const inZ =
      point.z >= checkpoint.position.z - halfDepth &&
      point.z <= checkpoint.position.z + halfDepth

    return inX && inY && inZ
  }

  /**
   * Checks if a checkpoint can be passed (validates sequential order)
   */
  public canPassCheckpoint(checkpointId: string): boolean {
    const checkpoint = this.checkpoints.get(checkpointId)
    if (!checkpoint) return false

    // Already passed
    if (checkpoint.passed) return false

    // Get all checkpoints with lower order
    const previousCheckpoints = this.getAllCheckpoints().filter(
      (cp) => cp.order < checkpoint.order
    )

    // All previous checkpoints must be passed
    return previousCheckpoints.every((cp) => cp.passed)
  }

  /**
   * Calculates completion percentage (0-100)
   */
  public getProgressPercentage(): number {
    const all = this.getAllCheckpoints()
    if (all.length === 0) return 0

    const passed = this.getPassedCheckpoints().length
    return Math.round((passed / all.length) * 100)
  }
}
