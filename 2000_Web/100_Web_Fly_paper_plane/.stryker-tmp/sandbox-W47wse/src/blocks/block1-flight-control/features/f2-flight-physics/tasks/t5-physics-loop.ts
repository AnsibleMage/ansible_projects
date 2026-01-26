/**
 * Task 1.2.5: Physics Simulation Update Loop
 *
 * Manages the main update loop for physics simulation:
 * - Fixed time step physics updates (60 FPS)
 * - Delta time calculation
 * - Three.js position/rotation synchronization
 * - Frame counting and time tracking
 *
 * @example
 * const loop = new PhysicsUpdateLoop(world, planeBody, planeMesh)
 * loop.start()
 * // In render loop:
 * loop.update(deltaTime)
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
import * as THREE from 'three';

// Fixed time step for physics simulation (Explicit)
export const FIXED_TIME_STEP = stryMutAct_9fa48("377") ? 1 * 60 : (stryCov_9fa48("377"), 1 / 60); // 60 FPS

// Maximum substeps to catch up if frame rate drops (Explicit)
export const MAX_SUB_STEPS = 3;
export class PhysicsUpdateLoop {
  private world: CANNON.World;
  private body: CANNON.Body;
  private mesh: THREE.Mesh;
  private running: boolean = stryMutAct_9fa48("378") ? true : (stryCov_9fa48("378"), false);
  private elapsedTime: number = 0;
  private frameCount: number = 0;
  constructor(world: CANNON.World, body: CANNON.Body, mesh: THREE.Mesh) {
    if (stryMutAct_9fa48("379")) {
      {}
    } else {
      stryCov_9fa48("379");
      this.world = world;
      this.body = body;
      this.mesh = mesh;
    }
  }
  public calculateDeltaTime(currentTime: number, lastTime: number): number {
    if (stryMutAct_9fa48("380")) {
      {}
    } else {
      stryCov_9fa48("380");
      return stryMutAct_9fa48("381") ? (currentTime - lastTime) * 1000 : (stryCov_9fa48("381"), (stryMutAct_9fa48("382") ? currentTime + lastTime : (stryCov_9fa48("382"), currentTime - lastTime)) / 1000); // Convert ms to seconds
    }
  }
  public updatePhysics(deltaTime: number): void {
    if (stryMutAct_9fa48("383")) {
      {}
    } else {
      stryCov_9fa48("383");
      // Clamp delta time to prevent physics explosion
      let dt = deltaTime;

      // Handle invalid values
      if (stryMutAct_9fa48("386") ? isNaN(dt) && !isFinite(dt) : stryMutAct_9fa48("385") ? false : stryMutAct_9fa48("384") ? true : (stryCov_9fa48("384", "385", "386"), isNaN(dt) || (stryMutAct_9fa48("387") ? isFinite(dt) : (stryCov_9fa48("387"), !isFinite(dt))))) {
        if (stryMutAct_9fa48("388")) {
          {}
        } else {
          stryCov_9fa48("388");
          dt = 0;
        }
      }

      // Clamp negative values to zero
      if (stryMutAct_9fa48("392") ? dt >= 0 : stryMutAct_9fa48("391") ? dt <= 0 : stryMutAct_9fa48("390") ? false : stryMutAct_9fa48("389") ? true : (stryCov_9fa48("389", "390", "391", "392"), dt < 0)) {
        if (stryMutAct_9fa48("393")) {
          {}
        } else {
          stryCov_9fa48("393");
          dt = 0;
        }
      }
      this.world.step(FIXED_TIME_STEP, dt, MAX_SUB_STEPS);
    }
  }
  public syncMeshToBody(): void {
    if (stryMutAct_9fa48("394")) {
      {}
    } else {
      stryCov_9fa48("394");
      // Copy position from physics body to Three.js mesh
      this.mesh.position.copy(this.body.position as unknown as THREE.Vector3);

      // Copy rotation from physics body to Three.js mesh
      this.mesh.quaternion.copy(this.body.quaternion as unknown as THREE.Quaternion);
    }
  }
  public update(deltaTime: number): void {
    if (stryMutAct_9fa48("395")) {
      {}
    } else {
      stryCov_9fa48("395");
      this.updatePhysics(deltaTime);
      this.syncMeshToBody();
      stryMutAct_9fa48("396") ? this.frameCount-- : (stryCov_9fa48("396"), this.frameCount++);
      stryMutAct_9fa48("397") ? this.elapsedTime -= deltaTime : (stryCov_9fa48("397"), this.elapsedTime += deltaTime);
    }
  }
  public start(): void {
    if (stryMutAct_9fa48("398")) {
      {}
    } else {
      stryCov_9fa48("398");
      this.running = stryMutAct_9fa48("399") ? false : (stryCov_9fa48("399"), true);
    }
  }
  public stop(): void {
    if (stryMutAct_9fa48("400")) {
      {}
    } else {
      stryCov_9fa48("400");
      this.running = stryMutAct_9fa48("401") ? true : (stryCov_9fa48("401"), false);
    }
  }
  public reset(): void {
    if (stryMutAct_9fa48("402")) {
      {}
    } else {
      stryCov_9fa48("402");
      this.elapsedTime = 0;
      this.frameCount = 0;
    }
  }
  public isRunning(): boolean {
    if (stryMutAct_9fa48("403")) {
      {}
    } else {
      stryCov_9fa48("403");
      return this.running;
    }
  }
  public getElapsedTime(): number {
    if (stryMutAct_9fa48("404")) {
      {}
    } else {
      stryCov_9fa48("404");
      return this.elapsedTime;
    }
  }
  public getFrameCount(): number {
    if (stryMutAct_9fa48("405")) {
      {}
    } else {
      stryCov_9fa48("405");
      return this.frameCount;
    }
  }
}