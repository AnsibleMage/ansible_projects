// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimerDisplay } from './TimerDisplay';

// Mock Timer Store
let mockTimerState = {
  timerState: 'idle',
  elapsedTime: 0,
  personalBest: null,
  recordHistory: [],
  setTimerState: vi.fn(),
  setElapsedTime: vi.fn(),
  setPersonalBest: vi.fn(),
  addRecord: vi.fn(),
  clearHistory: vi.fn(),
  reset: vi.fn(),
};

vi.mock('../../../stores/timerStore', () => ({
  useTimerStore: (selector?: any) => {
    return selector ? selector(mockTimerState) : mockTimerState;
  },
}));

describe('TimerDisplay Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTimerState = {
      timerState: 'idle',
      elapsedTime: 0,
      personalBest: null,
      recordHistory: [],
      setTimerState: vi.fn(),
      setElapsedTime: vi.fn(),
      setPersonalBest: vi.fn(),
      addRecord: vi.fn(),
      clearHistory: vi.fn(),
      reset: vi.fn(),
    };
  });

  it('TimerDisplay 컴포넌트가 렌더링되어야 함', () => {
    render(<TimerDisplay />);
    expect(screen.getByTestId('timer-display')).toBeInTheDocument();
  });

  it('0ms는 "00:00.000" 형식으로 표시되어야 함', () => {
    mockTimerState.elapsedTime = 0;
    render(<TimerDisplay />);
    expect(screen.getByText('00:00.000')).toBeInTheDocument();
  });

  it('1초(1000ms)는 "00:01.000" 형식으로 표시되어야 함', () => {
    mockTimerState.elapsedTime = 1000;
    render(<TimerDisplay />);
    expect(screen.getByText('00:01.000')).toBeInTheDocument();
  });

  it('1분(60000ms)은 "01:00.000" 형식으로 표시되어야 함', () => {
    mockTimerState.elapsedTime = 60000;
    render(<TimerDisplay />);
    expect(screen.getByText('01:00.000')).toBeInTheDocument();
  });

  it('1분 30초 500ms는 "01:30.500" 형식으로 표시되어야 함', () => {
    mockTimerState.elapsedTime = 90500;
    render(<TimerDisplay />);
    expect(screen.getByText('01:30.500')).toBeInTheDocument();
  });

  it('59분 59초 999ms는 "59:59.999" 형식으로 표시되어야 함', () => {
    mockTimerState.elapsedTime = 3599999;
    render(<TimerDisplay />);
    expect(screen.getByText('59:59.999')).toBeInTheDocument();
  });

  it('밀리초는 3자리로 표시되어야 함 (50ms → 050)', () => {
    mockTimerState.elapsedTime = 1050;
    render(<TimerDisplay />);
    expect(screen.getByText('00:01.050')).toBeInTheDocument();
  });

  it('분과 초는 2자리로 패딩되어야 함 (5분 3초 → 05:03)', () => {
    mockTimerState.elapsedTime = 303000;
    render(<TimerDisplay />);
    expect(screen.getByText('05:03.000')).toBeInTheDocument();
  });

  it('화면 상단 중앙에 위치해야 함 (absolute, top-4, left-1/2, -translate-x-1/2)', () => {
    render(<TimerDisplay />);
    const timer = screen.getByTestId('timer-display');
    expect(timer).toHaveClass('absolute');
    expect(timer).toHaveClass('top-4');
    expect(timer).toHaveClass('left-1/2');
    expect(timer).toHaveClass('-translate-x-1/2');
  });

  it('크고 선명한 폰트여야 함 (text-4xl, font-bold)', () => {
    render(<TimerDisplay />);
    const timer = screen.getByTestId('timer-display');
    expect(timer).toHaveClass('text-4xl');
    expect(timer).toHaveClass('font-bold');
  });

  it('흰색 텍스트여야 함 (text-white)', () => {
    render(<TimerDisplay />);
    const timer = screen.getByTestId('timer-display');
    expect(timer).toHaveClass('text-white');
  });

  it('반투명 배경이 있어야 함 (bg-black/50)', () => {
    render(<TimerDisplay />);
    const timer = screen.getByTestId('timer-display');
    expect(timer).toHaveClass('bg-black/50');
  });

  it('패딩과 둥근 모서리가 있어야 함', () => {
    render(<TimerDisplay />);
    const timer = screen.getByTestId('timer-display');
    expect(timer).toHaveClass('px-6');
    expect(timer).toHaveClass('py-3');
    expect(timer).toHaveClass('rounded-lg');
  });

  it('음수 시간은 "00:00.000"으로 표시되어야 함', () => {
    mockTimerState.elapsedTime = -1000;
    render(<TimerDisplay />);
    expect(screen.getByText('00:00.000')).toBeInTheDocument();
  });

  it('매우 큰 시간(100분+)도 정상 표시되어야 함', () => {
    mockTimerState.elapsedTime = 6000000; // 100분
    render(<TimerDisplay />);
    expect(screen.getByText('100:00.000')).toBeInTheDocument();
  });
});
