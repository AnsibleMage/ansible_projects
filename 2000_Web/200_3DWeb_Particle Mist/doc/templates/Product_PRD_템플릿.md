## 관련 문서
- [[../CJ_AI_개발방법론_2.1_ruby|CJ_AI_개발방법론 (Rails 8)]] - 전체 방법론
- [[./Block_템플릿_통합|Block 템플릿 (통합)]] - Block + Feature + Task 통합 템플릿
- [[./CJ_AI_개발방법론_2.1_ruby_doc/03_Fractal_TDD_Rails|Fractal TDD for Rails]]

---

# Product PRD: [제품명]

<!-- AI_CONTEXT
Project: [프로젝트명]
Level: Product (Layer 0)
Current Focus: Requirements Definition & E2E Testing Strategy
-->

**작성일:** YYYY-MM-DD
**작성자:** AI (Antigravity) - User 검토 후 승인
**버전:** 2.1 (Rails 8)
**상태:** 초안 | 검토 중 | 승인됨

---

## 🤖 Antigravity 작성 가이드

> **Vision & Manifestation:**
> - **User (Visionary)**: 아이디어 제공 → 이 문서 검토 → 피드백 → 승인
> - **Antigravity (Builder)**: 문맥 파악 → 3 Blocks 분해 → 9 Features 분해 → 45 Tasks 분해 → 구현

**Antigravity 작업 프로세스:**
1. **User 프롬프트 분석**: 의도와 맥락 파악 ("저널링 앱 만들어줘")
2. **Product_PRD_템플릿 읽기**: 구조 파악
3. **PRD 작성**: 실제 요구사항으로 채우기
4. **계층 분해**: 3 Blocks → 9 Features → 45 Tasks 자동 설계
5. **User 검토 요청**: "이대로 진행할까요?"

**User 가이드:**
- ✅ 코드는 보지 마세요. 요구사항이 맞는지 문서만 확인하세요.
- ✅ Success Metrics가 비즈니스 목표와 일치하는지 확인하세요.

---

## 🔄 작업 흐름 (Rails Spiral)

> **핵심**: Rails의 강력한 통합성을 활용하여 Bottom-Up으로 견고하게 쌓아올립니다.

```
단계 1: PRD 작성 (이 문서)
        ↓
단계 2: Block 1-3 정의 (Block_템플릿_통합.md)
        ↓
단계 3: Block 1 개발 (Feature 1-3, Task 1-5 각각)
        ↓  (Task Unit Spec → Feature Request Spec → Block System Spec)
단계 4: Block 2 개발 (동일)
        ↓
단계 5: Block 3 개발 (동일)
        ↓
단계 6: ✅ Product E2E TDD 작성 ⬆️
        (Block 3개 결과 참고 + PRD Success Metrics 싱크)
```

**중요:**
- Product E2E TDD는 **Block 3개 모두 완료 후** `spec/system` (type: :system)으로 작성합니다.

---

## 📋 계층 구조 (Rails Mapping)

```
🎯 제품 (Product): [Rails App]
  ├─ 블럭 1: [Bounded Context] (예: Identity, Billing)
  │    ├─ 중단위 1-1: [User Story] (Controller/Service)
  │    │    ├─ 작은단위 1-1-1: [Unit Work] (Model/PORO)
...
```

**권장 구조:**
- 1개 제품 = 3개 블럭 (Domain Context)
- 1개 블럭 = 3개 중단위 (User Story)
- 1개 중단위 = 5개 작은단위 (Functions)

---

## 📋 Overview (개요)

### 한 문장 요약
> [이 프로젝트를 한 문장으로 요약하세요]

### 배경 및 동기
**문제:**
- [해결하려는 핵심 문제]

**기회:**
- [Rails 8의 기능을 활용하여 얻을 수 있는 이점]

### 목표 사용자
- **주 사용자:** [사용자 페르소나]

---

## 🎯 Goals & Non-Goals (범위)

### ✅ Goals (Must-Have)
1. [기능 1]
2. [기능 2]

### ❌ Non-Goals (Out of Scope)
- [제외 1]

---

## 📖 User Stories (사용자 스토리)

### Story 1: [제목]
```
As a [역할]
I want [기능]
So that [가치]
```
**수용 기준:**
- [ ] [기준 1]

---

## 📊 Success Metrics (성공 지표)

### 정량적 목표 (Rails Performance)

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| **LCP (Loading)** | < 2.5s | Chrome DevTools |
| **FID (Interactivity)** | < 100ms | Turbo Drive 반응 속도 |
| **Test Coverage** | > 90% | SimpleCov |
| **Mutation Score** | > 80% | Mutant |

### 완료 기준 (DoD)
- [ ] 모든 User Story 수용 기준 충족
- [ ] 정량적 목표 달성
- [ ] `bin/rspec` 전체 통과

---

## 🚧 Constraints (제약 조건)

### 기술적 제약
- **Framework:** Ruby on Rails 8.0+
- **Database:** SQLite3 (Production Ready)
- **Frontend:** Hotwire (Turbo + Stimulus) - **No React**
- **Deployment:** Kamal (Docker)

---

## ⚠️ Risks (리스크)

**리스크 1:** [설명]
- **완화:** [대응 방안]

---

## 📅 Timeline (일정)

| 마일스톤 | 완료 기준 | 예상 일정 |
|---------|---------|----------|
| PRD 승인 | 문서 확정 | [날짜] |
| Block 1-3 완료 | 기능 구현 | [날짜] |
| E2E 테스트 | `spec/system` 통과 | [날짜] |
| 배포 | Production URL 접속 | [날짜] |

---

## ✅ E2E Test Plan (Rails System Spec)

> **작성 시점**: Block 3개 완료 후
> **도구**: RSpec + Capybara + Selenium/Cuprite

**주요 시나리오:**

1. **[시나리오 이름]**
   - **Step:** [행동] -> [예상 결과]
   - **Step:** [행동] -> [예상 결과]

**자동화 코드 예시 (RSpec):**
```ruby
require 'rails_helper'

RSpec.describe "User Journey", type: :system do
  before do
    driven_by(:selenium_chrome_headless)
  end

  it "completes the full workflow" do
    # Given
    user = create(:user)
    sign_in user

    # When
    visit root_path
    click_on "Start Project"
    fill_in "Name", with: "Particle Mist"
    click_on "Create"

    # Then
    expect(page).to have_content("Project created successfully")
    expect(page).to have_content("Particle Mist")
    
    # Verify Performance metrics if needed
  end
end
```
