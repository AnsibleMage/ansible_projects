-- Sound Manager
-- 게임 사운드 효과 관리

local SoundService = game:GetService("SoundService")
local TweenService = game:GetService("TweenService")

local SoundManager = {}
SoundManager.__index = SoundManager

-- 사운드 ID (로블록스 라이브러리에서)
local SOUND_IDS = {
    -- 비행기 엔진
    Engine = "rbxassetid://9114846643",      -- 비행기 엔진 소리
    EngineBoost = "rbxassetid://1837106999", -- 부스트 소리
    
    -- 게임 이벤트
    Start = "rbxassetid://9113869830",       -- 게임 시작
    Finish = "rbxassetid://9113903091",      -- 골인
    Crash = "rbxassetid://9113875367",       -- 충돌
    Ring = "rbxassetid://9113869830",        -- 링 통과
    
    -- UI
    Click = "rbxassetid://9113903091",       -- 버튼 클릭
    Hover = "rbxassetid://9113869830",       -- 버튼 호버
    
    -- 배경음악
    BGM_Menu = "rbxassetid://1838016677",    -- 메뉴 배경음
    BGM_Game = "rbxassetid://1837816247",    -- 게임 배경음
}

-- 볼륨 설정
local VOLUME = {
    Master = 0.8,
    Music = 0.5,
    SFX = 0.7,
}

function SoundManager.new()
    local self = setmetatable({}, SoundManager)
    
    self.sounds = {}
    self.currentBGM = nil
    
    return self
end

function SoundManager:init()
    print("[SoundManager] Initializing...")
    
    -- 사운드 그룹 생성
    local soundGroup = Instance.new("SoundGroup")
    soundGroup.Name = "GameSounds"
    soundGroup.Volume = VOLUME.Master
    soundGroup.Parent = SoundService
    self.soundGroup = soundGroup
    
    -- 사운드 미리 로드
    self:preloadSounds()
    
    print("[SoundManager] Initialized!")
end

function SoundManager:preloadSounds()
    for name, id in pairs(SOUND_IDS) do
        local sound = Instance.new("Sound")
        sound.Name = name
        sound.SoundId = id
        sound.SoundGroup = self.soundGroup
        sound.Parent = self.soundGroup
        
        -- 볼륨 설정
        if name:find("BGM") then
            sound.Volume = VOLUME.Music
            sound.Looped = true
        else
            sound.Volume = VOLUME.SFX
            sound.Looped = false
        end
        
        self.sounds[name] = sound
    end
    
    print("[SoundManager] Preloaded", #self.sounds, "sounds")
end

function SoundManager:play(soundName: string)
    local sound = self.sounds[soundName]
    if sound then
        -- 복제해서 재생 (중복 재생 가능)
        local clone = sound:Clone()
        clone.Parent = self.soundGroup
        clone:Play()
        
        -- 재생 완료 후 정리
        clone.Ended:Connect(function()
            clone:Destroy()
        end)
        
        return clone
    else
        warn("[SoundManager] Sound not found:", soundName)
    end
end

function SoundManager:playBGM(bgmName: string)
    -- 기존 BGM 정지
    if self.currentBGM then
        self:fadeOut(self.currentBGM, 1)
    end
    
    local sound = self.sounds[bgmName]
    if sound then
        sound.Volume = 0
        sound:Play()
        self:fadeIn(sound, 1, VOLUME.Music)
        self.currentBGM = sound
    end
end

function SoundManager:stopBGM()
    if self.currentBGM then
        self:fadeOut(self.currentBGM, 1)
        self.currentBGM = nil
    end
end

function SoundManager:fadeIn(sound: Sound, duration: number, targetVolume: number)
    local tween = TweenService:Create(
        sound,
        TweenInfo.new(duration, Enum.EasingStyle.Linear),
        { Volume = targetVolume }
    )
    tween:Play()
end

function SoundManager:fadeOut(sound: Sound, duration: number)
    local tween = TweenService:Create(
        sound,
        TweenInfo.new(duration, Enum.EasingStyle.Linear),
        { Volume = 0 }
    )
    tween:Play()
    tween.Completed:Connect(function()
        sound:Stop()
    end)
end

function SoundManager:playEngine(plane: BasePart)
    if not plane then return end
    
    local engineSound = self.sounds.Engine:Clone()
    engineSound.Looped = true
    engineSound.Volume = VOLUME.SFX * 0.5
    engineSound.Parent = plane
    engineSound:Play()
    
    return engineSound
end

function SoundManager:setMasterVolume(volume: number)
    VOLUME.Master = math.clamp(volume, 0, 1)
    if self.soundGroup then
        self.soundGroup.Volume = VOLUME.Master
    end
end

function SoundManager:setMusicVolume(volume: number)
    VOLUME.Music = math.clamp(volume, 0, 1)
    if self.currentBGM then
        self.currentBGM.Volume = VOLUME.Music
    end
end

function SoundManager:setSFXVolume(volume: number)
    VOLUME.SFX = math.clamp(volume, 0, 1)
end

return SoundManager
