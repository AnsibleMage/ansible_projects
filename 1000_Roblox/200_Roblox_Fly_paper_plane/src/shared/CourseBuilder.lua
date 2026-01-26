-- Block 2: Game Core
-- 향상된 코스 생성 모듈

local CourseBuilder = {}

-- 코스 설정
local COURSE_CONFIG = {
    -- 코스 길이
    LENGTH = 1000,           -- 1000 studs
    
    -- 장애물 설정
    OBSTACLE_COUNT = 20,
    OBSTACLE_MIN_SIZE = Vector3.new(5, 10, 5),
    OBSTACLE_MAX_SIZE = Vector3.new(30, 80, 30),
    OBSTACLE_SPREAD = 150,   -- 좌우 범위
    OBSTACLE_HEIGHT = {20, 100},  -- 높이 범위
    
    -- 링 (통과 포인트)
    RING_COUNT = 5,
    RING_RADIUS = 15,
    
    -- 색상
    COLORS = {
        Start = Color3.fromRGB(0, 255, 100),
        Finish = Color3.fromRGB(255, 50, 50),
        Obstacle = Color3.fromRGB(100, 100, 120),
        Ring = Color3.fromRGB(255, 215, 0),
        Checkpoint = Color3.fromRGB(0, 150, 255),
    }
}

function CourseBuilder.createCourse(parent: Instance): Folder
    local course = Instance.new("Folder")
    course.Name = "Course"
    course.Parent = parent
    
    -- 시작점
    CourseBuilder.createStartPoint(course)
    
    -- 골인점
    CourseBuilder.createFinishPoint(course)
    
    -- 장애물들
    CourseBuilder.createObstacles(course)
    
    -- 링 (체크포인트)
    CourseBuilder.createRings(course)
    
    -- 바닥 그리드
    CourseBuilder.createFloor(course)
    
    -- 하늘 장식
    CourseBuilder.createSkyDecor(course)
    
    print("[CourseBuilder] Course created with", COURSE_CONFIG.OBSTACLE_COUNT, "obstacles and", COURSE_CONFIG.RING_COUNT, "rings")
    
    return course
end

function CourseBuilder.createStartPoint(parent: Folder)
    local start = Instance.new("Part")
    start.Name = "StartPoint"
    start.Size = Vector3.new(30, 2, 30)
    start.Position = Vector3.new(0, 50, 30)  -- ★ 비행기 스폰 높이에 맞춤
    start.Anchored = true
    start.CanCollide = false
    start.Color = COURSE_CONFIG.COLORS.Start
    start.Transparency = 0.5
    start.Material = Enum.Material.Neon
    start.Parent = parent
    
    -- 발광 효과
    local light = Instance.new("PointLight")
    light.Color = COURSE_CONFIG.COLORS.Start
    light.Brightness = 2
    light.Range = 30
    light.Parent = start
    
    -- 텍스트
    local billboard = Instance.new("BillboardGui")
    billboard.Size = UDim2.new(0, 300, 0, 80)
    billboard.StudsOffset = Vector3.new(0, 10, 0)
    billboard.AlwaysOnTop = true
    billboard.Parent = start
    
    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, 0, 1, 0)
    label.BackgroundTransparency = 1
    label.Text = "🚀 START HERE 🚀"
    label.TextColor3 = Color3.new(1, 1, 1)
    label.TextScaled = true
    label.Font = Enum.Font.GothamBold
    label.Parent = billboard
    
    -- 화살표 (아래 방향)
    local arrow = Instance.new("Part")
    arrow.Name = "StartArrow"
    arrow.Size = Vector3.new(5, 20, 5)
    arrow.Position = Vector3.new(0, 70, 30)  -- ★ 높이 70
    arrow.Anchored = true
    arrow.CanCollide = false
    arrow.Color = COURSE_CONFIG.COLORS.Start
    arrow.Transparency = 0.3
    arrow.Material = Enum.Material.Neon
    arrow.Shape = Enum.PartType.Cylinder
    arrow.Orientation = Vector3.new(0, 0, 90)
    arrow.Parent = parent
    
    return start
