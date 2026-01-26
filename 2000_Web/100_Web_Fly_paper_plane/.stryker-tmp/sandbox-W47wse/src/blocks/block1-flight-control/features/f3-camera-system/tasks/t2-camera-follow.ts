/**
 * Task 1.3.2: Camera Follow Logic
 *
 * Implements camera tracking behavior to follow a target object:
 * - LookAt target (camera orientation)
 * - Enable/disable following
 * - Target and camera management
 *
 * @example
 * const controller = new CameraFollowController(camera, planeObject)
 * controller.enable()
 * // In render loop:
 * controller.update()
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
import * as THREE from 'three';
export class CameraFollowController {
  private camera: THREE.PerspectiveCamera;
  private target: THREE.Object3D;
  private following: boolean = stryMutAct_9fa48("441") ? true : (stryCov_9fa48("441"), false);
  constructor(camera: THREE.PerspectiveCamera, target: THREE.Object3D) {
    if (stryMutAct_9fa48("442")) {
      {}
    } else {
      stryCov_9fa48("442");
      this.camera = camera;
      this.target = target;
    }
  }
  public getCamera(): THREE.PerspectiveCamera {
    if (stryMutAct_9fa48("443")) {
      {}
    } else {
      stryCov_9fa48("443");
      return this.camera;
    }
  }
  public getTarget(): THREE.Object3D {
    if (stryMutAct_9fa48("444")) {
      {}
    } else {
      stryCov_9fa48("444");
      return this.target;
    }
  }
  public setCamera(camera: THREE.PerspectiveCamera): void {
    if (stryMutAct_9fa48("445")) {
      {}
    } else {
      stryCov_9fa48("445");
      this.camera = camera;
    }
  }
  public setTarget(target: THREE.Object3D): void {
    if (stryMutAct_9fa48("446")) {
      {}
    } else {
      stryCov_9fa48("446");
      this.target = target;
    }
  }
  public enable(): void {
    if (stryMutAct_9fa48("447")) {
      {}
    } else {
      stryCov_9fa48("447");
      this.following = stryMutAct_9fa48("448") ? false : (stryCov_9fa48("448"), true);
    }
  }
  public disable(): void {
    if (stryMutAct_9fa48("449")) {
      {}
    } else {
      stryCov_9fa48("449");
      this.following = stryMutAct_9fa48("450") ? true : (stryCov_9fa48("450"), false);
    }
  }
  public toggle(): void {
    if (stryMutAct_9fa48("451")) {
      {}
    } else {
      stryCov_9fa48("451");
      this.following = stryMutAct_9fa48("452") ? this.following : (stryCov_9fa48("452"), !this.following);
    }
  }
  public isFollowing(): boolean {
    if (stryMutAct_9fa48("453")) {
      {}
    } else {
      stryCov_9fa48("453");
      return this.following;
    }
  }
  public lookAtTarget(): void {
    if (stryMutAct_9fa48("454")) {
      {}
    } else {
      stryCov_9fa48("454");
      this.camera.lookAt(this.target.position);
    }
  }
  public update(): void {
    if (stryMutAct_9fa48("455")) {
      {}
    } else {
      stryCov_9fa48("455");
      if (stryMutAct_9fa48("458") ? false : stryMutAct_9fa48("457") ? true : stryMutAct_9fa48("456") ? this.following : (stryCov_9fa48("456", "457", "458"), !this.following)) {
        if (stryMutAct_9fa48("459")) {
          {}
        } else {
          stryCov_9fa48("459");
          return;
        }
      }
      this.lookAtTarget();
    }
  }
}