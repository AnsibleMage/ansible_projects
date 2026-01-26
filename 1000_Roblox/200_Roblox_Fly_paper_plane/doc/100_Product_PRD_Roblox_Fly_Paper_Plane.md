# 100_Product_PRD_Roblox_Fly_Paper_Plane

> **기반 문서**: [[../2000_Web/100_Web_Fly_paper_plane/doc/Product_PRD_종이비행기날아라|웹 버전 PRD]]
> **방법론**: [[../../doc/Roblox_Dev Methodology/203_VCR_개발방법론_v1.1|VCR 개발방법론 v1.1]]
> **작성일**: 2026-01-25
> **상태**: 설계 중

---

<!-- AI_CONTEXT
Project: Roblox Fly Paper Plane
Level: Product
Current Focus: 로블록스 3D 종이비행기 타임어택 게임 PRD
Related Files: 웹 버전 PRD, VCR 방법론
Test: E2E (Studio Play Mode 전체 플레이)
-->

## 📋 기본 정보

| 항목 | 내용 |
|:---|:---|
| **프로젝트명** | Roblox Fly Paper Plane (로블록스 종이비행기 날아라) |
| **게임 장르** | 타임어택 비행 게임 |
| **타겟 플레이어** | 캐주얼 게이머 (10-30대), 로블록스 유저 |
| **개발 기간** | 2-3주 |
| **개발자** | @AnsibleMage |
| **Roblox 게임 ID** | TBD |

---

## 🎯 제품 비전

### 한 줄 설명
> 로블록스 3D 환경에서 종이비행기를 조종하여 장애물 사이를 자유롭게 비행하며 최단 시간에 골인하는 타임어택 게임

### 핵심 경험
1. **자유로운 비행**: 트랙 없이 장애물 사이를 내 방식대로 통과
2. **경쟁과 도전**: 글로벌 리더보드에서 1등을 향한 반복 도전
3. **즉시 플레이**: 복잡한 조작 없이 바로 게임 시작

### 성공 지표 (Success Metrics)
| 지표 | 목표 |
|:---|:---|
| **FPS** | ≥ 60 FPS |
| **입력 응답** | < 16ms (1프레임) |
| **동시 접속** | 최대 50명 |
| **리더보드 등록** | 100명+ |
| **개발 완료** | 2주 내 |

---

## 📦 계층 구조 (4-Layer)

```
🎯 Product: Roblox Fly Paper Plane
  ├── 📦 Block 1: 비행 조작 시스템 (Flight Control)
  │     ├── ⚙️ Feature 1.1: 입력 처리 시스템 (5 Task)
  │     ├── ⚙️ Feature 1.2: 비행 물리 엔진 (5 Task)
  │     └── ⚙️ Feature 1.3: 카메라 시스템 (5 Task)
  │
  ├── 📦 Block 2: 게임 코어 시스템 (Game Core)
  │     ├── ⚙️ Feature 2.1: 코스 관리 시스템 (5 Task)
  │     ├── ⚙️ Feature 2.2: 타이머 & 기록 시스템 (5 Task)
  │     └── ⚙️ Feature 2.3: 충돌 감지 & 게임 상태 (5 Task)
  │
  ├── 📦 Block 3: 소셜 시스템 (Social System)
  │     ├── ⚙️ Feature 3.1: 플레이어 인증 (5 Task)
  │     ├── ⚙️ Feature 3.2: 리더보드 시스템 (5 Task)
  │     └── ⚙️ Feature 3.3: 개인 기록 관리 (5 Task)
  │
  └── 📦 Block 4: UI/UX 통합 시스템 (UI/UX Integration)
        ├── ⚙️ Feature 4.1: 메인 로비 (5 Task)
        ├── ⚙️ Feature 4.2: 게임 HUD (5 Task)
        ├── ⚙️ Feature 4.3: 결과 화면 (5 Task)
        └── ⚙️ Feature 4.4: 3D 환경 (5 Task)

총: 1 제품 = 4 블럭 = 13 중단위 = 65 작은단위
```

---

## 🎮 Block 개요

### Block 1: 비행 조작 시스템 (Flight Control)
**책임**: 플레이어 입력 → 비행기 움직임 → 카메라 추적

| Feature | 설명 |
|:---|:---|
| 1.1 입력 처리 | WASD + 마우스로 비행기 조종 |
| 1.2 비행 물리 | 양력, 중력, 속도 시뮬레이션 |
| 1.3 카메라 | 3인칭 추적 카메라 |

**Roblox 기술 매핑**:
- `UserInputService` - 키보드/마우스 입력
- `BodyVelocity`, `BodyGyro` - 비행기 물리
- `Camera` API - 카메라 제어

---

### Block 2: 게임 코어 시스템 (Game Core)
**책임**: 게임 진행 관리 (시작 → 플레이 → 골인)

| Feature | 설명 |
|:---|:---|
| 2.1 코스 관리 | 시작점, 골인점, 장애물 배치 |
| 2.2 타이머 | 0.01초 단위 시간 측정 |
| 2.3 충돌 감지 | 장애물/골인 감지 및 상태 전환 |

