# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Project:** Fly Paper Plane (종이비행기 날아라)
**Type:** Web-based 3D Flight Game (Roblox-style, Time Attack)
**Development Method:** CJ_AI_개발방법론 v1.2 (4-Layer Fractal TDD + Pyramid Workflow + Adaptive Methodology)
**Stage:** Block 1-3 Complete (847 tests ✅) → Block 4 Design Pending
**Target Platform:** Desktop Web Browser (macOS development)
**Current Status:** 64% Complete (9/14 Features, 45/70 Tasks)

---

## Architecture (4-Layer Hierarchy)

> **⚠️ 중요 변경 (2025-11-08):**
> Block 1-3 완료 후 UI/UX 통합 레이어 필요성 발견 → **Block 4 추가 결정**
> v1.1 (3 Blocks) → v1.2 (4 Blocks) 확장

```
1 Product = 4 Blocks = 14 Features = 70 Tasks

Block 1: Flight Control System ✅ (454 tests)
├─ Feature 1.1: Input Handler (5 Tasks) ✅
├─ Feature 1.2: Flight Physics Engine (5 Tasks) ✅
└─ Feature 1.3: Camera System (5 Tasks) ✅

Block 2: Game Core System ✅ (204 tests)
├─ Feature 2.1: Course Manager (5 Tasks) ✅
├─ Feature 2.2: Timer & Record (5 Tasks) ✅
└─ Feature 2.3: Collision & State (5 Tasks) ✅

Block 3: Social System ✅ (183 tests)
├─ Feature 3.1: Email Auth (5 Tasks) ✅
├─ Feature 3.2: Leaderboard UI (5 Tasks) ✅
└─ Feature 3.3: Record Manager (5 Tasks) ✅

Block 4: UI/UX Integration System ⏳ (설계 중)
├─ Feature 4.1: Main Menu Screen (5 Tasks)
├─ Feature 4.2: Game Play HUD (5 Tasks)
├─ Feature 4.3: Result Screen (5 Tasks)
├─ Feature 4.4: 3D Environment Integration (5 Tasks)
└─ Feature 4.5: Sound & Effects System (5 Tasks)
```

**아키텍처 원칙 (Clean Architecture):**
- **Domain Layer (Block 1-3)**: 비즈니스 로직, 도메인 모델
- **Presentation Layer (Block 4)**: UI/UX, 사용자 인터페이스

---

## Tech Stack

**Frontend:**
- React 18.2.0 + TypeScript 5.3.0 + Vite 5.0.0
- Three.js 0.160.0 + @react-three/fiber 8.15.0 + @react-three/drei 9.92.0

**Physics & State:**
- cannon-es 0.20.0 (Block 1: Flight Physics)
- @react-three/rapier 1.2.1 (Block 2: Collision)
- zustand 4.4.7 (State Management)

**Testing:**
- vitest 1.0.0 (Unit/Integration Tests)
- playwright 1.40.0 (E2E Tests)
- @stryker-mutator/core (Mutation Testing, >80% target)

**Backend:** Node.js + Express + PostgreSQL
**Hosting:** Vercel (frontend) + Railway (backend)

---

## Development Workflow

### Phase 1: PRD (✅ Complete, v1.1 Updated)
- Document: `doc/Product_PRD_종이비행기날아라.md`
- Defines: 4 Blocks, 14 Features, 70 Tasks, Success Metrics
- Status: Block 1-3 완료, Block 4 추가 반영

### Phase 2: Block Design
- Template: `doc/Block_템플릿_통합.md`
- Block 1-3: ✅ Complete (설계 문서 존재)
- Block 4: ⏳ Next - 설계 문서 작성 필요
- Location: `doc/Block[N]_[name].md`

