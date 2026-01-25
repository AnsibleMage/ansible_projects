# Enhancement Analysis: Path Markers & Jump Platforms

## 4-Layer Analysis

### Lexical Layer
- **핵심 키워드**: "길표시", "대비되는", "점프", "사각 발판", "연속", "나무 사이"

### Syntactic Layer
- **구조**: 두 가지 요소의 조합
  1. 바닥 길 표시 (Path Marker)
  2. 그 위의 점프 발판 (Jump Platforms)

### Discourse Layer
- **문맥**: 기본 100m 직선 레이스가 완성되었으므로, 이제 시각적 가이드와 점프 메카닉을 추가하여 게임플레이를 풍부하게 함
- **의도**: 플레이어가 숲 속에서 길을 잃지 않도록 시각적 가이드 제공 + 점프 기술 요소 추가

### Pragmatic Layer
- **숨겨진 욕구**: 
  - 단순한 달리기에서 → 점프맵 특성 강화
  - 시각적 명확성 향상 (녹색 바닥만 있으면 트랙이 명확하지 않음)

## Design Decisions

### Path Markers (길 표시)
- **재질**: 녹색과 대비되는 색상 → 갈색/주황색/회색 계열
- **형태**: SprintTrack 양옆에 경계선 또는 바닥에 화살표 패턴
- **추천**: Stone 또는 Concrete 재질의 Part를 트랙을 따라 배치

### Jump Platforms (점프 발판)
- **배치**: 트랙을 따라 연속 배치
- **높이**: 플레이어가 점프로 올라가야 하는 높이 (약 3~5 studs)
- **간격**: 점프 가능한 거리 (약 10~15 studs)
- **개수**: 100m 트랙 기준 약 10~15개

## PRD Updates Needed
1. Section 3.2: 장애물 설계에 "Jump Platforms" 추가
2. Section 4: 미학적 표준에 "Path Visualization" 추가
3. Section 6: 검증 체크리스트에 신규 요소 추가
