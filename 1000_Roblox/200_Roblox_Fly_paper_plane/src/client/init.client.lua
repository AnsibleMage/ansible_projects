-- Ansible Fly Paper Plane - Client Entry Point (Enhanced)
-- Block 1 (Flight Control), Block 2 (Game Client), Block 4 (UI) + Sound & Effects

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Lighting = game:GetService("Lighting")

print("═══════════════════════════════════════════════")
print("  ✈️ Ansible Fly Paper Plane - Client Starting")
print("═══════════════════════════════════════════════")

-- 모듈 로드
local FlightControl = require(script.Parent.Block1_FlightControl)
local GameClient = require(script.Parent.Block2_GameClient)
local UI = require(script.Parent.Block4_UI)

-- 공유 모듈
local Shared = ReplicatedStorage:WaitForChild("Shared", 5)
local SoundManager = nil
local EffectsManager = nil

if Shared then
    local soundModule = Shared:FindFirstChild("SoundManager")
    local effectsModule = Shared:FindFirstChild("EffectsManager")
    
    if soundModule then
        SoundManager = require(soundModule)
    end
    if effectsModule then
        EffectsManager = require(effectsModule)
    end
end

-- 인스턴스 생성
local flightController = FlightControl.new()
local gameClient = GameClient.new()
local ui = UI.new()
local soundManager = SoundManager and SoundManager.new() or nil
local effectsManager = EffectsManager and EffectsManager.new() or nil

-- 라이팅 설정
local function setupLighting()
    -- 하늘 설정
    Lighting.ClockTime = 14  -- 오후 2시
    Lighting.GeographicLatitude = 30
    Lighting.Brightness = 2
    Lighting.OutdoorAmbient = Color3.fromRGB(150, 170, 200)
    Lighting.Ambient = Color3.fromRGB(100, 120, 150)
    
    -- 안개 (거리감)
    Lighting.FogStart = 500
    Lighting.FogEnd = 2000
    Lighting.FogColor = Color3.fromRGB(180, 200, 230)
    
    -- 스카이박스
    local sky = Lighting:FindFirstChildOfClass("Sky")
    if not sky then
        sky = Instance.new("Sky")
        sky.SkyboxBk = "rbxassetid://1012890"
        sky.SkyboxDn = "rbxassetid://1012891"
        sky.SkyboxFt = "rbxassetid://1012887"
        sky.SkyboxLf = "rbxassetid://1012889"
        sky.SkyboxRt = "rbxassetid://1012888"
        sky.SkyboxUp = "rbxassetid://1012890"
        sky.Parent = Lighting
    end
    
    -- 블룸 효과
    local bloom = Lighting:FindFirstChild("Bloom")
    if not bloom then
        bloom = Instance.new("BloomEffect")
        bloom.Name = "Bloom"
        bloom.Intensity = 0.5
        bloom.Size = 24
        bloom.Threshold = 0.9
        bloom.Parent = Lighting
    end
    
    -- 태양광
    local sunRays = Lighting:FindFirstChild("SunRays")
    if not sunRays then
        sunRays = Instance.new("SunRaysEffect")
        sunRays.Name = "SunRays"
        sunRays.Intensity = 0.1
        sunRays.Spread = 0.5
        sunRays.Parent = Lighting
    end
    
    print("[Client] Lighting setup complete")
end

-- 초기화
local function initialize()
    print("[Client] Initializing modules...")
    
    -- 라이팅 설정
    setupLighting()
    
    -- 사운드 매니저 초기화
    if soundManager then
        soundManager:init()
        soundManager:playBGM("BGM_Menu")
    end
    
    -- 이펙트 매니저 초기화
    if effectsManager then
        effectsManager:init()
    end
    
    -- UI 초기화
    ui:init()
    
    -- 게임 클라이언트 초기화
    gameClient:init()
    
    -- 비행 컨트롤 초기화
    flightController:init()
    
    -- 비행기 트레일 강화
    if effectsManager then
        local plane = workspace:FindFirstChild("PaperPlane")
        if plane then
            effectsManager:enhancePlaneTrail(plane)
        end
    end
    
    -- 게임 이벤트 연결
    local events = ReplicatedStorage:WaitForChild("Events", 5)
    if events then
        local stateEvent = events:FindFirstChild("GameStateChanged")
        if stateEvent then
            stateEvent.OnClientEvent:Connect(function(newState)
                print("[Client] Game state changed to:", newState)
                
                -- 비행 제어
                if newState == "Playing" or newState == "Ready" then
                    -- ★ 비행기 다시 찾기 (LobbyUI에서 생성했을 수 있음)
                    local existingPlane = workspace:FindFirstChild("PaperPlane")
                    if existingPlane then
                        local rootPart = existingPlane.PrimaryPart or existingPlane:FindFirstChild("RootPart")
                        if rootPart then
                            flightController.plane = rootPart
                            flightController.flightPhysics = require(script.Parent.Block1_FlightControl.FlightPhysics).new(rootPart)
                            flightController.flightCamera = require(script.Parent.Block1_FlightControl.FlightCamera).new(rootPart)
                        end
                    end
                    
                    flightController:startFlight()
                    
                    -- BGM 변경
                    if soundManager then
                        soundManager:playBGM("BGM_Game")
                        soundManager:play("Start")
                        
                        -- 엔진 사운드
                        local plane = flightController:getPlane()
                        if plane then
                            soundManager:playEngine(plane)
                        end
                    end
                    
                elseif newState == "Finished" then
                    -- 골인 이펙트
                    if effectsManager then
                        local plane = flightController:getPlane()
                        if plane then
                            effectsManager:finishEffect(plane.Position)
                        end
                    end
                    if soundManager then
                        soundManager:play("Finish")
                    end
                    
                elseif newState == "Lobby" then
                    flightController:stopFlight()
                    
                    -- BGM 변경
                    if soundManager then
                        soundManager:playBGM("BGM_Menu")
                    end
                end
            end)
        end
    end
    
    -- HUD 업데이트 루프
    RunService.RenderStepped:Connect(function(dt)
        local speed = flightController:getSpeed()
        ui:updateSpeed(speed)
    end)
    
    print("[Client] All modules initialized!")
end

-- 플레이어 캐릭터 로드 대기
local player = Players.LocalPlayer
player.CharacterAdded:Wait()

-- 약간의 딜레이 후 초기화
task.wait(1)
initialize()

print("═══════════════════════════════════════════════")
print("  ✈️ Ansible Fly Paper Plane - Client Ready!")
print("═══════════════════════════════════════════════")