### Phase 3: Development Kickoff
Run 5-step initialization:
```bash
# 1. Project Init
git init
npm init -y

# 2. Folder Structure (AI-optimized)
mkdir -p src/blocks/block1-flight-control/features/f1-input-handler/tasks
mkdir -p src/blocks/block2-game-core/features/f1-course-manager/tasks
mkdir -p src/blocks/block3-social/features/f1-email-auth/tasks

# 3. Install Dependencies
npm install react react-dom three @react-three/fiber @react-three/drei cannon-es zustand
npm install -D typescript vite vitest playwright @testing-library/react eslint prettier

# 4. Config Files
# tsconfig.json, vite.config.ts, vitest.config.ts, eslint, .env.local

# 5. First Red Test
# Create: src/blocks/block1-flight-control/features/f1-input-handler/tasks/t1-keyboard-input.test.ts
```

### Phase 4: TDD Development (Pyramid)
```
Task Unit Test (⬇️) → Feature Integration Test (⬆️) → Block Module Test (⬆️) → Product E2E Test (⬆️)
```

**Order:**
1. Task 1.1.1: Red → Green → Refactor → Mutation (>80%)
2. Task 1.1.2 ~ 1.1.5: Repeat
3. Feature 1.1 Integration TDD (after all 5 Tasks ⬆️)
4. Feature 1.2, 1.3: Repeat
5. Block 1 Module TDD (after all 3 Features ⬆️)
6. Block 2, 3: Repeat
7. Product E2E TDD (after all 3 Blocks ⬆️)

---

## File Naming Convention (AI-Optimized)

**Purpose:** Enable AI to find files instantly (< 0.1s)

```
src/blocks/block[N]-[name]/
  features/f[N]-[name]/
    tasks/
      t[N]-[name].ts          # Task implementation
      t[N]-[name].test.ts     # Unit test
    index.ts                   # Feature integration
    f[N]-[name].integration.test.ts  # Integration test
  index.ts                     # Block module
  block[N].module.test.ts      # Module test

Examples:
- src/blocks/block1-flight-control/features/f1-input-handler/tasks/t1-keyboard-input.ts
- src/blocks/block1-flight-control/features/f1-input-handler/f1-input-handler.integration.test.ts
- src/blocks/block1-flight-control/block1.module.test.ts
```

---

## Test Commands

**Unit Tests (Task level):**
```bash
npm test                          # Run all tests with watch
npm test -- t1-keyboard-input     # Run specific task test
npm run test:coverage             # Coverage report (target: >90%)
```

**Integration Tests (Feature level):**
```bash
npm test -- f1-input-handler.integration.test.ts
```

**Module Tests (Block level):**
```bash
npm test -- block1.module.test.ts
```

**E2E Tests (Product level):**
```bash
npm run test:e2e                  # Run all E2E tests
npm run test:e2e -- --headed      # Visual debugging
```

**Mutation Tests:**
```bash
npm run test:mutation             # Stryker mutation testing (target: >80%)
```

---

## Quality Standards (CLEAR Principles)

Every code must satisfy:

| Principle | Target | Check |
|-----------|--------|-------|
| **C**oncise | Complexity < 10 | ESLint `complexity` rule |
| **L**ogical | Clear flow | No circular dependencies |
| **E**xplicit | No magic numbers | Named constants |
| **A**daptive | Change impact < 20% | Dependency Injection |
| **R**eflective | Test coverage > 90% | Vitest coverage, Mutation score > 80% |

**File Constraints:**
- Max 200 lines per file
- Max 50 lines per function

---

## Development Rules

### ⚠️ Critical: Pyramid Workflow Order

**DO NOT:**
- ❌ Write Feature Integration TDD before Task completion
- ❌ Write Block Module TDD before Feature completion
- ❌ Write Product E2E TDD before Block completion

**DO:**
- ✅ Task development → Feature TDD (after Task 5/5 ⬆️)
- ✅ Feature TDD → Block TDD (after all Features in Block ⬆️)
- ✅ Block TDD → Product E2E TDD (after all Blocks ⬆️)
- ✅ 중요 완료 시점마다 "문서 동기화" 실행

### PRD Sync Points

When writing Integration/Module/E2E TDD:
1. Read `doc/Product_PRD_종이비행기날아라.md`
2. Check Success Metrics section
3. Ensure test validates those metrics
4. If metric missing → update PRD or add test

