# 121_Phase 4: UI/UX & 감각 경험 강화 PRD

> **문서 유형**: Product Requirements Document (Phase 4)
> **작성일**: 2026-02-07
> **작성자**: requirements_analyst (GameDevChain)
> **이전 Phase**: Phase 3 극한 점프맵 완료 (2026-01-25 런칭)
> **상태**: 승인 대기

---

## 1. Phase 4 개요

### 1.1 테마
**"UI/UX & 감각 경험 강화"** -- 기존 백엔드 시스템(RankingService, ShopService, CheckpointService)을 활용하여 플레이어가 보고, 듣고, 느끼는 프론트엔드 경험을 완성한다.

### 1.2 배경 및 동기
Phase 1~3을 통해 핵심 게임플레이(25개 극한 점프 플랫폼, 타임어택, 체크포인트/일반 모드 분기, 코인 경제, 랭킹)가 모두 구현되었다. 그러나 현재 상태에서 플레이어가 체감할 수 있는 피드백이 부족하다:

| 백엔드 시스템 | 현재 상태 | Phase 4 목표 |
|:---|:---|:---|
| **RankingService** | OrderedDataStore + Top 100 캐시 완료 | 리더보드 GUI 연동 |
| **ShopService** | 코인 경제 + 10개 아이템 + RemoteEvent 전부 완료 | Shop GUI 완성 (이미 `ShopGui.client.luau` 초기 구현 존재) |
| **CheckpointService** | CP-1~4 순차활성화 + DataStore 저장 완료 | 체크포인트 시각 피드백 UI |
| **RaceEngine** | 타이머 + 모드 분기 + 코인 지급 완료 | 완주 축하 연출, 사운드 연동 |
| **DeathZone** | Dual Detection 완료 | 낙하 파티클, 사망음 효과 |

### 1.3 목표 (5개, 구체적 & 측정 가능)

| # | 목표 | 측정 기준 |
|:---|:---|:---|
| **G-1** | 리더보드 UI로 Top 10 실시간 표시 | RankingService.GetTopN(10)과 연동, 60초 자동 갱신 확인 |
| **G-2** | Shop GUI 완성도를 프로덕션 레벨로 향상 | 모든 카테고리(4종) 탐색, 구매, 장착, 확인 다이얼로그 정상 동작 |
| **G-3** | 체크포인트 활성화 시각/청각 피드백 제공 | CP-1~4 각각 색상 변화 + 파티클 + 효과음 트리거 확인 |
| **G-4** | 사운드 시스템 구축 (BGM + SFX 5종 이상) | BGM 루프 재생, 점프/착지/완주/사망/체크포인트 효과음 재생 확인 |
| **G-5** | 모바일 호환 UI/UX 보장 | 모든 UI가 터치 입력으로 작동, 버튼 최소 48x48px, 화면 비율 16:9 및 4:3 대응 |

---

## 2. 기능 요구사항

### 2.1 우선순위 분류

| 우선순위 | 기능 | 기존 백엔드 의존 | 예상 시간 |
|:---|:---|:---|:---|
| **P0 (필수)** | F-01 리더보드 UI | RankingService | 30분 |
| **P0 (필수)** | F-02 Shop GUI 완성 | ShopService (이미 초기 구현 존재) | 25분 |
| **P0 (필수)** | F-03 체크포인트 UI | CheckpointService | 25분 |
| **P1 (중요)** | F-04 사운드 시스템 | RaceEngine, DeathZone | 30분 |
| **P1 (중요)** | F-05 파티클 효과 시스템 | CheckpointService, DeathZone | 20분 |
| **P2 (선택)** | F-06 발판 난이도 시각 피드백 | 없음 (순수 클라이언트) | 15분 |
| **P2 (선택)** | F-07 튜토리얼 시스템 | 없음 (순수 클라이언트) | 20분 |

---

## 3. P0 기능 상세 스펙

### 3.1 F-01: 리더보드 UI

#### 3.1.1 기능 설명
RankingService의 Top 10 데이터를 화면 우측에 실시간 표시하는 리더보드 GUI. 플레이어 자신의 순위와 기록도 하단에 별도 표시한다.

#### 3.1.2 UI/UX 요구사항

**위치 및 크기:**
- 위치: 화면 우측 상단 (Position = UDim2.new(1, -260, 0, 80))
- 크기: 250 x 380px (UDim2.new(0, 250, 0, 380))
- 최소화 가능: 토글 버튼으로 접기/펼치기

**색상 및 스타일:**
- 배경: Color3.fromRGB(15, 25, 15), BackgroundTransparency = 0.2
- 테두리: UIStroke Color = Color3.fromRGB(58, 125, 21), Thickness = 2
- 헤더: Color3.fromRGB(35, 80, 12), 높이 40px
- 제목: "LEADERBOARD" -- GothamBold, 18pt, 흰색
- 순위 행: 높이 28px, 짝수행 배경 약간 밝게

**순위 행 레이아웃 (각 행):**
```
[순위#] [플레이어 이름]     [기록 mm:ss.ms]
 #1     PlayerName123       01:23.45
```

- 순위 1~3: 금/은/동 색상 강조 (Color3.fromRGB(255,215,0) / (192,192,192) / (205,127,50))
- 자신의 순위: 녹색 하이라이트 배경 (Color3.fromRGB(35, 80, 12))
- 순위 없음: "-- 기록 없음 --" 표시

