# 113_Phase2_Enhancement_Roadmap: 경로 표시 및 점프 발판 추가

> **Document Type**: Implementation Plan for Phase 2 Enhancements
> **Prerequisites**: Phase 1 완료 (환경, 트랙, 기본 로직)

---

## 1. 작업 개요 (Overview)

### 1.1 목표
기존의 100m 직선 레이스에 다음 요소를 추가하여 점프맵 특성 강화:
1.  **경로 표시 (Path Markers)**: 녹색 바닥과 대비되는 시각적 가이드
2.  **점프 발판 (Jump Platforms)**: 연속된 사각 발판을 점프하며 진행

### 1.2 작업 원칙
- 111_PRD Section 3.2 엄격히 준수
- 한 번에 하나씩 (Path Markers → Jump Platforms)
- 각 단계마다 Play 모드 테스트 필수

---

## 2. Phase 2 태스크 목록

### T-210: 경로 표시 (Path Markers) 구현

#### T-211: Path Marker 스펙 정의
- [ ] 위치 계산: SprintTrack 양옆 (X축 ±8 위치)
- [ ] 개수: Z축 0~300 범위, 10 studs 간격 → 약 30개
- [ ] 색상 및 재질 확정: Slate, RGB(80, 60, 40)

#### T-212: Path Marker 생성 스크립트
- [ ] Python 스크립트 작성
  ```python
  # 양쪽에 각각 30개씩, 총 60개의 경로 표시 생성
  for z in range(0, 301, 10):
      create_path_marker(x=8, z=z)   # 우측
      create_path_marker(x=-8, z=z)  # 좌측
  ```
- [ ] JSON 출력 및 default.project.json에 추가

#### T-213: Path Marker 검증
- [ ] Explorer에서 PathMarker_L_0~29, PathMarker_R_0~29 확인
- [ ] Play 모드에서 경로가 명확하게 보이는지 확인
- [ ] 녹색 바닥과 충분히 대비되는지 시각 확인

---

### T-220: 점프 발판 (Jump Platforms) 구현

#### T-221: 발판 배치 전략 수립
- [ ] 개수: 12~15개
- [ ] Z축 위치: 0~300 범위를 균등 분할 (약 20~25 studs 간격)
- [ ] Y축 높이: 2~5 studs, 점진적 난이도 증가
- [ ] X축 오프셋: -6~6 범위 (나무 사이 경로를 따라 좌우 변화)

#### T-222: Jump Platform 생성 스크립트
- [ ] Python 스크립트 작성
  ```python
  # 15개 발판, 점진적 높이 증가
  for i in range(15):
      z_pos = i * 20  # 0, 20, 40, ..., 280
      y_pos = 2 + (i * 0.2)  # 2.0 → 4.8 점진적 상승
      x_offset = random.uniform(-6, 6)
      create_jump_platform(i, x_offset, y_pos, z_pos)
  ```
- [ ] JSON 출력 및 default.project.json에 추가

#### T-223: Jump Platform 물리 설정
- [ ] 각 발판 Anchored = true
- [ ] CanCollide = true (착지 가능)
- [ ] Material = "Concrete"
- [ ] Color = RGB(120, 120, 120)

#### T-224: Jump Platform 검증
- [ ] Explorer에서 JumpPlatform_0~14 확인
- [ ] Play 모드에서 실제로 점프하며 진행 가능한지 테스트
- [ ] 발판 간격이 너무 멀거나 가까운지 확인
- [ ] **Critical**: 떨어지면 Baseplate로 착지 가능한지 확인

---

### T-230: 종합 검증 및 밸런싱

#### T-231: 게임플레이 테스트
- [ ] 처음부터 끝까지 완주 가능한지 확인
- [ ] 점프 난이도가 적절한지 평가 (너무 쉽거나 어렵지 않은지)
- [ ] 경로 표시가 플레이어를 올바른 방향으로 유도하는지 확인

#### T-232: 시각적 품질 검증
- [ ] 111_PRD Section 6.1 체크리스트 재실행
- [ ] 나무와 발판이 겹치지 않는지 확인
- [ ] 전체적인 미학적 조화 확인

#### T-233: 최종 문서화
- [ ] 114_Phase2_Completion_Walkthrough.md 작성
  - 추가된 요소 스크린샷
  - 게임플레이 변화 설명
  - 알려진 이슈 및 향후 개선 방향

---

## 3. 예상 소요 시간

| Task | 예상 시간 | 비고 |
|:---|:---|:---|
| T-210 (Path Markers) | 1시간 | Python 스크립트 + 검증 |
| T-220 (Jump Platforms) | 2시간 | 배치 전략 + 밸런싱 |
| T-230 (검증) | 30분 | 게임플레이 테스트 |
| **Total** | **3.5시간** | 품질 우선 개발 기준 |

---

## 4. 성공 기준 (Definition of Done)

- [ ] 경로 표시가 명확하게 보임 (녹색 바닥과 대비)
- [ ] 점프 발판을 따라 처음부터 끝까지 이동 가능
- [ ] 발판에서 떨어져도 게임 계속 가능 (Baseplate 착지)
- [ ] 타이머와 기록 저장 기능이 여전히 정상 작동
- [ ] 사용자가 "점프맵 느낌이 난다"고 승인

---

**Document Version**: 1.0 (Phase 2 Enhancement)
**Last Updated**: 2026-01-25
**Author**: Antigravity System V3.0 (Quality-First Mode)
