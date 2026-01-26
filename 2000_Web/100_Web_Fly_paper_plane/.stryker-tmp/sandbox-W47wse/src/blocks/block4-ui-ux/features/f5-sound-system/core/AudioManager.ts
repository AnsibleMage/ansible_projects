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
import { Howl } from 'howler';
export class AudioManager {
  // Constants
  static readonly DEFAULT_VOLUME = 1;
  static readonly MIN_VOLUME = 0;
  static readonly MAX_VOLUME = 1;
  static readonly PRELOAD = stryMutAct_9fa48("2050") ? false : (stryCov_9fa48("2050"), true);
  private sounds: Map<string, Howl> = new Map();
  private masterVolume: number = AudioManager.DEFAULT_VOLUME;

  /**
   * 볼륨 값을 0-1 범위로 클램핑합니다.
   */
  private clampVolume(volume: number): number {
    if (stryMutAct_9fa48("2051")) {
      {}
    } else {
      stryCov_9fa48("2051");
      return stryMutAct_9fa48("2052") ? Math.min(AudioManager.MIN_VOLUME, Math.min(AudioManager.MAX_VOLUME, volume)) : (stryCov_9fa48("2052"), Math.max(AudioManager.MIN_VOLUME, stryMutAct_9fa48("2053") ? Math.max(AudioManager.MAX_VOLUME, volume) : (stryCov_9fa48("2053"), Math.min(AudioManager.MAX_VOLUME, volume))));
    }
  }

  /**
   * 오디오 파일을 로드합니다.
   * @param name 사운드 이름 (고유 식별자)
   * @param src 오디오 파일 경로
   * @returns 로드 성공 여부
   */
  async loadSound(name: string, src: string): Promise<boolean> {
    if (stryMutAct_9fa48("2054")) {
      {}
    } else {
      stryCov_9fa48("2054");
      try {
        if (stryMutAct_9fa48("2055")) {
          {}
        } else {
          stryCov_9fa48("2055");
          const howl = new Howl(stryMutAct_9fa48("2056") ? {} : (stryCov_9fa48("2056"), {
            src: stryMutAct_9fa48("2057") ? [] : (stryCov_9fa48("2057"), [src]),
            preload: AudioManager.PRELOAD
          }));
          return new Promise<boolean>(resolve => {
            if (stryMutAct_9fa48("2058")) {
              {}
            } else {
              stryCov_9fa48("2058");
              howl.on(stryMutAct_9fa48("2059") ? "" : (stryCov_9fa48("2059"), 'load'), () => {
                if (stryMutAct_9fa48("2060")) {
                  {}
                } else {
                  stryCov_9fa48("2060");
                  this.sounds.set(name, howl);
                  resolve(stryMutAct_9fa48("2061") ? false : (stryCov_9fa48("2061"), true));
                }
              });
              howl.on(stryMutAct_9fa48("2062") ? "" : (stryCov_9fa48("2062"), 'loaderror'), () => {
                if (stryMutAct_9fa48("2063")) {
                  {}
                } else {
                  stryCov_9fa48("2063");
                  resolve(stryMutAct_9fa48("2064") ? true : (stryCov_9fa48("2064"), false));
                }
              });
            }
          });
        }
      } catch (error) {
        if (stryMutAct_9fa48("2065")) {
          {}
        } else {
          stryCov_9fa48("2065");
          console.error(stryMutAct_9fa48("2066") ? `` : (stryCov_9fa48("2066"), `Failed to load sound: ${name}`), error);
          return stryMutAct_9fa48("2067") ? true : (stryCov_9fa48("2067"), false);
        }
      }
    }
  }

  /**
   * 사운드가 로드되었는지 확인합니다.
   */
  isLoaded(name: string): boolean {
    if (stryMutAct_9fa48("2068")) {
      {}
    } else {
      stryCov_9fa48("2068");
      return this.sounds.has(name);
    }
  }

  /**
   * 사운드를 재생합니다.
   */
  play(name: string): void {
    if (stryMutAct_9fa48("2069")) {
      {}
    } else {
      stryCov_9fa48("2069");
      const sound = this.sounds.get(name);
      if (stryMutAct_9fa48("2072") ? false : stryMutAct_9fa48("2071") ? true : stryMutAct_9fa48("2070") ? sound : (stryCov_9fa48("2070", "2071", "2072"), !sound)) {
        if (stryMutAct_9fa48("2073")) {
          {}
        } else {
          stryCov_9fa48("2073");
          console.warn(stryMutAct_9fa48("2074") ? `` : (stryCov_9fa48("2074"), `Sound not loaded: ${name}`));
          return;
        }
      }

      // Master volume 적용
      sound.volume(this.masterVolume);
      sound.play();
    }
  }

