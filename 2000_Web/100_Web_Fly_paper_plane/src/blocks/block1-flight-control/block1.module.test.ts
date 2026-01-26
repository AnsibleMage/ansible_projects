import { describe, it, expect, beforeEach } from 'vitest'
import * as THREE from 'three'

// Feature 1.2: Flight Physics
import { PhysicsWorld } from './features/f2-flight-physics/tasks/t1-physics-init'
import { PlaneRigidBody } from './features/f2-flight-physics/tasks/t2-plane-rigidbody'
import { FlightDynamics } from './features/f2-flight-physics/tasks/t3-flight-dynamics'
import { PhysicsUpdateLoop } from './features/f2-flight-physics/tasks/t5-physics-loop'

// Feature 1.3: Camera System
import { CameraInitializer } from './features/f3-camera-system/tasks/t1-camera-init'
import { CameraFollowController } from './features/f3-camera-system/tasks/t2-camera-follow'
import { CameraOffsetController } from './features/f3-camera-system/tasks/t3-camera-offset'
import { CameraConstraintsController } from './features/f3-camera-system/tasks/t5-camera-constraints'

/**
 * Block 1: Flight Control System - Module Test
 *
 * Validates core integration: Physics (Feature 1.2) → Camera (Feature 1.3)
 *
 * Note: Feature 1.1 (Input) tested separately in integration tests
 */

describe('Block 1: Flight Control System - Module Test', () => {
  let physicsWorld: PhysicsWorld
  let planeBody: PlaneRigidBody
  let dynamics: FlightDynamics
  let physicsLoop: PhysicsUpdateLoop
  let camera: THREE.PerspectiveCamera
  let planeObject: THREE.Object3D
  let followController: CameraFollowController
  let offsetController: CameraOffsetController
  let constraintsController: CameraConstraintsController

  beforeEach(() => {
    // Setup Physics
    physicsWorld = new PhysicsWorld()
    const world = physicsWorld.getWorld()

    planeBody = new PlaneRigidBody({
      position: { x: 0, y: 10, z: 0 },
      mass: 10,
    })

    const body = planeBody.getBody()
    world.addBody(body) // Add to physics world

    dynamics = new FlightDynamics(body)

    // Setup Camera
    const cameraInit = new CameraInitializer({
      position: { x: 0, y: 15, z: 25 },
    })
    camera = cameraInit.getCamera()

    // Create Three.js mesh for physics sync
    const geometry = new THREE.BoxGeometry(1, 0.2, 0.4)
    const material = new THREE.MeshBasicMaterial()
    const planeMesh = new THREE.Mesh(geometry, material)
    planeMesh.position.set(body.position.x, body.position.y, body.position.z)

    physicsLoop = new PhysicsUpdateLoop(world, body, planeMesh)

    // Use planeObject for camera tracking
    planeObject = planeMesh

    followController = new CameraFollowController(camera, planeObject)
    offsetController = new CameraOffsetController(camera, planeObject, {
      offset: { x: 0, y: 5, z: 15 },
    })
    constraintsController = new CameraConstraintsController(camera, {
      positionLimits: { minY: 1, maxY: 200 },
    })

    followController.enable()

    // Initialize physics world with one step (cannon-es requires this)
    world.step(1 / 60)
  })

  describe('Core Integration: Physics → Camera', () => {
    it('should update physics and camera together', () => {
      const body = planeBody.getBody()

      // Apply forces
      dynamics.update(1, 0, 0, 0) // Forward

      // Update physics
      physicsLoop.update(0.016)

      // Plane moved
      expect(body.velocity.length()).toBeGreaterThan(0)

      // Sync Three.js
      planeObject.position.set(body.position.x, body.position.y, body.position.z)

      // Update camera
      offsetController.updatePosition()
      followController.update()
      constraintsController.update()

      // Camera tracking
      expect(camera.position.y).toBeGreaterThanOrEqual(1)
    })

    it('should maintain camera tracking over multiple frames', () => {
      const body = planeBody.getBody()

      for (let i = 0; i < 60; i++) {
        dynamics.update(1, 0, 0, 0)
        physicsLoop.update(0.016)

        planeObject.position.set(body.position.x, body.position.y, body.position.z)

        offsetController.updatePosition()
        followController.update()
        constraintsController.update()
      }

      // Plane accelerated
      expect(body.velocity.length()).toBeGreaterThan(5)

      // Camera still constrained
      expect(camera.position.y).toBeGreaterThanOrEqual(1)
      expect(camera.position.y).toBeLessThanOrEqual(200)
    })
  })

  describe('Constraints During Flight', () => {
    it('should prevent camera from going underground', () => {
      const body = planeBody.getBody()
      body.position.y = 0.5

      planeObject.position.set(body.position.x, body.position.y, body.position.z)

      offsetController.updatePosition()
      constraintsController.update()

      expect(camera.position.y).toBeGreaterThanOrEqual(1)
    })

    it('should clamp camera at high altitude', () => {
      const body = planeBody.getBody()
      body.position.y = 300

      planeObject.position.set(body.position.x, body.position.y, body.position.z)

      offsetController.updatePosition()
      constraintsController.update()

      expect(camera.position.y).toBeLessThanOrEqual(200)
    })
  })

  describe('Performance', () => {
    it('should handle 60 FPS game loop', () => {
      const body = planeBody.getBody()
      const start = performance.now()

      for (let frame = 0; frame < 60; frame++) {
        dynamics.update(1, 0, 0, 0)
        physicsLoop.update(0.016)

        planeObject.position.set(body.position.x, body.position.y, body.position.z)

        offsetController.updatePosition()
        followController.update()
        constraintsController.update()
      }

      const duration = performance.now() - start

      expect(duration).toBeLessThan(200)
    })
  })

  describe('Edge Cases', () => {
    it('should handle plane at origin', () => {
      const body = planeBody.getBody()
      body.position.set(0, 0, 0)

      planeObject.position.set(0, 0, 0)

      offsetController.updatePosition()
      followController.update()

      expect(camera.position.length()).toBeGreaterThan(0)
    })

    it('should handle very high speed', () => {
      const body = planeBody.getBody()
      body.velocity.z = 500

      for (let i = 0; i < 10; i++) {
        physicsLoop.update(0.016)

        planeObject.position.set(body.position.x, body.position.y, body.position.z)

        offsetController.updatePosition()
        constraintsController.update()
      }

      expect(camera.position.y).toBeLessThanOrEqual(200)
    })
  })
})
