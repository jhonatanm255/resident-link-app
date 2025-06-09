
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Share, Building2, Users, Shield, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const DesktopNavigation: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navigationItems = [
    {
      to: "/",
      icon: Home,
      label: "Inicio",
      section: "main"
    },
    {
      to: "/admin",
      icon: Building2,
      label: "Administración",
      section: "admin"
    },
    {
      to: "/residents",
      icon: Users,
      label: "Residentes", 
      section: "residents"
    },
    {
      to: "/concierge",
      icon: Shield,
      label: "Conserjes",
      section: "concierge"
    },
    {
      to: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      section: "legacy"
    },
    {
      to: "/share",
      icon: Share,
      label: "Compartir",
      section: "legacy"
    }
  ];

  return (
    <nav className="flex-1 pt-4">
      {/* Sección Principal */}
      <div className="mb-6">
        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Principal
        </h3>
        <ul>
          {navigationItems.filter(item => item.section === 'main').map((item) => (
            <li key={item.to} className="mb-2">
              <Link
                to={item.to}
                className={`flex items-center px-4 py-3 ${
                  location.pathname === item.to
                    ? "bg-primary-50 text-primary-700 border-r-4 border-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Secciones de la Aplicación */}
      <div className="mb-6">
        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Secciones
        </h3>
        <ul>
          {navigationItems.filter(item => ['admin', 'residents', 'concierge'].includes(item.section)).map((item) => (
            <li key={item.to} className="mb-2">
              <Link
                to={item.to}
                className={`flex items-center px-4 py-3 ${
                  location.pathname === item.to
                    ? "bg-primary-50 text-primary-700 border-r-4 border-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Herramientas Adicionales */}
      <div className="mb-6">
        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Herramientas
        </h3>
        <ul>
          {navigationItems.filter(item => item.section === 'legacy').map((item) => (
            <li key={item.to} className="mb-2">
              <Link
                to={item.to}
                className={`flex items-center px-4 py-3 ${
                  location.pathname === item.to
                    ? "bg-primary-50 text-primary-700 border-r-4 border-primary-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Botón de Cerrar Sesión */}
      <div className="mt-auto pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </nav>
  );
};
