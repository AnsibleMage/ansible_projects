import { describe, it, expect, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import {
  StartGate,
  EndGate,
  Checkpoint,
  ObstacleWall,
  START_GATE_POSITION,
  START_GATE_SIZE,
  START_GATE_COLOR,
  END_GATE_POSITION,
  END_GATE_SIZE,
  END_GATE_COLOR,
  CHECKPOINT_RADIUS,
  CHECKPOINT_THICKNESS,
  CHECKPOINT_COLOR,
  OBSTACLE_WALL_SIZE,
  OBSTACLE_WALL_COLOR,
  GATE_PILLAR_WIDTH,
  GATE_TOP_BAR_HEIGHT,
} from './t3-course-obstacles';

// ResizeObserver polyfill
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('Task 4.4.3: Course & Obstacle Models', () => {
  describe('StartGate Component', () => {
    it('StartGate 컴포넌트가 정의되어야 함', () => {
      expect(StartGate).toBeDefined();
    });

    it('StartGate이 렌더링 가능해야 함', () => {
      const result = StartGate();
      expect(result).toBeDefined();
    });

    it('StartGate이 Canvas 내부에서 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <StartGate />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('START_GATE_POSITION이 정의되어야 함', () => {
      expect(START_GATE_POSITION).toBeDefined();
      expect(START_GATE_POSITION).toHaveLength(3);
    });

    it('START_GATE_POSITION이 [0, 0, -20]이어야 함', () => {
      expect(START_GATE_POSITION[0]).toBe(0);
      expect(START_GATE_POSITION[1]).toBe(0);
      expect(START_GATE_POSITION[2]).toBe(-20);
    });

    it('START_GATE_SIZE가 [8, 6, 0.5]이어야 함', () => {
      expect(START_GATE_SIZE).toHaveLength(3);
      expect(START_GATE_SIZE[0]).toBe(8); // width
      expect(START_GATE_SIZE[1]).toBe(6); // height
      expect(START_GATE_SIZE[2]).toBe(0.5); // depth
    });

    it('START_GATE_COLOR가 녹색(#00ff00)이어야 함', () => {
      expect(START_GATE_COLOR).toBe('#00ff00');
    });
  });

  describe('EndGate Component', () => {
    it('EndGate 컴포넌트가 정의되어야 함', () => {
      expect(EndGate).toBeDefined();
    });

    it('EndGate이 렌더링 가능해야 함', () => {
      const result = EndGate();
      expect(result).toBeDefined();
    });

    it('EndGate이 Canvas 내부에서 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <EndGate />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('END_GATE_POSITION이 [0, 0, 100]이어야 함', () => {
      expect(END_GATE_POSITION).toHaveLength(3);
      expect(END_GATE_POSITION[0]).toBe(0);
      expect(END_GATE_POSITION[1]).toBe(0);
      expect(END_GATE_POSITION[2]).toBe(100);
    });

    it('END_GATE_SIZE가 [8, 6, 0.5]이어야 함', () => {
      expect(END_GATE_SIZE).toHaveLength(3);
      expect(END_GATE_SIZE[0]).toBe(8);
      expect(END_GATE_SIZE[1]).toBe(6);
      expect(END_GATE_SIZE[2]).toBe(0.5);
    });

    it('END_GATE_COLOR가 빨간색(#ff0000)이어야 함', () => {
      expect(END_GATE_COLOR).toBe('#ff0000');
    });
  });

  describe('Checkpoint Component', () => {
    it('Checkpoint 컴포넌트가 정의되어야 함', () => {
      expect(Checkpoint).toBeDefined();
    });

    it('Checkpoint이 렌더링 가능해야 함', () => {
      const result = Checkpoint();
      expect(result).toBeDefined();
    });

    it('Checkpoint이 Canvas 내부에서 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <Checkpoint />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('CHECKPOINT_RADIUS가 3이어야 함', () => {
      expect(CHECKPOINT_RADIUS).toBe(3);
    });

    it('CHECKPOINT_THICKNESS가 0.3이어야 함', () => {
      expect(CHECKPOINT_THICKNESS).toBe(0.3);
    });

    it('CHECKPOINT_COLOR가 노란색(#ffff00)이어야 함', () => {
      expect(CHECKPOINT_COLOR).toBe('#ffff00');
    });

    it('Checkpoint이 position prop을 받을 수 있어야 함', () => {
      const customPosition: [number, number, number] = [0, 0, 50];
      const result = Checkpoint({ position: customPosition });
      expect(result).toBeDefined();
    });
  });

  describe('ObstacleWall Component', () => {
    it('ObstacleWall 컴포넌트가 정의되어야 함', () => {
      expect(ObstacleWall).toBeDefined();
    });

    it('ObstacleWall이 렌더링 가능해야 함', () => {
      const result = ObstacleWall();
      expect(result).toBeDefined();
    });

    it('ObstacleWall이 Canvas 내부에서 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <ObstacleWall />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('OBSTACLE_WALL_SIZE가 [5, 4, 0.5]이어야 함', () => {
      expect(OBSTACLE_WALL_SIZE).toHaveLength(3);
      expect(OBSTACLE_WALL_SIZE[0]).toBe(5); // width
      expect(OBSTACLE_WALL_SIZE[1]).toBe(4); // height
      expect(OBSTACLE_WALL_SIZE[2]).toBe(0.5); // depth
    });

    it('OBSTACLE_WALL_COLOR가 회색(#808080)이어야 함', () => {
      expect(OBSTACLE_WALL_COLOR).toBe('#808080');
    });

    it('ObstacleWall이 position prop을 받을 수 있어야 함', () => {
      const customPosition: [number, number, number] = [5, 0, 30];
      const result = ObstacleWall({ position: customPosition });
      expect(result).toBeDefined();
    });

    it('ObstacleWall이 rotation prop을 받을 수 있어야 함', () => {
      const customRotation: [number, number, number] = [0, Math.PI / 4, 0];
      const result = ObstacleWall({ rotation: customRotation });
      expect(result).toBeDefined();
    });
  });

  describe('Gate Structure Constants', () => {
    it('GATE_PILLAR_WIDTH가 0.5이어야 함', () => {
      expect(GATE_PILLAR_WIDTH).toBe(0.5);
    });

    it('GATE_TOP_BAR_HEIGHT가 0.5이어야 함', () => {
      expect(GATE_TOP_BAR_HEIGHT).toBe(0.5);
    });
  });

  describe('Component Structure', () => {
    it('StartGate이 group을 포함해야 함', () => {
      const result = StartGate();
      expect(result.type).toBe('group');
    });

    it('StartGate이 기본 position을 가져야 함', () => {
      const result = StartGate();
      expect(result.props.position).toEqual(START_GATE_POSITION);
    });

    it('StartGate이 3개의 mesh를 포함해야 함 (기둥 2개 + 상단 바)', () => {
      const result = StartGate();
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      expect(children.length).toBe(3);
      children.forEach((child: any) => {
        expect(child.type).toBe('mesh');
      });
    });

    it('StartGate의 왼쪽 기둥이 올바른 위치에 있어야 함', () => {
      const result = StartGate();
      const children = result.props.children;
      const leftPillar = children[0];
      expect(leftPillar.props.position[0]).toBe(-START_GATE_SIZE[0] / 2);
      expect(leftPillar.props.position[1]).toBe(0);
      expect(leftPillar.props.position[2]).toBe(0);
    });

    it('StartGate의 오른쪽 기둥이 올바른 위치에 있어야 함', () => {
      const result = StartGate();
      const children = result.props.children;
      const rightPillar = children[1];
      expect(rightPillar.props.position[0]).toBe(START_GATE_SIZE[0] / 2);
      expect(rightPillar.props.position[1]).toBe(0);
      expect(rightPillar.props.position[2]).toBe(0);
    });

    it('StartGate의 상단 바가 올바른 위치에 있어야 함', () => {
      const result = StartGate();
      const children = result.props.children;
      const topBar = children[2];
      expect(topBar.props.position[0]).toBe(0);
      expect(topBar.props.position[1]).toBe(START_GATE_SIZE[1] / 2);
      expect(topBar.props.position[2]).toBe(0);
    });

    it('EndGate이 group을 포함해야 함', () => {
      const result = EndGate();
      expect(result.type).toBe('group');
    });

    it('EndGate이 기본 position을 가져야 함', () => {
      const result = EndGate();
      expect(result.props.position).toEqual(END_GATE_POSITION);
    });

    it('EndGate이 3개의 mesh를 포함해야 함 (기둥 2개 + 상단 바)', () => {
      const result = EndGate();
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      expect(children.length).toBe(3);
      children.forEach((child: any) => {
        expect(child.type).toBe('mesh');
      });
    });

    it('EndGate의 왼쪽 기둥이 올바른 위치에 있어야 함', () => {
      const result = EndGate();
      const children = result.props.children;
      const leftPillar = children[0];
      expect(leftPillar.props.position[0]).toBe(-END_GATE_SIZE[0] / 2);
      expect(leftPillar.props.position[1]).toBe(0);
      expect(leftPillar.props.position[2]).toBe(0);
    });

    it('EndGate의 오른쪽 기둥이 올바른 위치에 있어야 함', () => {
      const result = EndGate();
      const children = result.props.children;
      const rightPillar = children[1];
      expect(rightPillar.props.position[0]).toBe(END_GATE_SIZE[0] / 2);
      expect(rightPillar.props.position[1]).toBe(0);
      expect(rightPillar.props.position[2]).toBe(0);
    });

    it('EndGate의 상단 바가 올바른 위치에 있어야 함', () => {
      const result = EndGate();
      const children = result.props.children;
      const topBar = children[2];
      expect(topBar.props.position[0]).toBe(0);
      expect(topBar.props.position[1]).toBe(END_GATE_SIZE[1] / 2);
      expect(topBar.props.position[2]).toBe(0);
    });

    it('Checkpoint이 mesh를 포함해야 함', () => {
      const result = Checkpoint();
      expect(result.type).toBe('mesh');
    });

    it('Checkpoint이 기본 position을 가져야 함', () => {
      const result = Checkpoint();
      expect(result.props.position).toEqual([0, 0, 0]);
    });

    it('Checkpoint이 기본 rotation을 가져야 함', () => {
      const result = Checkpoint();
      expect(result.props.rotation).toEqual([0, 0, 0]);
    });

    it('ObstacleWall이 mesh를 포함해야 함', () => {
      const result = ObstacleWall();
      expect(result.type).toBe('mesh');
    });

    it('ObstacleWall이 기본 position을 가져야 함', () => {
      const result = ObstacleWall();
      expect(result.props.position).toEqual([0, 0, 0]);
    });

    it('ObstacleWall이 기본 rotation을 가져야 함', () => {
      const result = ObstacleWall();
      expect(result.props.rotation).toEqual([0, 0, 0]);
    });
  });
});
