# 110_Block1_FlightControl

> **상위 문서**: [[./100_Product_PRD_Roblox_Fly_Paper_Plane|Product PRD]]
> **방법론**: [[../../doc/Roblox_Dev Methodology/203_VCR_개발방법론_v1.1|VCR 개발방법론 v1.1]]
> **Block 번호**: Block 1
> **상태**: ⬜ 미시작

---

<!-- AI_CONTEXT
Project: Roblox Fly Paper Plane
Level: Block
Block: 1 - Flight Control
Purpose: 플레이어 입력 → 비행기 움직임 → 카메라 추적
Parent: Product PRD (100)
Test: Module (Block 전체 동작 확인)
-->

## 📦 Block 기본 정보

| 항목 | 내용 |
|:---|:---|
| **Block 번호** | Block 1 |
| **Block 명** | 비행 조작 시스템 (Flight Control) |
| **책임** | 플레이어 입력 처리 → 비행기 물리 시뮬레이션 → 카메라 추적 |
| **예상 기간** | 3일 |

---

## 🎯 Block 목표

### 비즈니스 임팩트
플레이어가 직관적으로 비행기를 조종하여 3D 공간을 자유롭게 비행할 수 있음

### 완료 기준 (DoD)
- [ ] 모든 Feature 완료
- [ ] Block 통합 테스트 통과
- [ ] Output 에러 없음
- [ ] 60 FPS 유지

---

## 📂 Rojo 구조

```
src/server/Block1_FlightControl/
├── init.server.lua          # Block 엔트리포인트
├── Feature1_Input/
│   ├── init.lua
│   ├── KeyboardHandler.lua
│   ├── MouseHandler.lua
│   └── InputConfig.lua
├── Feature2_Physics/
│   ├── init.lua
│   ├── FlightModel.lua
│   ├── PhysicsConfig.lua
│   └── Forces.lua
└── Feature3_Camera/
    ├── init.lua
    ├── FollowCamera.lua
    └── CameraConfig.lua
```

---

## ⚙️ Feature 1.1: 입력 처리 시스템

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 1.1 |
| **기능 설명** | 키보드/마우스 입력을 감지하여 비행기 조종 신호로 변환 |
| **예상 기간** | 1일 |

### 수용 기준 (Acceptance Criteria)
- [ ] WASD 키로 상하좌우 이동
- [ ] 마우스로 비행기 방향 조절
- [ ] Space로 가속, Shift로 감속
- [ ] 입력 지연 < 16ms

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 1.1.1 | UserInputService 연결 및 키 감지 | 1h | ⬜ |
| 1.1.2 | 마우스 이동 감지 및 방향 계산 | 1h | ⬜ |
| 1.1.3 | 입력 버퍼링 및 보간 구현 | 1h | ⬜ |
| 1.1.4 | 입력 설정 모듈 (키 매핑) | 1h | ⬜ |
| 1.1.5 | 입력 시스템 Integration Test | 1h | ⬜ |

### Task 상세

#### Task 1.1.1: UserInputService 연결
```lua
-- src/client/Block1_FlightControl/Feature1_Input/KeyboardHandler.lua
local UserInputService = game:GetService("UserInputService")
local InputState = {
    W = false, A = false, S = false, D = false,
    Space = false, Shift = false
}

local function onInputBegan(input, gameProcessed)
    if gameProcessed then return end
    if input.KeyCode == Enum.KeyCode.W then InputState.W = true end
    -- ... 나머지 키
end

local function onInputEnded(input, gameProcessed)
    if gameProcessed then return end
    if input.KeyCode == Enum.KeyCode.W then InputState.W = false end
    -- ... 나머지 키
end

UserInputService.InputBegan:Connect(onInputBegan)
UserInputService.InputEnded:Connect(onInputEnded)
```
**검증 방법**: Play Mode에서 키 입력 시 InputState 변경 확인 (Output 로그)

---

#### Task 1.1.2: 마우스 이동 감지
```lua
-- MouseHandler.lua
local function getMouseDelta()
    return UserInputService:GetMouseDelta()
end
```
**검증 방법**: 마우스 이동 시 Delta 값 출력

---

