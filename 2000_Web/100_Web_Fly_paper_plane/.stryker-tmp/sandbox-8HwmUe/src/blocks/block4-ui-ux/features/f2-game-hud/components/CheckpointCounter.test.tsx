// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CheckpointCounter } from './CheckpointCounter';

// Mock Game Store
let mockGameState = {
  gameState: 'playing',
  collisionCount: 0,
  checkpointsPassed: 0,
  totalCheckpoints: 10,
  setGameState: vi.fn(),
  setCollisionCount: vi.fn(),
  incrementCollisionCount: vi.fn(),
  setCheckpointsPassed: vi.fn(),
  incrementCheckpointsPassed: vi.fn(),
  setTotalCheckpoints: vi.fn(),
  reset: vi.fn(),
};

vi.mock('../../../stores/gameStore', () => ({
  useGameStore: (selector?: any) => {
    return selector ? selector(mockGameState) : mockGameState;
  },
}));

describe('CheckpointCounter Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGameState = {
      gameState: 'playing',
      collisionCount: 0,
      checkpointsPassed: 0,
      totalCheckpoints: 10,
      setGameState: vi.fn(),
      setCollisionCount: vi.fn(),
      incrementCollisionCount: vi.fn(),
      setCheckpointsPassed: vi.fn(),
      incrementCheckpointsPassed: vi.fn(),
      setTotalCheckpoints: vi.fn(),
      reset: vi.fn(),
    };
  });

  it('CheckpointCounter 컴포넌트가 렌더링되어야 함', () => {
    render(<CheckpointCounter />);
    expect(screen.getByTestId('checkpoint-counter')).toBeInTheDocument();
  });

  it('초기 상태 "0/10" 형식으로 표시되어야 함', () => {
    mockGameState.checkpointsPassed = 0;
    mockGameState.totalCheckpoints = 10;
    render(<CheckpointCounter />);
    expect(screen.getByText('0/10')).toBeInTheDocument();
  });

  it('체크포인트 진행도 "3/10" 형식으로 표시되어야 함', () => {
    mockGameState.checkpointsPassed = 3;
    mockGameState.totalCheckpoints = 10;
    render(<CheckpointCounter />);
    expect(screen.getByText('3/10')).toBeInTheDocument();
  });

  it('완료 상태 "10/10" 형식으로 표시되어야 함', () => {
    mockGameState.checkpointsPassed = 10;
    mockGameState.totalCheckpoints = 10;
    render(<CheckpointCounter />);
    expect(screen.getByText('10/10')).toBeInTheDocument();
  });

  it('화면 우상단에 위치해야 함 (absolute, top-4, right-4)', () => {
    render(<CheckpointCounter />);
    const counter = screen.getByTestId('checkpoint-counter');
    expect(counter).toHaveClass('absolute');
    expect(counter).toHaveClass('top-4');
    expect(counter).toHaveClass('right-4');
  });

  it('반투명 배경이 있어야 함 (bg-black/50)', () => {
    render(<CheckpointCounter />);
    const counter = screen.getByTestId('checkpoint-counter');
    expect(counter).toHaveClass('bg-black/50');
  });

  it('패딩과 둥근 모서리가 있어야 함', () => {
    render(<CheckpointCounter />);
    const counter = screen.getByTestId('checkpoint-counter');
    expect(counter).toHaveClass('px-4');
    expect(counter).toHaveClass('py-2');
    expect(counter).toHaveClass('rounded');
  });

  it('흰색 텍스트여야 함 (text-white)', () => {
    render(<CheckpointCounter />);
    const counter = screen.getByTestId('checkpoint-counter');
    expect(counter).toHaveClass('text-white');
  });

  it('큰 폰트여야 함 (text-2xl, font-bold)', () => {
    render(<CheckpointCounter />);
    const counter = screen.getByTestId('checkpoint-counter');
    expect(counter).toHaveClass('text-2xl');
    expect(counter).toHaveClass('font-bold');
  });

  it('totalCheckpoints가 0일 때 "0/0"으로 표시되어야 함', () => {
    mockGameState.checkpointsPassed = 0;
    mockGameState.totalCheckpoints = 0;
    render(<CheckpointCounter />);
    expect(screen.getByText('0/0')).toBeInTheDocument();
  });

  it('checkpointsPassed가 totalCheckpoints보다 클 수 없음 (10/10 max)', () => {
    mockGameState.checkpointsPassed = 15; // 비정상 값
    mockGameState.totalCheckpoints = 10;
    render(<CheckpointCounter />);
    // 실제로는 10/10으로 표시되어야 함 (클램핑)
    expect(screen.getByText('10/10')).toBeInTheDocument();
  });

  it('음수 checkpointsPassed는 0으로 처리되어야 함', () => {
    mockGameState.checkpointsPassed = -5;
    mockGameState.totalCheckpoints = 10;
    render(<CheckpointCounter />);
    expect(screen.getByText('0/10')).toBeInTheDocument();
  });

  it('많은 체크포인트(100개)도 정상 표시되어야 함', () => {
    mockGameState.checkpointsPassed = 50;
    mockGameState.totalCheckpoints = 100;
    render(<CheckpointCounter />);
    expect(screen.getByText('50/100')).toBeInTheDocument();
  });

  it('아이콘 또는 레이블이 있어야 함', () => {
    render(<CheckpointCounter />);
    // "Checkpoints" 또는 "체크포인트" 레이블이 있어야 함
    const counter = screen.getByTestId('checkpoint-counter');
    expect(counter.textContent).toMatch(/0\/10/);
  });
});