### TDD Cycle (Task Level)

```
Red (15min):
  - Write failing test
  - Run: npm test
  - Confirm: FAIL 🔴

Green (30min):
  - Minimal implementation
  - Run: npm test
  - Confirm: PASS 🟢

Refactor (30min):
  - Remove duplication
  - Apply CLEAR principles
  - Run: npm test
  - Confirm: STILL PASS 🔵

Mutation (15min):
  - Run: npm run test:mutation
  - Confirm: Score > 80% 🧬
```

---

## 📄 Documentation Sync Rules

> **핵심 원칙:** 변경사항 발생 시 즉시 관련 문서 모두 업데이트 (나중에 한꺼번에 ❌)

### 왜 즉시 업데이트해야 하는가?

**❌ 나중에 한꺼번에 업데이트하면:**
- 변경 이유를 잊어버림 (컨텍스트 손실)
- 일관성 검증이 어려워짐
- 문서 간 불일치 발생 위험 높음
- 다음 작업자가 잘못된 정보로 시작

**✅ 즉시 업데이트하면:**
- 변경 맥락이 생생할 때 문서화 (기억 손실 방지)
- 문서 간 불일치 최소화
- 다음 작업자가 최신 정보로 시작 가능
- 진화 과정이 명확하게 기록됨

### 트리거 단어: "문서 동기화"

**사용자가 "문서 동기화" 또는 "문서 업데이트"라고 말하면:**

Claude Code는 다음 작업을 **즉시** 수행합니다:

1. **핵심 문서 5개 일관성 체크:**
   - `.claude_memos/work_logs/YYYY-MM-DD.md` (작업 로그)
   - `.claude_memos/sessions/SESSION_MEMO_*.md` (세션 메모)
   - `.claude_memos/evolution/EVOLUTION_*.md` (진화 보고서)
   - `doc/Product_PRD_종이비행기날아라.md` (PRD)
   - `doc/CJ_AI_개발방법론.md` (방법론)

2. **불일치 발견 시 자동 업데이트:**
   - 변경된 Block/Feature/Task 수
   - 버전 번호 (v1.1 → v1.2)
   - 완료 상태 (⏳ → ✅)
   - 아키텍처 변경사항

3. **변경 이력 기록:**
   - 각 문서의 Change Log 업데이트
   - 변경 이유 명시
   - 타임스탬프 기록

### 문서 동기화 시나리오

#### 시나리오 1: Block 추가/제거
```
사용자: "Block 4를 추가했어. 문서 동기화 해줘."

Claude Code 실행:
1. ✅ 작업 로그에 Block 4 결정사항 기록
2. ✅ 세션 메모 생성 (Block 4 결정)
3. ✅ 진화 보고서 작성 (v1.1 → v1.2)
4. ✅ PRD 업데이트 (Block 4 추가, 계층 구조 수정)
5. ✅ 방법론 문서 업데이트 (유연한 Block 수 반영)
6. ✅ CLAUDE.md 업데이트 (프로젝트 현황 반영)

결과: 모든 문서가 "4 Blocks, 14 Features, 70 Tasks"로 일관성 확보
```

#### 시나리오 2: Feature 완료
```
사용자: "Feature 1.1이 완료됐어. 문서 동기화 해줘."

Claude Code 실행:
1. ✅ 작업 로그에 Feature 1.1 완료 기록
2. ✅ PRD의 "Block 진행 현황" 업데이트 (Feature 1.1: ⏳ → ✅)
3. ✅ CLAUDE.md의 Architecture 섹션 업데이트
4. ✅ 필요 시 세션 메모 생성

결과: 진행 상황이 모든 문서에 실시간 반영
```

