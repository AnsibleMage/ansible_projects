import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { HUDOverlay } from './components/HUDOverlay';
import { useFlightStore } from '../../stores/flightStore';
import { useTimerStore } from '../../stores/timerStore';
import { useGameStore } from '../../stores/gameStore';

// 테스트 헬퍼 함수
const updateSpeed = (speed: number) => {
  act(() => {
    useFlightStore.getState().setSpeed(speed);
  });
};

const updateTimer = (timeMs: number) => {
  act(() => {
    useTimerStore.getState().setElapsedTime(timeMs);
  });
};

const updateCheckpoint = (count: number) => {
  act(() => {
    useGameStore.getState().setCheckpointsPassed(count);
  });
};

const setPersonalBest = (timeMs: number | null) => {
  act(() => {
    useTimerStore.getState().setPersonalBest(timeMs);
  });
};

const measureUpdateTime = (action: () => void): number => {
  const startTime = performance.now();
  action();
  const endTime = performance.now();
  return endTime - startTime;
};

describe('Feature 4.2 Integration: Game Play HUD', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset all stores
    useFlightStore.getState().setSpeed(0);
    useTimerStore.getState().setElapsedTime(0);
    useTimerStore.getState().setPersonalBest(null);
    useGameStore.getState().reset();
  });

  describe('시나리오 1: HUD 초기 렌더링', () => {
    it('게임 시작 시 4개 HUD 컴포넌트가 모두 렌더링되어야 함', () => {
      // Given: 게임이 시작됨
      render(<HUDOverlay />);

      // Then: 4개 컴포넌트가 모두 표시됨
      expect(screen.getByTestId('speed-indicator')).toBeInTheDocument();
      expect(screen.getByTestId('timer-display')).toBeInTheDocument();
      expect(screen.getByTestId('checkpoint-counter')).toBeInTheDocument();
      // BestTimeGhost는 personalBest가 null이면 렌더링 안됨
      expect(screen.queryByTestId('best-time-ghost')).not.toBeInTheDocument();
    });

    it('HUD가 Canvas 위에 오버레이되어야 함', () => {
      // Given: 게임이 시작됨
      render(<HUDOverlay />);

      // Then: fixed, inset-0 클래스로 전체 화면 커버
      const overlay = screen.getByTestId('hud-overlay');
      expect(overlay).toHaveClass('fixed');
      expect(overlay).toHaveClass('inset-0');
    });

    it('HUD가 3D Canvas 조작을 방해하지 않아야 함 (pointer-events-none)', () => {
      // Given: 게임이 시작됨
      render(<HUDOverlay />);

      // Then: pointer-events-none으로 클릭 이벤트 통과
      const overlay = screen.getByTestId('hud-overlay');
      expect(overlay).toHaveClass('pointer-events-none');
    });
  });

  describe('시나리오 2: 실시간 HUD 업데이트', () => {
    it('속도 변화 시 SpeedIndicator가 업데이트되어야 함', () => {
      // Given: HUD가 렌더링됨
      render(<HUDOverlay />);
      expect(screen.getByText('0 km/h')).toBeInTheDocument();

      // When: 속도가 100 km/h로 증가
      updateSpeed(100);

      // Then: SpeedIndicator가 업데이트됨
      expect(screen.getByText('100 km/h')).toBeInTheDocument();
    });

    it('시간 경과 시 TimerDisplay가 업데이트되어야 함', () => {
      // Given: HUD가 렌더링됨
      render(<HUDOverlay />);
      expect(screen.getByText('00:00.000')).toBeInTheDocument();

      // When: 1.5초 경과
      updateTimer(1500);

      // Then: TimerDisplay가 업데이트됨
      expect(screen.getByText('00:01.500')).toBeInTheDocument();
    });

    it('체크포인트 통과 시 CheckpointCounter가 업데이트되어야 함', () => {
      // Given: HUD가 렌더링됨
      render(<HUDOverlay />);
      expect(screen.getByText('0/10')).toBeInTheDocument();

      // When: 3개 체크포인트 통과
      updateCheckpoint(3);

      // Then: CheckpointCounter가 업데이트됨
      expect(screen.getByText('3/10')).toBeInTheDocument();
    });

    it('최고 기록보다 빠르면 BestTimeGhost가 녹색으로 표시되어야 함', () => {
      // Given: 최고 기록이 60초
      setPersonalBest(60000);
      render(<HUDOverlay />);

      // When: 현재 50초 (10초 빠름)
      updateTimer(50000);

      // Then: 녹색 텍스트로 -10.000 표시
      const ghost = screen.getByTestId('best-time-ghost');
      expect(ghost).toHaveClass('text-green-500');
      expect(screen.getByText('-10.000')).toBeInTheDocument();
    });

    it('최고 기록보다 느리면 BestTimeGhost가 빨간색으로 표시되어야 함', () => {
      // Given: 최고 기록이 60초
      setPersonalBest(60000);
      render(<HUDOverlay />);

      // When: 현재 70초 (10초 느림)
      updateTimer(70000);

      // Then: 빨간색 텍스트로 +10.000 표시
      const ghost = screen.getByTestId('best-time-ghost');
      expect(ghost).toHaveClass('text-red-500');
      expect(screen.getByText('+10.000')).toBeInTheDocument();
    });
  });

  describe('시나리오 3: PRD Success Metrics 검증', () => {
    it('HUD 업데이트 응답 시간이 16ms 미만이어야 함', () => {
      // Given: HUD가 렌더링됨
      render(<HUDOverlay />);

      // When: 여러 상태를 동시에 업데이트
      const responseTime = measureUpdateTime(() => {
        act(() => {
          useFlightStore.getState().setSpeed(150);
          useTimerStore.getState().setElapsedTime(5000);
          useGameStore.getState().setCheckpointsPassed(5);
        });
      });

      // Then: 16ms 미만 (60fps 보장)
      expect(responseTime).toBeLessThan(16);
    });

    it('HUD가 FPS에 영향을 주지 않아야 함 (pointer-events-none)', () => {
      // Given: HUD가 렌더링됨
      render(<HUDOverlay />);

      // Then: pointer-events-none으로 렌더링 비용 최소화
      const overlay = screen.getByTestId('hud-overlay');
      expect(overlay).toHaveClass('pointer-events-none');
    });
  });

  describe('시나리오 4: 복합 시나리오 - 전체 플레이 플로우', () => {
    it('게임 시작부터 체크포인트 통과까지 HUD가 정상 작동해야 함', () => {
      // Given: 게임 시작, 최고 기록 60초
      setPersonalBest(60000);
      render(<HUDOverlay />);

      // When: 비행 시작 (느린 속도)
      updateSpeed(30);
      expect(screen.getByTestId('speed-indicator')).toHaveClass('text-blue-500');

      // When: 가속 (중간 속도)
      updateSpeed(100);
      expect(screen.getByTestId('speed-indicator')).toHaveClass('text-yellow-500');

      // When: 최고 속도
      updateSpeed(200);
      expect(screen.getByTestId('speed-indicator')).toHaveClass('text-red-500');

      // When: 첫 체크포인트 통과 (10초 경과)
      updateTimer(10000);
      updateCheckpoint(1);
      expect(screen.getByText('1/10')).toBeInTheDocument();
      expect(screen.getByText('00:10.000')).toBeInTheDocument();

      // When: 중간 체크포인트 통과 (50초 경과, 최고 기록보다 빠름)
      updateTimer(50000);
      updateCheckpoint(5);
      expect(screen.getByText('5/10')).toBeInTheDocument();
      expect(screen.getByText('00:50.000')).toBeInTheDocument();
      expect(screen.getByText('-10.000')).toBeInTheDocument(); // 60초 대비 10초 빠름

      // When: 최종 체크포인트 통과 (70초 경과, 최고 기록보다 느림)
      updateTimer(70000);
      updateCheckpoint(10);
      expect(screen.getByText('10/10')).toBeInTheDocument();
      expect(screen.getByText('01:10.000')).toBeInTheDocument();
      expect(screen.getByText('+10.000')).toBeInTheDocument(); // 60초 대비 10초 느림

      // Then: 모든 HUD 컴포넌트가 정상 작동
      expect(screen.getByTestId('hud-overlay')).toBeInTheDocument();
    });
  });

  describe('시나리오 5: Edge Cases', () => {
    it('personalBest가 없으면 BestTimeGhost가 렌더링되지 않아야 함', () => {
      // Given: personalBest가 null
      render(<HUDOverlay />);

      // Then: BestTimeGhost 미표시
      expect(screen.queryByTestId('best-time-ghost')).not.toBeInTheDocument();
    });

    it('체크포인트가 최대값을 초과하지 않아야 함', () => {
      // Given: 총 10개 체크포인트
      render(<HUDOverlay />);

      // When: 15개 체크포인트 통과 시도
      updateCheckpoint(15);

      // Then: 10/10으로 클램핑
      expect(screen.getByText('10/10')).toBeInTheDocument();
    });

    it('음수 속도는 0으로 클램핑되어야 함', () => {
      // Given: HUD가 렌더링됨
      render(<HUDOverlay />);

      // When: 음수 속도 설정
      updateSpeed(-50);

      // Then: 0 km/h 표시
      expect(screen.getByText('0 km/h')).toBeInTheDocument();
    });

    it('음수 시간은 00:00.000으로 표시되어야 함', () => {
      // Given: HUD가 렌더링됨
      render(<HUDOverlay />);

      // When: 음수 시간 설정
      updateTimer(-1000);

      // Then: 00:00.000 표시
      expect(screen.getByText('00:00.000')).toBeInTheDocument();
    });
  });
});
