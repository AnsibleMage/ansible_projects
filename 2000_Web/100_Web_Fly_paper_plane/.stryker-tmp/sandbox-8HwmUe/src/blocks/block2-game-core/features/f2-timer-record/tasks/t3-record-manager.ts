/**
 * Task 2.2.3: Record Manager
 *
 * Manages time records:
 * - Personal best time
 * - Record history (last 10 attempts)
 * - Record comparison and improvement
 * - Automatic best time updates
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
export interface TimeRecord {
  time: number;
  timestamp: number;
  courseId: string;
}
const MAX_HISTORY_SIZE = 10;
export class RecordManager {
  private personalBest: number | null = null;
  private history: TimeRecord[] = stryMutAct_9fa48("1029") ? ["Stryker was here"] : (stryCov_9fa48("1029"), []);

  /**
   * Sets personal best time
   */
  public setPersonalBest(time: number): void {
    if (stryMutAct_9fa48("1030")) {
      {}
    } else {
      stryCov_9fa48("1030");
      this.personalBest = time;
    }
  }

  /**
   * Gets personal best time
   */
  public getPersonalBest(): number | null {
    if (stryMutAct_9fa48("1031")) {
      {}
    } else {
      stryCov_9fa48("1031");
      return this.personalBest;
    }
  }

  /**
   * Updates personal best if new time is better
   */
  public updateIfBetter(time: number): boolean {
    if (stryMutAct_9fa48("1032")) {
      {}
    } else {
      stryCov_9fa48("1032");
      if (stryMutAct_9fa48("1035") ? this.personalBest === null && time < this.personalBest : stryMutAct_9fa48("1034") ? false : stryMutAct_9fa48("1033") ? true : (stryCov_9fa48("1033", "1034", "1035"), (stryMutAct_9fa48("1037") ? this.personalBest !== null : stryMutAct_9fa48("1036") ? false : (stryCov_9fa48("1036", "1037"), this.personalBest === null)) || (stryMutAct_9fa48("1040") ? time >= this.personalBest : stryMutAct_9fa48("1039") ? time <= this.personalBest : stryMutAct_9fa48("1038") ? false : (stryCov_9fa48("1038", "1039", "1040"), time < this.personalBest)))) {
        if (stryMutAct_9fa48("1041")) {
          {}
        } else {
          stryCov_9fa48("1041");
          this.personalBest = time;
          return stryMutAct_9fa48("1042") ? false : (stryCov_9fa48("1042"), true);
        }
      }
      return stryMutAct_9fa48("1043") ? true : (stryCov_9fa48("1043"), false);
    }
  }

  /**
   * Checks if a time is a new personal best
   */
  public isNewPersonalBest(time: number): boolean {
    if (stryMutAct_9fa48("1044")) {
      {}
    } else {
      stryCov_9fa48("1044");
      return stryMutAct_9fa48("1047") ? this.personalBest === null && time < this.personalBest : stryMutAct_9fa48("1046") ? false : stryMutAct_9fa48("1045") ? true : (stryCov_9fa48("1045", "1046", "1047"), (stryMutAct_9fa48("1049") ? this.personalBest !== null : stryMutAct_9fa48("1048") ? false : (stryCov_9fa48("1048", "1049"), this.personalBest === null)) || (stryMutAct_9fa48("1052") ? time >= this.personalBest : stryMutAct_9fa48("1051") ? time <= this.personalBest : stryMutAct_9fa48("1050") ? false : (stryCov_9fa48("1050", "1051", "1052"), time < this.personalBest)));
    }
  }

  /**
   * Calculates improvement percentage over personal best
   */
  public getImprovement(time: number): number {
    if (stryMutAct_9fa48("1053")) {
      {}
    } else {
      stryCov_9fa48("1053");
      if (stryMutAct_9fa48("1056") ? this.personalBest !== null : stryMutAct_9fa48("1055") ? false : stryMutAct_9fa48("1054") ? true : (stryCov_9fa48("1054", "1055", "1056"), this.personalBest === null)) return 0;
      const improvement = stryMutAct_9fa48("1057") ? (this.personalBest - time) / this.personalBest / 100 : (stryCov_9fa48("1057"), (stryMutAct_9fa48("1058") ? (this.personalBest - time) * this.personalBest : (stryCov_9fa48("1058"), (stryMutAct_9fa48("1059") ? this.personalBest + time : (stryCov_9fa48("1059"), this.personalBest - time)) / this.personalBest)) * 100);
      return Math.round(improvement);
    }
  }

  /**
   * Adds a record to history
   */
  public addRecord(record: TimeRecord): void {
    if (stryMutAct_9fa48("1060")) {
      {}
    } else {
      stryCov_9fa48("1060");
      this.history.push(record);

      // Limit history size
      if (stryMutAct_9fa48("1064") ? this.history.length <= MAX_HISTORY_SIZE : stryMutAct_9fa48("1063") ? this.history.length >= MAX_HISTORY_SIZE : stryMutAct_9fa48("1062") ? false : stryMutAct_9fa48("1061") ? true : (stryCov_9fa48("1061", "1062", "1063", "1064"), this.history.length > MAX_HISTORY_SIZE)) {
        if (stryMutAct_9fa48("1065")) {
          {}
        } else {
          stryCov_9fa48("1065");
          this.history = stryMutAct_9fa48("1066") ? this.history : (stryCov_9fa48("1066"), this.history.slice(stryMutAct_9fa48("1067") ? +MAX_HISTORY_SIZE : (stryCov_9fa48("1067"), -MAX_HISTORY_SIZE)));
        }
      }
    }
  }

  /**
   * Gets all records
   */
  public getHistory(): TimeRecord[] {
    if (stryMutAct_9fa48("1068")) {
      {}
    } else {
      stryCov_9fa48("1068");
      return stryMutAct_9fa48("1069") ? [] : (stryCov_9fa48("1069"), [...this.history]);
    }
  }

  /**
   * Gets records sorted by time (fastest first)
   */
  public getSortedHistory(): TimeRecord[] {
    if (stryMutAct_9fa48("1070")) {
      {}
    } else {
      stryCov_9fa48("1070");
      return stryMutAct_9fa48("1071") ? [...this.history] : (stryCov_9fa48("1071"), (stryMutAct_9fa48("1072") ? [] : (stryCov_9fa48("1072"), [...this.history])).sort(stryMutAct_9fa48("1073") ? () => undefined : (stryCov_9fa48("1073"), (a, b) => stryMutAct_9fa48("1074") ? a.time + b.time : (stryCov_9fa48("1074"), a.time - b.time))));
    }
  }

  /**
   * Resets all records
   */
  public reset(): void {
    if (stryMutAct_9fa48("1075")) {
      {}
    } else {
      stryCov_9fa48("1075");
      this.personalBest = null;
      this.history = stryMutAct_9fa48("1076") ? ["Stryker was here"] : (stryCov_9fa48("1076"), []);
    }
  }
}