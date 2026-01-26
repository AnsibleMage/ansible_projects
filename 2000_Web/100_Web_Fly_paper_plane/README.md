# Fly Paper Plane (종이비행기 날아라)

> 3D Web-based Flight Game - Time Attack Challenge

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/fly-paper-plane)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Tests](https://img.shields.io/badge/tests-847%20passing-brightgreen.svg)](./tests)
[![Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen.svg)](./coverage)

Roblox 스타일의 3D 비행 게임으로, 종이비행기를 조종하여 장애물을 피하고 골 지점까지 도달하는 타임어택 게임입니다.

## 주요 기능

### 게임 플레이
- **직관적인 비행 조작**: WASD 키로 상하좌우 이동, Shift로 부스트
- **3D 환경**: Three.js 기반 몰입감 있는 3D 그래픽
- **장애물 회피**: 나무, 건물 등 다양한 장애물 피하기
- **타임어택**: 최단 시간으로 골 지점 도달
- **실시간 카메라**: 3인칭 시점으로 비행기 추적

### 소셜 기능
- **이메일 인증**: 간단한 이메일 기반 로그인
- **리더보드**: 전체 플레이어 순위 시스템
- **기록 저장**: 개인 최고 기록 관리

### UI/UX
- **메인 메뉴**: 게임 시작, 리더보드, 설정
- **게임 HUD**: 실시간 타이머, 속도계
- **결과 화면**: 게임 완료 시 기록 표시 및 저장
- **배경음악 & 효과음**: 몰입감 있는 사운드 시스템

## 기술 스택

### Frontend
- **React 18.2.0** - UI 프레임워크
- **TypeScript 5.3.0** - 타입 안정성
- **Vite 5.0.0** - 빌드 도구
- **Three.js 0.160.0** - 3D 렌더링
- **@react-three/fiber 8.15.0** - React Three.js 통합
- **@react-three/drei 9.92.0** - Three.js 헬퍼
- **Tailwind CSS 4.1.17** - 스타일링

### Physics & State
- **cannon-es 0.20.0** - 물리 엔진 (Block 1)
- **@react-three/rapier 1.2.1** - 충돌 감지 (Block 2)
- **zustand 4.4.7** - 상태 관리

### Testing
- **vitest 1.0.0** - 단위/통합 테스트
- **@testing-library/react 14.3.1** - React 컴포넌트 테스트
- **playwright 1.40.0** - E2E 테스트
- **@stryker-mutator/core 9.3.0** - 변이 테스트 (>80% 목표)

### Backend (계획)
- **Node.js + Express** - API 서버
- **PostgreSQL** - 데이터베이스
- **Railway** - 호스팅

## 빠른 시작

### 필요 조건
- Node.js v18.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/yourusername/fly-paper-plane.git
cd fly-paper-plane

# 의존성 설치
npm install
```

### 실행

```bash
# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

### 게임 조작법

| 키 | 동작 |
|---|------|
| **W** | 상승 |
| **S** | 하강 |
| **A** | 좌측 이동 |
| **D** | 우측 이동 |
| **Shift** | 부스트 (속도 증가) |

## 프로젝트 구조

이 프로젝트는 **CJ_AI_개발방법론 v2.0**을 기반으로 4-Layer 계층 구조로 개발되었습니다.

```
1 Product = 4 Blocks = 14 Features = 70 Tasks

Block 1: Flight Control System (Flight Physics, Input, Camera)
Block 2: Game Core System (Course, Timer, Collision)
Block 3: Social System (Auth, Leaderboard, Records)
Block 4: UI/UX Integration (Menu, HUD, Sounds)
```

### 폴더 구조

```
src/
├── blocks/
│   ├── block1-flight-control/
│   │   └── features/
│   │       ├── f1-input-handler/
│   │       ├── f2-flight-physics/
│   │       └── f3-camera-system/
│   ├── block2-game-core/
│   │   └── features/
│   │       ├── f1-course-manager/
│   │       ├── f2-timer-record/
│   │       └── f3-collision-state/
│   ├── block3-social/
│   │   └── features/
│   │       ├── f1-email-auth/
│   │       ├── f2-leaderboard-ui/
│   │       └── f3-record-manager/
│   └── block4-ui-ux/
│       └── features/
│           ├── f1-main-menu/
│           ├── f2-game-hud/
│           ├── f3-result-screen/
│           ├── f4-3d-environment/
│           └── f5-sound-effects/
├── components/           # React 컴포넌트
├── hooks/               # Custom React hooks
└── App.tsx              # 메인 애플리케이션
```

## 개발

### 테스트 실행

```bash
# 모든 단위 테스트 실행 (watch 모드)
npm test

# 특정 테스트 실행
npm test -- t1-keyboard-input

# 테스트 커버리지 (목표: >90%)
npm run test:coverage

# 변이 테스트 (목표: >80%)
npm run test:mutation

# E2E 테스트
npm run test:e2e

# E2E 테스트 (헤드리스 모드)
npm run test:e2e:headed
```

### 코드 품질

```bash
# ESLint 검사
npm run lint

# Prettier 포맷팅
npm run format
```

### 개발 방법론

이 프로젝트는 **4-Layer Fractal TDD + Pyramid Workflow**를 따릅니다:

```
Task Unit Test (⬇️)
  → Feature Integration Test (⬆️)
    → Block Module Test (⬆️)
      → Product E2E Test (⬆️)
```

**핵심 원칙:**
- **TDD (Test-Driven Development)**: Red → Green → Refactor → Mutation
- **CLEAR 원칙**: Concise, Logical, Explicit, Adaptive, Reflective
- **Pyramid 워크플로우**: 하위 레벨 완료 후 상위 레벨 통합
- **3단 검증 프로세스**: 문서 분석 → 파일 읽기 → 실행 테스트

자세한 내용은 [`doc/CJ_AI_개발방법론.md`](./doc/CJ_AI_개발방법론.md)를 참고하세요.

## 테스트 현황

| 레벨 | 테스트 수 | 상태 |
|------|-----------|------|
| **Block 1** (Flight Control) | 454 tests | ✅ Complete |
| **Block 2** (Game Core) | 204 tests | ✅ Complete |
| **Block 3** (Social) | 183 tests | ✅ Complete |
| **Block 4** (UI/UX) | 6 tests | ⏳ In Progress |
| **Total** | **847 tests** | **64% Complete** |

**품질 지표:**
- 테스트 커버리지: **>90%**
- 변이 점수: **>80%**
- 복잡도: **<10**

## 문서

### 핵심 문서
- [`CLAUDE.md`](./CLAUDE.md) - AI 개발 가이드
- [`doc/Product_PRD_종이비행기날아라.md`](./doc/Product_PRD_종이비행기날아라.md) - 제품 요구사항 명세
- [`doc/CJ_AI_개발방법론.md`](./doc/CJ_AI_개발방법론.md) - 개발 방법론 (v2.0)
- [`doc/LAUNCH_ROADMAP.md`](./doc/LAUNCH_ROADMAP.md) - 런칭 로드맵

### 진화 보고서
- [`.claude_memos/evolution/`](./.claude_memos/evolution/) - 프로젝트 진화 과정 기록

### 작업 로그
- [`.claude_memos/work_logs/`](./.claude_memos/work_logs/) - 일일 작업 기록

## 프로젝트 상태

**현재 단계:** Block 1-3 완료 (847 tests ✅) → Block 4 개발 중

**진행률:**
- 개발: 64% (9/14 Features, 45/70 Tasks)
- Block 통합: 100%
- DoD (Definition of Done): 43% (3/7 지표)

**런칭 타임라인:**
- Phase 1-2: LocalStorage MVP (3.5일, 11월 12일 완료 예정)
- Phase 3-4: Backend 통합 (추후 계획)

## 성능 목표

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| **Initial Load** | <3s | Lighthouse Performance |
| **FPS** | ≥60 | Game FPS counter |
| **Input Response** | <16ms | Event → Screen render |
| **Leaderboard Query** | <1s | API response time |

## 기여

이 프로젝트는 **CJ_AI_개발방법론**을 실험하는 연구 프로젝트입니다.
기여를 환영하며, 다음 절차를 따라주세요:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the development methodology (TDD, CLEAR principles)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.

## 감사의 말

- **Three.js** - 3D 그래픽 라이브러리
- **React Three Fiber** - React와 Three.js 통합
- **Cannon.js** - 물리 엔진
- **Claude Code** - AI 페어 프로그래밍 도구

---

**Made with** ❤️ **by CJ (Claude Code Agent)**

**개발 방법론:** CJ_AI_개발방법론 v2.0 (4-Layer Fractal TDD)
