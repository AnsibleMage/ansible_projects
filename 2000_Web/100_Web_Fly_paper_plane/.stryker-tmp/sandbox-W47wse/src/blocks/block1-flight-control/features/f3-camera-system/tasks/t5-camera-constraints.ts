/**
 * Task 1.3.5: Camera Constraints
 *
 * Implements camera movement and rotation constraints:
 * - Position limits: Bounds on X, Y, Z coordinates
 * - Rotation limits: Pitch and yaw angle constraints
 * - Enable/disable constraint enforcement
 *
 * @example
 * const controller = new CameraConstraintsController(camera, {
 *   positionLimits: { minY: 1, maxY: 100 },
 *   rotationLimits: { minPitch: -Math.PI/3, maxPitch: Math.PI/3 }
 * })
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
export interface PositionLimits {
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
  minZ?: number;
  maxZ?: number;
}
export interface RotationLimits {
  minPitch?: number; // X rotation (up/down)
  maxPitch?: number;
  minYaw?: number; // Y rotation (left/right)
  maxYaw?: number;
}
export interface ConstraintsConfig {
  positionLimits?: PositionLimits;
  rotationLimits?: RotationLimits;
}

// Default position limits (Explicit)
export const DEFAULT_POSITION_LIMITS: Required<PositionLimits> = stryMutAct_9fa48("515") ? {} : (stryCov_9fa48("515"), {
  minX: stryMutAct_9fa48("516") ? +500 : (stryCov_9fa48("516"), -500),
  maxX: 500,
  minY: 1,
  // Don't go below ground
  maxY: 200,
  minZ: stryMutAct_9fa48("517") ? +500 : (stryCov_9fa48("517"), -500),
  maxZ: 500
});

// Default rotation limits (Explicit)
export const DEFAULT_ROTATION_LIMITS: Required<RotationLimits> = stryMutAct_9fa48("518") ? {} : (stryCov_9fa48("518"), {
  minPitch: stryMutAct_9fa48("519") ? -Math.PI * 3 : (stryCov_9fa48("519"), (stryMutAct_9fa48("520") ? +Math.PI : (stryCov_9fa48("520"), -Math.PI)) / 3),
  // -60 degrees (don't look too far down)
  maxPitch: stryMutAct_9fa48("521") ? Math.PI * 3 : (stryCov_9fa48("521"), Math.PI / 3),
  // 60 degrees (don't look too far up)
  minYaw: stryMutAct_9fa48("522") ? +Math.PI : (stryCov_9fa48("522"), -Math.PI),
  // -180 degrees
  maxYaw: Math.PI // 180 degrees
});
export class CameraConstraintsController {
  private camera: THREE.PerspectiveCamera;
  private positionLimits: Required<PositionLimits>;
  private rotationLimits: Required<RotationLimits>;
  private enabled: boolean = stryMutAct_9fa48("523") ? false : (stryCov_9fa48("523"), true);
  constructor(camera: THREE.PerspectiveCamera, config: ConstraintsConfig = {}) {
    if (stryMutAct_9fa48("524")) {
      {}
    } else {
      stryCov_9fa48("524");
      this.camera = camera;
      this.positionLimits = stryMutAct_9fa48("525") ? {} : (stryCov_9fa48("525"), {
        ...DEFAULT_POSITION_LIMITS,
        ...config.positionLimits
      });
      this.rotationLimits = stryMutAct_9fa48("526") ? {} : (stryCov_9fa48("526"), {
        ...DEFAULT_ROTATION_LIMITS,
        ...config.rotationLimits
      });
    }
  }
  public getCamera(): THREE.PerspectiveCamera {
    if (stryMutAct_9fa48("527")) {
      {}
    } else {
      stryCov_9fa48("527");
      return this.camera;
    }
  }
  public setCamera(camera: THREE.PerspectiveCamera): void {
    if (stryMutAct_9fa48("528")) {
      {}
    } else {
      stryCov_9fa48("528");
      this.camera = camera;
    }
  }
  public getPositionLimits(): Required<PositionLimits> {
    if (stryMutAct_9fa48("529")) {
      {}
    } else {
      stryCov_9fa48("529");
      return stryMutAct_9fa48("530") ? {} : (stryCov_9fa48("530"), {
        ...this.positionLimits
      });
    }
  }
  public setPositionLimits(limits: PositionLimits): void {
    if (stryMutAct_9fa48("531")) {
      {}
    } else {
      stryCov_9fa48("531");
      this.positionLimits = stryMutAct_9fa48("532") ? {} : (stryCov_9fa48("532"), {
        ...this.positionLimits,
        ...limits
      });
    }
  }
  public getRotationLimits(): Required<RotationLimits> {
    if (stryMutAct_9fa48("533")) {
      {}
    } else {
      stryCov_9fa48("533");
      return stryMutAct_9fa48("534") ? {} : (stryCov_9fa48("534"), {
        ...this.rotationLimits
      });
    }
  }
  public setRotationLimits(limits: RotationLimits): void {
    if (stryMutAct_9fa48("535")) {
      {}
    } else {
      stryCov_9fa48("535");
      this.rotationLimits = stryMutAct_9fa48("536") ? {} : (stryCov_9fa48("536"), {
        ...this.rotationLimits,
        ...limits
      });
    }
  }
  public enable(): void {
    if (stryMutAct_9fa48("537")) {
      {}
    } else {
      stryCov_9fa48("537");
      this.enabled = stryMutAct_9fa48("538") ? false : (stryCov_9fa48("538"), true);
    }
  }
  public disable(): void {
    if (stryMutAct_9fa48("539")) {
      {}
    } else {
      stryCov_9fa48("539");
      this.enabled = stryMutAct_9fa48("540") ? true : (stryCov_9fa48("540"), false);
    }
  }
  public isEnabled(): boolean {
    if (stryMutAct_9fa48("541")) {
      {}
    } else {
      stryCov_9fa48("541");
      return this.enabled;
    }
  }
  public applyPositionConstraints(): void {
    if (stryMutAct_9fa48("542")) {
      {}
    } else {
      stryCov_9fa48("542");
      // Clamp position to bounds (X, Y, Z axes)
      this.camera.position.x = stryMutAct_9fa48("543") ? Math.min(this.positionLimits.minX, Math.min(this.positionLimits.maxX, this.camera.position.x)) : (stryCov_9fa48("543"), Math.max(this.positionLimits.minX, stryMutAct_9fa48("544") ? Math.max(this.positionLimits.maxX, this.camera.position.x) : (stryCov_9fa48("544"), Math.min(this.positionLimits.maxX, this.camera.position.x))));
      this.camera.position.y = stryMutAct_9fa48("545") ? Math.min(this.positionLimits.minY, Math.min(this.positionLimits.maxY, this.camera.position.y)) : (stryCov_9fa48("545"), Math.max(this.positionLimits.minY, stryMutAct_9fa48("546") ? Math.max(this.positionLimits.maxY, this.camera.position.y) : (stryCov_9fa48("546"), Math.min(this.positionLimits.maxY, this.camera.position.y))));
      this.camera.position.z = stryMutAct_9fa48("547") ? Math.min(this.positionLimits.minZ, Math.min(this.positionLimits.maxZ, this.camera.position.z)) : (stryCov_9fa48("547"), Math.max(this.positionLimits.minZ, stryMutAct_9fa48("548") ? Math.max(this.positionLimits.maxZ, this.camera.position.z) : (stryCov_9fa48("548"), Math.min(this.positionLimits.maxZ, this.camera.position.z))));
    }
  }
  public applyRotationConstraints(): void {
    if (stryMutAct_9fa48("549")) {
      {}
    } else {
      stryCov_9fa48("549");
      // Clamp pitch (X rotation: up/down looking)
      this.camera.rotation.x = stryMutAct_9fa48("550") ? Math.min(this.rotationLimits.minPitch, Math.min(this.rotationLimits.maxPitch, this.camera.rotation.x)) : (stryCov_9fa48("550"), Math.max(this.rotationLimits.minPitch, stryMutAct_9fa48("551") ? Math.max(this.rotationLimits.maxPitch, this.camera.rotation.x) : (stryCov_9fa48("551"), Math.min(this.rotationLimits.maxPitch, this.camera.rotation.x))));

      // Clamp yaw (Y rotation: left/right turning)
      this.camera.rotation.y = stryMutAct_9fa48("552") ? Math.min(this.rotationLimits.minYaw, Math.min(this.rotationLimits.maxYaw, this.camera.rotation.y)) : (stryCov_9fa48("552"), Math.max(this.rotationLimits.minYaw, stryMutAct_9fa48("553") ? Math.max(this.rotationLimits.maxYaw, this.camera.rotation.y) : (stryCov_9fa48("553"), Math.min(this.rotationLimits.maxYaw, this.camera.rotation.y))));
    }
  }
  public applyConstraints(): void {
    if (stryMutAct_9fa48("554")) {
      {}
    } else {
      stryCov_9fa48("554");
      if (stryMutAct_9fa48("557") ? false : stryMutAct_9fa48("556") ? true : stryMutAct_9fa48("555") ? this.enabled : (stryCov_9fa48("555", "556", "557"), !this.enabled)) return;
      this.applyPositionConstraints();
      this.applyRotationConstraints();
    }
  }
  public update(): void {
    if (stryMutAct_9fa48("558")) {
      {}
    } else {
      stryCov_9fa48("558");
      this.applyConstraints();
    }
  }
}