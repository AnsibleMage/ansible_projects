-- RaceEngine.server.lua
-- Forest Sprint Premium - Race Timer and DataStore Logic
-- Created by Antigravity V3.0 following 111_PRD specifications

local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")
local DataStoreService = game:GetService("DataStoreService")

-- DataStore initialization per 111_PRD Section 5.3
local RaceStore = DataStoreService:GetDataStore("ForestSprintRecords")

-- Global Ranking Service
local RankingService = require(script.Parent.Services.RankingService)

-- Checkpoint Service
local CheckpointService = require(script.Parent.Services.CheckpointService)

-- Shop Service
local ShopService = require(script.Parent.Services.ShopService)

-- Race data tracking: { [userId] = startTime }
local raceData = {}

-- Checkpoint platform references (initialized later)
local checkpointPlatforms = {}

-- Get references to track elements
local startLine = Workspace:WaitForChild("StartLine")
local finishLine = Workspace:WaitForChild("FinishLine")

-- T-301: StartLine Touched Event
local function onStartTouched(hit)
	local character = hit.Parent
	local player = Players:GetPlayerFromCharacter(character)
	
	if player then
		-- Check if player already started (prevent re-triggering)
		if not raceData[player.UserId] then
			raceData[player.UserId] = tick()
			print("[RaceEngine] Race Started for: " .. player.Name)
			
			-- TODO: Fire RemoteEvent to client for UI sync
		end
	end
end

-- T-301: FinishLine Touched Event
local function onFinishTouched(hit)
	local character = hit.Parent
	local player = Players:GetPlayerFromCharacter(character)

	if player then
		local startTime = raceData[player.UserId]

		if startTime then
			-- Calculate race time (111_PRD: 0.01s precision)
			local finishTime = tick() - startTime
			raceData[player.UserId] = nil  -- Clear race data

			print(string.format("[RaceEngine] %s finished in %.2f seconds", player.Name, finishTime))

			-- Check game mode (checkpoint vs no-checkpoint)
			local gameMode = CheckpointService.GetMode(player)

			if gameMode == "checkpoint" then
				-- CHECKPOINT MODE: Save to checkpoint leaderboard only
				print(string.format("[RaceEngine] Checkpoint mode finish - CP leaderboard only"))
				-- TODO: Implement separate checkpoint leaderboard (future enhancement)
				-- For now, no main leaderboard update in checkpoint mode

				-- Award coins for checkpoint mode completion (reduced)
				local coins = ShopService.CalculateCoins(finishTime, true)
				ShopService.AwardCoins(player.UserId, coins)
				print(string.format("[RaceEngine] Awarded %d coins (checkpoint mode) to %s", coins, player.Name))

			else
				-- NO-CHECKPOINT MODE: Original behavior (main leaderboard)
				-- Save to DataStore (111_PRD Section 5.3)
				local success, err = pcall(function()
					local currentBest = RaceStore:GetAsync(tostring(player.UserId)) or 9999

					if finishTime < currentBest then
						RaceStore:SetAsync(tostring(player.UserId), finishTime)
						print(string.format("[RaceEngine] NEW RECORD for %s: %.2f", player.Name, finishTime))
					else
						print(string.format("[RaceEngine] Time: %.2f (Best: %.2f)", finishTime, currentBest))
					end
				end)

				if not success then
					warn("[RaceEngine] DataStore Error: " .. tostring(err))
				end

				-- Submit to Global Ranking System
				local timeMs = math.floor(finishTime * 1000) -- Convert seconds to milliseconds
				local rankSuccess = pcall(function()
					RankingService.SubmitTime(player.UserId, timeMs)
				end)

				if not rankSuccess then
					warn("[RaceEngine] Failed to submit time to RankingService")
				end

				-- Award coins for race completion
				local coins = ShopService.CalculateCoins(finishTime, false)
				ShopService.AwardCoins(player.UserId, coins)
				print(string.format("[RaceEngine] Awarded %d coins to %s", coins, player.Name))
			end
		else
			warn("[RaceEngine] Player crossed finish without starting: " .. player.Name)
		end
	end
end

