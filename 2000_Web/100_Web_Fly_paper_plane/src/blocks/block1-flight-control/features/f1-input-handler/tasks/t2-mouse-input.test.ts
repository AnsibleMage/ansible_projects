import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { MouseInputHandler, MouseState } from './t2-mouse-input'

describe('Task 1.1.2: Mouse Input Detection', () => {
  let handler: MouseInputHandler

  beforeEach(() => {
    handler = new MouseInputHandler()
  })

  afterEach(() => {
    handler.cleanup()
  })

  describe('Initialization', () => {
    it('should initialize with zero deltas and no click', () => {
      const state = handler.getState()

      expect(state.deltaX).toBe(0)
      expect(state.deltaY).toBe(0)
      expect(state.isClicked).toBe(false)
    })
  })

  describe('Mouse Movement', () => {
    it('should calculate deltaX on horizontal mouse move', () => {
      const event = new MouseEvent('mousemove', {
        movementX: 10,
        movementY: 0,
      })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.deltaX).toBe(10)
      expect(state.deltaY).toBe(0)
    })

    it('should calculate deltaY on vertical mouse move', () => {
      const event = new MouseEvent('mousemove', {
        movementX: 0,
        movementY: 15,
      })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.deltaX).toBe(0)
      expect(state.deltaY).toBe(15)
    })

    it('should calculate both deltaX and deltaY on diagonal move', () => {
      const event = new MouseEvent('mousemove', {
        movementX: 10,
        movementY: 15,
      })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.deltaX).toBe(10)
      expect(state.deltaY).toBe(15)
    })

    it('should handle negative deltas (moving left/up)', () => {
      const event = new MouseEvent('mousemove', {
        movementX: -20,
        movementY: -10,
      })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.deltaX).toBe(-20)
      expect(state.deltaY).toBe(-10)
    })

    it('should accumulate movement over multiple events', () => {
      const event1 = new MouseEvent('mousemove', { movementX: 5, movementY: 0 })
      const event2 = new MouseEvent('mousemove', { movementX: 3, movementY: 0 })

      window.dispatchEvent(event1)
      window.dispatchEvent(event2)

      const state = handler.getState()
      expect(state.deltaX).toBe(8) // 5 + 3
    })
  })

  describe('Mouse Click', () => {
    it('should set isClicked to true on mousedown', () => {
      const event = new MouseEvent('mousedown')
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.isClicked).toBe(true)
    })

    it('should set isClicked to false on mouseup', () => {
      // Press mouse
      const mousedown = new MouseEvent('mousedown')
      window.dispatchEvent(mousedown)
      expect(handler.getState().isClicked).toBe(true)

      // Release mouse
      const mouseup = new MouseEvent('mouseup')
      window.dispatchEvent(mouseup)
      expect(handler.getState().isClicked).toBe(false)
    })

    it('should handle click while moving', () => {
      const moveEvent = new MouseEvent('mousemove', { movementX: 10, movementY: 5 })
      const clickEvent = new MouseEvent('mousedown')

      window.dispatchEvent(moveEvent)
      window.dispatchEvent(clickEvent)

      const state = handler.getState()
      expect(state.deltaX).toBe(10)
      expect(state.deltaY).toBe(5)
      expect(state.isClicked).toBe(true)
    })
  })

  describe('Reset Delta', () => {
    it('should reset deltas to zero when calling resetDelta', () => {
      const event = new MouseEvent('mousemove', { movementX: 100, movementY: 50 })
      window.dispatchEvent(event)

      expect(handler.getState().deltaX).toBe(100)
      expect(handler.getState().deltaY).toBe(50)

      handler.resetDelta()

      expect(handler.getState().deltaX).toBe(0)
      expect(handler.getState().deltaY).toBe(0)
    })

    it('should not reset click state when resetting delta', () => {
      const moveEvent = new MouseEvent('mousemove', { movementX: 10, movementY: 10 })
      const clickEvent = new MouseEvent('mousedown')

      window.dispatchEvent(moveEvent)
      window.dispatchEvent(clickEvent)

      handler.resetDelta()

      const state = handler.getState()
      expect(state.deltaX).toBe(0)
      expect(state.deltaY).toBe(0)
      expect(state.isClicked).toBe(true)
    })
  })

  describe('Memory Leak Prevention', () => {
    it('should cleanup event listeners on cleanup call', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

      const newHandler = new MouseInputHandler()
      const addCallCount = addEventListenerSpy.mock.calls.length

      newHandler.cleanup()
      const removeCallCount = removeEventListenerSpy.mock.calls.length

      expect(removeCallCount).toBeGreaterThanOrEqual(addCallCount)

      addEventListenerSpy.mockRestore()
      removeEventListenerSpy.mockRestore()
    })

    it('should not respond to events after cleanup', () => {
      handler.cleanup()

      const moveEvent = new MouseEvent('mousemove', { movementX: 10, movementY: 10 })
      const clickEvent = new MouseEvent('mousedown')

      window.dispatchEvent(moveEvent)
      window.dispatchEvent(clickEvent)

      const state = handler.getState()
      expect(state.deltaX).toBe(0)
      expect(state.deltaY).toBe(0)
      expect(state.isClicked).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero movement', () => {
      const event = new MouseEvent('mousemove', { movementX: 0, movementY: 0 })
      window.dispatchEvent(event)

      const state = handler.getState()
      expect(state.deltaX).toBe(0)
      expect(state.deltaY).toBe(0)
    })

    it('should handle rapid mouse movements', () => {
      for (let i = 0; i < 10; i++) {
        const event = new MouseEvent('mousemove', { movementX: 1, movementY: 1 })
        window.dispatchEvent(event)
      }

      const state = handler.getState()
      expect(state.deltaX).toBe(10)
      expect(state.deltaY).toBe(10)
    })

    it('should handle rapid clicks', () => {
      for (let i = 0; i < 5; i++) {
        const mousedown = new MouseEvent('mousedown')
        const mouseup = new MouseEvent('mouseup')
        window.dispatchEvent(mousedown)
        window.dispatchEvent(mouseup)
      }

      const state = handler.getState()
      expect(state.isClicked).toBe(false)
    })
  })
})
