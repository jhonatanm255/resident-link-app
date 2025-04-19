
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard } from 'lucide-react';

export const DesktopNavigation: React.FC = () => {
  const location = useLocation();

  return (
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
  );
};
