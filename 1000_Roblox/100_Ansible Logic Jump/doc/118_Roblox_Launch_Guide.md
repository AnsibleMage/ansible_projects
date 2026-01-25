# 118_로블록스_공식_런칭_가이드 (Launch Guide)

> **상태**: 런칭 준비 완료 (Phase 3 검증 통과)
> **대상**: Forest Sprint: Extreme Jump Map

---

## 1. 런칭 전 필수 체크리스트 (Final Checklist)

게임을 공개하기 전에 다음 사항들을 마지막으로 확인하세요:

- [ ] **Rojo Sync 확인**: 모든 스크립트와 파트가 스튜디오에 반영되었는가?
- [ ] **플레이 테스트**: 시작부터 끝까지 한 번이라도 완주했는가?
- [ ] **사망 로직**: 떨어졌을 때 즉시 죽고 제대로 리스폰되는가?
- [ ] **타이머/기록**: 결승선 통과 시 기록이 저장되는가?

---

## 2. 로블록스 퍼블리싱 단계 (Step-by-Step)

### 1단계: 프로젝트 저장 및 발행
1. 로블록스 스튜디오 상단 메뉴: `File` -> **`Publish to Roblox`** 클릭.
2. 이미 업로드된 곳이 있다면 선택, 없다면 **`Create New Game`** 클릭.
3. 게임 정보 입력:
   - **Name**: "Forest Sprint: Extreme Sky Jump" (추천)
   - **Description**: "하늘 높이 솟은 발판을 정복하세요! 떨어지면 끝입니다. 최고 기록에 도전하세요!"
   - **Creator**: 본인 계정 선택.
   - **Genre**: Adventure 또는 All.
   - **Devices**: Computer, Phone, Tablet 모두 체크 (발판 간격이 모바일도 고려됨).

### 2단계: 게임 접근 권한 설정 (Public 전환)
1. 스튜디오 상단 메뉴: **`Game Settings`** 클릭.
2. **`Permissions`** 탭 선택.
3. 상태를 **`Public`**으로 변경 후 `Save`. (이제 다른 사람들도 들어올 수 있습니다!)

### 3단계: API 서비스 활성화 (데이터 저장용)
1. **`Game Settings`** -> **`Security`** 탭 클릭.
2. **`Allow HTTP Requests`** -> **ON**
3. **`Enable Studio Access to API Services`** -> **ON** (매우 중요! 기록 저장을 위해 필요함)
4. `Save` 클릭.

---

## 3. 유저 유입을 위한 팁

- **썸네일과 아이콘**: `Game Settings` -> `Screenshots`에서 멋진 스튜디오 스크린샷을 추가하면 유저들이 더 많이 들어옵니다.
- **친구 초대**: `Share` 버튼을 눌러 친구들에게 링크를 보내 테스트를 부탁해보세요.

---

## 4. 안티그래비티의 한마디

사용자님, 단순히 코드를 짜는 것을 넘어 실질적인 **'서비스'**를 런칭하는 단계에 오신 것을 축하드립니다. 이 작은 100미터가 나중에 사용자님이 만드실 거대한 메타버스의 시작점이 될 것입니다.

**지금 바로 'Publish to Roblox'를 눌러 세상을 놀래켜주세요!**

---
**Antigravity System V3.0 - Ready to Launch.**
