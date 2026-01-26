/**
 * Task 3.1.4: Auth Controller
 *
 * Coordinates authentication flow:
 * - Validate and login
 * - Auto-login from localStorage
 * - Logout and clear storage
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
import { EmailValidator } from './t1-email-validator';
import { LocalStorageManager } from './t3-local-storage-manager';
import type { AuthState } from './t2-auth-state-store';
export interface LoginResult {
  success: boolean;
  error?: string;
}
export class AuthController {
  private validator: EmailValidator;
  private storage: LocalStorageManager;
  private store: ReturnType<() => {
    getState: () => AuthState;
    setState: (state: Partial<AuthState>) => void;
    subscribe: (callback: (state: AuthState) => void) => () => void;
  }>;
  constructor(store: ReturnType<() => {
    getState: () => AuthState;
    setState: (state: Partial<AuthState>) => void;
    subscribe: (callback: (state: AuthState) => void) => () => void;
  }>) {
    if (stryMutAct_9fa48("1296")) {
      {}
    } else {
      stryCov_9fa48("1296");
      this.validator = new EmailValidator();
      this.storage = new LocalStorageManager();
      this.store = store;
    }
  }

  /**
   * Login with email validation
   */
  public login(email: string): LoginResult {
    if (stryMutAct_9fa48("1297")) {
      {}
    } else {
      stryCov_9fa48("1297");
      const validation = this.validator.validate(email);
      if (stryMutAct_9fa48("1300") ? false : stryMutAct_9fa48("1299") ? true : stryMutAct_9fa48("1298") ? validation.isValid : (stryCov_9fa48("1298", "1299", "1300"), !validation.isValid)) {
        if (stryMutAct_9fa48("1301")) {
          {}
        } else {
          stryCov_9fa48("1301");
          return stryMutAct_9fa48("1302") ? {} : (stryCov_9fa48("1302"), {
            success: stryMutAct_9fa48("1303") ? true : (stryCov_9fa48("1303"), false),
            error: stryMutAct_9fa48("1306") ? validation.error && 'Invalid email' : stryMutAct_9fa48("1305") ? false : stryMutAct_9fa48("1304") ? true : (stryCov_9fa48("1304", "1305", "1306"), validation.error || (stryMutAct_9fa48("1307") ? "" : (stryCov_9fa48("1307"), 'Invalid email')))
          });
        }
      }

      // Update store
      this.store.getState().login(email);

      // Save to localStorage
      this.storage.saveEmail(email);
      return stryMutAct_9fa48("1308") ? {} : (stryCov_9fa48("1308"), {
        success: stryMutAct_9fa48("1309") ? false : (stryCov_9fa48("1309"), true)
      });
    }
  }

  /**
   * Auto-login from localStorage
   */
  public autoLogin(): boolean {
    if (stryMutAct_9fa48("1310")) {
      {}
    } else {
      stryCov_9fa48("1310");
      const email = this.storage.loadEmail();
      if (stryMutAct_9fa48("1313") ? false : stryMutAct_9fa48("1312") ? true : stryMutAct_9fa48("1311") ? email : (stryCov_9fa48("1311", "1312", "1313"), !email)) {
        if (stryMutAct_9fa48("1314")) {
          {}
        } else {
          stryCov_9fa48("1314");
          return stryMutAct_9fa48("1315") ? true : (stryCov_9fa48("1315"), false);
        }
      }
      const validation = this.validator.validate(email);
      if (stryMutAct_9fa48("1318") ? false : stryMutAct_9fa48("1317") ? true : stryMutAct_9fa48("1316") ? validation.isValid : (stryCov_9fa48("1316", "1317", "1318"), !validation.isValid)) {
        if (stryMutAct_9fa48("1319")) {
          {}
        } else {
          stryCov_9fa48("1319");
          this.storage.clearEmail();
          return stryMutAct_9fa48("1320") ? true : (stryCov_9fa48("1320"), false);
        }
      }
      this.store.getState().login(email);
      return stryMutAct_9fa48("1321") ? false : (stryCov_9fa48("1321"), true);
    }
  }

  /**
   * Logout and clear storage
   */
  public logout(): void {
    if (stryMutAct_9fa48("1322")) {
      {}
    } else {
      stryCov_9fa48("1322");
      this.store.getState().logout();
      this.storage.clearEmail();
    }
  }

  /**
   * Get current logged-in user email
   */
  public getCurrentUser(): string | null {
    if (stryMutAct_9fa48("1323")) {
      {}
    } else {
      stryCov_9fa48("1323");
      return this.store.getState().email;
    }
  }
}