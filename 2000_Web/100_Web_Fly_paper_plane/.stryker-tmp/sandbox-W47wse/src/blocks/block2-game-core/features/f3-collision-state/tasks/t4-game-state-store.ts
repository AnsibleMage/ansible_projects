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
import type { GameState } from './t2-game-state-machine';
export interface GameStateStoreState {
  gameState: GameState;
  collisionCount: number;
  checkpointsPassed: number;
  setGameState: (state: GameState) => void;
  setCollisionCount: (count: number) => void;
  incrementCollisionCount: () => void;
  setCheckpointsPassed: (count: number) => void;
  incrementCheckpointsPassed: () => void;
  reset: () => void;
}
export const createGameStateStore = () => {
  if (stryMutAct_9fa48("1209")) {
    {}
  } else {
    stryCov_9fa48("1209");
    return create<GameStateStoreState>(stryMutAct_9fa48("1210") ? () => undefined : (stryCov_9fa48("1210"), set => stryMutAct_9fa48("1211") ? {} : (stryCov_9fa48("1211"), {
      gameState: stryMutAct_9fa48("1212") ? "" : (stryCov_9fa48("1212"), 'menu'),
      collisionCount: 0,
      checkpointsPassed: 0,
      setGameState: stryMutAct_9fa48("1213") ? () => undefined : (stryCov_9fa48("1213"), state => set(stryMutAct_9fa48("1214") ? {} : (stryCov_9fa48("1214"), {
        gameState: state
      }))),
      setCollisionCount: stryMutAct_9fa48("1215") ? () => undefined : (stryCov_9fa48("1215"), count => set(stryMutAct_9fa48("1216") ? {} : (stryCov_9fa48("1216"), {
        collisionCount: count
      }))),
      incrementCollisionCount: stryMutAct_9fa48("1217") ? () => undefined : (stryCov_9fa48("1217"), () => set(stryMutAct_9fa48("1218") ? () => undefined : (stryCov_9fa48("1218"), state => stryMutAct_9fa48("1219") ? {} : (stryCov_9fa48("1219"), {
        collisionCount: stryMutAct_9fa48("1220") ? state.collisionCount - 1 : (stryCov_9fa48("1220"), state.collisionCount + 1)
      })))),
      setCheckpointsPassed: stryMutAct_9fa48("1221") ? () => undefined : (stryCov_9fa48("1221"), count => set(stryMutAct_9fa48("1222") ? {} : (stryCov_9fa48("1222"), {
        checkpointsPassed: count
      }))),
      incrementCheckpointsPassed: stryMutAct_9fa48("1223") ? () => undefined : (stryCov_9fa48("1223"), () => set(stryMutAct_9fa48("1224") ? () => undefined : (stryCov_9fa48("1224"), state => stryMutAct_9fa48("1225") ? {} : (stryCov_9fa48("1225"), {
        checkpointsPassed: stryMutAct_9fa48("1226") ? state.checkpointsPassed - 1 : (stryCov_9fa48("1226"), state.checkpointsPassed + 1)
      })))),
      reset: stryMutAct_9fa48("1227") ? () => undefined : (stryCov_9fa48("1227"), () => set(stryMutAct_9fa48("1228") ? {} : (stryCov_9fa48("1228"), {
        gameState: stryMutAct_9fa48("1229") ? "" : (stryCov_9fa48("1229"), 'menu'),
        collisionCount: 0,
        checkpointsPassed: 0
      })))
    })));
  }
};