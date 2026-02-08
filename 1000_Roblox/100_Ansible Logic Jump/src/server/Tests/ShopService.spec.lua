-- ShopService.spec.lua
-- TDD Test Suite for In-Game Shop System
-- Ansible Logic Jump - Forest Sprint Premium
-- Tests MUST be written BEFORE implementation

local ShopService = require(script.Parent.Parent.Services.ShopService)
local ShopConstants = require(script.Parent.Parent.Parent.shared.Constants.ShopConstants)

local Tests = {}

-- Mock player object for testing
local function createMockPlayer(userId, name)
	return {
		UserId = userId,
		Name = name or "TestPlayer",
		Character = {
			HumanoidRootPart = {
				Position = Vector3.new(0, 0, 0)
			}
		}
	}
end

-- Utility: Assert helpers
local function assertEquals(actual, expected, message)
	assert(actual == expected, string.format("%s\nExpected: %s, Got: %s",
		message or "Assertion failed", tostring(expected), tostring(actual)))
end

local function assertNotNil(value, message)
	assert(value ~= nil, message or "Value should not be nil")
end

local function assertTrue(condition, message)
	assert(condition == true, message or "Condition should be true")
end

local function assertFalse(condition, message)
	assert(condition == false, message or "Condition should be false")
end

-- ═══════════════════════════════════════════════════════════
-- INITIALIZATION TESTS
-- ═══════════════════════════════════════════════════════════

function Tests.T_INIT_001_ServiceInitializesSuccessfully()
	-- Arrange & Act
	local success = pcall(function()
		ShopService.Init()
	end)

	-- Assert
	assertTrue(success, "ShopService.Init should succeed without errors")
	print("✅ T_INIT_001 PASSED: Service initialized successfully")
end

function Tests.T_INIT_002_DoubleInitDoesNotError()
	-- Arrange: Already initialized from previous test
	-- Act
	local success = pcall(function()
		ShopService.Init()
	end)

	-- Assert
	assertTrue(success, "Double Init should not throw an error")
	print("✅ T_INIT_002 PASSED: Double initialization handled gracefully")
end

-- ═══════════════════════════════════════════════════════════
-- COIN CALCULATION TESTS
-- ═══════════════════════════════════════════════════════════

function Tests.T_COIN_001_BaseCalculation_60Seconds()
	-- Arrange: 60 second finish time
	-- Formula: floor(10 * (60 / 60)) = 10
	-- Act
	local coins = ShopService.CalculateCoins(60, false)

	-- Assert
	assertEquals(coins, 10, "60 seconds should yield 10 coins")
	print("✅ T_COIN_001 PASSED: 60s finish = 10 coins")
end

function Tests.T_COIN_002_FastFinish_30Seconds()
	-- Arrange: 30 second finish time
	-- Formula: floor(10 * (60 / 30)) = 20
	-- Act
	local coins = ShopService.CalculateCoins(30, false)

	-- Assert
	assertEquals(coins, 20, "30 seconds should yield 20 coins")
	print("✅ T_COIN_002 PASSED: 30s finish = 20 coins")
end

function Tests.T_COIN_003_VeryFastFinish_ClampToMax100()
	-- Arrange: 3 second finish time
	-- Formula: floor(10 * (60 / 3)) = 200 → clamped to 100
	-- Act
	local coins = ShopService.CalculateCoins(3, false)

	-- Assert
	assertEquals(coins, 100, "Very fast time should be clamped to 100")
	print("✅ T_COIN_003 PASSED: Very fast finish clamped to MAX_COINS=100")
end

function Tests.T_COIN_004_SlowFinish_ClampToMin5()
	-- Arrange: 300 second finish time
	-- Formula: floor(10 * (60 / 300)) = 2 → clamped to 5
	-- Act
	local coins = ShopService.CalculateCoins(300, false)

	-- Assert
	assertEquals(coins, 5, "Very slow time should be clamped to 5")
	print("✅ T_COIN_004 PASSED: Slow finish clamped to MIN_COINS=5")
end

