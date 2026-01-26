-- Block 4: UI Integration
-- 메인 로비, HUD, 결과 화면

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")

local UI = {}
UI.__index = UI

function UI.new()
    local self = setmetatable({}, UI)
    
    self.player = Players.LocalPlayer
    self.playerGui = self.player:WaitForChild("PlayerGui")
    self.screens = {}
    
    return self
end

function UI:init()
    print("[UI] Initializing...")
    
    -- 메인 ScreenGui 생성
    self:createMainGui()
    
    -- 각 화면 생성
    self:createLobbyScreen()
    self:createHUDScreen()
    self:createResultScreen()
    
    -- 이벤트 연결
    self:connectEvents()
    
    -- 로비 화면으로 시작
    self:showScreen("Lobby")
    
    print("[UI] Initialized!")
end

function UI:createMainGui()
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "FlyPaperPlaneUI"
    screenGui.ResetOnSpawn = false
    screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
    screenGui.Parent = self.playerGui
    
    self.mainGui = screenGui
end

-- ═══════════════════════════════════════════════════════════
-- LOBBY SCREEN
-- ═══════════════════════════════════════════════════════════
function UI:createLobbyScreen()
    local lobby = Instance.new("Frame")
    lobby.Name = "LobbyScreen"
    lobby.Size = UDim2.new(1, 0, 1, 0)
    lobby.BackgroundColor3 = Color3.fromRGB(20, 30, 50)
    lobby.BackgroundTransparency = 0.5  -- ★ 반투명으로 변경
    lobby.Visible = true  -- ★ 기본으로 표시
    lobby.Parent = self.mainGui
    
    -- 중앙 패널
    local panel = Instance.new("Frame")
    panel.Name = "CenterPanel"
    panel.Size = UDim2.new(0.5, 0, 0.6, 0)
    panel.Position = UDim2.new(0.25, 0, 0.2, 0)
    panel.BackgroundColor3 = Color3.fromRGB(30, 40, 60)
    panel.BackgroundTransparency = 0.2
    panel.Parent = lobby
    
    local panelCorner = Instance.new("UICorner")
    panelCorner.CornerRadius = UDim.new(0.05, 0)
    panelCorner.Parent = panel
    
    -- 타이틀
    local title = Instance.new("TextLabel")
    title.Name = "Title"
    title.Size = UDim2.new(0.9, 0, 0.2, 0)
    title.Position = UDim2.new(0.05, 0, 0.05, 0)
    title.BackgroundTransparency = 1
    title.Text = "✈️ Ansible Fly Paper Plane ✈️"
    title.TextColor3 = Color3.fromRGB(255, 255, 255)
    title.TextScaled = true
    title.Font = Enum.Font.GothamBold
    title.Parent = panel
    
    -- 시작 버튼 (크고 눈에 띄게)
    local startBtn = Instance.new("TextButton")
    startBtn.Name = "StartButton"
    startBtn.Size = UDim2.new(0.6, 0, 0.18, 0)
    startBtn.Position = UDim2.new(0.2, 0, 0.35, 0)
    startBtn.BackgroundColor3 = Color3.fromRGB(0, 200, 80)
    startBtn.Text = "🚀 START GAME 🚀"
    startBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
    startBtn.TextScaled = true
    startBtn.Font = Enum.Font.GothamBold
    startBtn.Parent = panel
    
    -- 버튼 모서리 둥글게
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0.2, 0)
    corner.Parent = startBtn
    
    -- 버튼 테두리
    local stroke = Instance.new("UIStroke")
    stroke.Color = Color3.fromRGB(255, 255, 255)
    stroke.Thickness = 3
    stroke.Parent = startBtn
    
    -- 시작 버튼 이벤트
    startBtn.MouseButton1Click:Connect(function()
        self:onStartClicked()
    end)
    
    -- 리더보드 버튼
    local leaderboardBtn = Instance.new("TextButton")
    leaderboardBtn.Name = "LeaderboardButton"
    leaderboardBtn.Size = UDim2.new(0.6, 0, 0.12, 0)
    leaderboardBtn.Position = UDim2.new(0.2, 0, 0.6, 0)
    leaderboardBtn.BackgroundColor3 = Color3.fromRGB(80, 100, 200)
    leaderboardBtn.Text = "🏆 LEADERBOARD"
    leaderboardBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
    leaderboardBtn.TextScaled = true
    leaderboardBtn.Font = Enum.Font.GothamBold
    leaderboardBtn.Parent = panel
    
    local corner2 = Instance.new("UICorner")
    corner2.CornerRadius = UDim.new(0.2, 0)
    corner2.Parent = leaderboardBtn
    
    leaderboardBtn.MouseButton1Click:Connect(function()
        self:showLeaderboard()
    end)
    
    -- 조작법 안내
    local controls = Instance.new("TextLabel")
    controls.Name = "Controls"
    controls.Size = UDim2.new(0.9, 0, 0.15, 0)
    controls.Position = UDim2.new(0.05, 0, 0.78, 0)
    controls.BackgroundTransparency = 1
    controls.Text = "WASD: 이동  |  마우스: 시점  |  E: 부스트  |  V: 시점전환"
    controls.TextColor3 = Color3.fromRGB(200, 200, 200)
    controls.TextScaled = true
    controls.Font = Enum.Font.Gotham
    controls.Parent = panel
    
    self.screens["Lobby"] = lobby
    print("[UI] Lobby screen created")
