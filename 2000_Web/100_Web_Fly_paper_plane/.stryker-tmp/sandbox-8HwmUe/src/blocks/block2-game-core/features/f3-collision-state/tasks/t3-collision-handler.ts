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
export class CollisionHandler {
  private collisionCallback: ((id: string) => void) | null = null;
  private checkpointCallback: ((id: string) => void) | null = null;
  public onCollision(callback: (id: string) => void): void {
    if (stryMutAct_9fa48("1199")) {
      {}
    } else {
      stryCov_9fa48("1199");
      this.collisionCallback = callback;
    }
  }
  public onCheckpoint(callback: (id: string) => void): void {
    if (stryMutAct_9fa48("1200")) {
      {}
    } else {
      stryCov_9fa48("1200");
      this.checkpointCallback = callback;
    }
  }
  public handleCollision(obstacleId: string): void {
    if (stryMutAct_9fa48("1201")) {
      {}
    } else {
      stryCov_9fa48("1201");
      if (stryMutAct_9fa48("1203") ? false : stryMutAct_9fa48("1202") ? true : (stryCov_9fa48("1202", "1203"), this.collisionCallback)) {
        if (stryMutAct_9fa48("1204")) {
          {}
        } else {
          stryCov_9fa48("1204");
          this.collisionCallback(obstacleId);
        }
      }
    }
  }
  public handleCheckpoint(checkpointId: string): void {
    if (stryMutAct_9fa48("1205")) {
      {}
    } else {
      stryCov_9fa48("1205");
      if (stryMutAct_9fa48("1207") ? false : stryMutAct_9fa48("1206") ? true : (stryCov_9fa48("1206", "1207"), this.checkpointCallback)) {
        if (stryMutAct_9fa48("1208")) {
          {}
        } else {
          stryCov_9fa48("1208");
          this.checkpointCallback(checkpointId);
        }
      }
    }
  }
}