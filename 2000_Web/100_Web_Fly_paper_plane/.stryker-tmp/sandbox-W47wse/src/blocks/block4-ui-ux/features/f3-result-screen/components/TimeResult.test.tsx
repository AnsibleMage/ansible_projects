// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimeResult } from './TimeResult';

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

vi.mock('../../../stores/gameStore', () => ({
  useGameStore: (selector?: any) => {
    return selector ? selector(mockGameState) : mockGameState;
  },
}));

describe('TimeResult Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  it('TimeResult 컴포넌트가 렌더링되어야 함', () => {
    mockGameState.finalTime = 60000; // 1분
    render(<TimeResult />);
    expect(screen.getByTestId('time-result')).toBeInTheDocument();
  });

  it('"Final Time" 레이블이 표시되어야 함', () => {
    mockGameState.finalTime = 60000;
    render(<TimeResult />);
    expect(screen.getByText('Final Time')).toBeInTheDocument();
  });

  it('완주 시간이 MM:SS.mmm 포맷으로 표시되어야 함', () => {
    mockGameState.finalTime = 60000; // 1분
    render(<TimeResult />);
    expect(screen.getByText('01:00.000')).toBeInTheDocument();
  });

  it('1.5초가 "00:01.500"으로 표시되어야 함', () => {
    mockGameState.finalTime = 1500;
    render(<TimeResult />);
    expect(screen.getByText('00:01.500')).toBeInTheDocument();
  });

  it('90.123초가 "01:30.123"으로 표시되어야 함', () => {
    mockGameState.finalTime = 90123;
    render(<TimeResult />);
    expect(screen.getByText('01:30.123')).toBeInTheDocument();
  });

  it('0초가 "00:00.000"으로 표시되어야 함', () => {
    mockGameState.finalTime = 0;
    render(<TimeResult />);
    expect(screen.getByText('00:00.000')).toBeInTheDocument();
  });

  it('100분 이상도 정상 표시되어야 함 (120분 = "120:00.000")', () => {
    mockGameState.finalTime = 7200000; // 120분
    render(<TimeResult />);
    expect(screen.getByText('120:00.000')).toBeInTheDocument();
  });

  it('밀리초가 3자리로 패딩되어야 함 (50ms → 050)', () => {
    mockGameState.finalTime = 50; // 50ms
    render(<TimeResult />);
    expect(screen.getByText('00:00.050')).toBeInTheDocument();
  });

  it('분과 초가 2자리로 패딩되어야 함 (5분 3초 → "05:03")', () => {
    mockGameState.finalTime = 303000; // 5분 3초
    render(<TimeResult />);
    expect(screen.getByText('05:03.000')).toBeInTheDocument();
  });

  it('큰 폰트여야 함 (text-6xl)', () => {
    mockGameState.finalTime = 60000;
    render(<TimeResult />);
    const timeElement = screen.getByText('01:00.000');
    expect(timeElement).toHaveClass('text-6xl');
  });

  it('굵은 폰트여야 함 (font-bold)', () => {
    mockGameState.finalTime = 60000;
    render(<TimeResult />);
    const timeElement = screen.getByText('01:00.000');
    expect(timeElement).toHaveClass('font-bold');
  });

  it('흰색 텍스트여야 함 (text-white)', () => {
    mockGameState.finalTime = 60000;
    render(<TimeResult />);
    const timeElement = screen.getByText('01:00.000');
    expect(timeElement).toHaveClass('text-white');
  });

  it('가운데 정렬되어야 함 (text-center)', () => {
    mockGameState.finalTime = 60000;
    render(<TimeResult />);
    const container = screen.getByTestId('time-result');
    expect(container).toHaveClass('text-center');
  });

  it('레이블은 작은 폰트여야 함 (text-xl)', () => {
    mockGameState.finalTime = 60000;
    render(<TimeResult />);
    const label = screen.getByText('Final Time');
    expect(label).toHaveClass('text-xl');
  });

  it('레이블은 회색이어야 함 (text-gray-400)', () => {
    mockGameState.finalTime = 60000;
    render(<TimeResult />);
    const label = screen.getByText('Final Time');
    expect(label).toHaveClass('text-gray-400');
  });
});