**하단 개인 순위 영역:**
- 구분선 + "YOUR RANK" 헤더
- 자신의 순위, 이름, 기록 표시
- Top 100 밖일 경우: "100+" 표시

**애니메이션:**
- 토글 시 슬라이드 애니메이션 (0.3초, EasingStyle.Quad)
- 데이터 갱신 시 행 페이드인 (0.2초)

#### 3.1.3 백엔드 연동 방법

**신규 RemoteEvent/RemoteFunction:**

| 이름 | 유형 | 방향 | 용도 |
|:---|:---|:---|:---|
| `GetLeaderboard` | RemoteFunction | Client -> Server | Top 10 + 개인 순위 요청 |
| `LeaderboardUpdate` | RemoteEvent | Server -> Client | 캐시 갱신 시 자동 푸시 (기존 RankingConstants.REMOTE_EVENT_NAME 활용) |

**서버 측 추가 코드 (RaceEngine 또는 별도 init.server.lua):**
```lua
-- RemoteFunction: GetLeaderboard
getLeaderboardRemote.OnServerInvoke = function(player)
    local topN = RankingService.GetTopN(10)
    local playerRank = RankingService.GetPlayerRank(player.UserId)
    return { topN = topN, playerRank = playerRank }
end
```

**클라이언트 측 (LeaderboardGui.client.luau):**
- 진입 시 GetLeaderboard 호출하여 초기 데이터 로드
- LeaderboardUpdate 이벤트 구독하여 자동 갱신
- 60초 간격 폴링 백업 (이벤트 누락 대비)

**데이터 흐름:**
```
Client 진입 → GetLeaderboard:InvokeServer()
    → RankingService.GetTopN(10) + GetPlayerRank(userId)
    → 클라이언트에 {topN, playerRank} 반환
    → GUI 렌더링

RankingService.RefreshCache() 실행 시
    → LeaderboardUpdate:FireAllClients(topN)
    → 모든 클라이언트 GUI 자동 갱신
```

#### 3.1.4 테스트 시나리오

| TC# | 시나리오 | 기대 결과 |
|:---|:---|:---|
| TC-F01-1 | 게임 입장 후 리더보드 확인 | Top 10 목록 표시, 데이터 없으면 빈 상태 메시지 |
| TC-F01-2 | 레이스 완주 후 신기록 달성 | 리더보드에 자신의 기록 반영 (최대 60초 이내) |
| TC-F01-3 | 토글 버튼으로 접기/펼치기 | 슬라이드 애니메이션으로 부드럽게 전환 |
| TC-F01-4 | 100명 이상 기록 존재 시 | Top 10만 표시, 자신이 11위 이하면 하단에 별도 표시 |
| TC-F01-5 | 체크포인트 모드 완주 | 메인 리더보드에 반영되지 않음 (no-checkpoint 모드만 등록) |

---

### 3.2 F-02: Shop GUI 완성

#### 3.2.1 기능 설명
현재 `ShopGui.client.luau`에 초기 구현이 존재한다 (카테고리 탭, 아이템 카드, 구매 확인 다이얼로그). Phase 4에서는 다음을 보강한다:

1. **코인 표시 상시화**: Shop 밖에서도 화면 상단에 코인 잔액 표시
2. **구매 결과 알림 토스트**: 성공/실패 메시지를 2초간 화면 하단에 표시
3. **장착 효과 미리보기**: Trail/Skin 장착 시 캐릭터에 즉시 반영
4. **모바일 최적화**: 터치 스크롤, 버튼 크기 확대

#### 3.2.2 UI/UX 요구사항

**상시 코인 표시 (HUD):**
- 위치: 화면 좌측 상단 (Position = UDim2.new(0, 20, 0, 20))
- 크기: 150 x 40px
- 표시: 코인 아이콘(노란 원) + 숫자 -- GothamBold 18pt
- 색상: 텍스트 Color3.fromRGB(255, 215, 0), 배경 반투명 검정
- 코인 획득 시: +N 팝업 애니메이션 (위로 떠오르며 페이드아웃, 1.5초)

**구매 결과 토스트:**
- 위치: 화면 하단 중앙 (Position = UDim2.new(0.5, -150, 1, -80))
- 크기: 300 x 50px
- 성공: 녹색 배경 "구매 완료! [아이템명]"
- 실패: 빨간 배경 "코인 부족!" 또는 "이미 보유 중!"
- 2초 후 자동 페이드아웃

**기존 ShopGui 보강사항:**
- 아이템 카드: 소유 아이템은 좌측 상단에 체크 아이콘 추가
- 장착 아이템: 카드 테두리 녹색 점멸 효과
- 소모품(PowerUp): 보유 수량 배지 표시
- 구매 버튼: 코인 부족 시 회색 비활성화 + "부족" 텍스트
- 모바일: GridLayout CellSize를 화면 비율에 따라 동적 조정

#### 3.2.3 백엔드 연동 방법

**기존 Remote 활용 (추가 생성 불필요):**

