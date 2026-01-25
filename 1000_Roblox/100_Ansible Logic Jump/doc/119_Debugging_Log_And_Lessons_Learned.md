# 119_점프맵_개발_디버깅_로그_및_교훈 (Debugging Log & Lessons Learned)

> **프로젝트**: Forest Sprint: Extreme Sky Jump Map
> **목적**: 향후 더 크고 복잡한 점프맵 제작 시 참고 자료
> **작성일**: 2026-01-25

---

## 1. 프로젝트 개요 및 진화 과정

### Phase 1: 기본 환경 구축
- **목표**: 100m 직선 레이스 + 타이머 + 프리미엄 숲 환경
- **결과**: 성공적으로 기본 환경 완성

### Phase 2: 점프맵 특성 강화
- **목표**: 경로 표시 + 점프 발판 추가
- **결과**: 15개 발판, 낮은 높이 (Y=2~5)

### Phase 3: 극한 점프맵 변환
- **목표**: 고공 점프맵 (높이 2배, 발판 증가, 죽음의 구역)
- **결과**: 25개 발판, 고도 Y=10~20, 완전한 극한 점프맵

---

## 2. 주요 디버깅 이슈 및 해결 방법

### 🐛 Issue #1: Rojo 동기화 지연
**증상**: default.project.json 변경 후 스튜디오에 반영 안 됨

**원인**: 
- Rojo 7.6.1의 자동 동기화 방식이 대량 변경 시 감지 실패
- 파일 감시 시스템의 제한

**해결책**:
```bash
# 방법 1: Rojo 재시작
pkill -f "rojo serve"
./rojo serve

# 방법 2: 스튜디오에서 Disconnect → Connect
```

**교훈**: 
- 대량 변경 후에는 항상 Rojo 재연결 권장
- Rojo 플러그인의 "Connected" 상태 확인 필수

---

### 🐛 Issue #2: BrickColor 형식 오류
**증상**: Rojo serve가 다음 에러로 시작 실패
```
Wrong type of value for property SpawnLocation.BrickColor. 
Expected BrickColor, got a string
```

**원인**: 
```json
"BrickColor": "Lime green"  // ❌ 문자열 형식은 Roblox가 인식 못함
```

**해결책**:
```python
# BrickColor 제거하고 Color로 대체
spawn["Color"] = [0.6, 1, 0.6]  # ✅ RGB 형식
del spawn["BrickColor"]
```

**교훈**:
- Roblox 속성은 정확한 타입 필수
- BrickColor보다 Color3 (RGB 배열) 사용 권장
- Rojo 에러 메시지를 주의 깊게 읽기 (파일 경로와 속성명 명시됨)

---

### 🐛 Issue #3: KillBrick 위치 문제
**증상**: 플레이어가 떨어져도 죽지 않고 Baseplate에 착지

**원인**: 
```json
"KillBrick Position": [0, -20, 150]  // ❌ 너무 아래
"Baseplate Position": [0, -10, 0]    // Baseplate가 먼저 막음
```

**해결책**:
```python
# 1. KillBrick을 더 높게 이동
"Position": [0, -5, 150]  # ✅ Baseplate보다 위

# 2. Baseplate를 통과 가능하게
"Baseplate CanCollide": False  # ✅ 플레이어가 통과해서 떨어짐
```

**교훈**:
- 죽음의 구역은 **모든 지면보다 위**에 배치
- Baseplate는 CanCollide=false로 설정하여 안전망 제거
- Y축 좌표 계층 구조 명확히 설계:
  ```
  Platforms: Y=10~20
  Spawn: Y=10
  Ground: Y=-10 (non-collidable)
  KillBrick: Y=-5 (catch falling players)
  ```

---

### 🐛 Issue #4: Death/Respawn 시 타이머 초기화 안 됨
**증상**: 떨어져서 리스폰 후에도 타이머가 계속 작동

**원인**: 
- 서버: 사망 이벤트 감지 안 함 → `raceData` 초기화 안 됨
- 클라이언트: CharacterAdded 이벤트 미구현 → 타이머 UI 초기화 안 됨

**해결책**:

**서버 (RaceEngine.server.lua)**:
```lua
-- 플레이어 사망 감지 및 데이터 초기화
Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(function(character)
        local humanoid = character:WaitForChild("Humanoid")
        humanoid.Died:Connect(function()
            if raceData[player.UserId] then
                raceData[player.UserId] = nil  -- ✅ 데이터 삭제
            end
        end)
    end)
end)
```

**클라이언트 (TimerGui.client.luau)**:
```lua
-- 리스폰 시 타이머 UI 초기화
player.CharacterAdded:Connect(function(character)
    isRacing = false
    startTime = 0
    timerLabel.Text = "TIME: 00.00"  -- ✅ UI 초기화
end)
```

**교훈**:
- **서버-클라이언트 양쪽 모두 리스폰 처리 필요**
- Humanoid.Died 이벤트 활용
- CharacterAdded는 첫 스폰 + 리스폰 모두 감지

---

### 🐛 Issue #5: 결승선에 착지 발판 없음
**증상**: 마지막 점프 후 결승선을 지나자마자 떨어져서 죽음