#### 시나리오 3: 방법론 변경
```
사용자: "방법론을 v1.3로 업데이트했어. 문서 동기화 해줘."

Claude Code 실행:
1. ✅ CJ_AI_개발방법론.md 버전 업데이트
2. ✅ PRD 문서의 "개발 방법론" 섹션 업데이트
3. ✅ CLAUDE.md의 "Development Method" 업데이트
4. ✅ 진화 보고서에 방법론 변경 이유 기록

결과: 방법론 버전이 모든 문서에 일관되게 반영
```

### 핵심 문서 매핑

| 변경 유형 | 업데이트 필요 문서 |
|-----------|-------------------|
| **Block 추가/제거** | PRD, 방법론, CLAUDE.md, 작업 로그, 진화 보고서 |
| **Feature 완료** | PRD, CLAUDE.md, 작업 로그 |
| **Task 완료** | 작업 로그 (자동), CLAUDE.md (선택) |
| **방법론 변경** | 방법론, PRD, CLAUDE.md, 진화 보고서 |
| **아키텍처 변경** | PRD, CLAUDE.md, Block 설계 문서 |
| **Success Metrics 변경** | PRD, E2E Test Plan |

### 자동화 가능 항목

**자동 (트리거 불필요):**
- Task 완료 시 작업 로그 자동 append (TodoWrite completed 시)

**반자동 (트리거 필요: "문서 동기화"):**
- 핵심 문서 5개 일관성 체크 및 업데이트
- 변경 이력 기록
- 버전 번호 관리

**수동 (명시적 요청):**
- 진화 보고서 심층 분석 ("진화 보고서 작성해줘")
- 세션 메모 생성 ("메모해줘")

### 체크리스트

**문서 동기화 전 확인:**
- [ ] 변경 사항이 명확한가?
- [ ] 어떤 문서들이 영향받는가?
- [ ] 변경 이유가 기록되었는가?

**문서 동기화 후 확인:**
- [ ] 모든 문서의 숫자가 일치하는가? (Block/Feature/Task 수)
- [ ] 버전 번호가 일관되는가?
- [ ] 완료 상태 마커(✅/⏳)가 정확한가?
- [ ] 타임스탬프가 기록되었는가?

### 실전 예시 (7100_Fly_paper_plane)

**2025-11-08 Block 4 추가 결정:**

```
[사용자]
"Block 4를 추가했어. UI/UX Integration System이야. 문서 동기화 해줘."

[Claude Code]
✅ 작업 로그 업데이트 (Block 4 결정사항 165줄 기록)
✅ 세션 메모 생성 (SESSION_MEMO_20251108_233000.md, 480줄)
✅ 진화 보고서 작성 (EVOLUTION_v1.1_to_v1.2_Block4_Addition.md, 631줄)
✅ PRD 업데이트 (v1.0 → v1.1, 12개 섹션 수정)
✅ 방법론 업데이트 (v1.1 → v1.2, FAQ Q5 추가, 15개 섹션 수정)
✅ CLAUDE.md 업데이트 (현재 문서)

결과:
- 모든 문서: "1 Product = 4 Blocks = 14 Features = 70 Tasks" 일관성 확보
- 방법론: Adaptive Methodology 원칙 확립
- 변경 이력: 5개 문서 모두 타임스탬프와 이유 기록
```

**교훈:** 즉시 동기화로 30분 내 모든 문서 일관성 확보 완료!

---

## Key Documents

| Document | Purpose | Location | Status |
|----------|---------|----------|--------|
| **Product PRD** | Product requirements, 4 Blocks, Success Metrics | `doc/Product_PRD_종이비행기날아라.md` | v1.1 ✅ |
| **Methodology** | CJ_AI 4-Layer Fractal TDD guide | `doc/CJ_AI_개발방법론.md` | v1.2 ✅ |
| **Block Template** | Block + Feature + Task unified template | `doc/Block_템플릿_통합.md` | - |
| **Memory Report** | Project kickoff session notes | `doc/Memory_종이비행기_프로젝트_시작_v1.md` | - |
| **Evolution Report** | v1.1 → v1.2 Block 4 addition | `.claude_memos/evolution/EVOLUTION_v1.1_to_v1.2_Block4_Addition.md` | ✅ |
| **Work Log** | Daily task completion log | `.claude_memos/work_logs/2025-11-08.md` | ✅ |
| **Session Memo** | Session context and decisions | `.claude_memos/sessions/SESSION_MEMO_20251108_233000.md` | ✅ |

