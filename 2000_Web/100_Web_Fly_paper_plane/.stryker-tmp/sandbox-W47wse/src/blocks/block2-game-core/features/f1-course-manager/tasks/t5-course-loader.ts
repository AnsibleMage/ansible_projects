/**
 * Task 2.1.5: Course Loader
 *
 * Loads course data into the state store:
 * - Validates course definition
 * - Generates checkpoints (start, intermediate, finish)
 * - Generates obstacles (random placement)
 * - Loads everything into zustand store
 * - Provides reset functionality
 *
 * @example
 * const loader = new CourseLoader(courseStore)
 * loader.loadCourse(DEFAULT_COURSE)
 * loader.resetCourse()
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
import type { CourseDefinition } from './t1-course-definition';
import { CourseValidator } from './t1-course-definition';
import type { Checkpoint } from './t2-checkpoint-system';
import { DEFAULT_CHECKPOINT_SIZE } from './t2-checkpoint-system';
import type { Obstacle } from './t3-obstacle-manager';
import { DEFAULT_OBSTACLE_SIZE } from './t3-obstacle-manager';
import type { createCourseStore } from './t4-course-state-store';
export class CourseLoader {
  private store: ReturnType<typeof createCourseStore>;
  private validator: CourseValidator;
  constructor(store: ReturnType<typeof createCourseStore>) {
    if (stryMutAct_9fa48("877")) {
      {}
    } else {
      stryCov_9fa48("877");
      this.store = store;
      this.validator = new CourseValidator();
    }
  }

  /**
   * Loads a complete course into the store
   */
  public loadCourse(course: CourseDefinition): void {
    if (stryMutAct_9fa48("878")) {
      {}
    } else {
      stryCov_9fa48("878");
      // Validate course
      const validation = this.validator.validate(course);
      if (stryMutAct_9fa48("881") ? false : stryMutAct_9fa48("880") ? true : stryMutAct_9fa48("879") ? validation.isValid : (stryCov_9fa48("879", "880", "881"), !validation.isValid)) {
        if (stryMutAct_9fa48("882")) {
          {}
        } else {
          stryCov_9fa48("882");
          throw new Error(stryMutAct_9fa48("883") ? `` : (stryCov_9fa48("883"), `Invalid course: ${validation.errors.join(stryMutAct_9fa48("884") ? "" : (stryCov_9fa48("884"), ', '))}`));
        }
      }

      // Load course definition
      this.store.getState().setCourse(course);

      // Generate and load checkpoints
      const checkpoints = this.generateCheckpoints(course);
      this.store.getState().setCheckpoints(checkpoints);

      // Generate and load obstacles
      const obstacles = this.generateObstacles(course);
      this.store.getState().setObstacles(obstacles);

      // Mark as loaded
      this.store.getState().setLoaded(stryMutAct_9fa48("885") ? false : (stryCov_9fa48("885"), true));
    }
  }

  /**
   * Resets the course to initial state
   */
  public resetCourse(): void {
    if (stryMutAct_9fa48("886")) {
      {}
    } else {
      stryCov_9fa48("886");
      this.store.getState().reset();
    }
  }

  /**
   * Resets all checkpoint passed states
   */
  public resetCheckpoints(): void {
    if (stryMutAct_9fa48("887")) {
      {}
    } else {
      stryCov_9fa48("887");
      const checkpoints = this.store.getState().checkpoints;
      const reset = checkpoints.map(stryMutAct_9fa48("888") ? () => undefined : (stryCov_9fa48("888"), cp => stryMutAct_9fa48("889") ? {} : (stryCov_9fa48("889"), {
        ...cp,
        passed: stryMutAct_9fa48("890") ? true : (stryCov_9fa48("890"), false)
      })));
      this.store.getState().setCheckpoints(reset);
    }
  }

  /**
   * Generates checkpoints from course definition
   */
  private generateCheckpoints(course: CourseDefinition): Checkpoint[] {
    if (stryMutAct_9fa48("891")) {
      {}
    } else {
      stryCov_9fa48("891");
      const checkpoints: Checkpoint[] = stryMutAct_9fa48("892") ? ["Stryker was here"] : (stryCov_9fa48("892"), []);

      // Start checkpoint
      checkpoints.push(stryMutAct_9fa48("893") ? {} : (stryCov_9fa48("893"), {
        id: stryMutAct_9fa48("894") ? "" : (stryCov_9fa48("894"), 'start'),
        type: stryMutAct_9fa48("895") ? "" : (stryCov_9fa48("895"), 'start'),
        position: stryMutAct_9fa48("896") ? {} : (stryCov_9fa48("896"), {
          ...course.startPoint
        }),
        size: DEFAULT_CHECKPOINT_SIZE,
        order: 0,
        passed: stryMutAct_9fa48("897") ? true : (stryCov_9fa48("897"), false)
      }));

      // Intermediate checkpoints (3 evenly spaced)
      const startZ = course.startPoint.z;
      const finishZ = course.finishLine.position.z;
      const distance = stryMutAct_9fa48("898") ? finishZ + startZ : (stryCov_9fa48("898"), finishZ - startZ);
      const spacing = stryMutAct_9fa48("899") ? distance * 4 : (stryCov_9fa48("899"), distance / 4); // 3 checkpoints = 4 segments

      for (let i = 1; stryMutAct_9fa48("902") ? i > 3 : stryMutAct_9fa48("901") ? i < 3 : stryMutAct_9fa48("900") ? false : (stryCov_9fa48("900", "901", "902"), i <= 3); stryMutAct_9fa48("903") ? i-- : (stryCov_9fa48("903"), i++)) {
        if (stryMutAct_9fa48("904")) {
          {}
        } else {
          stryCov_9fa48("904");
          checkpoints.push(stryMutAct_9fa48("905") ? {} : (stryCov_9fa48("905"), {
            id: stryMutAct_9fa48("906") ? `` : (stryCov_9fa48("906"), `checkpoint-${i}`),
            type: stryMutAct_9fa48("907") ? "" : (stryCov_9fa48("907"), 'checkpoint'),
            position: stryMutAct_9fa48("908") ? {} : (stryCov_9fa48("908"), {
              x: course.startPoint.x,
              y: course.startPoint.y,
              z: stryMutAct_9fa48("909") ? startZ - spacing * i : (stryCov_9fa48("909"), startZ + (stryMutAct_9fa48("910") ? spacing / i : (stryCov_9fa48("910"), spacing * i)))
            }),
            size: DEFAULT_CHECKPOINT_SIZE,
            order: i,
            passed: stryMutAct_9fa48("911") ? true : (stryCov_9fa48("911"), false)
          }));
        }
      }

      // Finish checkpoint
      checkpoints.push(stryMutAct_9fa48("912") ? {} : (stryCov_9fa48("912"), {
        id: stryMutAct_9fa48("913") ? "" : (stryCov_9fa48("913"), 'finish'),
        type: stryMutAct_9fa48("914") ? "" : (stryCov_9fa48("914"), 'finish'),
        position: stryMutAct_9fa48("915") ? {} : (stryCov_9fa48("915"), {
          ...course.finishLine.position
        }),
        size: stryMutAct_9fa48("916") ? {} : (stryCov_9fa48("916"), {
          width: course.finishLine.width,
          height: course.finishLine.height,
          depth: 2
        }),
        order: 4,
        passed: stryMutAct_9fa48("917") ? true : (stryCov_9fa48("917"), false)
      }));
      return checkpoints;
    }
  }

  /**
   * Generates obstacles from course definition
   */
  private generateObstacles(course: CourseDefinition): Obstacle[] {
    if (stryMutAct_9fa48("918")) {
      {}
    } else {
      stryCov_9fa48("918");
      const obstacles: Obstacle[] = stryMutAct_9fa48("919") ? ["Stryker was here"] : (stryCov_9fa48("919"), []);

      // Generate random obstacles along the course
      const startZ = course.startPoint.z;
      const finishZ = course.finishLine.position.z;
      const distance = stryMutAct_9fa48("920") ? finishZ + startZ : (stryCov_9fa48("920"), finishZ - startZ);

      // Create 5 obstacles
      for (let i = 0; stryMutAct_9fa48("923") ? i >= 5 : stryMutAct_9fa48("922") ? i <= 5 : stryMutAct_9fa48("921") ? false : (stryCov_9fa48("921", "922", "923"), i < 5); stryMutAct_9fa48("924") ? i-- : (stryCov_9fa48("924"), i++)) {
        if (stryMutAct_9fa48("925")) {
          {}
        } else {
          stryCov_9fa48("925");
          const zPosition = stryMutAct_9fa48("926") ? startZ - distance / 6 * (i + 1) : (stryCov_9fa48("926"), startZ + (stryMutAct_9fa48("927") ? distance / 6 / (i + 1) : (stryCov_9fa48("927"), (stryMutAct_9fa48("928") ? distance * 6 : (stryCov_9fa48("928"), distance / 6)) * (stryMutAct_9fa48("929") ? i - 1 : (stryCov_9fa48("929"), i + 1)))));
          const xOffset = stryMutAct_9fa48("930") ? (Math.random() - 0.5) / 50 : (stryCov_9fa48("930"), (stryMutAct_9fa48("931") ? Math.random() + 0.5 : (stryCov_9fa48("931"), Math.random() - 0.5)) * 50); // Random X offset

          obstacles.push(stryMutAct_9fa48("932") ? {} : (stryCov_9fa48("932"), {
            id: stryMutAct_9fa48("933") ? `` : (stryCov_9fa48("933"), `obstacle-${i}`),
            type: stryMutAct_9fa48("934") ? "" : (stryCov_9fa48("934"), 'building'),
            position: stryMutAct_9fa48("935") ? {} : (stryCov_9fa48("935"), {
              x: stryMutAct_9fa48("936") ? course.startPoint.x - xOffset : (stryCov_9fa48("936"), course.startPoint.x + xOffset),
              y: 0,
              z: zPosition
            }),
            size: DEFAULT_OBSTACLE_SIZE
          }));
        }
      }
      return obstacles;
    }
  }
}