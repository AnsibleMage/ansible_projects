import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecordComparison } from './RecordComparison';

// Mock Timer Store
let mockTimerState = {
  timerState: 'stopped',
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

// Mock Game Store
let mockGameState = {
  gameState: 'finished',
  finalTime: 0,
  collisionCount: 0,
  checkpointsPassed: 0,
  totalCheckpoints: 10,
  setGameState: vi.fn(),
  setFinalTime: vi.fn(),
  setCollisionCount: vi.fn(),
  setCheckpointsPassed: vi.fn(),
  setTotalCheckpoints: vi.fn(),
  reset: vi.fn(),
};

vi.mock('../../../stores/timerStore', () => ({
  useTimerStore: (selector?: any) => {
    return selector ? selector(mockTimerState) : mockTimerState;
  },
}));

vi.mock('../../../stores/gameStore', () => ({
  useGameStore: (selector?: any) => {
    return selector ? selector(mockGameState) : mockGameState;
  },
}));

describe('RecordComparison Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTimerState = {
      timerState: 'stopped',
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
    mockGameState = {
      gameState: 'finished',
      finalTime: 0,
      collisionCount: 0,
      checkpointsPassed: 0,
      totalCheckpoints: 10,
      setGameState: vi.fn(),
      setFinalTime: vi.fn(),
      setCollisionCount: vi.fn(),
      setCheckpointsPassed: vi.fn(),
      setTotalCheckpoints: vi.fn(),
      reset: vi.fn(),
    };
  });

  it('RecordComparison 컴포넌트가 렌더링되어야 함', () => {
    mockGameState.finalTime = 60000;
    mockTimerState.personalBest = 70000;
    render(<RecordComparison />);
    expect(screen.getByTestId('record-comparison')).toBeInTheDocument();
  });

  it('첫 플레이 시 "First Play!" 메시지가 표시되어야 함', () => {
    mockGameState.finalTime = 60000;
    mockTimerState.personalBest = null;
    render(<RecordComparison />);
    expect(screen.getByText('First Play!')).toBeInTheDocument();
  });

  it('신기록 시 "New Record!" 메시지가 표시되어야 함', () => {
    mockGameState.finalTime = 50000; // 50초
    mockTimerState.personalBest = 60000; // 60초
    render(<RecordComparison />);
    expect(screen.getByText('New Record!')).toBeInTheDocument();
  });

  it('신기록이 아니면 "Previous Best" 레이블이 표시되어야 함', () => {
    mockGameState.finalTime = 70000; // 70초
    mockTimerState.personalBest = 60000; // 60초
    render(<RecordComparison />);
    expect(screen.getByText('Previous Best')).toBeInTheDocument();
  });

  it('최고 기록이 MM:SS.mmm 포맷으로 표시되어야 함', () => {
    mockGameState.finalTime = 70000;
    mockTimerState.personalBest = 60000; // 1분
    render(<RecordComparison />);
    expect(screen.getByText('01:00.000')).toBeInTheDocument();
  });

  it('신기록 시 개선된 시간 차이가 표시되어야 함 (-10.000초)', () => {
    mockGameState.finalTime = 50000; // 50초
    mockTimerState.personalBest = 60000; // 60초
    render(<RecordComparison />);
    expect(screen.getByText('-10.000s')).toBeInTheDocument();
  });

  it('기록 미달 시 느려진 시간 차이가 표시되어야 함 (+10.000초)', () => {
    mockGameState.finalTime = 70000; // 70초
    mockTimerState.personalBest = 60000; // 60초
    render(<RecordComparison />);
    expect(screen.getByText('+10.000s')).toBeInTheDocument();
  });

  it('동일 기록 시 "±0.000s"가 표시되어야 함', () => {
    mockGameState.finalTime = 60000;
    mockTimerState.personalBest = 60000;
    render(<RecordComparison />);
    expect(screen.getByText('±0.000s')).toBeInTheDocument();
  });

  it('신기록 시 녹색 텍스트여야 함 (text-green-500)', () => {
    mockGameState.finalTime = 50000;
    mockTimerState.personalBest = 60000;
    render(<RecordComparison />);
    const message = screen.getByText('New Record!');
    expect(message).toHaveClass('text-green-500');
  });

  it('첫 플레이 시 파란색 텍스트여야 함 (text-blue-500)', () => {
    mockGameState.finalTime = 60000;
    mockTimerState.personalBest = null;
    render(<RecordComparison />);
    const message = screen.getByText('First Play!');
    expect(message).toHaveClass('text-blue-500');
  });

  it('기록 미달 시 차이는 빨간색이어야 함 (text-red-500)', () => {
    mockGameState.finalTime = 70000;
    mockTimerState.personalBest = 60000;
    render(<RecordComparison />);
    const diff = screen.getByText('+10.000s');
    expect(diff).toHaveClass('text-red-500');
  });

  it('신기록 시 차이는 녹색이어야 함 (text-green-500)', () => {
    mockGameState.finalTime = 50000;
    mockTimerState.personalBest = 60000;
    render(<RecordComparison />);
    const diff = screen.getByText('-10.000s');
    expect(diff).toHaveClass('text-green-500');
  });

  it('가운데 정렬되어야 함 (text-center)', () => {
    mockGameState.finalTime = 60000;
    mockTimerState.personalBest = 70000;
    render(<RecordComparison />);
    const container = screen.getByTestId('record-comparison');
    expect(container).toHaveClass('text-center');
  });

  it('메시지는 큰 폰트여야 함 (text-3xl)', () => {
    mockGameState.finalTime = 50000;
    mockTimerState.personalBest = 60000;
    render(<RecordComparison />);
    const message = screen.getByText('New Record!');
    expect(message).toHaveClass('text-3xl');
  });

  it('차이 표시는 중간 폰트여야 함 (text-2xl)', () => {
    mockGameState.finalTime = 50000;
    mockTimerState.personalBest = 60000;
    render(<RecordComparison />);
    const diff = screen.getByText('-10.000s');
    expect(diff).toHaveClass('text-2xl');
  });
});