| Remote | 현재 상태 | Phase 4 활용 |
|:---|:---|:---|
| `GetShopData` (RemoteFunction) | 구현 완료 | 초기 로드 + 상시 코인 표시 |
| `PurchaseItem` (RemoteFunction) | 구현 완료 | 구매 후 토스트 메시지 트리거 |
| `EquipItem` (RemoteEvent) | 구현 완료 | 장착 후 캐릭터 효과 반영 |
| `ShopDataUpdate` (RemoteEvent) | 구현 완료 | 실시간 코인/구매 상태 동기화 |

**클라이언트 추가 로직:**
```lua
-- ShopDataUpdate 수신 시 HUD 코인 갱신
shopDataUpdate.OnClientEvent:Connect(function(data)
    updateHudCoins(data.coins)
    -- 코인 증가 감지 시 +N 팝업
    if data.coins > previousCoins then
        showCoinPopup(data.coins - previousCoins)
    end
    previousCoins = data.coins
end)
```

#### 3.2.4 테스트 시나리오

| TC# | 시나리오 | 기대 결과 |
|:---|:---|:---|
| TC-F02-1 | 레이스 완주 후 코인 HUD 확인 | 코인 수 증가 + "+N" 팝업 표시 |
| TC-F02-2 | Shop에서 코인 부족 아이템 구매 시도 | 구매 버튼 비활성화 또는 "코인 부족!" 토스트 |
| TC-F02-3 | 아이템 구매 성공 후 | "구매 완료!" 토스트 + 카드 상태 "OWNED"로 변경 |
| TC-F02-4 | Trail 장착 후 이동 | 캐릭터에 Trail 파티클 표시 |
| TC-F02-5 | 모바일에서 Shop 스크롤 | 터치 드래그로 아이템 목록 스크롤 가능, 카드 크기 적절 |

---

### 3.3 F-03: 체크포인트 UI

#### 3.3.1 기능 설명
CheckpointService의 체크포인트 활성화 이벤트를 시각적으로 전달하는 UI 시스템. 발판 색상 변화, 화면 알림, 미니맵 진행률 표시를 포함한다.

#### 3.3.2 UI/UX 요구사항

**체크포인트 발판 시각 변화 (Workspace 오브젝트):**
- 비활성: 기존 회색 (Color3.fromRGB(120, 120, 120))
- 활성화 시: 녹색으로 Tween 변화 (Color3.fromRGB(50, 200, 50), 0.5초)
- 활성화 완료: 녹색 유지 + PointLight (Brightness=2, Range=15, Color=녹색)
- 현재 목표 CP: 약하게 노란색 점멸 (Tween 반복, 1초 주기)

**화면 알림 배너:**
- 위치: 화면 상단 중앙, 타이머 아래 (Position = UDim2.new(0.5, -175, 0, 70))
- 크기: 350 x 50px
- 텍스트: "CHECKPOINT 1 ACTIVATED!" -- GothamBold, 22pt
- 배경: Color3.fromRGB(50, 200, 50), BackgroundTransparency = 0.3
- 등장: 위에서 슬라이드 다운 (0.3초) -> 2초 유지 -> 위로 슬라이드 업 (0.3초)

**진행률 바 (미니 프로그레스):**
- 위치: 타이머 바로 아래 (Position = UDim2.new(0.5, -100, 0.1, 55))
- 크기: 200 x 12px
- 5단계: Start(0%) -> CP-1(25%) -> CP-2(50%) -> CP-3(75%) -> CP-4(100%)
- 활성 구간: 녹색, 미활성 구간: 회색
- 각 체크포인트 위치에 작은 원형 마커

**모드 표시:**
- 체크포인트 모드: 진행률 바 좌측에 작은 아이콘 표시
- 일반 모드: 진행률 바 비표시 (타이머만)

#### 3.3.3 백엔드 연동 방법

**신규 RemoteEvent:**

| 이름 | 유형 | 방향 | 용도 |
|:---|:---|:---|:---|
| `CheckpointActivated` | RemoteEvent | Server -> Client | 체크포인트 활성화 알림 (cpId 전달) |
| `SetGameMode` | RemoteEvent | Client -> Server | 게임 모드 선택 (checkpoint/nocheckpoint) |
| `GetCheckpointData` | RemoteFunction | Client -> Server | 진입 시 현재 체크포인트 상태 조회 |

**서버 측 추가 (CheckpointService.ActivateCheckpoint 내부):**
```lua
-- 활성화 성공 시 클라이언트에 알림
local checkpointRemote = ReplicatedStorage.CheckpointRemotes.CheckpointActivated
checkpointRemote:FireClient(player, checkpointId)
```

**클라이언트 측 (CheckpointGui.client.luau):**
```lua
-- 체크포인트 활성화 수신
checkpointActivated.OnClientEvent:Connect(function(cpId)
    -- 1) 발판 색상 변경 (Workspace에서 Platform 찾아서 Tween)
    -- 2) 배너 표시 "CHECKPOINT " .. cpId .. " ACTIVATED!"
    -- 3) 진행률 바 업데이트
    -- 4) 사운드 재생 (F-04 연동)
    -- 5) 파티클 효과 (F-05 연동)
end)
```

#### 3.3.4 테스트 시나리오

