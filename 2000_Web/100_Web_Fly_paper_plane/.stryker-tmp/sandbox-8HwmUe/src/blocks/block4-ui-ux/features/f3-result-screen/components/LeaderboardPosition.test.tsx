// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LeaderboardPosition } from './LeaderboardPosition';

// Mock Social Store
let mockSocialState = {
  currentUser: null,
  entries: [],
  isLoading: false,
  error: null,
  setCurrentUser: vi.fn(),
  addEntry: vi.fn(),
  loadEntries: vi.fn(),
  clearEntries: vi.fn(),
};

vi.mock('../../../stores/socialStore', () => ({
  useSocialStore: (selector?: any) => {
    return selector ? selector(mockSocialState) : mockSocialState;
  },
}));

describe('LeaderboardPosition Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSocialState = {
      currentUser: null,
      entries: [],
      isLoading: false,
      error: null,
      setCurrentUser: vi.fn(),
      addEntry: vi.fn(),
      loadEntries: vi.fn(),
      clearEntries: vi.fn(),
    };
  });

  it('LeaderboardPosition 컴포넌트가 렌더링되어야 함', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 5 };
    render(<LeaderboardPosition />);
    expect(screen.getByTestId('leaderboard-position')).toBeInTheDocument();
  });

  it('사용자가 없으면 렌더링하지 않아야 함', () => {
    mockSocialState.currentUser = null;
    render(<LeaderboardPosition />);
    expect(screen.queryByTestId('leaderboard-position')).not.toBeInTheDocument();
  });

  it('순위가 "You ranked #5!" 형식으로 표시되어야 함', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 5 };
    render(<LeaderboardPosition />);
    expect(screen.getByText('You ranked #5!')).toBeInTheDocument();
  });

  it('1등은 "You ranked #1!" 형식으로 표시되어야 함', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 1 };
    render(<LeaderboardPosition />);
    expect(screen.getByText('You ranked #1!')).toBeInTheDocument();
  });

  it('1등이면 금메달 이모지가 표시되어야 함 (🥇)', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 1 };
    render(<LeaderboardPosition />);
    expect(screen.getByText('🥇')).toBeInTheDocument();
  });

  it('2등이면 은메달 이모지가 표시되어야 함 (🥈)', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 2 };
    render(<LeaderboardPosition />);
    expect(screen.getByText('🥈')).toBeInTheDocument();
  });

  it('3등이면 동메달 이모지가 표시되어야 함 (🥉)', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 3 };
    render(<LeaderboardPosition />);
    expect(screen.getByText('🥉')).toBeInTheDocument();
  });

  it('4등 이하는 메달이 표시되지 않아야 함', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 4 };
    render(<LeaderboardPosition />);
    expect(screen.queryByText('🥇')).not.toBeInTheDocument();
    expect(screen.queryByText('🥈')).not.toBeInTheDocument();
    expect(screen.queryByText('🥉')).not.toBeInTheDocument();
  });

  it('1-3등이면 금색 텍스트여야 함 (text-yellow-500)', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 1 };
    render(<LeaderboardPosition />);
    const rankText = screen.getByText('You ranked #1!');
    expect(rankText).toHaveClass('text-yellow-500');
  });

  it('4-10등이면 흰색 텍스트여야 함 (text-white)', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 5 };
    render(<LeaderboardPosition />);
    const rankText = screen.getByText('You ranked #5!');
    expect(rankText).toHaveClass('text-white');
  });

  it('11등 이하면 회색 텍스트여야 함 (text-gray-400)', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 15 };
    render(<LeaderboardPosition />);
    const rankText = screen.getByText('You ranked #15!');
    expect(rankText).toHaveClass('text-gray-400');
  });

  it('가운데 정렬되어야 함 (text-center)', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 5 };
    render(<LeaderboardPosition />);
    const container = screen.getByTestId('leaderboard-position');
    expect(container).toHaveClass('text-center');
  });

  it('순위 텍스트는 큰 폰트여야 함 (text-2xl)', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 5 };
    render(<LeaderboardPosition />);
    const rankText = screen.getByText('You ranked #5!');
    expect(rankText).toHaveClass('text-2xl');
  });

  it('메달은 더 큰 폰트여야 함 (text-4xl)', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 1 };
    render(<LeaderboardPosition />);
    const medal = screen.getByText('🥇');
    expect(medal).toHaveClass('text-4xl');
  });

  it('100등도 정상 표시되어야 함', () => {
    mockSocialState.currentUser = { email: 'test@test.com', rank: 100 };
    render(<LeaderboardPosition />);
    expect(screen.getByText('You ranked #100!')).toBeInTheDocument();
  });
});
