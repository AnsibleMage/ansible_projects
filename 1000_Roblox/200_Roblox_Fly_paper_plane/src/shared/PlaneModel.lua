-- Block 1: Flight Control
-- 향상된 비행기 모델 생성 모듈

local PlaneModel = {}

-- 종이비행기 색상
local PLANE_COLORS = {
    Body = Color3.fromRGB(255, 255, 255),      -- 흰색
    Wing = Color3.fromRGB(240, 240, 255),      -- 연한 파랑
    Tail = Color3.fromRGB(255, 200, 100),      -- 노란색 꼬리
    Stripe = Color3.fromRGB(255, 80, 80),      -- 빨간 줄무늬
}

function PlaneModel.create(position: Vector3?): Model
    local plane = Instance.new("Model")
    plane.Name = "PaperPlane"
    
    -- 기준점 (부품들이 연결될 중심)
    local rootPart = Instance.new("Part")
    rootPart.Name = "RootPart"
    rootPart.Size = Vector3.new(1, 0.2, 4)
    rootPart.Position = position or Vector3.new(0, 50, 0)
    rootPart.Anchored = false
    rootPart.CanCollide = true
    rootPart.Transparency = 1  -- 보이지 않음 (히트박스용)
    rootPart.Parent = plane
    
    plane.PrimaryPart = rootPart
    
    -- 동체 (본체)
    local body = Instance.new("Part")
    body.Name = "Body"
    body.Size = Vector3.new(0.5, 0.3, 4)
    body.CFrame = rootPart.CFrame
    body.Anchored = false
    body.CanCollide = false
    body.Color = PLANE_COLORS.Body
    body.Material = Enum.Material.SmoothPlastic
    body.Parent = plane
    
    local bodyWeld = Instance.new("WeldConstraint")
    bodyWeld.Part0 = rootPart
    bodyWeld.Part1 = body
    bodyWeld.Parent = body
    
    -- 왼쪽 날개
    local leftWing = Instance.new("WedgePart")
    leftWing.Name = "LeftWing"
    leftWing.Size = Vector3.new(3, 0.1, 2)
    leftWing.CFrame = rootPart.CFrame * CFrame.new(-1.5, 0, -0.5) * CFrame.Angles(0, math.rad(180), 0)
    leftWing.Anchored = false
    leftWing.CanCollide = false
    leftWing.Color = PLANE_COLORS.Wing
    leftWing.Material = Enum.Material.SmoothPlastic
    leftWing.Parent = plane
    
    local leftWingWeld = Instance.new("WeldConstraint")
    leftWingWeld.Part0 = rootPart
    leftWingWeld.Part1 = leftWing
    leftWingWeld.Parent = leftWing
    
    -- 오른쪽 날개
    local rightWing = Instance.new("WedgePart")
    rightWing.Name = "RightWing"
    rightWing.Size = Vector3.new(3, 0.1, 2)
    rightWing.CFrame = rootPart.CFrame * CFrame.new(1.5, 0, -0.5) * CFrame.Angles(0, 0, 0)
    rightWing.Anchored = false
    rightWing.CanCollide = false
    rightWing.Color = PLANE_COLORS.Wing
    rightWing.Material = Enum.Material.SmoothPlastic
    rightWing.Parent = plane
    
    local rightWingWeld = Instance.new("WeldConstraint")
    rightWingWeld.Part0 = rootPart
    rightWingWeld.Part1 = rightWing
    rightWingWeld.Parent = rightWing
    
    -- 꼬리 (수직 안정판)
    local tail = Instance.new("WedgePart")
    tail.Name = "Tail"
    tail.Size = Vector3.new(0.1, 1, 1)
    tail.CFrame = rootPart.CFrame * CFrame.new(0, 0.5, 1.5) * CFrame.Angles(0, math.rad(90), 0)
    tail.Anchored = false
    tail.CanCollide = false
    tail.Color = PLANE_COLORS.Tail
    tail.Material = Enum.Material.SmoothPlastic
    tail.Parent = plane
    
    local tailWeld = Instance.new("WeldConstraint")
    tailWeld.Part0 = rootPart
    tailWeld.Part1 = tail
    tailWeld.Parent = tail
    
    -- 코 (앞부분)
    local nose = Instance.new("WedgePart")
    nose.Name = "Nose"
    nose.Size = Vector3.new(0.5, 0.3, 1)
    nose.CFrame = rootPart.CFrame * CFrame.new(0, 0, -2.5) * CFrame.Angles(0, math.rad(180), 0)
    nose.Anchored = false
    nose.CanCollide = false
    nose.Color = PLANE_COLORS.Body
    nose.Material = Enum.Material.SmoothPlastic
    nose.Parent = plane
    
    local noseWeld = Instance.new("WeldConstraint")
    noseWeld.Part0 = rootPart
    noseWeld.Part1 = nose
    noseWeld.Parent = nose
    
    -- 줄무늬 장식
    local stripe = Instance.new("Part")
    stripe.Name = "Stripe"
    stripe.Size = Vector3.new(0.6, 0.05, 0.3)
    stripe.CFrame = rootPart.CFrame * CFrame.new(0, 0.18, 0)
    stripe.Anchored = false
    stripe.CanCollide = false
    stripe.Color = PLANE_COLORS.Stripe
    stripe.Material = Enum.Material.Neon
    stripe.Parent = plane
    
    local stripeWeld = Instance.new("WeldConstraint")
    stripeWeld.Part0 = rootPart
    stripeWeld.Part1 = stripe
    stripeWeld.Parent = stripe
    
    -- 트레일 이펙트
    local attachment0 = Instance.new("Attachment")
    attachment0.Position = Vector3.new(0, 0, 2)
    attachment0.Parent = rootPart
    
    local attachment1 = Instance.new("Attachment")
    attachment1.Position = Vector3.new(0, 0, 2.5)
    attachment1.Parent = rootPart
    
    local trail = Instance.new("Trail")
    trail.Name = "FlightTrail"
    trail.Attachment0 = attachment0
    trail.Attachment1 = attachment1
    trail.Lifetime = 1
    trail.MinLength = 0.1
    trail.FaceCamera = true
    trail.Color = ColorSequence.new(Color3.fromRGB(200, 220, 255))
    trail.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 0.3),
        NumberSequenceKeypoint.new(1, 1)
    })
    trail.WidthScale = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 1),
        NumberSequenceKeypoint.new(1, 0)
    })
    trail.Parent = rootPart
    
    -- ★ VehicleSeat 추가 (플레이어 탑승용)
    local seat = Instance.new("VehicleSeat")
    seat.Name = "PilotSeat"
    seat.Size = Vector3.new(2, 0.5, 2)
    seat.CFrame = rootPart.CFrame * CFrame.new(0, 0.5, 0.5)
    seat.Anchored = false
    seat.CanCollide = false
    seat.Transparency = 0.8  -- 거의 투명
    seat.MaxSpeed = 0        -- VehicleSeat 자체 움직임 비활성화 (커스텀 물리 사용)
    seat.TurnSpeed = 0
    seat.Torque = 0
    seat.Parent = plane
    
    local seatWeld = Instance.new("WeldConstraint")
    seatWeld.Part0 = rootPart
    seatWeld.Part1 = seat
    seatWeld.Parent = seat
    
    plane.Parent = workspace
    
    print("[PlaneModel] Created paper plane with VehicleSeat at:", position or Vector3.new(0, 50, 0))
    return plane
end

function PlaneModel.destroy(plane: Model)
    if plane then
        plane:Destroy()
    end
end

return PlaneModel
