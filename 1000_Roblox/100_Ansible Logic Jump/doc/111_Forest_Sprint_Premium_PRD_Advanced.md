# 111_포레스트 스프린트 프리미엄 PRD (고도화된 설계 문서)

> **문서 유형**: Product Requirements Document + Technical Design Specification (통합형)
> **작성 기준**: Quality-First Principles (109_Lessons_Learned 기반)

---

## 1. 프로젝트 개요 (Project Overview)

### 1.1 게임 아이덴티티
*   **제목**: Forest Sprint (포레스트 스프린트)
*   **장르**: 타임 어택 레이싱 / 스킬 기반 점프맵
*   **핵심 가치**: "100미터의 완벽함" - 단순한 거리지만 깊이 있는 최적화 재미
*   **타겟**: 로블록스 유저 (7~15세 중심, 스킬 향상 성취감 추구형)

### 1.2 품질 비전 (Quality Vision)
> "플레이어가 게임에 입장하는 순간, '이건 다르다'고 느낄 수 있는 시각적 임팩트와 정교한 게임플레이를 제공한다."

---

## 2. 품질 기준 (Quality Criteria) ⭐

### 2.1 시각적 품질 기준
| 요소 | 최소 기준 (Minimum) | 목표 기준 (Target) |
|:---|:---|:---|
| **환경** | 잔디 바닥 + 기본 나무 10그루 | 풍성한 숲(30+그루) + 고급 라이팅 효과 |
| **나무 모델** | 줄기 1개 + 잎 클러스터 1개 | 줄기 2~3개 + 잎 클러스터 3~5개 (불규칙 배치) |
| **라이팅** | Ambient 색상 조정 | Atmosphere + Bloom + SunRays 전체 적용 |
| **출발/결승선** | 기본 Part | Neon 재질 + 발광 효과 |

### 2.2 기능적 품질 기준
| 기능 | 최소 기준 | 목표 기준 |
|:---|:---|:---|
| **타이머** | 출발~결승 시간 측정 | 0.01초 단위 정밀 측정 + UI 표시 |
| **리더보드** | 데이터스토어 저장 | 상위 10명 실시간 표시 |
| **장애물** | 물리적 충돌 O | 실패 시 재시작 메커니즘 |

### 2.3 성능 기준
*   **초기 로딩**: 5초 이내
*   **FPS**: 평균 60fps 유지 (모바일 30fps 이상)
*   **네트워크**: 타이머 동기화 오차 100ms 이내

---

## 3. 게임 메카닉 (Core Gameplay Mechanics)

### 3.1 트랙 구조
*   **거리**: 정확히 100미터 (SprintTrack 길이 300 studs)
*   **폭**: 15 studs (플레이어가 좌우로 장애물 회피 가능)
*   **재질**: Grass (미끄럼 방지)

### 3.2 장애물 및 플랫폼 설계 (Enhanced)

#### 3.2.1 통나무 허들 (Log Hurdle)
*   위치: 100m, 200m 지점
*   높이: 1.5 studs (기본 점프로 넘을 수 있는 높이)
*   재질: Wood
*   충돌 시: 속도 감소 없음 (맞으면 튕겨나감)

#### 3.2.2 점프 발판 시퀀스 (Jump Platform Sequence) ⭐ PHASE 3 UPGRADE
*   **개념**: 고공 점프맵 - 플레이어가 높은 발판을 단일 점프로 연속 이동
*   **규격**:
    - 크기: 6 x 1 x 6 studs (플레이어가 착지할 수 있는 크기)
    - 재질: Concrete 또는 Slate (숲과 대비)
    - 색상: `Color3.fromRGB(120, 120, 120)` (회색 계열)
*   **배치 (Phase 3 - Extreme Mode)**:
    - 개수: 25개 (증가)
    - 시작 높이: Y=10 studs (SpawnLocation과 동일)
    - 최종 높이: Y=20 studs (점진적 상승)
    - 간격: 12~15 studs (정확히 1회 점프로 도달 가능)
    - Z축 위치: 0~300 범위에 고르게 분포
    - X축 오프셋: -4~4 (약간의 좌우 변화)
*   **목적**: 극한의 점프 정확도 요구 + 높이감 극대화

#### 3.2.3 경로 표시 (Path Markers)
*   **개념**: 녹색 바닥과 대비되는 시각적 가이드로 플레이어가 길을 따라가도록 유도
*   **형태**: SprintTrack 양옆에 경계 표시 Part 배치
*   **규격**:
    - 크기: 2 x 0.5 x 10 studs (긴 직사각형)
    - 재질: Slate
    - 색상: `Color3.fromRGB(80, 60, 40)` (갈색 계열, 숲 바닥과 구분)
    - CanCollide: false (통과 가능)

#### 3.2.4 죽음의 구역 (Death Zone) ⭐ PHASE 3 NEW
*   **개념**: 발판에서 떨어지면 사망 → 자동 리스폰
*   **규격**:
    - 이름: "KillBrick"
    - 크기: 2000 x 1 x 2000 studs (맵 전체 커버)
    - 위치: Y=-20 (발판 아래)
    - 재질: ForceField
    - 색상: 빨간색, Transparency=0.8 (반투명)
    - CanCollide: false (통과)
*   **로직**: 
    - Touched 이벤트 → Humanoid:TakeDamage(100)
    - 사망 시 자동으로 SpawnLocation에 리스폰

### 3.3 타이머 시스템
*   **시작 조건**: StartLine Part의 `Touched` 이벤트
*   **종료 조건**: FinishLine Part의 `Touched` 이벤트
*   **기록 계산**: `tick()` 함수 사용, 소수점 둘째 자리까지 표시
*   **저장**: DataStoreService를 통해 플레이어별 최고 기록 영구 저장

