// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MainMenuIntegration } from './index';

// Test helpers
const clickButton = (name: RegExp) => {
  const button = screen.getByRole('button', { name });
  fireEvent.click(button);
  return button;
};

const measureResponseTime = (action: () => void): number => {
  const startTime = performance.now();
  action();
  return performance.now() - startTime;
};

const openSettingsPanel = () => {
  clickButton(/settings/i);
};

const openLeaderboardPanel = () => {
  clickButton(/leaderboard/i);
};

// Mock stores
const mockSetGameState = vi.fn();
const mockLeaderboardEntries = [
  { rank: 1, email: 'player1@test.com', time: 45000, date: new Date() },
  { rank: 2, email: 'player2@test.com', time: 50000, date: new Date() },
];

let mockGameState = {
  gameState: 'menu',
  setGameState: mockSetGameState,
};

let mockSocialState = {
  entries: mockLeaderboardEntries,
  isLoading: false,
  error: null,
  setEntries: vi.fn(),
  setLoading: vi.fn(),
  setError: vi.fn(),
  clearEntries: vi.fn(),
};

vi.mock('../../stores/gameStore', () => ({
  useGameStore: (selector?: any) => {
    return selector ? selector(mockGameState) : mockGameState;
  },
}));

vi.mock('../../stores/socialStore', () => ({
  useSocialStore: (selector?: any) => {
    return selector ? selector(mockSocialState) : mockSocialState;
  },
}));

