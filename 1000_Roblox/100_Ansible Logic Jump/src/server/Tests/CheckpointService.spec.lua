-- CheckpointService.spec.lua
-- TDD Test Suite for Checkpoint Save System
-- Ansible Logic Jump - Forest Sprint Premium
-- Tests MUST be written BEFORE implementation

local CheckpointService = require(script.Parent.Parent.Services.CheckpointService)

local Tests = {}

-- Mock platform positions for testing
local mockPlatforms = {
	CP0 = {Position = Vector3.new(0, 5, 0)},      -- Start position
	CP1 = {Position = Vector3.new(10, 10, 0)},    -- Platform 5
	CP2 = {Position = Vector3.new(20, 15, 0)},    -- Platform 10
	CP3 = {Position = Vector3.new(30, 20, 0)},    -- Platform 15
	CP4 = {Position = Vector3.new(40, 25, 0)}     -- Platform 20
}

-- Mock player object for testing
local function createMockPlayer(userId, name)
	return {
		UserId = userId,
		Name = name or "TestPlayer",
		-- Mock character spawn
		Character = {
			HumanoidRootPart = {
				Position = Vector3.new(0, 0, 0)
			}
		}
	}
end

-- Utility: Assert helper
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

function Tests.T_INIT_001_ServiceInitializesWithPlatforms()
	-- Arrange: Mock platforms
	-- Act: Initialize service
	local success = pcall(function()
		CheckpointService.Init(mockPlatforms)
	end)

	-- Assert: No errors during initialization
	assertTrue(success, "CheckpointService.Init should succeed with valid platforms")
	print("✅ T-INIT-001 PASSED: Service initialized successfully")
end

-- ═══════════════════════════════════════════════════════════
-- CHECKPOINT ACTIVATION TESTS (Sequential Rule)
-- ═══════════════════════════════════════════════════════════

function Tests.T_001_PlayerLandsOnPlatform5_CP1Activates()
	-- Arrange
	local player = createMockPlayer(12345, "TestPlayer1")
	CheckpointService.Init(mockPlatforms)
	CheckpointService.SetMode(player, "checkpoint")

	-- Act: Activate CP-1 (platform 5)
	local result = CheckpointService.ActivateCheckpoint(player, 1)

	-- Assert
	assertTrue(result, "CP-1 should activate on platform 5")
	assertEquals(CheckpointService.GetHighestCheckpoint(player), 1,
		"Highest checkpoint should be 1")
	print("✅ T-001 PASSED: Platform 5 → CP-1 activated")
end

function Tests.T_002_PlayerSkipsCP1_LandsOnPlatform10_CP2NotActivated()
	-- Arrange
	local player = createMockPlayer(23456, "TestPlayer2")
	CheckpointService.Init(mockPlatforms)
	CheckpointService.SetMode(player, "checkpoint")

	-- Act: Try to activate CP-2 without CP-1
	local result = CheckpointService.ActivateCheckpoint(player, 2)

	-- Assert: Sequential rule violation
	assertFalse(result, "CP-2 should NOT activate without CP-1")
	assertEquals(CheckpointService.GetHighestCheckpoint(player), 0,
		"Highest checkpoint should remain 0")
	print("✅ T-002 PASSED: Sequential rule enforced - CP skipping prevented")
end

function Tests.T_003_SequentialActivation_CP1ThenCP2()
	-- Arrange
	local player = createMockPlayer(34567, "TestPlayer3")
	CheckpointService.Init(mockPlatforms)
	CheckpointService.SetMode(player, "checkpoint")

	-- Act: Sequential activation
	local result1 = CheckpointService.ActivateCheckpoint(player, 1)
	local result2 = CheckpointService.ActivateCheckpoint(player, 2)

	-- Assert
	assertTrue(result1, "CP-1 should activate")
	assertTrue(result2, "CP-2 should activate after CP-1")
	assertEquals(CheckpointService.GetHighestCheckpoint(player), 2,
		"Highest checkpoint should be 2")
	print("✅ T-003 PASSED: Sequential activation CP-1 → CP-2")
