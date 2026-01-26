/**
 * Task 3.1.3: Local Storage Manager
 *
 * Persists user email in browser localStorage:
 * - Save email for auto-login
 * - Load saved email
 * - Clear email on logout
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
const EMAIL_STORAGE_KEY = stryMutAct_9fa48("1288") ? "" : (stryCov_9fa48("1288"), 'userEmail');
export class LocalStorageManager {
  /**
   * Saves email to localStorage
   */
  public saveEmail(email: string): void {
    if (stryMutAct_9fa48("1289")) {
      {}
    } else {
      stryCov_9fa48("1289");
      localStorage.setItem(EMAIL_STORAGE_KEY, email);
    }
  }

  /**
   * Loads email from localStorage
   */
  public loadEmail(): string | null {
    if (stryMutAct_9fa48("1290")) {
      {}
    } else {
      stryCov_9fa48("1290");
      return localStorage.getItem(EMAIL_STORAGE_KEY);
    }
  }

  /**
   * Clears email from localStorage
   */
  public clearEmail(): void {
    if (stryMutAct_9fa48("1291")) {
      {}
    } else {
      stryCov_9fa48("1291");
      localStorage.removeItem(EMAIL_STORAGE_KEY);
    }
  }

  /**
   * Checks if email is saved
   */
  public hasSavedEmail(): boolean {
    if (stryMutAct_9fa48("1292")) {
      {}
    } else {
      stryCov_9fa48("1292");
      return stryMutAct_9fa48("1295") ? localStorage.getItem(EMAIL_STORAGE_KEY) === null : stryMutAct_9fa48("1294") ? false : stryMutAct_9fa48("1293") ? true : (stryCov_9fa48("1293", "1294", "1295"), localStorage.getItem(EMAIL_STORAGE_KEY) !== null);
    }
  }
}