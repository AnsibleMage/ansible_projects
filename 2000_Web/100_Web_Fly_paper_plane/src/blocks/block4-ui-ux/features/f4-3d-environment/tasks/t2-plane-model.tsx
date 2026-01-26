/**
 * Task 4.4.2: Plane Model Integration
 *
 * 종이비행기 3D 모델:
 * - 임시 Box geometry (추후 GLTF 모델로 교체)
 * - Position, Rotation, Scale 제어
 * - Block 1 연동 준비
 */

// 상수 정의 (테스트를 위해 export)
export const PLANE_INITIAL_POSITION: [number, number, number] = [0, 0, 0];
export const PLANE_INITIAL_ROTATION: [number, number, number] = [0, 0, 0];
export const PLANE_SCALE = 1;
export const PLANE_COLOR = '#ffffff'; // 흰색 종이
export const PLANE_GEOMETRY_ARGS: [number, number, number] = [2, 0.5, 1]; // [width, height, depth]

// PaperPlane Props
interface PaperPlaneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

// PaperPlane 컴포넌트
export const PaperPlane = ({
  position = PLANE_INITIAL_POSITION,
  rotation = PLANE_INITIAL_ROTATION,
  scale = PLANE_SCALE,
}: PaperPlaneProps = {}) => {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      {/* Box Geometry - 종이비행기 모양 근사 */}
      <boxGeometry args={PLANE_GEOMETRY_ARGS} />

      {/* Standard Material - 흰색 종이 */}
      <meshStandardMaterial color={PLANE_COLOR} />
    </mesh>
  );
};
