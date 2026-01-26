/**
 * Task 1.2.3: Flight Dynamics Implementation
 *
 * Implements realistic flight physics:
 * - Thrust: Forward/backward force from input
 * - Drag: Air resistance (proportional to velocity²)
 * - Lift: Upward force from forward motion
 *
 * @example
 * const dynamics = new FlightDynamics(planeBody)
 * dynamics.update(forwardInput, backwardInput, leftInput, rightInput)
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
export interface DynamicsConfig {
  thrustForce?: number;
  dragCoefficient?: number;
  liftCoefficient?: number;
}

// Physics constants (Explicit, Adaptive)
export const THRUST_FORCE = 10; // Newtons
export const DRAG_COEFFICIENT = 0.1; // Drag factor
export const LIFT_COEFFICIENT = 0.5; // Lift factor

export class FlightDynamics {
  private body: CANNON.Body;
  private thrustForce: number;
  private dragCoefficient: number;
  private liftCoefficient: number;
  constructor(body: CANNON.Body, config: DynamicsConfig = {}) {
    if (stryMutAct_9fa48("312")) {
      {}
    } else {
      stryCov_9fa48("312");
      this.body = body;
      this.thrustForce = (stryMutAct_9fa48("315") ? config.thrustForce === undefined : stryMutAct_9fa48("314") ? false : stryMutAct_9fa48("313") ? true : (stryCov_9fa48("313", "314", "315"), config.thrustForce !== undefined)) ? config.thrustForce : THRUST_FORCE;
      this.dragCoefficient = (stryMutAct_9fa48("318") ? config.dragCoefficient === undefined : stryMutAct_9fa48("317") ? false : stryMutAct_9fa48("316") ? true : (stryCov_9fa48("316", "317", "318"), config.dragCoefficient !== undefined)) ? config.dragCoefficient : DRAG_COEFFICIENT;
      this.liftCoefficient = (stryMutAct_9fa48("321") ? config.liftCoefficient === undefined : stryMutAct_9fa48("320") ? false : stryMutAct_9fa48("319") ? true : (stryCov_9fa48("319", "320", "321"), config.liftCoefficient !== undefined)) ? config.liftCoefficient : LIFT_COEFFICIENT;
    }
  }
  public applyThrust(forward: number, backward: number, left: number, right: number): void {
    if (stryMutAct_9fa48("322")) {
      {}
    } else {
      stryCov_9fa48("322");
      // Clamp inputs to [-1, 1]
      const forwardClamped = stryMutAct_9fa48("323") ? Math.min(-1, Math.min(1, forward)) : (stryCov_9fa48("323"), Math.max(stryMutAct_9fa48("324") ? +1 : (stryCov_9fa48("324"), -1), stryMutAct_9fa48("325") ? Math.max(1, forward) : (stryCov_9fa48("325"), Math.min(1, forward))));
      const backwardClamped = stryMutAct_9fa48("326") ? Math.min(-1, Math.min(1, backward)) : (stryCov_9fa48("326"), Math.max(stryMutAct_9fa48("327") ? +1 : (stryCov_9fa48("327"), -1), stryMutAct_9fa48("328") ? Math.max(1, backward) : (stryCov_9fa48("328"), Math.min(1, backward))));
      const leftClamped = stryMutAct_9fa48("329") ? Math.min(-1, Math.min(1, left)) : (stryCov_9fa48("329"), Math.max(stryMutAct_9fa48("330") ? +1 : (stryCov_9fa48("330"), -1), stryMutAct_9fa48("331") ? Math.max(1, left) : (stryCov_9fa48("331"), Math.min(1, left))));
      const rightClamped = stryMutAct_9fa48("332") ? Math.min(-1, Math.min(1, right)) : (stryCov_9fa48("332"), Math.max(stryMutAct_9fa48("333") ? +1 : (stryCov_9fa48("333"), -1), stryMutAct_9fa48("334") ? Math.max(1, right) : (stryCov_9fa48("334"), Math.min(1, right))));

      // Calculate net forward/backward input
      const forwardBackward = stryMutAct_9fa48("335") ? forwardClamped + backwardClamped : (stryCov_9fa48("335"), forwardClamped - backwardClamped);

      // Calculate net left/right input
      const leftRight = stryMutAct_9fa48("336") ? rightClamped + leftClamped : (stryCov_9fa48("336"), rightClamped - leftClamped);

      // Create thrust vector in local space
      // Forward/backward: -Z axis (cannon-es convention)
      // Left/right: X axis
      const thrustLocal = new CANNON.Vec3(stryMutAct_9fa48("337") ? leftRight / this.thrustForce : (stryCov_9fa48("337"), leftRight * this.thrustForce), 0, stryMutAct_9fa48("338") ? -forwardBackward / this.thrustForce : (stryCov_9fa48("338"), (stryMutAct_9fa48("339") ? +forwardBackward : (stryCov_9fa48("339"), -forwardBackward)) * this.thrustForce));

      // Apply force in local coordinate system
      this.body.applyLocalForce(thrustLocal, new CANNON.Vec3(0, 0, 0));
    }
  }
  public applyDrag(): void {
    if (stryMutAct_9fa48("340")) {
      {}
    } else {
      stryCov_9fa48("340");
      const velocity = this.body.velocity;

      // Drag force = -drag_coefficient * velocity * |velocity|
      const speed = velocity.length();
      if (stryMutAct_9fa48("343") ? speed !== 0 : stryMutAct_9fa48("342") ? false : stryMutAct_9fa48("341") ? true : (stryCov_9fa48("341", "342", "343"), speed === 0)) return;

      // Calculate drag force (opposite to velocity direction)
      const dragMagnitude = stryMutAct_9fa48("344") ? this.dragCoefficient / speed : (stryCov_9fa48("344"), this.dragCoefficient * speed);
      const dragForce = new CANNON.Vec3(stryMutAct_9fa48("345") ? -velocity.x / dragMagnitude : (stryCov_9fa48("345"), (stryMutAct_9fa48("346") ? +velocity.x : (stryCov_9fa48("346"), -velocity.x)) * dragMagnitude), stryMutAct_9fa48("347") ? -velocity.y / dragMagnitude : (stryCov_9fa48("347"), (stryMutAct_9fa48("348") ? +velocity.y : (stryCov_9fa48("348"), -velocity.y)) * dragMagnitude), stryMutAct_9fa48("349") ? -velocity.z / dragMagnitude : (stryCov_9fa48("349"), (stryMutAct_9fa48("350") ? +velocity.z : (stryCov_9fa48("350"), -velocity.z)) * dragMagnitude));
      this.body.applyForce(dragForce, this.body.position);
    }
  }
  public applyLift(): void {
    if (stryMutAct_9fa48("351")) {
      {}
    } else {
      stryCov_9fa48("351");
      const velocity = this.body.velocity;

      // Lift is based on forward/backward velocity (Z-axis)
      const forwardSpeed = Math.abs(velocity.z);
      if (stryMutAct_9fa48("354") ? forwardSpeed !== 0 : stryMutAct_9fa48("353") ? false : stryMutAct_9fa48("352") ? true : (stryCov_9fa48("352", "353", "354"), forwardSpeed === 0)) return;

      // Lift force = lift_coefficient * forward_speed (upward)
      const liftForce = new CANNON.Vec3(0, stryMutAct_9fa48("355") ? this.liftCoefficient / forwardSpeed : (stryCov_9fa48("355"), this.liftCoefficient * forwardSpeed), 0);
      this.body.applyForce(liftForce, this.body.position);
    }
  }
  public resetForces(): void {
    if (stryMutAct_9fa48("356")) {
      {}
    } else {
      stryCov_9fa48("356");
      this.body.force.set(0, 0, 0);
      this.body.torque.set(0, 0, 0);
    }
  }
  public update(forward: number, backward: number, left: number, right: number): void {
    if (stryMutAct_9fa48("357")) {
      {}
    } else {
      stryCov_9fa48("357");
      this.resetForces();
      this.applyThrust(forward, backward, left, right);
      this.applyDrag();
      this.applyLift();
    }
  }
}