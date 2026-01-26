-- Block 1: Flight Control
-- Feature 1.3: 카메라 시스템 (1인칭 + 3인칭 지원)

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")

local FlightCamera = {}
FlightCamera.__index = FlightCamera

-- 카메라 모드
local CameraMode = {
    FIRST_PERSON = "FirstPerson",  -- 1인칭: 조종석 시점
    THIRD_PERSON = "ThirdPerson",  -- 3인칭: 비행기 뒤
}

-- 카메라 설정
local CameraConfig = {
    -- 1인칭 설정 (조종석에서 하늘을 봄)
    FirstPerson = {
        Offset = Vector3.new(0, 1, -1),  -- 비행기 앞쪽, 약간 위
        LookAhead = 20,  -- 앞을 바라보는 거리
    },
    
    -- 3인칭 설정 (비행기 뒤에서 따라감)
    ThirdPerson = {
        Offset = Vector3.new(0, 5, 15),  -- 위로 5, 뒤로 15
    },
    
    -- 공통 설정
    SmoothSpeed = 10,
    
    -- FOV
    BaseFOV = 70,
    MaxFOV = 100,     -- 부스트 시 (1인칭에서 더 극적)
    MinFOV = 60,      -- 브레이크 시
    FOVSmoothSpeed = 5,
}

function FlightCamera.new(plane: BasePart)
    local self = setmetatable({}, FlightCamera)
    
    self.plane = plane
    self.camera = workspace.CurrentCamera
    self.currentMode = CameraMode.FIRST_PERSON  -- ★ 기본값: 1인칭
    self.currentFOV = CameraConfig.BaseFOV
    self.pitch = 0  -- 상하 회전
    self.yaw = 0    -- 좌우 회전
    
    self:init()
    
    return self
end

function FlightCamera:init()
    if not self.camera then return end
    
    -- 카메라 스크립트 가능 모드로 전환
    self.camera.CameraType = Enum.CameraType.Scriptable
    self.camera.FieldOfView = CameraConfig.BaseFOV
    
    -- 마우스 잠금
    UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter
    
    -- V 키로 시점 전환
    UserInputService.InputBegan:Connect(function(input, gameProcessed)
        if gameProcessed then return end
        if input.KeyCode == Enum.KeyCode.V then
            self:toggleMode()
        end
    end)
    
    print("[FlightCamera] Initialized - Mode:", self.currentMode)
end

function FlightCamera:toggleMode()
    if self.currentMode == CameraMode.FIRST_PERSON then
        self.currentMode = CameraMode.THIRD_PERSON
    else
        self.currentMode = CameraMode.FIRST_PERSON
    end
    print("[FlightCamera] Mode changed to:", self.currentMode)
end

function FlightCamera:update(dt: number, speed: number, isBoosting: boolean, isBraking: boolean)
    if not self.plane or not self.camera then return end
    
    local planeCF = self.plane.CFrame
    
    if self.currentMode == CameraMode.FIRST_PERSON then
        -- ★ 1인칭 모드: 조종석에서 앞을 바라봄
        self:updateFirstPerson(dt, planeCF, speed, isBoosting)
    else
        -- 3인칭 모드: 비행기 뒤에서 따라감
        self:updateThirdPerson(dt, planeCF, speed)
    end
    
    -- FOV 업데이트
    self:updateFOV(dt, speed, isBoosting, isBraking)
end

function FlightCamera:updateFirstPerson(dt: number, planeCF: CFrame, speed: number, isBoosting: boolean)
    -- 조종석 위치 (비행기 앞쪽, 살짝 위)
    local offset = CameraConfig.FirstPerson.Offset
    local cameraPosition = planeCF:PointToWorldSpace(offset)
    
    -- 비행기가 바라보는 방향 (앞쪽)
    local lookAtPosition = planeCF:PointToWorldSpace(Vector3.new(0, 0, -CameraConfig.FirstPerson.LookAhead))
    
    -- 카메라 설정 (비행기 회전에 따라)
    local targetCFrame = CFrame.lookAt(cameraPosition, lookAtPosition)
    
    -- 부드러운 전환
    local currentCFrame = self.camera.CFrame
    local newCFrame = currentCFrame:Lerp(targetCFrame, CameraConfig.SmoothSpeed * dt)
    
    self.camera.CFrame = newCFrame
end

function FlightCamera:updateThirdPerson(dt: number, planeCF: CFrame, speed: number)
    -- 비행기 뒤쪽 위치
    local offset = CameraConfig.ThirdPerson.Offset
    local targetPosition = planeCF:PointToWorldSpace(offset)
    local lookAtPosition = self.plane.Position
    
    -- 부드러운 카메라 이동 (Lerp)
    local currentPosition = self.camera.CFrame.Position
    local newPosition = currentPosition:Lerp(targetPosition, CameraConfig.SmoothSpeed * dt)
    
    self.camera.CFrame = CFrame.lookAt(newPosition, lookAtPosition)
end

function FlightCamera:updateFOV(dt: number, speed: number, isBoosting: boolean, isBraking: boolean)
    local targetFOV = CameraConfig.BaseFOV
    
    if isBoosting then
        -- 부스트: FOV 크게 (속도감)
        if self.currentMode == CameraMode.FIRST_PERSON then
            targetFOV = CameraConfig.MaxFOV  -- 1인칭에서 더 극적
        else
            targetFOV = CameraConfig.MaxFOV * 0.9
        end
    elseif isBraking then
        targetFOV = CameraConfig.MinFOV
    else
        -- 속도에 비례
        local speedRatio = speed / 150
        targetFOV = CameraConfig.BaseFOV + (CameraConfig.MaxFOV - CameraConfig.BaseFOV) * speedRatio * 0.3
    end
    
    -- FOV 부드럽게 변경
    self.currentFOV = self.currentFOV + (targetFOV - self.currentFOV) * CameraConfig.FOVSmoothSpeed * dt
    self.camera.FieldOfView = self.currentFOV
end

function FlightCamera:setMode(mode: string)
    if mode == "FirstPerson" then
        self.currentMode = CameraMode.FIRST_PERSON
    else
        self.currentMode = CameraMode.THIRD_PERSON
    end
end

function FlightCamera:reset()
    if self.camera then
        self.camera.CameraType = Enum.CameraType.Custom
        self.camera.FieldOfView = 70
    end
    UserInputService.MouseBehavior = Enum.MouseBehavior.Default
end

function FlightCamera:destroy()
    self:reset()
end

return FlightCamera
