/**
 * Task 2.1.2: Checkpoint System
 *
 * Manages checkpoints and gates throughout the course:
 * - Create checkpoints with 3D position and size
 * - Detect when plane passes through checkpoint
 * - Track checkpoint order (sequential progression)
 * - Calculate course completion percentage
 *
 * @example
 * const manager = new CheckpointManager()
 * manager.addCheckpoint({ id: 'cp1', position: {...}, size: {...}, order: 1 })
 * const passed = manager.isPointInCheckpoint(planePosition, 'cp1')
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
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}
export interface CheckpointSize {
  width: number;
  height: number;
  depth: number;
}
export type CheckpointType = 'start' | 'checkpoint' | 'finish';
export interface Checkpoint {
  id: string;
  type: CheckpointType;
  position: Vec3;
  size: CheckpointSize;
  order: number;
  passed: boolean;
}

// Default checkpoint size (Explicit)
export const DEFAULT_CHECKPOINT_SIZE: CheckpointSize = stryMutAct_9fa48("660") ? {} : (stryCov_9fa48("660"), {
  width: 30,
  height: 20,
  depth: 2
});
export class CheckpointManager {
  private checkpoints: Map<string, Checkpoint> = new Map();

  /**
   * Adds a checkpoint to the manager
   */
  public addCheckpoint(checkpoint: Checkpoint): void {
    if (stryMutAct_9fa48("661")) {
      {}
    } else {
      stryCov_9fa48("661");
      this.checkpoints.set(checkpoint.id, checkpoint);
    }
  }

  /**
   * Gets a checkpoint by ID
   */
  public getCheckpoint(id: string): Checkpoint | undefined {
    if (stryMutAct_9fa48("662")) {
      {}
    } else {
      stryCov_9fa48("662");
      return this.checkpoints.get(id);
    }
  }

  /**
   * Removes a checkpoint by ID
   */
  public removeCheckpoint(id: string): void {
    if (stryMutAct_9fa48("663")) {
      {}
    } else {
      stryCov_9fa48("663");
      this.checkpoints.delete(id);
    }
  }

  /**
   * Clears all checkpoints
   */
  public clearAll(): void {
    if (stryMutAct_9fa48("664")) {
      {}
    } else {
      stryCov_9fa48("664");
      this.checkpoints.clear();
    }
  }

  /**
   * Gets all checkpoints
   */
  public getAllCheckpoints(): Checkpoint[] {
    if (stryMutAct_9fa48("665")) {
      {}
    } else {
      stryCov_9fa48("665");
      return Array.from(this.checkpoints.values());
    }
  }

  /**
   * Gets checkpoints sorted by order
   */
  public getCheckpointsInOrder(): Checkpoint[] {
    if (stryMutAct_9fa48("666")) {
      {}
    } else {
      stryCov_9fa48("666");
      return stryMutAct_9fa48("667") ? this.getAllCheckpoints() : (stryCov_9fa48("667"), this.getAllCheckpoints().sort(stryMutAct_9fa48("668") ? () => undefined : (stryCov_9fa48("668"), (a, b) => stryMutAct_9fa48("669") ? a.order + b.order : (stryCov_9fa48("669"), a.order - b.order))));
    }
  }

  /**
   * Gets all passed checkpoints
   */
  public getPassedCheckpoints(): Checkpoint[] {
    if (stryMutAct_9fa48("670")) {
      {}
    } else {
      stryCov_9fa48("670");
      return stryMutAct_9fa48("671") ? this.getAllCheckpoints() : (stryCov_9fa48("671"), this.getAllCheckpoints().filter(stryMutAct_9fa48("672") ? () => undefined : (stryCov_9fa48("672"), cp => cp.passed)));
    }
  }

  /**
   * Gets the next unpassed checkpoint in sequence
   */
  public getNextCheckpoint(): Checkpoint | undefined {
    if (stryMutAct_9fa48("673")) {
      {}
    } else {
      stryCov_9fa48("673");
      const ordered = this.getCheckpointsInOrder();
      return ordered.find(stryMutAct_9fa48("674") ? () => undefined : (stryCov_9fa48("674"), cp => stryMutAct_9fa48("675") ? cp.passed : (stryCov_9fa48("675"), !cp.passed)));
    }
  }

  /**
   * Marks a checkpoint as passed
   */
  public markAsPassed(id: string): void {
    if (stryMutAct_9fa48("676")) {
      {}
    } else {
      stryCov_9fa48("676");
      const checkpoint = this.checkpoints.get(id);
      if (stryMutAct_9fa48("678") ? false : stryMutAct_9fa48("677") ? true : (stryCov_9fa48("677", "678"), checkpoint)) {
        if (stryMutAct_9fa48("679")) {
          {}
        } else {
          stryCov_9fa48("679");
          checkpoint.passed = stryMutAct_9fa48("680") ? false : (stryCov_9fa48("680"), true);
        }
      }
    }
  }

  /**
   * Resets all checkpoint pass states
   */
  public resetAllPassed(): void {
    if (stryMutAct_9fa48("681")) {
      {}
    } else {
      stryCov_9fa48("681");
      this.checkpoints.forEach(checkpoint => {
        if (stryMutAct_9fa48("682")) {
          {}
        } else {
          stryCov_9fa48("682");
          checkpoint.passed = stryMutAct_9fa48("683") ? true : (stryCov_9fa48("683"), false);
        }
      });
    }
  }

  /**
   * Checks if a point is inside a checkpoint's bounding box
   */
  public isPointInCheckpoint(point: Vec3, checkpointId: string): boolean {
    if (stryMutAct_9fa48("684")) {
      {}
    } else {
      stryCov_9fa48("684");
      const checkpoint = this.checkpoints.get(checkpointId);
      if (stryMutAct_9fa48("687") ? false : stryMutAct_9fa48("686") ? true : stryMutAct_9fa48("685") ? checkpoint : (stryCov_9fa48("685", "686", "687"), !checkpoint)) return stryMutAct_9fa48("688") ? true : (stryCov_9fa48("688"), false);
      const halfWidth = stryMutAct_9fa48("689") ? checkpoint.size.width * 2 : (stryCov_9fa48("689"), checkpoint.size.width / 2);
      const halfHeight = stryMutAct_9fa48("690") ? checkpoint.size.height * 2 : (stryCov_9fa48("690"), checkpoint.size.height / 2);
      const halfDepth = stryMutAct_9fa48("691") ? checkpoint.size.depth * 2 : (stryCov_9fa48("691"), checkpoint.size.depth / 2);
      const inX = stryMutAct_9fa48("694") ? point.x >= checkpoint.position.x - halfWidth || point.x <= checkpoint.position.x + halfWidth : stryMutAct_9fa48("693") ? false : stryMutAct_9fa48("692") ? true : (stryCov_9fa48("692", "693", "694"), (stryMutAct_9fa48("697") ? point.x < checkpoint.position.x - halfWidth : stryMutAct_9fa48("696") ? point.x > checkpoint.position.x - halfWidth : stryMutAct_9fa48("695") ? true : (stryCov_9fa48("695", "696", "697"), point.x >= (stryMutAct_9fa48("698") ? checkpoint.position.x + halfWidth : (stryCov_9fa48("698"), checkpoint.position.x - halfWidth)))) && (stryMutAct_9fa48("701") ? point.x > checkpoint.position.x + halfWidth : stryMutAct_9fa48("700") ? point.x < checkpoint.position.x + halfWidth : stryMutAct_9fa48("699") ? true : (stryCov_9fa48("699", "700", "701"), point.x <= (stryMutAct_9fa48("702") ? checkpoint.position.x - halfWidth : (stryCov_9fa48("702"), checkpoint.position.x + halfWidth)))));
      const inY = stryMutAct_9fa48("705") ? point.y >= checkpoint.position.y - halfHeight || point.y <= checkpoint.position.y + halfHeight : stryMutAct_9fa48("704") ? false : stryMutAct_9fa48("703") ? true : (stryCov_9fa48("703", "704", "705"), (stryMutAct_9fa48("708") ? point.y < checkpoint.position.y - halfHeight : stryMutAct_9fa48("707") ? point.y > checkpoint.position.y - halfHeight : stryMutAct_9fa48("706") ? true : (stryCov_9fa48("706", "707", "708"), point.y >= (stryMutAct_9fa48("709") ? checkpoint.position.y + halfHeight : (stryCov_9fa48("709"), checkpoint.position.y - halfHeight)))) && (stryMutAct_9fa48("712") ? point.y > checkpoint.position.y + halfHeight : stryMutAct_9fa48("711") ? point.y < checkpoint.position.y + halfHeight : stryMutAct_9fa48("710") ? true : (stryCov_9fa48("710", "711", "712"), point.y <= (stryMutAct_9fa48("713") ? checkpoint.position.y - halfHeight : (stryCov_9fa48("713"), checkpoint.position.y + halfHeight)))));
      const inZ = stryMutAct_9fa48("716") ? point.z >= checkpoint.position.z - halfDepth || point.z <= checkpoint.position.z + halfDepth : stryMutAct_9fa48("715") ? false : stryMutAct_9fa48("714") ? true : (stryCov_9fa48("714", "715", "716"), (stryMutAct_9fa48("719") ? point.z < checkpoint.position.z - halfDepth : stryMutAct_9fa48("718") ? point.z > checkpoint.position.z - halfDepth : stryMutAct_9fa48("717") ? true : (stryCov_9fa48("717", "718", "719"), point.z >= (stryMutAct_9fa48("720") ? checkpoint.position.z + halfDepth : (stryCov_9fa48("720"), checkpoint.position.z - halfDepth)))) && (stryMutAct_9fa48("723") ? point.z > checkpoint.position.z + halfDepth : stryMutAct_9fa48("722") ? point.z < checkpoint.position.z + halfDepth : stryMutAct_9fa48("721") ? true : (stryCov_9fa48("721", "722", "723"), point.z <= (stryMutAct_9fa48("724") ? checkpoint.position.z - halfDepth : (stryCov_9fa48("724"), checkpoint.position.z + halfDepth)))));
      return stryMutAct_9fa48("727") ? inX && inY || inZ : stryMutAct_9fa48("726") ? false : stryMutAct_9fa48("725") ? true : (stryCov_9fa48("725", "726", "727"), (stryMutAct_9fa48("729") ? inX || inY : stryMutAct_9fa48("728") ? true : (stryCov_9fa48("728", "729"), inX && inY)) && inZ);
    }
  }

  /**
   * Checks if a checkpoint can be passed (validates sequential order)
   */
  public canPassCheckpoint(checkpointId: string): boolean {
    if (stryMutAct_9fa48("730")) {
      {}
    } else {
      stryCov_9fa48("730");
      const checkpoint = this.checkpoints.get(checkpointId);
      if (stryMutAct_9fa48("733") ? false : stryMutAct_9fa48("732") ? true : stryMutAct_9fa48("731") ? checkpoint : (stryCov_9fa48("731", "732", "733"), !checkpoint)) return stryMutAct_9fa48("734") ? true : (stryCov_9fa48("734"), false);

      // Already passed
      if (stryMutAct_9fa48("736") ? false : stryMutAct_9fa48("735") ? true : (stryCov_9fa48("735", "736"), checkpoint.passed)) return stryMutAct_9fa48("737") ? true : (stryCov_9fa48("737"), false);

      // Get all checkpoints with lower order
      const previousCheckpoints = stryMutAct_9fa48("738") ? this.getAllCheckpoints() : (stryCov_9fa48("738"), this.getAllCheckpoints().filter(stryMutAct_9fa48("739") ? () => undefined : (stryCov_9fa48("739"), cp => stryMutAct_9fa48("743") ? cp.order >= checkpoint.order : stryMutAct_9fa48("742") ? cp.order <= checkpoint.order : stryMutAct_9fa48("741") ? false : stryMutAct_9fa48("740") ? true : (stryCov_9fa48("740", "741", "742", "743"), cp.order < checkpoint.order))));

      // All previous checkpoints must be passed
      return stryMutAct_9fa48("744") ? previousCheckpoints.some(cp => cp.passed) : (stryCov_9fa48("744"), previousCheckpoints.every(stryMutAct_9fa48("745") ? () => undefined : (stryCov_9fa48("745"), cp => cp.passed)));
    }
  }

  /**
   * Calculates completion percentage (0-100)
   */
  public getProgressPercentage(): number {
    if (stryMutAct_9fa48("746")) {
      {}
    } else {
      stryCov_9fa48("746");
      const all = this.getAllCheckpoints();
      if (stryMutAct_9fa48("749") ? all.length !== 0 : stryMutAct_9fa48("748") ? false : stryMutAct_9fa48("747") ? true : (stryCov_9fa48("747", "748", "749"), all.length === 0)) return 0;
      const passed = this.getPassedCheckpoints().length;
      return Math.round(stryMutAct_9fa48("750") ? passed / all.length / 100 : (stryCov_9fa48("750"), (stryMutAct_9fa48("751") ? passed * all.length : (stryCov_9fa48("751"), passed / all.length)) * 100));
    }
  }
}