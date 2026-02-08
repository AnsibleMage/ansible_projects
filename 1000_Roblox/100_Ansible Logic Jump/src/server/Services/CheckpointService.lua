-- CheckpointService.lua
-- Checkpoint Save System for Ansible Logic Jump
-- Forest Sprint Premium - Sequential checkpoint activation with DataStore persistence

local DataStoreService = game:GetService("DataStoreService")

local CheckpointService = {}

-- ═══════════════════════════════════════════════════════════
-- CONSTANTS
-- ═══════════════════════════════════════════════════════════

local CHECKPOINT_DATASTORE = "CheckpointStore"
local DEBOUNCE_SECONDS = 6
local RESPAWN_Y_OFFSET = 3
local INVINCIBILITY_DURATION = 1.5

-- Checkpoint platform mapping (platform number → checkpoint ID)
local CHECKPOINT_PLATFORMS = {
	[5] = 1,   -- Platform 5 → CP-1
	[10] = 2,  -- Platform 10 → CP-2
	[15] = 3,  -- Platform 15 → CP-3
	[20] = 4   -- Platform 20 → CP-4
}

-- ═══════════════════════════════════════════════════════════
-- PRIVATE STATE
-- ═══════════════════════════════════════════════════════════

local checkpointStore = nil
local platformPositions = {}
local isInitialized = false

-- Player session data
-- [userId] = {
--     mode: "checkpoint" | "nocheckpoint"
--     highestCheckpoint: number (0-4)
--     activatedCheckpoints: {[cpId] = true}
--     lastSaveTime: number (tick)
--     invincibleUntil: number (tick)
-- }
local playerData = {}

-- ═══════════════════════════════════════════════════════════
-- INITIALIZATION
-- ═══════════════════════════════════════════════════════════

function CheckpointService.Init(platforms)
	if isInitialized then
		warn("[CheckpointService] Already initialized")
		return true
	end

	if not platforms then
		warn("[CheckpointService] Platforms parameter is required")
		return false
	end

	-- Store platform positions
	platformPositions = platforms

	-- Get DataStore handle
	local success, result = pcall(function()
		return DataStoreService:GetDataStore(CHECKPOINT_DATASTORE)
	end)

	if success then
		checkpointStore = result
		isInitialized = true
		print("[CheckpointService] ✅ Initialized with store: " .. CHECKPOINT_DATASTORE)
		return true
	else
		warn("[CheckpointService] ❌ Failed to get DataStore: " .. tostring(result))
		return false
	end
end

-- ═══════════════════════════════════════════════════════════
-- PLAYER DATA MANAGEMENT
-- ═══════════════════════════════════════════════════════════

-- Get or create player data entry
local function getPlayerData(player)
	local userId = player.UserId

	if not playerData[userId] then
		playerData[userId] = {
			mode = "nocheckpoint", -- Default mode (backward compatible)
			highestCheckpoint = 0,
			activatedCheckpoints = {},
			lastSaveTime = 0,
			invincibleUntil = 0
		}
	end

	return playerData[userId]
end

-- Clear player data (on leave)
local function clearPlayerData(player)
	playerData[player.UserId] = nil
end

-- ═══════════════════════════════════════════════════════════
-- CHECKPOINT ACTIVATION
-- ═══════════════════════════════════════════════════════════

-- Activate a checkpoint (sequential rule enforced)
-- @param player: Player instance
-- @param checkpointId: number (1-4)
-- @return boolean - True if activated successfully
function CheckpointService.ActivateCheckpoint(player, checkpointId)
	if not isInitialized then
		warn("[CheckpointService] Not initialized")
		return false
	end

	local data = getPlayerData(player)

	-- Only activate in checkpoint mode
	if data.mode ~= "checkpoint" then
		return false
	end

	-- Validate checkpoint ID
	if type(checkpointId) ~= "number" or checkpointId < 1 or checkpointId > 4 then
		warn("[CheckpointService] Invalid checkpoint ID: " .. tostring(checkpointId))
		return false
	end

	-- Sequential rule: Must have previous checkpoint (except CP-1)
	if checkpointId > 1 then
		local previousId = checkpointId - 1
		if not data.activatedCheckpoints[previousId] then
			print(string.format("[CheckpointService] %s tried to activate CP-%d without CP-%d (sequential rule violation)",
				player.Name, checkpointId, previousId))
			return false
		end
	end

	-- Check if already activated (idempotent)
	if data.activatedCheckpoints[checkpointId] then
		print(string.format("[CheckpointService] %s re-landed on already activated CP-%d",
			player.Name, checkpointId))
		return true -- Not an error, just no-op
	end

	-- Activate checkpoint
	data.activatedCheckpoints[checkpointId] = true
	data.highestCheckpoint = math.max(data.highestCheckpoint, checkpointId)

	print(string.format("[CheckpointService] ✅ %s activated CP-%d (highest: %d)",
		player.Name, checkpointId, data.highestCheckpoint))

	-- Auto-save to DataStore (with debounce)
	CheckpointService.SaveToDataStore(player)

	return true
end

-- ═══════════════════════════════════════════════════════════
-- RESPAWN SYSTEM
-- ═══════════════════════════════════════════════════════════