| TC# | 시나리오 | 기대 결과 |
|:---|:---|:---|
| TC-F03-1 | 체크포인트 모드에서 Platform 5 착지 | CP-1 발판 녹색 변환 + 배너 "CHECKPOINT 1" + 진행률 25% |
| TC-F03-2 | CP-2를 건너뛰고 CP-3 착지 시도 | 활성화 안 됨 (순차 규칙), UI 변화 없음 |
| TC-F03-3 | 사망 후 CP-1에서 리스폰 | 리스폰 위치 정확, 진행률 바 CP-1까지 유지 |
| TC-F03-4 | 일반 모드(no-checkpoint) 선택 | 진행률 바 비표시, 체크포인트 배너 비표시 |
| TC-F03-5 | 재접속 후 체크포인트 상태 복원 | DataStore에서 로드된 체크포인트까지 녹색 표시 |

---

## 4. P1 기능 상세 스펙

### 4.1 F-04: 사운드 시스템

#### 4.1.1 기능 설명
게임 전반의 청각 경험을 제공하는 사운드 매니저. BGM 1곡과 SFX 5종으로 구성한다.

#### 4.1.2 사운드 목록

| ID | 종류 | 트리거 | 볼륨 | 루프 | 비고 |
|:---|:---|:---|:---|:---|:---|
| `BGM_Forest` | BGM | 게임 입장 시 | 0.3 | Yes | 숲 분위기 ambient + 긴장감 있는 리듬 |
| `SFX_Jump` | SFX | 점프 시 (Humanoid.Jumping) | 0.5 | No | 짧은 "훅" 효과음 |
| `SFX_Land` | SFX | 발판 착지 시 (Touched + 속도 체크) | 0.4 | No | "착" 효과음 |
| `SFX_Checkpoint` | SFX | 체크포인트 활성화 시 | 0.6 | No | 성취 징글 (0.5~1초) |
| `SFX_Finish` | SFX | 완주 시 (FinishLine Touched) | 0.7 | No | 팡파르 효과음 (2~3초) |
| `SFX_Death` | SFX | 사망 시 (Humanoid.Died) | 0.5 | No | 짧은 낙하음 + 충격음 |

#### 4.1.3 UI/UX 요구사항

**사운드 설정 버튼:**
- 위치: 화면 좌측 하단 (Position = UDim2.new(0, 20, 1, -60))
- 크기: 40 x 40px, 아이콘 기반 (스피커 모양)
- 클릭 시 미니 패널 펼침: BGM 볼륨 슬라이더 + SFX 볼륨 슬라이더 + 음소거 토글
- 설정값은 로컬 저장 (Plugin:GetSetting 또는 PlayerGui 상태)

**사운드 에셋 관리:**
- 위치: ReplicatedStorage > Sounds 폴더
- Roblox Creator Store 무료 에셋 사용 또는 Roblox AssetId 직접 지정
- 에셋 로드 실패 시 경고 로그만 출력 (게임 중단 없음)

#### 4.1.4 구현 구조

**파일**: `src/client/SoundManager.client.luau`

```lua
-- SoundManager 모듈 구조
local SoundManager = {}

-- 사운드 ID 매핑 (Roblox AssetId)
local SOUNDS = {
    BGM_Forest = "rbxassetid://0000000000",     -- 교체 필요
    SFX_Jump = "rbxassetid://0000000000",
    SFX_Land = "rbxassetid://0000000000",
    SFX_Checkpoint = "rbxassetid://0000000000",
    SFX_Finish = "rbxassetid://0000000000",
    SFX_Death = "rbxassetid://0000000000",
}

function SoundManager.PlayBGM() ... end
function SoundManager.PlaySFX(name) ... end
function SoundManager.SetBGMVolume(vol) ... end
function SoundManager.SetSFXVolume(vol) ... end
function SoundManager.Mute() ... end
```

**이벤트 연결 포인트:**
- 점프: `Humanoid.Jumping:Connect` -> SFX_Jump
- 착지: 발판 Touched + HumanoidRootPart 속도 체크 -> SFX_Land
- 체크포인트: CheckpointActivated RemoteEvent -> SFX_Checkpoint
- 완주: FinishLine Touched 감지 (기존 TimerGui 로직 활용) -> SFX_Finish
- 사망: `Humanoid.Died:Connect` -> SFX_Death

#### 4.1.5 테스트 시나리오

| TC# | 시나리오 | 기대 결과 |
|:---|:---|:---|
| TC-F04-1 | 게임 입장 | BGM 자동 재생, 볼륨 0.3 |
| TC-F04-2 | 점프 + 착지 반복 | 각 동작에 맞는 SFX 재생, 겹침 없음 |
| TC-F04-3 | 완주 시 | 완주 팡파르 재생, BGM 볼륨 일시 감소 후 복원 |
| TC-F04-4 | 사운드 설정에서 음소거 | 모든 사운드 즉시 중단, 재활성화 시 BGM 복원 |
| TC-F04-5 | 에셋 로드 실패 (잘못된 AssetId) | 경고 로그만 출력, 게임 플레이에 영향 없음 |

---

### 4.2 F-05: 파티클 효과 시스템

#### 4.2.1 기능 설명
시각적 몰입감을 강화하는 파티클 이펙트. 핵심 게임플레이 이벤트(체크포인트 활성화, 완주, 사망/낙하)에 연결한다.

#### 4.2.2 파티클 목록

