/**
 * Task 4.4.3: Course & Obstacle Models
 *
 * 코스 요소 및 장애물:
 * - StartGate: 출발 게이트 (녹색)
 * - EndGate: 도착 게이트 (빨간색)
 * - Checkpoint: 체크포인트 링 (노란색 도넛)
 * - ObstacleWall: 장애물 벽 (회색)
 */
// @ts-nocheck


// StartGate 상수
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
export const START_GATE_POSITION: [number, number, number] = stryMutAct_9fa48("1997") ? [] : (stryCov_9fa48("1997"), [0, 0, stryMutAct_9fa48("1998") ? +20 : (stryCov_9fa48("1998"), -20)]);
export const START_GATE_SIZE: [number, number, number] = stryMutAct_9fa48("1999") ? [] : (stryCov_9fa48("1999"), [8, 6, 0.5]);
export const START_GATE_COLOR = stryMutAct_9fa48("2000") ? "" : (stryCov_9fa48("2000"), '#00ff00'); // 녹색

// EndGate 상수
export const END_GATE_POSITION: [number, number, number] = stryMutAct_9fa48("2001") ? [] : (stryCov_9fa48("2001"), [0, 0, 100]);
export const END_GATE_SIZE: [number, number, number] = stryMutAct_9fa48("2002") ? [] : (stryCov_9fa48("2002"), [8, 6, 0.5]);
export const END_GATE_COLOR = stryMutAct_9fa48("2003") ? "" : (stryCov_9fa48("2003"), '#ff0000'); // 빨간색

// Checkpoint 상수
export const CHECKPOINT_RADIUS = 3;
export const CHECKPOINT_THICKNESS = 0.3;
export const CHECKPOINT_COLOR = stryMutAct_9fa48("2004") ? "" : (stryCov_9fa48("2004"), '#ffff00'); // 노란색

// ObstacleWall 상수
export const OBSTACLE_WALL_SIZE: [number, number, number] = stryMutAct_9fa48("2005") ? [] : (stryCov_9fa48("2005"), [5, 4, 0.5]);
export const OBSTACLE_WALL_COLOR = stryMutAct_9fa48("2006") ? "" : (stryCov_9fa48("2006"), '#808080'); // 회색

// Gate 내부 구조 상수
export const GATE_PILLAR_WIDTH = 0.5;
export const GATE_TOP_BAR_HEIGHT = 0.5;

// Gate Props (공통)
interface GateProps {
  position?: [number, number, number];
}

// Checkpoint Props
interface CheckpointProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// ObstacleWall Props
interface ObstacleWallProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// StartGate 컴포넌트 (기둥 2개 + 상단 바)
export const StartGate = ({
  position = START_GATE_POSITION
}: GateProps = {}) => {
  if (stryMutAct_9fa48("2007")) {
    {}
  } else {
    stryCov_9fa48("2007");
    return <group position={position}>
      {/* 왼쪽 기둥 */}
      <mesh position={stryMutAct_9fa48("2008") ? [] : (stryCov_9fa48("2008"), [stryMutAct_9fa48("2009") ? -START_GATE_SIZE[0] * 2 : (stryCov_9fa48("2009"), (stryMutAct_9fa48("2010") ? +START_GATE_SIZE[0] : (stryCov_9fa48("2010"), -START_GATE_SIZE[0])) / 2), 0, 0])}>
        <boxGeometry args={stryMutAct_9fa48("2011") ? [] : (stryCov_9fa48("2011"), [GATE_PILLAR_WIDTH, START_GATE_SIZE[1], START_GATE_SIZE[2]])} />
        <meshStandardMaterial color={START_GATE_COLOR} />
      </mesh>

      {/* 오른쪽 기둥 */}
      <mesh position={stryMutAct_9fa48("2012") ? [] : (stryCov_9fa48("2012"), [stryMutAct_9fa48("2013") ? START_GATE_SIZE[0] * 2 : (stryCov_9fa48("2013"), START_GATE_SIZE[0] / 2), 0, 0])}>
        <boxGeometry args={stryMutAct_9fa48("2014") ? [] : (stryCov_9fa48("2014"), [GATE_PILLAR_WIDTH, START_GATE_SIZE[1], START_GATE_SIZE[2]])} />
        <meshStandardMaterial color={START_GATE_COLOR} />
      </mesh>

      {/* 상단 바 */}
      <mesh position={stryMutAct_9fa48("2015") ? [] : (stryCov_9fa48("2015"), [0, stryMutAct_9fa48("2016") ? START_GATE_SIZE[1] * 2 : (stryCov_9fa48("2016"), START_GATE_SIZE[1] / 2), 0])}>
        <boxGeometry args={stryMutAct_9fa48("2017") ? [] : (stryCov_9fa48("2017"), [START_GATE_SIZE[0], GATE_TOP_BAR_HEIGHT, START_GATE_SIZE[2]])} />
        <meshStandardMaterial color={START_GATE_COLOR} />
      </mesh>
    </group>;
  }
};

