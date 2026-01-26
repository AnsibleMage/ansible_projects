/**
 * Task 4.4.5: 3D Rendering Integration
 *
 * Feature 4.4의 모든 컴포넌트를 통합하는 씬 컴포넌트
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
import { ReactNode } from 'react';

// Task 4.4.1
import { SceneSetup } from './t1-scene-setup';

// Task 4.4.2
import { PaperPlane } from './t2-plane-model';

// Task 4.4.3
import { StartGate, EndGate, Checkpoint, ObstacleWall } from './t3-course-obstacles';

// Task 4.4.4
import { CameraController, DynamicLighting } from './t4-camera-lighting';

// ThreeDScene Props
export interface ThreeDSceneProps {
  planePosition?: [number, number, number];
  planeRotation?: [number, number, number];
  showStartGate?: boolean;
  showEndGate?: boolean;
  checkpoints?: Array<[number, number, number]>;
  obstacles?: Array<{
    position: [number, number, number];
    rotation?: [number, number, number];
  }>;
  children?: ReactNode;
}

// 기본 체크포인트 위치
export const DEFAULT_CHECKPOINTS: Array<[number, number, number]> = stryMutAct_9fa48("1947") ? [] : (stryCov_9fa48("1947"), [stryMutAct_9fa48("1948") ? [] : (stryCov_9fa48("1948"), [0, 0, 20]), stryMutAct_9fa48("1949") ? [] : (stryCov_9fa48("1949"), [0, 0, 40]), stryMutAct_9fa48("1950") ? [] : (stryCov_9fa48("1950"), [0, 0, 60]), stryMutAct_9fa48("1951") ? [] : (stryCov_9fa48("1951"), [0, 0, 80])]);

// 기본 장애물 위치
export const DEFAULT_OBSTACLES: Array<{
  position: [number, number, number];
  rotation?: [number, number, number];
}> = stryMutAct_9fa48("1952") ? [] : (stryCov_9fa48("1952"), [stryMutAct_9fa48("1953") ? {} : (stryCov_9fa48("1953"), {
  position: stryMutAct_9fa48("1954") ? [] : (stryCov_9fa48("1954"), [5, 0, 25])
}), stryMutAct_9fa48("1955") ? {} : (stryCov_9fa48("1955"), {
  position: stryMutAct_9fa48("1956") ? [] : (stryCov_9fa48("1956"), [stryMutAct_9fa48("1957") ? +5 : (stryCov_9fa48("1957"), -5), 0, 45])
}), stryMutAct_9fa48("1958") ? {} : (stryCov_9fa48("1958"), {
  position: stryMutAct_9fa48("1959") ? [] : (stryCov_9fa48("1959"), [0, 3, 70])
})]);

/**
 * ThreeDScene - Feature 4.4 통합 씬 컴포넌트
 *
 * 모든 3D 렌더링 요소를 포함하는 완전한 씬:
 * - SceneSetup (Canvas + Skybox + Lighting)
 * - PaperPlane
 * - CameraController
 * - DynamicLighting
 * - Course elements (Start/End gates, Checkpoints, Obstacles)
 */
export const ThreeDScene = ({
  planePosition = stryMutAct_9fa48("1960") ? [] : (stryCov_9fa48("1960"), [0, 0, 0]),
  planeRotation = stryMutAct_9fa48("1961") ? [] : (stryCov_9fa48("1961"), [0, 0, 0]),
  showStartGate = stryMutAct_9fa48("1962") ? false : (stryCov_9fa48("1962"), true),
  showEndGate = stryMutAct_9fa48("1963") ? false : (stryCov_9fa48("1963"), true),
  checkpoints = DEFAULT_CHECKPOINTS,
  obstacles = DEFAULT_OBSTACLES,
  children
}: ThreeDSceneProps = {}) => {
  if (stryMutAct_9fa48("1964")) {
    {}
  } else {
    stryCov_9fa48("1964");
    return <SceneSetup>
      {/* Lighting */}
      <DynamicLighting />

      {/* Plane */}
      <PaperPlane position={planePosition} rotation={planeRotation} />

      {/* Camera */}
      <CameraController targetPosition={planePosition} />

      {/* Course Elements */}
      {stryMutAct_9fa48("1967") ? showStartGate || <StartGate /> : stryMutAct_9fa48("1966") ? false : stryMutAct_9fa48("1965") ? true : (stryCov_9fa48("1965", "1966", "1967"), showStartGate && <StartGate />)}
      {stryMutAct_9fa48("1970") ? showEndGate || <EndGate /> : stryMutAct_9fa48("1969") ? false : stryMutAct_9fa48("1968") ? true : (stryCov_9fa48("1968", "1969", "1970"), showEndGate && <EndGate />)}

      {/* Checkpoints */}
      {checkpoints.map(stryMutAct_9fa48("1971") ? () => undefined : (stryCov_9fa48("1971"), (position, index) => <Checkpoint key={stryMutAct_9fa48("1972") ? `` : (stryCov_9fa48("1972"), `checkpoint-${index}`)} position={position} />))}

      {/* Obstacles */}
      {obstacles.map(stryMutAct_9fa48("1973") ? () => undefined : (stryCov_9fa48("1973"), (obstacle, index) => <ObstacleWall key={stryMutAct_9fa48("1974") ? `` : (stryCov_9fa48("1974"), `obstacle-${index}`)} position={obstacle.position} rotation={obstacle.rotation} />))}

      {/* Additional children */}
      {children}
    </SceneSetup>;
  }
};

/**
 * SimpleScene - 최소 씬 (테스트용)
 */
export const SimpleScene = () => {
  if (stryMutAct_9fa48("1975")) {
    {}
  } else {
    stryCov_9fa48("1975");
    return <SceneSetup>
      <DynamicLighting />
      <PaperPlane />
      <CameraController targetPosition={stryMutAct_9fa48("1976") ? [] : (stryCov_9fa48("1976"), [0, 0, 0])} />
    </SceneSetup>;
  }
};

/**
 * FullCourseScene - 완전한 코스 씬
 */
export const FullCourseScene = () => {
  if (stryMutAct_9fa48("1977")) {
    {}
  } else {
    stryCov_9fa48("1977");
    return <ThreeDScene planePosition={stryMutAct_9fa48("1978") ? [] : (stryCov_9fa48("1978"), [0, 0, 0])} showStartGate={stryMutAct_9fa48("1979") ? false : (stryCov_9fa48("1979"), true)} showEndGate={stryMutAct_9fa48("1980") ? false : (stryCov_9fa48("1980"), true)} checkpoints={DEFAULT_CHECKPOINTS} obstacles={DEFAULT_OBSTACLES} />;
  }
};