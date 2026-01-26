/**
 * Task 1.3.4: Camera Smooth Movement
 *
 * Implements smooth camera transitions using interpolation:
 * - Position smoothing: Linear interpolation (lerp)
 * - Rotation smoothing: Spherical linear interpolation (slerp)
 * - Frame-independent smoothing with configurable smooth time
 *
 * @example
 * const controller = new CameraSmoothController(camera, { smoothTime: 0.2 })
 * // In render loop:
 * controller.smoothTo(targetPosition, targetRotation, deltaTime)
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
export interface SmoothConfig {
  smoothTime?: number;
}

// Default smooth time in seconds (Explicit)
export const DEFAULT_SMOOTH_TIME = 0.2;

// Smooth time limits (Explicit)
const MIN_SMOOTH_TIME = 0.01;
const MAX_SMOOTH_TIME = 5.0;
export class CameraSmoothController {
  private camera: THREE.PerspectiveCamera;
  private smoothTime: number;
  constructor(camera: THREE.PerspectiveCamera, config: SmoothConfig = {}) {
    if (stryMutAct_9fa48("487")) {
      {}
    } else {
      stryCov_9fa48("487");
      this.camera = camera;
      this.smoothTime = (stryMutAct_9fa48("490") ? config.smoothTime === undefined : stryMutAct_9fa48("489") ? false : stryMutAct_9fa48("488") ? true : (stryCov_9fa48("488", "489", "490"), config.smoothTime !== undefined)) ? config.smoothTime : DEFAULT_SMOOTH_TIME;
    }
  }
  public getCamera(): THREE.PerspectiveCamera {
    if (stryMutAct_9fa48("491")) {
      {}
    } else {
      stryCov_9fa48("491");
      return this.camera;
    }
  }
  public setCamera(camera: THREE.PerspectiveCamera): void {
    if (stryMutAct_9fa48("492")) {
      {}
    } else {
      stryCov_9fa48("492");
      this.camera = camera;
    }
  }
  public getSmoothTime(): number {
    if (stryMutAct_9fa48("493")) {
      {}
    } else {
      stryCov_9fa48("493");
      return this.smoothTime;
    }
  }
  public setSmoothTime(smoothTime: number): void {
    if (stryMutAct_9fa48("494")) {
      {}
    } else {
      stryCov_9fa48("494");
      this.smoothTime = stryMutAct_9fa48("495") ? Math.min(MIN_SMOOTH_TIME, Math.min(MAX_SMOOTH_TIME, smoothTime)) : (stryCov_9fa48("495"), Math.max(MIN_SMOOTH_TIME, stryMutAct_9fa48("496") ? Math.max(MAX_SMOOTH_TIME, smoothTime) : (stryCov_9fa48("496"), Math.min(MAX_SMOOTH_TIME, smoothTime))));
    }
  }
  public smoothPosition(targetPosition: THREE.Vector3, deltaTime: number): void {
    if (stryMutAct_9fa48("497")) {
      {}
    } else {
      stryCov_9fa48("497");
      if (stryMutAct_9fa48("501") ? deltaTime > 0 : stryMutAct_9fa48("500") ? deltaTime < 0 : stryMutAct_9fa48("499") ? false : stryMutAct_9fa48("498") ? true : (stryCov_9fa48("498", "499", "500", "501"), deltaTime <= 0)) return;

      // Calculate frame-independent lerp factor: t = 1 - exp(-deltaTime / smoothTime)
      // This ensures consistent smoothing regardless of frame rate
      const t = stryMutAct_9fa48("502") ? 1 + Math.exp(-deltaTime / this.smoothTime) : (stryCov_9fa48("502"), 1 - Math.exp(stryMutAct_9fa48("503") ? -deltaTime * this.smoothTime : (stryCov_9fa48("503"), (stryMutAct_9fa48("504") ? +deltaTime : (stryCov_9fa48("504"), -deltaTime)) / this.smoothTime)));

      // Linear interpolation: current + (target - current) * t
      this.camera.position.lerp(targetPosition, t);
    }
  }
  public smoothRotation(targetRotation: THREE.Quaternion, deltaTime: number): void {
    if (stryMutAct_9fa48("505")) {
      {}
    } else {
      stryCov_9fa48("505");
      if (stryMutAct_9fa48("509") ? deltaTime > 0 : stryMutAct_9fa48("508") ? deltaTime < 0 : stryMutAct_9fa48("507") ? false : stryMutAct_9fa48("506") ? true : (stryCov_9fa48("506", "507", "508", "509"), deltaTime <= 0)) return;

      // Calculate frame-independent slerp factor
      const t = stryMutAct_9fa48("510") ? 1 + Math.exp(-deltaTime / this.smoothTime) : (stryCov_9fa48("510"), 1 - Math.exp(stryMutAct_9fa48("511") ? -deltaTime * this.smoothTime : (stryCov_9fa48("511"), (stryMutAct_9fa48("512") ? +deltaTime : (stryCov_9fa48("512"), -deltaTime)) / this.smoothTime)));

      // Spherical linear interpolation for smooth rotation
      this.camera.quaternion.slerp(targetRotation, t);
    }
  }
  public smoothTo(targetPosition: THREE.Vector3, targetRotation: THREE.Quaternion, deltaTime: number): void {
    if (stryMutAct_9fa48("513")) {
      {}
    } else {
      stryCov_9fa48("513");
      this.smoothPosition(targetPosition, deltaTime);
      this.smoothRotation(targetRotation, deltaTime);
    }
  }
  public update(targetPosition: THREE.Vector3, targetRotation: THREE.Quaternion, deltaTime: number): void {
    if (stryMutAct_9fa48("514")) {
      {}
    } else {
      stryCov_9fa48("514");
      this.smoothTo(targetPosition, targetRotation, deltaTime);
    }
  }
}