// @ts-nocheck
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Howl } from 'howler';
import { AudioManager } from './AudioManager';

// Mock Howler
const mockHowlInstance = {
  play: vi.fn(),
  pause: vi.fn(),
  stop: vi.fn(),
  volume: vi.fn(),
  loop: vi.fn(),
  on: vi.fn((event: string, callback: () => void) => {
    if (event === 'load') {
      setTimeout(callback, 0);
    }
  }),
  unload: vi.fn(),
};

vi.mock('howler', () => ({
  Howl: vi.fn(function (this: any) {
    Object.assign(this, mockHowlInstance);
    return this;
  }) as any,
}));

describe('Task 4.5.1: Audio Manager', () => {
  let audioManager: AudioManager;

  beforeEach(() => {
    vi.clearAllMocks();
    mockHowlInstance.play.mockClear();
    mockHowlInstance.pause.mockClear();
    mockHowlInstance.stop.mockClear();
    mockHowlInstance.volume.mockClear();
    mockHowlInstance.loop.mockClear();
    mockHowlInstance.on.mockClear();
    mockHowlInstance.unload.mockClear();
    audioManager = new AudioManager();
  });

  afterEach(() => {
    audioManager.dispose();
  });

  describe('Audio Loading', () => {
    it('AudioManager 인스턴스가 생성되어야 함', () => {
      expect(audioManager).toBeDefined();
      expect(audioManager).toBeInstanceOf(AudioManager);
    });

    it('loadSound()로 오디오 파일을 로드할 수 있어야 함', async () => {
      const result = await audioManager.loadSound('test-sound', '/audio/test.ogg');
      expect(result).toBe(true);
      expect(Howl).toHaveBeenCalledWith(
        expect.objectContaining({
          src: ['/audio/test.ogg'],
        })
      );
    });

    it('loadSound()가 여러 오디오 파일을 로드할 수 있어야 함', async () => {
      await audioManager.loadSound('sound1', '/audio/sound1.ogg');
      await audioManager.loadSound('sound2', '/audio/sound2.ogg');
      expect(Howl).toHaveBeenCalledTimes(2);
    });

    it('loadSound()가 실패 시 false를 반환해야 함', async () => {
      const mockHowl = vi.fn().mockImplementation(() => {
        throw new Error('Load failed');
      });
      vi.mocked(Howl).mockImplementationOnce(mockHowl as any);

      const result = await audioManager.loadSound('error-sound', '/audio/error.ogg');
      expect(result).toBe(false);
    });

    it('isLoaded()로 오디오 로드 상태를 확인할 수 있어야 함', async () => {
      expect(audioManager.isLoaded('test-sound')).toBe(false);
      await audioManager.loadSound('test-sound', '/audio/test.ogg');
      expect(audioManager.isLoaded('test-sound')).toBe(true);
    });
  });

  describe('Audio Playback', () => {
    beforeEach(async () => {
      await audioManager.loadSound('test-sound', '/audio/test.ogg');
    });

    it('play()로 오디오를 재생할 수 있어야 함', () => {
      audioManager.play('test-sound');
      expect(mockHowlInstance.play).toHaveBeenCalled();
    });

    it('play()가 로드되지 않은 사운드에 대해 경고 로그를 출력해야 함', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      audioManager.play('non-existent');
      expect(consoleSpy).toHaveBeenCalledWith('Sound not loaded: non-existent');
      consoleSpy.mockRestore();
    });

    it('pause()로 오디오를 일시정지할 수 있어야 함', () => {
      audioManager.pause('test-sound');
      expect(mockHowlInstance.pause).toHaveBeenCalled();
    });

    it('stop()으로 오디오를 정지할 수 있어야 함', () => {
      audioManager.stop('test-sound');
      expect(mockHowlInstance.stop).toHaveBeenCalled();
    });

    it('stopAll()로 모든 오디오를 정지할 수 있어야 함', async () => {
      await audioManager.loadSound('sound2', '/audio/sound2.ogg');
      audioManager.stopAll();
      expect(mockHowlInstance.stop).toHaveBeenCalled();
    });
  });

  describe('Volume Control', () => {
    beforeEach(async () => {
      await audioManager.loadSound('test-sound', '/audio/test.ogg');
    });

    it('setVolume()으로 특정 사운드의 볼륨을 설정할 수 있어야 함', () => {
      audioManager.setVolume('test-sound', 0.5);
      expect(mockHowlInstance.volume).toHaveBeenCalledWith(0.5);
    });

    it('setVolume()이 0-1 범위를 벗어난 값을 클램핑해야 함', () => {
      audioManager.setVolume('test-sound', 1.5);
      expect(mockHowlInstance.volume).toHaveBeenCalledWith(1);

      audioManager.setVolume('test-sound', -0.5);
      expect(mockHowlInstance.volume).toHaveBeenCalledWith(0);
    });

    it('setMasterVolume()으로 전체 볼륨을 설정할 수 있어야 함', () => {
      audioManager.setMasterVolume(0.8);
      expect(audioManager.getMasterVolume()).toBe(0.8);
    });

    it('getMasterVolume()이 기본값 1을 반환해야 함', () => {
      expect(audioManager.getMasterVolume()).toBe(1);
    });

    it('setMasterVolume()이 모든 사운드에 영향을 주어야 함', async () => {
      await audioManager.loadSound('sound2', '/audio/sound2.ogg');
      audioManager.setMasterVolume(0.5);

      // setMasterVolume이 모든 사운드에 volume 호출
      expect(mockHowlInstance.volume).toHaveBeenCalled();
    });
  });

  describe('Loop Control', () => {
    beforeEach(async () => {
      await audioManager.loadSound('test-sound', '/audio/test.ogg');
    });

    it('setLoop()으로 루프 설정을 변경할 수 있어야 함', () => {
      audioManager.setLoop('test-sound', true);
      expect(mockHowlInstance.loop).toHaveBeenCalledWith(true);
    });

    it('setLoop()이 false로 설정될 수 있어야 함', () => {
      audioManager.setLoop('test-sound', false);
      expect(mockHowlInstance.loop).toHaveBeenCalledWith(false);
    });
  });

  describe('Resource Management', () => {
    it('dispose()로 모든 리소스를 정리할 수 있어야 함', async () => {
      await audioManager.loadSound('sound1', '/audio/sound1.ogg');
      await audioManager.loadSound('sound2', '/audio/sound2.ogg');

      audioManager.dispose();

      expect(audioManager.isLoaded('sound1')).toBe(false);
      expect(audioManager.isLoaded('sound2')).toBe(false);
    });

    it('unload()로 특정 사운드를 언로드할 수 있어야 함', async () => {
      await audioManager.loadSound('test-sound', '/audio/test.ogg');
      expect(audioManager.isLoaded('test-sound')).toBe(true);

      audioManager.unload('test-sound');

      expect(audioManager.isLoaded('test-sound')).toBe(false);
    });
  });

  describe('Constants', () => {
    it('DEFAULT_VOLUME이 1이어야 함', () => {
      expect(AudioManager.DEFAULT_VOLUME).toBe(1);
    });

    it('MIN_VOLUME이 0이어야 함', () => {
      expect(AudioManager.MIN_VOLUME).toBe(0);
    });

    it('MAX_VOLUME이 1이어야 함', () => {
      expect(AudioManager.MAX_VOLUME).toBe(1);
    });

    it('PRELOAD가 true여야 함', () => {
      expect(AudioManager.PRELOAD).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('setVolume()이 존재하지 않는 사운드에 대해 아무 동작도 하지 않아야 함', () => {
      audioManager.setVolume('non-existent', 0.5);
      // Should not throw error
      expect(mockHowlInstance.volume).not.toHaveBeenCalled();
    });

    it('dispose() 호출 시 모든 사운드의 unload()가 호출되어야 함', async () => {
      await audioManager.loadSound('sound1', '/audio/sound1.ogg');
      await audioManager.loadSound('sound2', '/audio/sound2.ogg');

      audioManager.dispose();

      expect(mockHowlInstance.unload).toHaveBeenCalled();
    });
  });
});
