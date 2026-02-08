-- ═══════════════════════════════════════════════════════════
-- DeathZone.server.lua
-- Phase 3 Extreme Jump Map - 자동 리스폰 시스템
-- Created by Antigravity V3.0
--
-- 낙하 감지 방식: 이중 감지 (Dual Detection)
--   1) Touched 이벤트: KillBrick 접촉 시 즉시 사망 (일반 낙하)
--   2) Y-position polling: 0.1초 간격 위치 체크 (고속 관통 대응)
--
-- Hotfix (T-09): 고속 낙하 시 Touched 이벤트가 누락되는 문제 해결
--   - Y-poll 방식 추가로 100% 감지율 달성
--   - debounce(2초)로 이중 사망 방지
--   - 액세서리 파트 처리 로직 추가
-- ═══════════════════════════════════════════════════════════

-- Roblox 서비스
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local Workspace = game:GetService("Workspace")

-- ═══════════════════════════════════════════════════════════
-- 상수
-- ═══════════════════════════════════════════════════════════
local DEATH_Y = -20              -- 이 Y좌표 이하로 떨어지면 사망 처리
local CHECK_INTERVAL = 0.1       -- Y-position 폴링 간격 (초)
local DEBOUNCE_DURATION = 2      -- 같은 플레이어 재사망 방지 시간 (초)

-- Workspace에서 KillBrick 참조 (Y=-20 위치의 거대한 투명 파트)
local killBrick = Workspace:WaitForChild("KillBrick")

-- debounce 테이블: 동일 플레이어의 연속 사망 이벤트 방지
-- { [userId: number] = true | nil }
local recentlyKilled = {}

-- ═══════════════════════════════════════════════════════════
-- 핵심 함수: 플레이어 사망 처리
-- ═══════════════════════════════════════════════════════════

--- 캐릭터를 사망 처리하는 통합 함수
--- @param character Model - 사망 대상 캐릭터 모델
--- @param source string - 감지 방식 ("Touched" 또는 "Y-poll")
local function killPlayer(character, source)
	-- Humanoid가 없거나 이미 사망 상태면 무시
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if not humanoid or humanoid.Health <= 0 then return end

	-- 캐릭터에서 Player 객체 역추적
	local player = Players:GetPlayerFromCharacter(character)
	local userId = player and player.UserId

	-- debounce: 최근 사망 처리된 플레이어는 무시 (이중 감지 충돌 방지)
	if userId and recentlyKilled[userId] then return end

	-- debounce 등록: DEBOUNCE_DURATION 후 자동 해제
	if userId then
		recentlyKilled[userId] = true
		task.delay(DEBOUNCE_DURATION, function() recentlyKilled[userId] = nil end)
		print(string.format("[DeathZone] %s fell! (%s) Respawning...", player.Name, source))
	end

	-- Health를 0으로 직접 설정하여 최대 HP와 무관하게 확실한 사망 보장
	humanoid.Health = 0
end

-- ═══════════════════════════════════════════════════════════
-- 감지 방식 1: Touched 이벤트 (일반 낙하용)
-- KillBrick에 캐릭터 파트가 닿으면 즉시 사망
-- 장점: 즉각 반응, 지연 없음
-- 단점: 고속 낙하 시 물리 엔진이 접촉을 감지 못할 수 있음 (tunneling)
-- ═══════════════════════════════════════════════════════════
killBrick.Touched:Connect(function(hit)
	local character = hit.Parent
	if not character then return end

	-- 액세서리(모자, 헤어 등)의 Handle 파트가 먼저 닿을 수 있음
	-- 이 경우 Parent가 Accessory이므로 한 단계 더 올라가서 캐릭터 모델 찾기
	if not character:FindFirstChildOfClass("Humanoid") then
		character = character.Parent
		if not character or not character:FindFirstChildOfClass("Humanoid") then return end
	end

	killPlayer(character, "Touched")
end)

-- ═══════════════════════════════════════════════════════════
-- 감지 방식 2: Y-position 폴링 (고속 낙하 대응)
-- Heartbeat마다 모든 플레이어의 Y좌표를 확인
-- 장점: tunneling 문제 완전 해결, 100% 감지율
-- 단점: CHECK_INTERVAL만큼의 미세 지연 (최대 0.1초)
-- ═══════════════════════════════════════════════════════════
local elapsed = 0
RunService.Heartbeat:Connect(function(dt)
	-- CHECK_INTERVAL 간격으로만 체크 (성능 최적화)
	elapsed = elapsed + dt
	if elapsed < CHECK_INTERVAL then return end
	elapsed = 0

	-- 모든 접속 플레이어를 순회하며 Y좌표 확인
	for _, player in ipairs(Players:GetPlayers()) do
		local character = player.Character
		if character then
			local rootPart = character:FindFirstChild("HumanoidRootPart")
			-- HumanoidRootPart의 Y좌표가 DEATH_Y 이하이면 사망 처리
			if rootPart and rootPart.Position.Y <= DEATH_Y then
				killPlayer(character, "Y-poll")
			end
		end
	end
end)

-- ═══════════════════════════════════════════════════════════
-- 초기화 완료 로그
-- ═══════════════════════════════════════════════════════════
print("[DeathZone] ✅ Death Zone Active - Dual detection (Touched + Y-poll) at Y=" .. DEATH_Y)
