import { create } from 'zustand';
import type { GameStateStoreState } from '../../block2-game-core/features/f3-collision-state/tasks/t4-game-state-store';

// Block 4에서 필요한 추가 필드를 포함한 확장 Game Store
interface ExtendedGameStateStore extends GameStateStoreState {
  totalCheckpoints: number;
  setTotalCheckpoints: (count: number) => void;
  finalTime: number; // 완주 시간 (ms)
  setFinalTime: (time: number) => void;
}

export const useGameStore = create<ExtendedGameStateStore>((set) => ({
  // Block 2 기본 상태
  gameState: 'menu',
  collisionCount: 0,
  checkpointsPassed: 0,

  setGameState: (state) => set({ gameState: state }),
  setCollisionCount: (count) => set({ collisionCount: count }),
  incrementCollisionCount: () => set((state) => ({ collisionCount: state.collisionCount + 1 })),
  setCheckpointsPassed: (count) => set({ checkpointsPassed: count }),
  incrementCheckpointsPassed: () =>
    set((state) => ({ checkpointsPassed: state.checkpointsPassed + 1 })),

  // Block 4 확장 상태
  totalCheckpoints: 10, // 기본값 (실제로는 코스 데이터에서 가져옴)
  setTotalCheckpoints: (count) => set({ totalCheckpoints: count }),
  finalTime: 0, // 완주 시간 (ms)
  setFinalTime: (time) => set({ finalTime: time }),

  reset: () =>
    set({
      gameState: 'menu',
      collisionCount: 0,
      checkpointsPassed: 0,
      totalCheckpoints: 10,
      finalTime: 0,
    }),
}));
