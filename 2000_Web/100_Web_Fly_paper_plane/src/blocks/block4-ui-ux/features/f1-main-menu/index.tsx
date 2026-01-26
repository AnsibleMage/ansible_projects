import { motion } from 'framer-motion';
import { StartButton } from './components/StartButton';
import { SettingsPanel } from './components/SettingsPanel';
import { LeaderboardPreview } from './components/LeaderboardPreview';
import { menuVariants } from './animations/menuTransitions';

const MENU_TITLE = 'Fly Paper Plane';

export const MainMenuIntegration = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={menuVariants}
      className="flex flex-col items-center justify-center min-h-screen gap-8"
      data-testid="main-menu-integration"
    >
      {/* 타이틀 */}
      <h1 className="font-game text-4xl text-white">{MENU_TITLE}</h1>

      {/* 버튼 영역 */}
      <nav className="flex flex-col gap-4" aria-label="Main menu">
        <StartButton />
        <SettingsPanel />
        <LeaderboardPreview />
      </nav>
    </motion.div>
  );
};
