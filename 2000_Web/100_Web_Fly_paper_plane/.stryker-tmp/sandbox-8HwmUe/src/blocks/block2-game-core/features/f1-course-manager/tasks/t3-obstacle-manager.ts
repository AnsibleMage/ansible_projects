/**
 * Task 2.1.3: Obstacle Manager
 *
 * Manages obstacles placed throughout the course:
 * - Add/remove obstacles with 3D position and size
 * - Collision detection (point-in-box)
 * - Spatial queries (find nearby obstacles)
 * - Filter by obstacle type
 *
 * @example
 * const manager = new ObstacleManager()
 * manager.addObstacle({ id: 'building1', type: 'building', position: {...}, size: {...} })
 * const hit = manager.checkCollisionWithAny(planePosition)
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
export interface ObstacleSize {
  width: number;
  height: number;
  depth: number;
}
export type ObstacleType = 'building' | 'ring' | 'wall' | 'other';
export interface Obstacle {
  id: string;
  type: ObstacleType;
  position: Vec3;
  size: ObstacleSize;
}

// Default obstacle size (Explicit)
export const DEFAULT_OBSTACLE_SIZE: ObstacleSize = stryMutAct_9fa48("752") ? {} : (stryCov_9fa48("752"), {
  width: 5,
  height: 20,
  depth: 5
});
export class ObstacleManager {
  private obstacles: Map<string, Obstacle> = new Map();

  /**
   * Adds an obstacle to the manager
   */
  public addObstacle(obstacle: Obstacle): void {
    if (stryMutAct_9fa48("753")) {
      {}
    } else {
      stryCov_9fa48("753");
      this.obstacles.set(obstacle.id, obstacle);
    }
  }

  /**
   * Gets an obstacle by ID
   */
  public getObstacle(id: string): Obstacle | undefined {
    if (stryMutAct_9fa48("754")) {
      {}
    } else {
      stryCov_9fa48("754");
      return this.obstacles.get(id);
    }
  }

  /**
   * Removes an obstacle by ID
   */
  public removeObstacle(id: string): void {
    if (stryMutAct_9fa48("755")) {
      {}
    } else {
      stryCov_9fa48("755");
      this.obstacles.delete(id);
    }
  }

  /**
   * Clears all obstacles
   */
  public clearAll(): void {
    if (stryMutAct_9fa48("756")) {
      {}
    } else {
      stryCov_9fa48("756");
      this.obstacles.clear();
    }
  }

  /**
   * Gets all obstacles
   */
  public getAllObstacles(): Obstacle[] {
    if (stryMutAct_9fa48("757")) {
      {}
    } else {
      stryCov_9fa48("757");
      return Array.from(this.obstacles.values());
    }
  }

  /**
   * Gets total obstacle count
   */
  public getObstacleCount(): number {
    if (stryMutAct_9fa48("758")) {
      {}
    } else {
      stryCov_9fa48("758");
      return this.obstacles.size;
    }
  }

  /**
   * Checks if a point is inside a specific obstacle's bounding box
   */
  public isPointInObstacle(point: Vec3, obstacleId: string): boolean {
    if (stryMutAct_9fa48("759")) {
      {}
    } else {
      stryCov_9fa48("759");
      const obstacle = this.obstacles.get(obstacleId);
      if (stryMutAct_9fa48("762") ? false : stryMutAct_9fa48("761") ? true : stryMutAct_9fa48("760") ? obstacle : (stryCov_9fa48("760", "761", "762"), !obstacle)) return stryMutAct_9fa48("763") ? true : (stryCov_9fa48("763"), false);
      return this.isPointInBox(point, obstacle.position, obstacle.size);
    }
  }

  /**
   * Checks collision with any obstacle (returns first hit)
   */
  public checkCollisionWithAny(point: Vec3): Obstacle | null {
    if (stryMutAct_9fa48("764")) {
      {}
    } else {
      stryCov_9fa48("764");
      for (const obstacle of this.obstacles.values()) {
        if (stryMutAct_9fa48("765")) {
          {}
        } else {
          stryCov_9fa48("765");
          if (stryMutAct_9fa48("767") ? false : stryMutAct_9fa48("766") ? true : (stryCov_9fa48("766", "767"), this.isPointInBox(point, obstacle.position, obstacle.size))) {
            if (stryMutAct_9fa48("768")) {
              {}
            } else {
              stryCov_9fa48("768");
              return obstacle;
            }
          }
        }
      }
      return null;
    }
  }

  /**
   * Gets obstacles near a point within a radius
   */
  public getObstaclesNearPoint(point: Vec3, radius: number): Obstacle[] {
    if (stryMutAct_9fa48("769")) {
      {}
    } else {
      stryCov_9fa48("769");
      const nearby: Obstacle[] = stryMutAct_9fa48("770") ? ["Stryker was here"] : (stryCov_9fa48("770"), []);
      for (const obstacle of this.obstacles.values()) {
        if (stryMutAct_9fa48("771")) {
          {}
        } else {
          stryCov_9fa48("771");
          const distance = this.calculateDistance(point, obstacle.position);
          if (stryMutAct_9fa48("775") ? distance > radius : stryMutAct_9fa48("774") ? distance < radius : stryMutAct_9fa48("773") ? false : stryMutAct_9fa48("772") ? true : (stryCov_9fa48("772", "773", "774", "775"), distance <= radius)) {
            if (stryMutAct_9fa48("776")) {
              {}
            } else {
              stryCov_9fa48("776");
              nearby.push(obstacle);
            }
          }
        }
      }
      return nearby;
    }
  }

  /**
   * Gets obstacles by type
   */
  public getObstaclesByType(type: ObstacleType): Obstacle[] {
    if (stryMutAct_9fa48("777")) {
      {}
    } else {
      stryCov_9fa48("777");
      return stryMutAct_9fa48("778") ? this.getAllObstacles() : (stryCov_9fa48("778"), this.getAllObstacles().filter(stryMutAct_9fa48("779") ? () => undefined : (stryCov_9fa48("779"), obs => stryMutAct_9fa48("782") ? obs.type !== type : stryMutAct_9fa48("781") ? false : stryMutAct_9fa48("780") ? true : (stryCov_9fa48("780", "781", "782"), obs.type === type))));
    }
  }

  /**
   * Checks if a point is inside a 3D bounding box
   */
  private isPointInBox(point: Vec3, position: Vec3, size: ObstacleSize): boolean {
    if (stryMutAct_9fa48("783")) {
      {}
    } else {
      stryCov_9fa48("783");
      const halfWidth = stryMutAct_9fa48("784") ? size.width * 2 : (stryCov_9fa48("784"), size.width / 2);
      const halfHeight = stryMutAct_9fa48("785") ? size.height * 2 : (stryCov_9fa48("785"), size.height / 2);
      const halfDepth = stryMutAct_9fa48("786") ? size.depth * 2 : (stryCov_9fa48("786"), size.depth / 2);
      const inX = stryMutAct_9fa48("789") ? point.x >= position.x - halfWidth || point.x <= position.x + halfWidth : stryMutAct_9fa48("788") ? false : stryMutAct_9fa48("787") ? true : (stryCov_9fa48("787", "788", "789"), (stryMutAct_9fa48("792") ? point.x < position.x - halfWidth : stryMutAct_9fa48("791") ? point.x > position.x - halfWidth : stryMutAct_9fa48("790") ? true : (stryCov_9fa48("790", "791", "792"), point.x >= (stryMutAct_9fa48("793") ? position.x + halfWidth : (stryCov_9fa48("793"), position.x - halfWidth)))) && (stryMutAct_9fa48("796") ? point.x > position.x + halfWidth : stryMutAct_9fa48("795") ? point.x < position.x + halfWidth : stryMutAct_9fa48("794") ? true : (stryCov_9fa48("794", "795", "796"), point.x <= (stryMutAct_9fa48("797") ? position.x - halfWidth : (stryCov_9fa48("797"), position.x + halfWidth)))));
      const inY = stryMutAct_9fa48("800") ? point.y >= position.y - halfHeight || point.y <= position.y + halfHeight : stryMutAct_9fa48("799") ? false : stryMutAct_9fa48("798") ? true : (stryCov_9fa48("798", "799", "800"), (stryMutAct_9fa48("803") ? point.y < position.y - halfHeight : stryMutAct_9fa48("802") ? point.y > position.y - halfHeight : stryMutAct_9fa48("801") ? true : (stryCov_9fa48("801", "802", "803"), point.y >= (stryMutAct_9fa48("804") ? position.y + halfHeight : (stryCov_9fa48("804"), position.y - halfHeight)))) && (stryMutAct_9fa48("807") ? point.y > position.y + halfHeight : stryMutAct_9fa48("806") ? point.y < position.y + halfHeight : stryMutAct_9fa48("805") ? true : (stryCov_9fa48("805", "806", "807"), point.y <= (stryMutAct_9fa48("808") ? position.y - halfHeight : (stryCov_9fa48("808"), position.y + halfHeight)))));
      const inZ = stryMutAct_9fa48("811") ? point.z >= position.z - halfDepth || point.z <= position.z + halfDepth : stryMutAct_9fa48("810") ? false : stryMutAct_9fa48("809") ? true : (stryCov_9fa48("809", "810", "811"), (stryMutAct_9fa48("814") ? point.z < position.z - halfDepth : stryMutAct_9fa48("813") ? point.z > position.z - halfDepth : stryMutAct_9fa48("812") ? true : (stryCov_9fa48("812", "813", "814"), point.z >= (stryMutAct_9fa48("815") ? position.z + halfDepth : (stryCov_9fa48("815"), position.z - halfDepth)))) && (stryMutAct_9fa48("818") ? point.z > position.z + halfDepth : stryMutAct_9fa48("817") ? point.z < position.z + halfDepth : stryMutAct_9fa48("816") ? true : (stryCov_9fa48("816", "817", "818"), point.z <= (stryMutAct_9fa48("819") ? position.z - halfDepth : (stryCov_9fa48("819"), position.z + halfDepth)))));
      return stryMutAct_9fa48("822") ? inX && inY || inZ : stryMutAct_9fa48("821") ? false : stryMutAct_9fa48("820") ? true : (stryCov_9fa48("820", "821", "822"), (stryMutAct_9fa48("824") ? inX || inY : stryMutAct_9fa48("823") ? true : (stryCov_9fa48("823", "824"), inX && inY)) && inZ);
    }
  }

  /**
   * Calculates Euclidean distance between two points
   */
  private calculateDistance(p1: Vec3, p2: Vec3): number {
    if (stryMutAct_9fa48("825")) {
      {}
    } else {
      stryCov_9fa48("825");
      const dx = stryMutAct_9fa48("826") ? p2.x + p1.x : (stryCov_9fa48("826"), p2.x - p1.x);
      const dy = stryMutAct_9fa48("827") ? p2.y + p1.y : (stryCov_9fa48("827"), p2.y - p1.y);
      const dz = stryMutAct_9fa48("828") ? p2.z + p1.z : (stryCov_9fa48("828"), p2.z - p1.z);
      return Math.sqrt(stryMutAct_9fa48("829") ? dx * dx + dy * dy - dz * dz : (stryCov_9fa48("829"), (stryMutAct_9fa48("830") ? dx * dx - dy * dy : (stryCov_9fa48("830"), (stryMutAct_9fa48("831") ? dx / dx : (stryCov_9fa48("831"), dx * dx)) + (stryMutAct_9fa48("832") ? dy / dy : (stryCov_9fa48("832"), dy * dy)))) + (stryMutAct_9fa48("833") ? dz / dz : (stryCov_9fa48("833"), dz * dz))));
    }
  }
}