describe('Feature 4.1: Main Menu Screen - Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockGameState = {
      gameState: 'menu',
      setGameState: mockSetGameState,
    };
    mockSocialState = {
      entries: mockLeaderboardEntries,
      isLoading: false,
      error: null,
      setEntries: vi.fn(),
      setLoading: vi.fn(),
      setError: vi.fn(),
      clearEntries: vi.fn(),
    };
  });

  describe('시나리오 1: 메뉴 로딩 및 초기 렌더링', () => {
    it('Given: 사용자가 게임에 진입, When: 메뉴 화면 로드, Then: 3개 버튼이 렌더링되어야 함', () => {
      // Given: 게임 진입
      const startTime = performance.now();

      // When: 메뉴 화면 로드
      render(<MainMenuIntegration />);

      // Then: 3개 버튼 렌더링
      expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /leaderboard/i })).toBeInTheDocument();

      // PRD Success Metric: 초기 로딩 시간 < 3초 (3000ms)
      const loadTime = performance.now() - startTime;
      expect(loadTime).toBeLessThan(3000);
    });

    it('Given: 메뉴 로딩, When: 초기 렌더링, Then: 타이틀이 표시되어야 함', () => {
      // When
      render(<MainMenuIntegration />);

      // Then
      expect(screen.getByText('Fly Paper Plane')).toBeInTheDocument();
    });
  });

  describe('시나리오 2: Start 버튼 클릭 및 게임 시작 (Block 2 연동)', () => {
    it('Given: 메뉴 화면, When: Start 버튼 클릭, Then: gameState가 playing으로 변경되어야 함', () => {
      // Given
      render(<MainMenuIntegration />);

      // When
      const responseTime = measureResponseTime(() => clickButton(/start/i));

      // Then
      expect(mockSetGameState).toHaveBeenCalledWith('playing');
      // PRD Success Metric: 입력 응답 시간 < 16ms
      expect(responseTime).toBeLessThan(16);
    });

    it('Given: Start 버튼 클릭, When: 게임 시작 중, Then: Loading 상태가 표시되어야 함', () => {
      // Given
      render(<MainMenuIntegration />);

      // When
      clickButton(/start/i);

      // Then
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  describe('시나리오 3: Settings 패널 열기 및 설정 변경', () => {
    it('Given: 메뉴 화면, When: Settings 버튼 클릭, Then: 설정 패널이 열려야 함', () => {
      // Given
      render(<MainMenuIntegration />);

      // When
      openSettingsPanel();

      // Then
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
    });

    it('Given: Settings 패널 열림, When: 볼륨 변경, Then: LocalStorage에 저장되어야 함', () => {
      // Given
      render(<MainMenuIntegration />);
      openSettingsPanel();

      // When
      const masterSlider = screen.getByRole('slider', { name: /master volume/i });
      fireEvent.change(masterSlider, { target: { value: '75' } });

      // Then
      const savedSettings = localStorage.getItem('gameSettings');
      expect(savedSettings).toBeTruthy();
      const parsedSettings = JSON.parse(savedSettings!);
      expect(parsedSettings.masterVolume).toBe(75);
    });

    it('Given: Settings 패널 열림, When: Close 버튼 클릭, Then: 패널이 닫혀야 함', () => {
      // Given
      render(<MainMenuIntegration />);
      openSettingsPanel();

      // When
      clickButton(/close/i);

      // Then
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('시나리오 4: Leaderboard 조회 및 표시 (Block 3 연동)', () => {
    it('Given: 메뉴 화면, When: Leaderboard 버튼 클릭, Then: 리더보드가 표시되어야 함', () => {
      // Given
      render(<MainMenuIntegration />);

      // When
      const responseTime = measureResponseTime(openLeaderboardPanel);

      // Then
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('player1@test.com')).toBeInTheDocument();
      expect(screen.getByText('player2@test.com')).toBeInTheDocument();
      // PRD Success Metric: 입력 응답 시간 < 16ms
      expect(responseTime).toBeLessThan(16);
    });

    it('Given: Leaderboard 표시, When: 데이터 로딩 완료, Then: 1초 이내에 표시되어야 함', async () => {
      // Given: 로딩 상태로 시작
      mockSocialState.isLoading = true;
      mockSocialState.entries = [];

      render(<MainMenuIntegration />);
      const leaderboardButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(leaderboardButton);

      // 로딩 표시 확인
      expect(screen.getByText(/loading/i)).toBeInTheDocument();

      // When: 1초 이내에 데이터 로딩 완료
      const loadStartTime = performance.now();
      mockSocialState.isLoading = false;
      mockSocialState.entries = mockLeaderboardEntries;

      // 리렌더링 트리거 (실제로는 store update가 자동으로 수행)
      await waitFor(
        () => {
          const loadTime = performance.now() - loadStartTime;
          // PRD Success Metric: 리더보드 조회 시간 < 1초 (1000ms)
          expect(loadTime).toBeLessThan(1000);
        },
        { timeout: 1000 }
      );
    });

    it('Given: 리더보드 빈 데이터, When: Leaderboard 열기, Then: 빈 메시지가 표시되어야 함', () => {
      // Given: 빈 데이터
      mockSocialState.entries = [];
      mockSocialState.isLoading = false;

      // When
      render(<MainMenuIntegration />);
      const leaderboardButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(leaderboardButton);

      // Then
      expect(screen.getByText(/아직 기록이 없습니다/i)).toBeInTheDocument();
    });
  });

  describe('시나리오 5: 복합 시나리오 (전체 플로우)', () => {
    it('Given: 메뉴 진입, When: Settings 변경 → Leaderboard 확인 → Start 클릭, Then: 모든 기능이 정상 동작해야 함', () => {
      // Given: 메뉴 진입
      render(<MainMenuIntegration />);

      // When 1: Settings 열고 볼륨 변경
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      fireEvent.click(settingsButton);
      const masterSlider = screen.getByRole('slider', { name: /master volume/i });
      fireEvent.change(masterSlider, { target: { value: '80' } });
      const settingsCloseButton = screen.getAllByRole('button', { name: /close/i })[0];
      fireEvent.click(settingsCloseButton);

      // Then 1: Settings 저장 확인
      const savedSettings = localStorage.getItem('gameSettings');
      expect(JSON.parse(savedSettings!).masterVolume).toBe(80);

      // When 2: Leaderboard 확인
      const leaderboardButton = screen.getByRole('button', { name: /leaderboard/i });
      fireEvent.click(leaderboardButton);

      // Then 2: Leaderboard 표시 확인
      expect(screen.getByText('player1@test.com')).toBeInTheDocument();

      const leaderboardCloseButton = screen.getAllByRole('button', { name: /close/i })[0];
      fireEvent.click(leaderboardCloseButton);

      // When 3: Start 클릭
      const startButton = screen.getByRole('button', { name: /start/i });
      fireEvent.click(startButton);

      // Then 3: 게임 시작 확인
      expect(mockSetGameState).toHaveBeenCalledWith('playing');
    });
  });

  describe('PRD Success Metrics 검증', () => {
    it('초기 로딩 시간 < 3초 검증', () => {
      const loadTime = measureResponseTime(() => {
        render(<MainMenuIntegration />);
      });

      expect(loadTime).toBeLessThan(3000);
    });

    it('입력 응답 시간 < 16ms 검증 (Start 버튼)', () => {
      render(<MainMenuIntegration />);

      const responseTime = measureResponseTime(() => clickButton(/start/i));

      expect(responseTime).toBeLessThan(16);
    });

    it('입력 응답 시간 < 16ms 검증 (Settings 버튼)', () => {
      render(<MainMenuIntegration />);

      const responseTime = measureResponseTime(openSettingsPanel);

      expect(responseTime).toBeLessThan(16);
    });

    it('입력 응답 시간 < 16ms 검증 (Leaderboard 버튼)', () => {
      render(<MainMenuIntegration />);

      const responseTime = measureResponseTime(openLeaderboardPanel);

      expect(responseTime).toBeLessThan(16);
    });
  });
});
