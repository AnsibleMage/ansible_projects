-- Block 2: Game Core - Server (Enhanced)
-- 게임 코어 시스템 (코스, 타이머, 충돌)

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- 공유 모듈
local Shared = ReplicatedStorage:WaitForChild("Shared", 5)
local CourseBuilder = nil
if Shared then
    CourseBuilder = require(Shared:WaitForChild("CourseBuilder", 2))
end

local GameCore = {}
GameCore.__index = GameCore

-- 게임 상태
local GameState = {
    LOBBY = "Lobby",
    READY = "Ready",
    PLAYING = "Playing",
    FINISHED = "Finished",
}

function GameCore.new()
    local self = setmetatable({}, GameCore)
    
    self.players = {}
    self.currentState = GameState.LOBBY
    self.course = nil
    self.events = nil
    
    return self
end

function GameCore:init()
    print("[GameCore] Initializing...")
    
    -- 이벤트 폴더 생성
    self:setupEvents()
    
    -- 코스 생성
    self:setupCourse()
    
    -- 플레이어 연결
    Players.PlayerAdded:Connect(function(player)
        self:onPlayerAdded(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:onPlayerRemoving(player)
    end)
    
    -- 기존 플레이어 처리
    for _, player in ipairs(Players:GetPlayers()) do
        self:onPlayerAdded(player)
    end
    
    print("[GameCore] Initialized!")
end

function GameCore:setupEvents()
    local events = ReplicatedStorage:FindFirstChild("Events")
    if not events then
        events = Instance.new("Folder")
        events.Name = "Events"
        events.Parent = ReplicatedStorage
    end
    
    -- 타이머 업데이트 이벤트
    if not events:FindFirstChild("TimerUpdate") then
        local timerUpdate = Instance.new("RemoteEvent")
        timerUpdate.Name = "TimerUpdate"
        timerUpdate.Parent = events
    end
    
    -- 게임 상태 변경 이벤트
    if not events:FindFirstChild("GameStateChanged") then
        local stateChanged = Instance.new("RemoteEvent")
        stateChanged.Name = "GameStateChanged"
        stateChanged.Parent = events
    end
    
    -- 게임 시작 요청
    if not events:FindFirstChild("StartGame") then
        local startGame = Instance.new("RemoteEvent")
        startGame.Name = "StartGame"
        startGame.Parent = events
    end
    events.StartGame.OnServerEvent:Connect(function(player)
        self:startGame(player)
    end)
    
    -- 게임 재시작 요청
    if not events:FindFirstChild("RestartGame") then
        local restartGame = Instance.new("RemoteEvent")
        restartGame.Name = "RestartGame"
        restartGame.Parent = events
    end
    events.RestartGame.OnServerEvent:Connect(function(player)
        self:restartGame(player)
    end)
    
    self.events = events
    print("[GameCore] Events created")
end

function GameCore:setupCourse()
    -- 기존 코스 삭제
    local existingCourse = workspace:FindFirstChild("Course")
    if existingCourse then
        existingCourse:Destroy()
    end
    
    -- CourseBuilder 사용
    if CourseBuilder then
        self.course = CourseBuilder.createCourse(workspace)
    else
        -- 폴백: 간단한 코스 생성
        self.course = self:createSimpleCourse()
    end
    
    -- 충돌 이벤트 연결
    self:setupCollisionEvents()
    
    print("[GameCore] Course setup complete")
end

function GameCore:createSimpleCourse(): Folder
    local course = Instance.new("Folder")
    course.Name = "Course"
    course.Parent = workspace
    
    -- 시작점
    local start = Instance.new("Part")
    start.Name = "StartPoint"
    start.Size = Vector3.new(30, 2, 30)
    start.Position = Vector3.new(0, 30, 0)
    start.Anchored = true
    start.CanCollide = false
    start.BrickColor = BrickColor.new("Bright green")
    start.Transparency = 0.5
    start.Parent = course
    
    -- 골인점
    local finish = Instance.new("Part")
    finish.Name = "FinishPoint"
    finish.Size = Vector3.new(50, 2, 50)
    finish.Position = Vector3.new(0, 30, -500)
    finish.Anchored = true
    finish.CanCollide = false
    finish.BrickColor = BrickColor.new("Bright red")
    finish.Transparency = 0.3
    finish.Parent = course
    
    return course
end

function GameCore:setupCollisionEvents()
    if not self.course then return end
    
    -- 시작점 감지
    local startPoint = self.course:FindFirstChild("StartPoint")
    if startPoint then
        startPoint.Touched:Connect(function(hit)
            self:onPartTouched(hit, "Start")
        end)
    end
    
    -- 골인점 감지
    local finishPoint = self.course:FindFirstChild("FinishPoint")
    if finishPoint then
        finishPoint.Touched:Connect(function(hit)
            self:onPartTouched(hit, "Finish")
        end)
    end
    
    -- 장애물 감지
    local obstacles = self.course:FindFirstChild("Obstacles")
    if obstacles then
        for _, obstacle in ipairs(obstacles:GetChildren()) do
            obstacle.Touched:Connect(function(hit)
                self:onPartTouched(hit, "Obstacle")
            end)
        end
    end
    
    -- 링 감지
    local rings = self.course:FindFirstChild("Rings")
    if rings then
        for _, ring in ipairs(rings:GetChildren()) do
            ring.Touched:Connect(function(hit)
                self:onPartTouched(hit, "Ring")
            end)
        end
    end
end

function GameCore:onPartTouched(hit: BasePart, touchType: string)
    -- 비행기 또는 캐릭터 확인
    local player = nil
    
    -- 캐릭터에서 플레이어 찾기
    player = Players:GetPlayerFromCharacter(hit.Parent)
    
    -- 비행기에서 플레이어 찾기 (나중에 구현)
    if not player and hit.Parent and hit.Parent.Name == "PaperPlane" then
        -- 비행기는 로컬 플레이어만 조종
        for _, p in ipairs(Players:GetPlayers()) do
            if self.players[p.UserId] and self.players[p.UserId].state == GameState.PLAYING then
                player = p
                break
            end
        end
    end
    
    if not player then return end
    
    if touchType == "Start" then
        self:onStartTouched(player)
    elseif touchType == "Finish" then
        self:onFinishTouched(player)
    elseif touchType == "Obstacle" then
        self:onObstacleHit(player)
    elseif touchType == "Ring" then
        self:onRingPassed(player, hit)
    end
end

function GameCore:onPlayerAdded(player)
    self.players[player.UserId] = {
        player = player,
        state = GameState.LOBBY,
        startTime = 0,
        bestTime = 0,
        ringsCollected = 0,
    }
    print("[GameCore] Player added:", player.Name)
end

function GameCore:onPlayerRemoving(player)
    self.players[player.UserId] = nil
    print("[GameCore] Player removed:", player.Name)
end

function GameCore:onStartTouched(player)
    local data = self.players[player.UserId]
    if not data then return end
    
    if data.state == GameState.READY then
        data.state = GameState.PLAYING
        data.startTime = tick()
        data.ringsCollected = 0
        
        self.events.GameStateChanged:FireClient(player, GameState.PLAYING)
        print("[GameCore] Player started:", player.Name)
        
        self:startTimer(player)
    end
end

function GameCore:onFinishTouched(player)
    local data = self.players[player.UserId]
    if not data then return end
    
    if data.state == GameState.PLAYING then
        local finishTime = tick() - data.startTime
        data.state = GameState.FINISHED
        
        -- 최고 기록 갱신
        if data.bestTime == 0 or finishTime < data.bestTime then
            data.bestTime = finishTime
            print("[GameCore] New best time for", player.Name, ":", finishTime)
        end
        
        self.events.GameStateChanged:FireClient(player, GameState.FINISHED)
        self.events.TimerUpdate:FireClient(player, finishTime)
        
        -- 소셜 시스템에 기록 제출
        local submitEvent = self.events:FindFirstChild("SubmitRecord")
        if submitEvent then
            submitEvent:FireServer(player, finishTime)
        end
        
        print("[GameCore] Player finished:", player.Name, "Time:", string.format("%.2f", finishTime))
    end
end

function GameCore:onObstacleHit(player)
    local data = self.players[player.UserId]
    if not data then return end
    
    if data.state == GameState.PLAYING then
        -- 리스폰
        self:respawnPlayer(player)
        data.state = GameState.READY
        data.startTime = 0
        data.ringsCollected = 0
        
        self.events.GameStateChanged:FireClient(player, GameState.READY)
        print("[GameCore] Player hit obstacle:", player.Name)
    end
end

function GameCore:onRingPassed(player, ring)
    local data = self.players[player.UserId]
    if not data then return end
    
    if data.state == GameState.PLAYING then
        data.ringsCollected = data.ringsCollected + 1
        print("[GameCore] Player passed ring:", player.Name, "Total:", data.ringsCollected)
        
        -- 링 효과 (색상 변경)
        if ring then
            ring.Color = Color3.fromRGB(100, 255, 100)
            ring.Transparency = 0.7
        end
    end
end

function GameCore:startGame(player)
    local data = self.players[player.UserId]
    if not data then return end
    
    data.state = GameState.READY
    
    -- ★ 비행기가 없으면 생성
    self:createPlaneIfNeeded()
    
    -- 플레이어 리스폰 및 탑승
    self:respawnPlayer(player)
    
    self.events.GameStateChanged:FireClient(player, GameState.READY)
    print("[GameCore] Player ready:", player.Name)
end

function GameCore:restartGame(player)
    local data = self.players[player.UserId]
    if not data then return end
    
    data.state = GameState.READY
    data.startTime = 0
    data.ringsCollected = 0
    self:respawnPlayer(player)
    
    -- 링 색상 리셋
    if self.course then
        local rings = self.course:FindFirstChild("Rings")
        if rings then
            for _, ring in ipairs(rings:GetChildren()) do
                ring.Color = Color3.fromRGB(255, 215, 0)
                ring.Transparency = 0.3
            end
        end
    end
    
    self.events.GameStateChanged:FireClient(player, GameState.READY)
    print("[GameCore] Player restarted:", player.Name)
end

-- ★ 비행기 생성 함수
function GameCore:createPlaneIfNeeded()
    local existingPlane = workspace:FindFirstChild("PaperPlane")
    if existingPlane then return existingPlane end
    
    -- PlaneModel 모듈 사용
    local ReplicatedStorage = game:GetService("ReplicatedStorage")
    local Shared = ReplicatedStorage:WaitForChild("Shared", 5)
    
    if Shared then
        local PlaneModelModule = Shared:FindFirstChild("PlaneModel")
        if PlaneModelModule then
            local PlaneModel = require(PlaneModelModule)
            local plane = PlaneModel.create(Vector3.new(0, 55, 30))
            print("[GameCore] Plane created with PlaneModel")
            return plane
        end
    end
    
    -- 폴백: 간단한 비행기 생성
    local plane = Instance.new("Model")
    plane.Name = "PaperPlane"
    
    local rootPart = Instance.new("Part")
    rootPart.Name = "RootPart"
    rootPart.Size = Vector3.new(4, 1, 6)
    rootPart.Position = Vector3.new(0, 55, 30)
    rootPart.Anchored = false
    rootPart.CanCollide = true
    rootPart.BrickColor = BrickColor.new("White")
    rootPart.Parent = plane
    
    plane.PrimaryPart = rootPart
    
    -- VehicleSeat 추가
    local seat = Instance.new("VehicleSeat")
    seat.Name = "PilotSeat"
    seat.Size = Vector3.new(2, 0.5, 2)
    seat.CFrame = rootPart.CFrame * CFrame.new(0, 0.5, 0.5)
    seat.Anchored = false
    seat.CanCollide = false
    seat.Transparency = 0.8
    seat.MaxSpeed = 0
    seat.Parent = plane
    
    local seatWeld = Instance.new("WeldConstraint")
    seatWeld.Part0 = rootPart
    seatWeld.Part1 = seat
    seatWeld.Parent = seat
    
    plane.Parent = workspace
    print("[GameCore] Simple plane created")
    return plane
end

function GameCore:respawnPlayer(player)
    -- 스타트 위치 (높은 곳)
    local spawnPosition = Vector3.new(0, 55, 30)
    
    -- 비행기 확보
    local plane = workspace:FindFirstChild("PaperPlane")
    if not plane then
        plane = self:createPlaneIfNeeded()
    end
    
    if plane then
        -- 비행기 위치 설정
        if plane.PrimaryPart then
            plane:SetPrimaryPartCFrame(CFrame.new(spawnPosition))
        end
        
        -- ★ 플레이어를 비행기 좌석에 앉히기
        local seat = plane:FindFirstChild("PilotSeat")
        local character = player.Character
        if seat and character then
            local humanoid = character:FindFirstChildOfClass("Humanoid")
            local hrp = character:FindFirstChild("HumanoidRootPart")
            
            if humanoid and hrp then
                -- 먼저 캐릭터를 비행기 근처로 이동
                hrp.CFrame = CFrame.new(spawnPosition + Vector3.new(0, 3, 0))
                hrp.Velocity = Vector3.new(0, 0, 0)
                
                -- 약간의 딜레이 후 앉히기
                task.delay(0.2, function()
                    if seat and humanoid then
                        seat:Sit(humanoid)
                        print("[GameCore] Player seated in plane!")
                    end
                end)
            end
        else
            print("[GameCore] Seat or character not found:", seat, character)
        end
    else
        -- 비행기 없으면 캐릭터만 이동
        local character = player.Character
        if character then
            local hrp = character:FindFirstChild("HumanoidRootPart")
            if hrp then
                hrp.CFrame = CFrame.new(spawnPosition + Vector3.new(0, 5, 0))
                hrp.Velocity = Vector3.new(0, 0, 0)
            end
        end
    end
    
    print("[GameCore] Player respawned at:", spawnPosition)
end

function GameCore:startTimer(player)
    local data = self.players[player.UserId]
    if not data then return end
    
    task.spawn(function()
        while data.state == GameState.PLAYING do
            local elapsed = tick() - data.startTime
            self.events.TimerUpdate:FireClient(player, elapsed)
            task.wait(0.01)
        end
    end)
end

return GameCore
