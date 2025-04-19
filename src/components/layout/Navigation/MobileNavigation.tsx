
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard } from 'lucide-react';

export const MobileNavigation: React.FC = () => {
  const location = useLocation();

  return (
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
  );
};