function Tests.T_COIN_005_CheckpointMode_HalfReward()
	-- Arrange: 60 second finish in checkpoint mode
	-- Formula: floor(10 * (60 / 60)) * 0.5 = 5
	-- Act
	local coins = ShopService.CalculateCoins(60, true)

	-- Assert
	assertEquals(coins, 5, "Checkpoint mode should give half coins")
	print("✅ T_COIN_005 PASSED: Checkpoint mode applies 0.5 multiplier")
end

function Tests.T_COIN_006_CheckpointMode_FastFinish()
	-- Arrange: 30 second finish in checkpoint mode
	-- Formula: floor(10 * (60 / 30)) * 0.5 = 10
	-- Act
	local coins = ShopService.CalculateCoins(30, true)

	-- Assert
	assertEquals(coins, 10, "Checkpoint mode fast finish should give 10 coins")
	print("✅ T_COIN_006 PASSED: Checkpoint fast finish = 10 coins")
end

-- ═══════════════════════════════════════════════════════════
-- PURCHASE TESTS
-- ═══════════════════════════════════════════════════════════

function Tests.T_PURCH_001_SufficientCoins_PurchaseSucceeds()
	-- Arrange
	local player = createMockPlayer(10001, "Buyer1")
	ShopService.Init()
	-- Give player enough coins
	ShopService.AwardCoins(player.UserId, 200)

	-- Act: Purchase a 50-coin item
	local success, message = ShopService.PurchaseItem(player.UserId, "trail_forest_sparkle")

	-- Assert
	assertTrue(success, "Purchase should succeed with sufficient coins")
	local data = ShopService.GetPlayerData(player.UserId)
	assertEquals(data.coins, 150, "Coins should be deducted after purchase")
	assertTrue(data.purchases["trail_forest_sparkle"] == true, "Item should be recorded in purchases")
	print("✅ T_PURCH_001 PASSED: Purchase succeeds with sufficient coins")
end

function Tests.T_PURCH_002_InsufficientCoins_PurchaseFails()
	-- Arrange
	local player = createMockPlayer(10002, "Buyer2")
	ShopService.Init()
	-- Player has 0 coins by default

	-- Act: Try to purchase a 50-coin item
	local success, message = ShopService.PurchaseItem(player.UserId, "trail_forest_sparkle")

	-- Assert
	assertFalse(success, "Purchase should fail with insufficient coins")
	print("✅ T_PURCH_002 PASSED: Purchase fails with insufficient coins")
end

function Tests.T_PURCH_003_DuplicatePurchase_NonConsumable()
	-- Arrange
	local player = createMockPlayer(10003, "Buyer3")
	ShopService.Init()
	ShopService.AwardCoins(player.UserId, 500)
	ShopService.PurchaseItem(player.UserId, "trail_forest_sparkle")

	-- Act: Try to buy same non-consumable item again
	local success, message = ShopService.PurchaseItem(player.UserId, "trail_forest_sparkle")

	-- Assert
	assertFalse(success, "Duplicate non-consumable purchase should fail")
	print("✅ T_PURCH_003 PASSED: Duplicate non-consumable purchase rejected")
end

function Tests.T_PURCH_004_InvalidItemId_PurchaseFails()
	-- Arrange
	local player = createMockPlayer(10004, "Buyer4")
	ShopService.Init()
	ShopService.AwardCoins(player.UserId, 500)

	-- Act: Try to purchase non-existent item
	local success, message = ShopService.PurchaseItem(player.UserId, "invalid_item_id")

	-- Assert
	assertFalse(success, "Purchase of invalid item should fail")
	print("✅ T_PURCH_004 PASSED: Invalid item ID purchase rejected")
end

-- ═══════════════════════════════════════════════════════════
-- EQUIP TESTS
-- ═══════════════════════════════════════════════════════════

