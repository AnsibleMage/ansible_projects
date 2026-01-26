// @ts-nocheck
import { createGameStateStore } from '../../block2-game-core/features/f3-collision-state/tasks/t4-game-state-store';

// Block 2의 Game State Store를 Block 4에서 사용하기 위한 전역 store
export const useGameStore = createGameStateStore();
