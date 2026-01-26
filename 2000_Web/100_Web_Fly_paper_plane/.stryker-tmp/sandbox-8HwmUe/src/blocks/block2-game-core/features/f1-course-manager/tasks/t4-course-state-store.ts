/**
 * Task 2.1.4: Course State Store
 *
 * Zustand store for global course state management:
 * - Current course definition
 * - Active checkpoints
 * - Active obstacles
 * - Course loaded status
 *
 * @example
 * const store = createCourseStore()
 * store.getState().setCourse(courseDefinition)
 * store.getState().addCheckpoint(checkpoint)
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
import { create } from 'zustand';
import type { CourseDefinition } from './t1-course-definition';
import type { Checkpoint } from './t2-checkpoint-system';
import type { Obstacle } from './t3-obstacle-manager';
export interface CourseState {
  // State
  course: CourseDefinition | null;
  checkpoints: Checkpoint[];
  obstacles: Obstacle[];
  isLoaded: boolean;

  // Actions
  setCourse: (course: CourseDefinition) => void;
  setCheckpoints: (checkpoints: Checkpoint[]) => void;
  setObstacles: (obstacles: Obstacle[]) => void;
  addCheckpoint: (checkpoint: Checkpoint) => void;
  removeCheckpoint: (id: string) => void;
  addObstacle: (obstacle: Obstacle) => void;
  removeObstacle: (id: string) => void;
  setLoaded: (loaded: boolean) => void;
  reset: () => void;
}

/**
 * Creates a course state store instance
 */
export const createCourseStore = () => {
  if (stryMutAct_9fa48("834")) {
    {}
  } else {
    stryCov_9fa48("834");
    return create<CourseState>(stryMutAct_9fa48("835") ? () => undefined : (stryCov_9fa48("835"), set => stryMutAct_9fa48("836") ? {} : (stryCov_9fa48("836"), {
      // Initial state
      course: null,
      checkpoints: stryMutAct_9fa48("837") ? ["Stryker was here"] : (stryCov_9fa48("837"), []),
      obstacles: stryMutAct_9fa48("838") ? ["Stryker was here"] : (stryCov_9fa48("838"), []),
      isLoaded: stryMutAct_9fa48("839") ? true : (stryCov_9fa48("839"), false),
      // Course definition actions
      setCourse: stryMutAct_9fa48("840") ? () => undefined : (stryCov_9fa48("840"), course => set(stryMutAct_9fa48("841") ? {} : (stryCov_9fa48("841"), {
        course
      }))),
      // Checkpoint actions
      setCheckpoints: stryMutAct_9fa48("842") ? () => undefined : (stryCov_9fa48("842"), checkpoints => set(stryMutAct_9fa48("843") ? {} : (stryCov_9fa48("843"), {
        checkpoints
      }))),
      addCheckpoint: stryMutAct_9fa48("844") ? () => undefined : (stryCov_9fa48("844"), checkpoint => set(stryMutAct_9fa48("845") ? () => undefined : (stryCov_9fa48("845"), state => stryMutAct_9fa48("846") ? {} : (stryCov_9fa48("846"), {
        checkpoints: stryMutAct_9fa48("847") ? [] : (stryCov_9fa48("847"), [...state.checkpoints, checkpoint])
      })))),
      removeCheckpoint: stryMutAct_9fa48("848") ? () => undefined : (stryCov_9fa48("848"), id => set(stryMutAct_9fa48("849") ? () => undefined : (stryCov_9fa48("849"), state => stryMutAct_9fa48("850") ? {} : (stryCov_9fa48("850"), {
        checkpoints: stryMutAct_9fa48("851") ? state.checkpoints : (stryCov_9fa48("851"), state.checkpoints.filter(stryMutAct_9fa48("852") ? () => undefined : (stryCov_9fa48("852"), cp => stryMutAct_9fa48("855") ? cp.id === id : stryMutAct_9fa48("854") ? false : stryMutAct_9fa48("853") ? true : (stryCov_9fa48("853", "854", "855"), cp.id !== id))))
      })))),
      // Obstacle actions
      setObstacles: stryMutAct_9fa48("856") ? () => undefined : (stryCov_9fa48("856"), obstacles => set(stryMutAct_9fa48("857") ? {} : (stryCov_9fa48("857"), {
        obstacles
      }))),
      addObstacle: stryMutAct_9fa48("858") ? () => undefined : (stryCov_9fa48("858"), obstacle => set(stryMutAct_9fa48("859") ? () => undefined : (stryCov_9fa48("859"), state => stryMutAct_9fa48("860") ? {} : (stryCov_9fa48("860"), {
        obstacles: stryMutAct_9fa48("861") ? [] : (stryCov_9fa48("861"), [...state.obstacles, obstacle])
      })))),
      removeObstacle: stryMutAct_9fa48("862") ? () => undefined : (stryCov_9fa48("862"), id => set(stryMutAct_9fa48("863") ? () => undefined : (stryCov_9fa48("863"), state => stryMutAct_9fa48("864") ? {} : (stryCov_9fa48("864"), {
        obstacles: stryMutAct_9fa48("865") ? state.obstacles : (stryCov_9fa48("865"), state.obstacles.filter(stryMutAct_9fa48("866") ? () => undefined : (stryCov_9fa48("866"), obs => stryMutAct_9fa48("869") ? obs.id === id : stryMutAct_9fa48("868") ? false : stryMutAct_9fa48("867") ? true : (stryCov_9fa48("867", "868", "869"), obs.id !== id))))
      })))),
      // Loading state
      setLoaded: stryMutAct_9fa48("870") ? () => undefined : (stryCov_9fa48("870"), loaded => set(stryMutAct_9fa48("871") ? {} : (stryCov_9fa48("871"), {
        isLoaded: loaded
      }))),
      // Reset all state
      reset: stryMutAct_9fa48("872") ? () => undefined : (stryCov_9fa48("872"), () => set(stryMutAct_9fa48("873") ? {} : (stryCov_9fa48("873"), {
        course: null,
        checkpoints: stryMutAct_9fa48("874") ? ["Stryker was here"] : (stryCov_9fa48("874"), []),
        obstacles: stryMutAct_9fa48("875") ? ["Stryker was here"] : (stryCov_9fa48("875"), []),
        isLoaded: stryMutAct_9fa48("876") ? true : (stryCov_9fa48("876"), false)
      })))
    })));
  }
};