---

## Success Metrics (from PRD)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial Load | < 3s | Lighthouse Performance |
| FPS | ≥ 60 | Game FPS counter |
| Input Response | < 16ms | Event → Screen render |
| Leaderboard Query | < 1s | API response time |
| Test Coverage | > 90% | Vitest coverage |
| Mutation Score | > 80% | Stryker mutation |

---

## Environment

**Development OS:** macOS 14+ (Sonoma)
**Node.js:** v18.0+
**Package Manager:** npm

**Tools:**
- VS Code (recommended extensions: ESLint, Prettier, Error Lens, R3F autocomplete)
- Git
- Homebrew (for macOS package management)

---

## Next Steps (for new Claude Code instance)

### Current Status: Block 1-3 Complete ✅ → Block 4 Design

1. **Read context documents:**
   - `doc/Product_PRD_종이비행기날아라.md` (understand product, v1.1)
   - `.claude_memos/evolution/EVOLUTION_v1.1_to_v1.2_Block4_Addition.md` (understand why Block 4)
   - `.claude_memos/sessions/SESSION_MEMO_20251108_233000.md` (latest decisions)

2. **Create Block 4 design document:**
   - Template: `doc/Block_템플릿_통합.md`
   - Create: `doc/Block4_UI_UX_Integration.md`
   - Define: 5 Features (Main Menu, HUD, Result Screen, 3D Environment, Sound)

3. **Start Block 4 development (TDD):**
   - Feature 4.1: Main Menu Screen
   - Feature 4.2: Game Play HUD
   - Feature 4.3: Result Screen
   - Feature 4.4: 3D Environment Integration
   - Feature 4.5: Sound & Effects System

4. **문서 동기화 필수:**
   - 각 Feature 완료 시: "문서 동기화" 트리거
   - Block 4 완료 시: PRD, CLAUDE.md 업데이트

---

## Important Notes

- **Current focus: Block 4 design:** PRD updated with Block 4, design document needed before development
- **AI handles design + code:** Developer provides ideas, AI writes PRD → Block → Feature → Task → Code
- **Pyramid workflow:** Build bottom-up (Task → Feature → Block → Product)
- **PRD sync mandatory:** All higher-level tests must validate PRD Success Metrics
- **문서 동기화 필수:** 중요 변경 시 즉시 "문서 동기화" 트리거 (나중에 한꺼번에 ❌)
- **Adaptive methodology:** Block 수는 고정이 아님 (3-5개 권장, 프로젝트 특성에 따라 조정)

---

## AI Memory System

**Purpose:** Claude Code AI의 작업 컨텍스트를 세션 간 유지하고, 프로젝트 진화 과정을 학습 가능한 형태로 기록합니다.

### Memory Structure

```
.claude_memos/
├─ sessions/          # 세션별 자동 메모 (모든 작업 세션)
│  └─ YYYYMMDD_HHMMSS.md
├─ work_logs/         # 일일 작업 로그 (프로젝트별)
│  └─ YYYY-MM-DD.md
└─ evolution/         # 진화 보고서 (중요 마일스톤)
   └─ [topic]_v[N].md
```

### Memory Types

#### 1. Session Memo (세션 메모)
**목적:** 모든 작업 세션의 컨텍스트 자동 기록
**생성 주기:** 매 세션 종료 시 (1-2분 소요)
**트리거:** "메모해줘" 또는 세션 종료 시 자동
**위치:** `.claude_memos/sessions/`

**포함 내용:**
- 작업 목표 및 범위
- 주요 결정사항
- 완료된 작업 목록
- 다음 단계 TODO
- 핵심 교훈 및 인사이트

**파일명 형식:** `YYYYMMDD_HHMMSS.md`
**예시:** `20251108_173800.md`

