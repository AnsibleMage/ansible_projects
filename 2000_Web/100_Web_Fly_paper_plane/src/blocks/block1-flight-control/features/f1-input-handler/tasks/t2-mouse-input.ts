/**
 * Task 1.1.2: Mouse Input Detection
 *
 * Detects mouse movement and clicks in real-time.
 * Calculates delta movement and tracks click state.
 *
 * @example
 * const handler = new MouseInputHandler()
 * const state = handler.getState() // { deltaX: 0, deltaY: 0, isClicked: false }
 * handler.resetDelta() // Reset accumulated deltas
 * handler.cleanup() // Remove listeners when done
 */

export interface MouseState {
  deltaX: number      // Horizontal movement (accumulated)
  deltaY: number      // Vertical movement (accumulated)
  isClicked: boolean  // Mouse button state
}

const INITIAL_STATE: MouseState = {
  deltaX: 0,
  deltaY: 0,
  isClicked: false,
}

export class MouseInputHandler {
  private state: MouseState
  private handleMouseMove: (e: MouseEvent) => void
  private handleMouseDown: (e: MouseEvent) => void
  private handleMouseUp: (e: MouseEvent) => void

  constructor() {
    this.state = { ...INITIAL_STATE }

    // Bind event handlers to maintain correct 'this' context
    this.handleMouseMove = this.onMouseMove.bind(this)
    this.handleMouseDown = this.onMouseDown.bind(this)
    this.handleMouseUp = this.onMouseUp.bind(this)

    this.registerListeners()
  }

  private registerListeners(): void {
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mousedown', this.handleMouseDown)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  private onMouseMove(e: MouseEvent): void {
    // Accumulate delta movement
    this.state.deltaX += e.movementX
    this.state.deltaY += e.movementY
  }

  private onMouseDown(_e: MouseEvent): void {
    this.state.isClicked = true
  }

  private onMouseUp(_e: MouseEvent): void {
    this.state.isClicked = false
  }

  public getState(): MouseState {
    // Return a copy to prevent external mutation
    return { ...this.state }
  }

  public resetDelta(): void {
    this.state.deltaX = 0
    this.state.deltaY = 0
  }

  public cleanup(): void {
    window.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mousedown', this.handleMouseDown)
    window.removeEventListener('mouseup', this.handleMouseUp)
    this.state = { ...INITIAL_STATE }
  }
}

