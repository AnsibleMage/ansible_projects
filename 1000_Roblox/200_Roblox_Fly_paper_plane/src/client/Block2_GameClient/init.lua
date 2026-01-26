-- Block 2: Game Core - Client Entry
-- 클라이언트에서 사용할 게임 코어 모듈

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local GameClient = {}
GameClient.__index = GameClient

-- 게임 상태
local GameState = {
    LOBBY = "Lobby",
    READY = "Ready",
    PLAYING = "Playing",
    FINISHED = "Finished",
}

function GameClient.new()
    local self = setmetatable({}, GameClient)
    
    self.currentState = GameState.LOBBY
    self.timerDisplay = 0
    
    return self
end

function GameClient:init()
    print("[GameClient] Initialized")
    
    -- 서버 이벤트 연결
    self:connectEvents()
end

function GameClient:connectEvents()
    local events = ReplicatedStorage:WaitForChild("Events", 5)
    if not events then
        print("[GameClient] Events folder not found, creating...")
        return
    end
    
    -- 타이머 업데이트 이벤트
    local timerEvent = events:FindFirstChild("TimerUpdate")
    if timerEvent then
        timerEvent.OnClientEvent:Connect(function(time)
            self.timerDisplay = time
        end)
    end
    
    -- 게임 상태 변경 이벤트
    local stateEvent = events:FindFirstChild("GameStateChanged")
    if stateEvent then
        stateEvent.OnClientEvent:Connect(function(newState)
            self.currentState = newState
            print("[GameClient] State changed to:", newState)
        end)
    end
end

function GameClient:getTimerDisplay(): number
    return self.timerDisplay
end

function GameClient:getFormattedTime(): string
    local minutes = math.floor(self.timerDisplay / 60)
    local seconds = math.floor(self.timerDisplay % 60)
    local ms = math.floor((self.timerDisplay % 1) * 100)
    return string.format("%02d:%02d.%02d", minutes, seconds, ms)
end

function GameClient:getCurrentState(): string
    return self.currentState
end

return GameClient
