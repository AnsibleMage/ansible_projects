-- RhythmScript.server.lua
-- Created by Antigravity V3.0 for Ansible Jump 001

local TweenService = game:GetService("TweenService")
local workspace = game:GetService("Workspace")

local platforms = {}
for i = 1, 10 do
	local p = workspace:WaitForChild("NeonPlatform_" .. i, 5)
	if p then
		table.insert(platforms, p)
	end
end

local colors = {
	Color3.fromRGB(0, 255, 255),   -- Cyan
	Color3.fromRGB(170, 0, 255),   -- Electric Purple
	Color3.fromRGB(255, 170, 0)    -- Neon Orange
}

print("Initiating Pulsar Rhythm for " .. #platforms .. " platforms...")

while true do
	for idx, color in ipairs(colors) do
		for _, platform in ipairs(platforms) do
			local goal = {Color = color}
			local tweenInfo = TweenInfo.new(0.5, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut)
			local tween = TweenService:Create(platform, tweenInfo, goal)
			tween:Play()
		end
		task.wait(0.8) -- Rhythm Interval
	end
end
