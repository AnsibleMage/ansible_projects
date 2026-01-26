// @ts-nocheck
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpeedIndicator } from './SpeedIndicator';

// Mock Flight Store
let mockFlightState = {
  currentSpeed: 0,
  setSpeed: vi.fn(),
};

vi.mock('../../../stores/flightStore', () => ({
  useFlightStore: (selector?: any) => {
    return selector ? selector(mockFlightState) : mockFlightState;
  },
}));

describe('SpeedIndicator Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFlightState = {
      currentSpeed: 0,
      setSpeed: vi.fn(),
    };
  });

  it('SpeedIndicator 컴포넌트가 렌더링되어야 함', () => {
    render(<SpeedIndicator />);
    expect(screen.getByTestId('speed-indicator')).toBeInTheDocument();
  });

  it('속도가 "0 km/h" 형식으로 표시되어야 함', () => {
    mockFlightState.currentSpeed = 0;
    render(<SpeedIndicator />);
    expect(screen.getByText('0 km/h')).toBeInTheDocument();
  });

  it('속도가 "150 km/h" 형식으로 표시되어야 함', () => {
    mockFlightState.currentSpeed = 150;
    render(<SpeedIndicator />);
    expect(screen.getByText('150 km/h')).toBeInTheDocument();
  });

  it('속도가 소수점 없이 정수로 표시되어야 함', () => {
    mockFlightState.currentSpeed = 150.789;
    render(<SpeedIndicator />);
    expect(screen.getByText('151 km/h')).toBeInTheDocument();
  });

  it('느린 속도(< 50)는 파란색이어야 함', () => {
    mockFlightState.currentSpeed = 30;
    render(<SpeedIndicator />);
    const indicator = screen.getByTestId('speed-indicator');
    expect(indicator).toHaveClass('text-blue-500');
  });

  it('중간 속도(50-150)는 노란색이어야 함', () => {
    mockFlightState.currentSpeed = 100;
    render(<SpeedIndicator />);
    const indicator = screen.getByTestId('speed-indicator');
    expect(indicator).toHaveClass('text-yellow-500');
  });

  it('빠른 속도(> 150)는 빨간색이어야 함', () => {
    mockFlightState.currentSpeed = 200;
    render(<SpeedIndicator />);
    const indicator = screen.getByTestId('speed-indicator');
    expect(indicator).toHaveClass('text-red-500');
  });

  it('좌상단에 위치해야 함 (absolute, top-4, left-4)', () => {
    render(<SpeedIndicator />);
    const indicator = screen.getByTestId('speed-indicator');
    expect(indicator).toHaveClass('absolute');
    expect(indicator).toHaveClass('top-4');
    expect(indicator).toHaveClass('left-4');
  });

  it('반투명 배경이 있어야 함 (bg-black/50)', () => {
    render(<SpeedIndicator />);
    const indicator = screen.getByTestId('speed-indicator');
    expect(indicator).toHaveClass('bg-black/50');
  });

  it('패딩과 둥근 모서리가 있어야 함', () => {
    render(<SpeedIndicator />);
    const indicator = screen.getByTestId('speed-indicator');
    expect(indicator).toHaveClass('px-4');
    expect(indicator).toHaveClass('py-2');
    expect(indicator).toHaveClass('rounded');
  });

  it('음수 속도는 0으로 표시되어야 함', () => {
    mockFlightState.currentSpeed = -10;
    render(<SpeedIndicator />);
    expect(screen.getByText('0 km/h')).toBeInTheDocument();
  });

  it('매우 큰 속도(1000+)도 정상 표시되어야 함', () => {
    mockFlightState.currentSpeed = 9999;
    render(<SpeedIndicator />);
    expect(screen.getByText('9999 km/h')).toBeInTheDocument();
  });
});
