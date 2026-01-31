## 관련 문서
- [[../CJ_AI_개발방법론_2.1_ruby|CJ_AI_개발방법론 (Rails 8)]]
- [[./Product_PRD_템플릿|Product PRD 템플릿]] - 상위 PRD

---

# Block [N]: [블럭명]

<!-- AI_CONTEXT
Project: [프로젝트명]
Level: Block (Layer 1)
Current Focus: Block Definition & Feature Breakdown
Relationship: Child of Product PRD, Parent of Features
-->

**작성일:** YYYY-MM-DD
**작성자:** AI (Antigravity) - User 검토 후 승인
**버전:** 1.0 (Rails 8)
**상태:** 대기 | 진행 중 | 완료

**소속 Product:** [[Product_PRD]]

---

## 📋 Block 정의 (Domain Context)

**한 줄 요약:**
> [이 Block이 담당하는 Bounded Context를 한 문장으로]

**담당 Features:** 3개
- Feature 1: [기능명] (User Story)
- Feature 2: [기능명]
- Feature 3: [기능명]

**완성 기준:**
- [ ] Feature 3개 Request Spec 모두 통과
- [ ] Block System Spec 통과
- [ ] `rubocop` 통과

---

## 🔄 작업 흐름 (Rails Spiral)

```
단계 1: PRD 읽기
        ↓
단계 2: Block/Feature/Task 정의 (이 문서 작성)
        ↓
단계 3: Task 1 개발 (Model/Unit Spec: Red-Green-Refactor)
        ↓
단계 4: Task 2-5 개발 (동일)
        ↓
단계 5: ✅ Feature 1 Integration TDD 작성 ⬆️
        (Request Spec 작성: Task 5개를 조합하여 User Story 검증)
        ↓
단계 6: Feature 2, 3 동일 반복
        ↓
단계 7: ✅ Block Module TDD 작성 ⬆️
        (System Spec 작성: Feature 3개를 조합하여 E2E 흐름 검증)
```

**중요:**
- **Task Unit Spec**: `spec/models`, `spec/jobs`
- **Feature Request Spec**: `spec/requests` (Controller/Integration)
- **Block System Spec**: `spec/system` (Cuprite/Selenium)

---

## Feature 1: [기능명]

### Feature 1 정의

**한 줄 요약:**
> [이 Feature가 제공하는 가치]

**완성 기준:**
- [ ] Task 5개 Unit Spec 모두 통과
- [ ] Request Spec 통과
- [ ] Coverage > 90%

**예상 소요 시간:** 2일

---

### Task 1: [작업명]

**작업 목표:** [구현할 클래스/메소드]

**TDD 체크리스트 (RSpec):**
- [ ] **Red**: `bin/rspec [file_spec.rb]` 실패 확인 🔴
- [ ] **Green**: 최소 구현 → 통과 확인 🟢
- [ ] **Refactor**: RuboCop 준수, 중복 제거 🔵
- [ ] **Mutation**: `bundle exec mutant run` Score > 80% 🧬

**파일:**
- 소스: `app/models/[model].rb` or `app/services/[service].rb`
- 테스트: `spec/models/[model]_spec.rb`

**완료 조건:**
- [ ] Unit Spec 통과
- [ ] RuboCop 에러 없음

---

### Task 2: [작업명]
* 동일 템플릿 반복 *

### Task 3: [작업명]
* 동일 템플릿 반복 *

### Task 4: [작업명]
* 동일 템플릿 반복 *

### Task 5: [작업명]
* 동일 템플릿 반복 *

---

### ✅ Feature 1 Integration TDD (Request Spec)

> **작성 시점**: Task 5개 완료 후
> **위치**: `spec/requests/[feature]_spec.rb`

**체크리스트:**
1.  **시나리오 작성**: Task 1->5가 연결되어 User Story를 완성하는지 검증
2.  **Request Spec 작성**: 
    ```ruby
    RSpec.describe "Feature Integration", type: :request do
      it "handles the full user story" do
        post feature_path, params: { ... }
        expect(response).to have_http_status(:success)
        expect(User.last.feature_enabled).to be true
      end
    end
    ```
3.  **검증**: `bin/rspec spec/requests/[feature]_spec.rb`

---

## Feature 2: [기능명]
* Feature 1 구조 반복 *

## Feature 3: [기능명]
* Feature 1 구조 반복 *

---

## ✅ Block Module TDD (System Spec)

> **작성 시점**: Feature 3개 완료 후
> **위치**: `spec/system/[block]_spec.rb`

**체크리스트:**
1.  **사용자 시나리오**: Feature 1->2->3이 연결된 Bounded Context 흐름 검증
2.  **System Spec 작성**:
    ```ruby
    RSpec.describe "Block Module", type: :system do
      it "allows user to complete the block workflow" do
        visit block_path
        # Feature 1 interaction
        # Feature 2 interaction
        # Feature 3 interaction
        expect(page).to have_content("Block Completed")
      end
    end
    ```
3.  **검증**: `bin/rspec spec/system/[block]_spec.rb`

---

## 📊 작업 진행 현황

| 항목 | Task 진행 | Integration/Module | 상태 |
|------|-----------|-------------------|------|
| **Feature 1** | [N/5] | Request Spec 대기 | ⏳ |
| **Feature 2** | [N/5] | Request Spec 대기 | ⏳ |
| **Feature 3** | [N/5] | Request Spec 대기 | ⏳ |
| **Block Module** | - | System Spec 대기 | ⏳ |

**전체 진행률:** [N/19]

---

## ⚠️ 주의사항 (Rails Way)

### 작업 순서 엄수
1. ❌ Controller(Request Spec)를 Model(Unit Spec)보다 먼저 만들지 마세요.
2. ✅ **Fat Model, Skinny Controller**: 로직은 Model/Service(Task)에, Controller(Feature)는 연결만.

### 품질 기준
- **RuboCop**: 모든 파일에 Offense가 없어야 합니다.
- **Strong Parameters**: Controller에서 파라미터 필터링 필수.
- **N+1 Query**: `bullet` 잼이나 로그를 통해 확인.
