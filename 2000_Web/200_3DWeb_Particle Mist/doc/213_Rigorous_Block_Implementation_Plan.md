# 213_Rigorous_Block_Implementation_Plan (엄밀한 블록 구현 계획서)

> 사용자 프롬프트:
> "심층 사고 체인(ThinkChain) -> 개발 실행 체인(DevChain) -> 버그수정(Loop) -> 검증을 거쳐... 207~209까지 순차로... 완료될 때까지 반복하는 시스템."

---

## 1. 개요 (Overview)
본 계획서는 기존의 빠른 구현(Rapid Implementation)을 넘어, **`GEMINI.md`의 Global Standard**에 부합하는 **완전 무결한 구현 흐름**을 정의합니다.
각 블록은 단순 구현이 아닌, **"사고(Think) -> 구현(Dev) -> 검증(Verify)"**의 엄격한 루프를 통과해야만 "완료"로 간주됩니다.

## 2. The Chain System Protocol
각 블록 1개마다 다음 프로세스를 **반드시 순차적으로** 수행합니다.

### Step 1: ThinkChain (심층 사고 & 갭 분석)
*   **Input**: Block Document (207, 208, 209) vs Current Code.
*   **Action**: `CodeReviewer` 스킬을 모방하여 현재 구현 상태와 문서 상의 요구사항 간의 차이점(Gap)을 정밀 분석.
*   **Artifact**: Gap Analysis Log (Internal).

### Step 2: DevChain (개발 실행 & TDD)
*   **Input**: Gap Analysis Results.
*   **Action**:
    1.  **Fail Test Creation**: `spec/system/`에 해당 블록을 검증하는 **System Spec(E2E)** 작성.
    2.  **Implementation**: Gap을 채우는 비즈니스 로직 및 뷰 구현.
    3.  **Refactoring**: 코드 품질 개선.

### Step 3: Verification Loop (무한 검증 루프)
*   **Algorithm**:
    ```ruby
    until test_result == :success
      run_test("bin/rspec spec/system/block_X_spec.rb")
      if result.failure?
        analyze_logs
        fix_bug
        # Loop continues
      else
        mark_as_done
        break
      end
    end
    ```

---

## 3. 순차적 작업 계획 (Sequential Execution Plan)

### 🔴 Block 1: MistEngine (Focus: 207 Doc)
*   **Target**: `207_Block_1_MistEngine.md`
*   **Verification**:
    *   `spec/system/mist_engine_spec.rb` 작성.
    *   검증 항목: Canvas 존재 여부, 입자 수(JS Hook), 마우스 인터랙션(JS Event Simulation), 시간대 상태 값.

### 🟡 Block 2: IdentityLayer (Focus: 208 Doc)
*   **Target**: `208_Block_2_IdentityLayer.md`
*   **Verification**:
    *   `spec/system/identity_layer_spec.rb` 작성.
    *   검증 항목: Overlay UI Visibility, SEO Meta Tag(Head), Responsive Classes, Asset Loading.

### 🔵 Block 3: ShrineFoundation (Focus: 209 Doc)
*   **Target**: `209_Block_3_ShrineFoundation.md`
*   **Verification**:
    *   `spec/system/infra_spec.rb` 작성.
    *   검증 항목: Security Headers (CSP, HSTS), `/up` Healthcheck, SSL Enforcement Configuration.

---

## 4. 최종 완료 기준 (Definition of Done)
1.  모든 Block의 `bin/rspec` 테스트가 **All Green**.
2.  로컬 브라우저 구동 시 콘솔 에러 0개.
3.  사용자에게 최종 결과 보고.

---

**승인 여부**: 계획 즉시 실행. (Plan -> Auto Execute)
