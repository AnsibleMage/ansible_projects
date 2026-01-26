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
import type { GameStateStoreState } from '../../block2-game-core/features/f3-collision-state/tasks/t4-game-state-store';

// Block 4에서 필요한 추가 필드를 포함한 확장 Game Store
interface ExtendedGameStateStore extends GameStateStoreState {
  totalCheckpoints: number;
  setTotalCheckpoints: (count: number) => void;
  finalTime: number; // 완주 시간 (ms)
  setFinalTime: (time: number) => void;
}
export const useGameStore = create<ExtendedGameStateStore>(stryMutAct_9fa48("2190") ? () => undefined : (stryCov_9fa48("2190"), set => stryMutAct_9fa48("2191") ? {} : (stryCov_9fa48("2191"), {
  // Block 2 기본 상태
  gameState: stryMutAct_9fa48("2192") ? "" : (stryCov_9fa48("2192"), 'menu'),
  collisionCount: 0,
  checkpointsPassed: 0,
  setGameState: stryMutAct_9fa48("2193") ? () => undefined : (stryCov_9fa48("2193"), state => set(stryMutAct_9fa48("2194") ? {} : (stryCov_9fa48("2194"), {
    gameState: state
  }))),
  setCollisionCount: stryMutAct_9fa48("2195") ? () => undefined : (stryCov_9fa48("2195"), count => set(stryMutAct_9fa48("2196") ? {} : (stryCov_9fa48("2196"), {
    collisionCount: count
  }))),
  incrementCollisionCount: stryMutAct_9fa48("2197") ? () => undefined : (stryCov_9fa48("2197"), () => set(stryMutAct_9fa48("2198") ? () => undefined : (stryCov_9fa48("2198"), state => stryMutAct_9fa48("2199") ? {} : (stryCov_9fa48("2199"), {
    collisionCount: stryMutAct_9fa48("2200") ? state.collisionCount - 1 : (stryCov_9fa48("2200"), state.collisionCount + 1)
  })))),
  setCheckpointsPassed: stryMutAct_9fa48("2201") ? () => undefined : (stryCov_9fa48("2201"), count => set(stryMutAct_9fa48("2202") ? {} : (stryCov_9fa48("2202"), {
    checkpointsPassed: count
  }))),
  incrementCheckpointsPassed: stryMutAct_9fa48("2203") ? () => undefined : (stryCov_9fa48("2203"), () => set(stryMutAct_9fa48("2204") ? () => undefined : (stryCov_9fa48("2204"), state => stryMutAct_9fa48("2205") ? {} : (stryCov_9fa48("2205"), {
    checkpointsPassed: stryMutAct_9fa48("2206") ? state.checkpointsPassed - 1 : (stryCov_9fa48("2206"), state.checkpointsPassed + 1)
  })))),
  // Block 4 확장 상태
  totalCheckpoints: 10,
  // 기본값 (실제로는 코스 데이터에서 가져옴)
  setTotalCheckpoints: stryMutAct_9fa48("2207") ? () => undefined : (stryCov_9fa48("2207"), count => set(stryMutAct_9fa48("2208") ? {} : (stryCov_9fa48("2208"), {
    totalCheckpoints: count
  }))),
  finalTime: 0,
  // 완주 시간 (ms)
  setFinalTime: stryMutAct_9fa48("2209") ? () => undefined : (stryCov_9fa48("2209"), time => set(stryMutAct_9fa48("2210") ? {} : (stryCov_9fa48("2210"), {
    finalTime: time
  }))),
  reset: stryMutAct_9fa48("2211") ? () => undefined : (stryCov_9fa48("2211"), () => set(stryMutAct_9fa48("2212") ? {} : (stryCov_9fa48("2212"), {
    gameState: stryMutAct_9fa48("2213") ? "" : (stryCov_9fa48("2213"), 'menu'),
    collisionCount: 0,
    checkpointsPassed: 0,
    totalCheckpoints: 10,
    finalTime: 0
  })))
})));