-- Get respawn position for a player
-- @param player: Player instance
-- @return Vector3 - Respawn position (checkpoint Y + 3 studs)
function CheckpointService.GetRespawnPosition(player)
	local data = getPlayerData(player)

	-- Get highest checkpoint platform key
	local platformKey = "CP" .. data.highestCheckpoint

	if not platformPositions[platformKey] then
		warn("[CheckpointService] Platform not found for key: " .. platformKey)
		platformKey = "CP0" -- Fallback to start
	end

	local platform = platformPositions[platformKey]
	if not platform or not platform.Position then
		warn("[CheckpointService] Invalid platform data for: " .. platformKey)
		return Vector3.new(0, 5, 0) -- Emergency fallback
	end

	-- Calculate respawn position (Y + 3 studs)
	local respawnPos = Vector3.new(
		platform.Position.X,
		platform.Position.Y + RESPAWN_Y_OFFSET,
		platform.Position.Z
	)

	print(string.format("[CheckpointService] Respawn position for %s at CP-%d: %s",
		player.Name, data.highestCheckpoint, tostring(respawnPos)))

	return respawnPos
end

-- ═══════════════════════════════════════════════════════════
-- MODE SYSTEM
-- ═══════════════════════════════════════════════════════════

-- Set game mode for a player
-- @param player: Player instance
-- @param mode: "checkpoint" | "nocheckpoint"
function CheckpointService.SetMode(player, mode)
	if mode ~= "checkpoint" and mode ~= "nocheckpoint" then
		warn("[CheckpointService] Invalid mode: " .. tostring(mode))
		return
	end

	local data = getPlayerData(player)
	data.mode = mode

	print(string.format("[CheckpointService] %s mode set to: %s", player.Name, mode))
end

-- Get current game mode for a player
-- @param player: Player instance
-- @return string - "checkpoint" | "nocheckpoint"
function CheckpointService.GetMode(player)
	local data = getPlayerData(player)
	return data.mode
end

-- ═══════════════════════════════════════════════════════════
-- DATASTORE PERSISTENCE
-- ═══════════════════════════════════════════════════════════

-- Save checkpoint progress to DataStore
-- @param player: Player instance
-- @return boolean - True if saved successfully
function CheckpointService.SaveToDataStore(player)
	if not isInitialized then
		warn("[CheckpointService] Cannot save - not initialized")
		return false
	end

	local data = getPlayerData(player)
	local currentTime = tick()

	-- Debounce check (6 second minimum)
	if currentTime - data.lastSaveTime < DEBOUNCE_SECONDS then
		print(string.format("[CheckpointService] Save debounced for %s (%.1fs remaining)",
			player.Name, DEBOUNCE_SECONDS - (currentTime - data.lastSaveTime)))
		return false
	end

	-- Prepare save data
	local saveData = {
		highestCheckpoint = data.highestCheckpoint,
		activatedCheckpoints = data.activatedCheckpoints,
		lastUpdated = os.time()
	}

	-- Save to DataStore
	local success, err = pcall(function()
		local key = "CP_" .. player.UserId
		checkpointStore:SetAsync(key, saveData)
	end)

	if success then
		data.lastSaveTime = currentTime
		print(string.format("[CheckpointService] ✅ Saved checkpoint data for %s (highest: CP-%d)",
			player.Name, data.highestCheckpoint))
		return true
	else
		warn("[CheckpointService] ❌ Failed to save for " .. player.Name .. ": " .. tostring(err))
		return false
	end
end

-- Load checkpoint progress from DataStore
-- @param player: Player instance
-- @return boolean - True if loaded successfully
function CheckpointService.LoadFromDataStore(player)
	if not isInitialized then
		warn("[CheckpointService] Cannot load - not initialized")
		return false
	end

	local data = getPlayerData(player)

	local success, result = pcall(function()
		local key = "CP_" .. player.UserId
		return checkpointStore:GetAsync(key)
	end)

	if success and result then
		-- Restore saved data
		data.highestCheckpoint = result.highestCheckpoint or 0
		data.activatedCheckpoints = result.activatedCheckpoints or {}

		print(string.format("[CheckpointService] ✅ Loaded checkpoint data for %s (highest: CP-%d)",
			player.Name, data.highestCheckpoint))
		return true
	elseif success then
		print("[CheckpointService] No saved data found for " .. player.Name)
		return false
	else
		warn("[CheckpointService] ❌ Failed to load for " .. player.Name .. ": " .. tostring(result))
		return false
	end
end

-- ═══════════════════════════════════════════════════════════
-- INVINCIBILITY SYSTEM
-- ═══════════════════════════════════════════════════════════

-- Check if player is currently invincible (post-respawn)
-- @param player: Player instance
-- @return boolean - True if invincible
function CheckpointService.IsInvincible(player)
	local data = getPlayerData(player)
	return tick() < data.invincibleUntil
end

-- Grant invincibility after respawn
-- @param player: Player instance
function CheckpointService.GrantRespawnInvincibility(player)
	local data = getPlayerData(player)
	data.invincibleUntil = tick() + INVINCIBILITY_DURATION

	print(string.format("[CheckpointService] %s granted %.1fs invincibility",
		player.Name, INVINCIBILITY_DURATION))
end

-- ═══════════════════════════════════════════════════════════
-- GETTERS
-- ═══════════════════════════════════════════════════════════

-- Get highest checkpoint reached by player
-- @param player: Player instance
-- @return number - Highest checkpoint ID (0-4)
function CheckpointService.GetHighestCheckpoint(player)
	local data = getPlayerData(player)
	return data.highestCheckpoint
end

-- ═══════════════════════════════════════════════════════════
-- CLEANUP
-- ═══════════════════════════════════════════════════════════

-- Clear player data on leave
game:GetService("Players").PlayerRemoving:Connect(function(player)
	-- Auto-save before clearing
	if isInitialized then
		CheckpointService.SaveToDataStore(player)
	end
	clearPlayerData(player)
end)

return CheckpointService
