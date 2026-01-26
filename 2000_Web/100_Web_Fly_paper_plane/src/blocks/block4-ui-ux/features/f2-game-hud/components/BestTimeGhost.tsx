import { useTimerStore } from '../../../stores/timerStore';

const formatTimeDifference = (diffMs: number): string => {
  // 초 단위로 변환 (3자리 밀리초 포함)
  const diffSeconds = diffMs / 1000;
  const absoluteDiff = Math.abs(diffSeconds);

  // ±X.XXX 형식으로 포맷팅
  const formatted = absoluteDiff.toFixed(3);

  if (diffSeconds < 0) {
    return `-${formatted}`;
  } else if (diffSeconds > 0) {
    return `+${formatted}`;
  } else {
    return `±${formatted}`;
  }
};

const getDifferenceColor = (diffMs: number): string => {
  if (diffMs < 0) {
    return 'text-green-500'; // 더 빠름
  } else if (diffMs > 0) {
    return 'text-red-500'; // 더 느림
  } else {
    return 'text-yellow-500'; // 같음
  }
};

const BASE_STYLES = 'absolute top-16 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-1 rounded';
const TEXT_STYLES = 'text-xl';

export const BestTimeGhost = () => {
  const elapsedTime = useTimerStore((state) => state.elapsedTime);
  const personalBest = useTimerStore((state) => state.personalBest);

  // personalBest가 없거나 음수면 렌더링 안함
  if (personalBest === null || personalBest < 0) {
    return null;
  }

  // 현재 시간 - 최고 기록 (양수면 느림, 음수면 빠름)
  const timeDifference = elapsedTime - personalBest;

  const formattedDiff = formatTimeDifference(timeDifference);
  const colorClass = getDifferenceColor(timeDifference);

  return (
    <div
      data-testid="best-time-ghost"
      className={`${BASE_STYLES} ${TEXT_STYLES} ${colorClass}`}
    >
      {formattedDiff}
    </div>
  );
};
