import { AudioManager } from '../core/AudioManager';

export class SoundEffects {
  // Constants
  static readonly ENGINE_SOUND_KEY = 'engine-sound';
  static readonly WIND_SOUND_KEY = 'wind-sound';
  static readonly COLLISION_KEY = 'collision';
  static readonly CHECKPOINT_KEY = 'checkpoint';
  static readonly RESULT_FANFARE_KEY = 'result-fanfare';

  static readonly ENGINE_SOUND_PATH = '/assets/audio/sfx/engine-sound.ogg';
  static readonly WIND_SOUND_PATH = '/assets/audio/sfx/wind-sound.ogg';
  static readonly COLLISION_PATH = '/assets/audio/sfx/collision.ogg';
  static readonly CHECKPOINT_PATH = '/assets/audio/sfx/checkpoint.ogg';
  static readonly RESULT_FANFARE_PATH = '/assets/audio/sfx/result-fanfare.ogg';

  // All sound keys for batch operations
  private static readonly ALL_SOUND_KEYS = [
    SoundEffects.ENGINE_SOUND_KEY,
    SoundEffects.WIND_SOUND_KEY,
    SoundEffects.COLLISION_KEY,
    SoundEffects.CHECKPOINT_KEY,
    SoundEffects.RESULT_FANFARE_KEY,
  ];

  private audioManager: AudioManager;

  constructor() {
    this.audioManager = new AudioManager();
  }

  /**
   * 모든 효과음을 로드합니다.
   * @returns 모두 성공 시 true, 하나라도 실패 시 false
   */
  async loadAll(): Promise<boolean> {
    const results = await Promise.all([
      this.audioManager.loadSound(SoundEffects.ENGINE_SOUND_KEY, SoundEffects.ENGINE_SOUND_PATH),
      this.audioManager.loadSound(SoundEffects.WIND_SOUND_KEY, SoundEffects.WIND_SOUND_PATH),
      this.audioManager.loadSound(SoundEffects.COLLISION_KEY, SoundEffects.COLLISION_PATH),
      this.audioManager.loadSound(SoundEffects.CHECKPOINT_KEY, SoundEffects.CHECKPOINT_PATH),
      this.audioManager.loadSound(SoundEffects.RESULT_FANFARE_KEY, SoundEffects.RESULT_FANFARE_PATH),
    ]);

    return results.every((result) => result === true);
  }

  /**
   * 엔진 소리를 재생합니다.
   */
  playEngine(): void {
    this.audioManager.play(SoundEffects.ENGINE_SOUND_KEY);
  }

  /**
   * 바람 소리를 재생합니다.
   */
  playWind(): void {
    this.audioManager.play(SoundEffects.WIND_SOUND_KEY);
  }

  /**
   * 충돌 소리를 재생합니다.
   */
  playCollision(): void {
    this.audioManager.play(SoundEffects.COLLISION_KEY);
  }

  /**
   * 체크포인트 통과 소리를 재생합니다.
   */
  playCheckpoint(): void {
    this.audioManager.play(SoundEffects.CHECKPOINT_KEY);
  }

  /**
   * 결과 팡파레를 재생합니다.
   */
  playResultFanfare(): void {
    this.audioManager.play(SoundEffects.RESULT_FANFARE_KEY);
  }

  /**
   * 엔진 소리를 정지합니다.
   */
  stopEngine(): void {
    this.audioManager.stop(SoundEffects.ENGINE_SOUND_KEY);
  }

  /**
   * 바람 소리를 정지합니다.
   */
  stopWind(): void {
    this.audioManager.stop(SoundEffects.WIND_SOUND_KEY);
  }

  /**
   * 모든 효과음을 정지합니다.
   */
  stopAll(): void {
    SoundEffects.ALL_SOUND_KEYS.forEach((key) => {
      this.audioManager.stop(key);
    });
  }

  /**
   * 모든 효과음의 볼륨을 설정합니다.
   * @param volume 볼륨 (0-1)
   */
  setVolume(volume: number): void {
    SoundEffects.ALL_SOUND_KEYS.forEach((key) => {
      this.audioManager.setVolume(key, volume);
    });
  }

  /**
   * 리소스를 정리합니다.
   */
  dispose(): void {
    this.audioManager.dispose();
  }
}