| ID | 트리거 | 위치 | 지속 | 설명 |
|:---|:---|:---|:---|:---|
| `Particle_Checkpoint` | CP 활성화 | 체크포인트 발판 위 | 2초 | 녹색 반짝이 상승 + 원형 확산 |
| `Particle_Finish` | 완주 | FinishLine 위 | 3초 | 금색 폭죽 + 별 모양 확산 |
| `Particle_Death` | 사망 | 마지막 위치 | 1.5초 | 빨간 연기 확산 + 하강 |
| `Particle_Landing` | 발판 착지 | 발판 표면 | 0.5초 | 작은 먼지 파편 (회색) |
| `Particle_CoinGet` | 코인 획득 | 캐릭터 머리 위 | 1초 | 금색 코인 아이콘 상승 + 페이드 |

#### 4.2.3 구현 방식

**사전 생성 (Pre-built ParticleEmitter):**
- ReplicatedStorage > Particles 폴더에 ParticleEmitter 프리셋 저장
- 런타임에 Clone하여 대상 Part에 부착 -> Emit(count) -> Debris로 자동 정리

**파일**: `src/client/ParticleManager.client.luau`

```lua
local ParticleManager = {}

function ParticleManager.EmitAt(particleName, position, parent)
    local template = particlesFolder:FindFirstChild(particleName)
    if not template then return end

    local emitter = template:Clone()
    emitter.Parent = parent or workspace.Terrain
    -- Attachment 생성, 위치 설정
    emitter:Emit(emitter:GetAttribute("BurstCount") or 20)

    -- 자동 정리
    Debris:AddItem(emitter, emitter:GetAttribute("Lifetime") or 2)
end
```

**ParticleEmitter 프리셋 사양:**

| 파티클 | Color | Size | Speed | Lifetime | Rate | SpreadAngle |
|:---|:---|:---|:---|:---|:---|:---|
| Checkpoint | ColorSequence(0,200,50) | NumberSequence(1,0) | NumberRange(3,8) | NumberRange(1,2) | 0 (Burst) | Vector2.new(180,180) |
| Finish | ColorSequence(255,215,0) | NumberSequence(2,0) | NumberRange(5,15) | NumberRange(1,3) | 0 (Burst) | Vector2.new(360,360) |
| Death | ColorSequence(200,30,30) | NumberSequence(2,4) | NumberRange(1,3) | NumberRange(0.5,1.5) | 0 (Burst) | Vector2.new(90,90) |
| Landing | ColorSequence(150,150,150) | NumberSequence(0.5,0) | NumberRange(1,3) | NumberRange(0.3,0.5) | 0 (Burst) | Vector2.new(60,60) |
| CoinGet | ColorSequence(255,215,0) | NumberSequence(0.8,0) | NumberRange(2,5) | NumberRange(0.5,1) | 0 (Burst) | Vector2.new(30,30) |

#### 4.2.4 테스트 시나리오

| TC# | 시나리오 | 기대 결과 |
|:---|:---|:---|
| TC-F05-1 | 체크포인트 활성화 | 발판 위에서 녹색 파티클 2초간 분출 |
| TC-F05-2 | 완주 | FinishLine에서 금색 폭죽 3초간 |
| TC-F05-3 | 발판에서 낙하 사망 | 마지막 위치에서 빨간 연기 1.5초 |
| TC-F05-4 | 빠른 연속 착지 (3회) | 착지 파티클 3번 모두 정상 발생, 프레임 드롭 없음 |
| TC-F05-5 | 동시에 여러 플레이어 완주 | 각자의 위치에서 파티클 독립 발생 |

---

## 5. P2 기능 상세 스펙

### 5.1 F-06: 발판 난이도 시각 피드백

#### 5.1.1 기능 설명
25개 발판의 색상을 높이(난이도)에 따라 그라데이션으로 표시. 플레이어가 시각적으로 진행 구간을 인식할 수 있다.

#### 5.1.2 색상 매핑

| 구간 | 발판 번호 | 높이 범위 | 색상 | 의미 |
|:---|:---|:---|:---|:---|
| Easy | 1~6 | Y=10~12 | Color3.fromRGB(100, 200, 100) 녹색 | 초급 |
| Medium | 7~13 | Y=12~15 | Color3.fromRGB(255, 200, 50) 노란색 | 중급 |
| Hard | 14~19 | Y=15~18 | Color3.fromRGB(255, 120, 50) 주황색 | 상급 |
| Extreme | 20~25 | Y=18~20 | Color3.fromRGB(255, 50, 50) 빨간색 | 극한 |

#### 5.1.3 구현
- 순수 클라이언트 스크립트 (서버 불필요)
- 게임 시작 시 Workspace.Platforms 하위 발판의 Color 속성을 높이 기반으로 설정
- PlatformTheme 아이템 장착 시: 이 기본 색상 대신 테마 색상 적용 (ShopService 연동)

#### 5.1.4 테스트 시나리오

| TC# | 시나리오 | 기대 결과 |
|:---|:---|:---|
| TC-F06-1 | 게임 시작 | 25개 발판이 녹색->노란->주황->빨간 그라데이션 |
| TC-F06-2 | PlatformTheme "Mossy Stone" 장착 | 기본 색상 대신 테마 색상으로 전환 |
| TC-F06-3 | 테마 해제 후 | 원래 난이도 그라데이션으로 복원 |

