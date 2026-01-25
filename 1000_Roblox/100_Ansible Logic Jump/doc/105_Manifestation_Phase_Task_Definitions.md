> **Original User Prompt**: "그에 맞게 작업 계획을 또 만들어줘 설계대로 만들 작업 계획이야 태스크정의지 너가 그 태스크의 순서대로 작업을 체크하면서 진행해야해"

# 105_Manifestation_Phase_Task_Definitions: 실행 단계 태스크 정의서

## 1. 개요 (Overview)
본 문서는 `102_`, `103_`, `104_` 설계도를 바탕으로 안티그래비티가 수행할 **실제 구현 태스크의 순서와 검증 지표**를 정의합니다. 각 태스크는 원자적(Atomic)으로 구성되어 한 번에 한 단계씩 엄격하게 진행됩니다.

## 2. 태스크 시퀀스 (Task Sequence)

### [T-100] 글로벌 환경 및 라이팅 동기화
*   **Action**: `default.project.json`의 `Lighting` 및 `Workspace.Baseplate` 속성 업데이트.
*   **Verification**: 로블록스 스튜디오의 바닥 재질이 `Grass`로, 라이팅 기술이 `Future`로 변경됨.

### [T-200] 100미터 트랙 및 경계물 배치
*   **Action**: `default.project.json`에 `StartLine`, `FinishLine`, `SprintTrack` 객체 주입.
*   **Verification**: X:0, Z:0(출발)에서 X:0, Z:300(도착)까지의 거리 정밀 확인.

### [T-300] 장애물 및 식생(Trees) 생성 자동화
*   **Action**: `104_`에 정의된 파이썬/루아 로직을 실행하여 무작위 나무 에셋 20개와 통나무 허들 배치.
*   **Verification**: 트랙 주변에 숲의 형태가 갖춰지고 물리적 장애물(Hurdle)이 로드됨.

### [T-400] 레이싱 엔진 서버 스크립트 실장
*   **Action**: `src/server/RaceEngine.server.lua` 생성 및 `Touched` 이벤트 기반 타이머 로직 작성.
*   **Verification**: 플레이어가 출발선을 밟을 때 터미널 로그에 "Race Started" 메시지 출력.

### [T-500] 데이터스토어 및 리더보드 연동
*   **Action**: `DataStoreService`를 활용한 플레이어 기록 저장 도구 완성. 리더보드 파트 생성 및 동기화.
*   **Verification**: 결승선 통과 시 리더보드에 사용자의 닉네임과 기록이 표시됨.

### [T-600] 최종 프로토콜 검증 (Verification)
*   **Action**: 모든 파트의 `Anchored` 여부와 소스코드 문법 오류(`Selene`) 체크.
*   **Verification**: 오류 0건 도달 시 사용자에게 최종 런칭 보고.

## 3. 예외 처리 가이드 (Exception Handling)
*   동기화 중 에러 발생 시 즉시 중단하고 **[Complexity Resolver]** 모드 가동 후 원인 파악.
*   사용자의 미학적 수정 요청 시 즉시 `102_` 설계도 업데이트 후 반영.

---
**Manifestation Tasking V3.0 — Sequence Ready to Execute.**
