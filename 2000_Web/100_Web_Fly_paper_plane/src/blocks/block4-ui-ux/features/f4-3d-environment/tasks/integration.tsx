/**
 * Task 4.4.5: 3D Rendering Integration
 *
 * Feature 4.4의 모든 컴포넌트를 통합하는 씬 컴포넌트
 */

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
  obstacles?: Array<{ position: [number, number, number]; rotation?: [number, number, number] }>;
  children?: ReactNode;
}

// 기본 체크포인트 위치
export const DEFAULT_CHECKPOINTS: Array<[number, number, number]> = [
  [0, 0, 20],
  [0, 0, 40],
  [0, 0, 60],
  [0, 0, 80],
];

// 기본 장애물 위치
export const DEFAULT_OBSTACLES: Array<{ position: [number, number, number]; rotation?: [number, number, number] }> = [
  { position: [5, 0, 25] },
  { position: [-5, 0, 45] },
  { position: [0, 3, 70] },
];

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
  planePosition = [0, 0, 0],
  planeRotation = [0, 0, 0],
  showStartGate = true,
  showEndGate = true,
  checkpoints = DEFAULT_CHECKPOINTS,
  obstacles = DEFAULT_OBSTACLES,
  children,
}: ThreeDSceneProps = {}) => {
  return (
    <SceneSetup>
      {/* Lighting */}
      <DynamicLighting />

      {/* Plane */}
      <PaperPlane position={planePosition} rotation={planeRotation} />

      {/* Camera */}
      <CameraController targetPosition={planePosition} />

      {/* Course Elements */}
      {showStartGate && <StartGate />}
      {showEndGate && <EndGate />}

      {/* Checkpoints */}
      {checkpoints.map((position, index) => (
        <Checkpoint key={`checkpoint-${index}`} position={position} />
      ))}

      {/* Obstacles */}
      {obstacles.map((obstacle, index) => (
        <ObstacleWall
          key={`obstacle-${index}`}
          position={obstacle.position}
          rotation={obstacle.rotation}
        />
      ))}

      {/* Additional children */}
      {children}
    </SceneSetup>
  );
};

/**
 * SimpleScene - 최소 씬 (테스트용)
 */
export const SimpleScene = () => {
  return (
    <SceneSetup>
      <DynamicLighting />
      <PaperPlane />
      <CameraController targetPosition={[0, 0, 0]} />
    </SceneSetup>
  );
};

/**
 * FullCourseScene - 완전한 코스 씬
 */
export const FullCourseScene = () => {
  return (
    <ThreeDScene
      planePosition={[0, 0, 0]}
      showStartGate={true}
      showEndGate={true}
      checkpoints={DEFAULT_CHECKPOINTS}
      obstacles={DEFAULT_OBSTACLES}
    />
  );
};
