import { useGameStore } from '../../../stores/gameStore';
import { useTimerStore } from '../../../stores/timerStore';

const formatTime = (milliseconds: number): string => {
  const time = Math.max(0, milliseconds);
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ms = time % 1000;

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');
  const paddedMs = String(ms).padStart(3, '0');

  return `${paddedMinutes}:${paddedSeconds}.${paddedMs}`;
};

const formatTimeDifference = (diffMs: number): string => {
  const diffSeconds = diffMs / 1000;
  const absoluteDiff = Math.abs(diffSeconds);
  const formatted = absoluteDiff.toFixed(3);

  if (diffSeconds < 0) {
    return `-${formatted}s`;
  } else if (diffSeconds > 0) {
    return `+${formatted}s`;
  } else {
    return `±${formatted}s`;
  }
};

const MESSAGE_STYLES = 'text-3xl font-bold mb-2';
const PREVIOUS_BEST_STYLES = 'text-xl text-gray-400 mb-1';
const DIFF_STYLES = 'text-2xl font-bold';

export const RecordComparison = () => {
  const finalTime = useGameStore((state) => state.finalTime);
  const personalBest = useTimerStore((state) => state.personalBest);

  // 첫 플레이
  if (personalBest === null) {
    return (
      <div data-testid="record-comparison" className="text-center mt-6">
        <div className={`${MESSAGE_STYLES} text-blue-500`}>First Play!</div>
      </div>
    );
  }

  const isNewRecord = finalTime < personalBest;
  const timeDifference = finalTime - personalBest;

  // 신기록
  if (isNewRecord) {
    return (
      <div data-testid="record-comparison" className="text-center mt-6">
        <div className={`${MESSAGE_STYLES} text-green-500`}>New Record!</div>
        <div className={`${DIFF_STYLES} text-green-500`}>
          {formatTimeDifference(timeDifference)}
        </div>
      </div>
    );
  }

  // 기록 미달
  const diffColor = timeDifference === 0 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div data-testid="record-comparison" className="text-center mt-6">
      <div className={PREVIOUS_BEST_STYLES}>Previous Best</div>
      <div className="text-2xl text-white mb-2">{formatTime(personalBest)}</div>
      <div className={`${DIFF_STYLES} ${diffColor}`}>
        {formatTimeDifference(timeDifference)}
      </div>
    </div>
  );
};
