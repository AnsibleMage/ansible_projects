-- ShopService.lua
-- In-Game Shop System with Coin Economy
-- Forest Sprint Premium - Ansible Logic Jump

local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Import constants
local ShopConstants = require(script.Parent.Parent.Parent.shared.Constants.ShopConstants)

local ShopService = {}

-- Private state
local shopStore = nil
local isInitialized = false
local playerData = {}        -- { [userId] = { coins, purchases, equipped, ... } }
local lastSaveTime = {}       -- { [userId] = tick() } for debounce

-- Initialize default player data structure
local function createDefaultData()
	return {
		coins = 0,
		totalCoinsEarned = 0,
		purchases = {},       -- {[itemId] = true} or {[itemId] = quantity} for consumables
		equipped = {trail = nil, skin = nil, platformTheme = nil, powerup = nil},
		lastUpdated = os.time()
	}
end

-- Get category key for equipped table
local function getCategoryKey(category)
	if category == "Trails" then return "trail"
	elseif category == "Skins" then return "skin"
	elseif category == "PlatformThemes" then return "platformTheme"
	elseif category == "PowerUps" then return "powerup"
	end
	return nil
end

-- Push data update to client
local function pushDataToClient(userId)
	local remoteFolder = ReplicatedStorage:FindFirstChild("ShopRemotes")
	if not remoteFolder then return end

	local updateRemote = remoteFolder:FindFirstChild(ShopConstants.REMOTES.SHOP_DATA_UPDATE)
	if not updateRemote then return end

	local player = Players:GetPlayerByUserId(userId)
	if player and playerData[userId] then
		updateRemote:FireClient(player, playerData[userId])
	end
end

-- Initialize the shop service
function ShopService.Init()
	if isInitialized then
		warn("[ShopService] Already initialized")
		return
	end

	-- Get DataStore handle
	local success, result = pcall(function()
		return DataStoreService:GetDataStore(ShopConstants.DATASTORE_NAME)
	end)

	if success then
		shopStore = result
		isInitialized = true
		print("[ShopService] ✅ Initialized with store: " .. ShopConstants.DATASTORE_NAME)
	else
		warn("[ShopService] ❌ Failed to initialize DataStore: " .. tostring(result))
		return
	end

	-- Setup Remote connections
	local remoteFolder = ReplicatedStorage:FindFirstChild("ShopRemotes")
	if not remoteFolder then
		remoteFolder = Instance.new("Folder")
		remoteFolder.Name = "ShopRemotes"
		remoteFolder.Parent = ReplicatedStorage
	end

	-- GetShopData RemoteFunction
	local getDataRemote = remoteFolder:FindFirstChild(ShopConstants.REMOTES.GET_SHOP_DATA)
	if not getDataRemote then
		getDataRemote = Instance.new("RemoteFunction")
		getDataRemote.Name = ShopConstants.REMOTES.GET_SHOP_DATA
		getDataRemote.Parent = remoteFolder
	end
	getDataRemote.OnServerInvoke = function(player)
		return ShopService.GetPlayerData(player.UserId)
	end

	-- PurchaseItem RemoteFunction
	local purchaseRemote = remoteFolder:FindFirstChild(ShopConstants.REMOTES.PURCHASE_ITEM)
	if not purchaseRemote then
		purchaseRemote = Instance.new("RemoteFunction")
		purchaseRemote.Name = ShopConstants.REMOTES.PURCHASE_ITEM
		purchaseRemote.Parent = remoteFolder
	end
	purchaseRemote.OnServerInvoke = function(player, itemId)
		return ShopService.PurchaseItem(player.UserId, itemId)
	end

	-- EquipItem RemoteEvent
	local equipRemote = remoteFolder:FindFirstChild(ShopConstants.REMOTES.EQUIP_ITEM)
	if not equipRemote then
		equipRemote = Instance.new("RemoteEvent")
		equipRemote.Name = ShopConstants.REMOTES.EQUIP_ITEM
		equipRemote.Parent = remoteFolder
	end
	equipRemote.OnServerEvent:Connect(function(player, itemId)
		ShopService.EquipItem(player.UserId, itemId)
	end)

	-- ShopDataUpdate RemoteEvent (server → client)
	local updateRemote = remoteFolder:FindFirstChild(ShopConstants.REMOTES.SHOP_DATA_UPDATE)
	if not updateRemote then
		updateRemote = Instance.new("RemoteEvent")
		updateRemote.Name = ShopConstants.REMOTES.SHOP_DATA_UPDATE
		updateRemote.Parent = remoteFolder
	end

	-- Bind player events
	Players.PlayerAdded:Connect(function(player)
		ShopService.LoadPlayerData(player.UserId)
	end)

	Players.PlayerRemoving:Connect(function(player)
		ShopService.SavePlayerData(player.UserId)
		playerData[player.UserId] = nil
		lastSaveTime[player.UserId] = nil
	end)

	-- Load data for players already in game
	for _, player in pairs(Players:GetPlayers()) do
		spawn(function()
			ShopService.LoadPlayerData(player.UserId)
		end)
	end

	print("[ShopService] ✅ Remote events configured")
end

-- Calculate coins earned from race completion
-- Formula: floor(BASE_REWARD * (REFERENCE_TIME / finishTime))
-- Clamped to [MIN_COINS, MAX_COINS], checkpoint mode applies multiplier
function ShopService.CalculateCoins(finishTime, isCheckpointMode)
	local raw = math.floor(ShopConstants.BASE_REWARD * (ShopConstants.REFERENCE_TIME / finishTime))

	-- Apply checkpoint multiplier
	if isCheckpointMode then
		raw = math.floor(raw * ShopConstants.CHECKPOINT_MULTIPLIER)
	end

	-- Clamp to min/max range
	local coins = math.clamp(raw, ShopConstants.MIN_COINS, ShopConstants.MAX_COINS)

	return coins
