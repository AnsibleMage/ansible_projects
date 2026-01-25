-- DeathZone.server.lua
-- Phase 3 Extreme Jump Map - Auto Respawn System
-- Created by Antigravity V3.0

local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")

local killBrick = Workspace:WaitForChild("KillBrick")

-- Death zone logic
killBrick.Touched:Connect(function(hit)
	-- Check if the hit part belongs to a character
	local character = hit.Parent
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	
	if humanoid and humanoid.Health > 0 then
		local player = Players:GetPlayerFromCharacter(character)
		if player then
			print(string.format("[DeathZone] %s fell! Respawning...", player.Name))
		end
		
		-- Kill the player (Roblox will auto-respawn at SpawnLocation)
		humanoid:TakeDamage(100)
	end
end)

print("[DeathZone] ✅ Death Zone Active - Fall damage enabled at Y=-20")
