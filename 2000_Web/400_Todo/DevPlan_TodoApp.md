# 개발 계획서 (Development Plan)
## TaskFlow - 스마트 투두리스트 앱

---

## 1. 문서 정보

| 항목 | 내용 |
|------|------|
| **프로젝트명** | TaskFlow |
| **문서 버전** | 1.0 |
| **작성일** | 2026-02-04 |
| **작성자** | An (앤) |
| **관련 문서** | PRD_TodoApp.md |

---

## 2. 기술 스택 선정

### 2.1 선정 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| **Framework** | React | 18.x |
| **Language** | TypeScript | 5.x |
| **Build Tool** | Vite | 5.x |
| **State Management** | Zustand | 4.x |
| **Styling** | Tailwind CSS | 3.x |
| **Drag & Drop** | @dnd-kit | 6.x |
| **Date Handling** | date-fns | 3.x |
| **Icons** | Lucide React | latest |
| **Testing** | Jest + React Testing Library | 29.x |
| **Linting** | ESLint + Prettier | latest |

### 2.2 기술 선정 근거

#### React 18 + TypeScript
```
✅ 선정 이유:
- React: 컴포넌트 기반 아키텍처로 재사용성 극대화
- TypeScript: 컴파일 타임 타입 체크로 런타임 오류 방지
- 생태계: 풍부한 라이브러리와 커뮤니티 지원

❌ 대안 비교:
- Vue: 학습 곡선은 낮으나 TypeScript 통합 경험이 React보다 떨어짐
- Svelte: 번들 크기는 작으나 생태계가 상대적으로 작음
```

#### Zustand (상태 관리)
```
✅ 선정 이유:
- 경량: Redux 대비 보일러플레이트 최소화 (번들 ~1KB)
- 간결: Provider 없이 사용 가능, 직관적 API
- 미들웨어: persist 미들웨어로 로컬스토리지 연동 내장

❌ 대안 비교:
- Redux Toolkit: 강력하지만 이 규모에 과도함
- Jotai/Recoil: 원자적 상태에 적합하나 전역 상태 관리에는 Zustand가 더 직관적
- Context API: 리렌더링 최적화 어려움
```

#### Tailwind CSS
```
✅ 선정 이유:
- Utility-first: 빠른 스타일링, 일관된 디자인 시스템
- 다크모드: dark: 프리픽스로 간편한 테마 전환
- 반응형: sm:/md:/lg: 프리픽스로 직관적인 반응형 구현
- Tree-shaking: 사용한 클래스만 번들에 포함 (작은 CSS 크기)

❌ 대안 비교:
- CSS Modules: 스코프 격리는 좋으나 반응형 처리 불편
- Styled-components: 런타임 오버헤드, SSR 설정 복잡
- Sass: 전통적이나 유틸리티 클래스 대비 생산성 낮음
```

#### Vite (빌드 도구)
```
✅ 선정 이유:
- 속도: ESBuild 기반 초고속 개발 서버 (HMR < 50ms)
- 간결: CRA 대비 설정 최소화, 즉시 시작 가능
- 모던: ES Modules 네이티브 지원

❌ 대안 비교:
- CRA: Webpack 기반으로 개발 서버 느림
- Next.js: SSR/SSG 불필요, 이 프로젝트에 과도함
```

#### @dnd-kit (드래그앤드롭)
```
✅ 선정 이유:
- 접근성: 키보드 네비게이션 기본 지원 (ARIA)
- 유연성: 다양한 드래그 전략 (포인터, 키보드, 터치)
- 성능: 리렌더링 최적화, 부드러운 애니메이션

❌ 대안 비교:
- react-beautiful-dnd: Atlassian 유지보수 중단 선언
- react-dnd: 설정 복잡, 접근성 지원 부족
```

#### date-fns
```
✅ 선정 이유:
- 모듈러: 필요한 함수만 import (Tree-shaking)
- 불변성: 원본 Date 객체 변경 없음
- 한국어: 로케일 지원

❌ 대안 비교:
- Moment.js: 유지보수 모드, 번들 크기 큼
- Day.js: 가볍지만 일부 기능 플러그인 필요
```

