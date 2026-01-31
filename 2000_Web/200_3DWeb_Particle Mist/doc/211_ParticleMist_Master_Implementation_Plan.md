# 211_ParticleMist_Master_Implementation_Plan (종합 실행 계획서)

<!-- AI_CONTEXT
Project: Ansible Particle Mist
Level: Master Plan
Focus: End-to-End Execution (Setup -> Build -> Deploy -> Loop)
Algorithm: Self-Correcting Verification Loop
-->

**작성일:** 2026-01-31
**작성자:** AI (Antigravity)
**상태:** 실행 대기

---

## 🌀 Execution Protocol (실행 프로토콜)

> **Antigravity Rule**:
> 이 문서는 단순한 "읽을거리"가 아닙니다. 안티그래비티가 수행해야 할 **"명령어 스크립트"**입니다.
> 에이전트는 아래 체크박스를 하나씩 실행하고(`[x]`), 검증에 실패하면 **"수정-재배포 루프"**를 돌려 성공할 때까지 반복해야 합니다.
> "작업을 진행해줘"라는 명령을 받으면, 멈추지 않고 끝까지 갑니다.

---

## Phase 1: Environment Genesis (환경 셋업)

### 1.1 Prerequisites Check
- [x] `ruby -v` (Ruby 3.3.0+ 확인)
- [x] `rails -v` (Rails 8.0.0+ 확인)
- [x] `docker -v` (Docker 실행 확인 - Kamal용)

### 1.2 Rails New (The Shrine)
- [x] 프로젝트 생성 명령어 실행:
    ```bash
    rails new particle_mist \
      --api \
      --database=sqlite3 \
      --css=tailwind \
      --javascript=importmap \
      --skip-test \
      --force
    ```
    *(Note: API 모드지만 View 사용을 위해 일부 설정 수동 복구 필요할 수 있음. 혹은 `--minimal` 사용 후 확장)*
- [x] `Gemfile` 점검 (Propshaft, TailwindCSS 확인).
- [x] `bundle install` 및 초기 셋업.

### 1.3 Git Initialization
- [x] `git init`
- [x] `.gitignore` 최적화 (시스템 파일, 키값 제외)
- [x] `git add . && git commit -m "Genesis: Initial commit for Particle Mist"`

---

## Phase 2: Core Implementation (구현 - The 3 Blocks)

> 참고 문서:
> *   [[207_Block_1_MistEngine]]
> *   [[208_Block_2_IdentityLayer]]
> *   [[209_Block_3_ShrineFoundation]]

### Block 3: ShrineFoundation (기반 공사)
- [x] **Feature 1**: Kamal 설정 (`config/deploy.yml` 생성 및 설정).
- [x] **Feature 3**: Security Basics (`config/environments/production.rb` SSL 설정).
- [x] **Verification**: `bin/rails s` 로 서버 구동 확인.

### Block 2: IdentityLayer (UI/콘텐츠)
- [x] **Feature 1**: View Layout (`app/views/layouts/application.html.erb`) 작성.
- [x] **Feature 1**: Overlay UI 컴포넌트 (Tailwind Class 적용).
- [x] **Verification**: 브라우저에서 `localhost:3000` 접속 시 UI 렌더링 확인.

### Block 1: MistEngine (코어 로직)
- [x] **Feature 1**: Canvas Setup (`app/javascript/controllers/mist_controller.js`).
- [x] **Feature 1**: Particle System (Class & Loop) 구현.
- [x] **Feature 2**: Physics Core (Vector Math, Mouse Interaction) 구현.
- [x] **Feature 3**: Time Mapper (Time State & Lerp) 구현.
- [x] **Integration**: Stimulus Controller 연결.

---

## Phase 3: Verification & Loop (검증 및 보정)

### 3.1 Local Verification
- [x] **Manual Check**: 로컬 서버 구동 -> 브라우저 실행 -> 스크린샷 캡처.
- [x] **Self-Correction Loop**:
    *   **Check**: "입자가 보이는가?", "마우스에 반응하는가?", "시간대가 맞는가?"
    *   **If Fail**:
        1.  브라우저 Console Log 확인.
        2.  `mist_controller.js` 디버깅.
        3.  코드 수정.
        4.  **Retry**.

### 3.2 Automated Testing
- [x] RSpec 설정 (`bundle add rspec-rails`).
- [x] System Spec 작성 (`spec/system/e2e_spec.rb`).
- [x] `bin/rspec` 실행 및 **All Green** 달성.

---

## Phase 4: Final Output (배포 및 시연)

### 4.1 Production Build
- [x] Docker Image Build (Local Test).
- [x] (Optional) Kamal Deploy (서버 정보가 있을 경우).

### 4.2 User Report
- [x] `212_Final_Report.md` 작성.
    *   구현된 기능 요약.
    *   스크린샷 포함.
    *   실행 방법 가이드.

---

## 실행 대기 중...
이 계획서가 승인되면, Antigravity는 위 항목을 순차적으로 수행하며 완료된 항목을 `[x]`로 마킹합니다.
