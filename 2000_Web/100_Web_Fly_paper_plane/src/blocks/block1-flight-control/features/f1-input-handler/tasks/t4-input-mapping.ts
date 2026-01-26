/**
 * Task 1.1.4: Input Mapping Configuration
 *
 * Manages user-configurable key bindings with runtime changes.
 * Stores mappings in LocalStorage for persistence.
 * Prevents duplicate keys across different directions.
 *
 * @example
 * const manager = new InputMappingManager()
 * manager.addKey('forward', 'e')  // Add 'E' to forward
 * manager.removeKey('backward', 's')  // Remove 'S' from backward
 * manager.save()  // Persist to LocalStorage
 * manager.resetToDefault()  // Restore default mappings
 */

export interface InputMapping {
  forward: string[]
  backward: string[]
  left: string[]
  right: string[]
}

export type Direction = keyof InputMapping

// Default key bindings (WASD + Arrow keys)
export const DEFAULT_MAPPING: InputMapping = {
  forward: ['w', 'arrowup'],
  backward: ['s', 'arrowdown'],
  left: ['a', 'arrowleft'],
  right: ['d', 'arrowright'],
}

// Constants (Explicit, Adaptive)
const STORAGE_KEY = 'fly-paper-plane-input-mapping'
const DIRECTIONS: Direction[] = ['forward', 'backward', 'left', 'right']

export class InputMappingManager {
  private mapping: InputMapping

  constructor() {
    this.mapping = this.loadFromStorage() || this.cloneMapping(DEFAULT_MAPPING)
  }

  private loadFromStorage(): InputMapping | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return null

      const parsed = JSON.parse(stored)
      return this.validateMapping(parsed) ? parsed : null
    } catch {
      return null
    }
  }

  private validateMapping(mapping: any): mapping is InputMapping {
    if (!mapping || typeof mapping !== 'object') return false

    return DIRECTIONS.every(
      (dir) => Array.isArray(mapping[dir]) && mapping[dir].every((k: any) => typeof k === 'string')
    )
  }

  private cloneMapping(mapping: InputMapping): InputMapping {
    return {
      forward: [...mapping.forward],
      backward: [...mapping.backward],
      left: [...mapping.left],
      right: [...mapping.right],
    }
  }

  private normalizeKey(key: string): string {
    return key.toLowerCase()
  }

  private removeDuplicatesInDirection(direction: Direction): void {
    this.mapping[direction] = [...new Set(this.mapping[direction])]
  }

  private removeKeyFromAllDirections(key: string): void {
    const normalized = this.normalizeKey(key)

    DIRECTIONS.forEach((dir) => {
      this.mapping[dir] = this.mapping[dir].filter((k) => k !== normalized)
    })
  }

  private removeDuplicatesAcrossDirections(): void {
    const seen = new Set<string>()

    // Process in reverse to keep last occurrence
    for (let i = DIRECTIONS.length - 1; i >= 0; i--) {
      const dir = DIRECTIONS[i]
      const uniqueKeys: string[] = []

      for (let j = this.mapping[dir].length - 1; j >= 0; j--) {
        const key = this.mapping[dir][j]
        if (!seen.has(key)) {
          seen.add(key)
          uniqueKeys.unshift(key)
        }
      }

      this.mapping[dir] = uniqueKeys
    }
  }

  public getMapping(): InputMapping {
    return this.cloneMapping(this.mapping)
  }

  public setMapping(mapping: InputMapping): void {
    this.mapping = this.cloneMapping(mapping)
    this.removeDuplicatesAcrossDirections()
    this.save()
  }

  public resetToDefault(): void {
    this.mapping = this.cloneMapping(DEFAULT_MAPPING)
    localStorage.removeItem(STORAGE_KEY)
  }

  public addKey(direction: Direction, key: string): void {
    const normalized = this.normalizeKey(key)

    // Validate key format
    if (normalized === '') return

    // Remove key from all directions first (prevent duplicates)
    this.removeKeyFromAllDirections(normalized)

    // Add to target direction
    this.mapping[direction].push(normalized)

    // Remove duplicates within direction
    this.removeDuplicatesInDirection(direction)

    this.save()
  }

  public removeKey(direction: Direction, key: string): void {
    const normalized = this.normalizeKey(key)
    this.mapping[direction] = this.mapping[direction].filter((k) => k !== normalized)
    this.save()
  }

  public save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.mapping))
    } catch {
      // Silent fail (e.g., quota exceeded, private browsing)
    }
  }

  public isKeyMapped(key: string): boolean {
    const normalized = this.normalizeKey(key)
    return DIRECTIONS.some((dir) => this.mapping[dir].includes(normalized))
  }

  public getDirectionForKey(key: string): Direction | null {
    const normalized = this.normalizeKey(key)

    for (const dir of DIRECTIONS) {
      if (this.mapping[dir].includes(normalized)) {
        return dir
      }
    }

    return null
  }
}