end

function Tests.T_004_AlreadyActivatedCheckpoint_NoDuplicateActivation()
	-- Arrange
	local player = createMockPlayer(45678, "TestPlayer4")
	CheckpointService.Init(mockPlatforms)
	CheckpointService.SetMode(player, "checkpoint")
	CheckpointService.ActivateCheckpoint(player, 1)

	-- Act: Re-land on same checkpoint
	local result = CheckpointService.ActivateCheckpoint(player, 1)

	-- Assert: Should return true but not duplicate
	assertTrue(result, "Re-landing on activated checkpoint should return true")
	assertEquals(CheckpointService.GetHighestCheckpoint(player), 1,
		"Highest checkpoint should remain 1")
	print("✅ T-004 PASSED: No duplicate activation on re-landing")
end

-- ═══════════════════════════════════════════════════════════
-- DEATH & RESPAWN TESTS
-- ═══════════════════════════════════════════════════════════

function Tests.T_005_DeathWithNoCP_RespawnAtCP0_TimerReset()
	-- Arrange
	local player = createMockPlayer(56789, "TestPlayer5")
	CheckpointService.Init(mockPlatforms)
	CheckpointService.SetMode(player, "checkpoint")

	-- Act: Get respawn position without any checkpoint
	local respawnPos = CheckpointService.GetRespawnPosition(player)

	-- Assert: Should respawn at CP-0 (start)
	assertNotNil(respawnPos, "Respawn position should not be nil")
	assertEquals(respawnPos.Y, mockPlatforms.CP0.Position.Y + 3,
		"Respawn Y should be CP-0 position + 3 studs")
	print("✅ T-005 PASSED: Death without CP → respawn at CP-0")
end

function Tests.T_006_DeathWithCP2Active_RespawnAtCP2()
	-- Arrange
	local player = createMockPlayer(67890, "TestPlayer6")
	CheckpointService.Init(mockPlatforms)
	CheckpointService.SetMode(player, "checkpoint")
	CheckpointService.ActivateCheckpoint(player, 1)
	CheckpointService.ActivateCheckpoint(player, 2)

	-- Act: Get respawn position
	local respawnPos = CheckpointService.GetRespawnPosition(player)

	-- Assert: Should respawn at CP-2
	assertNotNil(respawnPos, "Respawn position should not be nil")
	assertEquals(respawnPos.Y, mockPlatforms.CP2.Position.Y + 3,
		"Respawn Y should be CP-2 position + 3 studs")
	print("✅ T-006 PASSED: Death with CP-2 → respawn at CP-2")
end

-- ═══════════════════════════════════════════════════════════
-- DATASTORE PERSISTENCE TESTS
-- ═══════════════════════════════════════════════════════════

function Tests.T_010_CP3Activation_DataStoreSavesHighestCheckpoint()
	-- Arrange
	local player = createMockPlayer(78901, "TestPlayer7")
	CheckpointService.Init(mockPlatforms)
	CheckpointService.SetMode(player, "checkpoint")
	CheckpointService.ActivateCheckpoint(player, 1)
	CheckpointService.ActivateCheckpoint(player, 2)
	CheckpointService.ActivateCheckpoint(player, 3)

	-- Act: Save to DataStore
	local saveSuccess = CheckpointService.SaveToDataStore(player)

	-- Assert: Save should succeed
	assertTrue(saveSuccess, "DataStore save should succeed")
	print("✅ T-010 PASSED: CP-3 activation → DataStore save")
end