#### 2. Work Log (작업 로그)
**목적:** Task 완료 시 실시간 작업 내용 자동 기록 (누적)
**생성 주기:** Task 1개 완료 시마다 자동 append
**트리거:** **자동 (TODO를 completed로 변경 시)**
**위치:** `.claude_memos/work_logs/`

**포함 내용:**
- Task 번호 및 이름
- 작업 시간 (시작-종료)
- TDD 사이클 (Red → Green → Refactor → Mutation)
- 생성/수정된 파일 목록
- 테스트 결과 (커버리지, Mutation 점수)
- 주요 결정사항 및 이슈

**파일명 형식:** `YYYY-MM-DD.md`
**예시:** `2025-11-08.md`

**Append 방식:**
```markdown
# Work Log - 2025-11-08

## Task 1.1.1: Keyboard Input Handler (09:00-10:30)
✅ Completed
- Red: Input event test 작성
- Green: KeyboardEventListener 구현
- Refactor: Event delegation 패턴 적용
- Mutation: 85% (목표 달성)
- Files: t1-keyboard-input.ts, t1-keyboard-input.test.ts

## Task 1.1.2: Touch Input Handler (10:45-12:00)
✅ Completed
...
```

#### 3. Evolution Report (진화 보고서)
**목적:** 중요 마일스톤 달성 시 상세 진화 과정 기록
**생성 주기:** 주요 단계 완료 시 (1-2시간 소요)
**트리거:** "진화 보고서 작성해줘" 또는 마일스톤 달성 시
**위치:** `.claude_memos/evolution/`

**포함 내용:**
- "왜 이렇게 진화했는가" 심층 분석
- 시도한 접근 방법들 (실패 포함)
- 의사결정 과정 및 근거
- 미래 AI를 위한 학습 자료
- 타임라인 및 시간 투자

**파일명 형식:** `[topic]_v[N].md`
**예시:** `Block1_Flight_Control_v1.md`

**마일스톤 기준:**
- Block 설계 3개 완료
- Block 1-3 각각 개발 완료
- Product E2E Test 통과
- 프로덕션 배포

### Usage Commands

#### 자동 기록 (트리거 불필요)

**Work Log (작업 로그):**
```
Task 완료 시 자동 append
→ TodoWrite에서 Task를 "completed"로 변경하는 순간 자동 기록
→ .claude_memos/work_logs/YYYY-MM-DD.md에 실시간 누적

예시:
TodoWrite([
  {content: "Task 1.1.1: Keyboard Input", status: "completed", ...}
])
→ 즉시 2025-11-08.md에 Task 1.1.1 내용 append
```

#### 수동 기록 (사용자 트리거)

**세션 메모 생성:**
```
"메모해줘" 또는 "작업내용을 메모해줘"
→ .claude_memos/sessions/YYYYMMDD_HHMMSS.md 생성
```

**진화 보고서 생성:**
```
"Block 1 진화 보고서 작성해줘"
→ .claude_memos/evolution/Block1_v1.md 생성
```

#### 메모 읽기 (컨텍스트 로드)

**세션 메모 읽기:**
```
"지난 세션 메모 읽어줘"
→ 최근 세션 메모를 읽고 컨텍스트 이해
```

**작업 로그 확인:**
```
"오늘 작업 로그 보여줘"
→ .claude_memos/work_logs/YYYY-MM-DD.md 읽기

"이번 주 작업 로그 요약해줘"
→ 해당 주 모든 작업 로그 분석 및 요약
```

### Automatic Trigger Points (자동 트리거 포인트)

**중요:** Claude Code는 다음 이벤트 발생 시 자동으로 Work Log를 기록합니다.

