# 130_Block3_Social

> **상위 문서**: [[./100_Product_PRD_Roblox_Fly_Paper_Plane|Product PRD]]
> **방법론**: [[../../doc/Roblox_Dev Methodology/203_VCR_개발방법론_v1.1|VCR 개발방법론 v1.1]]
> **Block 번호**: Block 3
> **상태**: ⬜ 미시작

---

<!-- AI_CONTEXT
Project: Roblox Fly Paper Plane
Level: Block
Block: 3 - Social System
Purpose: 플레이어 기록 및 리더보드 관리
Parent: Product PRD (100)
Test: Module (Block 전체 동작 확인)
-->

## 📦 Block 기본 정보

| 항목 | 내용 |
|:---|:---|
| **Block 번호** | Block 3 |
| **Block 명** | 소셜 시스템 (Social System) |
| **책임** | 플레이어 인증, 기록 저장, 리더보드 관리 |
| **예상 기간** | 2일 |

---

## 🎯 Block 목표

### 비즈니스 임팩트
플레이어 기록이 저장되고, 글로벌 리더보드에서 경쟁할 수 있음

### 완료 기준 (DoD)
- [ ] 모든 Feature 완료
- [ ] DataStore 저장/조회 정상
- [ ] 리더보드 Top 100 표시
- [ ] 보안 검증 (서버 권한)

---

## 📂 Rojo 구조

```
src/server/Block3_Social/
├── init.server.lua
├── Feature1_Auth/
│   ├── init.lua
│   └── PlayerAuth.lua
├── Feature2_Leaderboard/
│   ├── init.lua
│   ├── LeaderboardManager.lua
│   └── RankCalculator.lua
└── Feature3_Records/
    ├── init.lua
    ├── RecordStore.lua
    └── RecordValidator.lua
```

---

## ⚙️ Feature 3.1: 플레이어 인증

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 3.1 |
| **기능 설명** | Roblox UserId 기반 자동 인증 |
| **예상 기간** | 0.5일 |

### 수용 기준 (Acceptance Criteria)
- [ ] 플레이어 입장 시 자동 인증
- [ ] UserId로 고유 식별
- [ ] DisplayName 표시용 저장

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 3.1.1 | PlayerAdded 이벤트 연결 | 0.5h | ⬜ |
| 3.1.2 | UserId 및 DisplayName 추출 | 0.5h | ⬜ |
| 3.1.3 | 플레이어 세션 관리 | 0.5h | ⬜ |
| 3.1.4 | 재접속 처리 | 0.5h | ⬜ |
| 3.1.5 | 인증 시스템 Integration Test | 0.5h | ⬜ |

---

## ⚙️ Feature 3.2: 리더보드 시스템

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 3.2 |
| **기능 설명** | Top 100 리더보드 표시 및 실시간 업데이트 |
| **예상 기간** | 1일 |

### 수용 기준 (Acceptance Criteria)
- [ ] OrderedDataStore 기반 순위
- [ ] Top 100 조회
- [ ] 내 순위 표시
- [ ] 기록 갱신 시 리더보드 업데이트

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 3.2.1 | OrderedDataStore 설정 | 1h | ⬜ |
| 3.2.2 | GetSortedAsync로 Top 100 조회 | 1h | ⬜ |
| 3.2.3 | 내 순위 계산 로직 | 1h | ⬜ |
| 3.2.4 | 리더보드 갱신 이벤트 | 1h | ⬜ |
| 3.2.5 | 리더보드 Integration Test | 0.5h | ⬜ |

### Task 상세

#### Task 3.2.1: OrderedDataStore 설정
```lua
-- LeaderboardManager.lua
local DataStoreService = game:GetService("DataStoreService")
local LeaderboardStore = DataStoreService:GetOrderedDataStore("FlyPaperPlane_Leaderboard")

local LeaderboardManager = {}

function LeaderboardManager:submitScore(userId: number, time: number)
    -- 시간이 작을수록 좋으므로 역순 저장 (10000 - time)
    local invertedTime = math.floor((10000 - time) * 100)  -- 소수점 2자리 보존
    pcall(function()
        LeaderboardStore:UpdateAsync(tostring(userId), function(oldValue)
            if oldValue == nil or invertedTime > oldValue then
                return invertedTime
            end
            return oldValue
        end)
    end)
end

function LeaderboardManager:getTopPlayers(count: number)
    local success, pages = pcall(function()
        return LeaderboardStore:GetSortedAsync(false, count)
    end)
    if not success then return {} end
    
    local currentPage = pages:GetCurrentPage()
    local results = {}
    for rank, entry in ipairs(currentPage) do
        table.insert(results, {
            rank = rank,
            userId = tonumber(entry.key),
            time = (10000 - entry.value / 100)  -- 원래 시간으로 복원
        })
    end
    return results
end

return LeaderboardManager
```

---

## ⚙️ Feature 3.3: 개인 기록 관리

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 3.3 |
| **기능 설명** | 플레이어별 최고 기록 저장/조회/갱신 |
| **예상 기간** | 0.5일 |

### 수용 기준 (Acceptance Criteria)
- [ ] 최고 기록 저장
- [ ] 기록 갱신 시만 업데이트
- [ ] 재접속 시 기록 유지

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 3.3.1 | DataStore 기록 저장 | 1h | ⬜ |
| 3.3.2 | 기록 조회 로직 | 0.5h | ⬜ |
| 3.3.3 | 기록 갱신 비교 | 0.5h | ⬜ |
| 3.3.4 | 에러 핸들링 (DataStore 실패) | 0.5h | ⬜ |
| 3.3.5 | 기록 관리 Integration Test | 0.5h | ⬜ |

---

## 🧪 Block 통합 테스트

### 테스트 시나리오
```
Given: 플레이어가 게임에 입장
When: 골인하여 기록 저장 → 리더보드 조회
Then: 내 기록이 리더보드에 표시됨
```

---

## 📝 진행 상황

| Feature | 상태 | 진행률 |
|:---|:---:|:---:|
| Feature 3.1 플레이어 인증 | ⬜ | 0% |
| Feature 3.2 리더보드 | ⬜ | 0% |
| Feature 3.3 기록 관리 | ⬜ | 0% |

---

**VCR Methodology v1.1 - Block 3**