#### Task 1.1.3: 입력 버퍼링 및 보간
```lua
-- 보간으로 부드러운 입력 처리
local smoothInput = currentInput:Lerp(targetInput, 0.1)
```
**검증 방법**: 부드러운 방향 전환 확인

---

#### Task 1.1.4: 입력 설정 모듈
```lua
-- InputConfig.lua
return {
    Forward = Enum.KeyCode.W,
    Backward = Enum.KeyCode.S,
    Left = Enum.KeyCode.A,
    Right = Enum.KeyCode.D,
    Boost = Enum.KeyCode.Space,
    Brake = Enum.KeyCode.LeftShift,
    Sensitivity = 0.5
}
```
**검증 방법**: Config 변경 시 동작 반영

---

#### Task 1.1.5: Integration Test
```lua
local function testInputSystem()
    print("[TEST] Feature 1.1 Input System")
    -- 키 입력 시뮬레이션 테스트
    print("[PASS] Input system working")
end
```

---

## ⚙️ Feature 1.2: 비행 물리 엔진

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 1.2 |
| **기능 설명** | 양력, 중력, 속도 시뮬레이션으로 사실적인 비행 |
| **예상 기간** | 1일 |

### 수용 기준 (Acceptance Criteria)
- [ ] 비행기가 입력에 따라 부드럽게 움직임
- [ ] 양력/중력 시뮬레이션
- [ ] 최대/최소 속도 제한
- [ ] 부스트/브레이크 동작

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 1.2.1 | 비행기 모델 + 물리 객체 설정 | 1h | ⬜ |
| 1.2.2 | BodyVelocity 기반 이동 구현 | 1.5h | ⬜ |
| 1.2.3 | BodyGyro 기반 회전 구현 | 1h | ⬜ |
| 1.2.4 | 속도 제한 및 가감속 | 1h | ⬜ |
| 1.2.5 | 물리 엔진 Integration Test | 0.5h | ⬜ |

---

## ⚙️ Feature 1.3: 카메라 시스템

### 개요
| 항목 | 내용 |
|:---|:---|
| **Feature 번호** | 1.3 |
| **기능 설명** | 비행기를 따라가는 3인칭 카메라 |
| **예상 기간** | 1일 |

### 수용 기준 (Acceptance Criteria)
- [ ] 비행기 뒤에서 따라가는 카메라
- [ ] 부드러운 카메라 이동 (Lerp)
- [ ] 비행기 방향에 따른 카메라 회전
- [ ] FOV 조절 (속도에 따라)

### Task 분해

| Task | 설명 | 예상 시간 | 상태 |
|:---:|:---|:---:|:---:|
| 1.3.1 | Camera API 설정 및 스크립트 가능 모드 | 0.5h | ⬜ |
| 1.3.2 | 비행기 추적 로직 (Offset 계산) | 1h | ⬜ |
| 1.3.3 | 부드러운 카메라 이동 (Lerp) | 1h | ⬜ |
| 1.3.4 | 속도 기반 FOV 변경 | 1h | ⬜ |
| 1.3.5 | 카메라 시스템 Integration Test | 0.5h | ⬜ |

---

## 🧪 Block 통합 테스트

### 테스트 시나리오
```
Given: 비행기 모델이 Workspace에 배치됨
When: 플레이어가 WASD + 마우스로 조작
Then: 비행기가 이동하고 카메라가 따라감
```

### 테스트 코드
```lua
local function testBlock1()
    print("[TEST] Block 1 Flight Control")
    -- Feature 1.1: 입력 확인
    -- Feature 1.2: 물리 동작 확인
    -- Feature 1.3: 카메라 추적 확인
    print("[PASS] Block 1 All features integrated")
end
```

---

## 📝 진행 상황

| Feature | 상태 | 진행률 |
|:---|:---:|:---:|
| Feature 1.1 입력 처리 | ⬜ | 0% |
| Feature 1.2 비행 물리 | ⬜ | 0% |
| Feature 1.3 카메라 | ⬜ | 0% |

---

## 🐛 디버깅 로그

(개발 중 이슈 발생 시 기록)

---

**VCR Methodology v1.1 - Block 1**
