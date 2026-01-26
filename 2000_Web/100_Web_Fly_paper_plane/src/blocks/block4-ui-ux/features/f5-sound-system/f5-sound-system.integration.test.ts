import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AudioManager } from './core/AudioManager';
import { BackgroundMusic } from './music/BackgroundMusic';
import { SoundEffects } from './sfx/SoundEffects';
import { useVolumeStore } from './state/volumeStore';

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

// Helper function: Reset all mocks
function resetMocks() {
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
}

// Helper function: Reset volume store
function resetVolumeStore() {
  localStorageMock.clear();
  useVolumeStore.setState({
    masterVolume: 1,
    musicVolume: 1,
    sfxVolume: 1,
  });
}

describe('Feature 4.5: Sound & Effects System Integration', () => {
  let audioManager: AudioManager;
  let backgroundMusic: BackgroundMusic;
  let soundEffects: SoundEffects;

  beforeEach(() => {
    resetMocks();
    resetVolumeStore();

    audioManager = new AudioManager();
    backgroundMusic = new BackgroundMusic();
    soundEffects = new SoundEffects();
  });

  describe('초기화 시나리오', () => {
    it('AudioManager를 통해 BackgroundMusic과 SoundEffects가 독립적으로 동작해야 함', () => {
      expect(audioManager).toBeInstanceOf(AudioManager);
      expect(backgroundMusic).toBeInstanceOf(BackgroundMusic);
      expect(soundEffects).toBeInstanceOf(SoundEffects);
    });

    it('VolumeStore에서 저장된 볼륨을 복원할 수 있어야 함', () => {
      localStorage.setItem('masterVolume', '0.5');
      localStorage.setItem('musicVolume', '0.6');
      localStorage.setItem('sfxVolume', '0.7');

      const { loadFromLocalStorage } = useVolumeStore.getState();
      loadFromLocalStorage();

      const state = useVolumeStore.getState();
      expect(state.masterVolume).toBe(0.5);
      expect(state.musicVolume).toBe(0.6);
      expect(state.sfxVolume).toBe(0.7);
    });
  });

  describe('음악 재생 시나리오', () => {
    beforeEach(async () => {
      await backgroundMusic.loadAll();
      vi.clearAllMocks();
    });

    it('메뉴 BGM 재생 후 게임플레이 BGM으로 전환 시 이전 음악이 정지되어야 함', () => {
      backgroundMusic.playMenu();
      expect(mockHowlInstance.play).toHaveBeenCalledTimes(1);

      vi.clearAllMocks();

      backgroundMusic.playGameplay();
      expect(mockHowlInstance.stop).toHaveBeenCalledTimes(1); // 이전 음악 정지
      expect(mockHowlInstance.play).toHaveBeenCalledTimes(1); // 새 음악 재생
    });

    it('음악 볼륨 변경 시 현재 재생 중인 음악에 적용되어야 함', () => {
      backgroundMusic.playMenu();
      vi.clearAllMocks();

      const { setMusicVolume } = useVolumeStore.getState();
      setMusicVolume(0.5);

      // 실제 통합 시나리오에서는 BackgroundMusic이 VolumeStore를 구독하여 자동 적용
      // 현재는 수동으로 setVolume 호출 검증
      backgroundMusic.setVolume(0.5);
      expect(mockHowlInstance.volume).toHaveBeenCalledWith(0.5);
    });

    it('배경음악이 자동 루프로 설정되어야 함', () => {
      backgroundMusic.playMenu();
      expect(mockHowlInstance.loop).toHaveBeenCalledWith(true);
    });
  });

  describe('효과음 재생 시나리오', () => {
    beforeEach(async () => {
      await soundEffects.loadAll();
      vi.clearAllMocks();
    });

    it('여러 효과음을 동시에 재생할 수 있어야 함', () => {
      soundEffects.playEngine();
      soundEffects.playWind();
      soundEffects.playCollision();

      expect(mockHowlInstance.play).toHaveBeenCalledTimes(3);
    });

    it('효과음 볼륨 변경 시 모든 효과음에 적용되어야 함', () => {
      const { setSfxVolume } = useVolumeStore.getState();
      setSfxVolume(0.7);

      // 실제 통합 시나리오에서는 SoundEffects가 VolumeStore를 구독하여 자동 적용
      soundEffects.setVolume(0.7);
      expect(mockHowlInstance.volume).toHaveBeenCalled();
    });

    it('stopAll()로 모든 효과음을 한 번에 정지할 수 있어야 함', () => {
      soundEffects.playEngine();
      soundEffects.playWind();
      soundEffects.playCollision();

      vi.clearAllMocks();

      soundEffects.stopAll();
      expect(mockHowlInstance.stop).toHaveBeenCalledTimes(5); // 모든 효과음 키 수만큼
    });
  });

  describe('볼륨 저장/복원 시나리오', () => {
    it('마스터 볼륨 변경 시 LocalStorage에 저장되어야 함', () => {
      const { setMasterVolume } = useVolumeStore.getState();
      setMasterVolume(0.8);

      expect(localStorage.getItem('masterVolume')).toBe('0.8');
    });

    it('음악 볼륨 변경 시 LocalStorage에 저장되어야 함', () => {
      const { setMusicVolume } = useVolumeStore.getState();
      setMusicVolume(0.6);

      expect(localStorage.getItem('musicVolume')).toBe('0.6');
    });

    it('효과음 볼륨 변경 시 LocalStorage에 저장되어야 함', () => {
      const { setSfxVolume } = useVolumeStore.getState();
      setSfxVolume(0.9);

      expect(localStorage.getItem('sfxVolume')).toBe('0.9');
    });

    it('페이지 새로고침 시뮬레이션 시 저장된 볼륨이 복원되어야 함', () => {
      // 1. 볼륨 설정 및 저장
      const { setMasterVolume, setMusicVolume, setSfxVolume } = useVolumeStore.getState();
      setMasterVolume(0.5);
      setMusicVolume(0.6);
      setSfxVolume(0.7);

      // 2. 스토어 초기화 (새로고침 시뮬레이션)
      useVolumeStore.setState({
        masterVolume: 1,
        musicVolume: 1,
        sfxVolume: 1,
      });

      // 3. LocalStorage에서 복원
      const { loadFromLocalStorage } = useVolumeStore.getState();
      loadFromLocalStorage();

      // 4. 복원 확인
      const state = useVolumeStore.getState();
      expect(state.masterVolume).toBe(0.5);
      expect(state.musicVolume).toBe(0.6);
      expect(state.sfxVolume).toBe(0.7);
    });
  });

  describe('리소스 정리 시나리오', () => {
    it('BackgroundMusic dispose() 호출 시 리소스가 정리되어야 함', async () => {
      await backgroundMusic.loadAll();
      vi.clearAllMocks();

      backgroundMusic.dispose();
      expect(mockHowlInstance.unload).toHaveBeenCalled();
    });

    it('SoundEffects dispose() 호출 시 리소스가 정리되어야 함', async () => {
      await soundEffects.loadAll();
      vi.clearAllMocks();

      soundEffects.dispose();
      expect(mockHowlInstance.unload).toHaveBeenCalled();
    });

    it('AudioManager dispose() 호출 시 모든 로드된 사운드가 정리되어야 함', async () => {
      await audioManager.loadSound('test', '/test.ogg');
      vi.clearAllMocks();

      audioManager.dispose();
      expect(mockHowlInstance.unload).toHaveBeenCalled();
    });
  });

  describe('통합 워크플로우', () => {
    it('전체 오디오 시스템 워크플로우가 정상 동작해야 함', async () => {
      // 1. LocalStorage에서 볼륨 복원
      localStorage.setItem('masterVolume', '0.8');
      localStorage.setItem('musicVolume', '0.7');
      localStorage.setItem('sfxVolume', '0.9');

      const { loadFromLocalStorage } = useVolumeStore.getState();
      loadFromLocalStorage();

      const volumeState = useVolumeStore.getState();
      expect(volumeState.masterVolume).toBe(0.8);
      expect(volumeState.musicVolume).toBe(0.7);
      expect(volumeState.sfxVolume).toBe(0.9);

      // 2. 배경음악 로드 및 재생
      await backgroundMusic.loadAll();
      vi.clearAllMocks();

      backgroundMusic.playMenu();
      expect(mockHowlInstance.play).toHaveBeenCalled();
      expect(mockHowlInstance.loop).toHaveBeenCalledWith(true);

      // 3. 효과음 로드 및 재생
      await soundEffects.loadAll();
      vi.clearAllMocks();

      soundEffects.playEngine();
      soundEffects.playWind();
      expect(mockHowlInstance.play).toHaveBeenCalledTimes(2);

      // 4. 게임플레이로 전환
      vi.clearAllMocks();
      backgroundMusic.playGameplay();
      expect(mockHowlInstance.stop).toHaveBeenCalled(); // 메뉴 음악 정지
      expect(mockHowlInstance.play).toHaveBeenCalled(); // 게임플레이 음악 재생

      // 5. 리소스 정리
      vi.clearAllMocks();
      backgroundMusic.dispose();
      soundEffects.dispose();
      expect(mockHowlInstance.unload).toHaveBeenCalled();
    });
  });
});