// EndGate 컴포넌트 (StartGate와 동일 구조, 색상만 다름)
export const EndGate = ({
  position = END_GATE_POSITION
}: GateProps = {}) => {
  if (stryMutAct_9fa48("2018")) {
    {}
  } else {
    stryCov_9fa48("2018");
    return <group position={position}>
      {/* 왼쪽 기둥 */}
      <mesh position={stryMutAct_9fa48("2019") ? [] : (stryCov_9fa48("2019"), [stryMutAct_9fa48("2020") ? -END_GATE_SIZE[0] * 2 : (stryCov_9fa48("2020"), (stryMutAct_9fa48("2021") ? +END_GATE_SIZE[0] : (stryCov_9fa48("2021"), -END_GATE_SIZE[0])) / 2), 0, 0])}>
        <boxGeometry args={stryMutAct_9fa48("2022") ? [] : (stryCov_9fa48("2022"), [GATE_PILLAR_WIDTH, END_GATE_SIZE[1], END_GATE_SIZE[2]])} />
        <meshStandardMaterial color={END_GATE_COLOR} />
      </mesh>

      {/* 오른쪽 기둥 */}
      <mesh position={stryMutAct_9fa48("2023") ? [] : (stryCov_9fa48("2023"), [stryMutAct_9fa48("2024") ? END_GATE_SIZE[0] * 2 : (stryCov_9fa48("2024"), END_GATE_SIZE[0] / 2), 0, 0])}>
        <boxGeometry args={stryMutAct_9fa48("2025") ? [] : (stryCov_9fa48("2025"), [GATE_PILLAR_WIDTH, END_GATE_SIZE[1], END_GATE_SIZE[2]])} />
        <meshStandardMaterial color={END_GATE_COLOR} />
      </mesh>

      {/* 상단 바 */}
      <mesh position={stryMutAct_9fa48("2026") ? [] : (stryCov_9fa48("2026"), [0, stryMutAct_9fa48("2027") ? END_GATE_SIZE[1] * 2 : (stryCov_9fa48("2027"), END_GATE_SIZE[1] / 2), 0])}>
        <boxGeometry args={stryMutAct_9fa48("2028") ? [] : (stryCov_9fa48("2028"), [END_GATE_SIZE[0], GATE_TOP_BAR_HEIGHT, END_GATE_SIZE[2]])} />
        <meshStandardMaterial color={END_GATE_COLOR} />
      </mesh>
    </group>;
  }
};

// Checkpoint 컴포넌트 (도넛 형태 링)
export const Checkpoint = ({
  position = stryMutAct_9fa48("2029") ? [] : (stryCov_9fa48("2029"), [0, 0, 0]),
  rotation = stryMutAct_9fa48("2030") ? [] : (stryCov_9fa48("2030"), [0, 0, 0])
}: CheckpointProps = {}) => {
  if (stryMutAct_9fa48("2031")) {
    {}
  } else {
    stryCov_9fa48("2031");
    return <mesh position={position} rotation={rotation}>
      <torusGeometry args={stryMutAct_9fa48("2032") ? [] : (stryCov_9fa48("2032"), [CHECKPOINT_RADIUS, CHECKPOINT_THICKNESS, 16, 100])} />
      <meshStandardMaterial color={CHECKPOINT_COLOR} />
    </mesh>;
  }
};

// ObstacleWall 컴포넌트 (단순 벽)
export const ObstacleWall = ({
  position = stryMutAct_9fa48("2033") ? [] : (stryCov_9fa48("2033"), [0, 0, 0]),
  rotation = stryMutAct_9fa48("2034") ? [] : (stryCov_9fa48("2034"), [0, 0, 0])
}: ObstacleWallProps = {}) => {
  if (stryMutAct_9fa48("2035")) {
    {}
  } else {
    stryCov_9fa48("2035");
    return <mesh position={position} rotation={rotation}>
      <boxGeometry args={OBSTACLE_WALL_SIZE} />
      <meshStandardMaterial color={OBSTACLE_WALL_COLOR} />
    </mesh>;
  }
};