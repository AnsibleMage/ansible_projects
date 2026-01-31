# Block 1: MistEngine (Canvas Core)

<!-- AI_CONTEXT
Project: Ansible Particle Mist
Level: Block (Layer 1)
Current Focus: Core Logic Implementation (Particle, Physics, Time)
Relationship: Child of PRD(205), Parent of Features(ParticleSystem, PhysicsCore, TimeMapper)
-->

**작성일:** 2026-01-31
**작성자:** AI (Antigravity)
**버전:** 1.0
**상태:** 초안
**소속 Product:** [[205_PRD_Ansible_Particle_Mist]]

---

## 📋 Block 정의 (Domain Context)

**한 줄 요약:**
> **"HTML5 Canvas 위에서 입자 생명주기, 물리 연산, 시간대별 렌더링을 담당하는 순수 JavaScript 엔진."**

**담당 Features:**
- Feature 1: **Particle System** (입자 생성/ 관리/ 렌더링 루프)
- Feature 2: **Physics Core** (벡터 연산/ 마우스 인터랙션/ 파동)
- Feature 3: **Time Mapper** (시간 감지/ 테마 보간)

**완성 기준:**
- [ ] 1000개 입자 60FPS 유지 (Stats.js 검증)
- [ ] 마우스 회피/접근 물리학 정상 동작 (버벅임 없음)
- [ ] 4단계 시간대별 색상 변경 정상 동작

---

## Feature 1: Particle System (입자 시스템)

### Feature 1 정의
**한 줄 요약:**
> "무한 렌더링 루프(RAF) 안에서 입자 객체를 생성, 갱신, 소멸시키는 관리자."

**완성 기준:**
- [ ] Canvas Resizing 대응
- [ ] `requestAnimationFrame` 루프 최적화
- [ ] Coverage > 90% (Jest/Vitest for JS logic)

### Task 1: Canvas Setup & Loop
**작업 목표:** `MistEngine` 클래스 초기화 및 `requestAnimationFrame` 루프 구성
**TDD 체크리스트:**
- [ ] **Red**: 캔버스 컨텍스트 부재 시 에러 발생 테스트
- [ ] **Green**: 캔버스 리사이징 및 루프 시작 구현
- [ ] **Refactor**: ResizeObserver 도입

### Task 2: Particle Class
**작업 목표:** 개별 입자(x, y, vx, vy, color) 속성을 가진 `Particle` 클래스 구현
**TDD 체크리스트:**
- [ ] **Red**: 입자 생성 및 초기 위치 검증 테스트
- [ ] **Green**: 랜덤 위치/속도 초기화 로직 구현

### Task 3: Particle Manager
**작업 목표:** 입자 배열 관리(생성, 삭제, 순회)
**TDD 체크리스트:**
- [ ] **Red**: 지정된 개수(1000개) 입자 생성 확인

### Task 4: Draw Loop
**작업 목표:** `ctx.arc()`를 이용한 고속 렌더링
**TDD 체크리스트:** (Visual Test or Mocking ctx)

### Task 5: Visibility Optimization
**작업 목표:** Page Visibility API 연동 (탭 비활성 시 루프 정지)

---

## Feature 2: Physics Core (물리 엔진)

### Feature 2 정의
**한 줄 요약:**
> "입자의 움직임, 마우스와의 상호작용, 파동 효과를 계산하는 벡터 연산 모듈."

### Task 1: Vector2D Utility
**작업 목표:** 벡터 덧셈, 뺄셈, 정규화, 거리 계산 유틸리티
**TDD 체크리스트:**
- [ ] **Red**: 벡터 연산 정확도 테스트

### Task 2: Mouse Movement Tracker
**작업 목표:** 마우스 좌표 추적 및 보간(Smoothing)
**TDD 체크리스트:**
- [ ] **Red**: 이벤트 리스너 동작 확인

### Task 3: Repulsion/Attraction Field
**작업 목표:** 마우스 주변 입자 밀어내기/당기기 힘 계산
**TDD 체크리스트:**
- [ ] **Red**: 거리별 힘의 크기 감쇠 테스트

### Task 4: Ripple Effect (Wave)
**작업 목표:** 클릭 시 사인파(Sin Wave) 형태로 퍼지는 힘 구현

### Task 5: Friction & Easing
**작업 목표:** 입자가 원래 위치로 돌아올 때의 탄성 및 마찰 계수 적용

---

## Feature 3: Time Mapper (시간-테마 매핑)

### Feature 3 정의
**한 줄 요약:**
> "현재 시간을 4단계 상태로 분류하고, 상태 간 전환 시 색상과 물리 상수를 부드럽게 보간(Lerp)."

### Task 1: Time State Detector
**작업 목표:** `Date.getHours()` -> `DAWN`, `DAY`, `DUSK`, `VOID` 상태 반환

### Task 2: Palette Registry
**작업 목표:** 각 상태별 컬러 팔레트(HEX/RGB) 정의

### Task 3: Color Interpolator (Lerp)
**작업 목표:** 두 색상 간의 선형 보간 함수 구현 `lerpColor(c1, c2, t)`

### Task 4: Physics Constants Interpolator
**작업 목표:** 시간대별 속도/크기 계수 보간

### Task 5: Global State Manager
**작업 목표:** 전체 상태 전환 관리자 (트랜지션 타이밍 제어)

---

## ✅ Block Module TDD (System Spec)

> **위치**: `spec/system/mist_engine_spec.rb`

```ruby
RSpec.describe "MistEngine", type: :system do
  it "initializes canvas and particles" do
    visit root_path
    expect(page).to have_css("canvas#mist-canvas")
    # JS Hook을 통해 내부 상태 검증 (window.MistEngine.particleCount)
    count = page.evaluate_script("window.MistEngine.particleCount")
    expect(count).to be > 0
  end
end
```
