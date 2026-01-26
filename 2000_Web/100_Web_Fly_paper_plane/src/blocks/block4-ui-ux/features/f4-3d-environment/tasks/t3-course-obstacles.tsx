/**
 * Task 4.4.3: Course & Obstacle Models
 *
 * 코스 요소 및 장애물:
 * - StartGate: 출발 게이트 (녹색)
 * - EndGate: 도착 게이트 (빨간색)
 * - Checkpoint: 체크포인트 링 (노란색 도넛)
 * - ObstacleWall: 장애물 벽 (회색)
 */

// StartGate 상수
export const START_GATE_POSITION: [number, number, number] = [0, 0, -20];
export const START_GATE_SIZE: [number, number, number] = [8, 6, 0.5];
export const START_GATE_COLOR = '#00ff00'; // 녹색

// EndGate 상수
export const END_GATE_POSITION: [number, number, number] = [0, 0, 100];
export const END_GATE_SIZE: [number, number, number] = [8, 6, 0.5];
export const END_GATE_COLOR = '#ff0000'; // 빨간색

// Checkpoint 상수
export const CHECKPOINT_RADIUS = 3;
export const CHECKPOINT_THICKNESS = 0.3;
export const CHECKPOINT_COLOR = '#ffff00'; // 노란색

// ObstacleWall 상수
export const OBSTACLE_WALL_SIZE: [number, number, number] = [5, 4, 0.5];
export const OBSTACLE_WALL_COLOR = '#808080'; // 회색

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
export const StartGate = ({ position = START_GATE_POSITION }: GateProps = {}) => {
  return (
    <group position={position}>
      {/* 왼쪽 기둥 */}
      <mesh position={[-START_GATE_SIZE[0] / 2, 0, 0]}>
        <boxGeometry args={[GATE_PILLAR_WIDTH, START_GATE_SIZE[1], START_GATE_SIZE[2]]} />
        <meshStandardMaterial color={START_GATE_COLOR} />
      </mesh>

      {/* 오른쪽 기둥 */}
      <mesh position={[START_GATE_SIZE[0] / 2, 0, 0]}>
        <boxGeometry args={[GATE_PILLAR_WIDTH, START_GATE_SIZE[1], START_GATE_SIZE[2]]} />
        <meshStandardMaterial color={START_GATE_COLOR} />
      </mesh>

      {/* 상단 바 */}
      <mesh position={[0, START_GATE_SIZE[1] / 2, 0]}>
        <boxGeometry args={[START_GATE_SIZE[0], GATE_TOP_BAR_HEIGHT, START_GATE_SIZE[2]]} />
        <meshStandardMaterial color={START_GATE_COLOR} />
      </mesh>
    </group>
  );
};

// EndGate 컴포넌트 (StartGate와 동일 구조, 색상만 다름)
export const EndGate = ({ position = END_GATE_POSITION }: GateProps = {}) => {
  return (
    <group position={position}>
      {/* 왼쪽 기둥 */}
      <mesh position={[-END_GATE_SIZE[0] / 2, 0, 0]}>
        <boxGeometry args={[GATE_PILLAR_WIDTH, END_GATE_SIZE[1], END_GATE_SIZE[2]]} />
        <meshStandardMaterial color={END_GATE_COLOR} />
      </mesh>

      {/* 오른쪽 기둥 */}
      <mesh position={[END_GATE_SIZE[0] / 2, 0, 0]}>
        <boxGeometry args={[GATE_PILLAR_WIDTH, END_GATE_SIZE[1], END_GATE_SIZE[2]]} />
        <meshStandardMaterial color={END_GATE_COLOR} />
      </mesh>

      {/* 상단 바 */}
      <mesh position={[0, END_GATE_SIZE[1] / 2, 0]}>
        <boxGeometry args={[END_GATE_SIZE[0], GATE_TOP_BAR_HEIGHT, END_GATE_SIZE[2]]} />
        <meshStandardMaterial color={END_GATE_COLOR} />
      </mesh>
    </group>
  );
};

// Checkpoint 컴포넌트 (도넛 형태 링)
export const Checkpoint = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: CheckpointProps = {}) => {
  return (
    <mesh position={position} rotation={rotation}>
      <torusGeometry args={[CHECKPOINT_RADIUS, CHECKPOINT_THICKNESS, 16, 100]} />
      <meshStandardMaterial color={CHECKPOINT_COLOR} />
    </mesh>
  );
};

// ObstacleWall 컴포넌트 (단순 벽)
export const ObstacleWall = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: ObstacleWallProps = {}) => {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={OBSTACLE_WALL_SIZE} />
      <meshStandardMaterial color={OBSTACLE_WALL_COLOR} />
    </mesh>
  );
};
