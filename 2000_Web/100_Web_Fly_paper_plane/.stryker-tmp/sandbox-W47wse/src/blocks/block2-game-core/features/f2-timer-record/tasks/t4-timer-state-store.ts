/**
 * Task 2.2.4: Timer State Store
 *
 * Zustand store for timer state:
 * - Timer state (idle/running/paused/stopped)
 * - Elapsed time
 * - Personal best
 * - Record history
 */
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
import type { TimerState } from './t1-timer-core';
import type { TimeRecord } from './t3-record-manager';
export interface TimerStoreState {
  timerState: TimerState;
  elapsedTime: number;
  personalBest: number | null;
  recordHistory: TimeRecord[];
  setTimerState: (state: TimerState) => void;
  setElapsedTime: (time: number) => void;
  setPersonalBest: (time: number) => void;
  addRecord: (record: TimeRecord) => void;
  clearHistory: () => void;
  reset: () => void;
}
export const createTimerStore = () => {
  if (stryMutAct_9fa48("1077")) {
    {}
  } else {
    stryCov_9fa48("1077");
    return create<TimerStoreState>(stryMutAct_9fa48("1078") ? () => undefined : (stryCov_9fa48("1078"), set => stryMutAct_9fa48("1079") ? {} : (stryCov_9fa48("1079"), {
      timerState: stryMutAct_9fa48("1080") ? "" : (stryCov_9fa48("1080"), 'idle'),
      elapsedTime: 0,
      personalBest: null,
      recordHistory: stryMutAct_9fa48("1081") ? ["Stryker was here"] : (stryCov_9fa48("1081"), []),
      setTimerState: stryMutAct_9fa48("1082") ? () => undefined : (stryCov_9fa48("1082"), state => set(stryMutAct_9fa48("1083") ? {} : (stryCov_9fa48("1083"), {
        timerState: state
      }))),
      setElapsedTime: stryMutAct_9fa48("1084") ? () => undefined : (stryCov_9fa48("1084"), time => set(stryMutAct_9fa48("1085") ? {} : (stryCov_9fa48("1085"), {
        elapsedTime: time
      }))),
      setPersonalBest: stryMutAct_9fa48("1086") ? () => undefined : (stryCov_9fa48("1086"), time => set(stryMutAct_9fa48("1087") ? {} : (stryCov_9fa48("1087"), {
        personalBest: time
      }))),
      addRecord: stryMutAct_9fa48("1088") ? () => undefined : (stryCov_9fa48("1088"), record => set(stryMutAct_9fa48("1089") ? () => undefined : (stryCov_9fa48("1089"), state => stryMutAct_9fa48("1090") ? {} : (stryCov_9fa48("1090"), {
        recordHistory: stryMutAct_9fa48("1091") ? [] : (stryCov_9fa48("1091"), [...state.recordHistory, record])
      })))),
      clearHistory: stryMutAct_9fa48("1092") ? () => undefined : (stryCov_9fa48("1092"), () => set(stryMutAct_9fa48("1093") ? {} : (stryCov_9fa48("1093"), {
        recordHistory: stryMutAct_9fa48("1094") ? ["Stryker was here"] : (stryCov_9fa48("1094"), [])
      }))),
      reset: stryMutAct_9fa48("1095") ? () => undefined : (stryCov_9fa48("1095"), () => set(stryMutAct_9fa48("1096") ? {} : (stryCov_9fa48("1096"), {
        timerState: stryMutAct_9fa48("1097") ? "" : (stryCov_9fa48("1097"), 'idle'),
        elapsedTime: 0,
        personalBest: null,
        recordHistory: stryMutAct_9fa48("1098") ? ["Stryker was here"] : (stryCov_9fa48("1098"), [])
      })))
    })));
  }
};