# 02_Architecture_Patterns (The Majestic Monolith)

> **User Prompt Reference:**
> "레일즈 개발방법론이 필요해... 심층분석을 통해 관련문서를 분석하고 재 정의해서"

## 1. 개요
Rails 8은 복잡한 마이크로서비스나 분리된 프론트엔드(React/Vue) 없이도 거대한 규모의 애플리케이션을 구축할 수 있는 **"Majestic Monolith(웅장한 모노리스)"** 아키텍처를 지향합니다. 이 문서는 `Particle Mist` 프로젝트에 적용될 핵심 패턴을 정의합니다.

---

## 2. Core Philosophy: The One-Person Framework

### 2.1 Majestic Monolith
*   **정의**: 하나의 코드베이스, 하나의 배포 단위로 모든 기능(Web, API, Job, Socket)을 처리합니다.
*   **장점**: 네트워크 레이턴시 0, 배포 복잡도 0, 리팩토링 용이성 극대화.
*   **적용**: `Particle Mist`는 단일 Repos, 단일 Docker Image로 관리됩니다.

### 2.2 No Build (Propshaft + Import Maps)
*   **철학**: 복잡한 JS 번들러(Webpack, Esbuild)를 제거합니다. 브라우저는 이미 ES Modules를 지원합니다.
*   **Propshaft**: Sprockets를 대체하는 최신 자산 파이프라인.
*   **Import Maps**: `node_modules` 없이 브라우저에서 직접 라이브러리를 로드합니다.

---

## 3. Frontend Architecture: Hotwire

**"HTML over the Wire"**가 우리의 표준입니다. JSON API + React 조합은 복잡도가 임계치를 넘을 때만 고려합니다.

### 3.1 Turbo Drive
*   기본적으로 모든 링크 클릭과 폼 제출을 AJAX로 변환하여 페이지 전체 리로드를 방지합니다.
*   **Particle Mist 적용**: 메뉴 이동 시 캔버스(Canvas)는 유지하고, 텍스트 오버레이만 교체합니다.

### 3.2 Turbo Frames
*   페이지의 특정 부분만 독립적으로 로드/업데이트합니다.
*   **적용**: 사용자 프로필 카드, 댓글 목록 등 독립적인 UI 컴포넌트.

### 3.3 Stimulus
*   HTML에 생명을 불어넣는 "소박한(Modest)" 자바스크립트 프레임워크입니다.
*   **Particle Mist 적용**:
    *   `particle_controller.js`: Canvas 초기화 및 애니메이션 루프 관리.
    *   `interaction_controller.js`: 마우스 이벤트 감지 및 물리 엔진 연결.

---

## 4. Backend Architecture: Solid

Rails 8은 DB 하나로 모든 인프라를 통합하는 **Solid** 시리즈를 탑재했습니다. Redis나 Memcached 같은 추가 인프라 의존성을 제거합니다.

### 4.1 Solid Queue (Background Jobs)
*   **DB 기반 큐**: 별도의 Redis 설정 없이 SQLite/PostgreSQL 테이블을 큐로 사용합니다.
*   **적용**: Github 통계 데이터 수집, 이메일 발송 등 비동기 작업.

### 4.2 Solid Cache
*   **DB 기반 캐시**: SSD의 저렴한 용량을 활용하여 대용량 캐싱을 처리합니다.
*   **적용**: API 응답 캐싱, 복잡한 연산 결과 저장.

### 4.3 Solid Cable
*   **DB 기반 웹소켓**: Action Cable의 Pub/Sub을 DB로 처리합니다.
*   **적용**: 사용자 간 실시간 인터랙션 (물결 효과 공유 등).

---

## 5. Directory Structure Strategy

기본 MVC를 넘어서는 코드 조직화 패턴입니다.

1.  **app/models**: 순수 데이터 로직 + Active Record.
2.  **app/services**: 비즈니스 로직(복잡한 트랜잭션, 외부 API 호출) 분리. (예: `GithubStatsFetcher`)
3.  **app/javascript/controllers**: Stimulus 컨트롤러 (UI 로직).
4.  **app/javascript/mist**: `Particle Mist`의 핵심 그래픽스 엔진 (Canvas, Physics).
    *   `core/`: 엔진 루프.
    *   `physics/`: 벡터 연산, 힘.
    *   `render/`: 그리기 로직.

이 구조는 **Rails의 관례(Convention)**를 지키면서도, 특수 목적(그래픽스 엔진)을 명확히 분리합니다.
