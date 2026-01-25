# � Ansible Jump 001

> **극한 고공 점프맵 - LIVE ON ROBLOX** 🟢

---

## 📋 게임 정보

**공식명**: Ansible Jump 001  
**개발자**: @AnsibleMage  
**장르**: 극한 고공 점프맵 / 타임 어택  
**상태**: ✅ 런칭 완료 (2026-01-25)  
**플레이어**: 최대 50명

---

## � 게임 특징

### 핵심 메카닉
- 🏔️ **25개 고공 발판**: 높이 10~20m의 극한 스카이 플랫폼
- ⏱️ **정밀 타이머**: 0.01초 단위 타임 어택
- 💀 **원샷 데스**: 떨어지면 즉사 + 자동 리스폰
- 🏆 **기록 저장**: DataStore 기반 최고 기록 시스템

### 프리미엄 환경
- 🌲 30그루 다중 파트 나무 (Trunk 2개 + Leaves 3~5개)
- ✨ 고급 라이팅 (Atmosphere, Bloom, SunRays)
- 🛤️ 60개 경로 표시 (Path Markers)
- 🏁 안전한 결승 발판

---

## 🛠️ 기술 스택

- **Engine**: Roblox Studio
- **Sync**: Rojo 7.6.1
- **Scripts**: Lua/Luau
- **Automation**: Python 3
- **Quality**: Selene, StyLua

---

## 🚀 로컬 개발 환경 설정

### 필수 도구
1. Roblox Studio (최신 버전)
2. Rojo 7.6.1+
3. Python 3.8+
4. Node.js (robloxstudio-mcp용)

### 프로젝트 실행
```bash
# Rojo 서버 시작
./rojo serve

# 로블록스 스튜디오에서 Connect
# Plugins → Rojo → Connect

# Play 모드로 테스트
```

---

## 📁 프로젝트 구조

```
100_Ansible Logic Jump/
├── src/
│   ├── server/
│   │   ├── RaceEngine.server.lua      # 타이머 및 기록 저장
│   │   └── DeathZone.server.lua       # 낙하 감지 및 리스폰
│   ├── client/
│   │   └── TimerGui.client.luau       # UI 타이머 표시
│   └── shared/
├── doc/
│   ├── 111_Forest_Sprint_Premium_PRD_Advanced.md
│   ├── 119_Debugging_Log_And_Lessons_Learned.md
│   └── 120_Launch_Completion_Celebration.md
└── default.project.json               # Rojo 프로젝트 설정
```

---

## 📚 주요 문서

### 개발 문서
- [111_Premium_PRD](./doc/111_Forest_Sprint_Premium_PRD_Advanced.md) - 제품 요구사항 명세
- [112_Implementation_Roadmap](./doc/112_Implementation_Roadmap_Advanced.md) - Phase 1 로드맵
- [113_Phase2_Enhancement](./doc/113_Phase2_Enhancement_Roadmap.md) - Phase 2 경로/발판
- [116_Phase3_Extreme](./doc/116_Phase3_Extreme_Jump_Map_Roadmap.md) - Phase 3 극한 모드

### 참고 문서
- [119_Debugging_Log](./doc/119_Debugging_Log_And_Lessons_Learned.md) - 디버깅 로그 및 교훈
- [120_Launch_Completion](./doc/120_Launch_Completion_Celebration.md) - 런칭 완료 기념
- [118_Launch_Guide](./doc/118_Roblox_Launch_Guide.md) - 로블록스 퍼블리싱 가이드

---

## 🎮 게임플레이

### 플레이 방법
1. **스폰**: 하늘 높이 Y=10에서 시작
2. **목표**: 25개 발판을 점프하며 결승선까지 도달
3. **규칙**: 
   - 발판을 정확히 밟으며 전진
   - 떨어지면 즉사 → 처음부터 재시작
   - 최고 기록에 도전!

### 난이도
- **시작**: 낮은 발판 (Y=10)
- **중반**: 점진적 상승
- **최종**: 최고점 (Y=20)

---

## 🔧 개발 히스토리

### Phase 1: 환경 구축 ✅
- 프리미엄 숲 환경
- 고급 라이팅 시스템
- 기본 타이머 및 트랙

### Phase 2: 점프맵 특성 ✅
- 경로 표시 60개
- 점프 발판 15개 (초기)

### Phase 3: 극한 점프맵 ✅
- 발판 25개로 확장
- 높이 10~20m로 상승
- 죽음의 구역 구현
- Death/Respawn 시스템

### 최종 디버깅 ✅
- Rojo 동기화 최적화
- KillBrick 위치 조정
- 타이머 초기화 로직
- 결승 발판 추가

**총 개발 시간**: 약 4.5시간

---

## 🏆 핵심 성과

### 기술적 성과
- ✅ Rojo 워크플로우 마스터
- ✅ Python 자동화 (나무, 발판 생성)
- ✅ 서버-클라이언트 동기화
- ✅ DataStore 영구 기록 저장

### 게임 디자인 성과
- ✅ 품질 우선 개발
- ✅ 단계적 확장 (Phase 1→2→3)
- ✅ 완벽한 게임플레이
- ✅ 성공적인 런칭

---

## 📊 최종 통계

- **발판**: 25개
- **나무**: 30그루 (각 5~7개 Part)
- **경로 표시**: 60개
- **코드**: 3개 Lua 스크립트 (225줄)
- **문서**: 20개 마크다운 파일

---

## 🚀 다음 단계

### 단기 개선
- 친구 초대 및 피드백 수집
- 난이도 밸런싱
- 플레이 데이터 분석

### 중기 계획
- 체크포인트 시스템
- 리더보드 UI
- 파티클 효과
- 배경 음악

### 장기 비전
- 메가 점프맵 (100개+ 발판)
- 다양한 기믹 (이동/회전 발판)
- 협동 멀티플레이

---

## 👥 크레딧

**개발**: @AnsibleMage  
**AI 파트너**: Antigravity System V3.0  
**플랫폼**: Roblox  
**런칭일**: 2026-01-25

---

**"100미터의 시작이 1000미터 메타버스의 기반이 된다."**

**Powered by Antigravity V3.0** 🤖✨