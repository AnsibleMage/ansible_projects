/**
 * Task 1.3.3: Camera Offset and Distance Control
 *
 * Manages camera position relative to target with offset and distance:
 * - Offset: Relative position (x, y, z) from target in local space
 * - Distance: Overall distance from target (zoom control)
 * - Rotated Offset: Offset follows target orientation
 *
 * @example
 * const controller = new CameraOffsetController(camera, planeObject)
 * controller.setOffset(0, 3, 8) // Behind and above
 * controller.setDistance(10)
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
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}
export interface OffsetConfig {
  offset?: Vec3;
  distance?: number;
}

// Default offset: Behind and above target (Explicit)
export const DEFAULT_OFFSET: Vec3 = stryMutAct_9fa48("460") ? {} : (stryCov_9fa48("460"), {
  x: 0,
  y: 3,
  // Above
  z: 8 // Behind
});

// Default distance from target (Explicit)
export const DEFAULT_DISTANCE = 10;

// Distance limits (Explicit)
export const MIN_DISTANCE = 0.1;
export const MAX_DISTANCE = 1000;
export class CameraOffsetController {
  private camera: THREE.PerspectiveCamera;
  private target: THREE.Object3D;
  private offset: THREE.Vector3;
  private distance: number;
  private initialOffset: THREE.Vector3;
  private initialDistance: number;
  constructor(camera: THREE.PerspectiveCamera, target: THREE.Object3D, config: OffsetConfig = {}) {
    if (stryMutAct_9fa48("461")) {
      {}
    } else {
      stryCov_9fa48("461");
      this.camera = camera;
      this.target = target;
      const offsetConfig = stryMutAct_9fa48("464") ? config.offset && DEFAULT_OFFSET : stryMutAct_9fa48("463") ? false : stryMutAct_9fa48("462") ? true : (stryCov_9fa48("462", "463", "464"), config.offset || DEFAULT_OFFSET);
      this.offset = new THREE.Vector3(offsetConfig.x, offsetConfig.y, offsetConfig.z);
      this.initialOffset = this.offset.clone();
      this.distance = (stryMutAct_9fa48("467") ? config.distance === undefined : stryMutAct_9fa48("466") ? false : stryMutAct_9fa48("465") ? true : (stryCov_9fa48("465", "466", "467"), config.distance !== undefined)) ? config.distance : DEFAULT_DISTANCE;
      this.initialDistance = this.distance;
    }
  }
  public getOffset(): Vec3 {
    if (stryMutAct_9fa48("468")) {
      {}
    } else {
      stryCov_9fa48("468");
      return stryMutAct_9fa48("469") ? {} : (stryCov_9fa48("469"), {
        x: this.offset.x,
        y: this.offset.y,
        z: this.offset.z
      });
    }
  }
  public setOffset(x: number, y: number, z: number): void {
    if (stryMutAct_9fa48("470")) {
      {}
    } else {
      stryCov_9fa48("470");
      this.offset.set(x, y, z);
      // Update distance to match new offset length
      const newLength = this.offset.length();
      if (stryMutAct_9fa48("474") ? newLength <= 0 : stryMutAct_9fa48("473") ? newLength >= 0 : stryMutAct_9fa48("472") ? false : stryMutAct_9fa48("471") ? true : (stryCov_9fa48("471", "472", "473", "474"), newLength > 0)) {
        if (stryMutAct_9fa48("475")) {
          {}
        } else {
          stryCov_9fa48("475");
          this.distance = newLength;
        }
      }
    }
  }
  public getDistance(): number {
    if (stryMutAct_9fa48("476")) {
      {}
    } else {
      stryCov_9fa48("476");
      return this.distance;
    }
  }
  public setDistance(distance: number): void {
    if (stryMutAct_9fa48("477")) {
      {}
    } else {
      stryCov_9fa48("477");
      this.distance = stryMutAct_9fa48("478") ? Math.min(MIN_DISTANCE, Math.min(MAX_DISTANCE, distance)) : (stryCov_9fa48("478"), Math.max(MIN_DISTANCE, stryMutAct_9fa48("479") ? Math.max(MAX_DISTANCE, distance) : (stryCov_9fa48("479"), Math.min(MAX_DISTANCE, distance))));
    }
  }
  public zoomIn(amount: number): void {
    if (stryMutAct_9fa48("480")) {
      {}
    } else {
      stryCov_9fa48("480");
      this.setDistance(stryMutAct_9fa48("481") ? this.distance + amount : (stryCov_9fa48("481"), this.distance - amount));
    }
  }
  public zoomOut(amount: number): void {
    if (stryMutAct_9fa48("482")) {
      {}
    } else {
      stryCov_9fa48("482");
      this.setDistance(stryMutAct_9fa48("483") ? this.distance - amount : (stryCov_9fa48("483"), this.distance + amount));
    }
  }
  public updatePosition(): void {
    if (stryMutAct_9fa48("484")) {
      {}
    } else {
      stryCov_9fa48("484");
      // Transform offset from target's local space to world space
      // Note: conjugate() is required because Three.js applyQuaternion()
      // applies inverse transform. Conjugate reverses this to get correct
      // local-to-world transformation for camera positioning
      const rotatedOffset = this.offset.clone().applyQuaternion(this.target.quaternion.clone().conjugate());

      // Normalize direction and scale by distance for zoom control
      const direction = rotatedOffset.normalize();
      const scaledOffset = direction.multiplyScalar(this.distance);

      // Position camera: target position + scaled world-space offset
      this.camera.position.copy(this.target.position).add(scaledOffset);
    }
  }
  public update(): void {
    if (stryMutAct_9fa48("485")) {
      {}
    } else {
      stryCov_9fa48("485");
      this.updatePosition();
    }
  }
  public reset(): void {
    if (stryMutAct_9fa48("486")) {
      {}
    } else {
      stryCov_9fa48("486");
      this.offset.copy(this.initialOffset);
      this.distance = this.initialDistance;
    }
  }
}