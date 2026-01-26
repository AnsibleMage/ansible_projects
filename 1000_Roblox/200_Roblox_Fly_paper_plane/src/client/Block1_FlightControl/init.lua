-- Block 1: Flight Control - Main Controller (Enhanced)
-- Feature 1.1 (Input) + 1.2 (Physics) + 1.3 (Camera) 통합

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- 모듈 로드
local InputHandler = require(script.InputHandler)
local FlightPhysics = require(script.FlightPhysics)
local FlightCamera = require(script.FlightCamera)

-- 공유 모듈
local Shared = ReplicatedStorage:WaitForChild("Shared", 5)
local PlaneModel = nil
if Shared then
    PlaneModel = require(Shared:WaitForChild("PlaneModel", 2))
end

local FlightControl = {}
FlightControl.__index = FlightControl

function FlightControl.new()
    local self = setmetatable({}, FlightControl)
    
    self.player = Players.LocalPlayer
    self.plane = nil
    self.inputHandler = nil
    self.flightPhysics = nil
    self.flightCamera = nil
    self.isFlying = false
    self.updateConnection = nil
    
    return self
end

function FlightControl:init()
    print("[FlightControl] Initializing...")
    
    -- 입력 핸들러 초기화
    self.inputHandler = InputHandler.new()
    
    -- 비행기 찾기 또는 생성
    self:setupPlane()
    
    print("[FlightControl] Initialized!")
end

function FlightControl:setupPlane()
    -- 기존 비행기 찾기
    local existingPlane = workspace:FindFirstChild("PaperPlane")
    
    if existingPlane then
        self.plane = existingPlane.PrimaryPart or existingPlane:FindFirstChild("RootPart") or existingPlane
    else
        -- PlaneModel 사용하여 비행기 생성
        if PlaneModel then
            local planeModel = PlaneModel.create(Vector3.new(0, 40, 10))
            self.plane = planeModel.PrimaryPart or planeModel:FindFirstChild("RootPart")
        else
            -- 폴백: 기본 비행기 생성
            self.plane = self:createTestPlane()
        end
    end
    
    if self.plane then
        -- 물리 엔진 초기화
        self.flightPhysics = FlightPhysics.new(self.plane)
        
        -- 카메라 초기화
        self.flightCamera = FlightCamera.new(self.plane)
        
        print("[FlightControl] Plane setup complete:", self.plane.Name)
    end
end

function FlightControl:createTestPlane(): BasePart
    local plane = Instance.new("Part")
    plane.Name = "PaperPlane"
    plane.Size = Vector3.new(4, 1, 6)
    plane.Position = Vector3.new(0, 40, 10)
    plane.Anchored = false
    plane.CanCollide = true
    plane.BrickColor = BrickColor.new("White")
    plane.Material = Enum.Material.SmoothPlastic
    
    local mesh = Instance.new("SpecialMesh")
    mesh.MeshType = Enum.MeshType.Wedge
    mesh.Scale = Vector3.new(1, 0.5, 1)
    mesh.Parent = plane
    
    plane.Parent = workspace
    
    print("[FlightControl] Test plane created")
    return plane
end

function FlightControl:startFlight()
    if self.isFlying then return end
    self.isFlying = true
    
    -- 마우스 숨기기
    game:GetService("UserInputService").MouseBehavior = Enum.MouseBehavior.LockCenter
    
    print("[FlightControl] Flight started!")
    
    -- 업데이트 루프 시작
    self.updateConnection = RunService.RenderStepped:Connect(function(dt)
        self:update(dt)
    end)
end

function FlightControl:stopFlight()
    if not self.isFlying then return end
    self.isFlying = false
    
    -- 마우스 보이기
    game:GetService("UserInputService").MouseBehavior = Enum.MouseBehavior.Default
    
    print("[FlightControl] Flight stopped!")
    
    if self.updateConnection then
        self.updateConnection:Disconnect()
        self.updateConnection = nil
    end
    
    if self.flightCamera then
        self.flightCamera:reset()
    end
end

function FlightControl:update(dt: number)
    if not self.isFlying or not self.plane then return end
    
    -- 1. 입력 수집
    local input = {
        movement = self.inputHandler:getMovementVector(),
        mouseDelta = self.inputHandler:getMouseDelta(),
        isBoosting = self.inputHandler:isBoosting(),
        isBraking = self.inputHandler:isBraking(),
    }
    
    -- 2. 물리 업데이트
    if self.flightPhysics then
        self.flightPhysics:update(dt, input)
    end
    
    -- 3. 카메라 업데이트
    if self.flightCamera and self.flightPhysics then
        local speed = self.flightPhysics:getSpeed()
        self.flightCamera:update(dt, speed, input.isBoosting, input.isBraking)
    end
end

function FlightControl:getSpeed(): number
    return self.flightPhysics and self.flightPhysics:getSpeed() or 0
end

function FlightControl:getPlane(): BasePart?
    return self.plane
end

function FlightControl:destroy()
    self:stopFlight()
    
    if self.flightPhysics then
        self.flightPhysics:destroy()
    end
    if self.flightCamera then
        self.flightCamera:destroy()
    end
end

return FlightControl
