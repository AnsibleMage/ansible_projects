// @ts-nocheck
import { describe, it, expect, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import {
  PaperPlane,
  PLANE_INITIAL_POSITION,
  PLANE_INITIAL_ROTATION,
  PLANE_SCALE,
  PLANE_COLOR,
  PLANE_GEOMETRY_ARGS,
} from './t2-plane-model';

// ResizeObserver polyfill
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('Task 4.4.2: Plane Model Integration', () => {
  describe('PaperPlane Component', () => {
    it('PaperPlane 컴포넌트가 정의되어야 함', () => {
      expect(PaperPlane).toBeDefined();
    });

    it('PaperPlane이 렌더링 가능해야 함', () => {
      const result = PaperPlane();
      expect(result).toBeDefined();
    });

    it('PaperPlane이 Canvas 내부에서 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <PaperPlane />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Plane Position', () => {
    it('PLANE_INITIAL_POSITION이 정의되어야 함', () => {
      expect(PLANE_INITIAL_POSITION).toBeDefined();
    });

    it('PLANE_INITIAL_POSITION이 [0, 0, 0]이어야 함', () => {
      expect(PLANE_INITIAL_POSITION).toHaveLength(3);
      expect(PLANE_INITIAL_POSITION[0]).toBe(0);
      expect(PLANE_INITIAL_POSITION[1]).toBe(0);
      expect(PLANE_INITIAL_POSITION[2]).toBe(0);
    });
  });

  describe('Plane Rotation', () => {
    it('PLANE_INITIAL_ROTATION이 정의되어야 함', () => {
      expect(PLANE_INITIAL_ROTATION).toBeDefined();
    });

    it('PLANE_INITIAL_ROTATION이 [0, 0, 0]이어야 함', () => {
      expect(PLANE_INITIAL_ROTATION).toHaveLength(3);
      expect(PLANE_INITIAL_ROTATION[0]).toBe(0);
      expect(PLANE_INITIAL_ROTATION[1]).toBe(0);
      expect(PLANE_INITIAL_ROTATION[2]).toBe(0);
    });
  });

  describe('Plane Scale', () => {
    it('PLANE_SCALE이 정의되어야 함', () => {
      expect(PLANE_SCALE).toBeDefined();
    });

    it('PLANE_SCALE이 1이어야 함', () => {
      expect(PLANE_SCALE).toBe(1);
    });
  });

  describe('Plane Geometry', () => {
    it('PaperPlane이 mesh를 포함해야 함', () => {
      const result = PaperPlane();
      expect(result.type).toBe('mesh');
    });

    it('PaperPlane이 geometry를 가져야 함', () => {
      const result = PaperPlane();
      expect(result.props.children).toBeDefined();
    });

    it('PaperPlane이 material을 가져야 함', () => {
      const result = PaperPlane();
      expect(result.props.children).toBeDefined();
    });

    it('PLANE_GEOMETRY_ARGS가 [2, 0.5, 1]이어야 함', () => {
      expect(PLANE_GEOMETRY_ARGS).toHaveLength(3);
      expect(PLANE_GEOMETRY_ARGS[0]).toBe(2); // width
      expect(PLANE_GEOMETRY_ARGS[1]).toBe(0.5); // height
      expect(PLANE_GEOMETRY_ARGS[2]).toBe(1); // depth
    });
  });

  describe('Plane Color', () => {
    it('PLANE_COLOR가 정의되어야 함', () => {
      expect(PLANE_COLOR).toBeDefined();
    });

    it('PLANE_COLOR가 흰색(#ffffff)이어야 함', () => {
      expect(PLANE_COLOR).toBe('#ffffff');
    });
  });

  describe('Integration', () => {
    it('PaperPlane이 position prop을 받을 수 있어야 함', () => {
      const customPosition: [number, number, number] = [1, 2, 3];
      const result = PaperPlane({ position: customPosition });
      expect(result).toBeDefined();
    });

    it('PaperPlane이 rotation prop을 받을 수 있어야 함', () => {
      const customRotation: [number, number, number] = [0, Math.PI, 0];
      const result = PaperPlane({ rotation: customRotation });
      expect(result).toBeDefined();
    });

    it('PaperPlane이 scale prop을 받을 수 있어야 함', () => {
      const result = PaperPlane({ scale: 2 });
      expect(result).toBeDefined();
    });
  });
});
