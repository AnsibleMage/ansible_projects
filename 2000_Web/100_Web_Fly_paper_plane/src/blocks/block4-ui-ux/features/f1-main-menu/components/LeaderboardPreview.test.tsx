import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LeaderboardPreview } from './LeaderboardPreview';

// Mock Leaderboard Store
const mockEntries = [
  { rank: 1, email: 'player1@test.com', time: 45000, date: new Date('2025-01-01') },
  { rank: 2, email: 'player2@test.com', time: 50000, date: new Date('2025-01-02') },
  { rank: 3, email: 'player3@test.com', time: 55000, date: new Date('2025-01-03') },
];

let mockState = {
  entries: mockEntries,
  isLoading: false,
  error: null,
  setEntries: vi.fn(),
  setLoading: vi.fn(),
  setError: vi.fn(),
  clearEntries: vi.fn(),
};

vi.mock('../../../stores/socialStore', () => ({
  useSocialStore: (selector?: any) => {
    return selector ? selector(mockState) : mockState;
  },
}));

describe('LeaderboardPreview Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // 기본 상태로 리셋
    mockState = {
      entries: mockEntries,
      isLoading: false,
      error: null,
      setEntries: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      clearEntries: vi.fn(),
    };
  });

  describe('렌더링 및 열기/닫기', () => {
    it('패널이 닫힌 상태로 시작해야 함', () => {
      render(<LeaderboardPreview />);

      const panel = screen.queryByRole('dialog');
      expect(panel).not.toBeInTheDocument();
    });

    it('Leaderboard 버튼 클릭 시 패널이 열려야 함', () => {
      render(<LeaderboardPreview />);

      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      const panel = screen.getByRole('dialog');
      expect(panel).toBeInTheDocument();
    });

    it('Close 버튼 클릭 시 패널이 닫혀야 함', () => {
      render(<LeaderboardPreview />);

      // 패널 열기
      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      // 패널 닫기
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);

      const panel = screen.queryByRole('dialog');
      expect(panel).not.toBeInTheDocument();
    });
  });

  describe('리더보드 데이터 표시', () => {
    it('표 헤더가 렌더링되어야 함', () => {
      render(<LeaderboardPreview />);

      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      expect(screen.getByText('Rank')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Time')).toBeInTheDocument();
    });

    it('리더보드 엔트리가 표시되어야 함', () => {
      render(<LeaderboardPreview />);

      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('player1@test.com')).toBeInTheDocument();
      expect(screen.getByText('00:45')).toBeInTheDocument();

      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('player2@test.com')).toBeInTheDocument();
      expect(screen.getByText('00:50')).toBeInTheDocument();
    });

    it('상위 10개 엔트리만 표시되어야 함', () => {
      // 15개 엔트리로 mock 수정
      const manyEntries = Array.from({ length: 15 }, (_, i) => ({
        rank: i + 1,
        email: `player${i + 1}@test.com`,
        time: 45000 + i * 1000,
        date: new Date(),
      }));

      mockState.entries = manyEntries;

      render(<LeaderboardPreview />);

      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      // 10번째 엔트리는 있어야 함
      expect(screen.getByText('player10@test.com')).toBeInTheDocument();

      // 11번째 엔트리는 없어야 함
      expect(screen.queryByText('player11@test.com')).not.toBeInTheDocument();
    });
  });

  describe('로딩 상태', () => {
    it('로딩 중일 때 스피너가 표시되어야 함', () => {
      // 로딩 상태로 mock 수정
      mockState.isLoading = true;
      mockState.entries = [];

      render(<LeaderboardPreview />);

      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  describe('빈 데이터 처리', () => {
    it('엔트리가 없을 때 메시지가 표시되어야 함', () => {
      // 빈 데이터로 mock 수정
      mockState.entries = [];
      mockState.isLoading = false;

      render(<LeaderboardPreview />);

      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      expect(screen.getByText(/아직 기록이 없습니다/i)).toBeInTheDocument();
    });
  });

  describe('시간 포맷팅', () => {
    it('밀리초를 mm:ss 형식으로 변환해야 함', () => {
      render(<LeaderboardPreview />);

      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      // 45000ms = 45초 = 00:45
      expect(screen.getByText('00:45')).toBeInTheDocument();
      // 50000ms = 50초 = 00:50
      expect(screen.getByText('00:50')).toBeInTheDocument();
      // 55000ms = 55초 = 00:55
      expect(screen.getByText('00:55')).toBeInTheDocument();
    });

    it('1자리 숫자에 0을 패딩해야 함', () => {
      // 5초 테스트
      mockState.entries = [
        { rank: 1, email: 'test@test.com', time: 5000, date: new Date() },
      ];

      render(<LeaderboardPreview />);

      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      // 5000ms = 5초 = 00:05 (0 패딩 필수)
      expect(screen.getByText('00:05')).toBeInTheDocument();
    });

    it('분과 초 모두 0 패딩이 적용되어야 함', () => {
      // 65초 테스트
      mockState.entries = [
        { rank: 1, email: 'test@test.com', time: 65000, date: new Date() },
      ];

      render(<LeaderboardPreview />);

      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      // 65000ms = 65초 = 01:05
      expect(screen.getByText('01:05')).toBeInTheDocument();
    });
  });

  describe('복합 조건 검증', () => {
    it('로딩 중이 아니고 데이터가 있을 때만 테이블 표시', () => {
      mockState.isLoading = false;
      mockState.entries = mockEntries;

      render(<LeaderboardPreview />);

      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      // 테이블이 표시되어야 함
      expect(screen.getByText('Rank')).toBeInTheDocument();
      expect(screen.getByText('player1@test.com')).toBeInTheDocument();

      // 로딩/빈 데이터 메시지는 없어야 함
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/아직 기록이 없습니다/i)).not.toBeInTheDocument();
    });

    it('로딩 중이면 빈 데이터 메시지가 표시되지 않아야 함', () => {
      mockState.isLoading = true;
      mockState.entries = [];

      render(<LeaderboardPreview />);

      const openButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(openButton);

      // 로딩 메시지만 표시
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
      // 빈 데이터 메시지는 표시되지 않음
      expect(screen.queryByText(/아직 기록이 없습니다/i)).not.toBeInTheDocument();
    });
  });
});
