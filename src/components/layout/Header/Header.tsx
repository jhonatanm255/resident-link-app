
import React from 'react';
import { Menu, X, ChevronLeft } from 'lucide-react';
import { UserMenu } from '../UserMenu/UserMenu';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
  menuOpen: boolean;
  toggleMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBack,
  menuOpen,
  toggleMenu,
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <header className="bg-primary-700 text-white shadow-md safe-top">
      <div className="flex items-center justify-between p-4 pt-safe-top">
        <div className="flex items-center">
          {showBackButton && (
            <button
              onClick={handleBack}
              className="mr-2 p-1 rounded-full hover:bg-primary-600"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center">
          <UserMenu />
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full hover:bg-primary-600"
            aria-label="Menú"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};
