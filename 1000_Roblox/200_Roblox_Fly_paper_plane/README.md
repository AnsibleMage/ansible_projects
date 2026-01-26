# ✈️ Roblox Fly Paper Plane

> **프로젝트 상태**: 🔴 개발 중 (비행기 탑승 버그 미해결)  
> **마지막 업데이트**: 2026-01-26 22:39  
> **Rojo 버전**: 7.7.0-rc.1

---

## 📋 프로젝트 개요

종이비행기를 날리는 Roblox 게임입니다. 플레이어가 스타트 버튼을 클릭하면 비행기에 탑승하여 1인칭 시점으로 비행합니다.

---

## 🗂️ 프로젝트 구조

```
src/
├── StarterGui/
│   └── LobbyUI.client.lua      # 로비 UI + 비행기 생성 + 탑승 로직
├── client/
│   ├── init.client.lua          # 클라이언트 진입점
│   ├── Block1_FlightControl/
│   │   ├── init.lua             # 비행 컨트롤러 메인
│   │   ├── FlightPhysics.lua    # 비행 물리 엔진 (BodyVelocity/BodyGyro)
│   │   ├── FlightCamera.lua     # 1인칭/3인칭 카메라
│   │   └── InputHandler.lua     # 키보드/마우스 입력
│   ├── Block2_GameClient/
│   └── Block4_UI/
├── server/
│   ├── init.server.lua          # 서버 진입점 + RemoteEvents
│   ├── Block1_FlightControl/
│   ├── Block2_GameCore/
│   └── Block3_Social/
└── shared/
    ├── Config.lua
    ├── PlaneModel.lua           # 비행기 모델 생성
    ├── CourseBuilder.lua
    ├── EffectsManager.lua
    └── SoundManager.lua
```

---

## 🔴 현재 버그 상태

### 핵심 버그: 비행기 탑승 실패

| 증상 | 설명 |
|------|------|
| **현상** | 스타트 버튼 클릭 시 비행기에 탑승하지 않고 캐릭터가 바닥을 통과하여 떨어짐 |
| **예상 동작** | 비행기에 탑승 → 1인칭 시점 전환 → WASD로 비행 컨트롤 |
| **실제 동작** | 캐릭터가 허공에서 바닥으로 추락 |

---

## 🔍 시도한 수정 사항 (2026-01-26)

### 1. 서버에서 Sit 처리 추가
**파일**: `src/server/init.server.lua`
```lua
-- SitPlayer 이벤트 추가 (139~154 라인)
sitPlayer.OnServerEvent:Connect(function(player, seatPart)
    seatPart:Sit(humanoid)
end)
```

### 2. BodyVelocity 전축 확장
**파일**: `src/StarterGui/LobbyUI.client.lua` (119 라인)
```lua
-- 변경 전: Y축만
bv.MaxForce = Vector3.new(0, math.huge, 0)

-- 변경 후: 모든 축
bv.MaxForce = Vector3.new(math.huge, math.huge, math.huge)
```

### 3. LobbyUI에서 서버로 앉히기 요청
**파일**: `src/StarterGui/LobbyUI.client.lua` (167~178 라인)
```lua
-- seat:Sit(humanoid) 대신 서버로 이벤트 발송
sitEvent:FireServer(seat)
```

### 4. FlightPhysics 중복 방지
**파일**: `src/client/Block1_FlightControl/FlightPhysics.lua` (45~72 라인)
```lua
-- 기존 물리 객체가 있으면 재사용
local bodyVelocity = self.plane:FindFirstChild("FlightVelocity")
if not bodyVelocity then
    bodyVelocity = Instance.new("BodyVelocity")
end
```

### 5. 게임 상태 변경 시 비행기 재감지
**파일**: `src/client/init.client.lua` (134~148 라인)
```lua
-- Playing 상태가 되면 비행기 다시 찾고 비행 시작
local existingPlane = workspace:FindFirstChild("PaperPlane")
```

---

## ❓ 확인이 필요한 사항

### 1. RemoteEvents가 제대로 생성되는지?
```lua
-- 서버 Output에서 확인
[Server] RemoteEvents setup complete
[Server] SitPlayer request from: [플레이어명]
[Server] Player seated successfully!
```

### 2. 클라이언트에서 이벤트가 발송되는지?
```lua
-- 클라이언트 Output에서 확인
[LobbyUI] Start button clicked!
[LobbyUI] Sent SitPlayer request to server
```

### 3. GameStateChanged가 전달되는지?
```lua
-- 클라이언트 Output에서 확인
[Client] Game state changed to: Playing
```

---

## 🎯 다음 에이전트를 위한 디버깅 가이드

### 1단계: Output 로그 확인
Roblox Studio에서 Play 후 Output 창에서 다음 메시지들을 순서대로 확인:

```
[Server] RemoteEvents setup complete    ← 서버 이벤트 생성 확인
[LobbyUI] UI Created successfully!      ← UI 생성 확인
[LobbyUI] Start button clicked!         ← 버튼 클릭 확인
[LobbyUI] Sent SitPlayer request to server  ← 이벤트 발송 확인
[Server] SitPlayer request from: Player1   ← 서버 수신 확인
[Server] Player seated successfully!    ← 앉히기 성공 ← 여기까지 가야 함!
```

### 2단계: 가능한 실패 원인

| 가능성 | 확인 방법 |
|--------|-----------|
| RemoteEvents 폴더가 안 만들어짐 | ReplicatedStorage에 Events 폴더 있는지 확인 |
| SitPlayer 이벤트가 없음 | Events 폴더 안에 SitPlayer 확인 |
| seat가 nil임 | `print(seat)` 추가해서 확인 |
| seat가 서버로 전달 안됨 | 클라이언트에서 생성한 Part는 서버에서 접근 불가 |
| Network Ownership 문제 | 클라이언트가 만든 비행기는 서버에서 제어 불가 |

### 3단계: 핵심 의심 원인

> ⚠️ **가장 가능성 높은 원인**: 클라이언트에서 생성한 비행기(Part)는 서버에서 접근할 수 없음!

**해결 방향**:
1. 비행기를 **서버에서 생성**하고 클라이언트로 전달
2. 또는 **클라이언트에서 직접 CFrame으로 캐릭터를 비행기 위치에 고정**
3. 또는 **VehicleSeat 대신 Humanoid:MoveTo() + 카메라 수동 제어**

---

## 🚀 Rojo 서버 실행 방법

```bash
cd /Users/changjaeyou/Documents/AnsibleMage/ansible_projects/1000_Roblox/200_Roblox_Fly_paper_plane
/Users/changjaeyou/.aftman/bin/rojo serve default.project.json
```

서버 주소: `localhost:34872`

---

## 📁 관련 문서

- [150_Debugging_Log.md](doc/150_Debugging_Log.md) - 디버깅 기록
- [100_Product_PRD_Roblox_Fly_Paper_Plane.md](doc/100_Product_PRD_Roblox_Fly_Paper_Plane.md) - 제품 요구사항
- [110_Block1_FlightControl.md](doc/110_Block1_FlightControl.md) - 비행 컨트롤 설계

---

## 📝 다음 작업 TODO

- [ ] Output 로그에서 어디까지 성공하는지 확인
- [ ] 클라이언트에서 생성한 seat가 서버로 전달되는지 확인
- [ ] 비행기를 서버에서 생성하도록 구조 변경 검토
- [ ] 또는 클라이언트에서 직접 캐릭터 고정 방식으로 변경

---

**VCR Methodology v1.1 - Project README**