function Tests.T_EQUIP_001_EquipPurchasedItem()
	-- Arrange
	local player = createMockPlayer(20001, "Equipper1")
	ShopService.Init()
	ShopService.AwardCoins(player.UserId, 200)
	ShopService.PurchaseItem(player.UserId, "trail_forest_sparkle")

	-- Act: Equip the purchased trail
	local success = ShopService.EquipItem(player.UserId, "trail_forest_sparkle")

	-- Assert
	assertTrue(success, "Equipping purchased item should succeed")
	local data = ShopService.GetPlayerData(player.UserId)
	assertEquals(data.equipped.trail, "trail_forest_sparkle", "Trail should be equipped")
	print("✅ T_EQUIP_001 PASSED: Purchased item equipped successfully")
end

function Tests.T_EQUIP_002_SwitchEquippedItem()
	-- Arrange
	local player = createMockPlayer(20002, "Equipper2")
	ShopService.Init()
	ShopService.AwardCoins(player.UserId, 500)
	ShopService.PurchaseItem(player.UserId, "trail_forest_sparkle")
	ShopService.PurchaseItem(player.UserId, "trail_golden_leaves")
	ShopService.EquipItem(player.UserId, "trail_forest_sparkle")

	-- Act: Switch to different trail
	local success = ShopService.EquipItem(player.UserId, "trail_golden_leaves")

	-- Assert
	assertTrue(success, "Switching equipped item should succeed")
	local data = ShopService.GetPlayerData(player.UserId)
	assertEquals(data.equipped.trail, "trail_golden_leaves", "Equipped trail should switch")
	print("✅ T_EQUIP_002 PASSED: Equipped item switched successfully")
end

function Tests.T_EQUIP_003_EquipUnpurchasedItem_Fails()
	-- Arrange
	local player = createMockPlayer(20003, "Equipper3")
	ShopService.Init()

	-- Act: Try to equip item not purchased
	local success = ShopService.EquipItem(player.UserId, "trail_forest_sparkle")

	-- Assert
	assertFalse(success, "Equipping unpurchased item should fail")
	print("✅ T_EQUIP_003 PASSED: Equipping unpurchased item rejected")
end

-- ═══════════════════════════════════════════════════════════
-- CONSUMABLE TESTS
-- ═══════════════════════════════════════════════════════════

function Tests.T_CONS_001_PurchaseConsumable_QuantityTracked()
	-- Arrange
	local player = createMockPlayer(30001, "Consumer1")
	ShopService.Init()
	ShopService.AwardCoins(player.UserId, 200)

	-- Act: Purchase consumable item
	local success = ShopService.PurchaseItem(player.UserId, "powerup_speed_boost")

	-- Assert
	assertTrue(success, "Consumable purchase should succeed")
	local data = ShopService.GetPlayerData(player.UserId)
	assertEquals(data.purchases["powerup_speed_boost"], 1, "Consumable quantity should be 1")
	print("✅ T_CONS_001 PASSED: Consumable purchase tracks quantity")
end

function Tests.T_CONS_002_MultiplePurchase_QuantityIncreases()
	-- Arrange
	local player = createMockPlayer(30002, "Consumer2")
	ShopService.Init()
	ShopService.AwardCoins(player.UserId, 200)

	-- Act: Purchase same consumable twice
	ShopService.PurchaseItem(player.UserId, "powerup_speed_boost")
	ShopService.PurchaseItem(player.UserId, "powerup_speed_boost")

	-- Assert
	local data = ShopService.GetPlayerData(player.UserId)
	assertEquals(data.purchases["powerup_speed_boost"], 2, "Consumable quantity should be 2")
	print("✅ T_CONS_002 PASSED: Multiple consumable purchases stack quantity")
end

-- ═══════════════════════════════════════════════════════════
-- DATASTORE TESTS
-- ═══════════════════════════════════════════════════════════

function Tests.T_DATA_001_SavePlayerData()
	-- Arrange
	local player = createMockPlayer(40001, "Saver1")
	ShopService.Init()
	ShopService.AwardCoins(player.UserId, 100)

	-- Act: Save to DataStore
	local success = ShopService.SavePlayerData(player.UserId)

	-- Assert
	assertTrue(success, "DataStore save should succeed")
	print("✅ T_DATA_001 PASSED: Player data saved to DataStore")
