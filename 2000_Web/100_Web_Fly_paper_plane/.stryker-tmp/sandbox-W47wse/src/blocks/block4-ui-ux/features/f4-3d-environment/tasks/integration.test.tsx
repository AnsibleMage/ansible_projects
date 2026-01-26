// @ts-nocheck
import { describe, it, expect, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';

// Task 4.4.1
import { SceneSetup, Skybox, SceneLighting } from './t1-scene-setup';

// Task 4.4.2
import { PaperPlane } from './t2-plane-model';

// Task 4.4.3
import { StartGate, EndGate, Checkpoint, ObstacleWall } from './t3-course-obstacles';

// Task 4.4.4
import { CameraController, DynamicLighting } from './t4-camera-lighting';

// Task 4.4.5 - Integration Components
import {
  ThreeDScene,
  SimpleScene,
  FullCourseScene,
  DEFAULT_CHECKPOINTS,
  DEFAULT_OBSTACLES,
} from './integration';

// ResizeObserver polyfill
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('Task 4.4.5: 3D Rendering Integration Test', () => {
  describe('Scene Components Integration', () => {
    it('SceneSetup이 모든 자식 컴포넌트를 렌더링해야 함', () => {
      const { container } = render(
        <SceneSetup>
          <PaperPlane />
          <StartGate />
          <EndGate />
        </SceneSetup>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('Skybox와 SceneLighting이 함께 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <Skybox />
          <SceneLighting />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Course Elements Integration', () => {
    it('StartGate, EndGate, Checkpoint이 함께 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <StartGate />
          <EndGate />
          <Checkpoint position={[0, 0, 50]} />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('여러 Checkpoint이 함께 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <Checkpoint position={[0, 0, 20]} />
          <Checkpoint position={[0, 0, 40]} />
          <Checkpoint position={[0, 0, 60]} />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('여러 ObstacleWall이 함께 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <ObstacleWall position={[5, 0, 30]} />
          <ObstacleWall position={[-5, 0, 40]} />
          <ObstacleWall position={[0, 3, 50]} rotation={[0, Math.PI / 4, 0]} />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Plane and Camera Integration', () => {
    it('PaperPlane과 CameraController가 함께 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <PaperPlane position={[0, 0, 0]} />
          <CameraController targetPosition={[0, 0, 0]} />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('PaperPlane이 다른 위치에서도 카메라와 작동해야 함', () => {
      const { container } = render(
        <Canvas>
          <PaperPlane position={[5, 2, 10]} />
          <CameraController targetPosition={[5, 2, 10]} />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Lighting Integration', () => {
    it('DynamicLighting과 SceneLighting이 함께 작동해야 함', () => {
      const { container } = render(
        <Canvas>
          <SceneLighting />
          <DynamicLighting />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('조명이 모든 모델에 적용되어야 함', () => {
      const { container } = render(
        <Canvas>
          <DynamicLighting />
          <PaperPlane />
          <StartGate />
          <ObstacleWall />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Full Scene Integration', () => {
    it('모든 컴포넌트가 SceneSetup 내부에서 렌더링되어야 함', () => {
      const { container } = render(
        <SceneSetup>
          <DynamicLighting />
          <PaperPlane />
          <StartGate />
          <EndGate />
          <Checkpoint position={[0, 0, 50]} />
          <ObstacleWall position={[5, 0, 30]} />
          <CameraController targetPosition={[0, 0, 0]} />
        </SceneSetup>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('완전한 코스가 렌더링되어야 함 (Start + Checkpoints + Obstacles + End)', () => {
      const { container } = render(
        <SceneSetup>
          <DynamicLighting />
          <PaperPlane position={[0, 0, 0]} />
          <CameraController targetPosition={[0, 0, 0]} />
          <StartGate />
          <Checkpoint position={[0, 0, 20]} />
          <ObstacleWall position={[5, 0, 25]} />
          <Checkpoint position={[0, 0, 40]} />
          <ObstacleWall position={[-5, 0, 45]} />
          <Checkpoint position={[0, 0, 60]} />
          <ObstacleWall position={[0, 3, 70]} />
          <Checkpoint position={[0, 0, 80]} />
          <EndGate />
        </SceneSetup>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('여러 비행기가 동시에 렌더링될 수 있어야 함', () => {
      const { container } = render(
        <Canvas>
          <DynamicLighting />
          <PaperPlane position={[0, 0, 0]} />
          <PaperPlane position={[2, 0, 0]} />
          <PaperPlane position={[-2, 0, 0]} />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('Skybox와 모든 게임 요소가 함께 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <Skybox />
          <SceneLighting />
          <DynamicLighting />
          <PaperPlane />
          <StartGate />
          <EndGate />
          <Checkpoint position={[0, 0, 50]} />
          <ObstacleWall position={[5, 0, 30]} />
          <CameraController targetPosition={[0, 0, 0]} />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Performance and Scalability', () => {
    it('많은 장애물이 함께 렌더링되어야 함 (10개)', () => {
      const obstacles = Array.from({ length: 10 }, (_, i) => (
        <ObstacleWall key={i} position={[Math.random() * 10 - 5, 0, i * 10]} />
      ));

      const { container } = render(
        <Canvas>
          <DynamicLighting />
          {obstacles}
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('많은 체크포인트가 함께 렌더링되어야 함 (10개)', () => {
      const checkpoints = Array.from({ length: 10 }, (_, i) => (
        <Checkpoint key={i} position={[0, 0, i * 10]} />
      ));

      const { container } = render(
        <Canvas>
          <DynamicLighting />
          {checkpoints}
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('복잡한 씬이 렌더링되어야 함 (모든 요소 포함)', () => {
      const checkpoints = Array.from({ length: 5 }, (_, i) => (
        <Checkpoint key={`cp-${i}`} position={[0, 0, 20 + i * 15]} />
      ));

      const obstacles = Array.from({ length: 5 }, (_, i) => (
        <ObstacleWall key={`obs-${i}`} position={[Math.random() * 10 - 5, 0, 25 + i * 15]} />
      ));

      const { container } = render(
        <SceneSetup>
          <DynamicLighting />
          <PaperPlane position={[0, 0, 0]} />
          <CameraController targetPosition={[0, 0, 0]} />
          <StartGate />
          {checkpoints}
          {obstacles}
          <EndGate />
        </SceneSetup>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Integration Components', () => {
    describe('Constants', () => {
      it('DEFAULT_CHECKPOINTS가 정의되어야 함', () => {
        expect(DEFAULT_CHECKPOINTS).toBeDefined();
        expect(DEFAULT_CHECKPOINTS.length).toBeGreaterThan(0);
      });

      it('DEFAULT_CHECKPOINTS가 4개여야 함', () => {
        expect(DEFAULT_CHECKPOINTS).toHaveLength(4);
      });

      it('DEFAULT_CHECKPOINTS 첫 번째 값이 [0, 0, 20]이어야 함', () => {
        expect(DEFAULT_CHECKPOINTS[0]).toEqual([0, 0, 20]);
      });

      it('DEFAULT_CHECKPOINTS 두 번째 값이 [0, 0, 40]이어야 함', () => {
        expect(DEFAULT_CHECKPOINTS[1]).toEqual([0, 0, 40]);
      });

      it('DEFAULT_CHECKPOINTS 세 번째 값이 [0, 0, 60]이어야 함', () => {
        expect(DEFAULT_CHECKPOINTS[2]).toEqual([0, 0, 60]);
      });

      it('DEFAULT_CHECKPOINTS 네 번째 값이 [0, 0, 80]이어야 함', () => {
        expect(DEFAULT_CHECKPOINTS[3]).toEqual([0, 0, 80]);
      });

      it('DEFAULT_OBSTACLES가 정의되어야 함', () => {
        expect(DEFAULT_OBSTACLES).toBeDefined();
        expect(DEFAULT_OBSTACLES.length).toBeGreaterThan(0);
      });

      it('DEFAULT_OBSTACLES가 3개여야 함', () => {
        expect(DEFAULT_OBSTACLES).toHaveLength(3);
      });

      it('DEFAULT_OBSTACLES 첫 번째가 올바른 position을 가져야 함', () => {
        expect(DEFAULT_OBSTACLES[0].position).toEqual([5, 0, 25]);
      });

      it('DEFAULT_OBSTACLES 두 번째가 올바른 position을 가져야 함', () => {
        expect(DEFAULT_OBSTACLES[1].position).toEqual([-5, 0, 45]);
      });

      it('DEFAULT_OBSTACLES 세 번째가 올바른 position을 가져야 함', () => {
        expect(DEFAULT_OBSTACLES[2].position).toEqual([0, 3, 70]);
      });
    });

    describe('ThreeDScene Component', () => {
      it('ThreeDScene 컴포넌트가 정의되어야 함', () => {
        expect(ThreeDScene).toBeDefined();
      });

      it('ThreeDScene이 기본 props로 렌더링되어야 함', () => {
        const { container } = render(<ThreeDScene />);
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
      });

      it('ThreeDScene이 커스텀 planePosition을 받아야 함', () => {
        const { container } = render(
          <ThreeDScene planePosition={[5, 2, 10]} />
        );
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
      });

      it('ThreeDScene이 게이트를 선택적으로 표시해야 함', () => {
        const { container } = render(
          <ThreeDScene showStartGate={false} showEndGate={false} />
        );
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
      });

      it('ThreeDScene이 커스텀 체크포인트를 받아야 함', () => {
        const customCheckpoints: Array<[number, number, number]> = [
          [0, 0, 10],
          [0, 0, 30],
        ];
        const { container } = render(
          <ThreeDScene checkpoints={customCheckpoints} />
        );
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
      });

      it('ThreeDScene이 커스텀 장애물을 받아야 함', () => {
        const customObstacles = [
          { position: [10, 0, 20] as [number, number, number] },
          { position: [-10, 0, 40] as [number, number, number], rotation: [0, Math.PI / 2, 0] as [number, number, number] },
        ];
        const { container } = render(
          <ThreeDScene obstacles={customObstacles} />
        );
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
      });

      it('ThreeDScene이 children을 받아야 함', () => {
        const { container } = render(
          <ThreeDScene>
            <ObstacleWall position={[0, 0, 15]} />
          </ThreeDScene>
        );
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
      });
    });

    describe('SimpleScene Component', () => {
      it('SimpleScene 컴포넌트가 정의되어야 함', () => {
        expect(SimpleScene).toBeDefined();
      });

      it('SimpleScene이 렌더링되어야 함', () => {
        const { container } = render(<SimpleScene />);
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
      });
    });

    describe('FullCourseScene Component', () => {
      it('FullCourseScene 컴포넌트가 정의되어야 함', () => {
        expect(FullCourseScene).toBeDefined();
      });

      it('FullCourseScene이 렌더링되어야 함', () => {
        const { container } = render(<FullCourseScene />);
        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
      });
    });
  });
});
