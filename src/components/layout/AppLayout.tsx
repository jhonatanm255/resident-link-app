
import React, { useState } from "react";
import { Header } from "./Header/Header";
import { DesktopNavigation } from "./Navigation/DesktopNavigation";
import { MobileNavigation } from "./Navigation/MobileNavigation";
import { UserMenu } from "./UserMenu/UserMenu";
import { useAuth } from "@/contexts/AuthContext";
import { X } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title,
  showBackButton = false,
  onBack,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-background transition-colors duration-300">
      <Header
        title={title}
        showBackButton={showBackButton}
        onBack={onBack}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Mejorado con transiciones suaves */}
        <div className="hidden md:flex md:w-64 flex-col bg-card border-r border-border shadow-sm sidebar-transition">
          <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
            <DesktopNavigation />
          </div>
          {currentUser && (
            <div className="p-4 border-t border-border mt-auto bg-card/50 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <UserMenu />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Sidebar Overlay - Mejorado con transiciones */}
        <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          />
          <div className={`absolute left-0 top-0 h-full w-64 bg-card shadow-xl transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
                aria-label="Cerrar menú"
              >
                <X size={20} className="text-foreground" />
              </button>
            </div>
            {currentUser && (
              <div className="px-4 py-2 border-b border-border">
                <div className="flex items-center space-x-3">
                  <UserMenu />
                </div>
              </div>
            )}
            <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
              <DesktopNavigation />
            </div>
          </div>
        </div>

        <main className="flex-1 p-4 overflow-auto custom-scrollbar bg-background transition-colors duration-300">
          <div className="transition-all duration-300">
            {children}
          </div>
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
};
