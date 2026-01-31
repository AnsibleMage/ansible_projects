## 관련 문서
- [[../CJ_AI_개발방법론_2.1_ruby|CJ_AI_개발방법론 (Rails 8)]]
- [[./Block_템플릿_통합|Block 템플릿 (통합)]] - 상위 문서

---

# Feature [N]: [기능명]

<!-- AI_CONTEXT
Project: [프로젝트명]
Level: Feature (Layer 2)
Current Focus: User Story Implementation & Integration Testing
Relationship: Child of Block, Parent of Tasks
-->

**작성일:** YYYY-MM-DD
**작성자:** AI (Antigravity)
**버전:** 1.0 (Rails 8)
**소속 Block:** [[Block_템플릿_통합]]

---

## 📋 Feature 정의 (User Story)

**한 줄 요약:**
> [이 Feature가 제공하는 사용자 가치]

**User Story:**
```
As a [User Role]
I want to [Action]
So that [Benefit]
```

**완성 기준:**
- [ ] Task 5개 Unit Spec 통과
- [ ] Request Spec (`spec/requests`) 통과
- [ ] Stimulus Controller 작동 확인 (필요 시)

---

## 🔄 작업 흐름

```
Step 1: Task 1-5 분해 (아래 정의)
        ↓
Step 2: Task 1 개발 (Red-Green-Refactor)
        ↓
... (Task 2-5 반복)
        ↓
Step 3: ✅ Feature Integration TDD (Request Spec)
```

---

## 🔧 Task 분해 (Implementations)

### Task 1: [Model/Service 구현]
- **목표:** [DB 스키마 변경 or 비즈니스 로직 작성]
- **파일:** `app/models/...`
- **TDD:** `spec/models/...`
- **상태:** 🔴 🟢 🔵 🧬

### Task 2: [Controller 구현]
- **목표:** [Action 처리 및 View 연결]
- **파일:** `app/controllers/...`
- **TDD:** `spec/requests/...` (기본 응답 확인)
- **상태:** 🔴 🟢 🔵 🧬

### Task 3: [View/Hotwire 구현]
- **목표:** [Turbo Frame or Stream 적용]
- **파일:** `app/views/...`
- **상태:** 🔴 🟢 🔵

---

## ✅ Feature Integration TDD (Request Spec)

> **위치**: `spec/requests/[feature]_spec.rb`

**시나리오:**
1. [User가 폼을 전송한다]
2. [Server가 데이터를 처리한다]
3. [Turbo Stream으로 화면이 부분 갱신된다]

**Request Spec 예시:**
```ruby
RSpec.describe "Feature Flow", type: :request do
  it "updates the list via Turbo Stream" do
    post feature_path, params: { name: "New Item" }, as: :turbo_stream
    
    expect(response).to have_http_status(:success)
    expect(response.media_type).to eq Mime[:turbo_stream]
    expect(response.body).to include("turbo-stream")
  end
end
```