  /**
   * 사운드를 일시정지합니다.
   */
  pause(name: string): void {
    if (stryMutAct_9fa48("2075")) {
      {}
    } else {
      stryCov_9fa48("2075");
      const sound = this.sounds.get(name);
      if (stryMutAct_9fa48("2077") ? false : stryMutAct_9fa48("2076") ? true : (stryCov_9fa48("2076", "2077"), sound)) {
        if (stryMutAct_9fa48("2078")) {
          {}
        } else {
          stryCov_9fa48("2078");
          sound.pause();
        }
      }
    }
  }

  /**
   * 사운드를 정지합니다.
   */
  stop(name: string): void {
    if (stryMutAct_9fa48("2079")) {
      {}
    } else {
      stryCov_9fa48("2079");
      const sound = this.sounds.get(name);
      if (stryMutAct_9fa48("2081") ? false : stryMutAct_9fa48("2080") ? true : (stryCov_9fa48("2080", "2081"), sound)) {
        if (stryMutAct_9fa48("2082")) {
          {}
        } else {
          stryCov_9fa48("2082");
          sound.stop();
        }
      }
    }
  }

  /**
   * 모든 사운드를 정지합니다.
   */
  stopAll(): void {
    if (stryMutAct_9fa48("2083")) {
      {}
    } else {
      stryCov_9fa48("2083");
      this.sounds.forEach(sound => {
        if (stryMutAct_9fa48("2084")) {
          {}
        } else {
          stryCov_9fa48("2084");
          sound.stop();
        }
      });
    }
  }

  /**
   * 특정 사운드의 볼륨을 설정합니다.
   * @param name 사운드 이름
   * @param volume 볼륨 (0-1)
   */
  setVolume(name: string, volume: number): void {
    if (stryMutAct_9fa48("2085")) {
      {}
    } else {
      stryCov_9fa48("2085");
      const sound = this.sounds.get(name);
      if (stryMutAct_9fa48("2087") ? false : stryMutAct_9fa48("2086") ? true : (stryCov_9fa48("2086", "2087"), sound)) {
        if (stryMutAct_9fa48("2088")) {
          {}
        } else {
          stryCov_9fa48("2088");
          sound.volume(this.clampVolume(volume));
        }
      }
    }
  }

  /**
   * 마스터 볼륨을 설정합니다.
   */
  setMasterVolume(volume: number): void {
    if (stryMutAct_9fa48("2089")) {
      {}
    } else {
      stryCov_9fa48("2089");
      this.masterVolume = this.clampVolume(volume);

      // 모든 사운드에 적용
      this.sounds.forEach(sound => {
        if (stryMutAct_9fa48("2090")) {
          {}
        } else {
          stryCov_9fa48("2090");
          sound.volume(this.masterVolume);
        }
      });
    }
  }

  /**
   * 마스터 볼륨을 반환합니다.
   */
  getMasterVolume(): number {
    if (stryMutAct_9fa48("2091")) {
      {}
    } else {
      stryCov_9fa48("2091");
      return this.masterVolume;
    }
  }

  /**
   * 루프 설정을 변경합니다.
   */
  setLoop(name: string, loop: boolean): void {
    if (stryMutAct_9fa48("2092")) {
      {}
    } else {
      stryCov_9fa48("2092");
      const sound = this.sounds.get(name);
      if (stryMutAct_9fa48("2094") ? false : stryMutAct_9fa48("2093") ? true : (stryCov_9fa48("2093", "2094"), sound)) {
        if (stryMutAct_9fa48("2095")) {
          {}
        } else {
          stryCov_9fa48("2095");
          sound.loop(loop);
        }
      }
    }
  }

  /**
   * 특정 사운드를 언로드합니다.
   */
  unload(name: string): void {
    if (stryMutAct_9fa48("2096")) {
      {}
    } else {
      stryCov_9fa48("2096");
      const sound = this.sounds.get(name);
      if (stryMutAct_9fa48("2098") ? false : stryMutAct_9fa48("2097") ? true : (stryCov_9fa48("2097", "2098"), sound)) {
        if (stryMutAct_9fa48("2099")) {
          {}
        } else {
          stryCov_9fa48("2099");
          sound.unload();
          this.sounds.delete(name);
        }
      }
    }
  }

  /**
   * 모든 리소스를 정리합니다.
   */
  dispose(): void {
    if (stryMutAct_9fa48("2100")) {
      {}
    } else {
      stryCov_9fa48("2100");
      this.sounds.forEach(sound => {
        if (stryMutAct_9fa48("2101")) {
          {}
        } else {
          stryCov_9fa48("2101");
          sound.unload();
        }
      });
      this.sounds.clear();
    }
  }
}