import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SoundEffects } from './SoundEffects';
import { AudioManager } from '../core/AudioManager';

// Mock AudioManager instance
const mockAudioManagerInstance = {
  loadSound: vi.fn().mockResolvedValue(true),
  play: vi.fn(),
  stop: vi.fn(),
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

describe('Task 4.5.3: Sound Effects', () => {
  let soundEffects: SoundEffects;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAudioManagerInstance.loadSound.mockClear().mockResolvedValue(true);
    mockAudioManagerInstance.play.mockClear();
    mockAudioManagerInstance.stop.mockClear();
    mockAudioManagerInstance.setVolume.mockClear();
    mockAudioManagerInstance.isLoaded.mockClear().mockReturnValue(true);
    mockAudioManagerInstance.dispose.mockClear();
    soundEffects = new SoundEffects();
  });

  describe('Initialization', () => {
    it('SoundEffects 인스턴스가 생성되어야 함', () => {
      expect(soundEffects).toBeDefined();
      expect(soundEffects).toBeInstanceOf(SoundEffects);
    });

    it('AudioManager 인스턴스를 생성해야 함', () => {
      expect(AudioManager).toHaveBeenCalled();
    });
  });

  describe('Loading', () => {
    it('loadAll()로 모든 효과음을 로드할 수 있어야 함', async () => {
      const result = await soundEffects.loadAll();
      expect(result).toBe(true);
      expect(mockAudioManagerInstance.loadSound).toHaveBeenCalledTimes(5);
    });

    it('loadAll()이 엔진 소리를 로드해야 함', async () => {
      await soundEffects.loadAll();
      expect(mockAudioManagerInstance.loadSound).toHaveBeenCalledWith(
        'engine-sound',
        '/assets/audio/sfx/engine-sound.ogg'
      );
    });

    it('loadAll()이 바람 소리를 로드해야 함', async () => {
      await soundEffects.loadAll();
      expect(mockAudioManagerInstance.loadSound).toHaveBeenCalledWith(
        'wind-sound',
        '/assets/audio/sfx/wind-sound.ogg'
      );
    });

    it('loadAll()이 충돌 소리를 로드해야 함', async () => {
      await soundEffects.loadAll();
      expect(mockAudioManagerInstance.loadSound).toHaveBeenCalledWith(
        'collision',
        '/assets/audio/sfx/collision.ogg'
      );
    });

    it('loadAll()이 체크포인트 소리를 로드해야 함', async () => {
      await soundEffects.loadAll();
      expect(mockAudioManagerInstance.loadSound).toHaveBeenCalledWith(
        'checkpoint',
        '/assets/audio/sfx/checkpoint.ogg'
      );
    });

    it('loadAll()이 결과 팡파레를 로드해야 함', async () => {
      await soundEffects.loadAll();
      expect(mockAudioManagerInstance.loadSound).toHaveBeenCalledWith(
        'result-fanfare',
        '/assets/audio/sfx/result-fanfare.ogg'
      );
    });

    it('loadAll()이 하나라도 실패 시 false를 반환해야 함', async () => {
      mockAudioManagerInstance.loadSound
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(true);
      const result = await soundEffects.loadAll();
      expect(result).toBe(false);
    });
  });

  describe('Playback', () => {
    beforeEach(async () => {
      await soundEffects.loadAll();
      vi.clearAllMocks();
    });

    it('playEngine()으로 엔진 소리를 재생할 수 있어야 함', () => {
      soundEffects.playEngine();
      expect(mockAudioManagerInstance.play).toHaveBeenCalledWith('engine-sound');
    });

    it('playWind()로 바람 소리를 재생할 수 있어야 함', () => {
      soundEffects.playWind();
      expect(mockAudioManagerInstance.play).toHaveBeenCalledWith('wind-sound');
    });

    it('playCollision()으로 충돌 소리를 재생할 수 있어야 함', () => {
      soundEffects.playCollision();
      expect(mockAudioManagerInstance.play).toHaveBeenCalledWith('collision');
    });

    it('playCheckpoint()로 체크포인트 소리를 재생할 수 있어야 함', () => {
      soundEffects.playCheckpoint();
      expect(mockAudioManagerInstance.play).toHaveBeenCalledWith('checkpoint');
    });

    it('playResultFanfare()로 결과 팡파레를 재생할 수 있어야 함', () => {
      soundEffects.playResultFanfare();
      expect(mockAudioManagerInstance.play).toHaveBeenCalledWith('result-fanfare');
    });
  });

  describe('Control', () => {
    beforeEach(async () => {
      await soundEffects.loadAll();
      vi.clearAllMocks();
    });

    it('stopEngine()으로 엔진 소리를 정지할 수 있어야 함', () => {
      soundEffects.stopEngine();
      expect(mockAudioManagerInstance.stop).toHaveBeenCalledWith('engine-sound');
    });

    it('stopWind()로 바람 소리를 정지할 수 있어야 함', () => {
      soundEffects.stopWind();
      expect(mockAudioManagerInstance.stop).toHaveBeenCalledWith('wind-sound');
    });

    it('stopAll()로 모든 효과음을 정지할 수 있어야 함', () => {
      soundEffects.stopAll();
      expect(mockAudioManagerInstance.stop).toHaveBeenCalledWith('engine-sound');
      expect(mockAudioManagerInstance.stop).toHaveBeenCalledWith('wind-sound');
      expect(mockAudioManagerInstance.stop).toHaveBeenCalledWith('collision');
      expect(mockAudioManagerInstance.stop).toHaveBeenCalledWith('checkpoint');
      expect(mockAudioManagerInstance.stop).toHaveBeenCalledWith('result-fanfare');
    });

    it('setVolume()으로 모든 효과음 볼륨을 설정할 수 있어야 함', () => {
      soundEffects.setVolume(0.7);
      expect(mockAudioManagerInstance.setVolume).toHaveBeenCalledWith('engine-sound', 0.7);
      expect(mockAudioManagerInstance.setVolume).toHaveBeenCalledWith('wind-sound', 0.7);
      expect(mockAudioManagerInstance.setVolume).toHaveBeenCalledWith('collision', 0.7);
      expect(mockAudioManagerInstance.setVolume).toHaveBeenCalledWith('checkpoint', 0.7);
      expect(mockAudioManagerInstance.setVolume).toHaveBeenCalledWith('result-fanfare', 0.7);
    });
  });

  describe('Resource Management', () => {
    it('dispose()로 리소스를 정리할 수 있어야 함', () => {
      soundEffects.dispose();
      expect(mockAudioManagerInstance.dispose).toHaveBeenCalled();
    });
  });

  describe('Constants', () => {
    it('ENGINE_SOUND_KEY가 "engine-sound"여야 함', () => {
      expect(SoundEffects.ENGINE_SOUND_KEY).toBe('engine-sound');
    });

    it('WIND_SOUND_KEY가 "wind-sound"여야 함', () => {
      expect(SoundEffects.WIND_SOUND_KEY).toBe('wind-sound');
    });

    it('COLLISION_KEY가 "collision"이어야 함', () => {
      expect(SoundEffects.COLLISION_KEY).toBe('collision');
    });

    it('CHECKPOINT_KEY가 "checkpoint"여야 함', () => {
      expect(SoundEffects.CHECKPOINT_KEY).toBe('checkpoint');
    });

    it('RESULT_FANFARE_KEY가 "result-fanfare"여야 함', () => {
      expect(SoundEffects.RESULT_FANFARE_KEY).toBe('result-fanfare');
    });

    it('ENGINE_SOUND_PATH가 올바른 경로여야 함', () => {
      expect(SoundEffects.ENGINE_SOUND_PATH).toBe('/assets/audio/sfx/engine-sound.ogg');
    });

    it('WIND_SOUND_PATH가 올바른 경로여야 함', () => {
      expect(SoundEffects.WIND_SOUND_PATH).toBe('/assets/audio/sfx/wind-sound.ogg');
    });

    it('COLLISION_PATH가 올바른 경로여야 함', () => {
      expect(SoundEffects.COLLISION_PATH).toBe('/assets/audio/sfx/collision.ogg');
    });

    it('CHECKPOINT_PATH가 올바른 경로여야 함', () => {
      expect(SoundEffects.CHECKPOINT_PATH).toBe('/assets/audio/sfx/checkpoint.ogg');
    });

    it('RESULT_FANFARE_PATH가 올바른 경로여야 함', () => {
      expect(SoundEffects.RESULT_FANFARE_PATH).toBe('/assets/audio/sfx/result-fanfare.ogg');
    });
  });
});
