/**
 * Task 4.4.4: Camera & Lighting
 *
 * 카메라 컨트롤러 및 동적 조명:
 * - CameraController: 비행기 추적 카메라 (useFrame hook)
 * - DynamicLighting: Ambient + Directional 조명
 * - Shadow 설정
 */

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Camera 상수
export const CAMERA_OFFSET: [number, number, number] = [0, 5, 10];
export const CAMERA_SMOOTHNESS = 0.1;
export const CAMERA_FOV = 75;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 1000;

// Lighting 상수
export const AMBIENT_INTENSITY = 0.5;
export const DIRECTIONAL_INTENSITY = 1.0;
export const DIRECTIONAL_POSITION: [number, number, number] = [10, 10, 10];
export const SHADOW_MAP_SIZE = 2048;
export const enableShadows = true;

// Shadow Camera 상수
export const SHADOW_CAMERA_FAR = 50;
export const SHADOW_CAMERA_LEFT = -10;
export const SHADOW_CAMERA_RIGHT = 10;
export const SHADOW_CAMERA_TOP = 10;
export const SHADOW_CAMERA_BOTTOM = -10;

// CameraController Props
interface CameraControllerProps {
  targetPosition?: [number, number, number];
}

// CameraController 컴포넌트
export const CameraController = ({
  targetPosition = [0, 0, 0],
}: CameraControllerProps = {}) => {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3(...targetPosition));

  // targetPosition 변경 시 targetRef 업데이트
  useEffect(() => {
    targetRef.current.set(...targetPosition);
  }, [targetPosition]);

  // 매 프레임마다 카메라 위치 부드럽게 업데이트
  useFrame(() => {
    const target = targetRef.current;
    const desiredPosition = new THREE.Vector3(
      target.x + CAMERA_OFFSET[0],
      target.y + CAMERA_OFFSET[1],
      target.z + CAMERA_OFFSET[2]
    );

    // 부드러운 이동 (lerp)
    camera.position.lerp(desiredPosition, CAMERA_SMOOTHNESS);
    camera.lookAt(target);
  });

  return null; // 렌더링할 요소 없음 (카메라 제어만)
};

// DynamicLighting 컴포넌트
export const DynamicLighting = () => {
  return (
    <group>
      {/* Ambient Light */}
      <ambientLight intensity={AMBIENT_INTENSITY} />

      {/* Directional Light with Shadow */}
      <directionalLight
        position={DIRECTIONAL_POSITION}
        intensity={DIRECTIONAL_INTENSITY}
        castShadow={enableShadows}
        shadow-mapSize-width={SHADOW_MAP_SIZE}
        shadow-mapSize-height={SHADOW_MAP_SIZE}
        shadow-camera-far={SHADOW_CAMERA_FAR}
        shadow-camera-left={SHADOW_CAMERA_LEFT}
        shadow-camera-right={SHADOW_CAMERA_RIGHT}
        shadow-camera-top={SHADOW_CAMERA_TOP}
        shadow-camera-bottom={SHADOW_CAMERA_BOTTOM}
      />
    </group>
  );
};
