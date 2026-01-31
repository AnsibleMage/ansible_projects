# 205_PRD_Ansible_Particle_Mist (제품 요구사항 정의서)

> 사용자 프롬프트:
> "우선 해당 문서를 만들기위한 체인시스템과 병렬적 작업 계획서를 우선 만들고 기대로 prd 를 만들어줘"

<!-- AI_CONTEXT
Project: Ansible Particle Mist
Level: Product (Layer 0)
Current Focus: Requirements Definition & E2E Testing Strategy
-->

**작성일:** 2026-01-31
**작성자:** AI (Antigravity)
**버전:** 1.0 (Initial)
**상태:** 초안 (Draft)

---

## 📋 Overview (개요)

### 한 문장 요약
> **"사용자의 시간과 상호작용에 따라 살아 숨 쉬는 입자(Particle)들의 디지털 안개(Mist)를 구현한 웹 아이덴티티 성소."**

### 배경 및 동기
**문제:**
- 기존 포트폴리오 사이트는 정적이고 기계적임.
- 무거운 3D 라이브러리(Three.js 등)는 "경량성"과 "순수 통제"라는 AnsibleMage의 철학에 위배됨.

**기회:**
- **Rails 8 (Solid Queue, Propshaft)**의 가볍고 강력한 백엔드 지원.
- **Pure Canvas API**를 통한 극한의 성능 최적화와 예술적 표현 자유도 확보.
- 접속자의 시공간(Local Time)과 동기화된 경험을 통해 "살아있는 연결" 제공.

### 목표 사용자
- **주 사용자:** AnsibleMage의 코드와 정체성을 탐험하러 온 방문자 (개발자, 리크루터, 예술가).

---

## 🎯 Goals & Non-Goals (범위)

### ✅ Goals (Must-Have)
1.  **4D Particle Rendering**: 사용자의 현지 시간(새벽/낮/황혼/밤)에 따른 색상 및 물리 법칙 변화.
2.  **Natural Interaction**: 마우스(Wand)를 통한 입자 인력/척력 및 클릭 파동(Ripple) 효과.
3.  **Lightweight Performance**: 로딩 바 없는 즉각적 실행 (FCP < 0.8s).
4.  **Minimal UI Overlay**: 캔버스 경험을 방해하지 않는 정보 인터페이스.

### ❌ Non-Goals (Out of Scope)
- 3D 모델(GLTF/OBJ) 로딩 및 렌더링.
- 복잡한 사용자 계정 시스템 (가입/로그인).
- 무거운 JS 프레임워크 (React, Vue, Three.js) 사용.

---

## 📖 User Stories (사용자 스토리)

### Story 1: 시간의 동기화
```
As a 방문자
I want 웹사이트가 내 실제 시간(예: 밤)에 맞춰 어두운 테마와 차분한 움직임을 보여주기를
So that 내가 이 디지털 공간과 같은 시간을 공유하고 있다고 느끼기 위해
```
**수용 기준:**
- [ ] 05-11시(새벽), 11-17시(낮), 17-22시(황혼), 22-05시(밤) 4단계 자동 감지.
- [ ] 시간 변경 시(또는 경계 시간 도달 시) 색상 팔레트가 부드럽게 전환(Lerp).

### Story 2: 안개와의 상호작용
```
As a 방문자
I want 마우스를 움직일 때 입자들이 안개처럼 흩어지거나 모이기를
So that 내가 단순히 보는 것이 아니라 이 세계에 영향을 미친다고 느끼기 위해
```
**수용 기준:**
- [ ] 마우스 커서 주변 100px 반경 내 입자들이 물리적으로 반응(회피/접근).
- [ ] 클릭 시 물결(Ripple) 효과가 전역으로 퍼져나가야 함.

### Story 3: 끊김 없는 몰입
```
As a 방문자
I want 사이트에 접속하자마자 기다림 없이 입자들을 보기를
So that 기술적 로딩 화면에 몰입이 깨지지 않기 위해
```
**수용 기준:**
- [ ] 별도의 Progress Bar 없음.
- [ ] Rails 초기 HTML 응답과 동시에 Canvas 렌더링 시작.

---

## 📋 계층 구조 (Rails Mapping)

이 프로젝트는 3개의 **핵심 블럭(Block)**으로 구성됩니다.

