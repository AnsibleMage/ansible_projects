# 210_Master_Plan_Production_Plan (종합 계획서 제작 계획)

> 사용자 프롬프트:
> "종합 작업 계획서를 써줘... 넌 끝날때까지 계속작업할수 있자나. 실행할것은 전부 체크박스로 만들어주고..."

---

## 1. 개요 (Overview)
본 계획서는 프로젝트의 **A to Z(환경설정부터 배포/검증까지)**를 관통하는 **Final Execution Script**인 `211_ParticleMist_Master_Implementation_Plan.md`를 제작하기 위한 전략입니다.

## 2. 체인 시스템 (Chain System)
**[SystemArchitect]** + **[ComplexityResolver]** + **[QualityManager]**

1.  **Orchestrator Logic**:
    *   단순한 할 일 목록이 아닙니다. **"Self-Correcting Loop (자가 보정 루프)"**를 포함한 알고리즘적 계획서여야 합니다.
    *   Loop: `Act` -> `Verify` -> `(Fail) Fix -> Retry` -> `(Pass) Next`.

2.  **Missing Link Bridging**:
    *   기존 문서(205, 207-209)에 부재했던 **"환경 셋업"**과 **"배포 파이프라인"**을 채워 넣습니다.

---

## 3. 종합 계획서 구조 (Structure of The Master Plan)

`211` 문서는 다음 4단계의 **순차적 파이프라인(Sequential Pipeline)**으로 구성됩니다. 각 단계는 엄격한 **Gate(체크박스)**를 가집니다.

### Phase 1: Environment Genesis (환경 셋업)
*   **Goal**: 빈 폴더에서 Rails 8 개발 환경 완성.
*   **Steps**:
    1.  Ruby 3.x / Rails 8 설치 확인.
    2.  `rails new` (Option: `--minimal --database=sqlite3 --css=tailwind --javascript=importmap`).
    3.  Git 초기화 및 Remote 연결.

### Phase 2: Core Implementation (구현 - The 3 Blocks)
*   **Goal**: 207~209 문서의 실체화.
*   **Steps**:
    *   Block 1 (MistEngine): JS Canvas Loop 구현.
    *   Block 2 (IdentityLayer): Overlay UI & Propshaft.
    *   Block 3 (ShrineFoundation): Kamal Config & Security.
*   **Verification**: 각 Block 완료 시 `bin/rspec spec/system` 통과 필수.

### Phase 3: Deployment & Output (배포 및 시연)
*   **Goal**: 로컬(`localhost`) 및 프로덕션 환경 구동.
*   **Steps**:
    1.  Local Server Start & Verification.
    2.  Kamal Setup & Deploy (if Docker ready).
    3.  **Visual Proof**: 브라우저 스크린샷 캡처 및 사용자 보고.

### Phase 4: Infinite Refinement Loop (무한 보정 루프)
*   **Goal**: "될 때까지 한다".
*   **Algorithm**:
    ```markdown
    - [ ] 검증 실패 시:
        1. 로그 분석 (`tail -f log/development.log`)
        2. 원인 파악 및 수정
        3. 재배포/재실행
        4. Loop (Goto 1)
    ```

---

## 4. 산출물 명세 (Deliverables)
*   **Target File**: `doc/211_ParticleMist_Master_Implementation_Plan.md`
*   **Features**:
    *   모든 단계는 체크박스(`- [ ]`)로 되어 있어 안티그래비티가 진행 상황을 마킹할 수 있음.
    *   각 단계마다 **"검증 명령어(Verify Command)"**가 명시됨.
    *   실패 시 대응 프로토콜 포함.

---

**승인 여부**: 계획에 따라 즉시 종합 계획서를 작성합니다.
