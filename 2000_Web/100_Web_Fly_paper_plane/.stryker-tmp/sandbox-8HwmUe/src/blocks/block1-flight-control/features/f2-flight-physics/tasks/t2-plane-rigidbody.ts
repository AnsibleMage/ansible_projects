/**
 * Task 1.2.2: Plane RigidBody Creation
 *
 * Creates a physics body for the paper plane with:
 * - Box shape (0.5 x 0.1 x 0.2 meters)
 * - Light mass (0.1 kg)
 * - Initial position (0, 5, 0)
 * - Reset functionality
 *
 * @example
 * const planeBody = new PlaneRigidBody()
 * world.addBody(planeBody.getBody())
 * planeBody.setPosition(10, 15, 0)
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
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}
export interface PlaneConfig {
  mass?: number;
  position?: Vec3;
  rotation?: Vec3;
}

// Default configuration (Explicit, Adaptive)
export const DEFAULT_PLANE_MASS = 0.1; // kg (light paper plane)
const DEFAULT_POSITION: Vec3 = stryMutAct_9fa48("285") ? {} : (stryCov_9fa48("285"), {
  x: 0,
  y: 5,
  z: 0
});
const DEFAULT_ROTATION: Vec3 = stryMutAct_9fa48("286") ? {} : (stryCov_9fa48("286"), {
  x: 0,
  y: 0,
  z: 0
});

// Plane dimensions (half extents)
const PLANE_HALF_EXTENTS = stryMutAct_9fa48("287") ? {} : (stryCov_9fa48("287"), {
  x: 0.5,
  // width
  y: 0.1,
  // height (thin)
  z: 0.2 // depth
});
export class PlaneRigidBody {
  private body: CANNON.Body;
  private initialPosition: Vec3;
  private initialRotation: Vec3;
  constructor(config: PlaneConfig = {}) {
    if (stryMutAct_9fa48("288")) {
      {}
    } else {
      stryCov_9fa48("288");
      const mass = (stryMutAct_9fa48("291") ? config.mass === undefined : stryMutAct_9fa48("290") ? false : stryMutAct_9fa48("289") ? true : (stryCov_9fa48("289", "290", "291"), config.mass !== undefined)) ? config.mass : DEFAULT_PLANE_MASS;
      this.initialPosition = stryMutAct_9fa48("294") ? config.position && {
        ...DEFAULT_POSITION
      } : stryMutAct_9fa48("293") ? false : stryMutAct_9fa48("292") ? true : (stryCov_9fa48("292", "293", "294"), config.position || (stryMutAct_9fa48("295") ? {} : (stryCov_9fa48("295"), {
        ...DEFAULT_POSITION
      })));
      this.initialRotation = stryMutAct_9fa48("298") ? config.rotation && {
        ...DEFAULT_ROTATION
      } : stryMutAct_9fa48("297") ? false : stryMutAct_9fa48("296") ? true : (stryCov_9fa48("296", "297", "298"), config.rotation || (stryMutAct_9fa48("299") ? {} : (stryCov_9fa48("299"), {
        ...DEFAULT_ROTATION
      })));
      this.body = this.createBody(mass);
      this.setPosition(this.initialPosition.x, this.initialPosition.y, this.initialPosition.z);
      this.setRotation(this.initialRotation.x, this.initialRotation.y, this.initialRotation.z);
    }
  }
  private createBody(mass: number): CANNON.Body {
    if (stryMutAct_9fa48("300")) {
      {}
    } else {
      stryCov_9fa48("300");
      // Create box shape
      const shape = new CANNON.Box(new CANNON.Vec3(PLANE_HALF_EXTENTS.x, PLANE_HALF_EXTENTS.y, PLANE_HALF_EXTENTS.z));

      // Create body
      const body = new CANNON.Body(stryMutAct_9fa48("301") ? {} : (stryCov_9fa48("301"), {
        mass,
        shape
      }));
      return body;
    }
  }
  public getBody(): CANNON.Body {
    if (stryMutAct_9fa48("302")) {
      {}
    } else {
      stryCov_9fa48("302");
      return this.body;
    }
  }
  public getPosition(): Vec3 {
    if (stryMutAct_9fa48("303")) {
      {}
    } else {
      stryCov_9fa48("303");
      return stryMutAct_9fa48("304") ? {} : (stryCov_9fa48("304"), {
        x: this.body.position.x,
        y: this.body.position.y,
        z: this.body.position.z
      });
    }
  }
  public getRotation(): Vec3 {
    if (stryMutAct_9fa48("305")) {
      {}
    } else {
      stryCov_9fa48("305");
      const euler = new CANNON.Vec3();
      this.body.quaternion.toEuler(euler);
      return stryMutAct_9fa48("306") ? {} : (stryCov_9fa48("306"), {
        x: euler.x,
        y: euler.y,
        z: euler.z
      });
    }
  }
  public getVelocity(): Vec3 {
    if (stryMutAct_9fa48("307")) {
      {}
    } else {
      stryCov_9fa48("307");
      return stryMutAct_9fa48("308") ? {} : (stryCov_9fa48("308"), {
        x: this.body.velocity.x,
        y: this.body.velocity.y,
        z: this.body.velocity.z
      });
    }
  }
  public setPosition(x: number, y: number, z: number): void {
    if (stryMutAct_9fa48("309")) {
      {}
    } else {
      stryCov_9fa48("309");
      this.body.position.set(x, y, z);
    }
  }
  public setRotation(x: number, y: number, z: number): void {
    if (stryMutAct_9fa48("310")) {
      {}
    } else {
      stryCov_9fa48("310");
      const quaternion = new CANNON.Quaternion();
      quaternion.setFromEuler(x, y, z);
      this.body.quaternion.copy(quaternion);
    }
  }
  public reset(): void {
    if (stryMutAct_9fa48("311")) {
      {}
    } else {
      stryCov_9fa48("311");
      // Reset position
      this.body.position.set(this.initialPosition.x, this.initialPosition.y, this.initialPosition.z);

      // Reset rotation
      const quaternion = new CANNON.Quaternion();
      quaternion.setFromEuler(this.initialRotation.x, this.initialRotation.y, this.initialRotation.z);
      this.body.quaternion.copy(quaternion);

      // Reset velocity
      this.body.velocity.set(0, 0, 0);
      this.body.angularVelocity.set(0, 0, 0);

      // Reset force
      this.body.force.set(0, 0, 0);
      this.body.torque.set(0, 0, 0);
    }
  }
}