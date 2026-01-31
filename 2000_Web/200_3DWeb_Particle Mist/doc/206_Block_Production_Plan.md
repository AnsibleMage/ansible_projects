# 206_Block_Production_Plan (Block 설계 계획서)

> 사용자 프롬프트:
> "먼저 체인시스템에 의한 작업계획을 세우고 작업을 진행해줘"

---

## 1. 개요 (Overview)
본 계획서는 PRD(`205_PRD_Ansible_Particle_Mist.md`)에서 정의된 3개 핵심 블록을 **[Block_템플릿_통합.md]** 기반의 구체적인 설계 문서로 변환하기 위한 실행 전략입니다. **WebDevChain**의 심화 단계로, 아키텍처를 실제 구현 가능한 단위로 분해합니다.

## 2. 체인 시스템 (Chain System)
**[WebDevChain]** + **[SystemArchitect Skill]**

1.  **System Architect (구조 설계)**: PRD의 추상적 요구사항을 Block -> Feature -> Task 계층으로 논리적 분해.
2.  **Fractal TDD (검증 설계)**: 각 계층별 테스트 전략(System/Request/Unit Spec) 사전 정의.

---

## 3. 병렬 작업 계획 (Parallel Work Plan)

Antigravity는 다음 **3개의 독립 블록 스레드**를 병렬적으로 설계하여 문서를 생성합니다.

### Thread 1: The Core (MistEngine)
*   **Target**: `doc/207_Block_1_MistEngine.md`
*   **Context**: 시스템의 심장. Pure JS + Canvas Logic.
*   **Key Features**:
    1.  **ParticleSystem**: 1000개 입자의 생명주기 및 렌더링 루프 최적화.
    2.  **PhysicsCore**: 마우스 인력/척력 및 파동(Ripple) 수학 연산.
    3.  **TimeMapper**: 4단계 시간대 감지 및 Lerp 색상 보간.

### Thread 2: The Face (IdentityLayer)
*   **Target**: `doc/208_Block_2_IdentityLayer.md`
*   **Context**: 사용자 경험 및 콘텐츠. Rails View + Overlay.
*   **Key Features**:
    1.  **OverlayUI**: 캔버스 위의 부유하는 텍스트/메뉴 인터페이스 (Tailwind).
    2.  **ContentServing**: Propshaft 기반 에셋 서빙 및 폰트 최적화.
    3.  **SEOMeta**: 동적 메타 태그 및 OpenGraph 관리.

### Thread 3: The Base (ShrineFoundation)
*   **Target**: `doc/209_Block_3_ShrineFoundation.md`
*   **Context**: 견고한 인프라 및 배포. Rails Config.
*   **Key Features**:
    1.  **Deployment**: Kamal 활용 Docker 단일 컨테이너 배포 설정.
    2.  **Optimizers**: Cache-Control, Gzip/Brotli 압축 정책.
    3.  **Security**: CSP(Content Security Policy) 및 Rack Attack 설정.

---

## 4. 산출물 명세 (Deliverables)
각 문서는 `doc/templates/Block_템플릿_통합.md`를 사용하여 다음 내용을 포함합니다:
*   **Block 정의**: Bounded Context 명확화.
*   **3 Features Breakdown**: Feature별 5개 Task로 세분화.
*   **Fractal TDD Plan**: 각 단계별 테스트 코드 작성 가이드.

---

**승인 여부**: 계획에 따라 즉시 3개 문서 작성을 시작합니다.
