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
import { AudioManager } from '../core/AudioManager';
export class SoundEffects {
  // Constants
  static readonly ENGINE_SOUND_KEY = stryMutAct_9fa48("2126") ? "" : (stryCov_9fa48("2126"), 'engine-sound');
  static readonly WIND_SOUND_KEY = stryMutAct_9fa48("2127") ? "" : (stryCov_9fa48("2127"), 'wind-sound');
  static readonly COLLISION_KEY = stryMutAct_9fa48("2128") ? "" : (stryCov_9fa48("2128"), 'collision');
  static readonly CHECKPOINT_KEY = stryMutAct_9fa48("2129") ? "" : (stryCov_9fa48("2129"), 'checkpoint');
  static readonly RESULT_FANFARE_KEY = stryMutAct_9fa48("2130") ? "" : (stryCov_9fa48("2130"), 'result-fanfare');
  static readonly ENGINE_SOUND_PATH = stryMutAct_9fa48("2131") ? "" : (stryCov_9fa48("2131"), '/assets/audio/sfx/engine-sound.ogg');
  static readonly WIND_SOUND_PATH = stryMutAct_9fa48("2132") ? "" : (stryCov_9fa48("2132"), '/assets/audio/sfx/wind-sound.ogg');
  static readonly COLLISION_PATH = stryMutAct_9fa48("2133") ? "" : (stryCov_9fa48("2133"), '/assets/audio/sfx/collision.ogg');
  static readonly CHECKPOINT_PATH = stryMutAct_9fa48("2134") ? "" : (stryCov_9fa48("2134"), '/assets/audio/sfx/checkpoint.ogg');
  static readonly RESULT_FANFARE_PATH = stryMutAct_9fa48("2135") ? "" : (stryCov_9fa48("2135"), '/assets/audio/sfx/result-fanfare.ogg');

  // All sound keys for batch operations
  private static readonly ALL_SOUND_KEYS = stryMutAct_9fa48("2136") ? [] : (stryCov_9fa48("2136"), [SoundEffects.ENGINE_SOUND_KEY, SoundEffects.WIND_SOUND_KEY, SoundEffects.COLLISION_KEY, SoundEffects.CHECKPOINT_KEY, SoundEffects.RESULT_FANFARE_KEY]);
  private audioManager: AudioManager;
  constructor() {
    if (stryMutAct_9fa48("2137")) {
      {}
    } else {
      stryCov_9fa48("2137");
      this.audioManager = new AudioManager();
    }
  }

  /**
   * 모든 효과음을 로드합니다.
   * @returns 모두 성공 시 true, 하나라도 실패 시 false
   */
  async loadAll(): Promise<boolean> {
    if (stryMutAct_9fa48("2138")) {
      {}
    } else {
      stryCov_9fa48("2138");
      const results = await Promise.all(stryMutAct_9fa48("2139") ? [] : (stryCov_9fa48("2139"), [this.audioManager.loadSound(SoundEffects.ENGINE_SOUND_KEY, SoundEffects.ENGINE_SOUND_PATH), this.audioManager.loadSound(SoundEffects.WIND_SOUND_KEY, SoundEffects.WIND_SOUND_PATH), this.audioManager.loadSound(SoundEffects.COLLISION_KEY, SoundEffects.COLLISION_PATH), this.audioManager.loadSound(SoundEffects.CHECKPOINT_KEY, SoundEffects.CHECKPOINT_PATH), this.audioManager.loadSound(SoundEffects.RESULT_FANFARE_KEY, SoundEffects.RESULT_FANFARE_PATH)]));
      return stryMutAct_9fa48("2140") ? results.some(result => result === true) : (stryCov_9fa48("2140"), results.every(stryMutAct_9fa48("2141") ? () => undefined : (stryCov_9fa48("2141"), result => stryMutAct_9fa48("2144") ? result !== true : stryMutAct_9fa48("2143") ? false : stryMutAct_9fa48("2142") ? true : (stryCov_9fa48("2142", "2143", "2144"), result === (stryMutAct_9fa48("2145") ? false : (stryCov_9fa48("2145"), true))))));
    }
  }

  /**
   * 엔진 소리를 재생합니다.
   */
  playEngine(): void {
    if (stryMutAct_9fa48("2146")) {
      {}
    } else {
      stryCov_9fa48("2146");
      this.audioManager.play(SoundEffects.ENGINE_SOUND_KEY);
    }
  }

  /**
   * 바람 소리를 재생합니다.
   */
  playWind(): void {
    if (stryMutAct_9fa48("2147")) {
      {}
    } else {
      stryCov_9fa48("2147");
      this.audioManager.play(SoundEffects.WIND_SOUND_KEY);
    }
  }

  /**
   * 충돌 소리를 재생합니다.
   */
  playCollision(): void {
    if (stryMutAct_9fa48("2148")) {
      {}
    } else {
      stryCov_9fa48("2148");
      this.audioManager.play(SoundEffects.COLLISION_KEY);
    }
  }

  /**
   * 체크포인트 통과 소리를 재생합니다.
   */
  playCheckpoint(): void {
    if (stryMutAct_9fa48("2149")) {
      {}
    } else {
      stryCov_9fa48("2149");
      this.audioManager.play(SoundEffects.CHECKPOINT_KEY);
    }
  }

  /**
   * 결과 팡파레를 재생합니다.
   */
  playResultFanfare(): void {
    if (stryMutAct_9fa48("2150")) {
      {}
    } else {
      stryCov_9fa48("2150");
      this.audioManager.play(SoundEffects.RESULT_FANFARE_KEY);
    }
  }

  /**
   * 엔진 소리를 정지합니다.
   */
  stopEngine(): void {
    if (stryMutAct_9fa48("2151")) {
      {}
    } else {
      stryCov_9fa48("2151");
      this.audioManager.stop(SoundEffects.ENGINE_SOUND_KEY);
    }
  }

  /**
   * 바람 소리를 정지합니다.
   */
  stopWind(): void {
    if (stryMutAct_9fa48("2152")) {
      {}
    } else {
      stryCov_9fa48("2152");
      this.audioManager.stop(SoundEffects.WIND_SOUND_KEY);
    }
  }

  /**
   * 모든 효과음을 정지합니다.
   */
  stopAll(): void {
    if (stryMutAct_9fa48("2153")) {
      {}
    } else {
      stryCov_9fa48("2153");
      SoundEffects.ALL_SOUND_KEYS.forEach(key => {
        if (stryMutAct_9fa48("2154")) {
          {}
        } else {
          stryCov_9fa48("2154");
          this.audioManager.stop(key);
        }
      });
    }
  }

  /**
   * 모든 효과음의 볼륨을 설정합니다.
   * @param volume 볼륨 (0-1)
   */
  setVolume(volume: number): void {
    if (stryMutAct_9fa48("2155")) {
      {}
    } else {
      stryCov_9fa48("2155");
      SoundEffects.ALL_SOUND_KEYS.forEach(key => {
        if (stryMutAct_9fa48("2156")) {
          {}
        } else {
          stryCov_9fa48("2156");
          this.audioManager.setVolume(key, volume);
        }
      });
    }
  }

  /**
   * 리소스를 정리합니다.
   */
  dispose(): void {
    if (stryMutAct_9fa48("2157")) {
      {}
    } else {
      stryCov_9fa48("2157");
      this.audioManager.dispose();
    }
  }
}