/**
 * Task 4.4.2: Plane Model Integration
 *
 * 종이비행기 3D 모델:
 * - 임시 Box geometry (추후 GLTF 모델로 교체)
 * - Position, Rotation, Scale 제어
 * - Block 1 연동 준비
 */
// @ts-nocheck


// 상수 정의 (테스트를 위해 export)
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
export const PLANE_INITIAL_POSITION: [number, number, number] = stryMutAct_9fa48("1992") ? [] : (stryCov_9fa48("1992"), [0, 0, 0]);
export const PLANE_INITIAL_ROTATION: [number, number, number] = stryMutAct_9fa48("1993") ? [] : (stryCov_9fa48("1993"), [0, 0, 0]);
export const PLANE_SCALE = 1;
export const PLANE_COLOR = stryMutAct_9fa48("1994") ? "" : (stryCov_9fa48("1994"), '#ffffff'); // 흰색 종이
export const PLANE_GEOMETRY_ARGS: [number, number, number] = stryMutAct_9fa48("1995") ? [] : (stryCov_9fa48("1995"), [2, 0.5, 1]); // [width, height, depth]

// PaperPlane Props
interface PaperPlaneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

// PaperPlane 컴포넌트
export const PaperPlane = ({
  position = PLANE_INITIAL_POSITION,
  rotation = PLANE_INITIAL_ROTATION,
  scale = PLANE_SCALE
}: PaperPlaneProps = {}) => {
  if (stryMutAct_9fa48("1996")) {
    {}
  } else {
    stryCov_9fa48("1996");
    return <mesh position={position} rotation={rotation} scale={scale}>
      {/* Box Geometry - 종이비행기 모양 근사 */}
      <boxGeometry args={PLANE_GEOMETRY_ARGS} />

      {/* Standard Material - 흰색 종이 */}
      <meshStandardMaterial color={PLANE_COLOR} />
    </mesh>;
  }
};