end

-- Award coins to a player
function ShopService.AwardCoins(userId, amount)
	if not playerData[userId] then
		playerData[userId] = createDefaultData()
	end

	playerData[userId].coins = playerData[userId].coins + amount
	playerData[userId].totalCoinsEarned = playerData[userId].totalCoinsEarned + amount
	playerData[userId].lastUpdated = os.time()

	print(string.format("[ShopService] ✅ Awarded %d coins to UserId %d (total: %d)",
		amount, userId, playerData[userId].coins))

	-- Push update to client
	pushDataToClient(userId)

	-- Auto-save
	spawn(function()
		ShopService.SavePlayerData(userId)
	end)
end

-- Get player shop data
function ShopService.GetPlayerData(userId)
	if not playerData[userId] then
		playerData[userId] = createDefaultData()
	end
	return playerData[userId]
end

-- Purchase an item
-- Returns: success (boolean), message (string)
function ShopService.PurchaseItem(userId, itemId)
	-- Validate item exists
	local item = ShopConstants.ITEM_BY_ID[itemId]
	if not item then
		warn(string.format("[ShopService] ❌ Invalid item ID: %s", tostring(itemId)))
		return false, "Item not found"
	end

	-- Get player data
	if not playerData[userId] then
		playerData[userId] = createDefaultData()
	end
	local data = playerData[userId]

	-- Check for duplicate non-consumable purchase
	if not item.consumable and data.purchases[itemId] then
		warn(string.format("[ShopService] ❌ UserId %d already owns %s", userId, itemId))
		return false, "Already owned"
	end

	-- Check sufficient coins
	if data.coins < item.price then
		warn(string.format("[ShopService] ❌ Insufficient coins for UserId %d: has %d, needs %d",
			userId, data.coins, item.price))
		return false, "Insufficient coins"
	end

	-- Deduct coins
	data.coins = data.coins - item.price

	-- Record purchase
	if item.consumable then
		data.purchases[itemId] = (data.purchases[itemId] or 0) + 1
	else
		data.purchases[itemId] = true
	end

	data.lastUpdated = os.time()

	print(string.format("[ShopService] ✅ UserId %d purchased %s for %d coins (remaining: %d)",
		userId, item.name, item.price, data.coins))

	-- Push update to client
	pushDataToClient(userId)

	-- Auto-save
	spawn(function()
		ShopService.SavePlayerData(userId)
	end)

	return true, "Purchase successful"
end

-- Equip an item
function ShopService.EquipItem(userId, itemId)
	-- Validate item exists
	local item = ShopConstants.ITEM_BY_ID[itemId]
	if not item then
		warn(string.format("[ShopService] ❌ Invalid item ID for equip: %s", tostring(itemId)))
		return false
	end

	-- Get player data
	if not playerData[userId] then
		playerData[userId] = createDefaultData()
	end
	local data = playerData[userId]

	-- Check ownership
	if not data.purchases[itemId] then
		warn(string.format("[ShopService] ❌ UserId %d does not own %s", userId, itemId))
		return false
	end

	-- Get category key
	local categoryKey = getCategoryKey(item.category)
	if not categoryKey then
		warn(string.format("[ShopService] ❌ Unknown category: %s", item.category))
		return false
	end

	-- Equip item (replaces previous in same category)
	data.equipped[categoryKey] = itemId
	data.lastUpdated = os.time()

	print(string.format("[ShopService] ✅ UserId %d equipped %s (%s)", userId, item.name, categoryKey))

	-- Push update to client
	pushDataToClient(userId)

	return true
end

-- Save player data to DataStore with debounce
function ShopService.SavePlayerData(userId)
	if not isInitialized or not shopStore then
		warn("[ShopService] Cannot save - not initialized")
		return false
	end

	-- Debounce check
	local now = tick()
	if lastSaveTime[userId] and (now - lastSaveTime[userId]) < ShopConstants.SAVE_DEBOUNCE_SECONDS then
		return false
	end

	local data = playerData[userId]
	if not data then
		return false
	end

	local success, err = pcall(function()
		shopStore:SetAsync(tostring(userId), data)
	end)

	if success then
		lastSaveTime[userId] = now
		print(string.format("[ShopService] ✅ Data saved for UserId %d", userId))
		return true
	else
		warn(string.format("[ShopService] ❌ Save failed for UserId %d: %s", userId, tostring(err)))
		return false
	end
end

-- Load player data from DataStore
function ShopService.LoadPlayerData(userId)
	if not isInitialized or not shopStore then
		warn("[ShopService] Cannot load - not initialized")
		playerData[userId] = createDefaultData()
		return playerData[userId]
	end

	local success, result = pcall(function()
		return shopStore:GetAsync(tostring(userId))
	end)

	if success and result then
		playerData[userId] = result
		print(string.format("[ShopService] ✅ Data loaded for UserId %d (coins: %d)",
			userId, result.coins or 0))
	else
		playerData[userId] = createDefaultData()
		if not success then
			warn(string.format("[ShopService] ❌ Load failed for UserId %d: %s", userId, tostring(result)))
		else
			print(string.format("[ShopService] ✅ New player data created for UserId %d", userId))
		end
	end

	return playerData[userId]
end

return ShopService