end

function CourseBuilder.createFinishPoint(parent: Folder)
    local finish = Instance.new("Part")
    finish.Name = "FinishPoint"
    finish.Size = Vector3.new(50, 2, 50)
    finish.Position = Vector3.new(0, 30, -COURSE_CONFIG.LENGTH)
    finish.Anchored = true
    finish.CanCollide = false
    finish.Color = COURSE_CONFIG.COLORS.Finish
    finish.Transparency = 0.3
    finish.Material = Enum.Material.Neon
    finish.Parent = parent
    
    -- 발광 효과
    local light = Instance.new("PointLight")
    light.Color = COURSE_CONFIG.COLORS.Finish
    light.Brightness = 3
    light.Range = 50
    light.Parent = finish
    
    -- 텍스트
    local billboard = Instance.new("BillboardGui")
    billboard.Size = UDim2.new(0, 400, 0, 100)
    billboard.StudsOffset = Vector3.new(0, 15, 0)
    billboard.AlwaysOnTop = true
    billboard.Parent = finish
    
    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, 0, 1, 0)
    label.BackgroundTransparency = 1
    label.Text = "🏁 FINISH LINE 🏁"
    label.TextColor3 = Color3.new(1, 1, 1)
    label.TextScaled = true
    label.Font = Enum.Font.GothamBold
    label.Parent = billboard
    
    -- 아치형 골인문
    for i = -1, 1, 2 do
        local pillar = Instance.new("Part")
        pillar.Name = "FinishPillar"
        pillar.Size = Vector3.new(5, 60, 5)
        pillar.Position = Vector3.new(i * 30, 60, -COURSE_CONFIG.LENGTH)
        pillar.Anchored = true
        pillar.CanCollide = false
        pillar.Color = COURSE_CONFIG.COLORS.Finish
        pillar.Transparency = 0.5
        pillar.Material = Enum.Material.Neon
        pillar.Parent = parent
    end
    
    -- 상단 연결 바
    local topBar = Instance.new("Part")
    topBar.Name = "FinishTopBar"
    topBar.Size = Vector3.new(65, 5, 5)
    topBar.Position = Vector3.new(0, 90, -COURSE_CONFIG.LENGTH)
    topBar.Anchored = true
    topBar.CanCollide = false
    topBar.Color = COURSE_CONFIG.COLORS.Finish
    topBar.Transparency = 0.5
    topBar.Material = Enum.Material.Neon
    topBar.Parent = parent
    
    return finish
end

function CourseBuilder.createObstacles(parent: Folder)
    local obstacles = Instance.new("Folder")
    obstacles.Name = "Obstacles"
    obstacles.Parent = parent
    
    local spacing = COURSE_CONFIG.LENGTH / (COURSE_CONFIG.OBSTACLE_COUNT + 1)
    
    for i = 1, COURSE_CONFIG.OBSTACLE_COUNT do
        local zPos = -spacing * i
        
        -- 랜덤 크기
        local size = Vector3.new(
            math.random(COURSE_CONFIG.OBSTACLE_MIN_SIZE.X, COURSE_CONFIG.OBSTACLE_MAX_SIZE.X),
            math.random(COURSE_CONFIG.OBSTACLE_MIN_SIZE.Y, COURSE_CONFIG.OBSTACLE_MAX_SIZE.Y),
            math.random(COURSE_CONFIG.OBSTACLE_MIN_SIZE.Z, COURSE_CONFIG.OBSTACLE_MAX_SIZE.Z)
        )
        
        -- 랜덤 위치 (좌우)
        local xPos = math.random(-COURSE_CONFIG.OBSTACLE_SPREAD, COURSE_CONFIG.OBSTACLE_SPREAD)
        local yPos = math.random(COURSE_CONFIG.OBSTACLE_HEIGHT[1], COURSE_CONFIG.OBSTACLE_HEIGHT[2])
        
        local obstacle = Instance.new("Part")
        obstacle.Name = "Obstacle_" .. i
        obstacle.Size = size
        obstacle.Position = Vector3.new(xPos, yPos, zPos)
        obstacle.Anchored = true
        obstacle.CanCollide = true
        obstacle.Color = COURSE_CONFIG.COLORS.Obstacle
        obstacle.Material = Enum.Material.Concrete
        obstacle.Parent = obstacles
        
        -- 약간의 색상 변화
        local shade = math.random(80, 120) / 100
        obstacle.Color = Color3.new(
            COURSE_CONFIG.COLORS.Obstacle.R * shade,
            COURSE_CONFIG.COLORS.Obstacle.G * shade,
            COURSE_CONFIG.COLORS.Obstacle.B * shade
        )
    end
    
    return obstacles
