> 이 프로젝트의 디버깅 내역을 파일로 만들어줘 최대한 자세히 만들어줘

# 214_Debugging_Report_Visibility.md

**작성 일시**: 2026-01-31
**작성자**: Antigravity Agent
**프로젝트**: 200_3DWeb_Particle Mist

---

## 1. 개요 (Executive Summary)

본 문서는 `Particle Mist` 프로젝트 개발 중 발생한 심각한 **"Black Screen (화면 출력 불가)"** 문제의 원인, 분석 과정, 그리고 해결 방법을 상세히 기술합니다.
초기 구현 후 로컬 서버(`localhost:3000`) 접속 시 화면이 완전히 검게 표시되고, 어떠한 파티클이나 UI 텍스트도 렌더링되지 않는 현상이 발생했습니다.
심층 디버깅 결과, 이는 **Stimulus 컨트롤러의 초기화 실패**와 **Rails 에셋 캐싱(Stale Asset)** 문제가 복합적으로 작용한 결과로 밝혀졌습니다.

## 2. 증상 (Symptoms)

*   **현상 1**: `http://localhost:3000` 접속 시 브라우저 화면이 완전히 검은색(`rgb(0,0,0)`)으로 유지됨.
*   **현상 2**: UI 헤더("ANSIBLE PARTICLE MIST")가 나타나지 않음. (개발자 도구 확인 결과 `opacity-0` 클래스가 제거되지 않음)
*   **현상 3**: Canvas 엘리먼트는 존재하나, 픽셀 데이터가 모두 검은색(Empty)임.
*   **현상 4**: 마우스 인터랙션(클릭, 이동)에 아무런 시각적 반응이 없음.

## 3. 디버깅 타임라인 (Debugging Timeline)

### 3.1. 1차 진단: Browser Subagent 시각적 검증 (실패)
*   **시도**: Subagent를 파견하여 페이지 로드 후 3초 대기, 스크린샷 캡처 및 픽셀 데이터 분석 수행.
*   **결과**:
    *   `header.style.opacity` = `0` (Fade-in 애니메이션 트리거 안 됨)
    *   Canvas Pixel Check = All Black
    *   콘솔 로그 확인 불가 (초기에는 로그 캡처가 누락됨)

### 3.2. 2차 진단: 원인 규명 (Root Cause Analysis)
*   **시도**: Subagent를 통해 Browser Console Log를 정밀 캡처.
*   **발견**:
    ```javascript
    ReferenceError: Controller is not defined
        at mist_controller.js:1:1
    ```
*   **분석**: `app/javascript/controllers/mist_controller.js` 파일 최상단에 `@hotwired/stimulus`로부터 `Controller`를 import하는 구문이 누락됨.
    *   **원인 코드**:
        ```javascript
        // MISSING IMPORT HERE
        export default class extends Controller { ... }
        ```
    *   이로 인해 JS 엔진이 클래스 해석 단계에서 중단되었고, `connect()` 메서드가 실행되지 않아 초기화 로직(캔버스 생성, UI 표시)이 전무했던 것임.

### 3.3. 1차 수정 및 검증 (실패 - Stale Cache)
*   **조치**: `import { Controller } from "@hotwired/stimulus"` 구문 추가.
*   **검증 결과**: 여전히 "Black Screen" 및 `ReferenceError` 발생. 수정 사항이 반영되지 않음.
*   **심층 분석**:
    *   브라우저가 로드하는 JS 파일의 해시값(`mist_controller-6c51af44.js`)이 수정 전과 동일함.
    *   `bin/rails assets:precompile`이 이전에 실행되어 `public/assets`에 구버전 파일이 정적 서빙되고 있었음. Rails 개발 모드(Server)가 동적 컴파일 대신 정적 파일을 우선 서빙함.

### 3.4. 2차 수정 및 환경 재설정 (성공)
*   **장애물**: `bin/rails assets:clobber` 실행 시 `Gemfile` 내 Windows 플랫폼 관련 설정(`tzinfo-data`)으로 인해 오류 발생 (`Gemfile` 파싱 에러).
*   **조치 1 (Gemfile)**: macOS 환경 호환성을 위해 Windows 전용 젬 설정 주석 처리.
*   **조치 2 (Asset Clean)**: `bin/rails assets:clobber` 재실행하여 `public/assets` 내의 캐시된(망가진) 파일들 강제 삭제.
*   **조치 3 (Server Restart)**: `foreman` 프로세스 재시작으로 Rails 파이프라인 리셋.

## 4. 최종 결과 및 시각적 업그레이드 (Resolution & Visual Upgrade)

디버깅과 동시에 사용자의 **"환상적인 그래픽 액션"** 요구사항을 반영하여 코드를 개선했습니다.

### 4.1. 기능적 해결
*   **Import 구문 복구**: Stimulus 컨트롤러 정상 작동 -> `connect()` 실행 -> UI `opacity-0` 제거 -> Canvas 렌더링 시작.
*   **DPI Scaling**: `window.devicePixelRatio`를 적용하여 Retina 디스플레이에서도 선명한 파티클 렌더링 구현.

### 4.2. 시각적 업그레이드 (Fantastical Effects)
1.  **Constellation Lines**: 마우스 주변 파티클들이 커서와 "신경망"처럼 선으로 연결되는 효과 구현.
2.  **Color Burst**: 클릭 시 강력한 충격파와 함께 Cyan/White 색상의 고속 폭발 효과 구현.
3.  **Neon Glow**: Canvas Composite Operation을 `lighter`로 설정하여 파티클이 겹칠 때 빛나는 네온 효과 추가.
4.  **Floating Text**: CSS `@keyframes float` 애니메이션을 주입하여 타이틀 텍스트가 둥둥 떠다니는 신비로운 느낌 연출.

### 4.3. 최종 검증 (Verification)
*   **Browser Subagent**:
    *   마우스 이동 시 파티클 선 연결 확인.
    *   클릭 시 폭발 효과 스크린샷 캡처 완료.
    *   헤더 텍스트 정상 노출 확인.

---

## 5. 결론 및 교훈 (Lessons Learned)

1.  **Stimulus Boilerplate 주의**: 컨트롤러 생성 시 기본 `import` 구문이 누락되지 않도록 주의해야 함. (AI 생성 코드 검수 필수)
2.  **Rails Asset Pipeline**: 개발 모드에서도 `public/assets`에 파일이 존재하면(precompile 실행 이력 등) 동적 변경 사항이 무시될 수 있음. 수정 사항이 반영되지 않을 때는 반드시 `assets:clobber`를 고려해야 함.
3.  **플랫폼 호환성**: `Gemfile.lock`이나 `Gemfile`의 플랫폼 제약(`windows`)은 macOS 개발 환경에서 의외의 블로커가 될 수 있음.

> **Status**: **RESOLVED**
> **Current Version**: v1.1.0 (Visuals Enhanced)
