import { createTimerStore } from '../../block2-game-core/features/f2-timer-record/tasks/t4-timer-state-store';

// Block 2의 Timer State Store를 Block 4에서 사용하기 위한 전역 store
export const useTimerStore = createTimerStore();
