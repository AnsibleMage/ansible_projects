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
export const CAMERA_POSITION: [number, number, number] = stryMutAct_9fa48("1981") ? [] : (stryCov_9fa48("1981"), [0, 5, 10]);
export const CAMERA_FOV = 75;
export const AMBIENT_LIGHT_INTENSITY = 0.5;
export const DIRECTIONAL_LIGHT_POSITION: [number, number, number] = stryMutAct_9fa48("1982") ? [] : (stryCov_9fa48("1982"), [10, 10, 5]);
export const DIRECTIONAL_LIGHT_INTENSITY = 1;
export const SKY_DISTANCE = 450000;
export const SKY_SUN_POSITION: [number, number, number] = stryMutAct_9fa48("1983") ? [] : (stryCov_9fa48("1983"), [0, 1, 0]);
export const SKY_INCLINATION = 0.6;
export const SKY_AZIMUTH = 0.25;

// Skybox 컴포넌트
export const Skybox = () => {
  if (stryMutAct_9fa48("1984")) {
    {}
  } else {
    stryCov_9fa48("1984");
    return <Sky distance={SKY_DISTANCE} sunPosition={SKY_SUN_POSITION} inclination={SKY_INCLINATION} azimuth={SKY_AZIMUTH} />;
  }
};

// Scene Lighting 컴포넌트
export const SceneLighting = () => {
  if (stryMutAct_9fa48("1985")) {
    {}
  } else {
    stryCov_9fa48("1985");
    return <>
      {/* Ambient Light - 전체적인 밝기 */}
      <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />

      {/* Directional Light - 태양광 */}
      <directionalLight position={DIRECTIONAL_LIGHT_POSITION} intensity={DIRECTIONAL_LIGHT_INTENSITY} castShadow />
    </>;
  }
};

// SceneSetup 컴포넌트
interface SceneSetupProps {
  children?: ReactNode;
}
export const SceneSetup = ({
  children
}: SceneSetupProps) => {
  if (stryMutAct_9fa48("1986")) {
    {}
  } else {
    stryCov_9fa48("1986");
    return <div data-testid="scene-canvas" style={stryMutAct_9fa48("1987") ? {} : (stryCov_9fa48("1987"), {
      position: stryMutAct_9fa48("1988") ? "" : (stryCov_9fa48("1988"), 'fixed'),
      top: 0,
      left: 0,
      width: stryMutAct_9fa48("1989") ? "" : (stryCov_9fa48("1989"), '100%'),
      height: stryMutAct_9fa48("1990") ? "" : (stryCov_9fa48("1990"), '100%')
    })}>
      <Canvas camera={stryMutAct_9fa48("1991") ? {} : (stryCov_9fa48("1991"), {
        position: CAMERA_POSITION,
        fov: CAMERA_FOV
      })} shadows>
        <Skybox />
        <SceneLighting />
        {children}
      </Canvas>
    </div>;
  }
};