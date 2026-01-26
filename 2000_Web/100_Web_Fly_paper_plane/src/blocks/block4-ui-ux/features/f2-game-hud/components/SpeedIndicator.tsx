import { useFlightStore } from '../../../stores/flightStore';

const SPEED_THRESHOLDS = {
  SLOW: 50,
  FAST: 150,
} as const;

const SPEED_COLORS = {
  SLOW: 'text-blue-500',
  MEDIUM: 'text-yellow-500',
  FAST: 'text-red-500',
} as const;

const SPEED_UNIT = 'km/h';

const BASE_STYLES = 'absolute top-4 left-4 bg-black/50 px-4 py-2 rounded';

const getSpeedColor = (speed: number): string => {
  if (speed < SPEED_THRESHOLDS.SLOW) {
    return SPEED_COLORS.SLOW;
  }
  if (speed < SPEED_THRESHOLDS.FAST) {
    return SPEED_COLORS.MEDIUM;
  }
  return SPEED_COLORS.FAST;
};

export const SpeedIndicator = () => {
  const currentSpeed = useFlightStore((state) => state.currentSpeed);

  // 음수 속도는 0으로 처리
  const displaySpeed = Math.max(0, currentSpeed);

  // 소수점 반올림
  const roundedSpeed = Math.round(displaySpeed);

  const speedColor = getSpeedColor(roundedSpeed);

  return (
    <div
      data-testid="speed-indicator"
      className={`${BASE_STYLES} ${speedColor}`}
    >
      {roundedSpeed} {SPEED_UNIT}
    </div>
  );
};
