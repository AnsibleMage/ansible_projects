// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { create } from 'zustand';

// Constants
const DEFAULT_VOLUME = 1;
const MIN_VOLUME = 0;
const MAX_VOLUME = 1;

// LocalStorage keys
const MASTER_VOLUME_KEY = stryMutAct_9fa48("2158") ? "" : (stryCov_9fa48("2158"), 'masterVolume');
const MUSIC_VOLUME_KEY = stryMutAct_9fa48("2159") ? "" : (stryCov_9fa48("2159"), 'musicVolume');
const SFX_VOLUME_KEY = stryMutAct_9fa48("2160") ? "" : (stryCov_9fa48("2160"), 'sfxVolume');

/**
 * 볼륨 값을 0-1 범위로 클램핑합니다.
 */
const clampVolume = (volume: number): number => {
  if (stryMutAct_9fa48("2161")) {
    {}
  } else {
    stryCov_9fa48("2161");
    return stryMutAct_9fa48("2162") ? Math.min(MIN_VOLUME, Math.min(MAX_VOLUME, volume)) : (stryCov_9fa48("2162"), Math.max(MIN_VOLUME, stryMutAct_9fa48("2163") ? Math.max(MAX_VOLUME, volume) : (stryCov_9fa48("2163"), Math.min(MAX_VOLUME, volume))));
  }
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
export const useVolumeStore = create<VolumeState>(stryMutAct_9fa48("2164") ? () => undefined : (stryCov_9fa48("2164"), set => stryMutAct_9fa48("2165") ? {} : (stryCov_9fa48("2165"), {
  masterVolume: DEFAULT_VOLUME,
  musicVolume: DEFAULT_VOLUME,
  sfxVolume: DEFAULT_VOLUME,
  /**
   * 마스터 볼륨을 설정합니다.
   * @param volume 볼륨 (0-1, 자동 클램핑)
   */
  setMasterVolume: (volume: number) => {
    if (stryMutAct_9fa48("2166")) {
      {}
    } else {
      stryCov_9fa48("2166");
      const clamped = clampVolume(volume);
      localStorage.setItem(MASTER_VOLUME_KEY, String(clamped));
      set(stryMutAct_9fa48("2167") ? {} : (stryCov_9fa48("2167"), {
        masterVolume: clamped
      }));
    }
  },
  /**
   * 음악 볼륨을 설정합니다.
   * @param volume 볼륨 (0-1, 자동 클램핑)
   */
  setMusicVolume: (volume: number) => {
    if (stryMutAct_9fa48("2168")) {
      {}
    } else {
      stryCov_9fa48("2168");
      const clamped = clampVolume(volume);
      localStorage.setItem(MUSIC_VOLUME_KEY, String(clamped));
      set(stryMutAct_9fa48("2169") ? {} : (stryCov_9fa48("2169"), {
        musicVolume: clamped
      }));
    }
  },
  /**
   * 효과음 볼륨을 설정합니다.
   * @param volume 볼륨 (0-1, 자동 클램핑)
   */
  setSfxVolume: (volume: number) => {
    if (stryMutAct_9fa48("2170")) {
      {}
    } else {
      stryCov_9fa48("2170");
      const clamped = clampVolume(volume);
      localStorage.setItem(SFX_VOLUME_KEY, String(clamped));
      set(stryMutAct_9fa48("2171") ? {} : (stryCov_9fa48("2171"), {
        sfxVolume: clamped
      }));
    }
  },
  /**
   * LocalStorage에서 저장된 볼륨 설정을 복원합니다.
   * 잘못된 값은 무시하고 기본값을 유지합니다.
   */
  loadFromLocalStorage: () => {
    if (stryMutAct_9fa48("2172")) {
      {}
    } else {
      stryCov_9fa48("2172");
      const masterStr = localStorage.getItem(MASTER_VOLUME_KEY);
      const musicStr = localStorage.getItem(MUSIC_VOLUME_KEY);
      const sfxStr = localStorage.getItem(SFX_VOLUME_KEY);
      const master = parseFloat(stryMutAct_9fa48("2175") ? masterStr && '' : stryMutAct_9fa48("2174") ? false : stryMutAct_9fa48("2173") ? true : (stryCov_9fa48("2173", "2174", "2175"), masterStr || (stryMutAct_9fa48("2176") ? "Stryker was here!" : (stryCov_9fa48("2176"), ''))));
      const music = parseFloat(stryMutAct_9fa48("2179") ? musicStr && '' : stryMutAct_9fa48("2178") ? false : stryMutAct_9fa48("2177") ? true : (stryCov_9fa48("2177", "2178", "2179"), musicStr || (stryMutAct_9fa48("2180") ? "Stryker was here!" : (stryCov_9fa48("2180"), ''))));
      const sfx = parseFloat(stryMutAct_9fa48("2183") ? sfxStr && '' : stryMutAct_9fa48("2182") ? false : stryMutAct_9fa48("2181") ? true : (stryCov_9fa48("2181", "2182", "2183"), sfxStr || (stryMutAct_9fa48("2184") ? "Stryker was here!" : (stryCov_9fa48("2184"), ''))));
      set(stryMutAct_9fa48("2185") ? {} : (stryCov_9fa48("2185"), {
        masterVolume: isNaN(master) ? DEFAULT_VOLUME : master,
        musicVolume: isNaN(music) ? DEFAULT_VOLUME : music,
        sfxVolume: isNaN(sfx) ? DEFAULT_VOLUME : sfx
      }));
    }
  }
})));