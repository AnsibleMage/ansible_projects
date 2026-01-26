-- Block 1: Flight Control
-- Feature 1.2: 비행 물리 엔진

local FlightPhysics = {}
FlightPhysics.__index = FlightPhysics

-- 비행 설정
local FlightConfig = {
    -- 속도
    BaseSpeed = 50,
    MaxSpeed = 150,
    MinSpeed = 10,
    BoostMultiplier = 2.0,
    BrakeMultiplier = 0.3,
    
    -- 가속/감속
    Acceleration = 30,
    Deceleration = 20,
    
    -- 회전
    PitchSpeed = 2.0,    -- 상하 회전
    YawSpeed = 1.5,      -- 좌우 회전
    RollSpeed = 3.0,     -- 롤링
    
    -- 물리
    Drag = 0.02,
    Gravity = -20,
    LiftCoefficient = 1.5,
}

function FlightPhysics.new(plane: BasePart)
    local self = setmetatable({}, FlightPhysics)
    
    self.plane = plane
    self.velocity = Vector3.new(0, 0, 0)
    self.currentSpeed = FlightConfig.BaseSpeed
    self.angularVelocity = Vector3.new(0, 0, 0)
    
    -- 물리 객체 설정
    self:setupPhysics()
    
    return self
end

function FlightPhysics:setupPhysics()
    if not self.plane then return end
    
    -- ★ 기존 BodyVelocity 찾기 또는 생성
    local bodyVelocity = self.plane:FindFirstChild("FlightVelocity")
    if not bodyVelocity then
        bodyVelocity = Instance.new("BodyVelocity")
        bodyVelocity.Name = "FlightVelocity"
        bodyVelocity.Parent = self.plane
    end
    bodyVelocity.MaxForce = Vector3.new(math.huge, math.huge, math.huge)
    bodyVelocity.Velocity = Vector3.new(0, 0, 0)
    self.bodyVelocity = bodyVelocity
    
    -- ★ 기존 BodyGyro 찾기 또는 생성
    local bodyGyro = self.plane:FindFirstChild("FlightGyro")
    if not bodyGyro then
        bodyGyro = Instance.new("BodyGyro")
        bodyGyro.Name = "FlightGyro"
        bodyGyro.Parent = self.plane
    end
    bodyGyro.MaxTorque = Vector3.new(math.huge, math.huge, math.huge)
    bodyGyro.P = 10000
    bodyGyro.D = 500
    self.bodyGyro = bodyGyro
    
    print("[FlightPhysics] Physics setup complete (reused existing:", self.plane:FindFirstChild("FlightVelocity") ~= nil, ")")
end

function FlightPhysics:update(dt: number, input: {})
    if not self.plane or not self.bodyVelocity or not self.bodyGyro then return end
    
    -- 1. 속도 계산
    local targetSpeed = FlightConfig.BaseSpeed
    
    if input.isBoosting then
        targetSpeed = FlightConfig.MaxSpeed
    elseif input.isBraking then
        targetSpeed = FlightConfig.MinSpeed
    end
    
    -- 부드러운 속도 변화
    local speedDiff = targetSpeed - self.currentSpeed
    if speedDiff > 0 then
        self.currentSpeed = self.currentSpeed + FlightConfig.Acceleration * dt
    else
        self.currentSpeed = self.currentSpeed - FlightConfig.Deceleration * dt
    end
    self.currentSpeed = math.clamp(self.currentSpeed, FlightConfig.MinSpeed, FlightConfig.MaxSpeed)
    
    -- 2. 회전 계산
    local mouseDelta = input.mouseDelta or Vector2.new(0, 0)
    local movement = input.movement or Vector3.new(0, 0, 0)
    
    -- Pitch (상하): 마우스 Y
    local pitchInput = -mouseDelta.Y * FlightConfig.PitchSpeed * dt
    -- Yaw (좌우): 마우스 X
    local yawInput = -mouseDelta.X * FlightConfig.YawSpeed * dt
    -- Roll (기울기): A/D 키
    local rollInput = -movement.X * FlightConfig.RollSpeed * dt
    
    -- 현재 CFrame에 회전 적용
    local currentCF = self.plane.CFrame
    local newCF = currentCF * CFrame.Angles(pitchInput, yawInput, rollInput)
    
    self.bodyGyro.CFrame = newCF
    
    -- 3. 속도 적용 (비행기 전방 방향)
    local forwardDirection = self.plane.CFrame.LookVector
    local velocity = forwardDirection * self.currentSpeed
    
    -- 양력 시뮬레이션 (앞으로 나갈수록 위로 뜸)
    local lift = Vector3.new(0, self.currentSpeed * FlightConfig.LiftCoefficient * 0.01, 0)
    velocity = velocity + lift
    
    self.bodyVelocity.Velocity = velocity
end

function FlightPhysics:getSpeed(): number
    return self.currentSpeed
end

function FlightPhysics:getVelocity(): Vector3
    return self.bodyVelocity and self.bodyVelocity.Velocity or Vector3.new(0, 0, 0)
end

function FlightPhysics:destroy()
    if self.bodyVelocity then self.bodyVelocity:Destroy() end
    if self.bodyGyro then self.bodyGyro:Destroy() end
end

return FlightPhysics
