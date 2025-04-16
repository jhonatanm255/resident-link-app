
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Building2, QrCode, Menu, X } from "lucide-react";
import { useState } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary-700 text-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full hover:bg-primary-600"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex md:w-64 flex-col bg-white shadow-md">
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
                  to="/condominiums"
                  className={`flex items-center px-4 py-3 ${
                    location.pathname.includes("/condominiums")
                      ? "bg-primary-50 text-primary-700 border-r-4 border-primary-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Building2 size={20} className="mr-3" />
                  <span>Condominios</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/share"
                  className={`flex items-center px-4 py-3 ${
                    location.pathname === "/share"
                      ? "bg-primary-50 text-primary-700 border-r-4 border-primary-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <QrCode size={20} className="mr-3" />
                  <span>Compartir Datos</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setMenuOpen(false)}
            ></div>
            <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-md">
              <div className="flex justify-end p-4">
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
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
                      to="/condominiums"
                      className={`flex items-center px-4 py-3 ${
                        location.pathname.includes("/condominiums")
                          ? "bg-primary-50 text-primary-700 border-r-4 border-primary-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <Building2 size={20} className="mr-3" />
                      <span>Condominios</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/share"
                      className={`flex items-center px-4 py-3 ${
                        location.pathname === "/share"
                          ? "bg-primary-50 text-primary-700 border-r-4 border-primary-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <QrCode size={20} className="mr-3" />
                      <span>Compartir Datos</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
