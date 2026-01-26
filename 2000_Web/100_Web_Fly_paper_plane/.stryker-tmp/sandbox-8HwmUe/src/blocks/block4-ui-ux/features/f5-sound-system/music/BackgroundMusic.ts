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
export class BackgroundMusic {
  // Constants
  static readonly MENU_BGM_KEY = stryMutAct_9fa48("2102") ? "" : (stryCov_9fa48("2102"), 'menu-bgm');
  static readonly GAMEPLAY_BGM_KEY = stryMutAct_9fa48("2103") ? "" : (stryCov_9fa48("2103"), 'gameplay-bgm');
  static readonly MENU_BGM_PATH = stryMutAct_9fa48("2104") ? "" : (stryCov_9fa48("2104"), '/assets/audio/music/menu-bgm.ogg');
  static readonly GAMEPLAY_BGM_PATH = stryMutAct_9fa48("2105") ? "" : (stryCov_9fa48("2105"), '/assets/audio/music/gameplay-bgm.ogg');
  static readonly LOOP_ENABLED = stryMutAct_9fa48("2106") ? false : (stryCov_9fa48("2106"), true);
  private audioManager: AudioManager;
  private currentTrack: string | null = null;
  constructor() {
    if (stryMutAct_9fa48("2107")) {
      {}
    } else {
      stryCov_9fa48("2107");
      this.audioManager = new AudioManager();
    }
  }

  /**
   * 모든 배경 음악을 로드합니다.
   * @returns 모두 성공 시 true, 하나라도 실패 시 false
   */
  async loadAll(): Promise<boolean> {
    if (stryMutAct_9fa48("2108")) {
      {}
    } else {
      stryCov_9fa48("2108");
      const results = await Promise.all(stryMutAct_9fa48("2109") ? [] : (stryCov_9fa48("2109"), [this.audioManager.loadSound(BackgroundMusic.MENU_BGM_KEY, BackgroundMusic.MENU_BGM_PATH), this.audioManager.loadSound(BackgroundMusic.GAMEPLAY_BGM_KEY, BackgroundMusic.GAMEPLAY_BGM_PATH)]));
      return stryMutAct_9fa48("2110") ? results.some(result => result === true) : (stryCov_9fa48("2110"), results.every(stryMutAct_9fa48("2111") ? () => undefined : (stryCov_9fa48("2111"), result => stryMutAct_9fa48("2114") ? result !== true : stryMutAct_9fa48("2113") ? false : stryMutAct_9fa48("2112") ? true : (stryCov_9fa48("2112", "2113", "2114"), result === (stryMutAct_9fa48("2115") ? false : (stryCov_9fa48("2115"), true))))));
    }
  }

  /**
   * 메뉴 배경 음악을 재생합니다.
   */
  playMenu(): void {
    if (stryMutAct_9fa48("2116")) {
      {}
    } else {
      stryCov_9fa48("2116");
      this.stopCurrent();
      this.audioManager.setLoop(BackgroundMusic.MENU_BGM_KEY, BackgroundMusic.LOOP_ENABLED);
      this.audioManager.play(BackgroundMusic.MENU_BGM_KEY);
      this.currentTrack = BackgroundMusic.MENU_BGM_KEY;
    }
  }

  /**
   * 게임플레이 배경 음악을 재생합니다.
   */
  playGameplay(): void {
    if (stryMutAct_9fa48("2117")) {
      {}
    } else {
      stryCov_9fa48("2117");
      this.stopCurrent();
      this.audioManager.setLoop(BackgroundMusic.GAMEPLAY_BGM_KEY, BackgroundMusic.LOOP_ENABLED);
      this.audioManager.play(BackgroundMusic.GAMEPLAY_BGM_KEY);
      this.currentTrack = BackgroundMusic.GAMEPLAY_BGM_KEY;
    }
  }

  /**
   * 현재 재생 중인 음악을 정지합니다.
   */
  private stopCurrent(): void {
    if (stryMutAct_9fa48("2118")) {
      {}
    } else {
      stryCov_9fa48("2118");
      if (stryMutAct_9fa48("2120") ? false : stryMutAct_9fa48("2119") ? true : (stryCov_9fa48("2119", "2120"), this.currentTrack)) {
        if (stryMutAct_9fa48("2121")) {
          {}
        } else {
          stryCov_9fa48("2121");
          this.audioManager.stop(this.currentTrack);
        }
      }
    }
  }

  /**
   * 모든 배경 음악을 정지합니다.
   */
  stopAll(): void {
    if (stryMutAct_9fa48("2122")) {
      {}
    } else {
      stryCov_9fa48("2122");
      this.audioManager.stop(BackgroundMusic.MENU_BGM_KEY);
      this.audioManager.stop(BackgroundMusic.GAMEPLAY_BGM_KEY);
      this.currentTrack = null;
    }
  }

  /**
   * 배경 음악의 볼륨을 설정합니다.
   * @param volume 볼륨 (0-1)
   */
  setVolume(volume: number): void {
    if (stryMutAct_9fa48("2123")) {
      {}
    } else {
      stryCov_9fa48("2123");
      this.audioManager.setVolume(BackgroundMusic.MENU_BGM_KEY, volume);
      this.audioManager.setVolume(BackgroundMusic.GAMEPLAY_BGM_KEY, volume);
    }
  }

  /**
   * 현재 재생 중인 트랙을 반환합니다.
   */
  getCurrentTrack(): string | null {
    if (stryMutAct_9fa48("2124")) {
      {}
    } else {
      stryCov_9fa48("2124");
      return this.currentTrack;
    }
  }

  /**
   * 리소스를 정리합니다.
   */
  dispose(): void {
    if (stryMutAct_9fa48("2125")) {
      {}
    } else {
      stryCov_9fa48("2125");
      this.audioManager.dispose();
    }
  }
}