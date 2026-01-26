/**
 * Task 4.4.4: Camera & Lighting
 *
 * 카메라 컨트롤러 및 동적 조명:
 * - CameraController: 비행기 추적 카메라 (useFrame hook)
 * - DynamicLighting: Ambient + Directional 조명
 * - Shadow 설정
 */
// @ts-nocheck
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
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Camera 상수
export const CAMERA_OFFSET: [number, number, number] = stryMutAct_9fa48("2036") ? [] : (stryCov_9fa48("2036"), [0, 5, 10]);
export const CAMERA_SMOOTHNESS = 0.1;
export const CAMERA_FOV = 75;
export const CAMERA_NEAR = 0.1;
export const CAMERA_FAR = 1000;

// Lighting 상수
export const AMBIENT_INTENSITY = 0.5;
export const DIRECTIONAL_INTENSITY = 1.0;
export const DIRECTIONAL_POSITION: [number, number, number] = stryMutAct_9fa48("2037") ? [] : (stryCov_9fa48("2037"), [10, 10, 10]);
export const SHADOW_MAP_SIZE = 2048;
export const enableShadows = stryMutAct_9fa48("2038") ? false : (stryCov_9fa48("2038"), true);

// Shadow Camera 상수
export const SHADOW_CAMERA_FAR = 50;
export const SHADOW_CAMERA_LEFT = stryMutAct_9fa48("2039") ? +10 : (stryCov_9fa48("2039"), -10);
export const SHADOW_CAMERA_RIGHT = 10;
export const SHADOW_CAMERA_TOP = 10;
export const SHADOW_CAMERA_BOTTOM = stryMutAct_9fa48("2040") ? +10 : (stryCov_9fa48("2040"), -10);

// CameraController Props
interface CameraControllerProps {
  targetPosition?: [number, number, number];
}

// CameraController 컴포넌트
export const CameraController = ({
  targetPosition = stryMutAct_9fa48("2041") ? [] : (stryCov_9fa48("2041"), [0, 0, 0])
}: CameraControllerProps = {}) => {
  if (stryMutAct_9fa48("2042")) {
    {}
  } else {
    stryCov_9fa48("2042");
    const {
      camera
    } = useThree();
    const targetRef = useRef(new THREE.Vector3(...targetPosition));

    // targetPosition 변경 시 targetRef 업데이트
    useEffect(() => {
      if (stryMutAct_9fa48("2043")) {
        {}
      } else {
        stryCov_9fa48("2043");
        targetRef.current.set(...targetPosition);
      }
    }, stryMutAct_9fa48("2044") ? [] : (stryCov_9fa48("2044"), [targetPosition]));

    // 매 프레임마다 카메라 위치 부드럽게 업데이트
    useFrame(() => {
      if (stryMutAct_9fa48("2045")) {
        {}
      } else {
        stryCov_9fa48("2045");
        const target = targetRef.current;
        const desiredPosition = new THREE.Vector3(stryMutAct_9fa48("2046") ? target.x - CAMERA_OFFSET[0] : (stryCov_9fa48("2046"), target.x + CAMERA_OFFSET[0]), stryMutAct_9fa48("2047") ? target.y - CAMERA_OFFSET[1] : (stryCov_9fa48("2047"), target.y + CAMERA_OFFSET[1]), stryMutAct_9fa48("2048") ? target.z - CAMERA_OFFSET[2] : (stryCov_9fa48("2048"), target.z + CAMERA_OFFSET[2]));

        // 부드러운 이동 (lerp)
        camera.position.lerp(desiredPosition, CAMERA_SMOOTHNESS);
        camera.lookAt(target);
      }
    });
    return null; // 렌더링할 요소 없음 (카메라 제어만)
  }
};

// DynamicLighting 컴포넌트
export const DynamicLighting = () => {
  if (stryMutAct_9fa48("2049")) {
    {}
  } else {
    stryCov_9fa48("2049");
    return <group>
      {/* Ambient Light */}
      <ambientLight intensity={AMBIENT_INTENSITY} />

      {/* Directional Light with Shadow */}
      <directionalLight position={DIRECTIONAL_POSITION} intensity={DIRECTIONAL_INTENSITY} castShadow={enableShadows} shadow-mapSize-width={SHADOW_MAP_SIZE} shadow-mapSize-height={SHADOW_MAP_SIZE} shadow-camera-far={SHADOW_CAMERA_FAR} shadow-camera-left={SHADOW_CAMERA_LEFT} shadow-camera-right={SHADOW_CAMERA_RIGHT} shadow-camera-top={SHADOW_CAMERA_TOP} shadow-camera-bottom={SHADOW_CAMERA_BOTTOM} />
    </group>;
  }
};