end

function CourseBuilder.createRings(parent: Folder)
    local rings = Instance.new("Folder")
    rings.Name = "Rings"
    rings.Parent = parent
    
    local spacing = COURSE_CONFIG.LENGTH / (COURSE_CONFIG.RING_COUNT + 1)
    
    for i = 1, COURSE_CONFIG.RING_COUNT do
        local zPos = -spacing * i
        local xPos = math.random(-50, 50)
        local yPos = math.random(40, 80)
        
        -- 토러스(링) 생성
        local ring = Instance.new("Part")
        ring.Name = "Ring_" .. i
        ring.Shape = Enum.PartType.Cylinder
        ring.Size = Vector3.new(2, COURSE_CONFIG.RING_RADIUS * 2, COURSE_CONFIG.RING_RADIUS * 2)
        ring.Position = Vector3.new(xPos, yPos, zPos)
        ring.Orientation = Vector3.new(0, 0, 90)
        ring.Anchored = true
        ring.CanCollide = false
        ring.Color = COURSE_CONFIG.COLORS.Ring
        ring.Transparency = 0.3
        ring.Material = Enum.Material.Neon
        ring.Parent = rings
        
        -- 발광
        local light = Instance.new("PointLight")
        light.Color = COURSE_CONFIG.COLORS.Ring
        light.Brightness = 1
        light.Range = 20
        light.Parent = ring
        
        -- 번호 표시
        local billboard = Instance.new("BillboardGui")
        billboard.Size = UDim2.new(0, 100, 0, 50)
        billboard.StudsOffset = Vector3.new(0, 20, 0)
        billboard.Parent = ring
        
        local label = Instance.new("TextLabel")
        label.Size = UDim2.new(1, 0, 1, 0)
        label.BackgroundTransparency = 1
        label.Text = "Ring " .. i
        label.TextColor3 = COURSE_CONFIG.COLORS.Ring
        label.TextScaled = true
        label.Font = Enum.Font.GothamBold
        label.Parent = billboard
    end
    
    return rings
end

function CourseBuilder.createFloor(parent: Folder)
    local floor = Instance.new("Part")
    floor.Name = "Floor"
    floor.Size = Vector3.new(500, 1, COURSE_CONFIG.LENGTH + 200)
    floor.Position = Vector3.new(0, -5, -COURSE_CONFIG.LENGTH / 2)
    floor.Anchored = true
    floor.CanCollide = true
    floor.Color = Color3.fromRGB(50, 80, 50)
    floor.Material = Enum.Material.Grass
    floor.Parent = parent
    
    return floor
end

function CourseBuilder.createSkyDecor(parent: Folder)
    local decor = Instance.new("Folder")
    decor.Name = "SkyDecor"
    decor.Parent = parent
    
    -- 구름들
    for i = 1, 15 do
        local cloud = Instance.new("Part")
        cloud.Name = "Cloud_" .. i
        cloud.Size = Vector3.new(
            math.random(30, 80),
            math.random(10, 30),
            math.random(30, 80)
        )
        cloud.Position = Vector3.new(
            math.random(-300, 300),
            math.random(150, 250),
            math.random(-COURSE_CONFIG.LENGTH, 100)
        )
        cloud.Anchored = true
        cloud.CanCollide = false
        cloud.Color = Color3.fromRGB(255, 255, 255)
        cloud.Transparency = 0.4
        cloud.Material = Enum.Material.SmoothPlastic
        cloud.Parent = decor
    end
    
    return decor
end

return CourseBuilder
