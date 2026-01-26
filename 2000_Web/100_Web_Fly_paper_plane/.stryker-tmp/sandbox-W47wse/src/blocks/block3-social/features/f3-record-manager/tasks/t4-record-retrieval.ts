/**
 * Task 3.3.4: Record Retrieval
 *
 * Retrieves and processes records:
 * - Get top N records
 * - Sort by time (fastest first)
 * - Filter by criteria
 * - Get user rank
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
import type { GameRecord } from './t3-record-storage';
export interface RankedRecord extends GameRecord {
  rank: number;
}
export class RecordRetrieval {
  /**
   * Gets top N records sorted by time
   */
  public getTopRecords(records: GameRecord[], count: number): GameRecord[] {
    if (stryMutAct_9fa48("1554")) {
      {}
    } else {
      stryCov_9fa48("1554");
      const sorted = this.sortByTime(records);
      return stryMutAct_9fa48("1555") ? sorted : (stryCov_9fa48("1555"), sorted.slice(0, count));
    }
  }

  /**
   * Sorts records by time (fastest first)
   */
  public sortByTime(records: GameRecord[]): GameRecord[] {
    if (stryMutAct_9fa48("1556")) {
      {}
    } else {
      stryCov_9fa48("1556");
      return stryMutAct_9fa48("1557") ? [...records] : (stryCov_9fa48("1557"), (stryMutAct_9fa48("1558") ? [] : (stryCov_9fa48("1558"), [...records])).sort(stryMutAct_9fa48("1559") ? () => undefined : (stryCov_9fa48("1559"), (a, b) => stryMutAct_9fa48("1560") ? a.time + b.time : (stryCov_9fa48("1560"), a.time - b.time))));
    }
  }

  /**
   * Gets user's rank (1-indexed)
   */
  public getUserRank(email: string, records: GameRecord[]): number | null {
    if (stryMutAct_9fa48("1561")) {
      {}
    } else {
      stryCov_9fa48("1561");
      const sorted = this.sortByTime(records);
      const index = sorted.findIndex(stryMutAct_9fa48("1562") ? () => undefined : (stryCov_9fa48("1562"), r => stryMutAct_9fa48("1565") ? r.email !== email : stryMutAct_9fa48("1564") ? false : stryMutAct_9fa48("1563") ? true : (stryCov_9fa48("1563", "1564", "1565"), r.email === email)));
      if (stryMutAct_9fa48("1568") ? index !== -1 : stryMutAct_9fa48("1567") ? false : stryMutAct_9fa48("1566") ? true : (stryCov_9fa48("1566", "1567", "1568"), index === (stryMutAct_9fa48("1569") ? +1 : (stryCov_9fa48("1569"), -1)))) {
        if (stryMutAct_9fa48("1570")) {
          {}
        } else {
          stryCov_9fa48("1570");
          return null;
        }
      }
      return stryMutAct_9fa48("1571") ? index - 1 : (stryCov_9fa48("1571"), index + 1); // 1-indexed rank
    }
  }

  /**
   * Filters records by maximum time threshold
   */
  public filterByMaxTime(records: GameRecord[], maxTime: number): GameRecord[] {
    if (stryMutAct_9fa48("1572")) {
      {}
    } else {
      stryCov_9fa48("1572");
      return stryMutAct_9fa48("1573") ? records : (stryCov_9fa48("1573"), records.filter(stryMutAct_9fa48("1574") ? () => undefined : (stryCov_9fa48("1574"), r => stryMutAct_9fa48("1578") ? r.time > maxTime : stryMutAct_9fa48("1577") ? r.time < maxTime : stryMutAct_9fa48("1576") ? false : stryMutAct_9fa48("1575") ? true : (stryCov_9fa48("1575", "1576", "1577", "1578"), r.time <= maxTime))));
    }
  }

  /**
   * Gets records with rank assigned
   */
  public getRecordsWithRank(records: GameRecord[]): RankedRecord[] {
    if (stryMutAct_9fa48("1579")) {
      {}
    } else {
      stryCov_9fa48("1579");
      const sorted = this.sortByTime(records);
      return sorted.map(stryMutAct_9fa48("1580") ? () => undefined : (stryCov_9fa48("1580"), (record, index) => stryMutAct_9fa48("1581") ? {} : (stryCov_9fa48("1581"), {
        ...record,
        rank: stryMutAct_9fa48("1582") ? index - 1 : (stryCov_9fa48("1582"), index + 1)
      })));
    }
  }
}