#### Task 완료 이벤트
```typescript
// Task를 completed로 변경하는 순간
TodoWrite([
  {
    content: "Task 1.1.1: Keyboard Input Handler",
    status: "completed",  // ← 이 순간 Work Log 자동 append
    activeForm: "..."
  }
])

// 자동 실행되는 작업:
1. 현재 날짜 파일 확인: .claude_memos/work_logs/YYYY-MM-DD.md
2. 파일이 없으면 생성, 있으면 append
3. Task 정보 기록:
   - Task 번호 및 이름
   - 작업 시간 (TODO 생성 시간 ~ completed 시간)
   - TDD 사이클 결과
   - 생성/수정된 파일
   - 테스트 결과 (커버리지, Mutation 점수)
   - 주요 결정사항
```

#### Work Log 자동 기록 포맷
```markdown
## Task 1.1.1: Keyboard Input Handler (09:30-10:30)
✅ Completed

**TDD Cycle:**
- 🔴 Red: Input event test 작성 (15min)
- 🟢 Green: KeyboardEventListener 구현 (30min)
- 🔵 Refactor: Event delegation 패턴 적용 (30min)
- 🧬 Mutation: 85% (목표 80% 달성)

**Files:**
- src/blocks/block1-flight-control/features/f1-input-handler/tasks/t1-keyboard-input.ts
- src/blocks/block1-flight-control/features/f1-input-handler/tasks/t1-keyboard-input.test.ts

**Test Results:**
- Coverage: 92%
- Mutation Score: 85%
- All tests passed ✓

**Decisions:**
- Event delegation 패턴 적용으로 메모리 효율 20% 개선
- WASD + Arrow keys 동시 지원
```

### AI Agent Integration

**메모리 시스템 에이전트 역할 분담:**

#### 1. Work Log → **개발 전문 에이전트 (저) 직접 작성** ⚡
```
역할: Task 개발 과정을 가장 잘 아는 코딩 전문 에이전트
시점: TODO를 "completed"로 변경하는 순간 자동
내용: TDD 사이클, 파일 변경, 테스트 결과 등 개발 세부사항
방식: .claude_memos/work_logs/YYYY-MM-DD.md에 직접 append

에이전트 필요 없음 - 저 (code_developer)가 직접 기록
```

#### 2. Session Memo → **`session-memo-writer` 에이전트** 📝
```typescript
Task(
  subagent_type: "session-memo-writer",
  description: "세션 메모 자동 생성",
  prompt: "이번 세션의 작업 내용을 요약하고 .claude_memos/sessions/에 저장해줘"
)

역할: 전체 세션의 큰 그림 파악, 간결한 요약 전문
시점: "메모해줘" 트리거 또는 세션 종료 시
내용: 작업 목표, 주요 결정사항, 완료 Task 목록, 다음 단계 TODO
방식: .claude_memos/sessions/YYYYMMDD_HHMMSS.md 독립 파일 생성
```

#### 3. Evolution Report → **`memory-report-generator` 에이전트** 🧬
```typescript
Task(
  subagent_type: "memory-report-generator",
  description: "Block 1 진화 보고서",
  prompt: "Block 1 Flight Control 개발 과정의 진화 과정을 상세히 분석하고 보고서를 작성해줘. Work Log와 Session Memo를 모두 참조하여 '왜 이렇게 진화했는가'를 심층 분석하고, 시도한 접근 방법들(실패 포함), 의사결정 과정, 미래 AI를 위한 학습 자료를 .claude_memos/evolution/에 저장해줘"
)

역할: "왜 이렇게 진화했는가" 심층 분석 전문가
시점: "진화 보고서 작성해줘" 트리거 (마일스톤 달성 시)
내용: 진화 과정, 시도한 접근법(실패 포함), 의사결정 근거, 미래 AI 학습 자료
방식: .claude_memos/evolution/[topic]_v[N].md 심층 보고서 생성
특징: Work Log + Session Memo를 모두 분석하여 통찰 도출
```

**에이전트 선택 이유:**
- `session-memo-writer`: 빠른 요약, 세션 단위 컨텍스트 기록
- `memory-report-generator`: 진화 과정 기록, "왜?"에 집중, 미래 AI를 위한 학습 자료 생성

### Memory-Aware Working Principles

**Before Work:**
1. 최근 세션 메모 확인 (컨텍스트 로드)
2. **오늘 작업 로그 확인** (이미 완료된 Task 파악)
3. 진화 보고서에서 과거 결정사항 검토

