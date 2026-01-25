-- RaceEngine.server.lua
-- Forest Sprint Premium - Race Timer and DataStore Logic
-- Created by Antigravity V3.0 following 111_PRD specifications

local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")
local DataStoreService = game:GetService("DataStoreService")

-- DataStore initialization per 111_PRD Section 5.3
local RaceStore = DataStoreService:GetDataStore("ForestSprintRecords")

-- Race data tracking: { [userId] = startTime }
local raceData = {}

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
		else
			warn("[RaceEngine] Player crossed finish without starting: " .. player.Name)
		end
	end
end

-- Connect events
startLine.Touched:Connect(onStartTouched)
finishLine.Touched:Connect(onFinishTouched)

-- Clear race data when player dies (Phase 3 fix)
Players.PlayerAdded:Connect(function(player)
	player.CharacterAdded:Connect(function(character)
		local humanoid = character:WaitForChild("Humanoid")
		humanoid.Died:Connect(function()
			-- Clear race data on death
			if raceData[player.UserId] then
				print(string.format("[RaceEngine] %s died - clearing race data", player.Name))
				raceData[player.UserId] = nil
			end
		end)
	end)
end)

-- Handle players already in game
for _, player in pairs(Players:GetPlayers()) do
	if player.Character then
		local humanoid = player.Character:FindFirstChild("Humanoid")
		if humanoid then
			humanoid.Died:Connect(function()
				if raceData[player.UserId] then
					print(string.format("[RaceEngine] %s died - clearing race data", player.Name))
					raceData[player.UserId] = nil
				end
			end)
		end
	end
	player.CharacterAdded:Connect(function(character)
		local humanoid = character:WaitForChild("Humanoid")
		humanoid.Died:Connect(function()
			if raceData[player.UserId] then
				print(string.format("[RaceEngine] %s died - clearing race data", player.Name))
				raceData[player.UserId] = nil
			end
		end)
	end)
end

print("[RaceEngine] ✅ Forest Sprint Race Engine Online - Following 111_PRD")
