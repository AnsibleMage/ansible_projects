// @ts-nocheck
import { createLeaderboardStore } from '../../block3-social/features/f2-leaderboard-display/tasks/t4-leaderboard-state-store';

// Block 3의 Leaderboard State Store를 Block 4에서 사용하기 위한 전역 store
export const useSocialStore = createLeaderboardStore();
