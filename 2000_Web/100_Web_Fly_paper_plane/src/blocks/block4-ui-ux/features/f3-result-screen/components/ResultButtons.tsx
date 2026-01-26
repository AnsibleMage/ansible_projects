import { useGameStore } from '../../../stores/gameStore';

const BUTTON_BASE_STYLES = 'text-xl font-bold px-8 py-3 rounded-lg transition-colors';
const RETRY_BUTTON_STYLES = 'bg-blue-600 hover:bg-blue-700 text-white';
const MENU_BUTTON_STYLES = 'bg-gray-600 hover:bg-gray-700 text-white';

export const ResultButtons = () => {
  const reset = useGameStore((state) => state.reset);
  const setGameState = useGameStore((state) => state.setGameState);

  const handleRetry = () => {
    reset();
    setGameState('playing');
  };

  const handleMainMenu = () => {
    reset();
    setGameState('menu');
  };

  return (
    <div data-testid="result-buttons" className="flex gap-4 justify-center mt-8">
      <button
        onClick={handleRetry}
        className={`${BUTTON_BASE_STYLES} ${RETRY_BUTTON_STYLES}`}
      >
        Retry
      </button>
      <button
        onClick={handleMainMenu}
        className={`${BUTTON_BASE_STYLES} ${MENU_BUTTON_STYLES}`}
      >
        Main Menu
      </button>
    </div>
  );
};
