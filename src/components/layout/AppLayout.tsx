import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Building2, QrCode, Menu, X, ChevronLeft, LogOut, UserRound, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

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
  onBack
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getInitials = (email: string | null) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
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
            {currentUser && (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none mr-2">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={currentUser.photoURL || undefined} />
                    <AvatarFallback className="bg-primary-600">
                      {getInitials(currentUser.email)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {currentUser.displayName || currentUser.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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

      <div className="flex flex-1 overflow-hidden">
        <div className={`hidden md:flex md:w-64 flex-col bg-white shadow-md transition-all duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <nav className="flex-1 pt-4">
            <ul>
              <li className="mb-2">
                <Link
                  to="/"
                  className={`flex items-center px-4 py-3 ${
                    location.pathname === "/"
                      ? "bg-primary-50 text-primary-700 border-r-4 border-primary-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Home size={20} className="mr-3" />
                  <span>Inicio</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/dashboard"
                  className={`flex items-center px-4 py-3 ${
                    location.pathname === "/dashboard"
                      ? "bg-primary-50 text-primary-700 border-r-4 border-primary-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <LayoutDashboard size={20} className="mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>
            </ul>
          </nav>
          {currentUser && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={currentUser.photoURL || undefined} />
                  <AvatarFallback className="bg-primary-600 text-white">
                    {getInitials(currentUser.email)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {currentUser.displayName || currentUser.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {menuOpen && (
          <div className="absolute inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setMenuOpen(false)}
            ></div>
            <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-md pt-safe-top">
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
                    <Avatar>
                      <AvatarImage src={currentUser.photoURL || undefined} />
                      <AvatarFallback className="bg-primary-600 text-white">
                        {getInitials(currentUser.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {currentUser.displayName || currentUser.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <nav className="flex-1 pt-2">
                <ul>
                  <li className="mb-2">
                    <Link
                      to="/"
                      className={`flex items-center px-4 py-3 ${
                        location.pathname === "/"
                          ? "bg-primary-50 text-primary-700 border-r-4 border-primary-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <Home size={20} className="mr-3" />
                      <span>Inicio</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/dashboard"
                      className={`flex items-center px-4 py-3 ${
                        location.pathname === "/dashboard"
                          ? "bg-primary-50 text-primary-700 border-r-4 border-primary-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <LayoutDashboard size={20} className="mr-3" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  {currentUser && (
                    <li className="mt-4 border-t border-gray-200 pt-4">
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          handleLogout();
                        }}
                        className="flex w-full items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={20} className="mr-3" />
                        <span>Cerrar sesión</span>
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 overflow-auto pb-safe-bottom">
          {children}
        </main>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around pb-safe-bottom">
        <Link
          to="/"
          className={`flex flex-col items-center py-2 px-4 ${
            location.pathname === "/"
              ? "text-primary-700"
              : "text-gray-600"
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Inicio</span>
        </Link>
        <Link
          to="/dashboard"
          className={`flex flex-col items-center py-2 px-4 ${
            location.pathname === "/dashboard"
              ? "text-primary-700"
              : "text-gray-600"
          }`}
        >
          <LayoutDashboard size={24} />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
      </div>
    </div>
  );
};
