/**
 * Task 1.2.1: Physics Engine Initialization
 *
 * Creates and configures cannon-es physics world with:
 * - Gravity (-9.82 m/s² on Y-axis)
 * - NaiveBroadphase for collision detection
 * - Solver with 10 iterations
 * - Fixed time step (1/60 second for 60 FPS)
 *
 * @example
 * const physics = new PhysicsWorld()
 * physics.step() // Update physics simulation
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
export interface GravityVector {
  x: number;
  y: number;
  z: number;
}

// Default configuration (Explicit, Adaptive)
export const DEFAULT_GRAVITY: GravityVector = stryMutAct_9fa48("264") ? {} : (stryCov_9fa48("264"), {
  x: 0,
  y: stryMutAct_9fa48("265") ? +9.82 : (stryCov_9fa48("265"), -9.82),
  // Earth gravity (m/s²)
  z: 0
});
export const FIXED_TIME_STEP = stryMutAct_9fa48("266") ? 1 * 60 : (stryCov_9fa48("266"), 1 / 60); // 60 FPS

const DEFAULT_SOLVER_ITERATIONS = 10;
export class PhysicsWorld {
  private world: CANNON.World;
  private timeStep: number;
  constructor() {
    if (stryMutAct_9fa48("267")) {
      {}
    } else {
      stryCov_9fa48("267");
      this.world = new CANNON.World();
      this.timeStep = FIXED_TIME_STEP;
      this.initializeWorld();
    }
  }
  private initializeWorld(): void {
    if (stryMutAct_9fa48("268")) {
      {}
    } else {
      stryCov_9fa48("268");
      // Set gravity
      this.world.gravity.set(DEFAULT_GRAVITY.x, DEFAULT_GRAVITY.y, DEFAULT_GRAVITY.z);

      // Set broadphase (collision detection algorithm)
      this.world.broadphase = new CANNON.NaiveBroadphase();

      // Set solver iterations (accuracy vs performance)
      this.world.solver.iterations = DEFAULT_SOLVER_ITERATIONS;
    }
  }
  public getWorld(): CANNON.World {
    if (stryMutAct_9fa48("269")) {
      {}
    } else {
      stryCov_9fa48("269");
      return this.world;
    }
  }
  public getTimeStep(): number {
    if (stryMutAct_9fa48("270")) {
      {}
    } else {
      stryCov_9fa48("270");
      return this.timeStep;
    }
  }
  public getGravity(): GravityVector {
    if (stryMutAct_9fa48("271")) {
      {}
    } else {
      stryCov_9fa48("271");
      return stryMutAct_9fa48("272") ? {} : (stryCov_9fa48("272"), {
        x: this.world.gravity.x,
        y: this.world.gravity.y,
        z: this.world.gravity.z
      });
    }
  }
  public getSolverIterations(): number {
    if (stryMutAct_9fa48("273")) {
      {}
    } else {
      stryCov_9fa48("273");
      return this.world.solver.iterations;
    }
  }
  public setGravity(x: number, y: number, z: number): void {
    if (stryMutAct_9fa48("274")) {
      {}
    } else {
      stryCov_9fa48("274");
      this.world.gravity.set(x, y, z);
    }
  }
  public setSolverIterations(iterations: number): void {
    if (stryMutAct_9fa48("275")) {
      {}
    } else {
      stryCov_9fa48("275");
      this.world.solver.iterations = iterations;
    }
  }
  public step(deltaTime?: number): void {
    if (stryMutAct_9fa48("276")) {
      {}
    } else {
      stryCov_9fa48("276");
      const dt = (stryMutAct_9fa48("279") ? deltaTime !== undefined || deltaTime > 0 : stryMutAct_9fa48("278") ? false : stryMutAct_9fa48("277") ? true : (stryCov_9fa48("277", "278", "279"), (stryMutAct_9fa48("281") ? deltaTime === undefined : stryMutAct_9fa48("280") ? true : (stryCov_9fa48("280", "281"), deltaTime !== undefined)) && (stryMutAct_9fa48("284") ? deltaTime <= 0 : stryMutAct_9fa48("283") ? deltaTime >= 0 : stryMutAct_9fa48("282") ? true : (stryCov_9fa48("282", "283", "284"), deltaTime > 0)))) ? deltaTime : this.timeStep;
      this.world.step(dt);
    }
  }
}