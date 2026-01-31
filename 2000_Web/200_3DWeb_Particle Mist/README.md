# 3DWeb_Particle Mist (Ansible Particle Mist)

**Particle Mist**는 Ruby on Rails 8.0과 HTML5 Canvas, Stimulus 컨트롤러를 활용하여 제작된 **인터랙티브 웹 그래픽 애플리케이션**입니다. "환상적인(Fantastical) 디지털 안개"를 컨셉으로, 사용자의 상호작용에 따라 유기적으로 반응하는 파티클 시스템을 구현했습니다.

![Project Screenshot](doc/assets/screenshot.png) *(스크린샷 또는 데모 이미지가 있다면 이곳에 위치)*

---

## 🌟 주요 기능 (Key Features)

### 1. MistEngine (파티클 물리 엔진)
HTML5 Canvas API와 Stimulus를 이용하여 독자적인 물리 엔진을 구현하였습니다.
*   **Constellation Effect**: 마우스 커서와 주변 파티클이 실시간으로 "신경망"처럼 선으로 연결됩니다.
*   **Color Burst**: 화면 클릭 시 Cyan/White 컬러의 고속 충격파(Radial Force)가 발생하며 파티클이 폭발적으로 퍼져나갑니다.
*   **Neon Glow**: `lighter` Composite Operation을 적용하여 파티클이 겹칠수록 빛나는 네온 효과를 연출합니다.
*   **Physics**: 마찰력(Friction), 마우스 반발력(Repulsion), 벽면 충돌(Bounce) 등 기본적인 물리 법칙이 적용되어 있습니다.

### 2. IdentityLayer (UI/UX)
*   **Floating Typography**: CSS 커스텀 애니메이션(`@keyframes float`)을 통해 타이틀과 텍스트가 공중에 부유하는 듯한 느낌을 줍니다.
*   **Responsive Design**: Tailwind CSS v4를 기반으로 모바일 및 데스크탑 환경에 최적화된 레이아웃을 제공합니다.
*   **Dynamic SEO**: 컨트롤러 레벨에서 동적으로 메타 태그(OpenGraph, Twitter Card)를 생성합니다.

### 3. ShrineFoundation (인프라)
*   **Rails 8.0 Core**: 최신 Rails 기능을 활용하며 Propshaft를 자산 파이프라인으로 사용합니다.
*   **Zero-Build CSS**: Tailwind CSS v4의 런타임/JIT 특성을 활용하여 복잡한 빌드 과정 없이 스타일을 처리합니다.

---

## 🛠 기술 스택 (Tech Stack)

*   **Language**: Ruby 3.3.0
*   **Framework**: Ruby on Rails 8.0.4
*   **Frontend Logic**: Hotwire Stimulus (Javascript Class-based Controllers)
*   **Styling**: Tailwind CSS (via `tailwindcss-rails` gem)
*   **Asset Management**: Propshaft
*   **Database**: SQLite3 (Production Ready config)

---

## 🚀 시작하기 (Quick Start)

이 프로젝트는 로컬 환경에서 실행하기 위해 다음 단계가 필요합니다.

### 필수 조건
*   Ruby 3.3.0 이상
*   Bundler

### 설치 및 실행

1.  **저장소 클론 및 이동**
    ```bash
    git clone [repository_url]
    cd particle_mist
    ```

2.  **의존성 설치**
    ```bash
    bundle install
    ```

3.  **서버 실행**
    `Procfile.dev`를 사용하여 Rails 서버와 CSS 워처를 동시에 실행합니다.
    ```bash
    bin/dev
    # 또는
    PORT=3000 bundle exec foreman start -f Procfile.dev
    ```

4.  **확인**
    웹 브라우저에서 `http://localhost:3000`으로 접속하여 파티클 효과를 확인합니다.

---

## 📂 프로젝트 구조 (Structure)

*   `app/javascript/controllers/mist_controller.js`: 파티클 엔진의 핵심 로직 (Canvas 드로잉, 물리 연산).
*   `app/assets/tailwind/application.css`: 전역 스타일 및 Floating 애니메이션 정의.
*   `doc/`: 프로젝트 기획안, PRD, 디버깅 리포트 등 상세 문서가 보관된 디렉토리.
    *   `205_PRD_Ansible_Particle_Mist.md`: 요구사항 정의서.
    *   `214_Debugging_Report_Visibility.md`: 화면 미출력 이슈 디버깅 내역.

---

## 📝 라이선스 (License)

이 프로젝트는 MIT 라이선스를 따릅니다.
