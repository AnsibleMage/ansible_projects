import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultButtons } from './ResultButtons';

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

describe('ResultButtons Component', () => {
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

  it('ResultButtons 컴포넌트가 렌더링되어야 함', () => {
    render(<ResultButtons />);
    expect(screen.getByTestId('result-buttons')).toBeInTheDocument();
  });

  it('Retry 버튼이 표시되어야 함', () => {
    render(<ResultButtons />);
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('Main Menu 버튼이 표시되어야 함', () => {
    render(<ResultButtons />);
    expect(screen.getByText('Main Menu')).toBeInTheDocument();
  });

  it('Retry 버튼 클릭 시 reset()이 호출되어야 함', () => {
    render(<ResultButtons />);
    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);
    expect(mockGameState.reset).toHaveBeenCalledTimes(1);
  });

  it('Retry 버튼 클릭 시 gameState가 "playing"으로 변경되어야 함', () => {
    render(<ResultButtons />);
    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);
    expect(mockGameState.setGameState).toHaveBeenCalledWith('playing');
  });

  it('Main Menu 버튼 클릭 시 reset()이 호출되어야 함', () => {
    render(<ResultButtons />);
    const menuButton = screen.getByText('Main Menu');
    fireEvent.click(menuButton);
    expect(mockGameState.reset).toHaveBeenCalledTimes(1);
  });

  it('Main Menu 버튼 클릭 시 gameState가 "menu"로 변경되어야 함', () => {
    render(<ResultButtons />);
    const menuButton = screen.getByText('Main Menu');
    fireEvent.click(menuButton);
    expect(mockGameState.setGameState).toHaveBeenCalledWith('menu');
  });

  it('버튼들이 가로로 배치되어야 함 (flex, gap-4)', () => {
    render(<ResultButtons />);
    const container = screen.getByTestId('result-buttons');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('gap-4');
  });

  it('버튼들이 가운데 정렬되어야 함 (justify-center)', () => {
    render(<ResultButtons />);
    const container = screen.getByTestId('result-buttons');
    expect(container).toHaveClass('justify-center');
  });

  it('Retry 버튼은 primary 스타일이어야 함 (bg-blue-600)', () => {
    render(<ResultButtons />);
    const retryButton = screen.getByText('Retry');
    expect(retryButton).toHaveClass('bg-blue-600');
  });

  it('Main Menu 버튼은 secondary 스타일이어야 함 (bg-gray-600)', () => {
    render(<ResultButtons />);
    const menuButton = screen.getByText('Main Menu');
    expect(menuButton).toHaveClass('bg-gray-600');
  });

  it('버튼에 hover 효과가 있어야 함 (hover:bg-)', () => {
    render(<ResultButtons />);
    const retryButton = screen.getByText('Retry');
    expect(retryButton.className).toContain('hover:');
  });

  it('버튼은 큰 폰트여야 함 (text-xl)', () => {
    render(<ResultButtons />);
    const retryButton = screen.getByText('Retry');
    expect(retryButton).toHaveClass('text-xl');
  });

  it('버튼은 패딩이 있어야 함 (px-8, py-3)', () => {
    render(<ResultButtons />);
    const retryButton = screen.getByText('Retry');
    expect(retryButton).toHaveClass('px-8');
    expect(retryButton).toHaveClass('py-3');
  });

  it('버튼은 둥근 모서리여야 함 (rounded-lg)', () => {
    render(<ResultButtons />);
    const retryButton = screen.getByText('Retry');
    expect(retryButton).toHaveClass('rounded-lg');
  });
});
