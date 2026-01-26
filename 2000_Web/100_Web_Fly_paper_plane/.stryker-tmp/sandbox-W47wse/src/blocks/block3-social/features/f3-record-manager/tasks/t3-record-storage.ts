/**
 * Task 3.3.3: Record Storage
 *
 * Manages record storage in localStorage:
 * - Save new records
 * - Update existing records
 * - Load all records
 * - Clear records
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
export interface GameRecord {
  email: string;
  time: number;
  date: Date;
}
const STORAGE_KEY = stryMutAct_9fa48("1521") ? "" : (stryCov_9fa48("1521"), 'gameRecords');
export class RecordStorage {
  /**
   * Saves a record to localStorage
   * Updates existing record if email matches
   */
  public saveRecord(record: GameRecord): void {
    if (stryMutAct_9fa48("1522")) {
      {}
    } else {
      stryCov_9fa48("1522");
      const records = this.getAllRecords();
      const existingIndex = records.findIndex(stryMutAct_9fa48("1523") ? () => undefined : (stryCov_9fa48("1523"), r => stryMutAct_9fa48("1526") ? r.email !== record.email : stryMutAct_9fa48("1525") ? false : stryMutAct_9fa48("1524") ? true : (stryCov_9fa48("1524", "1525", "1526"), r.email === record.email)));
      if (stryMutAct_9fa48("1530") ? existingIndex < 0 : stryMutAct_9fa48("1529") ? existingIndex > 0 : stryMutAct_9fa48("1528") ? false : stryMutAct_9fa48("1527") ? true : (stryCov_9fa48("1527", "1528", "1529", "1530"), existingIndex >= 0)) {
        if (stryMutAct_9fa48("1531")) {
          {}
        } else {
          stryCov_9fa48("1531");
          // Update existing record
          records[existingIndex] = record;
        }
      } else {
        if (stryMutAct_9fa48("1532")) {
          {}
        } else {
          stryCov_9fa48("1532");
          // Add new record
          records.push(record);
        }
      }
      this.saveToLocalStorage(records);
    }
  }

  /**
   * Gets all records from localStorage
   */
  public getAllRecords(): GameRecord[] {
    if (stryMutAct_9fa48("1533")) {
      {}
    } else {
      stryCov_9fa48("1533");
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stryMutAct_9fa48("1536") ? false : stryMutAct_9fa48("1535") ? true : stryMutAct_9fa48("1534") ? stored : (stryCov_9fa48("1534", "1535", "1536"), !stored)) {
        if (stryMutAct_9fa48("1537")) {
          {}
        } else {
          stryCov_9fa48("1537");
          return stryMutAct_9fa48("1538") ? ["Stryker was here"] : (stryCov_9fa48("1538"), []);
        }
      }
      try {
        if (stryMutAct_9fa48("1539")) {
          {}
        } else {
          stryCov_9fa48("1539");
          const parsed = JSON.parse(stored);
          // Convert date strings back to Date objects
          return parsed.map(stryMutAct_9fa48("1540") ? () => undefined : (stryCov_9fa48("1540"), (record: any) => stryMutAct_9fa48("1541") ? {} : (stryCov_9fa48("1541"), {
            ...record,
            date: new Date(record.date)
          })));
        }
      } catch {
        if (stryMutAct_9fa48("1542")) {
          {}
        } else {
          stryCov_9fa48("1542");
          return stryMutAct_9fa48("1543") ? ["Stryker was here"] : (stryCov_9fa48("1543"), []);
        }
      }
    }
  }

  /**
   * Gets a specific user's record
   */
  public getUserRecord(email: string): GameRecord | null {
    if (stryMutAct_9fa48("1544")) {
      {}
    } else {
      stryCov_9fa48("1544");
      const records = this.getAllRecords();
      const userRecord = records.find(stryMutAct_9fa48("1545") ? () => undefined : (stryCov_9fa48("1545"), r => stryMutAct_9fa48("1548") ? r.email !== email : stryMutAct_9fa48("1547") ? false : stryMutAct_9fa48("1546") ? true : (stryCov_9fa48("1546", "1547", "1548"), r.email === email)));
      return stryMutAct_9fa48("1551") ? userRecord && null : stryMutAct_9fa48("1550") ? false : stryMutAct_9fa48("1549") ? true : (stryCov_9fa48("1549", "1550", "1551"), userRecord || null);
    }
  }

  /**
   * Clears all records from localStorage
   */
  public clearRecords(): void {
    if (stryMutAct_9fa48("1552")) {
      {}
    } else {
      stryCov_9fa48("1552");
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  /**
   * Private helper to save records to localStorage
   */
  private saveToLocalStorage(records: GameRecord[]): void {
    if (stryMutAct_9fa48("1553")) {
      {}
    } else {
      stryCov_9fa48("1553");
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }
  }
}