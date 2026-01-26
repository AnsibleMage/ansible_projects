// @ts-nocheck
interface MenuButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

export const MenuButton = ({
  children,
  variant = 'secondary',
  onClick,
  disabled = false
}: MenuButtonProps) => {
  const baseClasses = 'px-8 py-4 font-game text-xl rounded-lg transition-colors';

  const variantClasses = {
    primary: 'bg-roblox-blue text-white hover:bg-blue-600',
    secondary: 'bg-gray-700 text-white hover:bg-gray-600',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
