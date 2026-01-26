# 120_Block2_GameCore

> **상위 문서**: [[./100_Product_PRD_Roblox_Fly_Paper_Plane|Product PRD]]
> **방법론**: [[../../doc/Roblox_Dev Methodology/203_VCR_개발방법론_v1.1|VCR 개발방법론 v1.1]]
> **Block 번호**: Block 2
> **상태**: ⬜ 미시작

---

<!-- AI_CONTEXT
Project: Roblox Fly Paper Plane
Level: Block
Block: 2 - Game Core
Purpose: 게임 진행 관리 (시작 → 플레이 → 골인)
Parent: Product PRD (100)
Test: Module (Block 전체 동작 확인)
-->

## 📦 Block 기본 정보

| 항목 | 내용 |
|:---|:---|
| **Block 번호** | Block 2 |
| **Block 명** | 게임 코어 시스템 (Game Core) |
| **책임** | 코스 관리, 타이머, 충돌 감지, 게임 상태 관리 |
| **예상 기간** | 3일 |

---

## 🎯 Block 목표

### 비즈니스 임팩트
플레이어가 시작점에서 골인점까지 타임어택으로 도전하며, 기록이 정확히 측정됨

### 완료 기준 (DoD)
- [ ] 모든 Feature 완료
- [ ] Block 통합 테스트 통과
- [ ] 0.01초 정밀도 타이머 동작
- [ ] 충돌 감지 정확성 100%

---

## 📂 Rojo 구조

```
src/server/Block2_GameCore/
├── init.server.lua
├── Feature1_Course/
│   ├── init.lua
│   ├── CourseManager.lua
│   ├── StartPoint.lua
│   └── FinishPoint.lua
├── Feature2_Timer/
│   ├── init.lua
│   ├── TimerManager.lua
│   └── TimeFormatter.lua
└── Feature3_Collision/
    ├── init.lua
    ├── CollisionHandler.lua
    └── GameState.lua
```

---

## ⚙️ Feature 2.1: 코스 관리 시스템

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 2.1 |
| **기능 설명** | 시작점, 골인점, 장애물 배치 및 관리 |
| **예상 기간** | 1일 |

### 수용 기준 (Acceptance Criteria)
- [ ] 시작점에서 자동 스폰
- [ ] 골인점 도달 시 완주 처리
- [ ] 장애물 배치 시스템
- [ ] 코스 리셋 기능

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 2.1.1 | 시작점 모델 및 스폰 로직 | 1h | ⬜ |
| 2.1.2 | 골인점 모델 및 완주 감지 | 1h | ⬜ |
| 2.1.3 | 장애물 배치 (Python 자동화) | 1.5h | ⬜ |
| 2.1.4 | 코스 리셋/재시작 로직 | 1h | ⬜ |
| 2.1.5 | 코스 시스템 Integration Test | 0.5h | ⬜ |

---

## ⚙️ Feature 2.2: 타이머 & 기록 시스템

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 2.2 |
| **기능 설명** | 0.01초 단위 정밀 시간 측정 |
| **예상 기간** | 1일 |

### 수용 기준 (Acceptance Criteria)
- [ ] 시작점 통과 시 타이머 시작
- [ ] 골인점 도달 시 타이머 정지
- [ ] 0.01초 정밀도 측정
- [ ] 기록 서버 저장 (Block 3 연동)

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 2.2.1 | tick() 기반 고정밀 타이머 구현 | 1h | ⬜ |
| 2.2.2 | 타이머 시작/정지/리셋 로직 | 1h | ⬜ |
| 2.2.3 | 시간 포맷팅 (MM:SS.ms) | 0.5h | ⬜ |
| 2.2.4 | 기록 저장 이벤트 발생 | 1h | ⬜ |
| 2.2.5 | 타이머 시스템 Integration Test | 0.5h | ⬜ |

### Task 상세

#### Task 2.2.1: 고정밀 타이머
```lua
-- TimerManager.lua
local TimerManager = {}
TimerManager.__index = TimerManager

function TimerManager.new()
    return setmetatable({
        startTime = 0,
        isRunning = false,
        elapsedTime = 0
    }, TimerManager)
end

function TimerManager:start()
    self.startTime = tick()
    self.isRunning = true
end

function TimerManager:stop()
    if self.isRunning then
        self.elapsedTime = tick() - self.startTime
        self.isRunning = false
    end
    return self.elapsedTime
end

function TimerManager:getElapsed()
    if self.isRunning then
        return tick() - self.startTime
    end
    return self.elapsedTime
end

return TimerManager
```

---

## ⚙️ Feature 2.3: 충돌 감지 & 게임 상태

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 2.3 |
| **기능 설명** | 장애물/골인 충돌 감지 및 게임 상태 전환 |
| **예상 기간** | 1일 |

### 수용 기준 (Acceptance Criteria)
- [ ] 장애물 충돌 시 리스폰
- [ ] 골인점 충돌 시 완주 처리
- [ ] 게임 상태 (Ready/Playing/Finished)
- [ ] 상태 전환 이벤트

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 2.3.1 | Touched 이벤트 기반 충돌 감지 | 1h | ⬜ |
| 2.3.2 | 충돌 유형 구분 (장애물/골인) | 1h | ⬜ |
| 2.3.3 | 게임 상태 머신 구현 | 1h | ⬜ |
| 2.3.4 | 리스폰/리셋 로직 | 1h | ⬜ |
| 2.3.5 | 충돌/상태 Integration Test | 0.5h | ⬜ |

---

## 🧪 Block 통합 테스트

### 테스트 시나리오
```
Given: 코스와 타이머가 준비됨
When: 플레이어가 시작점 → 장애물 회피 → 골인점 도달
Then: 정확한 기록이 측정되고 완주 처리됨
```

---

## 📝 진행 상황

| Feature | 상태 | 진행률 |
|:---|:---:|:---:|
| Feature 2.1 코스 관리 | ⬜ | 0% |
| Feature 2.2 타이머 | ⬜ | 0% |
| Feature 2.3 충돌/상태 | ⬜ | 0% |

---

**VCR Methodology v1.1 - Block 2**
