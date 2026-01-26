/**
 * Feature 1.1 Integration Test
 *
 * Tests the full Input Handler feature integration:
 * - Keyboard + Mouse + Buffering + Mapping + UI
 *
 * Validates PRD Success Metrics:
 * - Input response time < 16ms
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { KeyboardInputHandler } from './tasks/t1-keyboard-input'
import { MouseInputHandler } from './tasks/t2-mouse-input'
import { InputBufferManager, lerp, smoothDamp } from './tasks/t3-input-buffering'
import { InputMappingManager } from './tasks/t4-input-mapping'

describe('Feature 1.1: Input Handler Integration', () => {
  let keyboardHandler: KeyboardInputHandler
  let mouseHandler: MouseInputHandler
  let bufferManager: InputBufferManager
  let mappingManager: InputMappingManager

  beforeEach(() => {
    localStorage.clear()
    keyboardHandler = new KeyboardInputHandler()
    mouseHandler = new MouseInputHandler()
    bufferManager = new InputBufferManager()
    mappingManager = new InputMappingManager()
  })

  afterEach(() => {
    keyboardHandler.cleanup()
    mouseHandler.cleanup()
    localStorage.clear()
  })

  describe('Scenario 1: Keyboard → Buffering → Interpolation → UI Full Flow', () => {
    it('should capture keyboard input and add to buffer', () => {
      // Simulate W key press
      const keydownEvent = new KeyboardEvent('keydown', { key: 'w' })
      window.dispatchEvent(keydownEvent)

      const keyboardState = keyboardHandler.getState()
      expect(keyboardState.forward).toBe(true)

      // Add to buffer with timestamp
      bufferManager.addSnapshot({
        ...keyboardState,
        timestamp: Date.now(),
      })

      expect(bufferManager.getSize()).toBe(1)
      const latest = bufferManager.getLatest()
      expect(latest?.forward).toBe(true)
    })

    it('should interpolate buffered inputs smoothly', () => {
      const baseTime = Date.now()

      // Add multiple snapshots
      bufferManager.addSnapshot({
        forward: false,
        backward: false,
        left: false,
        right: false,
        timestamp: baseTime,
      })

      bufferManager.addSnapshot({
        forward: true,
        backward: false,
        left: false,
        right: false,
        timestamp: baseTime + 16, // 16ms later (60 FPS)
      })

      const oldest = bufferManager.getOldest()!
      const latest = bufferManager.getLatest()!

      // Interpolate time between snapshots
      const t = 0.5
      const interpolatedTime = lerp(oldest.timestamp, latest.timestamp, t)

      expect(interpolatedTime).toBe(baseTime + 8)
    })

    it('should apply smooth damping for frame-independent movement', () => {
      let currentSpeed = 0
      const targetSpeed = 10
      const deltaTime = 1 / 60 // 60 FPS
      const smoothTime = 0.1

      // Simulate 10 frames
      for (let i = 0; i < 10; i++) {
        currentSpeed = smoothDamp(currentSpeed, targetSpeed, deltaTime, smoothTime)
      }

      expect(currentSpeed).toBeGreaterThan(5) // Should be more than halfway
      expect(currentSpeed).toBeLessThan(targetSpeed) // But not fully there
    })
  })

  describe('Scenario 2: Mouse → Delta Calculation → State Update', () => {
    it('should accumulate mouse deltas and reset', () => {
      // Simulate mouse movement
      const move1 = new MouseEvent('mousemove', { movementX: 10, movementY: 5 })
      const move2 = new MouseEvent('mousemove', { movementX: 15, movementY: -3 })

      window.dispatchEvent(move1)
      window.dispatchEvent(move2)

      const state1 = mouseHandler.getState()
      expect(state1.deltaX).toBe(25) // 10 + 15
      expect(state1.deltaY).toBe(2)  // 5 + (-3)

      // Reset deltas (for next frame)
      mouseHandler.resetDelta()

      const state2 = mouseHandler.getState()
      expect(state2.deltaX).toBe(0)
      expect(state2.deltaY).toBe(0)
      expect(state2.isClicked).toBe(false)
    })

    it('should track mouse click state', () => {
      const moveEvent = new MouseEvent('mousemove', { movementX: 10, movementY: 0 })
      const clickEvent = new MouseEvent('mousedown')

      window.dispatchEvent(moveEvent)
      window.dispatchEvent(clickEvent)

      const state = mouseHandler.getState()
      expect(state.deltaX).toBe(10)
      expect(state.isClicked).toBe(true)
    })
  })

  describe('Scenario 3: Input Mapping → Runtime Change → LocalStorage', () => {
    it('should change key mapping at runtime and persist', () => {
      // Default: W = forward
      const defaultMapping = mappingManager.getMapping()
      expect(defaultMapping.forward).toContain('w')

      // Add 'E' to forward
      mappingManager.addKey('forward', 'e')

      const newMapping = mappingManager.getMapping()
      expect(newMapping.forward).toContain('e')
      expect(newMapping.forward).toContain('arrowup')

      // Verify LocalStorage persistence
      const stored = localStorage.getItem('fly-paper-plane-input-mapping')
      expect(stored).toBeDefined()
      const parsed = JSON.parse(stored!)
      expect(parsed.forward).toContain('e')
    })

    it('should load persisted mapping on initialization', () => {
      // Save custom mapping
      mappingManager.addKey('forward', 'i')
      mappingManager.save()

      // Create new instance (simulates reload)
      const newManager = new InputMappingManager()
      const mapping = newManager.getMapping()

      expect(mapping.forward).toContain('i')
    })

    it('should prevent duplicate keys across directions', () => {
      // Initially 'w' is in forward
      expect(mappingManager.getMapping().forward).toContain('w')

      // Move 'w' to backward
      mappingManager.addKey('backward', 'w')

      const mapping = mappingManager.getMapping()
      expect(mapping.forward).not.toContain('w')
      expect(mapping.backward).toContain('w')
    })
  })

  describe('Scenario 4: Simultaneous Input (Keyboard + Mouse) → No Conflicts', () => {
    it('should handle keyboard and mouse input simultaneously', () => {
      // Press W key
      const keyEvent = new KeyboardEvent('keydown', { key: 'w' })
      window.dispatchEvent(keyEvent)

      // Move mouse
      const mouseEvent = new MouseEvent('mousemove', { movementX: 50, movementY: -20 })
      window.dispatchEvent(mouseEvent)

      // Click mouse
      const clickEvent = new MouseEvent('mousedown')
      window.dispatchEvent(clickEvent)

      // Both should work independently
      const keyboardState = keyboardHandler.getState()
      const mouseState = mouseHandler.getState()

      expect(keyboardState.forward).toBe(true)
      expect(mouseState.deltaX).toBe(50)
      expect(mouseState.deltaY).toBe(-20)
      expect(mouseState.isClicked).toBe(true)
    })

    it('should add combined state to buffer', () => {
      // Press multiple keys
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))

      const keyboardState = keyboardHandler.getState()

      // Move mouse
      window.dispatchEvent(new MouseEvent('mousemove', { movementX: 100, movementY: 0 }))

      const mouseState = mouseHandler.getState()

      // Add combined state to buffer
      bufferManager.addSnapshot({
        ...keyboardState,
        timestamp: Date.now(),
      })

      const latest = bufferManager.getLatest()
      expect(latest?.forward).toBe(true)
      expect(latest?.left).toBe(true)
      expect(mouseState.deltaX).toBe(100)
    })
  })

  describe('Scenario 5: Input Response Time < 16ms (PRD Metric)', () => {
    it('should process keyboard input in < 16ms', () => {
      const iterations = 100
      const timings: number[] = []

      for (let i = 0; i < iterations; i++) {
        const start = performance.now()

        // Simulate input processing
        const keyEvent = new KeyboardEvent('keydown', { key: 'w' })
        window.dispatchEvent(keyEvent)
        const state = keyboardHandler.getState()

        const end = performance.now()
        const elapsed = end - start

        timings.push(elapsed)

        // Release key
        const keyUpEvent = new KeyboardEvent('keyup', { key: 'w' })
        window.dispatchEvent(keyUpEvent)
      }

      // Calculate average and max
      const avgTime = timings.reduce((a, b) => a + b, 0) / timings.length
      const maxTime = Math.max(...timings)

      // PRD Metric: < 16ms (60 FPS)
      expect(avgTime).toBeLessThan(16)
      expect(maxTime).toBeLessThan(16)
    })

    it('should process mouse input in < 16ms', () => {
      const iterations = 100
      const timings: number[] = []

      for (let i = 0; i < iterations; i++) {
        const start = performance.now()

        // Simulate mouse processing
        const mouseEvent = new MouseEvent('mousemove', { movementX: 10, movementY: 5 })
        window.dispatchEvent(mouseEvent)
        const state = mouseHandler.getState()
        mouseHandler.resetDelta()

        const end = performance.now()
        const elapsed = end - start

        timings.push(elapsed)
      }

      const avgTime = timings.reduce((a, b) => a + b, 0) / timings.length
      const maxTime = Math.max(...timings)

      expect(avgTime).toBeLessThan(16)
      expect(maxTime).toBeLessThan(16)
    })

    it('should process buffer interpolation in < 16ms', () => {
      // Pre-fill buffer
      for (let i = 0; i < 10; i++) {
        bufferManager.addSnapshot({
          forward: i % 2 === 0,
          backward: false,
          left: false,
          right: false,
          timestamp: Date.now() + i * 16,
        })
      }

      const iterations = 1000
      const timings: number[] = []

      for (let i = 0; i < iterations; i++) {
        const start = performance.now()

        // Interpolation operations
        const oldest = bufferManager.getOldest()
        const latest = bufferManager.getLatest()
        if (oldest && latest) {
          const interpolated = lerp(oldest.timestamp, latest.timestamp, 0.5)
          const smoothed = smoothDamp(0, 10, 1 / 60, 0.1)
        }

        const end = performance.now()
        const elapsed = end - start

        timings.push(elapsed)
      }

      const avgTime = timings.reduce((a, b) => a + b, 0) / timings.length
      const maxTime = Math.max(...timings)

      expect(avgTime).toBeLessThan(16)
      expect(maxTime).toBeLessThan(16)
    })
  })

  describe('PRD Sync Points', () => {
    it('should achieve all input handler PRD metrics', () => {
      // Metric 1: Input response time < 16ms (tested above)

      // Metric 2: All input devices work correctly
      const keyEvent = new KeyboardEvent('keydown', { key: 'w' })
      window.dispatchEvent(keyEvent)
      expect(keyboardHandler.getState().forward).toBe(true)

      const mouseEvent = new MouseEvent('mousemove', { movementX: 10, movementY: 0 })
      window.dispatchEvent(mouseEvent)
      expect(mouseHandler.getState().deltaX).toBe(10)

      // Metric 3: Mapping system works
      mappingManager.addKey('forward', 'e')
      expect(mappingManager.getMapping().forward).toContain('e')

      // Metric 4: Buffering works
      bufferManager.addSnapshot({
        forward: true,
        backward: false,
        left: false,
        right: false,
        timestamp: Date.now(),
      })
      expect(bufferManager.getSize()).toBeGreaterThan(0)
    })
  })
})
