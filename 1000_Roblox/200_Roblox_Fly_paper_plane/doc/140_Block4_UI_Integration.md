# 140_Block4_UI_Integration

> **상위 문서**: [[./100_Product_PRD_Roblox_Fly_Paper_Plane|Product PRD]]
> **방법론**: [[../../doc/Roblox_Dev Methodology/203_VCR_개발방법론_v1.1|VCR 개발방법론 v1.1]]
> **Block 번호**: Block 4
> **상태**: ⬜ 미시작

---

<!-- AI_CONTEXT
Project: Roblox Fly Paper Plane
Level: Block
Block: 4 - UI/UX Integration
Purpose: 게임 화면 및 사용자 인터페이스
Parent: Product PRD (100)
Test: Module (Block 전체 동작 확인)
-->

## 📦 Block 기본 정보

| 항목 | 내용 |
|:---|:---|
| **Block 번호** | Block 4 |
| **Block 명** | UI/UX 통합 시스템 (UI/UX Integration) |
| **책임** | 메인 로비, 게임 HUD, 결과 화면, 3D 환경 |
| **예상 기간** | 3일 |

---

## 🎯 Block 목표

### 비즈니스 임팩트
플레이어가 직관적인 UI로 게임을 즐기고, 시각적으로 매력적인 환경에서 비행할 수 있음

### 완료 기준 (DoD)
- [ ] 모든 Feature 완료
- [ ] UI 반응성 테스트 통과
- [ ] 3D 환경 60 FPS 유지
- [ ] Block 1-3과 통합 완료

---

## 📂 Rojo 구조

```
src/client/Block4_UI/
├── init.client.lua
├── Feature1_Lobby/
│   ├── init.lua
│   ├── LobbyUI.lua
│   └── StartButton.lua
├── Feature2_HUD/
│   ├── init.lua
│   ├── TimerDisplay.lua
│   ├── SpeedIndicator.lua
│   └── Minimap.lua
├── Feature3_Result/
│   ├── init.lua
│   ├── ResultScreen.lua
│   └── RetryButton.lua
└── Feature4_Environment/
    ├── init.lua
    ├── CourseSetup.lua
    └── Skybox.lua
```

---

## ⚙️ Feature 4.1: 메인 로비

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 4.1 |
| **기능 설명** | 게임 시작 대기, 설정, 리더보드 접근 |
| **예상 기간** | 0.5일 |

### 수용 기준 (Acceptance Criteria)
- [ ] "시작" 버튼으로 게임 시작
- [ ] 리더보드 버튼으로 순위 확인
- [ ] 설정 버튼 (볼륨 등)

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 4.1.1 | ScreenGui 및 로비 레이아웃 | 1h | ⬜ |
| 4.1.2 | 시작 버튼 및 이벤트 연결 | 0.5h | ⬜ |
| 4.1.3 | 리더보드 버튼 | 0.5h | ⬜ |
| 4.1.4 | 설정 패널 (선택) | 0.5h | ⬜ |
| 4.1.5 | 로비 UI Integration Test | 0.5h | ⬜ |

---

## ⚙️ Feature 4.2: 게임 HUD

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 4.2 |
| **기능 설명** | 타이머, 속도계, 미니맵 표시 |
| **예상 기간** | 1일 |

### 수용 기준 (Acceptance Criteria)
- [ ] 실시간 타이머 표시 (MM:SS.ms)
- [ ] 현재 속도 표시
- [ ] 간단한 미니맵 (선택)

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 4.2.1 | HUD 레이아웃 설계 | 1h | ⬜ |
| 4.2.2 | 타이머 표시 (Block 2 연동) | 1h | ⬜ |
| 4.2.3 | 속도계 표시 (Block 1 연동) | 1h | ⬜ |
| 4.2.4 | 미니맵 구현 (선택) | 1h | ⬜ |
| 4.2.5 | HUD Integration Test | 0.5h | ⬜ |

### Task 상세

#### Task 4.2.2: 타이머 표시
```lua
-- TimerDisplay.lua
local TimerDisplay = {}

function TimerDisplay:update(elapsedTime: number)
    local minutes = math.floor(elapsedTime / 60)
    local seconds = math.floor(elapsedTime % 60)
    local ms = math.floor((elapsedTime % 1) * 100)
    
    self.label.Text = string.format("%02d:%02d.%02d", minutes, seconds, ms)
end

return TimerDisplay
```

---

## ⚙️ Feature 4.3: 결과 화면

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 4.3 |
| **기능 설명** | 완주 후 기록 표시, 재시작/리더보드 옵션 |
| **예상 기간** | 0.5일 |

### 수용 기준 (Acceptance Criteria)
- [ ] 완주 기록 표시
- [ ] 최고 기록 비교
- [ ] 재시작 버튼
- [ ] 리더보드 버튼

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 4.3.1 | 결과 화면 레이아웃 | 1h | ⬜ |
| 4.3.2 | 기록 표시 (Block 2 연동) | 0.5h | ⬜ |
| 4.3.3 | 최고 기록 비교 표시 | 0.5h | ⬜ |
| 4.3.4 | 재시작/리더보드 버튼 | 0.5h | ⬜ |
| 4.3.5 | 결과 화면 Integration Test | 0.5h | ⬜ |

---

## ⚙️ Feature 4.4: 3D 환경

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 4.4 |
| **기능 설명** | 코스 모델, 스카이박스, 이펙트 |
| **예상 기간** | 1일 |

### 수용 기준 (Acceptance Criteria)
- [ ] 매력적인 3D 코스 환경
- [ ] 하늘/배경 설정
- [ ] 비행기 이펙트 (선택)

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 4.4.1 | 코스 3D 모델 배치 | 1.5h | ⬜ |
| 4.4.2 | 스카이박스/조명 설정 | 1h | ⬜ |
| 4.4.3 | 장애물 모델 배치 (Python 자동화) | 1h | ⬜ |
| 4.4.4 | 비행기 트레일 이펙트 (선택) | 1h | ⬜ |
| 4.4.5 | 환경 Integration Test | 0.5h | ⬜ |

---

## 🧪 Block 통합 테스트

### 테스트 시나리오
```
Given: 플레이어가 로비에 있음
When: 시작 → 게임플레이 (HUD 확인) → 골인 → 결과 화면
Then: 모든 UI가 정상 표시되고 기능 동작함
```

---

## 📝 진행 상황

| Feature | 상태 | 진행률 |
|:---|:---:|:---:|
| Feature 4.1 메인 로비 | ⬜ | 0% |
| Feature 4.2 게임 HUD | ⬜ | 0% |
| Feature 4.3 결과 화면 | ⬜ | 0% |
| Feature 4.4 3D 환경 | ⬜ | 0% |

---

**VCR Methodology v1.1 - Block 4**
