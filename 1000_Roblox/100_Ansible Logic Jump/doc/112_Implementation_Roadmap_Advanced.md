# 112_포레스트 스프린트 실행 로드맵 (고도화된 작업 계획서)

> **문서 유형**: Task-Level Implementation Plan
> **작성 기준**: GEMINI.md STEP-BY-STEP + TODO 관리 원칙

---

## 1. 작업 원칙 (Working Principles)

### 1.1 핵심 규칙
1.  **한 번에 하나씩**: 각 태스크는 독립적으로 완료 후 다음으로 진행
2.  **검증 필수**: 모든 태스크 완료 후 체크리스트 기반 검증 수행
3.  **문서 준수**: 111_PRD를 계약서로 간주, 임의 변경 금지
4.  **품질 우선**: 빠른 완성보다 기준 충족 우선

### 1.2 품질 게이트 (Quality Gates)
각 Phase 종료 시 다음 조건을 모두 충족해야 다음 Phase로 진행:
- [ ] 모든 태스크 체크박스 완료
- [ ] 해당 Phase의 검증 체크리스트 100% 통과
- [ ] Play 모드에서 시각적/기능적 확인 완료

---

## 2. Phase 1: 환경 구축 (Environment Setup)

### 2.1 태스크 목록

#### T-101: 베이스플레이트 설정
- [ ] `default.project.json`에서 Baseplate 속성 수정
  - Material: "Grass"
  - Color: [0.227, 0.49, 0.082]
  - Size: [1024, 20, 1024]
- [ ] **검증**: Play 모드에서 바닥이 잔디로 보이는지 확인

#### T-102: 라이팅 시스템 구축
- [ ] Lighting 속성 설정
  - Technology: "Future"
  - Ambient: [0.51, 0.588, 0.51]
  - Brightness: 2
  - GlobalShadows: true
- [ ] Atmosphere 추가
  - Density: 0.3
  - Haze: 2.0
  - Color: [0.75, 0.8, 0.75]
- [ ] Bloom 추가
  - Intensity: 1.0
  - Size: 24
  - Threshold: 2
- [ ] SunRays 추가
  - Intensity: 0.15
  - Spread: 0.5
- [ ] **검증**: 숲속 분위기가 느껴지는지 스크린샷으로 확인

#### T-103: 프리미엄 나무 생성 (Python Script)
- [ ] Python 스크립트 작성 (tree_generator.py)
  - 30그루 이상 생성
  - 각 나무: Trunk 2~3개 + Leaves 3~5개
  - 색상 다양성 확보 (3가지 녹색 톤)
  - 위치: X축 ±12~30, Z축 0~300 무작위
- [ ] JSON 출력 생성
- [ ] `default.project.json`의 Workspace에 수동 주입
- [ ] **검증**: Explorer에서 PremiumTree_0~29가 모두 Model로 존재하는지 확인

#### T-104: 환경 종합 검증
- [ ] 111_PRD 섹션 6.1 체크리스트 실행
- [ ] Play 모드에서 360도 회전하며 시각 확인
- [ ] 스크린샷 3장 촬영 (정면, 좌측, 우측)
- [ ] **Quality Gate**: 모든 체크리스트 ✅ 시 Phase 2로 진행

---

## 3. Phase 2: 트랙 및 장애물 배치 (Track & Obstacles)

### 3.1 태스크 목록

#### T-201: 100m 트랙 설치
- [ ] StartLine Part 생성
  - Position: [0, 0.5, 0]
  - Size: [20, 1, 2]
  - Material: "Neon"
  - Color: [1, 1, 1]
- [ ] FinishLine Part 생성
  - Position: [0, 0.5, 300]
  - Size: [20, 1, 2]
  - Material: "Neon"
  - Color: [1, 1, 0]
- [ ] SprintTrack Part 생성
  - Position: [0, 0.1, 150]
  - Size: [15, 0.1, 300]
  - Material: "Grass"
  - CanCollide: false
- [ ] **검증**: StartLine에서 FinishLine까지 거리가 정확히 300 studs인지 확인

#### T-202: 장애물 배치
- [ ] LogHurdle_1 생성
  - Position: [0, 1, 100]
  - Size: [10, 1.5, 2]
  - Material: "Wood"
  - Color: [0.4, 0.3, 0.2]
- [ ] LogHurdle_2 생성
  - Position: [0, 1, 200]
  - Size: [10, 1.5, 2]
  - Material: "Wood"
  - Color: [0.4, 0.3, 0.2]
- [ ] **검증**: 장애물에 충돌 시 캐릭터가 튕겨나는지 테스트

#### T-203: 트랙 종합 검증
- [ ] 111_PRD 섹션 6.2 일부 (물리적 요소만) 체크
- [ ] 실제로 100m 달려보기
- [ ] **Quality Gate**: 트랙이 명확하게 보이고 장애물이 작동하면 Phase 3로 진행

---

## 4. Phase 3: 게임 로직 구현 (Game Logic)

### 4.1 태스크 목록