**Roblox 기술 매핑**:
- `Touched` 이벤트 - 충돌 감지
- `tick()` - 고정밀 타이머
- `RemoteEvent` - 서버-클라이언트 통신

---

### Block 3: 소셜 시스템 (Social System)
**책임**: 플레이어 기록 및 리더보드 관리

| Feature | 설명 |
|:---|:---|
| 3.1 플레이어 인증 | Roblox UserId 기반 자동 인증 |
| 3.2 리더보드 | Top 100 표시, 실시간 업데이트 |
| 3.3 기록 관리 | DataStore 저장/조회/갱신 |

**Roblox 기술 매핑**:
- `Players.UserId` - 플레이어 식별
- `DataStoreService` - 기록 저장
- `OrderedDataStore` - 리더보드 순위

---

### Block 4: UI/UX 통합 시스템 (UI/UX Integration)
**책임**: 게임 화면 및 사용자 인터페이스

| Feature | 설명 |
|:---|:---|
| 4.1 메인 로비 | 게임 시작 대기, 설정 |
| 4.2 게임 HUD | 타이머, 속도계, 미니맵 |
| 4.3 결과 화면 | 기록 표시, 재시작/리더보드 |
| 4.4 3D 환경 | 코스 모델, 스카이박스, 이펙트 |

**Roblox 기술 매핑**:
- `ScreenGui`, `Frame`, `TextLabel` - UI
- `Workspace` - 3D 환경
- `TweenService` - 애니메이션

---

## 🏗️ 기술 아키텍처

### Rojo 프로젝트 구조
```
200_Roblox_Fly_paper_plane/
├── default.project.json
├── src/
│   ├── server/
│   │   ├── Block1_FlightControl/
│   │   ├── Block2_GameCore/
│   │   ├── Block3_Social/
│   │   └── init.server.lua
│   ├── client/
│   │   ├── Block4_UI/
│   │   └── init.client.lua
│   └── shared/
│       ├── Config.lua
│       ├── Types.lua
│       └── Utils.lua
├── assets/
│   ├── PlaneModel.rbxmx
│   └── CourseElements/
└── doc/
    ├── 100_Product_PRD.md (이 문서)
    ├── 110_Block1_FlightControl.md
    ├── 120_Block2_GameCore.md
    ├── 130_Block3_Social.md
    └── 140_Block4_UI.md
```

### 기술 스택
| 분류 | 도구 |
|:---|:---|
| **엔진** | Roblox Studio |
| **언어** | Luau |
| **동기화** | Rojo 7.6+ |
| **AI** | Claude/Antigravity |
| **버전관리** | Git/GitHub |

---

## 🧪 E2E 테스트 시나리오

### 시나리오 1: 기본 플레이 흐름
```
Given: 플레이어가 게임에 입장
When: 로비에서 "시작" 클릭 → 코스 비행 → 골인점 도달
Then: 기록이 표시되고 리더보드에 등록됨
```

### 시나리오 2: 장애물 충돌
```
Given: 플레이어가 비행 중
When: 장애물에 충돌
Then: 시작점으로 리스폰, 타이머 초기화
```

### 시나리오 3: 리더보드 경쟁
```
Given: 플레이어가 골인 완료
When: 결과 화면에서 "리더보드" 클릭
Then: Top 100과 내 순위가 표시됨
```

---

## 📅 일정 (Timeline)

| Phase | 기간 | 내용 |
|:---|:---|:---|
| **Phase 1** | 3일 | Block 1 (비행 조작) 완료 |
| **Phase 2** | 3일 | Block 2 (게임 코어) 완료 |
| **Phase 3** | 2일 | Block 3 (소셜) 완료 |
| **Phase 4** | 3일 | Block 4 (UI/UX) 완료 |
| **E2E Test** | 1일 | 전체 통합 테스트 |
| **Launch** | 1일 | Roblox 퍼블리싱 |
| **총** | **13일** | 약 2주 |

---

## ⚠️ 리스크 및 완화

| 리스크 | 영향 | 완화 방안 |
|:---|:---|:---|
| 비행 물리 조작 어려움 | 높음 | 간단한 BodyVelocity 기반으로 시작 |
| DataStore 요청 제한 | 중간 | 캐싱 및 요청 최소화 |
| 동시 접속 성능 | 중간 | 서버 로직 최적화, 50명 제한 |

---

## ❌ Non-Goals (v1.0 제외)

- [ ] 멀티플레이 실시간 대전
- [ ] 모바일 추가 컨트롤
- [ ] 커스텀 코스 에디터
- [ ] 유료 아이템/게임패스

---

## 📝 변경 이력

| 날짜 | 변경 내용 | 작성자 |
|:---|:---|:---|
| 2026-01-25 | 초안 작성 (웹 버전 PRD 기반) | Antigravity |

---

**VCR Methodology v1.1**
*"From Web to Roblox—Adapting the Flight Experience."*
