export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface BoundingBox {
  min: Vec3
  max: Vec3
}

export class CollisionDetector {
  public checkAABB(box1: BoundingBox, box2: BoundingBox): boolean {
    return (
      box1.min.x <= box2.max.x && box1.max.x >= box2.min.x &&
      box1.min.y <= box2.max.y && box1.max.y >= box2.min.y &&
      box1.min.z <= box2.max.z && box1.max.z >= box2.min.z
    )
  }

  public pointInBox(point: Vec3, box: BoundingBox): boolean {
    return (
      point.x >= box.min.x && point.x <= box.max.x &&
      point.y >= box.min.y && point.y <= box.max.y &&
      point.z >= box.min.z && point.z <= box.max.z
    )
  }
}
