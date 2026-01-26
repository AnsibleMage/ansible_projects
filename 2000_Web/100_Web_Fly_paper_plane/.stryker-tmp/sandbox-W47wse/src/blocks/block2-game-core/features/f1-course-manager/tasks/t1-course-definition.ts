/**
 * Task 2.1.1: Course Definition
 *
 * Defines the structure and properties of a game course:
 * - Start point: Where the plane begins
 * - Finish line: Goal position with dimensions
 * - Boundaries: 3D space limits (min/max X, Y, Z)
 * - Metadata: Course name and difficulty
 *
 * @example
 * const course = { ...DEFAULT_COURSE }
 * const validator = new CourseValidator()
 * const result = validator.validate(course)
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
export interface FinishLine {
  position: Vec3;
  width: number;
  height: number;
}
export interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}
export type Difficulty = 'easy' | 'medium' | 'hard';
export interface CourseDefinition {
  name: string;
  difficulty: Difficulty;
  startPoint: Vec3;
  finishLine: FinishLine;
  boundaries: Boundaries;
}
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Default course configuration (Explicit)
export const DEFAULT_COURSE: CourseDefinition = stryMutAct_9fa48("559") ? {} : (stryCov_9fa48("559"), {
  name: stryMutAct_9fa48("560") ? "" : (stryCov_9fa48("560"), 'Basic Course'),
  difficulty: stryMutAct_9fa48("561") ? "" : (stryCov_9fa48("561"), 'easy'),
  startPoint: stryMutAct_9fa48("562") ? {} : (stryCov_9fa48("562"), {
    x: 0,
    y: 10,
    z: 0
  }),
  finishLine: stryMutAct_9fa48("563") ? {} : (stryCov_9fa48("563"), {
    position: stryMutAct_9fa48("564") ? {} : (stryCov_9fa48("564"), {
      x: 0,
      y: 10,
      z: 200
    }),
    width: 30,
    height: 20
  }),
  boundaries: stryMutAct_9fa48("565") ? {} : (stryCov_9fa48("565"), {
    minX: stryMutAct_9fa48("566") ? +200 : (stryCov_9fa48("566"), -200),
    maxX: 200,
    minY: 0,
    maxY: 150,
    minZ: stryMutAct_9fa48("567") ? +50 : (stryCov_9fa48("567"), -50),
    maxZ: 300
  })
});
export class CourseValidator {
  /**
   * Validates a course definition for correctness
   */
  public validate(course: CourseDefinition): ValidationResult {
    if (stryMutAct_9fa48("568")) {
      {}
    } else {
      stryCov_9fa48("568");
      const errors: string[] = stryMutAct_9fa48("569") ? ["Stryker was here"] : (stryCov_9fa48("569"), []);

      // Validate boundaries
      if (stryMutAct_9fa48("572") ? false : stryMutAct_9fa48("571") ? true : stryMutAct_9fa48("570") ? this.areBoundariesValid(course.boundaries) : (stryCov_9fa48("570", "571", "572"), !this.areBoundariesValid(course.boundaries))) {
        if (stryMutAct_9fa48("573")) {
          {}
        } else {
          stryCov_9fa48("573");
          errors.push(stryMutAct_9fa48("574") ? "" : (stryCov_9fa48("574"), 'Invalid boundaries'));
        }
      }

      // Validate start point within boundaries
      if (stryMutAct_9fa48("577") ? false : stryMutAct_9fa48("576") ? true : stryMutAct_9fa48("575") ? this.isPointWithinBoundaries(course.startPoint, course.boundaries) : (stryCov_9fa48("575", "576", "577"), !this.isPointWithinBoundaries(course.startPoint, course.boundaries))) {
        if (stryMutAct_9fa48("578")) {
          {}
        } else {
          stryCov_9fa48("578");
          errors.push(stryMutAct_9fa48("579") ? "" : (stryCov_9fa48("579"), 'Start point outside boundaries'));
        }
      }

      // Validate finish line within boundaries
      if (stryMutAct_9fa48("582") ? false : stryMutAct_9fa48("581") ? true : stryMutAct_9fa48("580") ? this.isPointWithinBoundaries(course.finishLine.position, course.boundaries) : (stryCov_9fa48("580", "581", "582"), !this.isPointWithinBoundaries(course.finishLine.position, course.boundaries))) {
        if (stryMutAct_9fa48("583")) {
          {}
        } else {
          stryCov_9fa48("583");
          errors.push(stryMutAct_9fa48("584") ? "" : (stryCov_9fa48("584"), 'Finish line outside boundaries'));
        }
      }

      // Validate finish line dimensions
      if (stryMutAct_9fa48("587") ? course.finishLine.width <= 0 && course.finishLine.height <= 0 : stryMutAct_9fa48("586") ? false : stryMutAct_9fa48("585") ? true : (stryCov_9fa48("585", "586", "587"), (stryMutAct_9fa48("590") ? course.finishLine.width > 0 : stryMutAct_9fa48("589") ? course.finishLine.width < 0 : stryMutAct_9fa48("588") ? false : (stryCov_9fa48("588", "589", "590"), course.finishLine.width <= 0)) || (stryMutAct_9fa48("593") ? course.finishLine.height > 0 : stryMutAct_9fa48("592") ? course.finishLine.height < 0 : stryMutAct_9fa48("591") ? false : (stryCov_9fa48("591", "592", "593"), course.finishLine.height <= 0)))) {
        if (stryMutAct_9fa48("594")) {
          {}
        } else {
          stryCov_9fa48("594");
          errors.push(stryMutAct_9fa48("595") ? "" : (stryCov_9fa48("595"), 'Invalid finish line dimensions'));
        }
      }
      return stryMutAct_9fa48("596") ? {} : (stryCov_9fa48("596"), {
        isValid: stryMutAct_9fa48("599") ? errors.length !== 0 : stryMutAct_9fa48("598") ? false : stryMutAct_9fa48("597") ? true : (stryCov_9fa48("597", "598", "599"), errors.length === 0),
        errors
      });
    }
  }

  /**
   * Calculates straight-line distance from start to finish
   */
  public calculateDistance(course: CourseDefinition): number {
    if (stryMutAct_9fa48("600")) {
      {}
    } else {
      stryCov_9fa48("600");
      const start = course.startPoint;
      const finish = course.finishLine.position;
      const dx = stryMutAct_9fa48("601") ? finish.x + start.x : (stryCov_9fa48("601"), finish.x - start.x);
      const dy = stryMutAct_9fa48("602") ? finish.y + start.y : (stryCov_9fa48("602"), finish.y - start.y);
      const dz = stryMutAct_9fa48("603") ? finish.z + start.z : (stryCov_9fa48("603"), finish.z - start.z);
      return Math.sqrt(stryMutAct_9fa48("604") ? dx * dx + dy * dy - dz * dz : (stryCov_9fa48("604"), (stryMutAct_9fa48("605") ? dx * dx - dy * dy : (stryCov_9fa48("605"), (stryMutAct_9fa48("606") ? dx / dx : (stryCov_9fa48("606"), dx * dx)) + (stryMutAct_9fa48("607") ? dy / dy : (stryCov_9fa48("607"), dy * dy)))) + (stryMutAct_9fa48("608") ? dz / dz : (stryCov_9fa48("608"), dz * dz))));
    }
  }

  /**
   * Creates a deep copy of a course definition
   */
  public clone(course: CourseDefinition): CourseDefinition {
    if (stryMutAct_9fa48("609")) {
      {}
    } else {
      stryCov_9fa48("609");
      return stryMutAct_9fa48("610") ? {} : (stryCov_9fa48("610"), {
        name: course.name,
        difficulty: course.difficulty,
        startPoint: stryMutAct_9fa48("611") ? {} : (stryCov_9fa48("611"), {
          ...course.startPoint
        }),
        finishLine: stryMutAct_9fa48("612") ? {} : (stryCov_9fa48("612"), {
          position: stryMutAct_9fa48("613") ? {} : (stryCov_9fa48("613"), {
            ...course.finishLine.position
          }),
          width: course.finishLine.width,
          height: course.finishLine.height
        }),
        boundaries: stryMutAct_9fa48("614") ? {} : (stryCov_9fa48("614"), {
          ...course.boundaries
        })
      });
    }
  }

  /**
   * Checks if boundaries are valid (min < max for all axes)
   */
  private areBoundariesValid(boundaries: Boundaries): boolean {
    if (stryMutAct_9fa48("615")) {
      {}
    } else {
      stryCov_9fa48("615");
      return stryMutAct_9fa48("618") ? boundaries.minX < boundaries.maxX && boundaries.minY < boundaries.maxY || boundaries.minZ < boundaries.maxZ : stryMutAct_9fa48("617") ? false : stryMutAct_9fa48("616") ? true : (stryCov_9fa48("616", "617", "618"), (stryMutAct_9fa48("620") ? boundaries.minX < boundaries.maxX || boundaries.minY < boundaries.maxY : stryMutAct_9fa48("619") ? true : (stryCov_9fa48("619", "620"), (stryMutAct_9fa48("623") ? boundaries.minX >= boundaries.maxX : stryMutAct_9fa48("622") ? boundaries.minX <= boundaries.maxX : stryMutAct_9fa48("621") ? true : (stryCov_9fa48("621", "622", "623"), boundaries.minX < boundaries.maxX)) && (stryMutAct_9fa48("626") ? boundaries.minY >= boundaries.maxY : stryMutAct_9fa48("625") ? boundaries.minY <= boundaries.maxY : stryMutAct_9fa48("624") ? true : (stryCov_9fa48("624", "625", "626"), boundaries.minY < boundaries.maxY)))) && (stryMutAct_9fa48("629") ? boundaries.minZ >= boundaries.maxZ : stryMutAct_9fa48("628") ? boundaries.minZ <= boundaries.maxZ : stryMutAct_9fa48("627") ? true : (stryCov_9fa48("627", "628", "629"), boundaries.minZ < boundaries.maxZ)));
    }
  }

  /**
   * Checks if a point is within boundaries
   */
  private isPointWithinBoundaries(point: Vec3, boundaries: Boundaries): boolean {
    if (stryMutAct_9fa48("630")) {
      {}
    } else {
      stryCov_9fa48("630");
      return stryMutAct_9fa48("633") ? point.x >= boundaries.minX && point.x <= boundaries.maxX && point.y >= boundaries.minY && point.y <= boundaries.maxY && point.z >= boundaries.minZ || point.z <= boundaries.maxZ : stryMutAct_9fa48("632") ? false : stryMutAct_9fa48("631") ? true : (stryCov_9fa48("631", "632", "633"), (stryMutAct_9fa48("635") ? point.x >= boundaries.minX && point.x <= boundaries.maxX && point.y >= boundaries.minY && point.y <= boundaries.maxY || point.z >= boundaries.minZ : stryMutAct_9fa48("634") ? true : (stryCov_9fa48("634", "635"), (stryMutAct_9fa48("637") ? point.x >= boundaries.minX && point.x <= boundaries.maxX && point.y >= boundaries.minY || point.y <= boundaries.maxY : stryMutAct_9fa48("636") ? true : (stryCov_9fa48("636", "637"), (stryMutAct_9fa48("639") ? point.x >= boundaries.minX && point.x <= boundaries.maxX || point.y >= boundaries.minY : stryMutAct_9fa48("638") ? true : (stryCov_9fa48("638", "639"), (stryMutAct_9fa48("641") ? point.x >= boundaries.minX || point.x <= boundaries.maxX : stryMutAct_9fa48("640") ? true : (stryCov_9fa48("640", "641"), (stryMutAct_9fa48("644") ? point.x < boundaries.minX : stryMutAct_9fa48("643") ? point.x > boundaries.minX : stryMutAct_9fa48("642") ? true : (stryCov_9fa48("642", "643", "644"), point.x >= boundaries.minX)) && (stryMutAct_9fa48("647") ? point.x > boundaries.maxX : stryMutAct_9fa48("646") ? point.x < boundaries.maxX : stryMutAct_9fa48("645") ? true : (stryCov_9fa48("645", "646", "647"), point.x <= boundaries.maxX)))) && (stryMutAct_9fa48("650") ? point.y < boundaries.minY : stryMutAct_9fa48("649") ? point.y > boundaries.minY : stryMutAct_9fa48("648") ? true : (stryCov_9fa48("648", "649", "650"), point.y >= boundaries.minY)))) && (stryMutAct_9fa48("653") ? point.y > boundaries.maxY : stryMutAct_9fa48("652") ? point.y < boundaries.maxY : stryMutAct_9fa48("651") ? true : (stryCov_9fa48("651", "652", "653"), point.y <= boundaries.maxY)))) && (stryMutAct_9fa48("656") ? point.z < boundaries.minZ : stryMutAct_9fa48("655") ? point.z > boundaries.minZ : stryMutAct_9fa48("654") ? true : (stryCov_9fa48("654", "655", "656"), point.z >= boundaries.minZ)))) && (stryMutAct_9fa48("659") ? point.z > boundaries.maxZ : stryMutAct_9fa48("658") ? point.z < boundaries.maxZ : stryMutAct_9fa48("657") ? true : (stryCov_9fa48("657", "658", "659"), point.z <= boundaries.maxZ)));
    }
  }
}