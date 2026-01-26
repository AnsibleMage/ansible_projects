/**
 * FlightController Component
 *
 * Block 1 (Flight Control System) Integration
 * - Feature 1.1: Keyboard Input Handler
 * - Feature 1.2: Flight Physics Engine
 * - Feature 1.3: Camera System
 *
 * Integrates Block 1 modules with React Three Fiber for real-time flight control.
 */

import { useEffect, useRef, useState, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

// Feature 1.1: Input Handler
import { KeyboardInputHandler } from '../blocks/block1-flight-control/features/f1-input-handler/tasks/t1-keyboard-input'

// Feature 1.2: Flight Physics
import { PhysicsWorld } from '../blocks/block1-flight-control/features/f2-flight-physics/tasks/t1-physics-init'
import { PlaneRigidBody } from '../blocks/block1-flight-control/features/f2-flight-physics/tasks/t2-plane-rigidbody'
import { FlightDynamics } from '../blocks/block1-flight-control/features/f2-flight-physics/tasks/t3-flight-dynamics'
import { PhysicsUpdateLoop } from '../blocks/block1-flight-control/features/f2-flight-physics/tasks/t5-physics-loop'

// Feature 1.3: Camera System
import { CameraFollowController } from '../blocks/block1-flight-control/features/f3-camera-system/tasks/t2-camera-follow'
import { CameraOffsetController } from '../blocks/block1-flight-control/features/f3-camera-system/tasks/t3-camera-offset'
import { CameraConstraintsController } from '../blocks/block1-flight-control/features/f3-camera-system/tasks/t5-camera-constraints'

export function FlightController() {
  const { camera } = useThree()

  // FPS measurement for Success Metrics
  const [fps, setFps] = useState(0)
  const fpsRef = useRef({ frames: 0, lastTime: performance.now() })

  // Refs for persistent instances
  const inputHandlerRef = useRef<KeyboardInputHandler | null>(null)
  const physicsWorldRef = useRef<PhysicsWorld | null>(null)
  const planeBodyRef = useRef<PlaneRigidBody | null>(null)
  const dynamicsRef = useRef<FlightDynamics | null>(null)
  const physicsLoopRef = useRef<PhysicsUpdateLoop | null>(null)
  const planeMeshRef = useRef<THREE.Mesh | null>(null)
  const followControllerRef = useRef<CameraFollowController | null>(null)
  const offsetControllerRef = useRef<CameraOffsetController | null>(null)
  const constraintsControllerRef = useRef<CameraConstraintsController | null>(null)
  const isInitializedRef = useRef(false)

  // Speed control (boost)
  const currentSpeedRef = useRef(15) // Current speed (lerped)
  const BASE_SPEED = 15 // Normal speed
  const BOOST_SPEED = 80 // Boosted speed

  // Initialize Flight Control System
  useEffect(() => {
    // Feature 1.1: Keyboard Input
    const inputHandler = new KeyboardInputHandler()
    inputHandlerRef.current = inputHandler

    // Feature 1.2: Physics Setup
    const physicsWorld = new PhysicsWorld()
    const world = physicsWorld.getWorld()
    physicsWorldRef.current = physicsWorld

    // Reduce gravity for easier flight control
    physicsWorld.setGravity(0, -2, 0) // Reduced from -9.82 to -2

    const planeBody = new PlaneRigidBody({
      position: { x: 0, y: 10, z: 0 },
      mass: 10,
    })
    const body = planeBody.getBody()
    world.addBody(body)
    planeBodyRef.current = planeBody

    const dynamics = new FlightDynamics(body)
    dynamicsRef.current = dynamics

    // Cleanup
    return () => {
      inputHandler.cleanup()
    }
  }, [camera])

  // Initialize Camera and PhysicsLoop after mesh is ready
  const initializeMeshDependentSystems = (mesh: THREE.Mesh) => {
    // Prevent duplicate initialization
    if (isInitializedRef.current) return

    const planeBody = planeBodyRef.current
    const physicsWorld = physicsWorldRef.current

    if (!planeBody || !physicsWorld) return

    // Feature 1.2: Physics Update Loop (needs mesh)
    const world = physicsWorld.getWorld()
    const body = planeBody.getBody()
    const physicsLoop = new PhysicsUpdateLoop(world, body, mesh)
    physicsLoopRef.current = physicsLoop

    // Feature 1.3: Camera Setup (needs mesh)
    const followController = new CameraFollowController(camera as THREE.PerspectiveCamera, mesh)
    const offsetController = new CameraOffsetController(camera as THREE.PerspectiveCamera, mesh, {
      offset: { x: 0, y: 8, z: 20 },
    })
    const constraintsController = new CameraConstraintsController(camera as THREE.PerspectiveCamera, {
      positionLimits: { minY: 2, maxY: 200 },
    })

    followController.enable()
    followControllerRef.current = followController
    offsetControllerRef.current = offsetController
    constraintsControllerRef.current = constraintsController

    // Mark as initialized
    isInitializedRef.current = true
  }

  // Game Loop: Update physics and camera every frame
  useFrame((state, delta) => {
    const inputHandler = inputHandlerRef.current
    const planeMesh = planeMeshRef.current
    const followController = followControllerRef.current
    const offsetController = offsetControllerRef.current
    const constraintsController = constraintsControllerRef.current

    if (!inputHandler || !planeMesh) return

    // Get keyboard input
    const input = inputHandler.getState()

    // Boost speed control (smooth acceleration/deceleration)
    const targetSpeed = input.boost ? BOOST_SPEED : BASE_SPEED
    const lerpFactor = 0.1 // Smooth transition speed
    currentSpeedRef.current = currentSpeedRef.current + (targetSpeed - currentSpeedRef.current) * lerpFactor

    // Direct position control (simplified, no physics for now)
    const speed = currentSpeedRef.current * delta // units per second

    // W/S: Up/Down (Y-axis)
    if (input.forward) {
      planeMesh.position.y += speed // Move up (positive Y)
    }
    if (input.backward) {
      planeMesh.position.y -= speed // Move down (negative Y)
    }

    // A/D: Left/Right (X-axis)
    if (input.left) {
      planeMesh.position.x -= speed // Move left (negative X)
    }
    if (input.right) {
      planeMesh.position.x += speed // Move right (positive X)
    }

    // Auto forward movement (Z-axis)
    planeMesh.position.z -= speed * 0.5 // Constant forward motion

    // Prevent going below ground
    if (planeMesh.position.y < 1) {
      planeMesh.position.y = 1
    }

    // Collision detection with obstacles
    for (const obstacle of scenery) {
      if (!obstacle.deadly) continue // Skip safe objects (clouds)

      const [objX, objY, objZ] = obstacle.position
      const dx = planeMesh.position.x - objX
      const dy = planeMesh.position.y - objY
      const dz = planeMesh.position.z - objZ
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

      if (distance < obstacle.collisionRadius) {
        console.log('Collision detected! Game Over!')
        if (typeof window !== 'undefined') {
          (window as any).gameFailed = true
        }
        return // Stop processing this frame
      }
    }

    // Check finish line (goal at z = -1000)
    if (planeMesh.position.z <= -1000) {
      console.log('Goal reached!')
      // Trigger game finish (will be handled by App.tsx)
      if (typeof window !== 'undefined') {
        (window as any).gameFinished = true
      }
    }

    // Simple camera follow (3rd person view)
    // Camera stays behind and above the plane
    const cameraOffset = {
      x: 0,
      y: 5,  // 5 units above
      z: 15  // 15 units behind
    }

    camera.position.x = planeMesh.position.x + cameraOffset.x
    camera.position.y = planeMesh.position.y + cameraOffset.y
    camera.position.z = planeMesh.position.z + cameraOffset.z

    // Look at the plane
    camera.lookAt(planeMesh.position)

    // FPS calculation (Success Metric: FPS ≥ 60)
    fpsRef.current.frames++
    const currentTime = performance.now()
    const elapsed = currentTime - fpsRef.current.lastTime
    if (elapsed >= 1000) {
      const currentFps = Math.round((fpsRef.current.frames * 1000) / elapsed)
      setFps(currentFps)
      fpsRef.current.frames = 0
      fpsRef.current.lastTime = currentTime

      // Expose FPS for Success Metrics measurement
      if (typeof window !== 'undefined') {
        (window as any).gameFPS = currentFps
      }
    }

    // Expose plane position for E2E testing
    if (typeof window !== 'undefined') {
      (window as any).planePosition = {
        x: planeMesh.position.x,
        y: planeMesh.position.y,
        z: planeMesh.position.z,
      }
    }
  })

  // Generate random scenery objects (trees, buildings, clouds)
  const scenery = useMemo(() => {
    const objects = []

    // Generate 150 objects along the path (3x more dense)
    for (let i = 0; i < 150; i++) {
      const z = -i * 8 // Much closer spacing (was 20, now 8)
      const x = (Math.random() - 0.5) * 25 // Narrower path (was 40, now 25)
      const type = Math.random()

      if (type < 0.5) {
        // Trees (green cylinders) - DEADLY, LARGER
        objects.push({
          type: 'tree',
          position: [x, 3, z] as [number, number, number],
          color: 0x228B22,
          size: [1.2, 8, 1.2] as [number, number, number], // 2x wider, 2x taller
          deadly: true,
          collisionRadius: 3, // Much larger collision (was 1.5, now 3)
        })
      } else if (type < 0.8) {
        // Buildings (gray boxes) - DEADLY, LARGER
        const height = 10 + Math.random() * 15 // Taller buildings
        objects.push({
          type: 'building',
          position: [x, height / 2, z] as [number, number, number],
          color: 0x808080,
          size: [6, height, 6] as [number, number, number], // 2x wider
          deadly: true,
          collisionRadius: 7, // Much larger collision (was 4, now 7)
        })
      } else {
        // Clouds (white spheres, floating) - SAFE
        objects.push({
          type: 'cloud',
          position: [x, 15 + Math.random() * 10, z] as [number, number, number],
          color: 0xffffff,
          size: [2, 1, 2] as [number, number, number],
          deadly: false,
          collisionRadius: 0, // No collision
        })
      }
    }

    return objects
  }, [])

  return (
    <>
      {/* Ground Grid for motion feedback */}
      <gridHelper args={[200, 100, 0x444444, 0x222222]} position={[0, 0, -500]} />

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -500]} receiveShadow>
        <planeGeometry args={[200, 1000]} />
        <meshStandardMaterial color={0x7ec850} />
      </mesh>

      {/* Finish Line Gate (Golden Gate) */}
      <group position={[0, 0, -1000]}>
        {/* Left pillar */}
        <mesh position={[-15, 10, 0]} castShadow>
          <boxGeometry args={[2, 20, 2]} />
          <meshStandardMaterial color={0xffd700} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Right pillar */}
        <mesh position={[15, 10, 0]} castShadow>
          <boxGeometry args={[2, 20, 2]} />
          <meshStandardMaterial color={0xffd700} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Top bar */}
        <mesh position={[0, 20, 0]} castShadow>
          <boxGeometry args={[32, 2, 2]} />
          <meshStandardMaterial color={0xffd700} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Finish text */}
        <mesh position={[0, 21, 0]}>
          <boxGeometry args={[10, 1, 0.5]} />
          <meshStandardMaterial color={0xff0000} />
        </mesh>
      </group>

      {/* Scenery objects */}
      {scenery.map((obj, i) => (
        <mesh key={i} position={obj.position} castShadow>
          {obj.type === 'tree' && <cylinderGeometry args={[obj.size[0], obj.size[0], obj.size[1], 8]} />}
          {obj.type === 'building' && <boxGeometry args={obj.size} />}
          {obj.type === 'cloud' && <sphereGeometry args={[obj.size[0], 8, 8]} />}
          <meshStandardMaterial color={obj.color} />
        </mesh>
      ))}

      {/* Paper Plane mesh (declarative) */}
      <group
        castShadow
        position={[0, 10, 0]}
        ref={(group) => {
          if (group && !planeMeshRef.current) {
            // Use the group as the plane mesh reference
            planeMeshRef.current = group as any
            initializeMeshDependentSystems(group as any)
          }
        }}
      >
        {/* Nose (pointed front) */}
        <mesh position={[0, 0, -1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <coneGeometry args={[0.4, 1, 4]} />
          <meshStandardMaterial color={0xffffff} />
        </mesh>

        {/* Main body */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, 1.5]} />
          <meshStandardMaterial color={0xffffff} />
        </mesh>

        {/* Left wing */}
        <mesh position={[-0.8, 0, 0.2]} rotation={[0, 0, -0.2]} castShadow>
          <boxGeometry args={[1.2, 0.05, 1]} />
          <meshStandardMaterial color={0x3498db} />
        </mesh>

        {/* Right wing */}
        <mesh position={[0.8, 0, 0.2]} rotation={[0, 0, 0.2]} castShadow>
          <boxGeometry args={[1.2, 0.05, 1]} />
          <meshStandardMaterial color={0x3498db} />
        </mesh>

        {/* Left tail fin */}
        <mesh position={[-0.3, 0.1, 0.8]} rotation={[0, 0, -0.3]} castShadow>
          <boxGeometry args={[0.4, 0.05, 0.3]} />
          <meshStandardMaterial color={0xe74c3c} />
        </mesh>

        {/* Right tail fin */}
        <mesh position={[0.3, 0.1, 0.8]} rotation={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.4, 0.05, 0.3]} />
          <meshStandardMaterial color={0xe74c3c} />
        </mesh>
      </group>

      {/* Lights for visibility */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />

      {/* Sky color */}
      <color attach="background" args={['#87CEEB']} />
      <fog attach="fog" args={['#87CEEB', 50, 150]} />
    </>
  )
}
