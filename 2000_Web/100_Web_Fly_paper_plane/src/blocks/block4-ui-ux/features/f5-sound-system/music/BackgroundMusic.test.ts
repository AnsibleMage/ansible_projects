import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BackgroundMusic } from './BackgroundMusic';
import { AudioManager } from '../core/AudioManager';

// Mock AudioManager instance
const mockAudioManagerInstance = {
  loadSound: vi.fn().mockResolvedValue(true),
  play: vi.fn(),
  stop: vi.fn(),
  setLoop: vi.fn(),
  setVolume: vi.fn(),
  isLoaded: vi.fn().mockReturnValue(true),
  dispose: vi.fn(),
};

// Mock AudioManager
vi.mock('../core/AudioManager', () => ({
  AudioManager: vi.fn(function (this: any) {
    Object.assign(this, mockAudioManagerInstance);
    return this;
  }) as any,
}));

describe('Task 4.5.2: Background Music', () => {
  let backgroundMusic: BackgroundMusic;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAudioManagerInstance.loadSound.mockClear().mockResolvedValue(true);
    mockAudioManagerInstance.play.mockClear();
    mockAudioManagerInstance.stop.mockClear();
    mockAudioManagerInstance.setLoop.mockClear();
    mockAudioManagerInstance.setVolume.mockClear();
    mockAudioManagerInstance.isLoaded.mockClear().mockReturnValue(true);
    mockAudioManagerInstance.dispose.mockClear();
    backgroundMusic = new BackgroundMusic();
  });

  describe('Initialization', () => {
    it('BackgroundMusic 인스턴스가 생성되어야 함', () => {
      expect(backgroundMusic).toBeDefined();
      expect(backgroundMusic).toBeInstanceOf(BackgroundMusic);
    });

    it('AudioManager 인스턴스를 생성해야 함', () => {
      expect(AudioManager).toHaveBeenCalled();
    });
  });

  describe('Loading', () => {
    it('loadAll()로 모든 배경 음악을 로드할 수 있어야 함', async () => {
      const result = await backgroundMusic.loadAll();
      expect(result).toBe(true);
      expect(mockAudioManagerInstance.loadSound).toHaveBeenCalledTimes(2);
    });

    it('loadAll()이 메뉴 음악을 로드해야 함', async () => {
      await backgroundMusic.loadAll();
      expect(mockAudioManagerInstance.loadSound).toHaveBeenCalledWith(
        'menu-bgm',
        '/assets/audio/music/menu-bgm.ogg'
      );
    });

    it('loadAll()이 게임플레이 음악을 로드해야 함', async () => {
      await backgroundMusic.loadAll();
      expect(mockAudioManagerInstance.loadSound).toHaveBeenCalledWith(
        'gameplay-bgm',
        '/assets/audio/music/gameplay-bgm.ogg'
      );
    });

    it('loadAll()이 하나라도 실패 시 false를 반환해야 함', async () => {
      mockAudioManagerInstance.loadSound.mockResolvedValueOnce(true).mockResolvedValueOnce(false);
      const result = await backgroundMusic.loadAll();
      expect(result).toBe(false);
    });
  });

  describe('Playback', () => {
    beforeEach(async () => {
      await backgroundMusic.loadAll();
      vi.clearAllMocks();
    });

    it('playMenu()로 메뉴 음악을 재생할 수 있어야 함', () => {
      backgroundMusic.playMenu();
      expect(mockAudioManagerInstance.play).toHaveBeenCalledWith('menu-bgm');
    });

    it('playMenu()가 루프를 true로 설정해야 함', () => {
      backgroundMusic.playMenu();
      expect(mockAudioManagerInstance.setLoop).toHaveBeenCalledWith('menu-bgm', true);
    });

    it('playGameplay()로 게임플레이 음악을 재생할 수 있어야 함', () => {
      backgroundMusic.playGameplay();
      expect(mockAudioManagerInstance.play).toHaveBeenCalledWith('gameplay-bgm');
    });

    it('playGameplay()가 루프를 true로 설정해야 함', () => {
      backgroundMusic.playGameplay();
      expect(mockAudioManagerInstance.setLoop).toHaveBeenCalledWith('gameplay-bgm', true);
    });

    it('playMenu()가 이전 음악을 정지해야 함', () => {
      backgroundMusic.playGameplay();
      mockAudioManagerInstance.stop.mockClear();
      backgroundMusic.playMenu();
      expect(mockAudioManagerInstance.stop).toHaveBeenCalledWith('gameplay-bgm');
    });

    it('playGameplay()가 이전 음악을 정지해야 함', () => {
      backgroundMusic.playMenu();
      mockAudioManagerInstance.stop.mockClear();
      backgroundMusic.playGameplay();
      expect(mockAudioManagerInstance.stop).toHaveBeenCalledWith('menu-bgm');
    });
  });

  describe('Control', () => {
    beforeEach(async () => {
      await backgroundMusic.loadAll();
      vi.clearAllMocks();
    });

    it('stopAll()로 모든 음악을 정지할 수 있어야 함', () => {
      backgroundMusic.playMenu();
      mockAudioManagerInstance.stop.mockClear();
      backgroundMusic.stopAll();
      expect(mockAudioManagerInstance.stop).toHaveBeenCalledWith('menu-bgm');
      expect(mockAudioManagerInstance.stop).toHaveBeenCalledWith('gameplay-bgm');
    });

    it('setVolume()으로 배경 음악 볼륨을 설정할 수 있어야 함', () => {
      backgroundMusic.setVolume(0.5);
      expect(mockAudioManagerInstance.setVolume).toHaveBeenCalledWith('menu-bgm', 0.5);
      expect(mockAudioManagerInstance.setVolume).toHaveBeenCalledWith('gameplay-bgm', 0.5);
    });

    it('getCurrentTrack()이 현재 재생 중인 트랙을 반환해야 함', () => {
      expect(backgroundMusic.getCurrentTrack()).toBeNull();
      backgroundMusic.playMenu();
      expect(backgroundMusic.getCurrentTrack()).toBe('menu-bgm');
      backgroundMusic.playGameplay();
      expect(backgroundMusic.getCurrentTrack()).toBe('gameplay-bgm');
    });

    it('stopAll() 후 getCurrentTrack()이 null을 반환해야 함', () => {
      backgroundMusic.playMenu();
      backgroundMusic.stopAll();
      expect(backgroundMusic.getCurrentTrack()).toBeNull();
    });
  });

  describe('Resource Management', () => {
    it('dispose()로 리소스를 정리할 수 있어야 함', () => {
      backgroundMusic.dispose();
      expect(mockAudioManagerInstance.dispose).toHaveBeenCalled();
    });
  });

  describe('Constants', () => {
    it('MENU_BGM_KEY가 "menu-bgm"이어야 함', () => {
      expect(BackgroundMusic.MENU_BGM_KEY).toBe('menu-bgm');
    });

    it('GAMEPLAY_BGM_KEY가 "gameplay-bgm"이어야 함', () => {
      expect(BackgroundMusic.GAMEPLAY_BGM_KEY).toBe('gameplay-bgm');
    });

    it('MENU_BGM_PATH가 올바른 경로여야 함', () => {
      expect(BackgroundMusic.MENU_BGM_PATH).toBe('/assets/audio/music/menu-bgm.ogg');
    });

    it('GAMEPLAY_BGM_PATH가 올바른 경로여야 함', () => {
      expect(BackgroundMusic.GAMEPLAY_BGM_PATH).toBe('/assets/audio/music/gameplay-bgm.ogg');
    });
  });
});