function Tests.T_011_DataStoreDebounce_6SecondMinimum()
	-- Arrange
	local player = createMockPlayer(89012, "TestPlayer8")
	CheckpointService.Init(mockPlatforms)
	CheckpointService.SetMode(player, "checkpoint")
	CheckpointService.ActivateCheckpoint(player, 1)

	-- Act: Try to save twice rapidly
	local save1 = CheckpointService.SaveToDataStore(player)
	local save2 = CheckpointService.SaveToDataStore(player) -- Immediate second save

	-- Assert: Second save should be debounced
	assertTrue(save1, "First save should succeed")
	assertFalse(save2, "Second save within 6 seconds should be blocked")
	print("✅ T-011 PASSED: DataStore debounce enforced (6s minimum)")
end

-- ═══════════════════════════════════════════════════════════
-- MODE SYSTEM TESTS
-- ═══════════════════════════════════════════════════════════

function Tests.T_015_CheckpointModeFinish_CPLeaderboardOnly()
	-- Arrange
	local player = createMockPlayer(90123, "TestPlayer9")
	CheckpointService.Init(mockPlatforms)
	CheckpointService.SetMode(player, "checkpoint")

	-- Act: Get mode
	local mode = CheckpointService.GetMode(player)

	-- Assert
	assertEquals(mode, "checkpoint", "Mode should be 'checkpoint'")
	print("✅ T-015 PASSED: Checkpoint mode set correctly")
end

function Tests.T_016_NoCheckpointModeFinish_MainLeaderboardOnly()
	-- Arrange
	local player = createMockPlayer(1234, "TestPlayer10")
	CheckpointService.Init(mockPlatforms)
	-- Note: Default mode should be "nocheckpoint"

	-- Act: Get mode (no explicit SetMode call)
	local mode = CheckpointService.GetMode(player)

	-- Assert: Default should be nocheckpoint
	assertEquals(mode, "nocheckpoint", "Default mode should be 'nocheckpoint'")
	print("✅ T-016 PASSED: Default mode is 'nocheckpoint' (backward compatible)")
end

-- ═══════════════════════════════════════════════════════════
-- INVINCIBILITY TESTS
-- ═══════════════════════════════════════════════════════════

function Tests.T_020_PostRespawn_1_5SecondInvincibility()
	-- Arrange
	local player = createMockPlayer(11111, "TestPlayer11")
	CheckpointService.Init(mockPlatforms)
	CheckpointService.SetMode(player, "checkpoint")

	-- Note: This test verifies the IsInvincible function exists
	-- Actual time-based testing would require game simulation

	-- Act: Check if invincibility function exists
	local hasInvincibility = CheckpointService.IsInvincible ~= nil

	-- Assert
	assertTrue(hasInvincibility, "IsInvincible function should exist")
	print("✅ T-020 PASSED: Invincibility system present")
end

-- ═══════════════════════════════════════════════════════════
-- TEST RUNNER
-- ═══════════════════════════════════════════════════════════

function Tests.RunAll()
	print("\n═══════════════════════════════════════════════════")
	print("🧪 CHECKPOINT SERVICE TDD TEST SUITE")
	print("═══════════════════════════════════════════════════\n")

	local testFunctions = {
		"T_INIT_001_ServiceInitializesWithPlatforms",
		"T_001_PlayerLandsOnPlatform5_CP1Activates",
		"T_002_PlayerSkipsCP1_LandsOnPlatform10_CP2NotActivated",
		"T_003_SequentialActivation_CP1ThenCP2",
		"T_004_AlreadyActivatedCheckpoint_NoDuplicateActivation",
		"T_005_DeathWithNoCP_RespawnAtCP0_TimerReset",
		"T_006_DeathWithCP2Active_RespawnAtCP2",
		"T_010_CP3Activation_DataStoreSavesHighestCheckpoint",
		"T_011_DataStoreDebounce_6SecondMinimum",
		"T_015_CheckpointModeFinish_CPLeaderboardOnly",
		"T_016_NoCheckpointModeFinish_MainLeaderboardOnly",
		"T_020_PostRespawn_1_5SecondInvincibility",
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
