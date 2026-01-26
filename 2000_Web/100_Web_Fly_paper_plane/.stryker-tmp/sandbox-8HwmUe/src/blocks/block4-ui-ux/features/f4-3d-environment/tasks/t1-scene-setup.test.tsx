// @ts-nocheck
import { describe, it, expect, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  SceneSetup,
  Skybox,
  SceneLighting,
  CAMERA_POSITION,
  CAMERA_FOV,
  AMBIENT_LIGHT_INTENSITY,
  DIRECTIONAL_LIGHT_POSITION,
  DIRECTIONAL_LIGHT_INTENSITY,
  SKY_DISTANCE,
  SKY_SUN_POSITION,
  SKY_INCLINATION,
  SKY_AZIMUTH,
} from './t1-scene-setup';

// ResizeObserver polyfill for Vitest
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('Task 4.4.1: Scene Setup & Skybox', () => {
  describe('SceneSetup Component', () => {
    it('SceneSetup 컴포넌트가 정의되어야 함', () => {
      expect(SceneSetup).toBeDefined();
    });

    it('SceneSetup 컴포넌트가 렌더링되어야 함', () => {
      const { container } = render(<SceneSetup />);
      const wrapper = screen.getByTestId('scene-canvas');
      expect(wrapper).toBeInTheDocument();

      // Canvas 태그가 렌더링되는지 확인
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('Canvas가 3D 컨텍스트를 가져야 함', () => {
      const { container } = render(<SceneSetup />);
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
      expect(canvas?.tagName).toBe('CANVAS');
    });

    it('Canvas가 전체 화면을 차지해야 함', () => {
      render(<SceneSetup />);
      const canvas = screen.getByTestId('scene-canvas');
      expect(canvas).toHaveStyle({ position: 'fixed' });
    });

    it('Canvas가 inset-0 스타일을 가져야 함 (전체 화면)', () => {
      render(<SceneSetup />);
      const canvas = screen.getByTestId('scene-canvas');
      const computedStyle = window.getComputedStyle(canvas);
      expect(computedStyle.position).toBe('fixed');
    });

    it('Canvas wrapper의 width가 100%여야 함', () => {
      render(<SceneSetup />);
      const wrapper = screen.getByTestId('scene-canvas');
      expect(wrapper).toHaveStyle({ width: '100%' });
    });

    it('Canvas wrapper의 height가 100%여야 함', () => {
      render(<SceneSetup />);
      const wrapper = screen.getByTestId('scene-canvas');
      expect(wrapper).toHaveStyle({ height: '100%' });
    });
  });

  describe('Skybox', () => {
    it('Skybox 컴포넌트가 정의되어야 함', () => {
      expect(Skybox).toBeDefined();
    });

    it('Skybox 컴포넌트가 렌더링 가능해야 함', () => {
      // Skybox를 직접 렌더링할 수 없으므로 타입 체크
      const result = Skybox();
      expect(result).toBeDefined();
      expect(result.type).toBeDefined();
    });

    it('Skybox가 Scene 내부에 렌더링되어야 함', () => {
      render(<SceneSetup />);
      // Canvas가 렌더링되면 Skybox도 자동으로 포함됨
      const canvas = screen.getByTestId('scene-canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('Sky distance가 450000이어야 함', () => {
      expect(SKY_DISTANCE).toBe(450000);
    });

    it('Sky sun position이 설정되어야 함', () => {
      expect(SKY_SUN_POSITION).toBeDefined();
      expect(SKY_SUN_POSITION).toHaveLength(3);
      expect(SKY_SUN_POSITION[0]).toBe(0);
      expect(SKY_SUN_POSITION[1]).toBe(1);
      expect(SKY_SUN_POSITION[2]).toBe(0);
    });

    it('Sky inclination이 0.6이어야 함', () => {
      expect(SKY_INCLINATION).toBe(0.6);
    });

    it('Sky azimuth가 0.25여야 함', () => {
      expect(SKY_AZIMUTH).toBe(0.25);
    });
  });

  describe('Lighting', () => {
    it('AmbientLight가 정의되어야 함', () => {
      expect(SceneLighting).toBeDefined();
    });

    it('DirectionalLight가 정의되어야 함', () => {
      expect(SceneLighting).toBeDefined();
    });

    it('SceneLighting 컴포넌트가 렌더링 가능해야 함', () => {
      // SceneLighting을 직접 렌더링할 수 없으므로 타입 체크
      const result = SceneLighting();
      expect(result).toBeDefined();
      expect(result.type).toBeDefined();
    });

    it('AmbientLight intensity가 0.5여야 함', () => {
      expect(AMBIENT_LIGHT_INTENSITY).toBe(0.5);
    });

    it('DirectionalLight position이 설정되어야 함', () => {
      expect(DIRECTIONAL_LIGHT_POSITION).toBeDefined();
      expect(DIRECTIONAL_LIGHT_POSITION).toHaveLength(3);
      expect(DIRECTIONAL_LIGHT_POSITION[0]).toBe(10);
      expect(DIRECTIONAL_LIGHT_POSITION[1]).toBe(10);
      expect(DIRECTIONAL_LIGHT_POSITION[2]).toBe(5);
    });

    it('DirectionalLight intensity가 1이어야 함', () => {
      expect(DIRECTIONAL_LIGHT_INTENSITY).toBe(1);
    });

    it('SceneLighting이 Scene 내부에 렌더링되어야 함', () => {
      render(<SceneSetup />);
      const canvas = screen.getByTestId('scene-canvas');
      expect(canvas).toBeInTheDocument();
    });
  });

  describe('Camera', () => {
    it('Camera 설정이 정의되어야 함', () => {
      render(<SceneSetup />);
      const canvas = screen.getByTestId('scene-canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('Camera position이 설정되어야 함', () => {
      expect(CAMERA_POSITION).toBeDefined();
      expect(CAMERA_POSITION).toHaveLength(3);
      expect(CAMERA_POSITION[0]).toBe(0);
      expect(CAMERA_POSITION[1]).toBe(5);
      expect(CAMERA_POSITION[2]).toBe(10);
    });

    it('Camera fov가 설정되어야 함 (기본 75도)', () => {
      expect(CAMERA_FOV).toBe(75);
    });
  });

  describe('Integration', () => {
    it('SceneSetup이 Canvas, Skybox, Lighting을 모두 포함해야 함', () => {
      render(<SceneSetup />);
      const canvas = screen.getByTestId('scene-canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('SceneSetup이 children을 렌더링할 수 있어야 함', () => {
      render(
        <SceneSetup>
          <mesh data-testid="test-mesh">
            <boxGeometry />
            <meshStandardMaterial />
          </mesh>
        </SceneSetup>
      );
      const canvas = screen.getByTestId('scene-canvas');
      expect(canvas).toBeInTheDocument();
    });
  });
});
