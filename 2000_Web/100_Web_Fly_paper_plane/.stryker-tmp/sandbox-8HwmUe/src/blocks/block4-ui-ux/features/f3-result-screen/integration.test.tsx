// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import { ResultScreen } from './ResultScreen';
import { useGameStore } from '../../stores/gameStore';
import { useTimerStore } from '../../stores/timerStore';
import { useSocialStore } from '../../stores/socialStore';

// 테스트 헬퍼 함수
const setFinalTime = (timeMs: number) => {
  act(() => {
    useGameStore.getState().setFinalTime(timeMs);
  });
};

const setPersonalBest = (timeMs: number | null) => {
  act(() => {
    useTimerStore.getState().setPersonalBest(timeMs);
  });
};

const setCurrentUser = (user: { email: string; rank: number } | null) => {
  act(() => {
    useSocialStore.getState().setCurrentUser(user);
  });
};

const resetGame = () => {
  act(() => {
    useGameStore.getState().reset();
  });
};

const setGameState = (state: 'menu' | 'playing' | 'result') => {
  act(() => {
    useGameStore.getState().setGameState(state);
  });
};

describe('Feature 4.3 Integration: Result Screen', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Reset all stores
    useGameStore.getState().reset();
    useTimerStore.getState().setElapsedTime(0);
    useTimerStore.getState().setPersonalBest(null);
    useSocialStore.getState().setCurrentUser(null);
  });

  describe('시나리오 1: 결과 화면 초기 렌더링', () => {
    it('게임 완료 시 5개 컴포넌트가 모두 렌더링되어야 함', () => {
      // Given: 게임 완료, 기록 60초
      setFinalTime(60000);
      setPersonalBest(70000);
      setCurrentUser({ email: 'test@example.com', rank: 5 });

      // When: 결과 화면 렌더링
      render(<ResultScreen />);

      // Then: 5개 컴포넌트 모두 표시
      expect(screen.getByTestId('time-result')).toBeInTheDocument();
      expect(screen.getByTestId('record-comparison')).toBeInTheDocument();
      expect(screen.getByTestId('leaderboard-position')).toBeInTheDocument();
      expect(screen.getByTestId('result-buttons')).toBeInTheDocument();
      expect(screen.getByTestId('result-screen')).toBeInTheDocument();
    });

    it('결과 화면이 중앙 정렬되어야 함', () => {
      // Given: 게임 완료
      setFinalTime(60000);
      render(<ResultScreen />);

      // Then: flex, justify-center, items-center 클래스
      const resultScreen = screen.getByTestId('result-screen');
      expect(resultScreen).toHaveClass('flex');
      expect(resultScreen).toHaveClass('justify-center');
      expect(resultScreen).toHaveClass('items-center');
    });

    it('결과 화면이 전체 화면을 커버해야 함', () => {
      // Given: 게임 완료
      setFinalTime(60000);
      render(<ResultScreen />);

      // Then: fixed, inset-0 클래스
      const resultScreen = screen.getByTestId('result-screen');
      expect(resultScreen).toHaveClass('fixed');
      expect(resultScreen).toHaveClass('inset-0');
    });
  });

  describe('시나리오 2: 첫 플레이 (personalBest null)', () => {
    it('첫 플레이 시 "First Play!" 메시지가 표시되어야 함', () => {
      // Given: 첫 플레이, 기록 60초
      setFinalTime(60000);
      setPersonalBest(null);
      render(<ResultScreen />);

      // Then: "First Play!" 메시지 표시
      expect(screen.getByText('First Play!')).toBeInTheDocument();
      expect(screen.getByText('First Play!')).toHaveClass('text-blue-500');
    });

    it('첫 플레이 시 시간이 표시되어야 함', () => {
      // Given: 첫 플레이, 기록 65.5초
      setFinalTime(65500);
      setPersonalBest(null);
      render(<ResultScreen />);

      // Then: "01:05.500" 표시
      expect(screen.getByText('01:05.500')).toBeInTheDocument();
    });

    it('첫 플레이 시 리더보드 순위가 표시되어야 함', () => {
      // Given: 첫 플레이, 순위 10위
      setFinalTime(60000);
      setPersonalBest(null);
      setCurrentUser({ email: 'test@example.com', rank: 10 });
      render(<ResultScreen />);

      // Then: "#10" 표시
      expect(screen.getByText('You ranked #10!')).toBeInTheDocument();
    });
  });

  describe('시나리오 3: 신기록 (finalTime < personalBest)', () => {
    it('신기록 시 "New Record!" 메시지가 녹색으로 표시되어야 함', () => {
      // Given: 신기록 (60초 → 50초, 10초 단축)
      setFinalTime(50000);
      setPersonalBest(60000);
      render(<ResultScreen />);

      // Then: "New Record!" 녹색 텍스트
      expect(screen.getByText('New Record!')).toBeInTheDocument();
      expect(screen.getByText('New Record!')).toHaveClass('text-green-500');
    });

    it('신기록 시 단축 시간이 녹색으로 표시되어야 함', () => {
      // Given: 신기록 (60초 → 50초, 10초 단축)
      setFinalTime(50000);
      setPersonalBest(60000);
      render(<ResultScreen />);

      // Then: "-10.000s" 녹색 텍스트
      expect(screen.getByText('-10.000s')).toBeInTheDocument();
      const timeDiff = screen.getByText('-10.000s');
      expect(timeDiff).toHaveClass('text-green-500');
    });

    it('신기록 시 순위가 상승하면 메달이 표시되어야 함', () => {
      // Given: 신기록으로 1위
      setFinalTime(50000);
      setPersonalBest(60000);
      setCurrentUser({ email: 'test@example.com', rank: 1 });
      render(<ResultScreen />);

      // Then: 🥇 메달 표시
      expect(screen.getByText('🥇')).toBeInTheDocument();
      expect(screen.getByText('You ranked #1!')).toBeInTheDocument();
    });
  });

  describe('시나리오 4: 기록 미달 (finalTime > personalBest)', () => {
    it('기록 미달 시 이전 최고 기록이 표시되어야 함', () => {
      // Given: 기록 미달 (60초 → 70초)
      setFinalTime(70000);
      setPersonalBest(60000);
      render(<ResultScreen />);

      // Then: "Previous Best" 레이블과 60초 표시
      expect(screen.getByText('Previous Best')).toBeInTheDocument();
      expect(screen.getByText('01:00.000')).toBeInTheDocument();
    });

    it('기록 미달 시 차이가 빨간색으로 표시되어야 함', () => {
      // Given: 기록 미달 (60초 → 70초, 10초 느림)
      setFinalTime(70000);
      setPersonalBest(60000);
      render(<ResultScreen />);

      // Then: "+10.000s" 빨간색 텍스트
      expect(screen.getByText('+10.000s')).toBeInTheDocument();
      const timeDiff = screen.getByText('+10.000s');
      expect(timeDiff).toHaveClass('text-red-500');
    });

    it('기록 미달 시 현재 순위가 표시되어야 함', () => {
      // Given: 기록 미달, 순위 20위
      setFinalTime(70000);
      setPersonalBest(60000);
      setCurrentUser({ email: 'test@example.com', rank: 20 });
      render(<ResultScreen />);

      // Then: "#20" 회색 텍스트
      expect(screen.getByText('You ranked #20!')).toBeInTheDocument();
      expect(screen.getByText('You ranked #20!')).toHaveClass('text-gray-400');
    });
  });

  describe('시나리오 5: 버튼 클릭 동작', () => {
    it('Retry 버튼 클릭 시 reset()이 호출되고 gameState가 "playing"으로 변경되어야 함', () => {
      // Given: 결과 화면 표시
      setFinalTime(60000);
      render(<ResultScreen />);

      // When: Retry 버튼 클릭
      const retryButton = screen.getByText('Retry');
      fireEvent.click(retryButton);

      // Then: reset() 호출, gameState = "playing"
      expect(useGameStore.getState().gameState).toBe('playing');
      expect(useGameStore.getState().finalTime).toBe(0);
    });

    it('Main Menu 버튼 클릭 시 reset()이 호출되고 gameState가 "menu"로 변경되어야 함', () => {
      // Given: 결과 화면 표시
      setFinalTime(60000);
      render(<ResultScreen />);

      // When: Main Menu 버튼 클릭
      const menuButton = screen.getByText('Main Menu');
      fireEvent.click(menuButton);

      // Then: reset() 호출, gameState = "menu"
      expect(useGameStore.getState().gameState).toBe('menu');
      expect(useGameStore.getState().finalTime).toBe(0);
    });

    it('버튼들이 가로로 배치되어야 함', () => {
      // Given: 결과 화면 표시
      setFinalTime(60000);
      render(<ResultScreen />);

      // Then: flex, gap-4, justify-center 클래스
      const buttons = screen.getByTestId('result-buttons');
      expect(buttons).toHaveClass('flex');
      expect(buttons).toHaveClass('gap-4');
      expect(buttons).toHaveClass('justify-center');
    });
  });

  describe('시나리오 6: 리더보드 순위 표시', () => {
    it('1위는 🥇 메달과 금색 텍스트로 표시되어야 함', () => {
      // Given: 1위
      setFinalTime(50000);
      setCurrentUser({ email: 'test@example.com', rank: 1 });
      render(<ResultScreen />);

      // Then: 🥇 메달, 금색 텍스트
      expect(screen.getByText('🥇')).toBeInTheDocument();
      expect(screen.getByText('You ranked #1!')).toHaveClass('text-yellow-500');
    });

    it('2위는 🥈 메달과 금색 텍스트로 표시되어야 함', () => {
      // Given: 2위
      setFinalTime(55000);
      setCurrentUser({ email: 'test@example.com', rank: 2 });
      render(<ResultScreen />);

      // Then: 🥈 메달, 금색 텍스트
      expect(screen.getByText('🥈')).toBeInTheDocument();
      expect(screen.getByText('You ranked #2!')).toHaveClass('text-yellow-500');
    });

    it('3위는 🥉 메달과 금색 텍스트로 표시되어야 함', () => {
      // Given: 3위
      setFinalTime(58000);
      setCurrentUser({ email: 'test@example.com', rank: 3 });
      render(<ResultScreen />);

      // Then: 🥉 메달, 금색 텍스트
      expect(screen.getByText('🥉')).toBeInTheDocument();
      expect(screen.getByText('You ranked #3!')).toHaveClass('text-yellow-500');
    });

    it('4-10위는 메달 없이 흰색 텍스트로 표시되어야 함', () => {
      // Given: 5위
      setFinalTime(60000);
      setCurrentUser({ email: 'test@example.com', rank: 5 });
      render(<ResultScreen />);

      // Then: 메달 없음, 흰색 텍스트
      expect(screen.queryByText('🥇')).not.toBeInTheDocument();
      expect(screen.queryByText('🥈')).not.toBeInTheDocument();
      expect(screen.queryByText('🥉')).not.toBeInTheDocument();
      expect(screen.getByText('You ranked #5!')).toHaveClass('text-white');
    });

    it('11위 이하는 회색 텍스트로 표시되어야 함', () => {
      // Given: 15위
      setFinalTime(65000);
      setCurrentUser({ email: 'test@example.com', rank: 15 });
      render(<ResultScreen />);

      // Then: 회색 텍스트
      expect(screen.getByText('You ranked #15!')).toHaveClass('text-gray-400');
    });
  });

  describe('시나리오 7: PRD Success Metrics 검증', () => {
    it('결과 화면이 즉시 렌더링되어야 함 (< 16ms)', () => {
      // Given: 게임 완료
      setFinalTime(60000);

      // When: 결과 화면 렌더링 시간 측정
      const startTime = performance.now();
      render(<ResultScreen />);
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Then: 16ms 미만 (60fps 보장)
      expect(renderTime).toBeLessThan(16);
    });

    it('버튼 클릭 응답 시간이 16ms 미만이어야 함', () => {
      // Given: 결과 화면 표시
      setFinalTime(60000);
      render(<ResultScreen />);

      // When: Retry 버튼 클릭 시간 측정
      const retryButton = screen.getByText('Retry');
      const startTime = performance.now();
      fireEvent.click(retryButton);
      const endTime = performance.now();
      const clickTime = endTime - startTime;

      // Then: 16ms 미만
      expect(clickTime).toBeLessThan(16);
    });

    it('시간 포맷이 MM:SS.mmm 형식이어야 함', () => {
      // Given: 다양한 시간 값
      const testCases = [
        { time: 0, expected: '00:00.000' },
        { time: 1500, expected: '00:01.500' },
        { time: 65500, expected: '01:05.500' },
        { time: 125999, expected: '02:05.999' },
      ];

      testCases.forEach(({ time, expected }) => {
        // When: 해당 시간으로 렌더링
        setFinalTime(time);
        const { rerender } = render(<ResultScreen />);

        // Then: 올바른 포맷 표시
        expect(screen.getByText(expected)).toBeInTheDocument();

        // Cleanup
        rerender(<></>);
      });
    });
  });

  describe('시나리오 8: Edge Cases', () => {
    it('currentUser가 null이면 리더보드 순위가 표시되지 않아야 함', () => {
      // Given: 로그인하지 않음
      setFinalTime(60000);
      setCurrentUser(null);
      render(<ResultScreen />);

      // Then: 리더보드 순위 미표시
      expect(screen.queryByTestId('leaderboard-position')).not.toBeInTheDocument();
    });

    it('finalTime이 0이면 00:00.000으로 표시되어야 함', () => {
      // Given: finalTime = 0
      setFinalTime(0);
      render(<ResultScreen />);

      // Then: "00:00.000" 표시
      expect(screen.getByText('00:00.000')).toBeInTheDocument();
    });

    it('음수 finalTime은 00:00.000으로 표시되어야 함', () => {
      // Given: finalTime = -1000 (음수)
      setFinalTime(-1000);
      render(<ResultScreen />);

      // Then: "00:00.000" 표시
      expect(screen.getByText('00:00.000')).toBeInTheDocument();
    });

    it('personalBest와 finalTime이 동일하면 노란색으로 표시되어야 함', () => {
      // Given: 동일한 기록 (60초)
      setFinalTime(60000);
      setPersonalBest(60000);
      render(<ResultScreen />);

      // Then: "±0.000s" 노란색 텍스트
      expect(screen.getByText('±0.000s')).toBeInTheDocument();
      expect(screen.getByText('±0.000s')).toHaveClass('text-yellow-500');
    });
  });

  describe('시나리오 9: 복합 시나리오 - 신기록 달성 후 재시도', () => {
    it('신기록 달성 → Retry → 다시 완주 → 이전 기록 갱신', () => {
      // Given: 첫 플레이, 70초
      setFinalTime(70000);
      setPersonalBest(null);
      setCurrentUser({ email: 'test@example.com', rank: 10 });
      render(<ResultScreen />);

      // Then: "First Play!" 표시
      expect(screen.getByText('First Play!')).toBeInTheDocument();

      // When: Retry 클릭
      const retryButton = screen.getByText('Retry');
      fireEvent.click(retryButton);

      // Then: gameState = "playing", reset
      expect(useGameStore.getState().gameState).toBe('playing');
      expect(useGameStore.getState().finalTime).toBe(0);

      // Cleanup: 이전 렌더링 제거
      cleanup();

      // When: 재플레이, 60초 (10초 단축, 신기록)
      setFinalTime(60000);
      setPersonalBest(70000);
      setCurrentUser({ email: 'test@example.com', rank: 5 });
      render(<ResultScreen />);

      // Then: "New Record!" 표시
      expect(screen.getByText('New Record!')).toBeInTheDocument();
      expect(screen.getByText('-10.000s')).toBeInTheDocument();

      // When: 다시 Retry 클릭
      const retryButton2 = screen.getByText('Retry');
      fireEvent.click(retryButton2);

      // Cleanup: 이전 렌더링 제거
      cleanup();

      // When: 재플레이, 65초 (5초 느림, 기록 미달)
      setFinalTime(65000);
      setPersonalBest(60000);
      setCurrentUser({ email: 'test@example.com', rank: 7 });
      render(<ResultScreen />);

      // Then: "Previous Best" 60초 표시, "+5.000s" 빨간색
      expect(screen.getByText('Previous Best')).toBeInTheDocument();
      expect(screen.getByText('01:00.000')).toBeInTheDocument();
      expect(screen.getByText('+5.000s')).toBeInTheDocument();
      expect(screen.getByText('+5.000s')).toHaveClass('text-red-500');
    });
  });
});
