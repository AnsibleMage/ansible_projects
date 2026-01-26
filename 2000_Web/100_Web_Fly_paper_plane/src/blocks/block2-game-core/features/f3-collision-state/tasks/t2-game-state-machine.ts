export type GameState = 'menu' | 'playing' | 'paused' | 'finished'

export class GameStateMachine {
  private state: GameState = 'menu'

  public getState(): GameState {
    return this.state
  }

  public start(): void {
    this.state = 'playing'
  }

  public pause(): void {
    if (this.state === 'playing') {
      this.state = 'paused'
    }
  }

  public resume(): void {
    if (this.state === 'paused') {
      this.state = 'playing'
    }
  }

  public finish(): void {
    this.state = 'finished'
  }

  public reset(): void {
    this.state = 'menu'
  }
}