```
🎯 제품 (Product): [Ansible Particle Mist]
  │
  ├─ 📦 블럭 1: [MistEngine] (시스템의 심장 - JS/Canvas)
  │    ├─ 중단위 1-1: [Particle System] (입자 생성, 생명주기 관리)
  │    ├─ 중단위 1-2: [Physics Core] (벡터 연산, 마우스 필드, 충돌)
  │    └─ 중단위 1-3: [Time Mapper] (시간대 감지, 팔레트 보간)
  │
  ├─ 📦 블럭 2: [IdentityLayer] (콘텐츠 - Rails View)
  │    ├─ 중단위 2-1: [Overlay UI] (타이포그래피, 메뉴, 접근성)
  │    └─ 중단위 2-2: [Content Serving] (Propshaft, 폰트 최적화)
  │
  └─ 📦 블럭 3: [ShrineFoundation] (인프라 - Rails/Infra)
       ├─ 중단위 3-1: [Deployment] (Kamal 설정, Dockerfile)
       └─ 중단위 3-2: [Optimizers] (Cache-Control, Compression)
```

---

## 📊 Success Metrics (성공 지표)

### 정량적 목표 (Extreme Performance)

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| **FCP (First Contentful Paint)** | < 0.8s | Chrome DevTools (LightSpeed) |
| **FPS (Animation)** | 60 FPS | Stats.js 모니터링 |
| **Particle Count** | 1000+ (PC) | Canvas Context 확인 |
| **Lighthouse Score** | 95+ | Performance/A11y/SEO |

### 완료 기준 (DoD)
- [ ] 4개 시간대 테마 구현 완료 및 자연스러운 전환 확인.
- [ ] 마우스 인터랙션 물리학 구현 (버벅임 없음).
- [ ] 모바일/데스크톱 반응형 캔버스 리사이징 정상 동작.

---

## 🚧 Constraints (제약 조건)

### 기술적 제약
- **Framework:** Ruby on Rails 8.0 (API + HTML Mode).
- **Frontend library:** **No Frameworks**. Pure Vanila ES6 + HTML5 Canvas API.
- **Styling:** Tailwind CSS (오직 Overlay UI용).
- **Deployment:** Kamal (Single Docker Container).

---

## ⚠️ Risks (리스크)

**리스크 1: 고해상도(Retina/4K) 성능 저하**
- **설명:** 픽셀 수가 4배 많은 환경에서 캔버스 연산 부하 급증.
- **완화:** `window.devicePixelRatio` 감지 후, 임계값 초과 시 렌더링 해상도를 내부적으로 스케일링하거나(`scale(dpr, dpr)` 최적화), 입자 개수를 동적으로 줄임.

**리스크 2: 모바일 배터리 광탈**
- **설명:** 무한 루프(`requestAnimationFrame`)는 CPU/GPU를 지속 사용.
- **완화:** Page Visibility API를 사용하여 탭이 백그라운드로 가면 렌더링 루프 즉시 정지.

---

## 📅 Timeline (예상 일정)

| 마일스톤 | 내용 | 예상 일정 |
|---------|------|----------|
| **Kick-off** | PRD 승인 및 저장소 초기화 | Day 1 |
| **Phase 1** | Block 1 (MistEngine) 핵심 구현 | Day 2-3 |
| **Phase 2** | Block 2 (IdentityLayer) 및 UI 통합 | Day 4 |
| **Phase 3** | Block 3 (Infra) 및 최적화/배포 | Day 5 |

---

## ✅ E2E Test Plan (Rails System Spec)

> **도구**: RSpec + Capybara + Cuprite (Headless Chrome)

**시나리오 1: The Awakening (접속)**
- **Step**: 사용자가 Root URL에 접속한다.
- **Expect**: 로딩 바 없이 1초 내에 캔버스가 나타나고, 현재 시간대(예: 낮)에 맞는 색상(Orange/Gold)의 입자들이 움직인다.

**시나리오 2: The Interaction (간섭)**
- **Step**: 사용자가 화면 중앙을 클릭한다.
- **Expect**: 클릭 지점에서 파동(Ripple)이 퍼져나가며 입자들이 밀려나거나 반응한다. JS 에러가 발생하지 않아야 한다.

---
