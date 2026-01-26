/**
 * Task 1.1.1: Keyboard Input Detection
 *
 * Detects WASD and Arrow Keys input in real-time and stores state.
 * Supports simultaneous input and prevents memory leaks.
 *
 * @example
 * const handler = new KeyboardInputHandler()
 * const state = handler.getState() // { forward: false, backward: false, ... }
 * handler.cleanup() // Remove listeners when done
 */

export interface KeyboardState {
  forward: boolean   // W, ArrowUp
  backward: boolean  // S, ArrowDown
  left: boolean      // A, ArrowLeft
  right: boolean     // D, ArrowRight
  boost: boolean     // Space (acceleration)
}

type KeyDirection = keyof KeyboardState

// Key mapping configuration (Explicit, Adaptive)
const KEY_MAP: Record<string, KeyDirection> = {
  w: 'forward',
  arrowup: 'forward',
  s: 'backward',
  arrowdown: 'backward',
  a: 'left',
  arrowleft: 'left',
  d: 'right',
  arrowright: 'right',
  ' ': 'boost',
} as const

const INITIAL_STATE: KeyboardState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  boost: false,
}

export class KeyboardInputHandler {
  private state: KeyboardState
  private handleKeyDown: (e: KeyboardEvent) => void
  private handleKeyUp: (e: KeyboardEvent) => void

  constructor() {
    this.state = { ...INITIAL_STATE }

    // Bind event handlers to maintain correct 'this' context
    this.handleKeyDown = this.onKeyDown.bind(this)
    this.handleKeyUp = this.onKeyUp.bind(this)

    this.registerListeners()
  }

  private registerListeners(): void {
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  private onKeyDown(e: KeyboardEvent): void {
    this.updateState(e.key, true)
  }

  private onKeyUp(e: KeyboardEvent): void {
    this.updateState(e.key, false)
  }

  private updateState(key: string, pressed: boolean): void {
    const normalizedKey = key.toLowerCase()
    const direction = KEY_MAP[normalizedKey]

    if (direction) {
      this.state[direction] = pressed
    }
  }

  public getState(): KeyboardState {
    // Return a copy to prevent external mutation
    return { ...this.state }
  }

  public cleanup(): void {
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
    this.state = { ...INITIAL_STATE }
  }
}

