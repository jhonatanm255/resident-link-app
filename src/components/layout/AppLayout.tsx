
import React, { useState } from "react";
import { Header } from "./Header/Header";
import { DesktopNavigation } from "./Navigation/DesktopNavigation";
import { MobileNavigation } from "./Navigation/MobileNavigation";
import { UserMenu } from "./UserMenu/UserMenu";
import { useAuth } from "@/contexts/AuthContext";
import { X } from "lucide-react";
import FeedbackModal from "@/components/FeedbackModal";
import { useFeedbackModal } from "@/hooks/useFeedbackModal";

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
  const { showFeedbackModal, setShowFeedbackModal } = useFeedbackModal();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        title={title}
        showBackButton={showBackButton}
        onBack={onBack}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Always visible on large screens */}
        <div className="hidden md:flex md:w-64 flex-col bg-white shadow-md">
          <DesktopNavigation />
          {currentUser && (
            <div className="p-4 border-t border-gray-200 mt-auto">
              <div className="flex items-center space-x-3">
                <UserMenu />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Sidebar Overlay */}
        {menuOpen && (
          <div className="absolute inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setMenuOpen(false)}
            ></div>
            <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-md pt-safe-top transform transition-transform duration-300 ease-in-out">
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Cerrar menú"
                >
                  <X size={20} />
                </button>
              </div>
              {currentUser && (
                <div className="px-4 py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <UserMenu />
                  </div>
                </div>
              )}
              <DesktopNavigation />
            </div>
          </div>
        )}

        <main className="flex-1 p-4 overflow-auto pb-safe-bottom">
          {children}
        </main>
      </div>

      <MobileNavigation />
      
      {/* Modal de Feedback */}
      <FeedbackModal 
        open={showFeedbackModal} 
        onOpenChange={setShowFeedbackModal} 
      />
    </div>
  );
};
