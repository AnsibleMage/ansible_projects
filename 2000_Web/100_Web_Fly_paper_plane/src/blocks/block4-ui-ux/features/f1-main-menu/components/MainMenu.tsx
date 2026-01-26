import { MenuButton } from './MenuButton';

const MENU_TITLE = 'Fly Paper Plane';

export const MainMenu = () => {
  return (
    <div
      data-testid="main-menu"
      className="flex flex-col items-center justify-center min-h-screen gap-8"
    >
      {/* 타이틀 */}
      <h1 className="font-game text-4xl text-white">
        {MENU_TITLE}
      </h1>

      {/* 버튼 영역 */}
      <nav className="flex flex-col gap-4" aria-label="Main menu">
        <MenuButton variant="primary">
          Start
        </MenuButton>

        <MenuButton variant="secondary">
          Settings
        </MenuButton>

        <MenuButton variant="secondary">
          Leaderboard
        </MenuButton>
      </nav>
    </div>
  );
};
