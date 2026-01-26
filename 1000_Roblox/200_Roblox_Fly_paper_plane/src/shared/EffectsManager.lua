-- Effects Manager
-- 파티클 이펙트 및 시각 효과 관리

local TweenService = game:GetService("TweenService")
local Debris = game:GetService("Debris")

local EffectsManager = {}
EffectsManager.__index = EffectsManager

function EffectsManager.new()
    local self = setmetatable({}, EffectsManager)
    return self
end

function EffectsManager:init()
    print("[EffectsManager] Initialized!")
end

-- 스피드 라인 (부스트 시)
function EffectsManager:createSpeedLines(camera: Camera)
    local part = Instance.new("Part")
    part.Name = "SpeedLines"
    part.Size = Vector3.new(0.1, 0.1, 0.1)
    part.Transparency = 1
    part.Anchored = true
    part.CanCollide = false
    part.CFrame = camera.CFrame * CFrame.new(0, 0, -5)
    part.Parent = workspace
    
    local particles = Instance.new("ParticleEmitter")
    particles.Name = "SpeedParticles"
    particles.Color = ColorSequence.new(Color3.fromRGB(200, 220, 255))
    particles.Size = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 0.1),
        NumberSequenceKeypoint.new(1, 0)
    })
    particles.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 0.3),
        NumberSequenceKeypoint.new(1, 1)
    })
    particles.Lifetime = NumberRange.new(0.3, 0.5)
    particles.Speed = NumberRange.new(50, 100)
    particles.SpreadAngle = Vector2.new(5, 5)
    particles.Rate = 100
    particles.Enabled = false
    particles.Parent = part
    
    return particles
end

-- 링 통과 이펙트
function EffectsManager:ringPassEffect(ring: BasePart)
    if not ring then return end
    
    -- 색상 변경 애니메이션
    local originalColor = ring.Color
    local highlightColor = Color3.fromRGB(100, 255, 100)
    
    -- Tween
    local tween = TweenService:Create(
        ring,
        TweenInfo.new(0.3, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
        { Color = highlightColor, Transparency = 0.6 }
    )
    tween:Play()
    
    -- 파티클 버스트
    local particles = Instance.new("ParticleEmitter")
    particles.Color = ColorSequence.new(Color3.fromRGB(255, 215, 0))
    particles.Size = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 1),
        NumberSequenceKeypoint.new(1, 0)
    })
    particles.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 0),
        NumberSequenceKeypoint.new(1, 1)
    })
    particles.Lifetime = NumberRange.new(0.5, 1)
    particles.Speed = NumberRange.new(20, 40)
    particles.SpreadAngle = Vector2.new(360, 360)
    particles.Rate = 0
    particles.Parent = ring
    
    particles:Emit(30)
    
    Debris:AddItem(particles, 1.5)
end

-- 충돌 이펙트
function EffectsManager:crashEffect(position: Vector3)
    local part = Instance.new("Part")
    part.Name = "CrashEffect"
    part.Size = Vector3.new(1, 1, 1)
    part.Position = position
    part.Transparency = 1
    part.Anchored = true
    part.CanCollide = false
    part.Parent = workspace
    
    -- 폭발 파티클
    local particles = Instance.new("ParticleEmitter")
    particles.Color = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 150, 50)),
        ColorSequenceKeypoint.new(0.5, Color3.fromRGB(255, 80, 30)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(100, 100, 100))
    })
    particles.Size = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 2),
        NumberSequenceKeypoint.new(1, 0)
    })
    particles.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 0.3),
        NumberSequenceKeypoint.new(1, 1)
    })
    particles.Lifetime = NumberRange.new(0.5, 1)
    particles.Speed = NumberRange.new(30, 60)
    particles.SpreadAngle = Vector2.new(360, 360)
    particles.Rate = 0
    particles.Parent = part
    
    particles:Emit(50)
    
    -- 화면 흔들림 효과 (카메라)
    local camera = workspace.CurrentCamera
    if camera then
        task.spawn(function()
            local originalCFrame = camera.CFrame
            for i = 1, 10 do
                local shake = Vector3.new(
                    math.random(-1, 1) * 0.5,
                    math.random(-1, 1) * 0.5,
                    0
                )
                camera.CFrame = originalCFrame * CFrame.new(shake)
                task.wait(0.03)
            end
            camera.CFrame = originalCFrame
        end)
    end
    
    Debris:AddItem(part, 2)
end

-- 골인 이펙트
function EffectsManager:finishEffect(position: Vector3)
    local part = Instance.new("Part")
    part.Name = "FinishEffect"
    part.Size = Vector3.new(1, 1, 1)
    part.Position = position
    part.Transparency = 1
    part.Anchored = true
    part.CanCollide = false
    part.Parent = workspace
    
    -- 폭죽 파티클
    local colors = {
        Color3.fromRGB(255, 50, 50),
        Color3.fromRGB(50, 255, 50),
        Color3.fromRGB(50, 50, 255),
        Color3.fromRGB(255, 215, 0),
        Color3.fromRGB(255, 100, 255),
    }
    
    for i = 1, 5 do
        local particles = Instance.new("ParticleEmitter")
        particles.Color = ColorSequence.new(colors[i])
        particles.Size = NumberSequence.new({
            NumberSequenceKeypoint.new(0, 0.5),
            NumberSequenceKeypoint.new(0.5, 1),
            NumberSequenceKeypoint.new(1, 0)
        })
        particles.Transparency = NumberSequence.new({
            NumberSequenceKeypoint.new(0, 0),
            NumberSequenceKeypoint.new(1, 1)
        })
        particles.Lifetime = NumberRange.new(1, 2)
        particles.Speed = NumberRange.new(50, 100)
        particles.SpreadAngle = Vector2.new(360, 360)
        particles.Rate = 0
        particles.Parent = part
        
        task.delay(0.2 * (i - 1), function()
            particles:Emit(30)
        end)
    end
    
    Debris:AddItem(part, 3)
end

-- 비행기 꼬리 이펙트 강화
function EffectsManager:enhancePlaneTrail(plane: Model)
    if not plane or not plane.PrimaryPart then return end
    
    local rootPart = plane.PrimaryPart
    
    -- 좌우 날개 끝에 트레일 추가
    local wingTips = {"LeftWing", "RightWing"}
    
    for _, wingName in ipairs(wingTips) do
        local wing = plane:FindFirstChild(wingName)
        if wing then
            local attachment0 = Instance.new("Attachment")
            attachment0.Position = Vector3.new(0, 0, -wing.Size.Z / 2)
            attachment0.Parent = wing
            
            local attachment1 = Instance.new("Attachment")
            attachment1.Position = Vector3.new(0, 0, wing.Size.Z / 2)
            attachment1.Parent = wing
            
            local trail = Instance.new("Trail")
            trail.Name = wingName .. "Trail"
            trail.Attachment0 = attachment0
            trail.Attachment1 = attachment1
            trail.Lifetime = 0.5
            trail.MinLength = 0.1
            trail.FaceCamera = true
            trail.Color = ColorSequence.new(Color3.fromRGB(255, 255, 255))
            trail.Transparency = NumberSequence.new({
                NumberSequenceKeypoint.new(0, 0.5),
                NumberSequenceKeypoint.new(1, 1)
            })
            trail.WidthScale = NumberSequence.new({
                NumberSequenceKeypoint.new(0, 0.3),
                NumberSequenceKeypoint.new(1, 0)
            })
            trail.Parent = wing
        end
    end
    
    print("[EffectsManager] Enhanced plane trails")
end

return EffectsManager
