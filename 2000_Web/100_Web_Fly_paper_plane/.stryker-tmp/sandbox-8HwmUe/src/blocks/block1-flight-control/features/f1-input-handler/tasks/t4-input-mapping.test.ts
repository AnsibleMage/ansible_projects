// @ts-nocheck
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  InputMappingManager,
  InputMapping,
  DEFAULT_MAPPING,
} from './t4-input-mapping'

describe('Task 1.1.4: Input Mapping Configuration', () => {
  let manager: InputMappingManager
  const STORAGE_KEY = 'fly-paper-plane-input-mapping'

  beforeEach(() => {
    // Clear LocalStorage before each test
    localStorage.clear()
    manager = new InputMappingManager()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('Initialization', () => {
    it('should initialize with default mapping', () => {
      const mapping = manager.getMapping()

      expect(mapping.forward).toEqual(['w', 'arrowup'])
      expect(mapping.backward).toEqual(['s', 'arrowdown'])
      expect(mapping.left).toEqual(['a', 'arrowleft'])
      expect(mapping.right).toEqual(['d', 'arrowright'])
    })

    it('should load mapping from LocalStorage if exists', () => {
      const customMapping: InputMapping = {
        forward: ['w', 'i'],
        backward: ['s', 'k'],
        left: ['a', 'j'],
        right: ['d', 'l'],
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(customMapping))

      const newManager = new InputMappingManager()
      const mapping = newManager.getMapping()

      expect(mapping).toEqual(customMapping)
    })

    it('should use default mapping if LocalStorage data is corrupted', () => {
      localStorage.setItem(STORAGE_KEY, 'invalid json')

      const newManager = new InputMappingManager()
      const mapping = newManager.getMapping()

      expect(mapping).toEqual(DEFAULT_MAPPING)
    })

    it('should use default mapping if stored data has invalid structure (non-array)', () => {
      const invalidMapping = {
        forward: 'not-an-array', // Should be array
        backward: ['s'],
        left: ['a'],
        right: ['d'],
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(invalidMapping))

      const newManager = new InputMappingManager()
      const mapping = newManager.getMapping()

      expect(mapping).toEqual(DEFAULT_MAPPING)
    })

    it('should use default mapping if stored data has non-string elements', () => {
      const invalidMapping = {
        forward: ['w', 123], // 123 is not a string
        backward: ['s'],
        left: ['a'],
        right: ['d'],
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(invalidMapping))

      const newManager = new InputMappingManager()
      const mapping = newManager.getMapping()

      expect(mapping).toEqual(DEFAULT_MAPPING)
    })

    it('should use default mapping if stored data is not an object', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(['array', 'not', 'object']))

      const newManager = new InputMappingManager()
      const mapping = newManager.getMapping()

      expect(mapping).toEqual(DEFAULT_MAPPING)
    })

    it('should use default mapping if stored data is null', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(null))

      const newManager = new InputMappingManager()
      const mapping = newManager.getMapping()

      expect(mapping).toEqual(DEFAULT_MAPPING)
    })

    it('should use default mapping if stored data is a primitive type', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(42))

      const newManager = new InputMappingManager()
      const mapping = newManager.getMapping()

      expect(mapping).toEqual(DEFAULT_MAPPING)
    })
  })

  describe('Mapping Management', () => {
    it('should get current mapping', () => {
      const mapping = manager.getMapping()

      expect(mapping).toBeDefined()
      expect(mapping.forward).toBeDefined()
      expect(mapping.backward).toBeDefined()
      expect(mapping.left).toBeDefined()
      expect(mapping.right).toBeDefined()
    })

    it('should set custom mapping', () => {
      const customMapping: InputMapping = {
        forward: ['w', 'e'],
        backward: ['s', 'q'],
        left: ['a'],
        right: ['d'],
      }

      manager.setMapping(customMapping)
      const mapping = manager.getMapping()

      expect(mapping).toEqual(customMapping)
    })

    it('should reset to default mapping', () => {
      const customMapping: InputMapping = {
        forward: ['x'],
        backward: ['y'],
        left: ['z'],
        right: ['c'],
      }

      manager.setMapping(customMapping)
      manager.resetToDefault()

      const mapping = manager.getMapping()
      expect(mapping).toEqual(DEFAULT_MAPPING)
    })

    it('should add key to direction', () => {
      manager.addKey('forward', 'e')

      const mapping = manager.getMapping()
      expect(mapping.forward).toContain('e')
    })

    it('should remove key from direction', () => {
      manager.removeKey('forward', 'w')

      const mapping = manager.getMapping()
      expect(mapping.forward).not.toContain('w')
      expect(mapping.forward).toContain('arrowup') // Still has other key
    })

    it('should normalize keys to lowercase', () => {
      manager.addKey('forward', 'E')

      const mapping = manager.getMapping()
      expect(mapping.forward).toContain('e')
      expect(mapping.forward).not.toContain('E')
    })
  })

  describe('LocalStorage Integration', () => {
    it('should save mapping to LocalStorage', () => {
      const customMapping: InputMapping = {
        forward: ['w', 'e'],
        backward: ['s'],
        left: ['a'],
        right: ['d'],
      }

      manager.setMapping(customMapping)
      manager.save()

      const stored = localStorage.getItem(STORAGE_KEY)
      expect(stored).toBeDefined()
      expect(JSON.parse(stored!)).toEqual(customMapping)
    })

    it('should auto-save on setMapping', () => {
      const customMapping: InputMapping = {
        forward: ['w'],
        backward: ['s'],
        left: ['a'],
        right: ['d'],
      }

      manager.setMapping(customMapping)

      const stored = localStorage.getItem(STORAGE_KEY)
      expect(JSON.parse(stored!)).toEqual(customMapping)
    })

    it('should auto-save on addKey', () => {
      manager.addKey('forward', 'e')

      const stored = localStorage.getItem(STORAGE_KEY)
      const parsed = JSON.parse(stored!)
      expect(parsed.forward).toContain('e')
    })

    it('should auto-save on removeKey', () => {
      manager.removeKey('forward', 'w')

      const stored = localStorage.getItem(STORAGE_KEY)
      const parsed = JSON.parse(stored!)
      expect(parsed.forward).not.toContain('w')
    })

    it('should clear LocalStorage on reset', () => {
      manager.setMapping({
        forward: ['x'],
        backward: ['y'],
        left: ['z'],
        right: ['c'],
      })

      manager.resetToDefault()

      const stored = localStorage.getItem(STORAGE_KEY)
      expect(stored).toBeNull()
    })
  })

  describe('Duplicate Key Prevention', () => {
    it('should prevent duplicate keys within same direction', () => {
      manager.addKey('forward', 'w')
      manager.addKey('forward', 'w') // Duplicate

      const mapping = manager.getMapping()
      const wCount = mapping.forward.filter((k) => k === 'w').length
      expect(wCount).toBe(1)
    })

    it('should remove key from other directions when adding to new direction', () => {
      // 'w' is initially in forward
      manager.addKey('backward', 'w')

      const mapping = manager.getMapping()
      expect(mapping.forward).not.toContain('w')
      expect(mapping.backward).toContain('w')
    })

    it('should handle setting mapping with duplicate keys across directions', () => {
      const invalidMapping: InputMapping = {
        forward: ['w', 'a'], // 'a' should be in left only
        backward: ['s'],
        left: ['a'],
        right: ['d'],
      }

      manager.setMapping(invalidMapping)

      const mapping = manager.getMapping()
      // 'a' should only be in the last assigned direction
      const aInForward = mapping.forward.includes('a')
      const aInLeft = mapping.left.includes('a')

      expect(aInForward || aInLeft).toBe(true)
      expect(aInForward && aInLeft).toBe(false) // Not in both
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty key arrays', () => {
      manager.setMapping({
        forward: [],
        backward: ['s'],
        left: ['a'],
        right: ['d'],
      })

      const mapping = manager.getMapping()
      expect(mapping.forward).toEqual([])
    })

    it('should handle removing last key from direction', () => {
      manager.setMapping({
        forward: ['w'],
        backward: ['s'],
        left: ['a'],
        right: ['d'],
      })

      manager.removeKey('forward', 'w')

      const mapping = manager.getMapping()
      expect(mapping.forward).toEqual([])
    })

    it('should handle removing non-existent key', () => {
      manager.removeKey('forward', 'z')

      const mapping = manager.getMapping()
      expect(mapping.forward).toEqual(DEFAULT_MAPPING.forward)
    })

    it('should validate key format (non-empty string)', () => {
      manager.addKey('forward', '')

      const mapping = manager.getMapping()
      expect(mapping.forward).not.toContain('')
    })
  })

  describe('Runtime Changes', () => {
    it('should apply mapping changes immediately', () => {
      const beforeMapping = manager.getMapping()
      expect(beforeMapping.forward).toContain('w')

      manager.removeKey('forward', 'w')

      const afterMapping = manager.getMapping()
      expect(afterMapping.forward).not.toContain('w')
    })

    it('should persist changes across saves and loads', () => {
      manager.addKey('forward', 'e')
      manager.save()

      const newManager = new InputMappingManager()
      const mapping = newManager.getMapping()

      expect(mapping.forward).toContain('e')
    })
  })

  describe('Utility Functions', () => {
    it('should check if key is mapped', () => {
      const isMapped = manager.isKeyMapped('w')
      expect(isMapped).toBe(true)
    })

    it('should check if unmapped key', () => {
      const isMapped = manager.isKeyMapped('z')
      expect(isMapped).toBe(false)
    })

    it('should get direction for key', () => {
      const direction = manager.getDirectionForKey('w')
      expect(direction).toBe('forward')
    })

    it('should return null for unmapped key', () => {
      const direction = manager.getDirectionForKey('z')
      expect(direction).toBeNull()
    })
  })
})