---

## 3. 폴더 구조

### 3.1 전체 구조

```
taskflow/
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/          # Atomic Design 컴포넌트
│   │   ├── atoms/           # 최소 단위 컴포넌트
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Checkbox/
│   │   │   ├── Badge/
│   │   │   ├── Icon/
│   │   │   └── index.ts
│   │   ├── molecules/       # 조합 컴포넌트
│   │   │   ├── TodoItem/
│   │   │   ├── SearchBar/
│   │   │   ├── FilterChip/
│   │   │   ├── CategoryTag/
│   │   │   ├── PrioritySelect/
│   │   │   ├── DatePicker/
│   │   │   └── index.ts
│   │   ├── organisms/       # 복합 컴포넌트
│   │   │   ├── TodoList/
│   │   │   ├── TodoForm/
│   │   │   ├── Sidebar/
│   │   │   ├── Header/
│   │   │   ├── FilterPanel/
│   │   │   └── index.ts
│   │   └── templates/       # 페이지 레이아웃
│   │       ├── MainLayout/
│   │       └── index.ts
│   ├── hooks/               # 커스텀 훅
│   │   ├── useTodos.ts
│   │   ├── useCategories.ts
│   │   ├── useFilter.ts
│   │   ├── useSearch.ts
│   │   ├── useTheme.ts
│   │   ├── useDebounce.ts
│   │   └── index.ts
│   ├── stores/              # Zustand 스토어
│   │   ├── todoStore.ts
│   │   ├── categoryStore.ts
│   │   ├── settingsStore.ts
│   │   └── index.ts
│   ├── types/               # TypeScript 타입
│   │   ├── todo.ts
│   │   ├── category.ts
│   │   ├── settings.ts
│   │   └── index.ts
│   ├── utils/               # 유틸리티 함수
│   │   ├── date.ts          # 날짜 포맷팅
│   │   ├── storage.ts       # 로컬스토리지 헬퍼
│   │   ├── id.ts            # UUID 생성
│   │   └── index.ts
│   ├── constants/           # 상수
│   │   ├── categories.ts    # 기본 카테고리
│   │   ├── priorities.ts    # 우선순위 정의
│   │   └── index.ts
│   ├── styles/              # 글로벌 스타일
│   │   └── globals.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/                   # 통합 테스트
│   ├── integration/
│   └── e2e/
├── .eslintrc.cjs
├── .prettierrc
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

### 3.2 Atomic Design 패턴 상세

#### Atoms (원자)
```
가장 작은 단위의 UI 컴포넌트
- 다른 컴포넌트에 의존하지 않음
- 재사용성 극대화
- 예: Button, Input, Checkbox, Badge, Icon
```

| 컴포넌트 | 설명 | Props |
|----------|------|-------|
| `Button` | 범용 버튼 | variant, size, disabled, onClick |
| `Input` | 텍스트 입력 | placeholder, value, onChange |
| `Checkbox` | 체크박스 | checked, onChange, label |
| `Badge` | 상태/카운트 표시 | variant, children |
| `Icon` | 아이콘 래퍼 | name, size, color |

#### Molecules (분자)
```
Atoms를 조합한 작은 기능 단위
- 하나의 명확한 책임
- 예: SearchBar, TodoItem, DatePicker
```

| 컴포넌트 | 구성 Atoms | 기능 |
|----------|-----------|------|
| `TodoItem` | Checkbox, Badge, Icon, Button | 단일 할 일 표시/조작 |
| `SearchBar` | Input, Icon, Button | 검색어 입력 및 초기화 |
| `FilterChip` | Badge, Icon | 활성 필터 표시 및 제거 |
| `CategoryTag` | Badge | 카테고리 시각화 |
| `PrioritySelect` | Button, Badge | 우선순위 선택 드롭다운 |
| `DatePicker` | Input, Button | 날짜 선택 UI |

#### Organisms (유기체)
```
Molecules와 Atoms를 조합한 독립적 섹션
- 자체 상태 관리 가능
- 예: TodoList, Header, Sidebar
```

| 컴포넌트 | 구성 | 기능 |
|----------|------|------|
| `TodoList` | TodoItem × N | 할 일 목록 렌더링, 드래그앤드롭 |
| `TodoForm` | Input, PrioritySelect, DatePicker, Button | 할 일 추가/편집 폼 |
| `Sidebar` | CategoryTag × N, Button | 카테고리 목록, 카테고리 추가 |
| `Header` | SearchBar, Icon(Theme), Icon(Menu) | 상단 네비게이션 |
| `FilterPanel` | FilterChip × N, Button | 필터 옵션 패널 |

#### Templates (템플릿)
```
페이지 레이아웃 정의
- 위치 배치만 담당, 데이터 없음
```

```tsx
// MainLayout.tsx
export const MainLayout = ({ sidebar, header, content }) => (
  <div className="flex h-screen">
    <aside className="w-64 hidden md:block">{sidebar}</aside>
    <main className="flex-1 flex flex-col">
      <header className="h-16">{header}</header>
      <div className="flex-1 overflow-auto">{content}</div>
    </main>
  </div>
);
```

---

## 4. 개발 마일스톤

### 4.1 개발 단계 개요

```
┌─────────────────────────────────────────────────────────────────┐
│                       개발 타임라인                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Phase 1: 기반 구축                                              │
│  ├─ 프로젝트 초기화                                               │
│  ├─ Atomic 컴포넌트 (Atoms/Molecules)                           │
│  └─ Zustand 스토어 기본 구조                                      │
│                                                                 │
│  Phase 2: 핵심 기능                                              │
│  ├─ 할 일 CRUD                                                   │
│  ├─ 로컬스토리지 연동                                             │
│  └─ 기본 레이아웃                                                │
│                                                                 │
│  Phase 3: 분류 시스템                                            │
│  ├─ 카테고리 관리                                                │
│  ├─ 우선순위 설정                                                │
│  └─ 마감일 & 경고                                                │
│                                                                 │
│  Phase 4: 고급 기능                                              │
│  ├─ 검색 기능                                                    │
│  ├─ 필터링 & 정렬                                                │
│  └─ 드래그앤드롭                                                 │
│                                                                 │
│  Phase 5: UX 완성                                                │
│  ├─ 다크모드                                                     │
│  ├─ 반응형 최적화                                                │
│  └─ 애니메이션 & 트랜지션                                         │
│                                                                 │
│  Phase 6: 품질 보증                                              │
│  ├─ 단위/통합 테스트                                             │
│  ├─ 성능 최적화                                                  │
│  └─ 접근성 검증                                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Phase 1: 기반 구축