end

-- ═══════════════════════════════════════════════════════════
-- HUD SCREEN (게임 플레이 중)
-- ═══════════════════════════════════════════════════════════
function UI:createHUDScreen()
    local hud = Instance.new("Frame")
    hud.Name = "HUDScreen"
    hud.Size = UDim2.new(1, 0, 1, 0)
    hud.BackgroundTransparency = 1
    hud.Visible = false
    hud.Parent = self.mainGui
    
    -- 타이머 표시
    local timerFrame = Instance.new("Frame")
    timerFrame.Name = "TimerFrame"
    timerFrame.Size = UDim2.new(0.2, 0, 0.08, 0)
    timerFrame.Position = UDim2.new(0.4, 0, 0.02, 0)
    timerFrame.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
    timerFrame.BackgroundTransparency = 0.5
    timerFrame.Parent = hud
    
    local timerCorner = Instance.new("UICorner")
    timerCorner.CornerRadius = UDim.new(0.3, 0)
    timerCorner.Parent = timerFrame
    
    local timerLabel = Instance.new("TextLabel")
    timerLabel.Name = "TimerLabel"
    timerLabel.Size = UDim2.new(1, 0, 1, 0)
    timerLabel.BackgroundTransparency = 1
    timerLabel.Text = "00:00.00"
    timerLabel.TextColor3 = Color3.fromRGB(255, 255, 100)
    timerLabel.TextScaled = true
    timerLabel.Font = Enum.Font.Code
    timerLabel.Parent = timerFrame
    
    self.timerLabel = timerLabel
    
    -- 속도계
    local speedFrame = Instance.new("Frame")
    speedFrame.Name = "SpeedFrame"
    speedFrame.Size = UDim2.new(0.15, 0, 0.05, 0)
    speedFrame.Position = UDim2.new(0.02, 0, 0.9, 0)
    speedFrame.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
    speedFrame.BackgroundTransparency = 0.5
    speedFrame.Parent = hud
    
    local speedCorner = Instance.new("UICorner")
    speedCorner.CornerRadius = UDim.new(0.3, 0)
    speedCorner.Parent = speedFrame
    
    local speedLabel = Instance.new("TextLabel")
    speedLabel.Name = "SpeedLabel"
    speedLabel.Size = UDim2.new(1, 0, 1, 0)
    speedLabel.BackgroundTransparency = 1
    speedLabel.Text = "0 km/h"
    speedLabel.TextColor3 = Color3.fromRGB(100, 255, 100)
    speedLabel.TextScaled = true
    speedLabel.Font = Enum.Font.Code
    speedLabel.Parent = speedFrame
    
    self.speedLabel = speedLabel
    
    self.screens["HUD"] = hud
end