---

### 5.2 F-07: 튜토리얼 시스템

#### 5.2.1 기능 설명
첫 접속 플레이어를 위한 간단한 안내 오버레이. 3단계 순차 안내로 30초 내에 핵심 조작법을 전달한다.

#### 5.2.2 튜토리얼 흐름

| 단계 | 트리거 | 메시지 | 표시 위치 | 지속 |
|:---|:---|:---|:---|:---|
| 1 | 첫 스폰 | "WASD로 이동, Space로 점프!" | 화면 중앙 하단 | 5초 |
| 2 | StartLine 접근 (3초 후) | "출발선을 밟으면 타이머 시작!" | 화면 중앙, StartLine 가리킴 | 4초 |
| 3 | 첫 점프 성공 | "발판을 밟으며 결승선까지!" | 화면 중앙 상단 | 4초 |

**스킵 옵션:** 우측 상단 "건너뛰기 (X)" 버튼

#### 5.2.3 구현
- 첫 접속 감지: DataStore에 `tutorial_completed` 플래그 저장
- 완료 후 재표시 없음
- 순수 클라이언트 GUI + 서버 DataStore 1회 저장

#### 5.2.4 테스트 시나리오

| TC# | 시나리오 | 기대 결과 |
|:---|:---|:---|
| TC-F07-1 | 첫 접속 플레이어 | 3단계 튜토리얼 순차 표시 |
| TC-F07-2 | 튜토리얼 완료 후 재접속 | 튜토리얼 미표시 |
| TC-F07-3 | 튜토리얼 중 "건너뛰기" 클릭 | 즉시 종료, 완료 플래그 저장 |

---

## 6. 비기능 요구사항

### 6.1 성능

| 항목 | 기준 |
|:---|:---|
| FPS (데스크톱) | 60fps 이상 유지 (Phase 4 추가 후에도) |
| FPS (모바일) | 30fps 이상 유지 |
| GUI 렌더링 | 어떤 GUI도 1프레임(16ms) 이상 블로킹 금지 |
| 파티클 동시 발생 | 최대 5개까지 프레임 드롭 없음 |
| 사운드 로딩 | 게임 시작 후 5초 이내 모든 에셋 프리로드 완료 |
| 메모리 | Phase 4 추가로 인한 메모리 증가 50MB 이하 |
| DataStore 호출 | 리더보드 갱신: 60초당 1회 (기존 캐시 TTL 유지) |

### 6.2 접근성

| 항목 | 기준 |
|:---|:---|
| 텍스트 크기 | 최소 14pt (모바일에서 가독성 확보) |
| 색상 대비 | 텍스트/배경 대비율 4.5:1 이상 (WCAG AA) |
| 색맹 대응 | 색상만으로 정보 전달하지 않음 (텍스트/아이콘 병행) |
| 사운드 의존 제거 | 모든 사운드 이벤트는 시각 피드백도 동시 제공 |

### 6.3 모바일 호환

| 항목 | 기준 |
|:---|:---|
| 터치 버튼 크기 | 최소 48x48px (Roblox 가이드라인) |
| 화면 비율 | 16:9, 18:9, 4:3 모두 UI 깨짐 없음 |
| GUI 겹침 | 조이스틱/점프 버튼과 커스텀 UI 겹침 없음 |
| Shop 스크롤 | 터치 드래그 스크롤 정상 동작 |
| 리더보드 | 모바일에서 기본 접힌 상태, 탭하여 펼침 |

---

## 7. 파일 구조 (Phase 4 추가분)

```
src/
  client/
    TimerGui.client.luau          (기존, 수정 없음)
    ShopGui.client.luau           (기존, P0 보강)
    LeaderboardGui.client.luau    (신규, P0)
    CheckpointGui.client.luau     (신규, P0)
    SoundManager.client.luau      (신규, P1)
    ParticleManager.client.luau   (신규, P1)
    PlatformVisual.client.luau    (신규, P2)
    TutorialGui.client.luau       (신규, P2)
    CoinHud.client.luau           (신규, P0)
  server/
    Services/
      CheckpointService.lua       (기존, RemoteEvent 발화 추가)
      RankingService.lua          (기존, 수정 거의 없음)
      ShopService.lua             (기존, 수정 없음)
    RaceEngine.server.lua         (기존, RemoteEvent 연결 추가)
    DeathZone.server.lua          (기존, 수정 없음)
  shared/
    Constants/
      RankingConstants.lua        (기존, REMOTE_EVENT_NAME 이미 정의됨)
      ShopConstants.lua           (기존, 수정 없음)
      UIConstants.lua             (신규, UI 공통 색상/크기 상수)
```

---

## 8. 성공 기준 (Definition of Done)

### 8.1 P0 완료 기준

