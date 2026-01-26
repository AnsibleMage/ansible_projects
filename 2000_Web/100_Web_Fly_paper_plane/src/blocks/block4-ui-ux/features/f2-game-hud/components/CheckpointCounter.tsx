import { useGameStore } from '../../../stores/gameStore';

const BASE_STYLES = 'absolute top-4 right-4 bg-black/50 px-4 py-2 rounded';
const TEXT_STYLES = 'text-2xl font-bold text-white';

export const CheckpointCounter = () => {
  const checkpointsPassed = useGameStore((state) => state.checkpointsPassed);
  const totalCheckpoints = useGameStore((state) => state.totalCheckpoints);

  // 음수 방어 및 최대값 클램핑
  const currentCheckpoint = Math.max(0, Math.min(checkpointsPassed, totalCheckpoints));

  return (
    <div
      data-testid="checkpoint-counter"
      className={`${BASE_STYLES} ${TEXT_STYLES}`}
    >
      {currentCheckpoint}/{totalCheckpoints}
    </div>
  );
};
