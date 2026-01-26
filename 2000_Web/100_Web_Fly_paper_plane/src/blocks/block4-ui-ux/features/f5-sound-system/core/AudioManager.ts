import { Howl } from 'howler';

export class AudioManager {
  // Constants
  static readonly DEFAULT_VOLUME = 1;
  static readonly MIN_VOLUME = 0;
  static readonly MAX_VOLUME = 1;
  static readonly PRELOAD = true;

  private sounds: Map<string, Howl> = new Map();
  private masterVolume: number = AudioManager.DEFAULT_VOLUME;

  /**
   * 볼륨 값을 0-1 범위로 클램핑합니다.
   */
  private clampVolume(volume: number): number {
    return Math.max(
      AudioManager.MIN_VOLUME,
      Math.min(AudioManager.MAX_VOLUME, volume)
    );
  }

  /**
   * 오디오 파일을 로드합니다.
   * @param name 사운드 이름 (고유 식별자)
   * @param src 오디오 파일 경로
   * @returns 로드 성공 여부
   */
  async loadSound(name: string, src: string): Promise<boolean> {
    try {
      const howl = new Howl({
        src: [src],
        preload: AudioManager.PRELOAD,
      });

      return new Promise<boolean>((resolve) => {
        howl.on('load', () => {
          this.sounds.set(name, howl);
          resolve(true);
        });

        howl.on('loaderror', () => {
          resolve(false);
        });
      });
    } catch (error) {
      console.error(`Failed to load sound: ${name}`, error);
      return false;
    }
  }

  /**
   * 사운드가 로드되었는지 확인합니다.
   */
  isLoaded(name: string): boolean {
    return this.sounds.has(name);
  }

  /**
   * 사운드를 재생합니다.
   */
  play(name: string): void {
    const sound = this.sounds.get(name);
    if (!sound) {
      console.warn(`Sound not loaded: ${name}`);
      return;
    }

    // Master volume 적용
    sound.volume(this.masterVolume);
    sound.play();
  }

  /**
   * 사운드를 일시정지합니다.
   */
  pause(name: string): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.pause();
    }
  }

  /**
   * 사운드를 정지합니다.
   */
  stop(name: string): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.stop();
    }
  }

  /**
   * 모든 사운드를 정지합니다.
   */
  stopAll(): void {
    this.sounds.forEach((sound) => {
      sound.stop();
    });
  }

  /**
   * 특정 사운드의 볼륨을 설정합니다.
   * @param name 사운드 이름
   * @param volume 볼륨 (0-1)
   */
  setVolume(name: string, volume: number): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.volume(this.clampVolume(volume));
    }
  }

  /**
   * 마스터 볼륨을 설정합니다.
   */
  setMasterVolume(volume: number): void {
    this.masterVolume = this.clampVolume(volume);

    // 모든 사운드에 적용
    this.sounds.forEach((sound) => {
      sound.volume(this.masterVolume);
    });
  }

  /**
   * 마스터 볼륨을 반환합니다.
   */
  getMasterVolume(): number {
    return this.masterVolume;
  }

  /**
   * 루프 설정을 변경합니다.
   */
  setLoop(name: string, loop: boolean): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.loop(loop);
    }
  }

  /**
   * 특정 사운드를 언로드합니다.
   */
  unload(name: string): void {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.unload();
      this.sounds.delete(name);
    }
  }

  /**
   * 모든 리소스를 정리합니다.
   */
  dispose(): void {
    this.sounds.forEach((sound) => {
      sound.unload();
    });
    this.sounds.clear();
  }
}
