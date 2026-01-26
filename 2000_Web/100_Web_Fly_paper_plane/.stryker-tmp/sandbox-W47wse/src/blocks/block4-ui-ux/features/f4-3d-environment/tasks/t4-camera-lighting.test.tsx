// @ts-nocheck
import { describe, it, expect, beforeAll } from 'vitest';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import {
  CameraController,
  CAMERA_OFFSET,
  CAMERA_SMOOTHNESS,
  CAMERA_FOV,
  CAMERA_NEAR,
  CAMERA_FAR,
  DynamicLighting,
  AMBIENT_INTENSITY,
  DIRECTIONAL_INTENSITY,
  DIRECTIONAL_POSITION,
  SHADOW_MAP_SIZE,
  enableShadows,
  SHADOW_CAMERA_FAR,
  SHADOW_CAMERA_LEFT,
  SHADOW_CAMERA_RIGHT,
  SHADOW_CAMERA_TOP,
  SHADOW_CAMERA_BOTTOM,
} from './t4-camera-lighting';

// ResizeObserver polyfill
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('Task 4.4.4: Camera & Lighting', () => {
  describe('Camera Constants', () => {
    it('CAMERA_OFFSET이 정의되어야 함', () => {
      expect(CAMERA_OFFSET).toBeDefined();
      expect(CAMERA_OFFSET).toHaveLength(3);
    });

    it('CAMERA_OFFSET이 [0, 5, 10]이어야 함', () => {
      expect(CAMERA_OFFSET[0]).toBe(0);
      expect(CAMERA_OFFSET[1]).toBe(5);
      expect(CAMERA_OFFSET[2]).toBe(10);
    });

    it('CAMERA_SMOOTHNESS가 0.1이어야 함', () => {
      expect(CAMERA_SMOOTHNESS).toBe(0.1);
    });

    it('CAMERA_FOV가 75이어야 함', () => {
      expect(CAMERA_FOV).toBe(75);
    });

    it('CAMERA_NEAR가 0.1이어야 함', () => {
      expect(CAMERA_NEAR).toBe(0.1);
    });

    it('CAMERA_FAR가 1000이어야 함', () => {
      expect(CAMERA_FAR).toBe(1000);
    });
  });

  describe('Lighting Constants', () => {
    it('AMBIENT_INTENSITY가 0.5이어야 함', () => {
      expect(AMBIENT_INTENSITY).toBe(0.5);
    });

    it('DIRECTIONAL_INTENSITY가 1.0이어야 함', () => {
      expect(DIRECTIONAL_INTENSITY).toBe(1.0);
    });

    it('DIRECTIONAL_POSITION이 [10, 10, 10]이어야 함', () => {
      expect(DIRECTIONAL_POSITION).toHaveLength(3);
      expect(DIRECTIONAL_POSITION[0]).toBe(10);
      expect(DIRECTIONAL_POSITION[1]).toBe(10);
      expect(DIRECTIONAL_POSITION[2]).toBe(10);
    });

    it('SHADOW_MAP_SIZE가 2048이어야 함', () => {
      expect(SHADOW_MAP_SIZE).toBe(2048);
    });

    it('enableShadows가 true이어야 함', () => {
      expect(enableShadows).toBe(true);
    });

    it('SHADOW_CAMERA_FAR가 50이어야 함', () => {
      expect(SHADOW_CAMERA_FAR).toBe(50);
    });

    it('SHADOW_CAMERA_LEFT가 -10이어야 함', () => {
      expect(SHADOW_CAMERA_LEFT).toBe(-10);
    });

    it('SHADOW_CAMERA_RIGHT가 10이어야 함', () => {
      expect(SHADOW_CAMERA_RIGHT).toBe(10);
    });

    it('SHADOW_CAMERA_TOP이 10이어야 함', () => {
      expect(SHADOW_CAMERA_TOP).toBe(10);
    });

    it('SHADOW_CAMERA_BOTTOM이 -10이어야 함', () => {
      expect(SHADOW_CAMERA_BOTTOM).toBe(-10);
    });
  });

  describe('CameraController Component', () => {
    it('CameraController 컴포넌트가 정의되어야 함', () => {
      expect(CameraController).toBeDefined();
    });

    it('CameraController가 Canvas 내부에서 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <CameraController targetPosition={[0, 0, 0]} />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('CameraController가 targetPosition prop을 받을 수 있어야 함', () => {
      const targetPosition: [number, number, number] = [5, 0, 10];
      const { container } = render(
        <Canvas>
          <CameraController targetPosition={targetPosition} />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('CameraController가 기본 targetPosition으로 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <CameraController />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('DynamicLighting Component', () => {
    it('DynamicLighting 컴포넌트가 정의되어야 함', () => {
      expect(DynamicLighting).toBeDefined();
    });

    it('DynamicLighting이 렌더링 가능해야 함', () => {
      const result = DynamicLighting();
      expect(result).toBeDefined();
    });

    it('DynamicLighting이 Canvas 내부에서 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <DynamicLighting />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('DynamicLighting이 group을 포함해야 함', () => {
      const result = DynamicLighting();
      expect(result.type).toBe('group');
    });

    it('DynamicLighting이 ambientLight를 포함해야 함', () => {
      const result = DynamicLighting();
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      const ambientLight = children.find((child: any) => child.type === 'ambientLight');
      expect(ambientLight).toBeDefined();
    });

    it('DynamicLighting의 ambientLight가 올바른 intensity를 가져야 함', () => {
      const result = DynamicLighting();
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      const ambientLight = children.find((child: any) => child.type === 'ambientLight');
      expect(ambientLight.props.intensity).toBe(AMBIENT_INTENSITY);
    });

    it('DynamicLighting이 directionalLight를 포함해야 함', () => {
      const result = DynamicLighting();
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      const directionalLight = children.find((child: any) => child.type === 'directionalLight');
      expect(directionalLight).toBeDefined();
    });

    it('DynamicLighting의 directionalLight가 올바른 position을 가져야 함', () => {
      const result = DynamicLighting();
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      const directionalLight = children.find((child: any) => child.type === 'directionalLight');
      expect(directionalLight.props.position).toEqual(DIRECTIONAL_POSITION);
    });

    it('DynamicLighting의 directionalLight가 올바른 intensity를 가져야 함', () => {
      const result = DynamicLighting();
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      const directionalLight = children.find((child: any) => child.type === 'directionalLight');
      expect(directionalLight.props.intensity).toBe(DIRECTIONAL_INTENSITY);
    });

    it('DynamicLighting의 directionalLight가 castShadow를 가져야 함', () => {
      const result = DynamicLighting();
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      const directionalLight = children.find((child: any) => child.type === 'directionalLight');
      expect(directionalLight.props.castShadow).toBe(enableShadows);
    });

    it('DynamicLighting의 directionalLight가 올바른 shadow-mapSize를 가져야 함', () => {
      const result = DynamicLighting();
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      const directionalLight = children.find((child: any) => child.type === 'directionalLight');
      expect(directionalLight.props['shadow-mapSize-width']).toBe(SHADOW_MAP_SIZE);
      expect(directionalLight.props['shadow-mapSize-height']).toBe(SHADOW_MAP_SIZE);
    });

    it('DynamicLighting의 directionalLight가 올바른 shadow-camera 설정을 가져야 함', () => {
      const result = DynamicLighting();
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      const directionalLight = children.find((child: any) => child.type === 'directionalLight');
      expect(directionalLight.props['shadow-camera-far']).toBe(SHADOW_CAMERA_FAR);
      expect(directionalLight.props['shadow-camera-left']).toBe(SHADOW_CAMERA_LEFT);
      expect(directionalLight.props['shadow-camera-right']).toBe(SHADOW_CAMERA_RIGHT);
      expect(directionalLight.props['shadow-camera-top']).toBe(SHADOW_CAMERA_TOP);
      expect(directionalLight.props['shadow-camera-bottom']).toBe(SHADOW_CAMERA_BOTTOM);
    });
  });

  describe('Integration', () => {
    it('CameraController와 DynamicLighting이 함께 렌더링되어야 함', () => {
      const { container } = render(
        <Canvas>
          <CameraController targetPosition={[0, 0, 0]} />
          <DynamicLighting />
        </Canvas>
      );
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });
  });
});
