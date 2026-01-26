import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StartButton } from './StartButton';

// Mock zustand store
const mockSetGameState = vi.fn();

vi.mock('../../../stores/gameStore', () => ({
  useGameStore: (selector?: any) => {
    const state = {
      gameState: 'menu',
      setGameState: mockSetGameState,
    };
    return selector ? selector(state) : state;
  },
}));

describe('StartButton Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('렌더링', () => {
    it('Start 버튼이 렌더링되어야 함', () => {
      render(<StartButton />);

      const button = screen.getByRole('button', { name: /start/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('게임 시작 동작', () => {
    it('클릭 시 gameState가 playing으로 변경되어야 함', () => {
      render(<StartButton />);

      const button = screen.getByRole('button', { name: /start/i });
      fireEvent.click(button);

      expect(mockSetGameState).toHaveBeenCalledWith('playing');
    });
  });

  describe('로딩 상태', () => {
    it('클릭 후 로딩 상태를 표시해야 함', () => {
      render(<StartButton />);

      const button = screen.getByRole('button', { name: /start/i });
      fireEvent.click(button);

      // 로딩 중일 때는 "Loading..." 또는 로딩 표시가 있어야 함
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('로딩 중에는 버튼이 비활성화되어야 함', () => {
      render(<StartButton />);

      const button = screen.getByRole('button', { name: /start/i });
      fireEvent.click(button);

      expect(button).toBeDisabled();
    });
  });
});
