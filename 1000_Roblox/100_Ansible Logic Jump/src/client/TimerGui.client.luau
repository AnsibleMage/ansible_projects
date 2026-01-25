-- TimerGui.client.luau
-- Forest Sprint Premium - Client-side Timer Display
-- Created by Antigravity V3.0 following 111_PRD Section 4.2

local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Create ScreenGui (111_PRD Section 4.2)
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "SprintTimerGui"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Create Timer Label (111_PRD: 화면 상단 중앙, 반투명 검은 배경, 흰색 텍스트)
local timerLabel = Instance.new("TextLabel")
timerLabel.Size = UDim2.new(0, 200, 0, 50)
timerLabel.Position = UDim2.new(0.5, -100, 0.1, 0)
timerLabel.BackgroundTransparency = 0.5
timerLabel.BackgroundColor3 = Color3.new(0, 0, 0)
timerLabel.TextColor3 = Color3.new(1, 1, 1)
timerLabel.TextSize = 24
timerLabel.Font = Enum.Font.GothamBold
timerLabel.Text = "TIME: 00.00"
timerLabel.Parent = screenGui

-- Race state tracking
local isRacing = false
local startTime = 0

-- Get track references
local Workspace = game:GetService("Workspace")
local startLine = Workspace:WaitForChild("StartLine")
local finishLine = Workspace:WaitForChild("FinishLine")

-- T-302: Start detection
startLine.Touched:Connect(function(hit)
	if hit.Parent == player.Character then
		isRacing = true
		startTime = tick()
		print("[TimerGui] Race started!")
	end
end)

-- T-302: Finish detection
finishLine.Touched:Connect(function(hit)
	if hit.Parent == player.Character then
		if isRacing then
			local finalTime = tick() - startTime
			isRacing = false
			timerLabel.Text = string.format("FINISH: %.2f", finalTime)
			print(string.format("[TimerGui] Finished in %.2f seconds", finalTime))
			
			-- Reset after 3 seconds
			task.wait(3)
			timerLabel.Text = "TIME: 00.00"
		end
	end
end)

-- T-302: Real-time timer update (111_PRD: 0.01s precision)
RunService.RenderStepped:Connect(function()
	if isRacing then
		local elapsed = tick() - startTime
		timerLabel.Text = string.format("TIME: %.2f", elapsed)
	end
end)

-- Phase 3 fix: Reset timer on death/respawn
player.CharacterAdded:Connect(function(character)
	-- Reset racing state on respawn
	isRacing = false
	startTime = 0
	timerLabel.Text = "TIME: 00.00"
	print("[TimerGui] Character respawned - timer reset")
end)

print("[TimerGui] ✅ Timer GUI Ready - Following 111_PRD")
