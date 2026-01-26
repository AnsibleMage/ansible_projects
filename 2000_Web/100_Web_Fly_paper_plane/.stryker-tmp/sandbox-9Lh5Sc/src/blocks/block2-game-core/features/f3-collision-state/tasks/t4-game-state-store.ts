// @ts-nocheck
import { create } from 'zustand'
import type { GameState } from './t2-game-state-machine'

export interface GameStateStoreState {
  gameState: GameState
  collisionCount: number
  checkpointsPassed: number

  setGameState: (state: GameState) => void
  setCollisionCount: (count: number) => void
  incrementCollisionCount: () => void
  setCheckpointsPassed: (count: number) => void
  incrementCheckpointsPassed: () => void
  reset: () => void
}

export const createGameStateStore = () => {
  return create<GameStateStoreState>((set) => ({
    gameState: 'menu',
    collisionCount: 0,
    checkpointsPassed: 0,

    setGameState: (state) => set({ gameState: state }),
    setCollisionCount: (count) => set({ collisionCount: count }),
    incrementCollisionCount: () => set((state) => ({ collisionCount: state.collisionCount + 1 })),
    setCheckpointsPassed: (count) => set({ checkpointsPassed: count }),
    incrementCheckpointsPassed: () =>
      set((state) => ({ checkpointsPassed: state.checkpointsPassed + 1 })),

    reset: () =>
      set({
        gameState: 'menu',
        collisionCount: 0,
        checkpointsPassed: 0,
      }),
  }))
}
