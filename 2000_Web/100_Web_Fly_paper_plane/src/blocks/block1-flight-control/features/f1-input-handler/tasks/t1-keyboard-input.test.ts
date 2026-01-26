import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { KeyboardInputHandler, KeyboardState } from './t1-keyboard-input'

describe('Task 1.1.1: Keyboard Input Detection', () => {
  let handler: KeyboardInputHandler

  beforeEach(() => {
    handler = new KeyboardInputHandler()
  })

  afterEach(() => {
    handler.cleanup()
  })

  describe('Initialization', () => {
    it('should initialize with all keys as false', () => {
      const state = handler.getState()

      expect(state.forward).toBe(false)
      expect(state.backward).toBe(false)
      expect(state.left).toBe(false)
      expect(state.right).toBe(false)
    })
  })

  describe('WASD Keys', () => {
    it('should set forward to true on W key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'w' })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.forward).toBe(true)
    })

    it('should set backward to true on S key press', () => {
      const event = new KeyboardEvent('keydown', { key: 's' })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.backward).toBe(true)
    })

    it('should set left to true on A key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'a' })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.left).toBe(true)
    })

    it('should set right to true on D key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'd' })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.right).toBe(true)
    })

    it('should set forward to false on W key release', () => {
      // Press W
      const keydown = new KeyboardEvent('keydown', { key: 'w' })
      window.dispatchEvent(keydown)
      expect(handler.getState().forward).toBe(true)

      // Release W
      const keyup = new KeyboardEvent('keyup', { key: 'w' })
      window.dispatchEvent(keyup)
      expect(handler.getState().forward).toBe(false)
    })
  })

  describe('Arrow Keys', () => {
    it('should set forward to true on ArrowUp key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.forward).toBe(true)
    })

    it('should set backward to true on ArrowDown key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.backward).toBe(true)
    })

    it('should set left to true on ArrowLeft key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.left).toBe(true)
    })

    it('should set right to true on ArrowRight key press', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.right).toBe(true)
    })
  })

  describe('Simultaneous Input', () => {
    it('should handle W+A simultaneous input', () => {
      const wEvent = new KeyboardEvent('keydown', { key: 'w' })
      const aEvent = new KeyboardEvent('keydown', { key: 'a' })

      window.dispatchEvent(wEvent)
      window.dispatchEvent(aEvent)

      const state = handler.getState()
      expect(state.forward).toBe(true)
      expect(state.left).toBe(true)
    })

    it('should handle all four keys simultaneously', () => {
      const events = [
        new KeyboardEvent('keydown', { key: 'w' }),
        new KeyboardEvent('keydown', { key: 'a' }),
        new KeyboardEvent('keydown', { key: 's' }),
        new KeyboardEvent('keydown', { key: 'd' })
      ]

      events.forEach(event => window.dispatchEvent(event))

      const state = handler.getState()
      expect(state.forward).toBe(true)
      expect(state.left).toBe(true)
      expect(state.backward).toBe(true)
      expect(state.right).toBe(true)
    })
  })

  describe('Case Insensitivity', () => {
    it('should handle uppercase W', () => {
      const event = new KeyboardEvent('keydown', { key: 'W' })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.forward).toBe(true)
    })

    it('should handle lowercase and uppercase interchangeably', () => {
      const wEvent = new KeyboardEvent('keydown', { key: 'w' })
      window.dispatchEvent(wEvent)
      expect(handler.getState().forward).toBe(true)

      const WEvent = new KeyboardEvent('keyup', { key: 'W' })
      window.dispatchEvent(WEvent)
      expect(handler.getState().forward).toBe(false)
    })
  })

  describe('Memory Leak Prevention', () => {
    it('should cleanup event listeners on cleanup call', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

      const newHandler = new KeyboardInputHandler()
      const addCallCount = addEventListenerSpy.mock.calls.length

      newHandler.cleanup()
      const removeCallCount = removeEventListenerSpy.mock.calls.length

      expect(removeCallCount).toBe(addCallCount)

      addEventListenerSpy.mockRestore()
      removeEventListenerSpy.mockRestore()
    })

    it('should not respond to events after cleanup', () => {
      handler.cleanup()

      const event = new KeyboardEvent('keydown', { key: 'w' })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.forward).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should ignore unknown keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'x' })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.forward).toBe(false)
      expect(state.backward).toBe(false)
      expect(state.left).toBe(false)
      expect(state.right).toBe(false)
    })

    it('should handle rapid key presses', () => {
      for (let i = 0; i < 10; i++) {
        const keydown = new KeyboardEvent('keydown', { key: 'w' })
        const keyup = new KeyboardEvent('keyup', { key: 'w' })
        window.dispatchEvent(keydown)
        window.dispatchEvent(keyup)
      }

      const state = handler.getState()
      expect(state.forward).toBe(false)
    })
  })
})
