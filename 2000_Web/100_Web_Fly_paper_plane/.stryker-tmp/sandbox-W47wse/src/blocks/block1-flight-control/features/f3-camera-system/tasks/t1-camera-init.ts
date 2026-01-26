/**
 * Task 1.3.1: Camera Initialization
 *
 * Creates and configures a Three.js PerspectiveCamera:
 * - Field of View (FOV): 75 degrees
 * - Aspect Ratio: 16:9 (default)
 * - Near/Far Clipping Planes: 0.1 / 1000
 * - Initial Position: (0, 5, 10) - behind and above target
 * - Initial Rotation: Slightly downward
 *
 * @example
 * const cameraInit = new CameraInitializer()
 * const camera = cameraInit.getCamera()
 * scene.add(camera)
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
export interface CameraConfig {
  fov?: number;
  aspect?: number;
  near?: number;
  far?: number;
  position?: Vec3;
  rotation?: Vec3;
}

// Default camera constants (Explicit, Adaptive)
export const DEFAULT_FOV = 75; // Field of View in degrees
export const DEFAULT_NEAR = 0.1; // Near clipping plane
export const DEFAULT_FAR = 1000; // Far clipping plane

// Default position: behind and above target (Explicit)
export const DEFAULT_POSITION: Vec3 = stryMutAct_9fa48("406") ? {} : (stryCov_9fa48("406"), {
  x: 0,
  y: 5,
  // Above
  z: 10 // Behind
});

// Default rotation: pointing slightly downward (Explicit)
export const DEFAULT_ROTATION: Vec3 = stryMutAct_9fa48("407") ? {} : (stryCov_9fa48("407"), {
  x: stryMutAct_9fa48("408") ? +0.2 : (stryCov_9fa48("408"), -0.2),
  // Pitch down
  y: 0,
  z: 0
});
export class CameraInitializer {
  private camera: THREE.PerspectiveCamera;
  private initialPosition: Vec3;
  private initialRotation: Vec3;
  constructor(config: CameraConfig = {}) {
    if (stryMutAct_9fa48("409")) {
      {}
    } else {
      stryCov_9fa48("409");
      const fov = (stryMutAct_9fa48("412") ? config.fov === undefined : stryMutAct_9fa48("411") ? false : stryMutAct_9fa48("410") ? true : (stryCov_9fa48("410", "411", "412"), config.fov !== undefined)) ? config.fov : DEFAULT_FOV;
      const aspect = (stryMutAct_9fa48("415") ? config.aspect === undefined : stryMutAct_9fa48("414") ? false : stryMutAct_9fa48("413") ? true : (stryCov_9fa48("413", "414", "415"), config.aspect !== undefined)) ? config.aspect : stryMutAct_9fa48("416") ? 16 * 9 : (stryCov_9fa48("416"), 16 / 9);
      const near = (stryMutAct_9fa48("419") ? config.near === undefined : stryMutAct_9fa48("418") ? false : stryMutAct_9fa48("417") ? true : (stryCov_9fa48("417", "418", "419"), config.near !== undefined)) ? config.near : DEFAULT_NEAR;
      const far = (stryMutAct_9fa48("422") ? config.far === undefined : stryMutAct_9fa48("421") ? false : stryMutAct_9fa48("420") ? true : (stryCov_9fa48("420", "421", "422"), config.far !== undefined)) ? config.far : DEFAULT_FAR;
      this.initialPosition = stryMutAct_9fa48("425") ? config.position && {
        ...DEFAULT_POSITION
      } : stryMutAct_9fa48("424") ? false : stryMutAct_9fa48("423") ? true : (stryCov_9fa48("423", "424", "425"), config.position || (stryMutAct_9fa48("426") ? {} : (stryCov_9fa48("426"), {
        ...DEFAULT_POSITION
      })));
      this.initialRotation = stryMutAct_9fa48("429") ? config.rotation && {
        ...DEFAULT_ROTATION
      } : stryMutAct_9fa48("428") ? false : stryMutAct_9fa48("427") ? true : (stryCov_9fa48("427", "428", "429"), config.rotation || (stryMutAct_9fa48("430") ? {} : (stryCov_9fa48("430"), {
        ...DEFAULT_ROTATION
      })));
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.setPosition(this.initialPosition.x, this.initialPosition.y, this.initialPosition.z);
      this.setRotation(this.initialRotation.x, this.initialRotation.y, this.initialRotation.z);
      this.camera.updateProjectionMatrix();
    }
  }
  public getCamera(): THREE.PerspectiveCamera {
    if (stryMutAct_9fa48("431")) {
      {}
    } else {
      stryCov_9fa48("431");
      return this.camera;
    }
  }
  public setPosition(x: number, y: number, z: number): void {
    if (stryMutAct_9fa48("432")) {
      {}
    } else {
      stryCov_9fa48("432");
      this.camera.position.set(x, y, z);
    }
  }
  public setRotation(x: number, y: number, z: number): void {
    if (stryMutAct_9fa48("433")) {
      {}
    } else {
      stryCov_9fa48("433");
      this.camera.rotation.set(x, y, z);
    }
  }
  public getPosition(): Vec3 {
    if (stryMutAct_9fa48("434")) {
      {}
    } else {
      stryCov_9fa48("434");
      return stryMutAct_9fa48("435") ? {} : (stryCov_9fa48("435"), {
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z
      });
    }
  }
  public getRotation(): Vec3 {
    if (stryMutAct_9fa48("436")) {
      {}
    } else {
      stryCov_9fa48("436");
      return stryMutAct_9fa48("437") ? {} : (stryCov_9fa48("437"), {
        x: this.camera.rotation.x,
        y: this.camera.rotation.y,
        z: this.camera.rotation.z
      });
    }
  }
  public setAspectRatio(aspect: number): void {
    if (stryMutAct_9fa48("438")) {
      {}
    } else {
      stryCov_9fa48("438");
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
    }
  }
  public updateProjectionMatrix(): void {
    if (stryMutAct_9fa48("439")) {
      {}
    } else {
      stryCov_9fa48("439");
      this.camera.updateProjectionMatrix();
    }
  }
  public reset(): void {
    if (stryMutAct_9fa48("440")) {
      {}
    } else {
      stryCov_9fa48("440");
      this.setPosition(this.initialPosition.x, this.initialPosition.y, this.initialPosition.z);
      this.setRotation(this.initialRotation.x, this.initialRotation.y, this.initialRotation.z);
    }
  }
}