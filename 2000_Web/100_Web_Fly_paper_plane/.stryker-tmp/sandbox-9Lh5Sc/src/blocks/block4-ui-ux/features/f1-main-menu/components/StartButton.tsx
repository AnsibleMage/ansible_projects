// @ts-nocheck
import { useState } from 'react';
import { useGameStore } from '../../../stores/gameStore';
import { MenuButton } from './MenuButton';

const BUTTON_TEXT = {
  START: 'Start',
  LOADING: 'Loading...',
} as const;

export const StartButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setGameState = useGameStore((state) => state.setGameState);

  const handleStartGame = () => {
    setIsLoading(true);
    setGameState('playing');
  };

  return (
    <MenuButton
      variant="primary"
      onClick={handleStartGame}
      disabled={isLoading}
    >
      {isLoading ? BUTTON_TEXT.LOADING : BUTTON_TEXT.START}
    </MenuButton>
  );
};
