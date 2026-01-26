# 150_Debugging_Log

> **프로젝트**: Roblox Fly Paper Plane
> **방법론**: [[../../doc/Roblox_Dev Methodology/203_VCR_개발방법론_v1.1|VCR 개발방법론 v1.1]]
> **마지막 업데이트**: 2026-01-25

---

<!-- AI_CONTEXT
Project: Roblox Fly Paper Plane
Level: Task/Feature
Purpose: 디버깅 과정 문서화 및 교훈 축적
Importance: VCR Layer 5 (ITERATE & DOCUMENT) 핵심
-->

## 📋 프로젝트 정보

| 항목 | 내용 |
|:---|:---|
| **프로젝트명** | Roblox Fly Paper Plane |
| **현재 Block** | 미시작 |
| **마지막 업데이트** | 2026-01-25 |

---

## 🐛 이슈 목록

| # | 증상 | 상태 | 영향도 |
|:---:|:---|:---:|:---:|
| 1 | 스타트 버튼 클릭 시 비행기에 탑승하지 않고 바닥으로 떨어짐 | ✅ 해결됨 | 높음 |

---

### Issue #1: 스타트 버튼 클릭 시 비행기 탑승 실패

#### 기본 정보
| 항목 | 내용 |
|:---|:---|
| **발생 시점** | 2026-01-26 22:06 |
| **관련 Feature** | Feature 1.1 비행기 탑승 |
| **영향도** | 높음 |
| **상태** | ✅ 해결됨 |

#### 증상
스타트 버튼을 클릭하면 비행기에 탑승하지 않고 캐릭터가 바닥을 통과하여 떨어짐. 비행기 컨트롤 불가.

#### 원인 분석
| 원인 | 파일 | 설명 |
|:---|:---|:---|
| `seat:Sit()` 클라이언트 호출 | LobbyUI.client.lua | Roblox에서 Sit()은 서버에서만 작동 |
| BodyVelocity Y축만 설정 | LobbyUI.client.lua | `MaxForce = (0, huge, 0)` → 전진 불가 |
| 물리 객체 중복 생성 | FlightPhysics.lua | 기존 있어도 새로 생성 → 충돌 |
| 비행 시작 미호출 | init.client.lua | `startFlight()` 자동 연결 없음 |

#### 해결 방법
```lua
-- 1. 서버에서 Sit 처리 (init.server.lua)
sitPlayer.OnServerEvent:Connect(function(player, seatPart)
    seatPart:Sit(humanoid)
end)

-- 2. BodyVelocity 전축 확장 (LobbyUI.client.lua)
bv.MaxForce = Vector3.new(math.huge, math.huge, math.huge)

-- 3. 기존 물리 객체 재사용 (FlightPhysics.lua)
local bodyVelocity = self.plane:FindFirstChild("FlightVelocity")
if not bodyVelocity then
    bodyVelocity = Instance.new("BodyVelocity")
end
```

#### 교훈
> 💡 **Roblox에서 VehicleSeat:Sit()은 반드시 서버 스크립트에서 호출해야 합니다!**
> 💡 BodyVelocity의 MaxForce는 제어하려는 모든 축에 대해 설정해야 합니다.

---

## Issue Template

### Issue #N: [증상 요약]

#### 기본 정보
| 항목 | 내용 |
|:---|:---|
| **발생 시점** | [날짜/시간] |
| **관련 Feature** | Feature [N.M] |
| **영향도** | [높음/중간/낮음] |
| **상태** | ⬜ 미해결 / ✅ 해결됨 |

#### 증상
[무엇이 잘못되었는지 상세 설명]

```lua
-- 문제 발생 코드 (있다면)
```

#### Output 로그
```
[에러 메시지 또는 경고 복사]
```

#### 원인 분석
[왜 이 문제가 발생했는지 분석]

#### 해결 방법
```lua
-- 수정된 코드
```

#### 교훈
> 💡 [다음에 기억해야 할 핵심 포인트]

---

## 📚 축적된 교훈 (Lessons Learned)

### Rojo 관련
- [ ] (개발 중 추가)

### Luau 코딩
- [ ] (개발 중 추가)

### Studio 관련
- [ ] (개발 중 추가)

### Server/Client
- [ ] (개발 중 추가)

### 비행 물리
- [ ] (개발 중 추가)

### UI/UX
- [ ] (개발 중 추가)

---

## 🔧 자주 사용하는 디버깅 패턴

### 1. Print 디버깅
```lua
print("[DEBUG] Variable:", someVariable)
print("[DEBUG] Type:", typeof(someVariable))
print("[DEBUG] Function called at:", tick())
```

### 2. 조건부 로그
```lua
local DEBUG_MODE = true

local function debugLog(...)
    if DEBUG_MODE then
        print("[DEBUG]", ...)
    end
end
```

### 3. Output 필터링
- `[ERROR]` - 에러
- `[WARN]` - 경고
- `[DEBUG]` - 디버그
- `[INFO]` - 정보

---

## 📝 체크리스트 (디버깅 시작 전)

- [ ] Output 창 열기
- [ ] 에러 메시지 확인
- [ ] 관련 스크립트 위치 파악
- [ ] Rojo 동기화 상태 확인
- [ ] Play Mode vs Edit Mode 확인

---

**VCR Methodology v1.1 - Debugging Log**
