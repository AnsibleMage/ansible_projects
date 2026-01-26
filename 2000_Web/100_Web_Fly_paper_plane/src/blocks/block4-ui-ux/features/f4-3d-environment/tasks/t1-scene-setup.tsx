import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { ReactNode } from 'react';

/**
 * Task 4.4.1: Scene Setup & Skybox
 *
 * Three.js Scene 기본 설정:
 * - Canvas (react-three/fiber)
 * - Skybox (하늘 배경)
 * - Lighting (Ambient + Directional)
 * - Camera 설정
 */

// 상수 정의 (테스트를 위해 export)
export const CAMERA_POSITION: [number, number, number] = [0, 5, 10];
export const CAMERA_FOV = 75;

export const AMBIENT_LIGHT_INTENSITY = 0.5;
export const DIRECTIONAL_LIGHT_POSITION: [number, number, number] = [10, 10, 5];
export const DIRECTIONAL_LIGHT_INTENSITY = 1;

export const SKY_DISTANCE = 450000;
export const SKY_SUN_POSITION: [number, number, number] = [0, 1, 0];
export const SKY_INCLINATION = 0.6;
export const SKY_AZIMUTH = 0.25;

// Skybox 컴포넌트
export const Skybox = () => {
  return (
    <Sky
      distance={SKY_DISTANCE}
      sunPosition={SKY_SUN_POSITION}
      inclination={SKY_INCLINATION}
      azimuth={SKY_AZIMUTH}
    />
  );
};

// Scene Lighting 컴포넌트
export const SceneLighting = () => {
  return (
    <>
      {/* Ambient Light - 전체적인 밝기 */}
      <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />

      {/* Directional Light - 태양광 */}
      <directionalLight
        position={DIRECTIONAL_LIGHT_POSITION}
        intensity={DIRECTIONAL_LIGHT_INTENSITY}
        castShadow
      />
    </>
  );
};

// SceneSetup 컴포넌트
interface SceneSetupProps {
  children?: ReactNode;
}

export const SceneSetup = ({ children }: SceneSetupProps) => {
  return (
    <div
      data-testid="scene-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Canvas
        camera={{
          position: CAMERA_POSITION,
          fov: CAMERA_FOV,
        }}
        shadows
      >
        <Skybox />
        <SceneLighting />
        {children}
      </Canvas>
    </div>
  );
};
