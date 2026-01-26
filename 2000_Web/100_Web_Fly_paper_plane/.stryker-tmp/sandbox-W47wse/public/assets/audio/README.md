# Block 4 오디오 에셋

## 📦 필요한 오디오 파일

Block 4 UI/UX Integration 시스템에서 사용하는 오디오 파일들입니다.

### 🎵 배경 음악 (Background Music)

**위치:** `music/`

1. **menu-bgm.mp3**
   - 용도: 메인 메뉴 화면 배경 음악
   - 길이: 2-3분 (루프 가능)
   - 분위기: 밝고 경쾌한
   - 추천 소스: [Pixabay Music - Upbeat](https://pixabay.com/music/search/upbeat/)

2. **gameplay-bgm.mp3**
   - 용도: 게임 플레이 중 배경 음악
   - 길이: 3-5분 (루프 가능)
   - 분위기: 긴장감 있는, 액션
   - 추천 소스: [Pixabay Music - Action](https://pixabay.com/music/search/action/)

---

### 🔊 효과음 (Sound Effects)

**위치:** `sfx/`

1. **engine-sound.mp3**
   - 용도: 비행기 엔진 소리 (비행 중 루프)
   - 키워드: airplane engine, propeller, flight

2. **wind-sound.mp3**
   - 용도: 바람 소리 (고속 비행 시)
   - 키워드: wind, whoosh, air

3. **collision.mp3**
   - 용도: 장애물 충돌 시
   - 키워드: crash, impact, hit

4. **checkpoint.mp3**
   - 용도: 체크포인트 통과 시
   - 키워드: success, ding, notification

5. **result-fanfare.mp3**
   - 용도: 결과 화면 팡파레
   - 키워드: victory, fanfare, success

---

## 🌐 추천 무료 오디오 소스 (CC0 라이선스)

### 1. Pixabay (가장 추천)
- **음악**: https://pixabay.com/music/
- **효과음**: https://pixabay.com/sound-effects/
- **라이선스**: CC0 (저작자 표시 불필요)
- **포맷**: MP3 다운로드 가능

### 2. Freesound.org
- **URL**: https://freesound.org/browse/tags/CC0/
- **라이선스**: CC0 필터 사용
- **포맷**: WAV, MP3, OGG

### 3. OpenGameArt.org
- **URL**: https://opengameart.org/art-search-advanced?keys=&field_art_type_tid%5B%5D=13
- **라이선스**: CC0, CC-BY
- **특징**: 게임 전용 오디오

### 4. Kenney.nl
- **URL**: https://kenney.nl/assets?q=audio
- **라이선스**: CC0
- **특징**: 게임 에셋 전문

---

## 📥 다운로드 및 설치 방법

### 방법 1: 수동 다운로드 (권장)

1. 위 추천 소스에서 원하는 오디오 파일 검색
2. MP3 형식으로 다운로드
3. 아래 위치에 파일 배치:

```
public/assets/audio/
├── music/
│   ├── menu-bgm.mp3
│   └── gameplay-bgm.mp3
└── sfx/
    ├── engine-sound.mp3
    ├── wind-sound.mp3
    ├── collision.mp3
    ├── checkpoint.mp3
    └── result-fanfare.mp3
```

### 방법 2: 명령어로 다운로드 (URL이 있는 경우)

```bash
# 예시 (실제 URL로 교체 필요)
cd public/assets/audio/music
curl -o menu-bgm.mp3 "https://example.com/music.mp3"

cd ../sfx
curl -o collision.mp3 "https://example.com/crash.mp3"
```

---

## 🔧 Placeholder 파일 (임시 개발용)

현재 실제 오디오 파일이 없어도 개발을 진행할 수 있도록 Howler.js 코드에서 파일 로딩 에러를 처리합니다.

**Feature 4.5 (Sound System) 개발 시:**
- 파일이 없으면 에러 로그만 출력하고 계속 진행
- 오디오 재생 호출 시 silent하게 실패

**실제 배포 전 필수:**
- 모든 오디오 파일 확보 완료 확인
- 파일 크기 최적화 (각 파일 < 1MB 권장)
- 루프 가능 여부 확인

---

## 📋 체크리스트

### 배경 음악
- [ ] menu-bgm.mp3 (메인 메뉴)
- [ ] gameplay-bgm.mp3 (게임 플레이)

### 효과음
- [ ] engine-sound.mp3 (엔진)
- [ ] wind-sound.mp3 (바람)
- [ ] collision.mp3 (충돌)
- [ ] checkpoint.mp3 (체크포인트)
- [ ] result-fanfare.mp3 (결과)

---

## 💡 팁

**파일 크기 최적화:**
```bash
# MP3 비트레이트 낮추기 (ffmpeg 필요)
ffmpeg -i input.mp3 -b:a 128k output.mp3
```

**루프 확인:**
- Audacity 같은 도구로 시작/끝 확인
- 자연스러운 루프를 위해 페이드 인/아웃 조정

**포맷 변환:**
```bash
# WAV를 MP3로 변환
ffmpeg -i input.wav -codec:a libmp3lame -b:a 192k output.mp3
```

---

**작성일:** 2025-11-09
**문서 버전:** 1.0
**관련 문서:** `doc/Block4_UI_UX_Integration.md`
