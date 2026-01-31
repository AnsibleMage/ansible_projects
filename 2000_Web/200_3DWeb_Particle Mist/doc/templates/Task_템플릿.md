## 관련 문서
- [[../CJ_AI_개발방법론_2.1_ruby|CJ_AI_개발방법론 (Rails 8)]]
- [[./Feature_템플릿|Feature 템플릿]] - 상위 문서

---

# Task [N]: [작업명]

<!-- AI_CONTEXT
Project: [프로젝트명]
Level: Task (Layer 3)
Current Focus: Unit Logic Implementation & Testing
Relationship: Child of Feature, Leaf Node
-->

**작성일:** YYYY-MM-DD
**작성자:** AI (Antigravity)
**버전:** 1.0 (Rails 8)
**소속 Feature:** [[Feature_템플릿]]

---

## 🔧 Task 정의

**작업 목표:**
> [구현할 구체적인 로직이나 클래스/메소드]

**입력/출력:**
- **In:** [Parameter, Data]
- **Out:** [Return Value, State Change]

**완성 기준:**
- [ ] Unit Spec 통과
- [ ] RuboCop Offense 0개
- [ ] Mutation Score > 80%

---

## 🔄 TDD 사이클 (Red-Green-Refactor)

### 1. Red (실패 테스트)

**작성한 테스트:**
```ruby
# spec/models/[model]_spec.rb
describe "#method_name" do
  it "does something specific" do
    # Given
    # When
    # Then
    expect(result).to eq expected
  end
end
```
- [ ] `bin/rspec` 실행 -> ❌ 실패 확인 (NameError or Failure)

### 2. Green (최소 구현)

**구현 코드 (Draft):**
```ruby
def method_name
  # 가장 단순한 구현
end
```
- [ ] `bin/rspec` 실행 -> 🟢 통과 확인

### 3. Refactor (개선)

**개선 사항:**
- [ ] 변수명 명확화
- [ ] 중복 제거
- [ ] Guard Clause 적용
- [ ] RuboCop 규칙 준수

**최종 코드:**
```ruby
def method_name
  return unless valid?
  # ...
end
```

### 4. Mutation Test (검증)

**명령어:**
```zsh
bundle exec mutant run --include lib/your_class.rb
```

**결과:**
- Score: [N]%
- 살아남은 변이(Surviving Mutants) 분석:
  - [분석 내용]

---

## 📝 구현 상세 노트
- [Algorithm 설명]
- [Edge Case 처리]
- [Performance 고려사항]