---

## 4. 미학적 표준 (Aesthetic Standards) 🎨

### 4.1 환경 디자인

#### 4.1.1 베이스플레이트
*   **재질**: Grass
*   **색상**: `Color3.fromRGB(58, 125, 21)` (깊은 숲의 초록색)
*   **크기**: 1024 x 20 x 1024 studs (넓고 안정적인 지면)

#### 4.1.2 나무 모델 (Premium Tree Model)
*   **구조**: Model 컨테이너 내 다중 Part 구성
    - Trunk (줄기): 2~3개, 하단이 굵고 상단이 가는 원추형
    - Leaves (잎): 3~5개의 Ball 형태 Part, 불규칙하게 겹쳐 배치
*   **재질**: Trunk = Wood, Leaves = Grass (질감 표현)
*   **색상 다양성**: 
    - Trunk: `Color3.fromRGB(92, 64, 36)` (갈색 계열)
    - Leaves: `Color3.fromRGB(33, 90, 33)`, `(26, 102, 26)`, `(51, 128, 51)` 혼합
*   **배치**:
    - 총 30그루 이상
    - 트랙 좌우 12~30 studs 거리 (울창하되 답답하지 않게)
    - Z축 0~300 범위 전체에 무작위 배치

#### 4.1.3 라이팅 설계
*   **Technology**: Future (고해상도 그림자)
*   **Ambient**: `Color3.fromRGB(130, 150, 130)` (부드러운 녹색 대기광)
*   **Brightness**: 2
*   **GlobalShadows**: True

#### 4.1.4 고급 효과 (Advanced Effects)
1.  **Atmosphere**
    *   Density: 0.3
    *   Haze: 2.0
    *   Color: `Color3.fromRGB(191, 204, 191)` (연한 녹색 안개)

2.  **Bloom**
    *   Intensity: 1.0
    *   Size: 24
    *   Threshold: 2 (네온 라인의 부드러운 번짐)

3.  **SunRays**
    *   Intensity: 0.15
    *   Spread: 0.5 (나뭇잎 사이의 햇살)

### 4.2 UI/UX 디자인
*   **타이머 표시**: 화면 상단 중앙, 반투명 검은 배경, 흰색 텍스트
*   **서체**: 고딕 계열, 크기 24
*   **포맷**: "TIME: XX.XX"

---

## 5. 기술 명세 (Technical Specifications)

### 5.1 파일 구조
```
src/
  ├── server/
  │   ├── RaceEngine.server.lua (타이머 및 데이터 로직)
  │   └── EnvironmentManager.server.lua (환경 동적 관리)
  ├── client/
  │   ├── TimerGui.client.luau (UI 표시)
  │   └── CameraController.client.luau (선택 사항)
  └── shared/
      └── Constants.lua (공통 상수)
```

### 5.2 주요 변수 및 함수

#### RaceEngine.server.lua
```lua
local raceData = {} -- { [userId] = startTime }

function onStartTouched(hit)
    -- 플레이어 확인, raceData에 기록
end

function onFinishTouched(hit)
    -- 시간 계산, DataStore 저장, 리더보드 업데이트
end
```

### 5.3 데이터스토어 스키마
*   **Store Name**: `"ForestSprintRecords"`
*   **Key**: `tostring(player.UserId)`
*   **Value**: `number` (최고 기록, 초 단위)

---

## 6. 검증 체크리스트 (Verification Checklist) ✅

### 6.1 환경 검증
- [ ] 베이스플레이트가 Grass 재질로 설정됨
- [ ] 나무가 30그루 이상 배치됨
- [ ] 각 나무가 3개 이상의 Part로 구성됨
- [ ] Atmosphere, Bloom, SunRays가 모두 활성화됨
- [ ] Play 모드에서 숲의 "깊이감"이 느껴짐

### 6.2 기능 검증
- [ ] StartLine 터치 시 타이머가 시작됨
- [ ] FinishLine 터치 시 타이머가 정지됨
- [ ] 기록이 화면에 표시됨
- [ ] 기록이 DataStore에 저장됨
- [ ] 재시작 시 이전 기록이 유지됨

### 6.3 품질 검증
- [ ] 트랙이 정확히 100m (300 studs)임
- [ ] 장애물이 물리적으로 작동함 (충돌 시 튕겨남)
- [ ] 60fps 이상 유지됨 (데스크톱 기준)
- [ ] 스크린샷을 찍었을 때 "프리미엄"하게 보임

---

## 7. 인수 테스트 (Acceptance Tests)

### Test Case 1: 기본 레이스
1.  플레이어가 Spawn 후 StartLine으로 이동
2.  StartLine 터치 → 타이머 시작 확인
3.  100m 달리기
4.  FinishLine 터치 → 타이머 정지 및 기록 표시 확인

### Test Case 2: 장애물 상호작용
1.  달리기 중 Log_Hurdle에 충돌
2.  캐릭터가 튕겨나거나 감속되는지 확인
3.  재시도 가능 확인

### Test Case 3: 기록 저장
1.  레이스 완료 후 게임 종료
2.  재접속 → 이전 기록이 표시되는지 확인

---

## 8. 향후 확장 계획 (Future Enhancements)
*   **Phase 1 (현재)**: 기본 100m 레이스 + 타이머
*   **Phase 2**: 글로벌 리더보드 UI
*   **Phase 3**: 파티클 효과 (발자국, 먼지)
*   **Phase 4**: 음악 및 사운드 효과

---

**Document Version**: 1.0 (Advanced Premium Edition)
**Last Updated**: 2026-01-25
**Author**: Antigravity System V3.0 (Quality-First Mode)
