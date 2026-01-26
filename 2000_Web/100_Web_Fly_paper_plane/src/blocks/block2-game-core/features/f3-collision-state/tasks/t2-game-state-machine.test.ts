import { describe, it, expect } from 'vitest'
import { GameStateMachine, GameState } from './t2-game-state-machine'

describe('Task 2.3.2: Game State Machine', () => {
  let fsm: GameStateMachine

  beforeEach(() => {
    fsm = new GameStateMachine()
  })

  it('should start in menu state', () => {
    expect(fsm.getState()).toBe('menu')
  })

  it('should transition to playing', () => {
    fsm.start()
    expect(fsm.getState()).toBe('playing')
  })

  it('should transition to finished', () => {
    fsm.start()
    fsm.finish()
    expect(fsm.getState()).toBe('finished')
  })

  it('should reset to menu', () => {
    fsm.start()
    fsm.finish()
    fsm.reset()
    expect(fsm.getState()).toBe('menu')
  })
})
