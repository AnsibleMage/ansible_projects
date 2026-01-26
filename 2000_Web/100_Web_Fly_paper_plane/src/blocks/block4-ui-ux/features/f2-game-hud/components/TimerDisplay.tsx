import { useTimerStore } from '../../../stores/timerStore';

const formatTime = (milliseconds: number): string => {
  // 음수 시간은 0으로 처리
  const time = Math.max(0, milliseconds);

  // 분, 초, 밀리초 계산
  const totalSeconds = Math.floor(time / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ms = time % 1000;

  // MM:SS.mmm 형식으로 포맷팅
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');
  const paddedMs = String(ms).padStart(3, '0');

  return `${paddedMinutes}:${paddedSeconds}.${paddedMs}`;
};

const BASE_STYLES =
  'absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 px-6 py-3 rounded-lg';
const TEXT_STYLES = 'text-4xl font-bold text-white';

export const TimerDisplay = () => {
  const elapsedTime = useTimerStore((state) => state.elapsedTime);

  const formattedTime = formatTime(elapsedTime);

  return (
    <div
      data-testid="timer-display"
      className={`${BASE_STYLES} ${TEXT_STYLES}`}
    >
      {formattedTime}
    </div>
  );
};
