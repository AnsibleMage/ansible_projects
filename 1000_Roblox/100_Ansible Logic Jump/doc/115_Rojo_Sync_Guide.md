# Rojo Sync 가이드 - 변경사항 적용 방법

## 현재 상황
스크린샷을 보니 녹색 바닥과 나무만 보이고, 새로 추가한 경로 표시(Path Markers)와 점프 발판(Jump Platforms)이 보이지 않습니다.

## 원인
`default.project.json`에 변경사항을 추가했지만, **Rojo가 아직 로블록스 스튜디오에 동기화하지 않았습니다**.

## 해결 방법 (3가지 중 하나 선택)

### ✅ 방법 1: Rojo Sync 버튼 클릭 (가장 빠름)
1. 로블록스 스튜디오 상단 메뉴에서 **Plugins** 탭 클릭
2. **Rojo** 섹션 찾기
3. **"Sync"** 버튼 클릭
   - 또는 **"Connect"** 버튼이 보이면 먼저 Connect → 그 다음 Sync

### ✅ 방법 2: Rojo 재연결
1. 터미널에서 `Ctrl+C`로 Rojo serve 중단
2. 다시 `./rojo serve` 실행
3. 로블록스 스튜디오에서 Rojo → Connect

### ✅ 방법 3: 프로젝트 재오픈
1. 로블록스 스튜디오 완전히 종료
2. 터미널에서 Rojo serve가 실행 중인지 확인
3. 스튜디오 재시작 → File → Open from Roblox → 프로젝트 선택

## 확인 방법

Sync 후 다음을 확인하세요:

### Explorer 창에서 확인
```
Workspace
├── Baseplate
├── StartLine (흰색 네온)
├── FinishLine (노란색 네온)
├── PathMarker_L_0 (갈색)
├── PathMarker_L_1
├── ...
├── PathMarker_R_0 (갈색)
├── ...
├── JumpPlatform_0 (회색)
├── JumpPlatform_1
├── ...
└── PremiumTree_0~29
```

### 게임 화면에서 확인
- **경로 표시**: 트랙 양옆에 갈색 돌 경계선
- **점프 발판**: 회색 사각 발판들 (높이가 점점 올라감)

## 여전히 안 보이면?

저에게 다음을 알려주세요:
1. Explorer 창 스크린샷
2. Rojo Sync 버튼을 눌렀는지 여부
3. Output 창에 에러 메시지가 있는지

---
**Antigravity System V3.0 - Troubleshooting Mode**
