import { create } from 'zustand';

// Constants
const DEFAULT_VOLUME = 1;
const MIN_VOLUME = 0;
const MAX_VOLUME = 1;

// LocalStorage keys
const MASTER_VOLUME_KEY = 'masterVolume';
const MUSIC_VOLUME_KEY = 'musicVolume';
const SFX_VOLUME_KEY = 'sfxVolume';

/**
 * 볼륨 값을 0-1 범위로 클램핑합니다.
 */
const clampVolume = (volume: number): number => {
  return Math.max(MIN_VOLUME, Math.min(MAX_VOLUME, volume));
};

/**
 * 볼륨 설정 상태 인터페이스
 */
interface VolumeState {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  setMasterVolume: (volume: number) => void;
  setMusicVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  loadFromLocalStorage: () => void;
}

/**
 * 볼륨 설정 Zustand 스토어
 *
 * LocalStorage에 자동으로 저장되며, 0-1 범위로 클램핑됩니다.
 */
export const useVolumeStore = create<VolumeState>((set) => ({
  masterVolume: DEFAULT_VOLUME,
  musicVolume: DEFAULT_VOLUME,
  sfxVolume: DEFAULT_VOLUME,

  /**
   * 마스터 볼륨을 설정합니다.
   * @param volume 볼륨 (0-1, 자동 클램핑)
   */
  setMasterVolume: (volume: number) => {
    const clamped = clampVolume(volume);
    localStorage.setItem(MASTER_VOLUME_KEY, String(clamped));
    set({ masterVolume: clamped });
  },

  /**
   * 음악 볼륨을 설정합니다.
   * @param volume 볼륨 (0-1, 자동 클램핑)
   */
  setMusicVolume: (volume: number) => {
    const clamped = clampVolume(volume);
    localStorage.setItem(MUSIC_VOLUME_KEY, String(clamped));
    set({ musicVolume: clamped });
  },

  /**
   * 효과음 볼륨을 설정합니다.
   * @param volume 볼륨 (0-1, 자동 클램핑)
   */
  setSfxVolume: (volume: number) => {
    const clamped = clampVolume(volume);
    localStorage.setItem(SFX_VOLUME_KEY, String(clamped));
    set({ sfxVolume: clamped });
  },

  /**
   * LocalStorage에서 저장된 볼륨 설정을 복원합니다.
   * 잘못된 값은 무시하고 기본값을 유지합니다.
   */
  loadFromLocalStorage: () => {
    const masterStr = localStorage.getItem(MASTER_VOLUME_KEY);
    const musicStr = localStorage.getItem(MUSIC_VOLUME_KEY);
    const sfxStr = localStorage.getItem(SFX_VOLUME_KEY);

    const master = parseFloat(masterStr || '');
    const music = parseFloat(musicStr || '');
    const sfx = parseFloat(sfxStr || '');

    set({
      masterVolume: isNaN(master) ? DEFAULT_VOLUME : master,
      musicVolume: isNaN(music) ? DEFAULT_VOLUME : music,
      sfxVolume: isNaN(sfx) ? DEFAULT_VOLUME : sfx,
    });
  },
}));
