-- ShopConstants.lua
-- Constants for In-Game Shop System
-- Forest Sprint Premium - Ansible Logic Jump

local ShopConstants = {
	-- DataStore identifier
	DATASTORE_NAME = "ForestSprintShop_v1",

	-- Coin reward system
	BASE_REWARD = 10,
	REFERENCE_TIME = 60,  -- seconds
	MIN_COINS = 5,
	MAX_COINS = 100,
	CHECKPOINT_MULTIPLIER = 0.5,

	-- DataStore settings
	SAVE_DEBOUNCE_SECONDS = 6,

	-- Remote names (ReplicatedStorage)
	REMOTES = {
		GET_SHOP_DATA = "GetShopData",       -- RemoteFunction
		PURCHASE_ITEM = "PurchaseItem",       -- RemoteFunction
		EQUIP_ITEM = "EquipItem",             -- RemoteEvent
		SHOP_DATA_UPDATE = "ShopDataUpdate",  -- RemoteEvent
	},

	-- Item rarities
	RARITY = {
		COMMON = "Common",
		RARE = "Rare",
		EPIC = "Epic",
		LEGENDARY = "Legendary",
	},

	-- Item categories
	CATEGORIES = {"Trails", "Skins", "PlatformThemes", "PowerUps"},

	-- Item catalog
	ITEMS = {
		-- Trails
		{id = "trail_forest_sparkle", name = "Forest Sparkle", category = "Trails", price = 50, rarity = "Common", description = "Sparkling green particles follow your path"},
		{id = "trail_golden_leaves", name = "Golden Leaves", category = "Trails", price = 150, rarity = "Rare", description = "Autumn leaves trail behind you"},
		{id = "trail_neon_dash", name = "Neon Dash", category = "Trails", price = 300, rarity = "Epic", description = "Blazing neon light trail"},

		-- Skins
		{id = "skin_forest_ranger", name = "Forest Ranger", category = "Skins", price = 100, rarity = "Common", description = "Camouflage woodland outfit"},
		{id = "skin_bark_armor", name = "Bark Armor", category = "Skins", price = 250, rarity = "Rare", description = "Ancient tree bark protective gear"},
		{id = "skin_neon_ghost", name = "Neon Ghost", category = "Skins", price = 500, rarity = "Legendary", description = "Ethereal glowing phantom form"},

		-- Platform Themes
		{id = "theme_mossy_stone", name = "Mossy Stone", category = "PlatformThemes", price = 200, rarity = "Rare", description = "Platforms become mossy stone blocks"},
		{id = "theme_crystal_clear", name = "Crystal Clear", category = "PlatformThemes", price = 400, rarity = "Epic", description = "Transparent crystal platforms"},

		-- PowerUps (consumable)
		{id = "powerup_speed_boost", name = "Speed Boost", category = "PowerUps", price = 30, rarity = "Common", description = "15% speed increase for one race", consumable = true},
		{id = "powerup_double_jump", name = "Double Jump", category = "PowerUps", price = 50, rarity = "Rare", description = "Extra jump ability for one race", consumable = true},
	},
}

-- Build lookup table for quick access
ShopConstants.ITEM_BY_ID = {}
for _, item in ipairs(ShopConstants.ITEMS) do
	ShopConstants.ITEM_BY_ID[item.id] = item
end

return ShopConstants