**목표**: 개발 환경과 재사용 가능한 기본 컴포넌트 구축

| Task ID | 작업 | 산출물 | 의존성 |
|---------|------|--------|--------|
| T1.1 | 프로젝트 초기화 (Vite + React + TS) | 기본 프로젝트 구조 | - |
| T1.2 | Tailwind CSS 설정 | tailwind.config.js, 테마 변수 | T1.1 |
| T1.3 | ESLint + Prettier 설정 | .eslintrc.cjs, .prettierrc | T1.1 |
| T1.4 | Atoms 컴포넌트 개발 | Button, Input, Checkbox, Badge, Icon | T1.2 |
| T1.5 | 타입 정의 | types/*.ts | T1.1 |
| T1.6 | Zustand 스토어 구조 | stores/*.ts (뼈대) | T1.5 |
| T1.7 | Jest 설정 | jest.config.js, setupTests.ts | T1.1 |

**검증 기준**:
- [x] `npm run dev`로 개발 서버 실행
- [x] Atoms 컴포넌트 Storybook 또는 개별 렌더링 확인
- [x] TypeScript 엄격 모드 통과

### 4.3 Phase 2: 핵심 기능 (MVP)

**목표**: 기본적인 할 일 관리 기능 완성

| Task ID | 작업 | 산출물 | 의존성 |
|---------|------|--------|--------|
| T2.1 | TodoItem 컴포넌트 | molecules/TodoItem | T1.4 |
| T2.2 | TodoList 컴포넌트 | organisms/TodoList | T2.1 |
| T2.3 | TodoForm 컴포넌트 | organisms/TodoForm | T1.4 |
| T2.4 | todoStore 구현 | CRUD 액션, persist 미들웨어 | T1.6 |
| T2.5 | 로컬스토리지 헬퍼 | utils/storage.ts | T1.5 |
| T2.6 | MainLayout 템플릿 | templates/MainLayout | T2.2, T2.3 |
| T2.7 | 통합 및 연결 | App.tsx 완성 | T2.4, T2.6 |

**검증 기준**:
- [x] 할 일 추가 → 목록에 표시
- [x] 완료 체크 → 취소선 및 상태 변경
- [x] 삭제 → 목록에서 제거
- [x] 새로고침 → 데이터 유지

### 4.4 Phase 3: 분류 시스템

**목표**: 카테고리, 우선순위, 마감일로 체계적 관리

| Task ID | 작업 | 산출물 | 의존성 |
|---------|------|--------|--------|
| T3.1 | CategoryTag 컴포넌트 | molecules/CategoryTag | T1.4 |
| T3.2 | Sidebar 컴포넌트 | organisms/Sidebar | T3.1 |
| T3.3 | categoryStore 구현 | 카테고리 CRUD | T1.6 |
| T3.4 | PrioritySelect 컴포넌트 | molecules/PrioritySelect | T1.4 |
| T3.5 | DatePicker 컴포넌트 | molecules/DatePicker | T1.4 |
| T3.6 | 마감일 경고 로직 | utils/date.ts 확장 | T3.5 |
| T3.7 | TodoItem 확장 | 카테고리/우선순위/마감일 표시 | T3.1~T3.6 |

**검증 기준**:
- [x] 카테고리별 필터링 (사이드바 클릭)
- [x] 우선순위 색상 표시
- [x] 마감일 지남 → 빨간색 경고
- [x] 사용자 정의 카테고리 추가/삭제

### 4.5 Phase 4: 고급 기능

**목표**: 검색, 필터, 정렬, 드래그앤드롭

| Task ID | 작업 | 산출물 | 의존성 |
|---------|------|--------|--------|
| T4.1 | SearchBar 컴포넌트 | molecules/SearchBar | T1.4 |
| T4.2 | useSearch 훅 | hooks/useSearch.ts (디바운스) | T4.1 |
| T4.3 | FilterPanel 컴포넌트 | organisms/FilterPanel | T1.4 |
| T4.4 | useFilter 훅 | hooks/useFilter.ts | T4.3 |
| T4.5 | 정렬 기능 | todoStore 확장 | T2.4 |
| T4.6 | dnd-kit 통합 | TodoList 드래그앤드롭 | T2.2 |
| T4.7 | Header 컴포넌트 | organisms/Header | T4.1 |

**검증 기준**:
- [x] 검색어 입력 → 실시간 필터링
- [x] 다중 필터 조합 동작
- [x] 정렬 기준 변경 → 즉시 반영
- [x] 드래그앤드롭 순서 변경 → 저장

### 4.6 Phase 5: UX 완성

**목표**: 다크모드, 반응형, 애니메이션

| Task ID | 작업 | 산출물 | 의존성 |
|---------|------|--------|--------|
| T5.1 | 다크모드 테마 변수 | tailwind.config.js 확장 | T1.2 |
| T5.2 | useTheme 훅 | hooks/useTheme.ts | T5.1 |
| T5.3 | settingsStore 확장 | 테마 persist | T5.2 |
| T5.4 | 반응형 Sidebar | 모바일 햄버거 메뉴 | T3.2 |
| T5.5 | 반응형 TodoList | 카드 레이아웃 최적화 | T2.2 |
| T5.6 | 애니메이션 추가 | Tailwind transitions | 전체 |
| T5.7 | 모바일 제스처 | 스와이프 삭제/완료 | T5.5 |

**검증 기준**:
- [x] 다크/라이트 모드 전환 부드러움
- [x] 시스템 설정 자동 감지
- [x] 모바일 (< 640px) 레이아웃 최적화
- [x] 터치 타겟 44px 이상

### 4.7 Phase 6: 품질 보증

**목표**: 테스트, 성능, 접근성

| Task ID | 작업 | 산출물 | 의존성 |
|---------|------|--------|--------|
| T6.1 | Atoms 단위 테스트 | *.test.tsx | T1.4 |
| T6.2 | Stores 단위 테스트 | *.test.ts | T2.4, T3.3 |
| T6.3 | 통합 테스트 | tests/integration/*.test.tsx | 전체 |
| T6.4 | Lighthouse 최적화 | 성능 90+ | 전체 |
| T6.5 | 접근성 검증 | axe-core, 키보드 테스트 | 전체 |
| T6.6 | 번들 최적화 | Code splitting, lazy loading | 전체 |
| T6.7 | 문서화 | README.md, JSDoc | 전체 |

**검증 기준**:
- [x] 테스트 커버리지 > 80%
- [x] Lighthouse 성능 > 90
- [x] Lighthouse 접근성 > 95
- [x] 번들 크기 < 200KB (gzip)

---

## 5. 리스크 관리

### 5.1 리스크 매트릭스

| ID | 리스크 | 확률 | 영향 | 대응 전략 |
|----|--------|------|------|----------|
| R1 | 로컬스토리지 용량 초과 | 낮음 | 높음 | 데이터 압축, 오래된 완료 항목 자동 삭제 옵션 |
| R2 | 드래그앤드롭 모바일 호환 | 중간 | 중간 | @dnd-kit 터치 센서 활용, 폴백 UI 제공 |
| R3 | 다크모드 색상 대비 | 중간 | 낮음 | WCAG AA 기준 색상 팔레트 사전 정의 |
| R4 | 브라우저 호환성 | 낮음 | 중간 | Vite 자동 폴리필, BrowserStack 테스트 |
| R5 | 상태 관리 복잡도 | 중간 | 중간 | 스토어 분리 (todo/category/settings) |
| R6 | 성능 저하 (대량 데이터) | 낮음 | 높음 | React.memo, useMemo, 가상화 (필요시) |

### 5.2 리스크 대응 상세

#### R1: 로컬스토리지 용량 초과
```
문제: 로컬스토리지 5MB 제한
증상: QuotaExceededError 발생

대응:
1. 저장 전 용량 체크
2. 90% 도달 시 사용자 경고
3. "오래된 완료 항목 삭제" 기능 제공
4. JSON 압축 라이브러리 적용 (lz-string)
5. 향후 IndexedDB 마이그레이션 고려
```

#### R5: 상태 관리 복잡도
```
문제: 단일 스토어에 모든 상태 집중 시 유지보수 어려움

대응:
1. 도메인별 스토어 분리
   - todoStore: 할 일 CRUD
   - categoryStore: 카테고리 관리
   - settingsStore: 사용자 설정
2. 공통 로직은 훅으로 추출
3. Zustand devtools로 디버깅
```

#### R6: 대량 데이터 성능
```
문제: 1000개 이상 할 일 시 렌더링 지연

대응:
1. React.memo로 TodoItem 메모이제이션
2. useMemo로 필터/정렬 결과 캐싱
3. 필요시 @tanstack/react-virtual 가상화 적용
4. 청크 로딩 (첫 50개 → 스크롤 시 추가)
```

---

## 6. 향후 확장 계획

### 6.1 v1.1 로드맵

| 기능 | 설명 | 기술 고려사항 |
|------|------|--------------|
| **알림/리마인더** | 마감일 전 브라우저 알림 | Notification API, Service Worker |
| **서브태스크** | 할 일 하위 체크리스트 | 데이터 모델 확장 (nested structure) |
| **통계 대시보드** | 완료율, 카테고리별 분포 | Recharts 또는 Chart.js |

### 6.2 v1.2 로드맵

| 기능 | 설명 | 기술 고려사항 |
|------|------|--------------|
| **클라우드 동기화** | 멀티 디바이스 지원 | Supabase (PostgreSQL + Auth) |
| **사용자 인증** | 이메일/소셜 로그인 | Supabase Auth |
| **PWA** | 오프라인 + 설치 | Vite PWA Plugin |

### 6.3 v2.0 로드맵

| 기능 | 설명 | 기술 고려사항 |
|------|------|--------------|
| **팀 협업** | 공유 목록, 할당 | 실시간 동기화 (Supabase Realtime) |
| **반복 태스크** | 주간/월간 반복 | RRULE 표준, 서버 스케줄러 |
| **캘린더 뷰** | 타임라인 시각화 | FullCalendar 또는 커스텀 |

### 6.4 확장 아키텍처 다이어그램

```
                    현재 (v1.0)
                    ┌─────────────────────┐
                    │    React SPA        │
                    │  ┌───────────────┐  │
                    │  │   Zustand     │  │
                    │  │   (State)     │  │
                    │  └───────────────┘  │
                    │         ↓           │
                    │  ┌───────────────┐  │
                    │  │ LocalStorage  │  │
                    │  └───────────────┘  │
                    └─────────────────────┘

                    향후 (v1.2+)
                    ┌─────────────────────┐
                    │    React SPA        │
                    │  ┌───────────────┐  │
                    │  │   Zustand     │──┼─── Sync ───┐
                    │  │   (State)     │  │            │
                    │  └───────────────┘  │            │
                    │         ↓           │            ↓
                    │  ┌───────────────┐  │    ┌──────────────┐
                    │  │ LocalStorage  │  │    │   Supabase   │
                    │  │   (Offline)   │  │    │  PostgreSQL  │
                    │  └───────────────┘  │    │  + Realtime  │
                    └─────────────────────┘    └──────────────┘
```

---

## 7. 개발 환경 설정

### 7.1 필수 도구

| 도구 | 버전 | 용도 |
|------|------|------|
| Node.js | 20.x LTS | 런타임 |
| npm/pnpm | 10.x / 8.x | 패키지 관리 |
| VS Code | Latest | IDE |
| Git | 2.x | 버전 관리 |

### 7.2 VS Code 추천 익스텐션

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "formulahendry.auto-rename-tag",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

### 7.3 프로젝트 초기화 명령어

```bash
# 프로젝트 생성
npm create vite@latest taskflow -- --template react-ts
cd taskflow

# 의존성 설치
npm install zustand @dnd-kit/core @dnd-kit/sortable date-fns lucide-react

# 개발 의존성
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/node
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D prettier eslint-config-prettier eslint-plugin-prettier

# Tailwind 초기화
npx tailwindcss init -p
```

### 7.4 Git 브랜치 전략

```
main (프로덕션)
  │
  └── develop (개발 통합)
        │
        ├── feature/todo-crud
        ├── feature/category-management
        ├── feature/dark-mode
        └── fix/mobile-layout
```

| 브랜치 | 용도 | 머지 대상 |
|--------|------|----------|
| `main` | 프로덕션 릴리스 | - |
| `develop` | 개발 통합 | main |
| `feature/*` | 기능 개발 | develop |
| `fix/*` | 버그 수정 | develop |

---

## 8. 코딩 컨벤션

### 8.1 파일/폴더 명명

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 폴더 | PascalCase | `TodoItem/` |
| 컴포넌트 파일 | PascalCase.tsx | `TodoItem.tsx` |
| 훅 파일 | camelCase.ts | `useTodos.ts` |
| 스토어 파일 | camelCase.ts | `todoStore.ts` |
| 유틸 파일 | camelCase.ts | `date.ts` |
| 타입 파일 | camelCase.ts | `todo.ts` |

### 8.2 컴포넌트 구조

```tsx
// 1. Imports
import { useState } from 'react';
import type { Todo } from '@/types';

// 2. Types/Interfaces
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// 3. Component
export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  // 3.1 Hooks
  const [isEditing, setIsEditing] = useState(false);

  // 3.2 Handlers
  const handleToggle = () => {
    onToggle(todo.id);
  };

  // 3.3 Render
  return (
    <div className="flex items-center gap-2">
      {/* JSX */}
    </div>
  );
};

