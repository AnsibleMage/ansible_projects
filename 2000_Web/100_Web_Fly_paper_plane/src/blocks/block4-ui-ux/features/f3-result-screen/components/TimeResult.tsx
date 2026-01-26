import { useGameStore } from '../../../stores/gameStore';

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

const LABEL_STYLES = 'text-xl text-gray-400 mb-2';
const TIME_STYLES = 'text-6xl font-bold text-white';

export const TimeResult = () => {
  const finalTime = useGameStore((state) => state.finalTime);

  const formattedTime = formatTime(finalTime);

  return (
    <div data-testid="time-result" className="text-center">
      <div className={LABEL_STYLES}>Final Time</div>
      <div className={TIME_STYLES}>{formattedTime}</div>
    </div>
  );
};
