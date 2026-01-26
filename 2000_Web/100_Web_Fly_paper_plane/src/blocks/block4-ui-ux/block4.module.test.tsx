/**
 * Block 4: UI/UX System Module Test
 *
 * Feature 4.4 (3D Environment) + Feature 4.5 (Sound System) 통합 테스트
 *
 * Note: 3D Scene 렌더링은 E2E에서 검증하고, Module Test는 Audio System 통합에 집중
 *
 * 테스트 시나리오:
 * 1. 독립성 검증: Audio System 초기화
 * 2. 게임 시작: 메뉴 BGM → 게임플레이 BGM 전환
 * 3. 게임 플레이: 체크포인트/엔진/바람/충돌 효과음
 * 4. 결과 화면: 팡파레 재생
 * 5. 볼륨 제어: VolumeStore와 Audio System 연동
 * 6. 리소스 정리: dispose
 * 7. 전체 워크플로우: 메뉴 → 게임 → 결과
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AudioManager } from './features/f5-sound-system/core/AudioManager';
import { BackgroundMusic } from './features/f5-sound-system/music/BackgroundMusic';
import { SoundEffects } from './features/f5-sound-system/sfx/SoundEffects';
import { useVolumeStore } from './features/f5-sound-system/state/volumeStore';

// Mock Howler
const mockHowlInstance = {
  play: vi.fn(),
  pause: vi.fn(),
  stop: vi.fn(),
  volume: vi.fn(),
  loop: vi.fn(),
  on: vi.fn((event: string, callback: () => void) => {
    if (event === 'load') {
      setTimeout(callback, 0);
    }
  }),
  unload: vi.fn(),
};

vi.mock('howler', () => ({
  Howl: vi.fn(function (this: any) {
    Object.assign(this, mockHowlInstance);
    return this;
  }) as any,
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
});

describe('Block 4: UI/UX System Module Test', () => {
  let audioManager: AudioManager;
  let backgroundMusic: BackgroundMusic;
  let soundEffects: SoundEffects;

  beforeEach(() => {
    vi.clearAllMocks();
    mockHowlInstance.play.mockClear();
    mockHowlInstance.pause.mockClear();
    mockHowlInstance.stop.mockClear();
    mockHowlInstance.volume.mockClear();
    mockHowlInstance.loop.mockClear();
    mockHowlInstance.unload.mockClear();
    mockHowlInstance.on.mockClear().mockImplementation((event: string, callback: () => void) => {
      if (event === 'load') {
        setTimeout(callback, 0);
      }
    });

    localStorageMock.clear();
    useVolumeStore.setState({
      masterVolume: 1,
      musicVolume: 1,
      sfxVolume: 1,
    });

    audioManager = new AudioManager();
    backgroundMusic = new BackgroundMusic();
    soundEffects = new SoundEffects();
  });

  describe('Feature 4.4 + 4.5 독립성 검증', () => {
    it('Audio System이 독립적으로 초기화되어야 함', () => {
      // Audio System 초기화
      expect(audioManager).toBeInstanceOf(AudioManager);
      expect(backgroundMusic).toBeInstanceOf(BackgroundMusic);
      expect(soundEffects).toBeInstanceOf(SoundEffects);

      // VolumeStore 초기화
      const state = useVolumeStore.getState();
      expect(state.masterVolume).toBe(1);
      expect(state.musicVolume).toBe(1);
      expect(state.sfxVolume).toBe(1);
    });

    it('Audio System은 명시적 호출 전까지 작동하지 않아야 함', () => {
      // 초기화만으로는 음악 재생 안 됨
      expect(mockHowlInstance.play).not.toHaveBeenCalled();
      expect(mockHowlInstance.loop).not.toHaveBeenCalled();
    });
  });

  describe('게임 시작 시나리오', () => {
    it('메뉴 BGM을 로드하고 재생할 수 있어야 함', async () => {
      // 1. 배경음악 로드
      await backgroundMusic.loadAll();
      vi.clearAllMocks();

      // 2. 메뉴 BGM 재생
      backgroundMusic.playMenu();
      expect(mockHowlInstance.play).toHaveBeenCalled();
      expect(mockHowlInstance.loop).toHaveBeenCalledWith(true);
    });

    it('게임 시작 시 BGM이 메뉴에서 게임플레이로 전환되어야 함', async () => {
      await backgroundMusic.loadAll();
      vi.clearAllMocks();

      // 메뉴 BGM 재생
      backgroundMusic.playMenu();
      expect(mockHowlInstance.play).toHaveBeenCalledTimes(1);

      vi.clearAllMocks();

      // 게임 시작 → 게임플레이 BGM 전환
      backgroundMusic.playGameplay();
      expect(mockHowlInstance.stop).toHaveBeenCalledTimes(1); // 이전 음악 정지
      expect(mockHowlInstance.play).toHaveBeenCalledTimes(1); // 새 음악 재생
    });
  });

  describe('게임 플레이 시나리오', () => {
    it('체크포인트 통과 효과음을 재생할 수 있어야 함', async () => {
      // 1. 효과음 로드
      await soundEffects.loadAll();
      vi.clearAllMocks();

      // 2. 체크포인트 통과 효과음 재생
      soundEffects.playCheckpoint();
      expect(mockHowlInstance.play).toHaveBeenCalled();
    });

    it('비행 중 엔진 소리와 바람 소리를 동시 재생할 수 있어야 함', async () => {
      // 1. 효과음 로드
      await soundEffects.loadAll();
      vi.clearAllMocks();

      // 2. 엔진 + 바람 소리 동시 재생
      soundEffects.playEngine();
      soundEffects.playWind();
      expect(mockHowlInstance.play).toHaveBeenCalledTimes(2);
    });

    it('장애물 충돌 시 충돌 효과음을 재생할 수 있어야 함', async () => {
      // 1. 효과음 로드
      await soundEffects.loadAll();
      vi.clearAllMocks();

      // 2. 충돌 효과음 재생
      soundEffects.playCollision();
      expect(mockHowlInstance.play).toHaveBeenCalled();
    });
  });

  describe('결과 화면 시나리오', () => {
    it('결과 팡파레를 재생할 수 있어야 함', async () => {
      // 1. 효과음 로드
      await soundEffects.loadAll();
      vi.clearAllMocks();

      // 2. 결과 팡파레 재생
      soundEffects.playResultFanfare();
      expect(mockHowlInstance.play).toHaveBeenCalled();
    });

    it('결과 화면에서 모든 효과음을 정지하고 팡파레만 재생해야 함', async () => {
      await soundEffects.loadAll();
      vi.clearAllMocks();

      // 게임 중 효과음 재생
      soundEffects.playEngine();
      soundEffects.playWind();

      vi.clearAllMocks();

      // 결과 화면 진입 → 모든 효과음 정지
      soundEffects.stopAll();
      expect(mockHowlInstance.stop).toHaveBeenCalledTimes(5); // 모든 효과음 키 수

      vi.clearAllMocks();

      // 팡파레만 재생
      soundEffects.playResultFanfare();
      expect(mockHowlInstance.play).toHaveBeenCalledTimes(1);
    });
  });

  describe('볼륨 제어 통합', () => {
    it('VolumeStore에서 음악 볼륨 변경 시 BGM에 적용되어야 함', async () => {
      await backgroundMusic.loadAll();
      backgroundMusic.playMenu();

      vi.clearAllMocks();

      // 볼륨 변경
      const { setMusicVolume } = useVolumeStore.getState();
      setMusicVolume(0.5);

      // BackgroundMusic에 볼륨 적용 (실제 앱에서는 구독 패턴)
      backgroundMusic.setVolume(0.5);
      expect(mockHowlInstance.volume).toHaveBeenCalledWith(0.5);
    });

    it('VolumeStore에서 효과음 볼륨 변경 시 SFX에 적용되어야 함', async () => {
      await soundEffects.loadAll();

      vi.clearAllMocks();

      // 볼륨 변경
      const { setSfxVolume } = useVolumeStore.getState();
      setSfxVolume(0.7);

      // SoundEffects에 볼륨 적용
      soundEffects.setVolume(0.7);
      expect(mockHowlInstance.volume).toHaveBeenCalled();
    });

    it('볼륨 설정이 LocalStorage에 저장되고 복원되어야 함', () => {
      // 1. 볼륨 설정
      const { setMasterVolume, setMusicVolume, setSfxVolume } = useVolumeStore.getState();
      setMasterVolume(0.8);
      setMusicVolume(0.6);
      setSfxVolume(0.9);

      // 2. LocalStorage 저장 확인
      expect(localStorage.getItem('masterVolume')).toBe('0.8');
      expect(localStorage.getItem('musicVolume')).toBe('0.6');
      expect(localStorage.getItem('sfxVolume')).toBe('0.9');

      // 3. 스토어 초기화 (새로고침 시뮬레이션)
      useVolumeStore.setState({
        masterVolume: 1,
        musicVolume: 1,
        sfxVolume: 1,
      });

      // 4. 볼륨 복원 후 값 확인
      const { loadFromLocalStorage } = useVolumeStore.getState();
      loadFromLocalStorage();

      const state = useVolumeStore.getState();
      expect(state.masterVolume).toBe(0.8);
      expect(state.musicVolume).toBe(0.6);
      expect(state.sfxVolume).toBe(0.9);
    });
  });

  describe('리소스 정리 통합', () => {
    it('Audio dispose로 모든 리소스를 정리할 수 있어야 함', async () => {
      // 1. Audio 로드
      await backgroundMusic.loadAll();
      await soundEffects.loadAll();

      vi.clearAllMocks();

      // 2. Audio dispose
      backgroundMusic.dispose();
      soundEffects.dispose();

      expect(mockHowlInstance.unload).toHaveBeenCalled();
    });
  });

  describe('전체 워크플로우 통합', () => {
    it('메뉴 → 게임 → 결과 전체 흐름이 정상 작동해야 함', async () => {
      // 1. Audio 로드
      await backgroundMusic.loadAll();
      await soundEffects.loadAll();

      vi.clearAllMocks();

      // 2. 메뉴 BGM 재생
      backgroundMusic.playMenu();
      expect(mockHowlInstance.play).toHaveBeenCalled();
      expect(mockHowlInstance.loop).toHaveBeenCalledWith(true);

      // 3. 게임 시작 → BGM 전환
      vi.clearAllMocks();

      backgroundMusic.playGameplay();
      expect(mockHowlInstance.stop).toHaveBeenCalled(); // 메뉴 음악 정지
      expect(mockHowlInstance.play).toHaveBeenCalled(); // 게임 음악 재생

      // 4. 게임 플레이 → 효과음 재생
      vi.clearAllMocks();

      soundEffects.playEngine();
      soundEffects.playWind();
      expect(mockHowlInstance.play).toHaveBeenCalledTimes(2);

      // 5. 체크포인트 통과
      vi.clearAllMocks();

      soundEffects.playCheckpoint();
      expect(mockHowlInstance.play).toHaveBeenCalled();

      // 6. 결과 화면 → 팡파레
      vi.clearAllMocks();

      soundEffects.stopAll(); // 모든 효과음 정지
      soundEffects.playResultFanfare(); // 팡파레 재생

      expect(mockHowlInstance.stop).toHaveBeenCalled();
      expect(mockHowlInstance.play).toHaveBeenCalled();
    });
  });
});