**원인**: 
```json
"FinishLine": {  // ❌ 얇은 센서만 있고 착지 공간 없음
  "Size": [20, 1, 2]  
}
```

**해결책**:
```python
# 거대한 결승 발판 추가
workspace["FinishPlatform"] = {
    "Position": [0, 19.5, 305],
    "Size": [30, 1, 15],  # ✅ 30x15의 안전한 착지 구역
    "CanCollide": True
}

# FinishLine 센서 확대
workspace["FinishLine"]["Size"] = [30, 0.2, 5]
```

**교훈**:
- **센서 (Touched 이벤트) ≠ 물리적 발판**
- 목표 지점에는 항상 충분히 큰 착지 공간 제공
- 센서는 얇게, 발판은 크게 (30x15 이상 권장)

---

## 3. 로블록스 점프맵 개발 핵심 원칙

### 3.1 높이 계층 구조 (Y-Axis Hierarchy)
```
완료 영역:     Y=20    (FinishPlatform)
발판 영역:     Y=10~20 (JumpPlatforms)
스폰 지점:     Y=10    (SpawnLocation)
지면 (통과):   Y=-10   (Baseplate, CanCollide=false)
죽음의 구역:   Y=-5    (KillBrick, 모든 지면보다 위)
```

### 3.2 발판 설계 원칙
- **간격**: 12~15 studs (1회 점프 거리)
- **크기**: 6x1x6 studs (최소), 중요 지점은 더 크게
- **재질**: Concrete/Slate (미끄럼 방지)
- **개수**: 25개 (300 studs 기준, 12 studs 간격)

### 3.3 필수 구현 요소
1. **SpawnLocation**: 시작 지점, 크기 10x10 이상
2. **JumpPlatforms**: 연속된 점프 발판
3. **KillBrick**: 낙하 감지 및 즉사 처리
4. **FinishPlatform**: 안전한 결승 착지 구역
5. **Death Handler**: 서버+클라이언트 양쪽 구현

---

## 4. Rojo + 로블록스 워크플로우 체크리스트

### 개발 단계
- [ ] default.project.json 수정
- [ ] Python 스크립트로 자동 생성 (발판, 나무 등)
- [ ] Rojo serve 상태 확인 (`curl localhost:34872/api/rojo`)
- [ ] 대량 변경 시 Rojo 재시작

### 테스트 단계
- [ ] 스튜디오에서 Connect
- [ ] Explorer에서 모든 Part 존재 확인
- [ ] **Edit 모드**: 위치/크기 시각적 확인
- [ ] **Play 모드**: 실제 게임플레이 테스트
  - 스폰 → 점프 → 떨어짐 → 리스폰 → 완주
- [ ] Output 창에서 스크립트 로그 확인

### 런칭 단계
- [ ] API Services 활성화 (기록 저장용)
- [ ] Publish to Roblox
- [ ] Public 전환
- [ ] 친구 초대 후 실제 멀티 플레이 테스트

---

## 5. 향후 대형 점프맵을 위한 권장사항

### 5.1 확장성 설계
```python
# 발판을 섹션 단위로 관리
sections = {
    "Tutorial": range(0, 5),      # 쉬운 발판
    "Easy": range(5, 15),         # 중간
    "Hard": range(15, 25),        # 어려움
    "Extreme": range(25, 35)      # 극악
}

for section, platform_range in sections.items():
    for i in platform_range:
        create_platform(i, difficulty=section)
```

### 5.2 체크포인트 시스템
- 일정 구간마다 체크포인트 추가
- 사망 시 마지막 체크포인트로 리스폰
- 섹션별 타이머 기록

### 5.3 난이도 조절 요소
- **간격 변화**: 12 studs → 15 studs (어렵게)
- **높이 변화**: 점진적 상승 + 급격한 낙하 혼합
- **발판 크기**: 6x6 → 4x4 → 2x2 (점차 작게)
- **이동 발판**: Tween으로 좌우 움직이는 발판

### 5.4 시각적 향상
- 섹션별 색상 구분
- 파티클 효과 (발판 착지 시)
- 배경 음악 및 사운드
- 리더보드 UI

---

## 6. 최종 교훈

### ✅ 성공 요인
1. **단계적 접근**: Phase 1 → 2 → 3로 점진적 확장
2. **문서 우선**: PRD 먼저 작성 후 구현
3. **즉각 검증**: 각 변경사항마다 Play 모드 테스트
4. **품질 기준**: "작동"이 아닌 "완벽"을 목표로

### ⚠️ 주의사항
1. Rojo 동기화 항상 확인
2. Y축 좌표 계층 명확히 설계
3. 센서와 물리 발판 구분
4. 서버-클라이언트 양쪽 구현

### 🚀 다음 프로젝트를 위한 조언
- 이 문서의 Issue #1~5를 사전에 방지
- 체크포인트 시스템을 **설계 단계부터** 포함
- 발판 개수가 50개 이상이면 섹션 단위로 관리
- 테스트 플레이어 3명 이상 확보 (난이도 밸런싱용)

---

**작성자**: Antigravity System V3.0
**다음 프로젝트**: 더 크고, 더 높고, 더 깊이 있는 메가 점프맵을 향하여! 🚀
