/**
 * Task 1.2.4: Gravity and Inertia Handling
 *
 * Manages damping effects to simulate air resistance and inertia:
 * - Linear Damping: Reduces linear velocity (0-1, 0=no damping, 1=instant stop)
 * - Angular Damping: Reduces angular velocity (0-1, 0=no damping, 1=instant stop)
 * - Gravity: Applied by physics world (verified)
 *
 * @example
 * const manager = new GravityInertiaManager(planeBody)
 * manager.applyDamping()
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
import * as CANNON from 'cannon-es';
export interface DampingConfig {
  linearDamping?: number;
  angularDamping?: number;
}

// Default damping constants (Explicit, Adaptive)
export const DEFAULT_LINEAR_DAMPING = 0.1; // Low air resistance (0-1)
export const DEFAULT_ANGULAR_DAMPING = 0.3; // Medium rotational resistance (0-1)

export class GravityInertiaManager {
  private body: CANNON.Body;
  private linearDamping: number;
  private angularDamping: number;
  constructor(body: CANNON.Body, config: DampingConfig = {}) {
    if (stryMutAct_9fa48("358")) {
      {}
    } else {
      stryCov_9fa48("358");
      this.body = body;
      this.linearDamping = (stryMutAct_9fa48("361") ? config.linearDamping === undefined : stryMutAct_9fa48("360") ? false : stryMutAct_9fa48("359") ? true : (stryCov_9fa48("359", "360", "361"), config.linearDamping !== undefined)) ? config.linearDamping : DEFAULT_LINEAR_DAMPING;
      this.angularDamping = (stryMutAct_9fa48("364") ? config.angularDamping === undefined : stryMutAct_9fa48("363") ? false : stryMutAct_9fa48("362") ? true : (stryCov_9fa48("362", "363", "364"), config.angularDamping !== undefined)) ? config.angularDamping : DEFAULT_ANGULAR_DAMPING;

      // Clamp to [0, 1]
      this.linearDamping = stryMutAct_9fa48("365") ? Math.min(0, Math.min(1, this.linearDamping)) : (stryCov_9fa48("365"), Math.max(0, stryMutAct_9fa48("366") ? Math.max(1, this.linearDamping) : (stryCov_9fa48("366"), Math.min(1, this.linearDamping))));
      this.angularDamping = stryMutAct_9fa48("367") ? Math.min(0, Math.min(1, this.angularDamping)) : (stryCov_9fa48("367"), Math.max(0, stryMutAct_9fa48("368") ? Math.max(1, this.angularDamping) : (stryCov_9fa48("368"), Math.min(1, this.angularDamping))));
    }
  }
  public applyDamping(): void {
    if (stryMutAct_9fa48("369")) {
      {}
    } else {
      stryCov_9fa48("369");
      this.body.linearDamping = this.linearDamping;
      this.body.angularDamping = this.angularDamping;
    }
  }
  public getDampingConfig(): DampingConfig {
    if (stryMutAct_9fa48("370")) {
      {}
    } else {
      stryCov_9fa48("370");
      return stryMutAct_9fa48("371") ? {} : (stryCov_9fa48("371"), {
        linearDamping: this.linearDamping,
        angularDamping: this.angularDamping
      });
    }
  }
  public setDamping(linearDamping: number, angularDamping: number): void {
    if (stryMutAct_9fa48("372")) {
      {}
    } else {
      stryCov_9fa48("372");
      // Clamp to [0, 1]
      this.linearDamping = stryMutAct_9fa48("373") ? Math.min(0, Math.min(1, linearDamping)) : (stryCov_9fa48("373"), Math.max(0, stryMutAct_9fa48("374") ? Math.max(1, linearDamping) : (stryCov_9fa48("374"), Math.min(1, linearDamping))));
      this.angularDamping = stryMutAct_9fa48("375") ? Math.min(0, Math.min(1, angularDamping)) : (stryCov_9fa48("375"), Math.max(0, stryMutAct_9fa48("376") ? Math.max(1, angularDamping) : (stryCov_9fa48("376"), Math.min(1, angularDamping))));
      this.applyDamping();
    }
  }
}