-- ═══════════════════════════════════════════════════════════
-- RESULT SCREEN
-- ═══════════════════════════════════════════════════════════
function UI:createResultScreen()
    local result = Instance.new("Frame")
    result.Name = "ResultScreen"
    result.Size = UDim2.new(1, 0, 1, 0)
    result.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
    result.BackgroundTransparency = 0.3
    result.Visible = false
    result.Parent = self.mainGui
    
    -- 결과 박스
    local resultBox = Instance.new("Frame")
    resultBox.Name = "ResultBox"
    resultBox.Size = UDim2.new(0.5, 0, 0.6, 0)
    resultBox.Position = UDim2.new(0.25, 0, 0.2, 0)
    resultBox.BackgroundColor3 = Color3.fromRGB(30, 40, 60)
    resultBox.Parent = result
    
    local boxCorner = Instance.new("UICorner")
    boxCorner.CornerRadius = UDim.new(0.05, 0)
    boxCorner.Parent = resultBox
    
    -- 완주 텍스트
    local finishText = Instance.new("TextLabel")
    finishText.Name = "FinishText"
    finishText.Size = UDim2.new(0.9, 0, 0.15, 0)
    finishText.Position = UDim2.new(0.05, 0, 0.05, 0)
    finishText.BackgroundTransparency = 1
    finishText.Text = "🏁 FINISHED! 🏁"
    finishText.TextColor3 = Color3.fromRGB(255, 215, 0)
    finishText.TextScaled = true
    finishText.Font = Enum.Font.GothamBold
    finishText.Parent = resultBox
    
    -- 시간 표시
    local timeLabel = Instance.new("TextLabel")
    timeLabel.Name = "TimeLabel"
    timeLabel.Size = UDim2.new(0.9, 0, 0.2, 0)
    timeLabel.Position = UDim2.new(0.05, 0, 0.25, 0)
    timeLabel.BackgroundTransparency = 1
    timeLabel.Text = "00:00.00"
    timeLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
    timeLabel.TextScaled = true
    timeLabel.Font = Enum.Font.Code
    timeLabel.Parent = resultBox
    
    self.resultTimeLabel = timeLabel
    
    -- 재시작 버튼
    local retryBtn = Instance.new("TextButton")
    retryBtn.Name = "RetryButton"
    retryBtn.Size = UDim2.new(0.4, 0, 0.12, 0)
    retryBtn.Position = UDim2.new(0.05, 0, 0.55, 0)
    retryBtn.BackgroundColor3 = Color3.fromRGB(0, 180, 80)
    retryBtn.Text = "🔄 RETRY"
    retryBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
    retryBtn.TextScaled = true
    retryBtn.Font = Enum.Font.GothamBold
    retryBtn.Parent = resultBox
    
    local retryCorner = Instance.new("UICorner")
    retryCorner.CornerRadius = UDim.new(0.2, 0)
    retryCorner.Parent = retryBtn
    
    retryBtn.MouseButton1Click:Connect(function()
        self:onRetryClicked()
    end)
    
    -- 로비 버튼
    local lobbyBtn = Instance.new("TextButton")
    lobbyBtn.Name = "LobbyButton"
    lobbyBtn.Size = UDim2.new(0.4, 0, 0.12, 0)
    lobbyBtn.Position = UDim2.new(0.55, 0, 0.55, 0)
    lobbyBtn.BackgroundColor3 = Color3.fromRGB(100, 100, 100)
    lobbyBtn.Text = "🏠 LOBBY"
    lobbyBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
    lobbyBtn.TextScaled = true
    lobbyBtn.Font = Enum.Font.GothamBold
    lobbyBtn.Parent = resultBox
    
    local lobbyCorner = Instance.new("UICorner")
    lobbyCorner.CornerRadius = UDim.new(0.2, 0)
    lobbyCorner.Parent = lobbyBtn
    
    lobbyBtn.MouseButton1Click:Connect(function()
        self:showScreen("Lobby")
    end)
    
    self.screens["Result"] = result
end

-- ═══════════════════════════════════════════════════════════
-- EVENTS & LOGIC
-- ═══════════════════════════════════════════════════════════
function UI:connectEvents()
    local events = ReplicatedStorage:WaitForChild("Events", 5)
    if not events then return end
    
    -- 게임 상태 변경
    local stateEvent = events:FindFirstChild("GameStateChanged")
    if stateEvent then
        stateEvent.OnClientEvent:Connect(function(newState)
            self:onGameStateChanged(newState)
        end)
    end
    
    -- 타이머 업데이트
    local timerEvent = events:FindFirstChild("TimerUpdate")
    if timerEvent then
        timerEvent.OnClientEvent:Connect(function(time)
            self:updateTimer(time)
        end)
    end
end

function UI:showScreen(screenName: string)
    for name, screen in pairs(self.screens) do
        screen.Visible = (name == screenName)
    end
    print("[UI] Showing screen:", screenName)
end

function UI:onStartClicked()
    local events = ReplicatedStorage:FindFirstChild("Events")
    if events then
        local startEvent = events:FindFirstChild("StartGame")
        if startEvent then
            startEvent:FireServer()
        end
    end
    
    self:showScreen("HUD")
end

function UI:onRetryClicked()
    local events = ReplicatedStorage:FindFirstChild("Events")
    if events then
        local restartEvent = events:FindFirstChild("RestartGame")
        if restartEvent then
            restartEvent:FireServer()
        end
    end
    
    self:showScreen("HUD")
end

function UI:onGameStateChanged(state: string)
    if state == "Finished" then
        self:showScreen("Result")
    elseif state == "Playing" then
        self:showScreen("HUD")
    elseif state == "Lobby" then
        self:showScreen("Lobby")
    end
end

function UI:updateTimer(time: number)
    if self.timerLabel then
        local minutes = math.floor(time / 60)
        local seconds = math.floor(time % 60)
        local ms = math.floor((time % 1) * 100)
        self.timerLabel.Text = string.format("%02d:%02d.%02d", minutes, seconds, ms)
    end
    
    -- 결과 화면의 시간도 업데이트
    if self.resultTimeLabel then
        local minutes = math.floor(time / 60)
        local seconds = math.floor(time % 60)
        local ms = math.floor((time % 1) * 100)
        self.resultTimeLabel.Text = string.format("%02d:%02d.%02d", minutes, seconds, ms)
    end
end

function UI:updateSpeed(speed: number)
    if self.speedLabel then
        self.speedLabel.Text = string.format("%d km/h", math.floor(speed))
    end
end

function UI:showLeaderboard()
    local events = ReplicatedStorage:FindFirstChild("Events")
    if events then
        local getLeaderboard = events:FindFirstChild("GetLeaderboard")
        if getLeaderboard then
            local data = getLeaderboard:InvokeServer(10)
            print("[UI] Leaderboard:", data)
            -- TODO: 리더보드 UI 표시
        end
    end
end

return UI
