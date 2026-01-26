// @ts-nocheck
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useVolumeStore } from './volumeStore';

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

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

describe('Task 4.5.4: Volume Control Integration', () => {
  beforeEach(() => {
    // Reset store
    useVolumeStore.setState({
      masterVolume: 1,
      musicVolume: 1,
      sfxVolume: 1,
    });
    localStorageMock.clear();
  });

  describe('Initial State', () => {
    it('masterVolume 초기값이 1이어야 함', () => {
      const { masterVolume } = useVolumeStore.getState();
      expect(masterVolume).toBe(1);
    });

    it('musicVolume 초기값이 1이어야 함', () => {
      const { musicVolume } = useVolumeStore.getState();
      expect(musicVolume).toBe(1);
    });

    it('sfxVolume 초기값이 1이어야 함', () => {
      const { sfxVolume } = useVolumeStore.getState();
      expect(sfxVolume).toBe(1);
    });
  });

  describe('Master Volume', () => {
    it('setMasterVolume()으로 마스터 볼륨을 설정할 수 있어야 함', () => {
      const { setMasterVolume } = useVolumeStore.getState();
      setMasterVolume(0.5);
      expect(useVolumeStore.getState().masterVolume).toBe(0.5);
    });

    it('setMasterVolume()이 0-1 범위를 클램핑해야 함 (최대)', () => {
      const { setMasterVolume } = useVolumeStore.getState();
      setMasterVolume(1.5);
      expect(useVolumeStore.getState().masterVolume).toBe(1);
    });

    it('setMasterVolume()이 0-1 범위를 클램핑해야 함 (최소)', () => {
      const { setMasterVolume } = useVolumeStore.getState();
      setMasterVolume(-0.5);
      expect(useVolumeStore.getState().masterVolume).toBe(0);
    });

    it('setMasterVolume()이 LocalStorage에 저장해야 함', () => {
      const { setMasterVolume } = useVolumeStore.getState();
      setMasterVolume(0.8);
      expect(localStorage.getItem('masterVolume')).toBe('0.8');
    });
  });

  describe('Music Volume', () => {
    it('setMusicVolume()으로 음악 볼륨을 설정할 수 있어야 함', () => {
      const { setMusicVolume } = useVolumeStore.getState();
      setMusicVolume(0.6);
      expect(useVolumeStore.getState().musicVolume).toBe(0.6);
    });

    it('setMusicVolume()이 0-1 범위를 클램핑해야 함 (최대)', () => {
      const { setMusicVolume } = useVolumeStore.getState();
      setMusicVolume(2.0);
      expect(useVolumeStore.getState().musicVolume).toBe(1);
    });

    it('setMusicVolume()이 0-1 범위를 클램핑해야 함 (최소)', () => {
      const { setMusicVolume } = useVolumeStore.getState();
      setMusicVolume(-1.0);
      expect(useVolumeStore.getState().musicVolume).toBe(0);
    });

    it('setMusicVolume()이 LocalStorage에 저장해야 함', () => {
      const { setMusicVolume } = useVolumeStore.getState();
      setMusicVolume(0.7);
      expect(localStorage.getItem('musicVolume')).toBe('0.7');
    });
  });

  describe('SFX Volume', () => {
    it('setSfxVolume()으로 효과음 볼륨을 설정할 수 있어야 함', () => {
      const { setSfxVolume } = useVolumeStore.getState();
      setSfxVolume(0.4);
      expect(useVolumeStore.getState().sfxVolume).toBe(0.4);
    });

    it('setSfxVolume()이 0-1 범위를 클램핑해야 함 (최대)', () => {
      const { setSfxVolume } = useVolumeStore.getState();
      setSfxVolume(1.8);
      expect(useVolumeStore.getState().sfxVolume).toBe(1);
    });

    it('setSfxVolume()이 0-1 범위를 클램핑해야 함 (최소)', () => {
      const { setSfxVolume } = useVolumeStore.getState();
      setSfxVolume(-0.3);
      expect(useVolumeStore.getState().sfxVolume).toBe(0);
    });

    it('setSfxVolume()이 LocalStorage에 저장해야 함', () => {
      const { setSfxVolume } = useVolumeStore.getState();
      setSfxVolume(0.9);
      expect(localStorage.getItem('sfxVolume')).toBe('0.9');
    });
  });

  describe('LocalStorage Integration', () => {
    it('loadFromLocalStorage()로 저장된 볼륨을 복원할 수 있어야 함', () => {
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

    it('loadFromLocalStorage()가 저장된 값이 없으면 기본값을 유지해야 함', () => {
      const { loadFromLocalStorage } = useVolumeStore.getState();
      loadFromLocalStorage();

      const state = useVolumeStore.getState();
      expect(state.masterVolume).toBe(1);
      expect(state.musicVolume).toBe(1);
      expect(state.sfxVolume).toBe(1);
    });

    it('loadFromLocalStorage()가 잘못된 값을 무시하고 기본값을 유지해야 함', () => {
      localStorage.setItem('masterVolume', 'invalid');
      localStorage.setItem('musicVolume', 'NaN');
      localStorage.setItem('sfxVolume', '');

      const { loadFromLocalStorage } = useVolumeStore.getState();
      loadFromLocalStorage();

      const state = useVolumeStore.getState();
      expect(state.masterVolume).toBe(1);
      expect(state.musicVolume).toBe(1);
      expect(state.sfxVolume).toBe(1);
    });
  });

  describe('Constants', () => {
    it('DEFAULT_VOLUME이 1이어야 함', () => {
      expect(useVolumeStore.getState().masterVolume).toBe(1);
    });

    it('MIN_VOLUME이 0이어야 함', () => {
      const { setMasterVolume } = useVolumeStore.getState();
      setMasterVolume(-1);
      expect(useVolumeStore.getState().masterVolume).toBe(0);
    });

    it('MAX_VOLUME이 1이어야 함', () => {
      const { setMasterVolume } = useVolumeStore.getState();
      setMasterVolume(2);
      expect(useVolumeStore.getState().masterVolume).toBe(1);
    });
  });
});