| # | 기준 | 검증 방법 |
|:---|:---|:---|
| DoD-1 | 리더보드 GUI에 Top 10 표시 | Play 테스트 후 3회 완주, 순위 표시 확인 |
| DoD-2 | 리더보드 자동 갱신 | 다른 플레이어 기록 갱신 후 60초 이내 반영 |
| DoD-3 | Shop 전체 플로우 동작 | 코인 확인 -> 아이템 탐색 -> 구매 -> 장착 전 과정 성공 |
| DoD-4 | 코인 HUD 상시 표시 | 게임 전 구간에서 코인 잔액 확인 가능 |
| DoD-5 | 체크포인트 활성화 시각 피드백 | CP-1~4 각각 색상 변화 + 배너 표시 확인 |
| DoD-6 | 체크포인트 진행률 바 | 모드 전환 시 진행률 바 표시/숨김 정상 |

### 8.2 P1 완료 기준

| # | 기준 | 검증 방법 |
|:---|:---|:---|
| DoD-7 | BGM 루프 재생 | 5분 이상 플레이 시 끊김 없음 |
| DoD-8 | SFX 5종 전부 재생 | 점프/착지/CP/완주/사망 각각 트리거 확인 |
| DoD-9 | 사운드 설정 작동 | 음소거 ON/OFF, 볼륨 조절 정상 |
| DoD-10 | 파티클 5종 발동 | 각 이벤트에서 파티클 시각 확인 |
| DoD-11 | 파티클 성능 영향 없음 | 동시 파티클 5개 발생 시 FPS 유지 |

### 8.3 P2 완료 기준

| # | 기준 | 검증 방법 |
|:---|:---|:---|
| DoD-12 | 발판 난이도 색상 | 4단계 그라데이션 시각 확인 |
| DoD-13 | 튜토리얼 첫 접속 표시 | 신규 계정으로 접속 시 3단계 안내 |
| DoD-14 | 튜토리얼 재접속 시 미표시 | DataStore 플래그 확인 |

---

## 9. 예상 소요 시간

### 9.1 Phase 1~3 패턴 분석

| Phase | 내용 | 소요 시간 |
|:---|:---|:---|
| Phase 1 | 환경 구축 (Baseplate, 조명, 나무, 트랙, 허들, 타이머) | 1시간 |
| Phase 2 | 점프맵 강화 (PathMarker 60, JumpPlatform 15, Y=2~5) | 1시간 10분 |
| Phase 3 | 극한 점프맵 (발판 25, Y=10~20, KillBrick, FinishPlatform) | 1시간 30분 |

**패턴**: 매 Phase마다 약 15~30분 증가 (복잡도 증가에 비례)

### 9.2 Phase 4 예상

| 우선순위 | 기능 | 예상 시간 | 누적 |
|:---|:---|:---|:---|
| P0 | F-01 리더보드 UI | 30분 | 30분 |
| P0 | F-02 Shop GUI 완성 | 25분 | 55분 |
| P0 | F-03 체크포인트 UI | 25분 | 1시간 20분 |
| P1 | F-04 사운드 시스템 | 30분 | 1시간 50분 |
| P1 | F-05 파티클 효과 | 20분 | 2시간 10분 |
| P2 | F-06 발판 시각 피드백 | 15분 | 2시간 25분 |
| P2 | F-07 튜토리얼 | 20분 | 2시간 45분 |
| -- | 통합 테스트 + 모바일 검증 | 15분 | **3시간** |

**총 예상: 약 2시간 45분 ~ 3시간**

### 9.3 권장 실행 순서

```
[세션 1] P0 Core (1시간 20분)
  F-01 리더보드 UI → F-03 체크포인트 UI → F-02 Shop GUI 보강

[세션 2] P1 감각 (50분)
  F-04 사운드 시스템 → F-05 파티클 효과

[세션 3] P2 + QA (50분)
  F-06 발판 시각 → F-07 튜토리얼 → 통합 테스트
```

---

## 10. 위험 요소 및 대응

| # | 위험 | 가능성 | 영향 | 대응 방안 |
|:---|:---|:---|:---|:---|
| R-1 | Roblox 사운드 에셋 로드 지연/실패 | 중 | 중 | 프리로드 + pcall 래핑 + 사운드 없이도 게임 정상 작동 보장 |
| R-2 | 모바일에서 파티클 과부하 | 중 | 높 | 모바일 감지 시 파티클 수량 50% 감소, Rate/Burst 제한 |
| R-3 | Shop GUI와 리더보드 GUI 겹침 | 낮 | 중 | ZIndex 관리, Shop 열릴 때 리더보드 자동 접힘 |
| R-4 | 체크포인트 RemoteEvent 누락 (네트워크) | 낮 | 높 | 클라이언트 주기적 폴링 (10초) 백업, GetCheckpointData로 상태 동기화 |
| R-5 | DataStore 쓰로틀링 (튜토리얼 플래그 저장) | 낮 | 낮 | 클라이언트 로컬 캐시 우선, 서버 저장은 PlayerRemoving 시 일괄 |
| R-6 | ShopGui 기존 코드와 CoinHud 중복 | 중 | 낮 | CoinHud를 ShopGui의 코인 표시 모듈로 분리/통합 |
| R-7 | 기존 TimerGui와 CheckpointGui 위치 충돌 | 중 | 중 | UIConstants에서 화면 영역 매핑, 타이머 위치를 기준으로 체크포인트 바 배치 |
| R-8 | Rojo 동기화 시 신규 client 스크립트 누락 | 중 | 높 | default.project.json에 client 폴더 매핑 확인, 동기화 후 Explorer 검증 |

---

## 11. 의존성 다이어그램

