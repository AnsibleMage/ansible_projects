// @ts-nocheck
import { GameStateMachine } from './t2-game-state-machine'
import { CollisionHandler } from './t3-collision-handler'
import type { createGameStateStore } from './t4-game-state-store'

export class GameController {
  private fsm: GameStateMachine
  private collisionHandler: CollisionHandler
  private store: ReturnType<typeof createGameStateStore>

  constructor(store: ReturnType<typeof createGameStateStore>) {
    this.fsm = new GameStateMachine()
    this.collisionHandler = new CollisionHandler()
    this.store = store

    this.collisionHandler.onCollision((id) => {
      this.store.getState().incrementCollisionCount()
    })

    this.collisionHandler.onCheckpoint((id) => {
      this.store.getState().incrementCheckpointsPassed()
    })
  }

  public startGame(): void {
    this.fsm.start()
    this.store.getState().setGameState('playing')
  }

  public pauseGame(): void {
    this.fsm.pause()
    this.store.getState().setGameState('paused')
  }

  public resumeGame(): void {
    this.fsm.resume()
    this.store.getState().setGameState('playing')
  }

  public finishGame(): void {
    this.fsm.finish()
    this.store.getState().setGameState('finished')
  }

  public resetGame(): void {
    this.fsm.reset()
    this.store.getState().reset()
  }

  public handleObstacleCollision(obstacleId: string): void {
    this.collisionHandler.handleCollision(obstacleId)
  }

  public handleCheckpointPass(checkpointId: string): void {
    this.collisionHandler.handleCheckpoint(checkpointId)
  }
}
