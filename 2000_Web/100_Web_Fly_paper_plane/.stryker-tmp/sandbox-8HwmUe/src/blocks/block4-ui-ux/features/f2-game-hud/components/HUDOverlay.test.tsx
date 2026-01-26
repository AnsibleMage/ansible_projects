// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HUDOverlay } from './HUDOverlay';

// Mock all HUD components
vi.mock('./SpeedIndicator', () => ({
  SpeedIndicator: () => <div data-testid="speed-indicator">Speed</div>,
}));

vi.mock('./TimerDisplay', () => ({
  TimerDisplay: () => <div data-testid="timer-display">Timer</div>,
}));

vi.mock('./CheckpointCounter', () => ({
  CheckpointCounter: () => <div data-testid="checkpoint-counter">Checkpoint</div>,
}));

vi.mock('./BestTimeGhost', () => ({
  BestTimeGhost: () => <div data-testid="best-time-ghost">Ghost</div>,
}));

describe('HUDOverlay Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('HUDOverlay 컴포넌트가 렌더링되어야 함', () => {
    render(<HUDOverlay />);
    expect(screen.getByTestId('hud-overlay')).toBeInTheDocument();
  });

  it('SpeedIndicator 컴포넌트가 포함되어야 함', () => {
    render(<HUDOverlay />);
    expect(screen.getByTestId('speed-indicator')).toBeInTheDocument();
  });

  it('TimerDisplay 컴포넌트가 포함되어야 함', () => {
    render(<HUDOverlay />);
    expect(screen.getByTestId('timer-display')).toBeInTheDocument();
  });

  it('CheckpointCounter 컴포넌트가 포함되어야 함', () => {
    render(<HUDOverlay />);
    expect(screen.getByTestId('checkpoint-counter')).toBeInTheDocument();
  });

  it('BestTimeGhost 컴포넌트가 포함되어야 함', () => {
    render(<HUDOverlay />);
    expect(screen.getByTestId('best-time-ghost')).toBeInTheDocument();
  });

  it('Canvas 위에 오버레이되어야 함 (fixed, inset-0)', () => {
    render(<HUDOverlay />);
    const overlay = screen.getByTestId('hud-overlay');
    expect(overlay).toHaveClass('fixed');
    expect(overlay).toHaveClass('inset-0');
  });

  it('포인터 이벤트를 차단하지 않아야 함 (pointer-events-none)', () => {
    render(<HUDOverlay />);
    const overlay = screen.getByTestId('hud-overlay');
    expect(overlay).toHaveClass('pointer-events-none');
  });

  it('높은 z-index를 가져야 함 (z-10)', () => {
    render(<HUDOverlay />);
    const overlay = screen.getByTestId('hud-overlay');
    expect(overlay).toHaveClass('z-10');
  });

  it('4개의 자식 컴포넌트가 모두 렌더링되어야 함', () => {
    render(<HUDOverlay />);
    expect(screen.getByTestId('speed-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('timer-display')).toBeInTheDocument();
    expect(screen.getByTestId('checkpoint-counter')).toBeInTheDocument();
    expect(screen.getByTestId('best-time-ghost')).toBeInTheDocument();
  });

  it('HUD 컨테이너는 relative positioning이어야 함', () => {
    render(<HUDOverlay />);
    const overlay = screen.getByTestId('hud-overlay');
    expect(overlay).toHaveClass('relative');
  });

  it('전체 화면을 차지해야 함 (w-full, h-full)', () => {
    render(<HUDOverlay />);
    const overlay = screen.getByTestId('hud-overlay');
    expect(overlay).toHaveClass('w-full');
    expect(overlay).toHaveClass('h-full');
  });
});
