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
export type GameState = 'menu' | 'playing' | 'paused' | 'finished';
export class GameStateMachine {
  private state: GameState = stryMutAct_9fa48("1177") ? "" : (stryCov_9fa48("1177"), 'menu');
  public getState(): GameState {
    if (stryMutAct_9fa48("1178")) {
      {}
    } else {
      stryCov_9fa48("1178");
      return this.state;
    }
  }
  public start(): void {
    if (stryMutAct_9fa48("1179")) {
      {}
    } else {
      stryCov_9fa48("1179");
      this.state = stryMutAct_9fa48("1180") ? "" : (stryCov_9fa48("1180"), 'playing');
    }
  }
  public pause(): void {
    if (stryMutAct_9fa48("1181")) {
      {}
    } else {
      stryCov_9fa48("1181");
      if (stryMutAct_9fa48("1184") ? this.state !== 'playing' : stryMutAct_9fa48("1183") ? false : stryMutAct_9fa48("1182") ? true : (stryCov_9fa48("1182", "1183", "1184"), this.state === (stryMutAct_9fa48("1185") ? "" : (stryCov_9fa48("1185"), 'playing')))) {
        if (stryMutAct_9fa48("1186")) {
          {}
        } else {
          stryCov_9fa48("1186");
          this.state = stryMutAct_9fa48("1187") ? "" : (stryCov_9fa48("1187"), 'paused');
        }
      }
    }
  }
  public resume(): void {
    if (stryMutAct_9fa48("1188")) {
      {}
    } else {
      stryCov_9fa48("1188");
      if (stryMutAct_9fa48("1191") ? this.state !== 'paused' : stryMutAct_9fa48("1190") ? false : stryMutAct_9fa48("1189") ? true : (stryCov_9fa48("1189", "1190", "1191"), this.state === (stryMutAct_9fa48("1192") ? "" : (stryCov_9fa48("1192"), 'paused')))) {
        if (stryMutAct_9fa48("1193")) {
          {}
        } else {
          stryCov_9fa48("1193");
          this.state = stryMutAct_9fa48("1194") ? "" : (stryCov_9fa48("1194"), 'playing');
        }
      }
    }
  }
  public finish(): void {
    if (stryMutAct_9fa48("1195")) {
      {}
    } else {
      stryCov_9fa48("1195");
      this.state = stryMutAct_9fa48("1196") ? "" : (stryCov_9fa48("1196"), 'finished');
    }
  }
  public reset(): void {
    if (stryMutAct_9fa48("1197")) {
      {}
    } else {
      stryCov_9fa48("1197");
      this.state = stryMutAct_9fa48("1198") ? "" : (stryCov_9fa48("1198"), 'menu');
    }
  }
}