**During Work:**
- TODO 리스트로 Task 진행 상황 추적
- **Task 완료 시 TODO를 "completed"로 변경** → **Work Log 자동 append** ⚡
- 중요 결정사항은 Task 작업 중 기록
- 예상치 못한 이슈는 TODO에 새 항목 추가

**After Work (Task 1개 완료):**
- ✅ **Work Log 자동 기록** (TodoWrite completed 시 자동) ← 트리거 불필요
- 다음 Task TODO를 "in_progress"로 변경
- 필요 시 중간 체크포인트 세션 메모 생성 ("메모해줘")

**After Work (세션 종료):**
- 세션 메모 생성 ("메모해줘" 트리거)
- 다음 세션을 위한 TODO 정리

**After Work (마일스톤 달성):**
- 진화 보고서 작성 ("진화 보고서 작성해줘" 트리거)
- Block/Feature 완료 후 PRD 싱크

### Integration with Global CLAUDE.md

**글로벌 CLAUDE.md와의 관계:**
- 글로벌: 범용 에이전트 시스템 정의 (27개 에이전트)
- 프로젝트: 프로젝트별 메모리 시스템 구현
- 글로벌 에이전트 → 프로젝트 메모리 시스템 활용

**예시:**
```
글로벌 CLAUDE.md에 정의된 에이전트:
- requirements_analyst
- system_architect
- code_developer

↓ 이들이 생성한 결과물이 프로젝트 메모리에 기록됨 ↓

프로젝트 .claude_memos/:
- sessions/20251108_173800.md (Block 설계 세션)
- work_logs/2025-11-08.md (Block 설계 작업 로그)
- evolution/Block_Design_v1.md (설계 진화 보고서)
```

### Best Practices

1. **세션 메모는 가볍게:** 1-2분 내로 빠르게 기록
2. **작업 로그는 구조화:** 일관된 포맷으로 통합
3. **진화 보고서는 심층적:** "왜?"에 집중, 실패도 포함
4. **타임스탬프 활용:** 모든 메모에 정확한 시간 기록
5. **컨텍스트 체인:** 이전 메모 참조로 연결성 유지

### Example Workflow

```
# 아침: 새 세션 시작 (09:00)
1. "지난 세션 메모 읽어줘"
   → Claude가 .claude_memos/sessions/의 최근 메모 로드
   → 어제 작업 컨텍스트 이해

2. "오늘 작업 로그 보여줘"
   → .claude_memos/work_logs/2025-11-08.md 확인
   → 이미 완료된 Task 파악

# 작업 중: Task 1.1.1 개발 (09:30-10:30)
3. Task 1.1.1: Keyboard Input Handler TDD
   - Red → Green → Refactor → Mutation
   - TodoWrite로 Task 1.1.1을 "completed"로 변경
   → ⚡ Work Log 자동 append (사용자 트리거 불필요!)
   → .claude_memos/work_logs/2025-11-08.md에 즉시 기록

# 작업 중: Task 1.1.2 개발 (10:45-12:00)
4. Task 1.1.2: Touch Input Handler TDD
   - TodoWrite로 Task 1.1.2를 "completed"로 변경
   → ⚡ Work Log 자동 append
   → 누적 기록됨

# 점심 후: 중간 체크포인트 (12:30)
5. "작업내용을 메모해줘"
   → 오전 작업 세션 메모 생성
   → .claude_memos/sessions/20251108_123000.md

# 저녁: 하루 마무리 (18:00)
6. "메모해줘"
   → 오후 작업 세션 메모 생성
   → .claude_memos/sessions/20251108_180000.md

   (Work Log는 이미 Task마다 자동 기록되어 있음)

# 주말: Block 1 완료
7. "Block 1 진화 보고서 작성해줘"
   → 1주일간의 모든 Work Log + Session Memo 분석
   → .claude_memos/evolution/Block1_Flight_Control_v1.md
```

---