-- Initialize checkpoint platforms
-- Note: These should match the actual platform parts in Workspace
local function initializeCheckpointPlatforms()
	-- Get checkpoint platform references (platforms 5, 10, 15, 20)
	local platforms = Workspace:WaitForChild("Platforms")

	checkpointPlatforms = {
		CP0 = startLine,  -- Start position (CP-0)
		CP1 = platforms:FindFirstChild("Platform5"),   -- CP-1
		CP2 = platforms:FindFirstChild("Platform10"),  -- CP-2
		CP3 = platforms:FindFirstChild("Platform15"),  -- CP-3
		CP4 = platforms:FindFirstChild("Platform20")   -- CP-4
	}

	-- Validate all platforms exist
	for key, platform in pairs(checkpointPlatforms) do
		if not platform then
			warn("[RaceEngine] Missing checkpoint platform: " .. key)
		end
	end

	-- Initialize CheckpointService with platform positions
	CheckpointService.Init(checkpointPlatforms)

	-- Connect checkpoint activation events
	local checkpointMapping = {
		{platform = checkpointPlatforms.CP1, id = 1},
		{platform = checkpointPlatforms.CP2, id = 2},
		{platform = checkpointPlatforms.CP3, id = 3},
		{platform = checkpointPlatforms.CP4, id = 4}
	}

	for _, cp in ipairs(checkpointMapping) do
		if cp.platform then
			cp.platform.Touched:Connect(function(hit)
				local character = hit.Parent
				local player = Players:GetPlayerFromCharacter(character)

				if player then
					-- Attempt to activate checkpoint
					CheckpointService.ActivateCheckpoint(player, cp.id)
				end
			end)
		end
	end

	print("[RaceEngine] ✅ Checkpoint platforms connected")
end

-- Initialize Global Ranking System
RankingService.Init()

-- Initialize Shop System
ShopService.Init()

-- Initialize Checkpoint System
initializeCheckpointPlatforms()

-- Connect events
startLine.Touched:Connect(onStartTouched)
finishLine.Touched:Connect(onFinishTouched)

-- Handle player death and respawn
local function handlePlayerDeath(player, character)
	local gameMode = CheckpointService.GetMode(player)

	if gameMode == "checkpoint" then
		-- CHECKPOINT MODE: Respawn at latest checkpoint, timer continues
		print(string.format("[RaceEngine] %s died in checkpoint mode - respawning at latest CP", player.Name))

		-- Get respawn position from CheckpointService
		local respawnPos = CheckpointService.GetRespawnPosition(player)

		-- Wait for character to respawn
		player.CharacterAdded:Wait()
		local newCharacter = player.Character
		local hrp = newCharacter:WaitForChild("HumanoidRootPart")

		-- Teleport to checkpoint position
		hrp.CFrame = CFrame.new(respawnPos)

		-- Grant invincibility
		CheckpointService.GrantRespawnInvincibility(player)

		-- Timer continues (don't clear raceData in checkpoint mode)
	else
		-- NO-CHECKPOINT MODE: Full restart, timer reset (original behavior)
		if raceData[player.UserId] then
			print(string.format("[RaceEngine] %s died - clearing race data (no-checkpoint mode)", player.Name))
			raceData[player.UserId] = nil
		end
	end
end

-- Clear race data when player dies (Phase 3 fix + Checkpoint integration)
Players.PlayerAdded:Connect(function(player)
	-- Load checkpoint data on join
	CheckpointService.LoadFromDataStore(player)

	player.CharacterAdded:Connect(function(character)
		local humanoid = character:WaitForChild("Humanoid")
		humanoid.Died:Connect(function()
			handlePlayerDeath(player, character)
		end)
	end)
end)

-- Handle players already in game
for _, player in pairs(Players:GetPlayers()) do
	-- Load checkpoint data
	CheckpointService.LoadFromDataStore(player)

	if player.Character then
		local humanoid = player.Character:FindFirstChild("Humanoid")
		if humanoid then
			humanoid.Died:Connect(function()
				handlePlayerDeath(player, player.Character)
			end)
		end
	end
	player.CharacterAdded:Connect(function(character)
		local humanoid = character:WaitForChild("Humanoid")
		humanoid.Died:Connect(function()
			handlePlayerDeath(player, character)
		end)
	end)
end

print("[RaceEngine] ✅ Forest Sprint Race Engine Online - Following 111_PRD")
print("[RaceEngine] ✅ Checkpoint Save System Integrated - TDD Implementation")
