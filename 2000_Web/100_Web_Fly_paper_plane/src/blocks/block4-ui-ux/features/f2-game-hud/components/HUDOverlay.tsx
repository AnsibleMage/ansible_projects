import { SpeedIndicator } from './SpeedIndicator';
import { TimerDisplay } from './TimerDisplay';
import { CheckpointCounter } from './CheckpointCounter';
import { BestTimeGhost } from './BestTimeGhost';

const OVERLAY_STYLES = 'fixed inset-0 pointer-events-none z-10 relative w-full h-full';

export const HUDOverlay = () => {
  return (
    <div
      data-testid="hud-overlay"
      className={OVERLAY_STYLES}
    >
      <SpeedIndicator />
      <TimerDisplay />
      <CheckpointCounter />
      <BestTimeGhost />
    </div>
  );
};
