// @ts-nocheck
export class CollisionHandler {
  private collisionCallback: ((id: string) => void) | null = null
  private checkpointCallback: ((id: string) => void) | null = null

  public onCollision(callback: (id: string) => void): void {
    this.collisionCallback = callback
  }

  public onCheckpoint(callback: (id: string) => void): void {
    this.checkpointCallback = callback
  }

  public handleCollision(obstacleId: string): void {
    if (this.collisionCallback) {
      this.collisionCallback(obstacleId)
    }
  }

  public handleCheckpoint(checkpointId: string): void {
    if (this.checkpointCallback) {
      this.checkpointCallback(checkpointId)
    }
  }
}