end

function Tests.T_DATA_002_SaveDebounce_6Seconds()
	-- Arrange
	local player = createMockPlayer(40002, "Saver2")
	ShopService.Init()
	ShopService.AwardCoins(player.UserId, 100)

	-- Act: Save twice rapidly
	local save1 = ShopService.SavePlayerData(player.UserId)
	local save2 = ShopService.SavePlayerData(player.UserId)

	-- Assert
	assertTrue(save1, "First save should succeed")
	assertFalse(save2, "Second save within 6 seconds should be debounced")
	print("✅ T_DATA_002 PASSED: DataStore debounce enforced (6s minimum)")
end

function Tests.T_DATA_003_LoadPlayerData()
	-- Arrange
	local player = createMockPlayer(40003, "Loader1")
	ShopService.Init()

	-- Act: Load player data (should initialize if nil)
	local data = ShopService.LoadPlayerData(player.UserId)

	-- Assert
	assertNotNil(data, "Loaded data should not be nil")
	assertEquals(data.coins, 0, "New player should start with 0 coins")
	assertNotNil(data.purchases, "Purchases table should exist")
	assertNotNil(data.equipped, "Equipped table should exist")
	print("✅ T_DATA_003 PASSED: Player data loaded/initialized correctly")
end

-- ═══════════════════════════════════════════════════════════
-- TEST RUNNER
-- ═══════════════════════════════════════════════════════════

function Tests.RunAll()
	print("\n═══════════════════════════════════════════════════")
	print("🧪 SHOP SERVICE TDD TEST SUITE")
	print("═══════════════════════════════════════════════════\n")

	local testFunctions = {
		-- Initialization
		"T_INIT_001_ServiceInitializesSuccessfully",
		"T_INIT_002_DoubleInitDoesNotError",
		-- Coin Calculation
		"T_COIN_001_BaseCalculation_60Seconds",
		"T_COIN_002_FastFinish_30Seconds",
		"T_COIN_003_VeryFastFinish_ClampToMax100",
		"T_COIN_004_SlowFinish_ClampToMin5",
		"T_COIN_005_CheckpointMode_HalfReward",
		"T_COIN_006_CheckpointMode_FastFinish",
		-- Purchase
		"T_PURCH_001_SufficientCoins_PurchaseSucceeds",
		"T_PURCH_002_InsufficientCoins_PurchaseFails",
		"T_PURCH_003_DuplicatePurchase_NonConsumable",
		"T_PURCH_004_InvalidItemId_PurchaseFails",
		-- Equip
		"T_EQUIP_001_EquipPurchasedItem",
		"T_EQUIP_002_SwitchEquippedItem",
		"T_EQUIP_003_EquipUnpurchasedItem_Fails",
		-- Consumable
		"T_CONS_001_PurchaseConsumable_QuantityTracked",
		"T_CONS_002_MultiplePurchase_QuantityIncreases",
		-- DataStore
		"T_DATA_001_SavePlayerData",
		"T_DATA_002_SaveDebounce_6Seconds",
		"T_DATA_003_LoadPlayerData",
	}

	local passed = 0
	local failed = 0
	local failures = {}

	for _, testName in ipairs(testFunctions) do
		local success, err = pcall(function()
			Tests[testName]()
		end)

		if success then
			passed = passed + 1
		else
			failed = failed + 1
			table.insert(failures, {
				name = testName,
				error = err
			})
			print("❌ " .. testName .. " FAILED: " .. tostring(err))
		end
	end

	print("\n═══════════════════════════════════════════════════")
	print(string.format("📊 TEST RESULTS: %d passed, %d failed", passed, failed))
	print("═══════════════════════════════════════════════════")

	if #failures > 0 then
		print("\n❌ FAILURES:")
		for _, failure in ipairs(failures) do
			print(string.format("  - %s: %s", failure.name, failure.error))
		end
	else
		print("\n🎉 ALL TESTS PASSED!")
	end

	return passed, failed
end

return Tests
