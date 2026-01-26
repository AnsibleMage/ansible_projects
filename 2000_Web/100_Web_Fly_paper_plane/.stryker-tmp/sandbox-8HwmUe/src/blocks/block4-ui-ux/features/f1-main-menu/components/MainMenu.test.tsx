// @ts-nocheck
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MainMenu } from './MainMenu';

describe('MainMenu Component', () => {
  describe('렌더링', () => {
    it('MainMenu 컴포넌트가 렌더링되어야 함', () => {
      render(<MainMenu />);

      // MainMenu 컨테이너가 존재하는지 확인
      const menuContainer = screen.getByTestId('main-menu');
      expect(menuContainer).toBeInTheDocument();
    });

    it('타이틀 "Fly Paper Plane"이 표시되어야 함', () => {
      render(<MainMenu />);

      // 타이틀 텍스트 확인
      const title = screen.getByText('Fly Paper Plane');
      expect(title).toBeInTheDocument();
    });

    it('3개의 버튼(Start, Settings, Leaderboard)이 표시되어야 함', () => {
      render(<MainMenu />);

      // Start 버튼
      const startButton = screen.getByRole('button', { name: /start/i });
      expect(startButton).toBeInTheDocument();

      // Settings 버튼
      const settingsButton = screen.getByRole('button', { name: /settings/i });
      expect(settingsButton).toBeInTheDocument();

      // Leaderboard 버튼
      const leaderboardButton = screen.getByRole('button', { name: /leaderboard/i });
      expect(leaderboardButton).toBeInTheDocument();
    });
  });

  describe('레이아웃', () => {
    it('중앙 정렬 레이아웃이 적용되어야 함', () => {
      render(<MainMenu />);

      const menuContainer = screen.getByTestId('main-menu');

      // Tailwind의 flex 클래스가 적용되었는지 확인
      expect(menuContainer.className).toContain('flex');
      expect(menuContainer.className).toContain('items-center');
      expect(menuContainer.className).toContain('justify-center');
    });
  });
});
