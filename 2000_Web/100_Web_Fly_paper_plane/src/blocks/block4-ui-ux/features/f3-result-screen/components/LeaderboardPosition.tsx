import { useSocialStore } from '../../../stores/socialStore';

const getMedal = (rank: number): string | null => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return null;
};

const getRankColor = (rank: number): string => {
  if (rank <= 3) return 'text-yellow-500';
  if (rank <= 10) return 'text-white';
  return 'text-gray-400';
};

const MEDAL_STYLES = 'text-4xl mb-2';
const RANK_TEXT_STYLES = 'text-2xl font-bold';

export const LeaderboardPosition = () => {
  const currentUser = useSocialStore((state) => state.currentUser);

  if (!currentUser) {
    return null;
  }

  const { rank } = currentUser;
  const medal = getMedal(rank);
  const colorClass = getRankColor(rank);

  return (
    <div data-testid="leaderboard-position" className="text-center mt-6">
      {medal && <div className={MEDAL_STYLES}>{medal}</div>}
      <div className={`${RANK_TEXT_STYLES} ${colorClass}`}>
        You ranked #{rank}!
      </div>
    </div>
  );
};