// 4. Default export (선택)
export default TodoItem;
```

### 8.3 Zustand 스토어 구조

```tsx
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Todo } from '@/types';

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      // ... other actions
    }),
    { name: 'taskflow-todos' }
  )
);
```

---

## 9. 테스트 전략

### 9.1 테스트 피라미드

```
         /\
        /  \        E2E Tests (5%)
       /----\       - 주요 사용자 플로우
      /      \
     /--------\     Integration Tests (25%)
    /          \    - 컴포넌트 조합 동작
   /------------\
  /              \  Unit Tests (70%)
 /----------------\ - 개별 함수/컴포넌트
```

### 9.2 테스트 범위

| 레벨 | 대상 | 도구 |
|------|------|------|
| Unit | Atoms, Utils, Store actions | Jest |
| Integration | Organisms, Store + UI | RTL |
| E2E | 전체 플로우 | Playwright (선택) |

### 9.3 테스트 예시

```tsx
// TodoItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItem } from './TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    title: 'Test Todo',
    completed: false,
    priority: 'medium' as const,
    categoryId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    order: 0,
  };

  it('renders todo title', () => {
    render(<TodoItem todo={mockTodo} onToggle={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox clicked', () => {
    const onToggle = jest.fn();
    render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={jest.fn()} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('1');
  });
});
```

---

## 10. 배포 전략

### 10.1 배포 옵션

| 플랫폼 | 장점 | 단점 |
|--------|------|------|
| **Vercel** (추천) | 무료, 자동 배포, 빠름 | - |
| Netlify | 무료, 자동 배포 | Vercel보다 약간 느림 |
| GitHub Pages | 완전 무료 | SPA 라우팅 설정 필요 |

### 10.2 CI/CD 파이프라인

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test -- --coverage
      - run: npm run build
```