#### T-301: RaceEngine 서버 스크립트 작성
- [ ] `src/server/RaceEngine.server.lua` 생성
- [ ] DataStoreService 초기화
  - Store Name: "ForestSprintRecords"
- [ ] StartLine Touched 이벤트 구현
  - `raceData[userId] = tick()` 저장
  - print("Race Started for: " .. player.Name)
- [ ] FinishLine Touched 이벤트 구현
  - 시간 계산: `finishTime = tick() - startTime`
  - DataStore에 최고 기록 저장 (if finishTime < currentBest)
  - print("Finish Time: " .. finishTime)
- [ ] **검증**: Output 창에서 Start/Finish 메시지 확인

#### T-302: TimerGui 클라이언트 스크립트 작성
- [ ] `src/client/TimerGui.client.luau` 생성
- [ ] ScreenGui 생성 (이름: "SprintTimerGui")
- [ ] TextLabel 생성
  - Position: UDim2.new(0.5, -100, 0.1, 0)
  - Size: UDim2.new(0, 200, 0, 50)
  - Text: "TIME: 00.00"
  - TextSize: 24
- [ ] StartLine/FinishLine 터치 감지
- [ ] RenderStepped로 실시간 시간 업데이트
  - Format: string.format("TIME: %.2f", elapsed)
- [ ] **검증**: 레이스 중 화면에 타이머가 보이고 숫자가 증가하는지 확인

#### T-303: 로직 종합 검증
- [ ] 111_PRD 섹션 6.2 전체 체크리스트 실행
- [ ] 111_PRD 섹션 7 (Acceptance Tests) 전체 실행
  - Test Case 1: 기본 레이스
  - Test Case 2: 장애물 상호작용  
  - Test Case 3: 기록 저장
- [ ] **Quality Gate**: 모든 테스트 통과 시 Phase 4로 진행

---

## 5. Phase 4: 최종 검증 및 문서화 (Final Verification)

### 5.1 태스크 목록

#### T-401: 종합 품질 검증
- [ ] 111_PRD 섹션 6 (전체 검증 체크리스트) 재실행
- [ ] FPS 측정 (F3 또는 Shift+F3)
  - 데스크톱: 60fps 이상 확인
- [ ] 다양한 각도에서 스크린샷 10장 촬영

#### T-402: 코드 품질 검사
- [ ] Selene 린트 실행 (오류 0건 목표)
  ```bash
  ./selene src/
  ```
- [ ] StyLua 포맷팅 실행
  ```bash
  ./stylua src/
  ```
- [ ] **검증**: 모든 경고 해결

#### T-403: 최종 문서 작성
- [ ] 113_Final_Walkthrough.md 작성
  - 구현된 기능 목록
  - 검증 결과 스크린샷 첨부
  - 알려진 이슈 (있다면)
  - 향후 개선 방향
- [ ] README.md 업데이트 (프로젝트 상태 반영)

#### T-404: 최종 사용자 제출
- [ ] 모든 TODO 체크박스 확인
- [ ] task.md 최종 업데이트
- [ ] 사용자에게 Play 테스트 요청
- [ ] **Quality Gate**: 사용자 승인 시 프로젝트 완료

---

## 6. 오류 처리 프로토콜 (Error Handling)

### 6.1 검증 실패 시
1.  해당 태스크 체크박스를 **언체크**
2.  문제 원인 분석 (코드 리뷰 or 설계 리뷰)
3.  수정 후 재검증
4.  통과 시에만 체크박스 재체크

### 6.2 설계 변경 필요 시
1.  **절대 임의 변경 금지**
2.  111_PRD 문서를 먼저 수정
3.  수정 근거 문서화
4.  사용자 승인 후 구현 재개

---

## 7. 예상 소요 시간 (Estimated Timeline)

| Phase | 예상 시간 | 비고 |
|:---|:---|:---|
| Phase 1 (환경) | 2~3시간 | Python 스크립트 + JSON 수동 주입 |
| Phase 2 (트랙) | 1시간 | 단순 Part 배치 |
| Phase 3 (로직) | 2시간 | Lua 스크립트 작성 및 디버깅 |
| Phase 4 (검증) | 1시간 | 종합 테스트 및 문서화 |
| **Total** | **6~7시간** | 품질 우선 개발 기준 |

---

## 8. 성공 기준 (Definition of Done)

다음 조건을 **모두** 충족해야 프로젝트 완료로 간주:
- [ ] 111_PRD의 모든 품질 기준 충족
- [ ] 111_PRD의 모든 검증 체크리스트 통과
- [ ] 111_PRD의 모든 인수 테스트 통과
- [ ] 사용자가 Play 모드에서 "이쁜 숲"이라고 느낌
- [ ] 사용자가 "이번엔 제대로 만들었다"고 승인

---

**Document Version**: 1.0 (Advanced Task-Level Edition)
**Last Updated**: 2026-01-25
**Author**: Antigravity System V3.0 (STEP-BY-STEP Mode)
