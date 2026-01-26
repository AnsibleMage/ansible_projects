import { AudioManager } from '../core/AudioManager';

export class BackgroundMusic {
  // Constants
  static readonly MENU_BGM_KEY = 'menu-bgm';
  static readonly GAMEPLAY_BGM_KEY = 'gameplay-bgm';
  static readonly MENU_BGM_PATH = '/assets/audio/music/menu-bgm.ogg';
  static readonly GAMEPLAY_BGM_PATH = '/assets/audio/music/gameplay-bgm.ogg';
  static readonly LOOP_ENABLED = true;

  private audioManager: AudioManager;
  private currentTrack: string | null = null;

  constructor() {
    this.audioManager = new AudioManager();
  }

  /**
   * 모든 배경 음악을 로드합니다.
   * @returns 모두 성공 시 true, 하나라도 실패 시 false
   */
  async loadAll(): Promise<boolean> {
    const results = await Promise.all([
      this.audioManager.loadSound(BackgroundMusic.MENU_BGM_KEY, BackgroundMusic.MENU_BGM_PATH),
      this.audioManager.loadSound(BackgroundMusic.GAMEPLAY_BGM_KEY, BackgroundMusic.GAMEPLAY_BGM_PATH),
    ]);

    return results.every((result) => result === true);
  }

  /**
   * 메뉴 배경 음악을 재생합니다.
   */
  playMenu(): void {
    this.stopCurrent();
    this.audioManager.setLoop(BackgroundMusic.MENU_BGM_KEY, BackgroundMusic.LOOP_ENABLED);
    this.audioManager.play(BackgroundMusic.MENU_BGM_KEY);
    this.currentTrack = BackgroundMusic.MENU_BGM_KEY;
  }

  /**
   * 게임플레이 배경 음악을 재생합니다.
   */
  playGameplay(): void {
    this.stopCurrent();
    this.audioManager.setLoop(BackgroundMusic.GAMEPLAY_BGM_KEY, BackgroundMusic.LOOP_ENABLED);
    this.audioManager.play(BackgroundMusic.GAMEPLAY_BGM_KEY);
    this.currentTrack = BackgroundMusic.GAMEPLAY_BGM_KEY;
  }

  /**
   * 현재 재생 중인 음악을 정지합니다.
   */
  private stopCurrent(): void {
    if (this.currentTrack) {
      this.audioManager.stop(this.currentTrack);
    }
  }

  /**
   * 모든 배경 음악을 정지합니다.
   */
  stopAll(): void {
    this.audioManager.stop(BackgroundMusic.MENU_BGM_KEY);
    this.audioManager.stop(BackgroundMusic.GAMEPLAY_BGM_KEY);
    this.currentTrack = null;
  }

  /**
   * 배경 음악의 볼륨을 설정합니다.
   * @param volume 볼륨 (0-1)
   */
  setVolume(volume: number): void {
    this.audioManager.setVolume(BackgroundMusic.MENU_BGM_KEY, volume);
    this.audioManager.setVolume(BackgroundMusic.GAMEPLAY_BGM_KEY, volume);
  }

  /**
   * 현재 재생 중인 트랙을 반환합니다.
   */
  getCurrentTrack(): string | null {
    return this.currentTrack;
  }

  /**
   * 리소스를 정리합니다.
   */
  dispose(): void {
    this.audioManager.dispose();
  }
}
