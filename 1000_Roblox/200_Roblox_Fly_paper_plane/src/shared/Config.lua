-- Ansible Fly Paper Plane - Shared Config
-- 게임 전체 설정값
-- 🎉 Rojo 연결 테스트 성공! (2026-01-25 17:52)
-- ✈️ VehicleSeat 추가됨! Sync Test: 18:24

local Config = {
    -- 게임 정보
    GAME_NAME = "Ansible Fly Paper Plane",
    VERSION = "1.0.0",
    
    -- 비행 설정 (Block 1)
    FLIGHT = {
        MAX_SPEED = 100,
        MIN_SPEED = 10,
        ACCELERATION = 5,
        TURN_SPEED = 2,
        GRAVITY = -50,
    },
    
    -- 게임 설정 (Block 2)
    GAME = {
        TIMER_PRECISION = 0.01,  -- 0.01초 단위
        RESPAWN_DELAY = 1,       -- 충돌 후 리스폰 딜레이
    },
    
    -- 리더보드 설정 (Block 3)
    LEADERBOARD = {
        TOP_COUNT = 100,
        DATASTORE_NAME = "FlyPaperPlane_Leaderboard",
    },
    
    -- UI 설정 (Block 4)
    UI = {
        HUD_UPDATE_RATE = 0.05,  -- 20 FPS HUD 업데이트
    },
}

return Config
