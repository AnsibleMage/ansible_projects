# Block 2: IdentityLayer (UI & Content)

<!-- AI_CONTEXT
Project: Ansible Particle Mist
Level: Block (Layer 1)
Current Focus: User Interface & Asset Serving
Relationship: Child of PRD(205), Parent of Features(OverlayUI, ContentServing)
-->

**작성일:** 2026-01-31
**작성자:** AI (Antigravity)
**버전:** 1.0
**상태:** 초안
**소속 Product:** [[205_PRD_Ansible_Particle_Mist]]

---

## 📋 Block 정의 (Domain Context)

**한 줄 요약:**
> **"Canvas 위에 부유하는 미니멀한 정보 레이어(UI)와 정적 자원(폰트/이미지)을 제공하는 Rails View 계층."**

**담당 Features:**
- Feature 1: **Overlay UI** (타이텍스트, 메뉴, 반응형 레이아웃)
- Feature 2: **Content Serving** (Propshaft, Font loading)
- Feature 3: **Dynamic SEO** (Meta Tags, OpenGraph)

**완성 기준:**
- [ ] Tailwind CSS 기반의 반응형 UI (Mobile/Desktop)
- [ ] 폰트 로딩 시 레이아웃 시프트(CLS) 없음
- [ ] 주요 SNS 공유 시 썸네일/설명 정상 노출

---

## Feature 1: Overlay UI

### Feature 1 정의
**한 줄 요약:**
> "Canvas 경험을 방해하지 않도록 설계된 반투명/미니멀 HTML 인터페이스."

### Task 1: Main Layout (View)
**작업 목표:** `layouts/application.html.erb` 구조 잡기 (full-screen container).

### Task 2: Typography Component
**작업 목표:** 정체성을 나타내는 타이틀(Serif font) 및 소개 텍스트 컴포넌트 (`hero_component.rb`).

### Task 3: Navigation Menu
**작업 목표:** 코너에 배치되는 미니멀 메뉴 (About, Works, GitHub).

### Task 4: Responsive Adjustments
**작업 목표:** 모바일에서의 폰트 크기 및 배치 조정 (Tailwind Breakpoints).

### Task 5: Fade-in Animation
**작업 목표:** 로딩 완료 후 UI가 서서히 나타나는 CSS Animation (`opacity-0` to `opacity-100`).

---

## Feature 2: Content Serving (Assets)

### Feature 2 정의
**한 줄 요약:**
> "Propshaft를 이용한 에셋 파이프라인 관리 및 폰트 파일 최적화."

### Task 1: Propshaft Configuration
**작업 목표:** Rails 8 Propshaft 기본 설정 및 경로 매핑.

### Task 2: Webfont Optimization
**작업 목표:** Custom Font (WOFF2) 서빙 및 `font-display: swap` 적용.

### Task 3: Favicon & Icons
**작업 목표:** 다양한 디바이스용 아이콘 생성 및 헬퍼 구현.

### Task 4: JSON Data Endpoint
**작업 목표:** (향후 확장용) GitHub Stats 등을 JS로 넘겨줄 JSON 데이터 구조 설계.

### Task 5: Asset Preloading
**작업 목표:** `<link rel="preload">` 태그를 통한 중요 리소스 우선 로딩.

---

## Feature 3: Dynamic SEO

### Feature 3 정의
**한 줄 요약:**
> "동적으로 변하는 사이트의 특성을 반영한 메타 태그 관리자."

### Task 1: Meta Tag Helper
**작업 목표:** `application_helper.rb` 내 `default_meta_tags` 구현.

### Task 2: OpenGraph Setup
**작업 목표:** OG Image, Title, Description 동적 생성.

### Task 3: Twitter Card
**작업 목표:** 트위터 공유용 카드 설정.

### Task 4: Sitemap Generator
**작업 목표:** 검색 엔진용 `sitemap.xml` 자동 생성.

### Task 5: Robots.txt
**작업 목표:** 크롤러 접근 제어 설정.

---

## ✅ Block Module TDD (System Spec)

> **위치**: `spec/system/identity_layer_spec.rb`

```ruby
RSpec.describe "IdentityLayer", type: :system do
  it "renders overlay UI accurately" do
    visit root_path
    
    # Check Typography
    expect(page).to have_content("Ansible Particle Mist")
    
    # Check Meta Tags (Head)
    expect(page).to have_css("meta[property='og:title']", visible: false)
  end
  
  it "is responsive" do
    # Mobile View
    page.current_window.resize_to(375, 812)
    expect(page).to have_css(".text-3xl") # 모바일용 클래스 확인
  end
end
```
