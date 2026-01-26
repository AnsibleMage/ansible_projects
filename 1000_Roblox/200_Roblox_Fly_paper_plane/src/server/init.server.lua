-- Ansible Fly Paper Plane - Server Entry Point
-- Block 2 (Game Core), Block 3 (Social) 초기화

local Players = game:GetService("Players")

print("═══════════════════════════════════════════════")
print("  ✈️ Ansible Fly Paper Plane - Server Starting")
print("═══════════════════════════════════════════════")

-- 모듈 로드
local GameCore = require(script.Parent.Block2_GameCore)
local Social = require(script.Parent.Block3_Social)

-- 인스턴스 생성
local gameCore = GameCore.new()
local social = Social.new()

-- ★ SpawnLocation을 공중으로 이동
local function setupSpawnLocation()
    -- 기존 SpawnLocation 찾기 또는 생성
    local spawnLocation = workspace:FindFirstChild("SpawnLocation")
    
    if spawnLocation then
        -- 기존 SpawnLocation 위치 변경
        spawnLocation.Position = Vector3.new(0, 52, 35)  -- 비행기 스폰 위치 근처
        spawnLocation.Anchored = true
        spawnLocation.CanCollide = true  -- ★ 충돌 가능 (바닥 역할)
        spawnLocation.Transparency = 0.3
        spawnLocation.Size = Vector3.new(20, 2, 20)  -- 더 넓고 두꺼운 바닥
        spawnLocation.BrickColor = BrickColor.new("Bright blue")
        spawnLocation.Material = Enum.Material.Neon
        print("[Server] SpawnLocation moved to:", spawnLocation.Position)
    else
        -- 새 SpawnLocation 생성
        spawnLocation = Instance.new("SpawnLocation")
        spawnLocation.Position = Vector3.new(0, 52, 35)
        spawnLocation.Size = Vector3.new(20, 2, 20)  -- 두꺼운 바닥
        spawnLocation.Anchored = true
        spawnLocation.CanCollide = true  -- ★ 충돌 가능
        spawnLocation.Transparency = 0.3
        spawnLocation.BrickColor = BrickColor.new("Bright blue")
        spawnLocation.Material = Enum.Material.Neon
        spawnLocation.Parent = workspace
        print("[Server] SpawnLocation created at:", spawnLocation.Position)
    end
end

-- ★ 플레이어 캐릭터 생성 시 위치 조정
local function onCharacterAdded(character)
    local humanoidRootPart = character:WaitForChild("HumanoidRootPart", 5)
    if humanoidRootPart then
        -- 약간의 딜레이 후 위치 조정
        task.delay(0.5, function()
            humanoidRootPart.CFrame = CFrame.new(0, 55, 35)
            humanoidRootPart.Velocity = Vector3.new(0, 0, 0)
            print("[Server] Character teleported to spawn position")
        end)
    end
end

local function onPlayerAdded(player)
    player.CharacterAdded:Connect(onCharacterAdded)
    
    -- 이미 캐릭터가 있으면 바로 처리
    if player.Character then
        onCharacterAdded(player.Character)
    end
end

-- 초기화
local function initialize()
    print("[Server] Initializing modules...")
    
    -- SpawnLocation 설정
    setupSpawnLocation()
    
    -- 게임 코어 초기화
    gameCore:init()
    
    -- 소셜 시스템 초기화
    social:init()
    
    -- 플레이어 연결
    Players.PlayerAdded:Connect(onPlayerAdded)
    for _, player in ipairs(Players:GetPlayers()) do
        onPlayerAdded(player)
    end
    
    print("[Server] All modules initialized!")
end

-- ★ RemoteEvents 설정
local function setupRemoteEvents()
    local ReplicatedStorage = game:GetService("ReplicatedStorage")
    
    -- Events 폴더 생성 또는 가져오기
    local events = ReplicatedStorage:FindFirstChild("Events")
    if not events then
        events = Instance.new("Folder")
        events.Name = "Events"
        events.Parent = ReplicatedStorage
    end
    
    -- StartGame 이벤트
    local startGame = events:FindFirstChild("StartGame")
    if not startGame then
        startGame = Instance.new("RemoteEvent")
        startGame.Name = "StartGame"
        startGame.Parent = events
    end
    
    -- GameStateChanged 이벤트
    local stateChanged = events:FindFirstChild("GameStateChanged")
    if not stateChanged then
        stateChanged = Instance.new("RemoteEvent")
        stateChanged.Name = "GameStateChanged"
        stateChanged.Parent = events
    end
    
    -- ★ SitPlayer 이벤트 (서버에서 앉히기)
    local sitPlayer = events:FindFirstChild("SitPlayer")
    if not sitPlayer then
        sitPlayer = Instance.new("RemoteEvent")
        sitPlayer.Name = "SitPlayer"
        sitPlayer.Parent = events
    end
    
    -- SitPlayer 이벤트 처리
    sitPlayer.OnServerEvent:Connect(function(player, seatPart)
        print("[Server] SitPlayer request from:", player.Name)
        
        local character = player.Character
        if not character then return end
        
        local humanoid = character:FindFirstChildOfClass("Humanoid")
        if not humanoid then return end
        
        -- seatPart 검증
        if seatPart and seatPart:IsA("Seat") or seatPart:IsA("VehicleSeat") then
            -- 플레이어 앉히기
            seatPart:Sit(humanoid)
            print("[Server] Player seated successfully!")
            
            -- 게임 상태 변경 알림
            stateChanged:FireClient(player, "Playing")
        else
            print("[Server] Invalid seat part!")
        end
    end)
    
    -- StartGame 이벤트 처리
    startGame.OnServerEvent:Connect(function(player)
        print("[Server] StartGame from:", player.Name)
        stateChanged:FireClient(player, "Ready")
    end)
    
    print("[Server] RemoteEvents setup complete")
end

-- 초기화 실행
setupRemoteEvents()  -- ★ RemoteEvents 먼저 설정
initialize()

print("═══════════════════════════════════════════════")
print("  ✈️ Ansible Fly Paper Plane - Server Ready!")
print("═══════════════════════════════════════════════")