```
[Server Layer - 기존 완료]
  RankingService ─────────────────────┐
  ShopService ────────────────────────┤
  CheckpointService ──────────────────┤
  RaceEngine (코인 지급, 모드 분기) ──┤
  DeathZone ──────────────────────────┤
                                      │
      ┌───── RemoteEvent/Function ────┘
      │
[Client Layer - Phase 4 신규]
      │
      ├─ LeaderboardGui ← GetLeaderboard / LeaderboardUpdate
      │
      ├─ ShopGui (보강) ← GetShopData / PurchaseItem / EquipItem / ShopDataUpdate
      │
      ├─ CoinHud ← ShopDataUpdate
      │
      ├─ CheckpointGui ← CheckpointActivated / GetCheckpointData / SetGameMode
      │
      ├─ SoundManager ← Humanoid events + RemoteEvents (CP, Finish)
      │
      ├─ ParticleManager ← CheckpointGui, SoundManager 트리거 공유
      │
      ├─ PlatformVisual ← 독립 (Workspace 직접 접근)
      │
      └─ TutorialGui ← DataStore (tutorial_completed 플래그)
```

---

## 12. 부록: 기존 백엔드 API 요약

### 12.1 RankingService API

| 함수 | 파라미터 | 반환 | 용도 |
|:---|:---|:---|:---|
| `Init()` | - | void | 초기화 + 캐시 루프 시작 |
| `SubmitTime(userId, timeMs)` | number, number | boolean | 기록 등록 (최고 기록만 갱신) |
| `GetTopN(count?)` | number? | array<{userId, timeMs, rank}> | 상위 N명 조회 |
| `GetPlayerRank(userId)` | number | {rank, timeMs}? | 개인 순위 조회 |
| `RefreshCache()` | - | void | 캐시 강제 갱신 |

### 12.2 ShopService API

| 함수 | 파라미터 | 반환 | 용도 |
|:---|:---|:---|:---|
| `Init()` | - | void | 초기화 + Remote 설정 |
| `CalculateCoins(finishTime, isCP)` | number, boolean | number | 코인 보상 계산 |
| `AwardCoins(userId, amount)` | number, number | void | 코인 지급 |
| `GetPlayerData(userId)` | number | table | 플레이어 데이터 조회 |
| `PurchaseItem(userId, itemId)` | number, string | bool, string | 구매 실행 |
| `EquipItem(userId, itemId)` | number, string | boolean | 장착 실행 |

### 12.3 CheckpointService API

| 함수 | 파라미터 | 반환 | 용도 |
|:---|:---|:---|:---|
| `Init(platforms)` | table | boolean | 초기화 |
| `ActivateCheckpoint(player, cpId)` | Player, number | boolean | 체크포인트 활성화 |
| `GetRespawnPosition(player)` | Player | Vector3 | 리스폰 위치 |
| `SetMode(player, mode)` | Player, string | void | 모드 설정 |
| `GetMode(player)` | Player | string | 모드 조회 |
| `IsInvincible(player)` | Player | boolean | 무적 상태 확인 |
| `GetHighestCheckpoint(player)` | Player | number | 최고 CP 조회 |
| `SaveToDataStore(player)` | Player | boolean | 저장 |
| `LoadFromDataStore(player)` | Player | boolean | 로드 |

### 12.4 기존 Remote 목록

| Remote | 위치 | 유형 | 상태 |
|:---|:---|:---|:---|
| `ShopRemotes/GetShopData` | ReplicatedStorage | RemoteFunction | 구현 완료 |
| `ShopRemotes/PurchaseItem` | ReplicatedStorage | RemoteFunction | 구현 완료 |
| `ShopRemotes/EquipItem` | ReplicatedStorage | RemoteEvent | 구현 완료 |
| `ShopRemotes/ShopDataUpdate` | ReplicatedStorage | RemoteEvent | 구현 완료 |
| `LeaderboardUpdate` (미생성) | RankingConstants에 정의됨 | RemoteEvent | **Phase 4 생성 필요** |

### 12.5 기존 ShopConstants 아이템 카탈로그

| ID | 이름 | 카테고리 | 가격 | 등급 | 소모품 |
|:---|:---|:---|:---|:---|:---|
| trail_forest_sparkle | Forest Sparkle | Trails | 50 | Common | X |
| trail_golden_leaves | Golden Leaves | Trails | 150 | Rare | X |
| trail_neon_dash | Neon Dash | Trails | 300 | Epic | X |
| skin_forest_ranger | Forest Ranger | Skins | 100 | Common | X |
| skin_bark_armor | Bark Armor | Skins | 250 | Rare | X |
| skin_neon_ghost | Neon Ghost | Skins | 500 | Legendary | X |
| theme_mossy_stone | Mossy Stone | PlatformThemes | 200 | Rare | X |
| theme_crystal_clear | Crystal Clear | PlatformThemes | 400 | Epic | X |
| powerup_speed_boost | Speed Boost | PowerUps | 30 | Common | O |
| powerup_double_jump | Double Jump | PowerUps | 50 | Rare | O |

---

**Document Version**: 1.0
**Phase 4 Status**: 요구사항 분석 완료, 개발 대기
**다음 단계**: system_architect 설계 -> code_developer 구현 -> quality_reviewer 검수
