-- Ansible Fly Paper Plane - Lobby UI + Game Start
-- StarterGui에서 직접 실행되는 UI + 게임 시작 로직

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

print("[LobbyUI] Creating UI...")

-- ScreenGui 생성
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "FlyPaperPlane_LobbyUI"
screenGui.ResetOnSpawn = false
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
screenGui.Parent = playerGui

-- 중앙 패널
local panel = Instance.new("Frame")
panel.Name = "LobbyPanel"
panel.Size = UDim2.new(0.4, 0, 0.5, 0)
panel.Position = UDim2.new(0.3, 0, 0.25, 0)
panel.BackgroundColor3 = Color3.fromRGB(30, 40, 60)
panel.BackgroundTransparency = 0.2
panel.Parent = screenGui

local panelCorner = Instance.new("UICorner")
panelCorner.CornerRadius = UDim.new(0.05, 0)
panelCorner.Parent = panel

-- 타이틀
local title = Instance.new("TextLabel")
title.Name = "Title"
title.Size = UDim2.new(0.9, 0, 0.2, 0)
title.Position = UDim2.new(0.05, 0, 0.05, 0)
title.BackgroundTransparency = 1
title.Text = "✈️ Fly Paper Plane ✈️"
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.TextScaled = true
title.Font = Enum.Font.GothamBold
title.Parent = panel

-- START 버튼
local startBtn = Instance.new("TextButton")
startBtn.Name = "StartButton"
startBtn.Size = UDim2.new(0.7, 0, 0.2, 0)
startBtn.Position = UDim2.new(0.15, 0, 0.35, 0)
startBtn.BackgroundColor3 = Color3.fromRGB(0, 200, 80)
startBtn.Text = "🚀 START GAME 🚀"
startBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
startBtn.TextScaled = true
startBtn.Font = Enum.Font.GothamBold
startBtn.Parent = panel

local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0.2, 0)
corner.Parent = startBtn

local stroke = Instance.new("UIStroke")
stroke.Color = Color3.fromRGB(255, 255, 255)
stroke.Thickness = 3
stroke.Parent = startBtn

-- 조작법
local controls = Instance.new("TextLabel")
controls.Size = UDim2.new(0.9, 0, 0.2, 0)
controls.Position = UDim2.new(0.05, 0, 0.6, 0)
controls.BackgroundTransparency = 1
controls.Text = "WASD: 이동 | 마우스: 회전\nE: 부스트 | V: 시점전환"
controls.TextColor3 = Color3.fromRGB(200, 200, 200)
controls.TextScaled = true
controls.Font = Enum.Font.Gotham
controls.Parent = panel

-- 간단한 비행기 생성 함수 (클라이언트)
local function createSimplePlane(position)
    local existing = workspace:FindFirstChild("PaperPlane")
    if existing then return existing end
    
    local plane = Instance.new("Model")
    plane.Name = "PaperPlane"
    
    -- 메인 바디
    local body = Instance.new("Part")
    body.Name = "RootPart"
    body.Size = Vector3.new(4, 1, 8)
    body.Position = position
    body.Anchored = false
    body.CanCollide = true
    body.BrickColor = BrickColor.new("White")
    body.Material = Enum.Material.SmoothPlastic
    body.Parent = plane
    
    plane.PrimaryPart = body
    
    -- 좌석
    local seat = Instance.new("VehicleSeat")
    seat.Name = "PilotSeat"
    seat.Size = Vector3.new(2, 0.5, 2)
    seat.Position = position + Vector3.new(0, 1, 1)
    seat.Anchored = false
    seat.CanCollide = false
    seat.Transparency = 0.5
    seat.MaxSpeed = 0
    seat.TurnSpeed = 0
    seat.Torque = 0
    seat.Parent = plane
    
    local weld = Instance.new("WeldConstraint")
    weld.Part0 = body
    weld.Part1 = seat
    weld.Parent = seat
    
    -- BodyVelocity (비행 제어용 - 모든 축)
    local bv = Instance.new("BodyVelocity")
    bv.Name = "FlightVelocity"
    bv.MaxForce = Vector3.new(math.huge, math.huge, math.huge)  -- ★ 모든 축 제어
    bv.Velocity = Vector3.new(0, 0, 0)
    bv.Parent = body
    
    -- BodyGyro (회전 안정)
    local bg = Instance.new("BodyGyro")
    bg.Name = "FlightGyro"
    bg.MaxTorque = Vector3.new(math.huge, math.huge, math.huge)
    bg.P = 3000
    bg.D = 500
    bg.CFrame = CFrame.new()
    bg.Parent = body
    
    plane.Parent = workspace
    print("[LobbyUI] Plane created at:", position)
    return plane
end

-- 버튼 클릭 이벤트
startBtn.MouseButton1Click:Connect(function()
    print("[LobbyUI] Start button clicked!")
    
    -- UI 먼저 숨기기
    panel.Visible = false
    
    -- 비행기 생성
    local spawnPos = Vector3.new(0, 60, 30)
    local plane = createSimplePlane(spawnPos)
    
    -- 캐릭터 확인
    local character = player.Character
    if not character then
        print("[LobbyUI] No character!")
        return
    end
    
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    local hrp = character:FindFirstChild("HumanoidRootPart")
    
    if humanoid and hrp then
        -- 캐릭터를 비행기 위치로 이동
        hrp.CFrame = CFrame.new(spawnPos + Vector3.new(0, 3, 0))
        hrp.Velocity = Vector3.new(0, 0, 0)
        
        -- 좌석 찾기
        local seat = plane:FindFirstChild("PilotSeat")
        if seat then
            -- ★ 서버로 앉히기 요청 (클라이언트에서 직접 Sit 불가)
            local events = ReplicatedStorage:WaitForChild("Events", 5)
            if events then
                local sitEvent = events:FindFirstChild("SitPlayer")
                if sitEvent then
                    task.delay(0.3, function()
                        sitEvent:FireServer(seat)
                        print("[LobbyUI] Sent SitPlayer request to server")
                    end)
                else
                    print("[LobbyUI] SitPlayer event not found!")
                end
            end
        end
    end
    
    -- 서버에도 게임 시작 알림
    local events = ReplicatedStorage:FindFirstChild("Events")
    if events then
        local startEvent = events:FindFirstChild("StartGame")
        if startEvent then
            startEvent:FireServer()
        end
    end
    
    print("[LobbyUI] Game started!")
end)

print("[LobbyUI] UI Created successfully!")
