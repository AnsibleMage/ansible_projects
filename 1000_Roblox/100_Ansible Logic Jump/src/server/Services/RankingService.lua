-- RankingService.lua
-- Global Ranking System using OrderedDataStore
-- Forest Sprint Premium - Ansible Logic Jump

local DataStoreService = game:GetService("DataStoreService")
local RunService = game:GetService("RunService")

-- Import constants
local RankingConstants = require(script.Parent.Parent.Parent.shared.Constants.RankingConstants)

local RankingService = {}

-- Private state
local orderedStore = nil
local leaderboardCache = {}
local lastCacheUpdate = 0
local isInitialized = false

-- Initialize the ranking service
function RankingService.Init()
	if isInitialized then
		warn("[RankingService] Already initialized")
		return
	end

	-- Get OrderedDataStore handle
	local success, result = pcall(function()
		return DataStoreService:GetOrderedDataStore(RankingConstants.ORDERED_STORE_NAME)
	end)

	if success then
		orderedStore = result
		isInitialized = true
		print("[RankingService] ✅ Initialized with store: " .. RankingConstants.ORDERED_STORE_NAME)

		-- Initial cache load
		RankingService.RefreshCache()

		-- Setup periodic refresh loop
		spawn(function()
			while true do
				wait(RankingConstants.CACHE_TTL_SECONDS)
				if isInitialized then
					RankingService.RefreshCache()
				end
			end
		end)
	else
		warn("[RankingService] ❌ Failed to initialize OrderedDataStore: " .. tostring(result))
	end
end

-- Submit a player's time to the ranking system
-- @param userId: number - The player's UserId
-- @param timeMs: number - The time in milliseconds (integer)
-- @return boolean - True if submitted/updated successfully
function RankingService.SubmitTime(userId, timeMs)
	if not isInitialized then
		warn("[RankingService] Not initialized - cannot submit time")
		return false
	end

	-- Validate inputs
	if type(userId) ~= "number" or userId <= 0 then
		warn("[RankingService] Invalid userId: " .. tostring(userId))
		return false
	end

	if type(timeMs) ~= "number" or timeMs <= 0 then
		warn("[RankingService] Invalid timeMs: " .. tostring(timeMs))
		return false
	end

	-- Round to integer (OrderedDataStore requirement)
	local timeInt = math.floor(timeMs)

	-- Submit to OrderedDataStore
	local success, err = pcall(function()
		-- Check current best time
		local currentBest = orderedStore:GetAsync(tostring(userId))

		-- Update only if this time is better (lower) or no previous record
		if not currentBest or timeInt < currentBest then
			orderedStore:SetAsync(tostring(userId), timeInt)
			print(string.format("[RankingService] New record for UserId %d: %dms", userId, timeInt))

			-- Trigger cache refresh for immediate update
			spawn(function()
				wait(1) -- Small delay to ensure DataStore propagation
				RankingService.RefreshCache()
			end)

			return true
		else
			print(string.format("[RankingService] Time %dms not better than current best %dms for UserId %d",
				timeInt, currentBest, userId))
			return false
		end
	end)

	if not success then
		warn("[RankingService] Failed to submit time: " .. tostring(err))
		return false
	end

	return success
end

-- Get top N players from the leaderboard
-- @param count: number? - Number of entries to return (default: DISPLAY_SIZE)
-- @return array - Array of {userId, timeMs, rank}
function RankingService.GetTopN(count)
	count = count or RankingConstants.DISPLAY_SIZE

	local result = {}
	for i = 1, math.min(count, #leaderboardCache) do
		table.insert(result, leaderboardCache[i])
	end

	return result
end

-- Get a specific player's rank and time
-- @param userId: number - The player's UserId
-- @return table? - {rank, timeMs} or nil if not ranked
function RankingService.GetPlayerRank(userId)
	if not isInitialized then
		warn("[RankingService] Not initialized")
		return nil
	end

	-- Search in cache first (fast)
	for i, entry in ipairs(leaderboardCache) do
		if entry.userId == userId then
			return {
				rank = i,
				timeMs = entry.timeMs
			}
		end
	end

	-- If not in cache, query OrderedDataStore directly
	local success, timeMs = pcall(function()
		return orderedStore:GetAsync(tostring(userId))
	end)

	if success and timeMs then
		-- Player has a time but not in top cached entries
		return {
			rank = nil, -- Rank unknown (outside cached range)
			timeMs = timeMs
		}
	end

	return nil -- Player not ranked
end

-- Refresh the leaderboard cache from OrderedDataStore
function RankingService.RefreshCache()
	if not isInitialized then
		warn("[RankingService] Cannot refresh cache - not initialized")
		return
	end

	local success, result = pcall(function()
		-- Get top entries in ascending order (fastest times first)
		local pages = orderedStore:GetSortedAsync(
			true, -- ascending = true (lowest/fastest times first)
			RankingConstants.LEADERBOARD_SIZE
		)

		local newCache = {}
		local rank = 1

		-- Iterate through pages
		while true do
			local entries = pages:GetCurrentPage()

			for _, entry in ipairs(entries) do
				table.insert(newCache, {
					userId = tonumber(entry.key),
					timeMs = entry.value,
					rank = rank
				})
				rank = rank + 1
			end

			if pages.IsFinished then
				break
			end

			pages:AdvanceToNextPageAsync()
		end

		return newCache
	end)

	if success then
		leaderboardCache = result
		lastCacheUpdate = tick()
		print(string.format("[RankingService] ✅ Cache refreshed: %d entries loaded", #leaderboardCache))
	else
		warn("[RankingService] ❌ Cache refresh failed: " .. tostring(result))
	end
end

-- Get cache status (for debugging)
function RankingService.GetCacheStatus()
	return {
		isInitialized = isInitialized,
		entryCount = #leaderboardCache,
		lastUpdate = lastCacheUpdate,
		secondsSinceUpdate = tick() - lastCacheUpdate
	}
end

return RankingService
