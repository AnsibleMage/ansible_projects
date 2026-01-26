-- Block 3: Social System - Server
-- 플레이어 인증, 리더보드, 기록 관리

local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local Social = {}
Social.__index = Social

-- DataStore 이름
local LEADERBOARD_STORE = "FlyPaperPlane_Leaderboard_v1"
local PLAYER_STORE = "FlyPaperPlane_PlayerData_v1"

function Social.new()
    local self = setmetatable({}, Social)
    
    self.leaderboardStore = nil
    self.playerStore = nil
    self.cache = {}
    
    return self
end

function Social:init()
    print("[Social] Initializing...")
    
    -- DataStore 초기화 (Studio에서는 작동 안 할 수 있음)
    local success, err = pcall(function()
        self.leaderboardStore = DataStoreService:GetOrderedDataStore(LEADERBOARD_STORE)
        self.playerStore = DataStoreService:GetDataStore(PLAYER_STORE)
    end)
    
    if not success then
        warn("[Social] DataStore init failed:", err)
    end
    
    -- 이벤트 설정
    self:setupEvents()
    
    -- 플레이어 연결
    Players.PlayerAdded:Connect(function(player)
        self:onPlayerAdded(player)
    end)
    
    print("[Social] Initialized!")
end

function Social:setupEvents()
    local events = ReplicatedStorage:WaitForChild("Events", 5)
    if not events then
        events = Instance.new("Folder")
        events.Name = "Events"
        events.Parent = ReplicatedStorage
    end
    
    -- 기록 제출 이벤트
    local submitRecord = Instance.new("RemoteEvent")
    submitRecord.Name = "SubmitRecord"
    submitRecord.Parent = events
    submitRecord.OnServerEvent:Connect(function(player, time)
        self:submitRecord(player, time)
    end)
    
    -- 리더보드 요청 이벤트
    local getLeaderboard = Instance.new("RemoteFunction")
    getLeaderboard.Name = "GetLeaderboard"
    getLeaderboard.Parent = events
    getLeaderboard.OnServerInvoke = function(player, count)
        return self:getLeaderboard(count or 100)
    end
    
    -- 개인 기록 요청 이벤트
    local getPlayerRecord = Instance.new("RemoteFunction")
    getPlayerRecord.Name = "GetPlayerRecord"
    getPlayerRecord.Parent = events
    getPlayerRecord.OnServerInvoke = function(player)
        return self:getPlayerRecord(player)
    end
    
    print("[Social] Events setup complete")
end

function Social:onPlayerAdded(player)
    -- 플레이어 데이터 로드
    local data = self:loadPlayerData(player)
    self.cache[player.UserId] = data
    
    print("[Social] Player data loaded:", player.Name, "Best:", data.bestTime or "N/A")
end

function Social:loadPlayerData(player)
    if not self.playerStore then
        return { bestTime = 0, totalPlays = 0 }
    end
    
    local success, data = pcall(function()
        return self.playerStore:GetAsync(tostring(player.UserId))
    end)
    
    if success and data then
        return data
    else
        return { bestTime = 0, totalPlays = 0 }
    end
end

function Social:savePlayerData(player, data)
    if not self.playerStore then return false end
    
    local success, err = pcall(function()
        self.playerStore:SetAsync(tostring(player.UserId), data)
    end)
    
    if not success then
        warn("[Social] Failed to save player data:", err)
    end
    
    return success
end

function Social:submitRecord(player, time: number)
    if time <= 0 then return end
    
    local data = self.cache[player.UserId] or { bestTime = 0, totalPlays = 0 }
    data.totalPlays = data.totalPlays + 1
    
    -- 최고 기록 갱신 확인
    local isNewRecord = false
    if data.bestTime == 0 or time < data.bestTime then
        data.bestTime = time
        isNewRecord = true
        
        -- 리더보드 업데이트
        self:updateLeaderboard(player, time)
    end
    
    -- 데이터 저장
    self.cache[player.UserId] = data
    self:savePlayerData(player, data)
    
    print("[Social] Record submitted:", player.Name, "Time:", time, "New Record:", isNewRecord)
    
    return isNewRecord
end

function Social:updateLeaderboard(player, time: number)
    if not self.leaderboardStore then return end
    
    -- 시간을 정수로 변환 (밀리초 단위)
    -- 작은 시간이 더 높은 점수가 되도록 역전
    local score = math.floor((10000 - time) * 1000)
    
    local success, err = pcall(function()
        self.leaderboardStore:SetAsync(tostring(player.UserId), score)
    end)
    
    if not success then
        warn("[Social] Failed to update leaderboard:", err)
    end
end

function Social:getLeaderboard(count: number): {}
    if not self.leaderboardStore then
        return {}
    end
    
    local results = {}
    
    local success, pages = pcall(function()
        return self.leaderboardStore:GetSortedAsync(false, count)
    end)
    
    if not success or not pages then
        return results
    end
    
    local currentPage = pages:GetCurrentPage()
    
    for rank, entry in ipairs(currentPage) do
        local userId = tonumber(entry.key)
        local score = entry.value
        local time = (10000 - score / 1000)  -- 원래 시간으로 복원
        
        -- 플레이어 이름 가져오기
        local playerName = "Unknown"
        local success2, name = pcall(function()
            return Players:GetNameFromUserIdAsync(userId)
        end)
        if success2 then
            playerName = name
        end
        
        table.insert(results, {
            rank = rank,
            userId = userId,
            name = playerName,
            time = time,
        })
    end
    
    return results
end

function Social:getPlayerRecord(player)
    local data = self.cache[player.UserId]
    if data then
        return data.bestTime, data.totalPlays
    end
    return 0, 0
end

function Social:getPlayerRank(player): number?
    if not self.leaderboardStore then return nil end
    
    local success, rank = pcall(function()
        return self.leaderboardStore:GetRankAsync(tostring(player.UserId))
    end)
    
    if success then
        return rank
    end
    return nil
end

return Social
