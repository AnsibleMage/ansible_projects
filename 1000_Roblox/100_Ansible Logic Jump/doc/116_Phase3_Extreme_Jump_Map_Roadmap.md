# 116_Phase3_Extreme_Jump_Map_Roadmap

> **Document Type**: Phase 3 Enhancement - Extreme Jump Map Conversion
> **User Approval**: Full autonomous execution granted

---

## 1. 목표 (Objectives)

### 1.1 핵심 변경사항
1. **고도 증가**: 시작점과 발판 높이 2배
2. **발판 증가**: 점프 한 번으로 갈 수 있게 간격 조정 및 개수 증가 (15개 → 25개)
3. **죽음의 구역**: 떨어지면 사망 + 자동 리스폰

### 1.2 게임플레이 변화
- 기존: 낮은 높이의 점프맵
- Phase 3: **극한 고공 점프맵** (높이감 + 긴장감 극대화)

---

## 2. Phase 3 태스크 목록

### T-310: 기존 발판 제거
- [x] default.project.json에서 JumpPlatform_0~14 삭제
- [x] 깨끗한 상태로 리셋

### T-320: 극한 점프 발판 재생성
- [x] 개수: 25개
- [x] 시작 높이: Y=10 studs
- [x] 최종 높이: Y=20 studs (점진적 증가)
- [x] 간격: 12 studs (1회 점프 거리)
- [x] Python 스크립트로 생성 및 추가

### T-330: SpawnLocation 높이 조정
- [x] 기존: Y=1
- [x] 신규: Y=10 (발판과 같은 시작 높이)
- [x] 크기 확대: 10 x 1 x 10 (안정적 착지)

### T-340: 죽음의 구역 (KillBrick) 구현
- [x] KillBrick Part 생성 (Y=-20, 2000x1x2000)
- [x] 서버 스크립트: src/server/DeathZone.server.lua
  - Touched 이벤트 → Humanoid:TakeDamage(100)
  - 사망 시 자동 리스폰 (Roblox 기본 동작)

### T-350: StartLine/FinishLine 높이 조정
- [x] StartLine: Y=0.5 → Y=10
- [x] FinishLine: Y=0.5 → Y=20
- [x] 높이에 맞춰 배치

### T-360: 최종 검증
- [x] Play 모드 테스트
- [x] 발판에서 떨어지면 사망 확인
- [x] 리스폰 정상 작동 확인
- [x] 25개 발판 모두 점프 가능 확인

---

## 3. 기술 명세

### 3.1 새로운 발판 사양
```python
num_platforms = 25
start_height = 10
end_height = 20
spacing = 12  # Z axis
height_increment = (end_height - start_height) / (num_platforms - 1)
```

### 3.2 KillBrick 로직
```lua
-- DeathZone.server.lua
local killBrick = workspace:WaitForChild("KillBrick")

killBrick.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")
    if humanoid then
        humanoid:TakeDamage(100)  -- Instant death
    end
end)
```

---

## 4. 예상 소요 시간
- T-310~T-330: 30분 (발판 재생성)
- T-340: 20분 (KillBrick + 스크립트)
- T-350: 10분 (Start/Finish 조정)
- T-360: 10분 (검증)
- **Total: 1시간 10분**

---

## 5. 성공 기준
- [x] SpawnLocation 높이 Y=10
- [x] 25개 발판 모두 생성 (Y=10~20)
- [x] 발판 간격 12 studs (1회 점프 가능)
- [x] 떨어지면 사망 후 리스폰
- [x] 게임플레이 "극한 점프맵" 느낌

---

**Phase 3 - Autonomous Execution Mode**
**Antigravity System V3.0**
