// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { create } from 'zustand';
import { LeaderboardState, createLeaderboardStore } from '../../block3-social/features/f2-leaderboard-display/tasks/t4-leaderboard-state-store';

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
export const useSocialStore = create<ExtendedSocialStore>(stryMutAct_9fa48("2214") ? () => undefined : (stryCov_9fa48("2214"), (set, get) => stryMutAct_9fa48("2215") ? {} : (stryCov_9fa48("2215"), {
  // Block 3 기본 상태 및 액션
  ...baseStore.getState(),
  // Block 4 확장 상태
  currentUser: null,
  setCurrentUser: stryMutAct_9fa48("2216") ? () => undefined : (stryCov_9fa48("2216"), user => set(stryMutAct_9fa48("2217") ? {} : (stryCov_9fa48("2217"), {
    currentUser: user
  }))),
  // Block 3 액션 재정의 (zustand store 메소드 연결)
  setEntries: entries => {
    if (stryMutAct_9fa48("2218")) {
      {}
    } else {
      stryCov_9fa48("2218");
      baseStore.getState().setEntries(entries);
      set(stryMutAct_9fa48("2219") ? {} : (stryCov_9fa48("2219"), {
        entries
      }));
    }
  },
  setLoading: loading => {
    if (stryMutAct_9fa48("2220")) {
      {}
    } else {
      stryCov_9fa48("2220");
      baseStore.getState().setLoading(loading);
      set(stryMutAct_9fa48("2221") ? {} : (stryCov_9fa48("2221"), {
        isLoading: loading
      }));
    }
  },
  setError: error => {
    if (stryMutAct_9fa48("2222")) {
      {}
    } else {
      stryCov_9fa48("2222");
      baseStore.getState().setError(error);
      set(stryMutAct_9fa48("2223") ? {} : (stryCov_9fa48("2223"), {
        error
      }));
    }
  },
  clearEntries: () => {
    if (stryMutAct_9fa48("2224")) {
      {}
    } else {
      stryCov_9fa48("2224");
      baseStore.getState().clearEntries();
      set(stryMutAct_9fa48("2225") ? {} : (stryCov_9fa48("2225"), {
        entries: stryMutAct_9fa48("2226") ? ["Stryker was here"] : (stryCov_9fa48("2226"), []),
        error: null
      }));
    }
  }
})));