### 10.3 배포 체크리스트

- [ ] 환경 변수 설정 (있는 경우)
- [ ] 빌드 성공 확인
- [ ] Lighthouse 점수 확인
- [ ] 모바일/데스크톱 크로스 브라우저 테스트
- [ ] 로컬스토리지 동작 확인

---

## 11. 부록

### 11.1 package.json 예시

```json
{
  "name": "taskflow",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "format": "prettier --write src",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.5.0",
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/sortable": "^8.0.0",
    "date-fns": "^3.3.0",
    "lucide-react": "^0.330.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "@testing-library/react": "^14.2.0",
    "@testing-library/jest-dom": "^6.4.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "postcss": "^8.4.0",
    "prettier": "^3.2.0",
    "tailwindcss": "^3.4.0",
    "ts-jest": "^29.1.0",
    "typescript": "^5.3.0",
    "vite": "^5.1.0"
  }
}
```

### 11.2 tailwind.config.js 예시

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        priority: {
          high: '#ef4444',
          medium: '#f59e0b',
          low: '#22c55e',
        },
      },
      animation: {
        'check': 'check 0.3s ease-in-out',
      },
      keyframes: {
        check: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
```

---

## 12. 관련 문서

| 문서 | 설명 |
|------|------|
| [PRD_TodoApp.md](./PRD_TodoApp.md) | 제품 요구사항 문서 |
| [React 공식 문서](https://react.dev) | React 18 가이드 |
| [Zustand 문서](https://github.com/pmndrs/zustand) | 상태 관리 |
| [Tailwind CSS 문서](https://tailwindcss.com) | 스타일링 |
| [@dnd-kit 문서](https://dndkit.com) | 드래그앤드롭 |

---

*문서 끝*
