/**
 * Task 3.2.5: Leaderboard Container
 *
 * Container component that integrates:
 * - Leaderboard state from store
 * - Loading state display
 * - Error state display
 * - Leaderboard table rendering
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
import { useEffect, useState } from 'react';
import { LeaderboardTable } from './t2-leaderboard-table';
import type { LeaderboardState } from './t4-leaderboard-state-store';
import type { LeaderboardEntry } from './t1-leaderboard-data-model';
export interface LeaderboardContainerProps {
  store: ReturnType<() => {
    getState: () => LeaderboardState;
    setState: (state: Partial<LeaderboardState>) => void;
    subscribe: (callback: (state: LeaderboardState) => void) => () => void;
  }>;
}
export function LeaderboardContainer({
  store
}: LeaderboardContainerProps) {
  if (stryMutAct_9fa48("1413")) {
    {}
  } else {
    stryCov_9fa48("1413");
    const [isLoading, setIsLoading] = useState(store.getState().isLoading);
    const [error, setError] = useState(store.getState().error);
    const [entries, setEntries] = useState<LeaderboardEntry[]>(store.getState().entries);

    // Subscribe to store changes
    useEffect(() => {
      if (stryMutAct_9fa48("1414")) {
        {}
      } else {
        stryCov_9fa48("1414");
        const unsubscribe = store.subscribe(state => {
          if (stryMutAct_9fa48("1415")) {
            {}
          } else {
            stryCov_9fa48("1415");
            setIsLoading(state.isLoading);
            setError(state.error);
            setEntries(state.entries);
          }
        });
        return stryMutAct_9fa48("1416") ? () => undefined : (stryCov_9fa48("1416"), () => unsubscribe());
      }
    }, stryMutAct_9fa48("1417") ? [] : (stryCov_9fa48("1417"), [store]));

    // Priority: Loading > Error > Content
    if (stryMutAct_9fa48("1419") ? false : stryMutAct_9fa48("1418") ? true : (stryCov_9fa48("1418", "1419"), isLoading)) {
      if (stryMutAct_9fa48("1420")) {
        {}
      } else {
        stryCov_9fa48("1420");
        return <div>Loading...</div>;
      }
    }
    if (stryMutAct_9fa48("1422") ? false : stryMutAct_9fa48("1421") ? true : (stryCov_9fa48("1421", "1422"), error)) {
      if (stryMutAct_9fa48("1423")) {
        {}
      } else {
        stryCov_9fa48("1423");
        return <div>Error: {error}</div>;
      }
    }
    return <div>
      <h2>Leaderboard</h2>
      <LeaderboardTable entries={entries} />
    </div>;
  }
}