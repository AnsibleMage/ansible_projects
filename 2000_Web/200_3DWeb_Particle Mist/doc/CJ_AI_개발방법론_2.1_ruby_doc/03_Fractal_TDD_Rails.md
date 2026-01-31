# 03_Fractal_TDD_Rails (RSpec Strategy)

> **User Prompt Reference:**
> "레일즈 개발방법론 관련 부가문서는 생성해서 ... 이 폴더에 넣어줘"

## 1. 개요
CJ_AI 개발방법론의 핵심인 **4-Layer Fractal TDD**를 **Rails 8 + RSpec** 환경에 구체적으로 매핑한 가이드입니다. Rails의 테스트 레이어와 우리의 4-Layer 구조를 1:1로 대응시킵니다.

---

## 2. Layer 매핑 전략

| CJ_AI Layer | Rails/RSpec Layer | 도구/전략 | 목적 |
|:---:|:---:|:---:|:---|
| **Layer 0: Product** | **System Spec** | Capybara, Cuprite | E2E 검증 (사용자 관점) |
| **Layer 1: Block** | **Request Spec** | RSpec Request | 모듈 통합 검증 (HTTP/API 관점) |
| **Layer 2: Feature** | **Integration Spec** (Service/Model) | RSpec | 기능 단위 비즈니스 로직 통합 검증 |
| **Layer 3: Task** | **Unit Spec** (Model/Lib) | RSpec (Isolated) | 최소 단위 로직 검증 (빠른 피드백) |

---

## 3. 계층별 구현 가이드

### 3.1 Layer 0: Product (System Spec)
브라우저를 실제로(혹은 Headless로) 구동하여 전체 흐름을 테스트합니다.
*   **위치**: `spec/system/`
*   **특징**: 가장 느리지만 가장 신뢰도가 높음. Critical Path만 작성.

```ruby
# spec/system/portfolio_flow_spec.rb
RSpec.describe "Visitor Journey", type: :system do
  it "enters the mist and sees the profile" do
    visit root_path
    expect(page).to have_content("Ansible Particle Mist")
    
    # Canvas interaction simulation (JS trigger)
    page.execute_script("window.dispatchEvent(new Event('mousedown'))")
    expect(page).to have_css(".mist-active") 
  end
end
```

### 3.2 Layer 1: Block (Request Spec)
컨트롤러와 라우팅, 응답 상태를 검증합니다. 뷰 렌더링을 포함할 수 있습니다.
*   **위치**: `spec/requests/`

```ruby
# spec/requests/api/stats_spec.rb
RSpec.describe "Stats API", type: :request do
  it "returns github stats" do
    get "/api/stats"
    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)["commits"]).to be_present
  end
end
```

### 3.3 Layer 2: Feature (Service/Model Integration)
여러 모델이나 포로(PORO)가 협력하여 하나의 기능을 수행하는지 검증합니다. DB 접근을 허용합니다.
*   **위치**: `spec/services/` or `spec/models/`

```ruby
# spec/services/mist_theme_selector_spec.rb
RSpec.describe MistThemeSelector do
  it "selects 'Dawn' theme at 6 AM" do
    travel_to Time.zone.parse("06:00") do
      theme = described_class.current_theme
      expect(theme).to eq(:dawn)
    end
  end
end
```

### 3.4 Layer 3: Task (Unit Spec)
가장 작은 단위. 외부 의존성(DB, Network)을 Mocking하여 속도를 극대화합니다.
*   **위치**: `spec/lib/` or `spec/models/`
*   **규칙**: `build_stubbed` 등을 활용하여 DB 히트 최소화.

```ruby
# spec/lib/physics/vector2d_spec.rb
RSpec.describe Physics::Vector2d do
  it "calculates magnitude correctly" do
    vec = described_class.new(3, 4)
    expect(vec.magnitude).to eq(5)
  end
end
```

---

## 4. Testing Workflow (Zero-Friction)

Rails 8의 기본 테스트 러너나 RSpec을 **자동화**하여 마찰을 줄입니다.

### 4.1 Guard (Auto Test)
파일이 변경되면 관련된 테스트만 자동으로 실행합니다.
```zsh
bundle exec guard
```

### 4.2 FactoryBot
Fixture 대신 FactoryBot을 사용하여 테스트 데이터를 동적으로 생성합니다.
```ruby
# spec/factories/projects.rb
FactoryBot.define do
  factory :project do
    name { "Particle Mist" }
    url { "https://ansible-mist.com" }
  end
end
```

### 4.3 Agent에게 지시하기
개발자는 테스트 코드를 직접 짜는 스트레스를 받지 않습니다.

> "**Layer 3 Task**: `Vector2d` 클래스의 덧셈 연산에 대한 Unit Test를 RSpec으로 작성해줘. 엣지 케이스 포함해서."

---

## 5. 결론
Rails 8 아키텍처 위에서 CJ_AI의 프랙탈 구조는 완벽하게 작동합니다. System에서 Unit까지, 각 레벨은 명확한 역할과 책임, 그리고 대응되는 RSpec 도구를 가집니다. 이를 통해 **"속도(Unit)"와 "신뢰(System)"**를 모두 잡습니다.
