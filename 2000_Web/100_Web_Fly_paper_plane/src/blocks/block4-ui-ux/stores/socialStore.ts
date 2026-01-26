import { create } from 'zustand';
import {
  LeaderboardState,
  createLeaderboardStore,
} from '../../block3-social/features/f2-leaderboard-display/tasks/t4-leaderboard-state-store';

// Block 4 확장: currentUser 관리
interface CurrentUser {
  email: string;
  rank: number;
}

interface ExtendedSocialStore extends LeaderboardState {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
}

// Block 3의 store 생성
const baseStore = createLeaderboardStore();

// Block 4에서 확장하여 currentUser 추가
export const useSocialStore = create<ExtendedSocialStore>((set, get) => ({
  // Block 3 기본 상태 및 액션
  ...baseStore.getState(),

  // Block 4 확장 상태
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  // Block 3 액션 재정의 (zustand store 메소드 연결)
  setEntries: (entries) => {
    baseStore.getState().setEntries(entries);
    set({ entries });
  },
  setLoading: (loading) => {
    baseStore.getState().setLoading(loading);
    set({ isLoading: loading });
  },
  setError: (error) => {
    baseStore.getState().setError(error);
    set({ error });
  },
  clearEntries: () => {
    baseStore.getState().clearEntries();
    set({ entries: [], error: null });
  },
}));
