// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BestTimeGhost } from './BestTimeGhost';

// Mock Timer Store
let mockTimerState = {
  timerState: 'running',
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

describe('BestTimeGhost Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTimerState = {
      timerState: 'running',
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

  it('BestTimeGhost 컴포넌트가 렌더링되어야 함', () => {
    mockTimerState.personalBest = 60000; // 1분
    render(<BestTimeGhost />);
    expect(screen.getByTestId('best-time-ghost')).toBeInTheDocument();
  });

  it('personalBest가 null이면 렌더링하지 않아야 함', () => {
    mockTimerState.personalBest = null;
    render(<BestTimeGhost />);
    expect(screen.queryByTestId('best-time-ghost')).not.toBeInTheDocument();
  });

  it('현재 시간이 최고 기록보다 빠르면 녹색이어야 함 (text-green-500)', () => {
    mockTimerState.elapsedTime = 50000; // 50초
    mockTimerState.personalBest = 60000; // 1분
    render(<BestTimeGhost />);
    const ghost = screen.getByTestId('best-time-ghost');
    expect(ghost).toHaveClass('text-green-500');
  });

  it('현재 시간이 최고 기록보다 느리면 빨간색이어야 함 (text-red-500)', () => {
    mockTimerState.elapsedTime = 70000; // 70초
    mockTimerState.personalBest = 60000; // 1분
    render(<BestTimeGhost />);
    const ghost = screen.getByTestId('best-time-ghost');
    expect(ghost).toHaveClass('text-red-500');
  });

  it('현재 시간이 최고 기록과 같으면 노란색이어야 함 (text-yellow-500)', () => {
    mockTimerState.elapsedTime = 60000;
    mockTimerState.personalBest = 60000;
    render(<BestTimeGhost />);
    const ghost = screen.getByTestId('best-time-ghost');
    expect(ghost).toHaveClass('text-yellow-500');
  });

  it('시간 차이가 "-10.000" 형식으로 표시되어야 함 (더 빠름)', () => {
    mockTimerState.elapsedTime = 50000; // 50초
    mockTimerState.personalBest = 60000; // 1분
    render(<BestTimeGhost />);
    expect(screen.getByText('-10.000')).toBeInTheDocument();
  });

  it('시간 차이가 "+10.000" 형식으로 표시되어야 함 (더 느림)', () => {
    mockTimerState.elapsedTime = 70000;
    mockTimerState.personalBest = 60000;
    render(<BestTimeGhost />);
    expect(screen.getByText('+10.000')).toBeInTheDocument();
  });

  it('시간 차이가 "±0.000" 형식으로 표시되어야 함 (같음)', () => {
    mockTimerState.elapsedTime = 60000;
    mockTimerState.personalBest = 60000;
    render(<BestTimeGhost />);
    expect(screen.getByText('±0.000')).toBeInTheDocument();
  });

  it('밀리초 단위로 차이가 표시되어야 함 (3자리)', () => {
    mockTimerState.elapsedTime = 50050; // 50.050초
    mockTimerState.personalBest = 60000; // 60초
    render(<BestTimeGhost />);
    expect(screen.getByText('-9.950')).toBeInTheDocument();
  });

  it('타이머 아래에 위치해야 함 (absolute, top-16, left-1/2)', () => {
    mockTimerState.personalBest = 60000;
    render(<BestTimeGhost />);
    const ghost = screen.getByTestId('best-time-ghost');
    expect(ghost).toHaveClass('absolute');
    expect(ghost).toHaveClass('top-16');
    expect(ghost).toHaveClass('left-1/2');
    expect(ghost).toHaveClass('-translate-x-1/2');
  });

  it('작은 폰트여야 함 (text-xl)', () => {
    mockTimerState.personalBest = 60000;
    render(<BestTimeGhost />);
    const ghost = screen.getByTestId('best-time-ghost');
    expect(ghost).toHaveClass('text-xl');
  });

  it('반투명 배경이 있어야 함 (bg-black/50)', () => {
    mockTimerState.personalBest = 60000;
    render(<BestTimeGhost />);
    const ghost = screen.getByTestId('best-time-ghost');
    expect(ghost).toHaveClass('bg-black/50');
  });

  it('패딩과 둥근 모서리가 있어야 함', () => {
    mockTimerState.personalBest = 60000;
    render(<BestTimeGhost />);
    const ghost = screen.getByTestId('best-time-ghost');
    expect(ghost).toHaveClass('px-4');
    expect(ghost).toHaveClass('py-1');
    expect(ghost).toHaveClass('rounded');
  });

  it('큰 시간 차이도 정상 표시되어야 함 (+100초)', () => {
    mockTimerState.elapsedTime = 160000; // 160초
    mockTimerState.personalBest = 60000; // 60초
    render(<BestTimeGhost />);
    expect(screen.getByText('+100.000')).toBeInTheDocument();
  });

  it('음수 personalBest는 무시되어야 함', () => {
    mockTimerState.personalBest = -1000;
    render(<BestTimeGhost />);
    expect(screen.queryByTestId('best-time-ghost')).not.toBeInTheDocument();
  });
});
