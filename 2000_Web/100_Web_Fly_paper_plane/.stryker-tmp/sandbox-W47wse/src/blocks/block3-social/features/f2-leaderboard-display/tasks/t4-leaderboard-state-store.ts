/**
 * Task 3.2.4: Leaderboard State Store
 *
 * Zustand store for leaderboard state:
 * - Store leaderboard entries
 * - Loading state
 * - Error state
 * - Actions to update leaderboard
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
import type { LeaderboardEntry } from './t1-leaderboard-data-model';
export interface LeaderboardState {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
  setEntries: (entries: LeaderboardEntry[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearEntries: () => void;
}
export const createLeaderboardStore = () => {
  if (stryMutAct_9fa48("1399")) {
    {}
  } else {
    stryCov_9fa48("1399");
    return create<LeaderboardState>(stryMutAct_9fa48("1400") ? () => undefined : (stryCov_9fa48("1400"), set => stryMutAct_9fa48("1401") ? {} : (stryCov_9fa48("1401"), {
      entries: stryMutAct_9fa48("1402") ? ["Stryker was here"] : (stryCov_9fa48("1402"), []),
      isLoading: stryMutAct_9fa48("1403") ? true : (stryCov_9fa48("1403"), false),
      error: null,
      setEntries: stryMutAct_9fa48("1404") ? () => undefined : (stryCov_9fa48("1404"), entries => set(stryMutAct_9fa48("1405") ? {} : (stryCov_9fa48("1405"), {
        entries
      }))),
      setLoading: stryMutAct_9fa48("1406") ? () => undefined : (stryCov_9fa48("1406"), loading => set(stryMutAct_9fa48("1407") ? {} : (stryCov_9fa48("1407"), {
        isLoading: loading
      }))),
      setError: stryMutAct_9fa48("1408") ? () => undefined : (stryCov_9fa48("1408"), error => set(stryMutAct_9fa48("1409") ? {} : (stryCov_9fa48("1409"), {
        error
      }))),
      clearEntries: stryMutAct_9fa48("1410") ? () => undefined : (stryCov_9fa48("1410"), () => set(stryMutAct_9fa48("1411") ? {} : (stryCov_9fa48("1411"), {
        entries: stryMutAct_9fa48("1412") ? ["Stryker was here"] : (stryCov_9fa48("1412"), []),
        error: null
      })))
    })));
  }
};