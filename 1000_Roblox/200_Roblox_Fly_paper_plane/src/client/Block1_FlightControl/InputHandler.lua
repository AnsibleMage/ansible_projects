-- Block 1: Flight Control
-- Feature 1.1: 입력 처리 시스템

local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")

local InputHandler = {}
InputHandler.__index = InputHandler

-- 입력 상태
local InputState = {
    -- 이동
    Forward = false,    -- W
    Backward = false,   -- S
    Left = false,       -- A
    Right = false,      -- D
    Up = false,         -- Space
    Down = false,       -- Shift
    
    -- 부스트
    Boost = false,      -- E
    Brake = false,      -- Q
    
    -- 마우스
    MouseDelta = Vector2.new(0, 0),
    MouseSensitivity = 0.5,
}

-- 키 매핑
local KeyMap = {
    [Enum.KeyCode.W] = "Forward",
    [Enum.KeyCode.S] = "Backward",
    [Enum.KeyCode.A] = "Left",
    [Enum.KeyCode.D] = "Right",
    [Enum.KeyCode.Space] = "Up",
    [Enum.KeyCode.LeftShift] = "Down",
    [Enum.KeyCode.E] = "Boost",
    [Enum.KeyCode.Q] = "Brake",
}

function InputHandler.new()
    local self = setmetatable({}, InputHandler)
    self.state = InputState
    self:init()
    return self
end

function InputHandler:init()
    -- 키보드 입력 시작
    UserInputService.InputBegan:Connect(function(input, gameProcessed)
        if gameProcessed then return end
        local action = KeyMap[input.KeyCode]
        if action then
            self.state[action] = true
        end
    end)
    
    -- 키보드 입력 종료
    UserInputService.InputEnded:Connect(function(input, gameProcessed)
        if gameProcessed then return end
        local action = KeyMap[input.KeyCode]
        if action then
            self.state[action] = false
        end
    end)
    
    -- 마우스 잠금 (1인칭/3인칭 비행을 위해)
    UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter
    
    print("[InputHandler] Initialized")
end

function InputHandler:getMovementVector(): Vector3
    local movement = Vector3.new(0, 0, 0)
    
    if self.state.Forward then movement = movement + Vector3.new(0, 0, -1) end
    if self.state.Backward then movement = movement + Vector3.new(0, 0, 1) end
    if self.state.Left then movement = movement + Vector3.new(-1, 0, 0) end
    if self.state.Right then movement = movement + Vector3.new(1, 0, 0) end
    if self.state.Up then movement = movement + Vector3.new(0, 1, 0) end
    if self.state.Down then movement = movement + Vector3.new(0, -1, 0) end
    
    if movement.Magnitude > 0 then
        movement = movement.Unit
    end
    
    return movement
end

function InputHandler:getMouseDelta(): Vector2
    return UserInputService:GetMouseDelta() * self.state.MouseSensitivity
end

function InputHandler:isBoosting(): boolean
    return self.state.Boost
end

function InputHandler:isBraking(): boolean
    return self.state.Brake
end

function InputHandler:getState()
    return self.state
end

return InputHandler
