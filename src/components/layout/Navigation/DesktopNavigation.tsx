
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Share, Building2, Users, Shield, LogOut, UserCog } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';

export const DesktopNavigation: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { role, isAdmin, isResident, isConcierge, isCommittee } = useUserRole();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const allNavigationItems = [
    {
      to: "/",
      icon: Home,
      label: "Inicio",
      section: "main",
      roles: ['admin', 'resident', 'concierge', 'committee']
    },
    {
      to: "/admin",
      icon: Building2,
      label: "Administración",
      section: "admin",
      roles: ['admin']
    },
    {
      to: "/committee",
      icon: UserCog,
      label: "Comité",
      section: "committee",
      roles: ['committee', 'admin']
    },
    {
      to: "/residents",
      icon: Users,
      label: "Residentes", 
      section: "residents",
      roles: ['resident', 'admin']
    },
    {
      to: "/concierge",
      icon: Shield,
      label: "Conserjes",
      section: "concierge",
      roles: ['concierge', 'admin']
    },
    {
      to: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      section: "legacy",
      roles: ['admin', 'resident', 'concierge', 'committee']
    },
    {
      to: "/share",
      icon: Share,
      label: "Compartir",
      section: "legacy",
      roles: ['admin', 'resident', 'concierge', 'committee']
    }
  ];

  // Filtrar navegación según el rol del usuario
  const navigationItems = allNavigationItems.filter(item => 
    role && item.roles.includes(role)
  );

  const getSectionItems = (section: string) => 
    navigationItems.filter(item => item.section === section);

  const mainItems = getSectionItems('main');
  const sectionItems = getSectionItems('admin')
    .concat(getSectionItems('committee'))
    .concat(getSectionItems('residents'))
    .concat(getSectionItems('concierge'));
  const legacyItems = getSectionItems('legacy');

  return (
    <nav className="flex-1 pt-4 pb-4">
      {/* Sección Principal */}
      {mainItems.length > 0 && (
        <div className="mb-6">
          <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Principal
          </h3>
          <ul className="space-y-1">
            {mainItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`nav-link flex items-center px-4 py-3 mx-2 rounded-lg group ${
                    location.pathname === item.to
                      ? "bg-primary text-primary-foreground shadow-sm scale-105"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md"
                  }`}
                >
                  <item.icon size={20} className="mr-3 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Secciones de la Aplicación */}
      {sectionItems.length > 0 && (
        <div className="mb-6">
          <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Secciones
          </h3>
          <ul className="space-y-1">
            {sectionItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`nav-link flex items-center px-4 py-3 mx-2 rounded-lg group ${
                    location.pathname === item.to
                      ? "bg-primary text-primary-foreground shadow-sm scale-105"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md"
                  }`}
                >
                  <item.icon size={20} className="mr-3 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Herramientas Adicionales */}
      {legacyItems.length > 0 && (
        <div className="mb-6">
          <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Herramientas
          </h3>
          <ul className="space-y-1">
            {legacyItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`nav-link flex items-center px-4 py-3 mx-2 rounded-lg group ${
                    location.pathname === item.to
                      ? "bg-primary text-primary-foreground shadow-sm scale-105"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md"
                  }`}
                >
                  <item.icon size={20} className="mr-3 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botón de Cerrar Sesión */}
      <div className="mt-auto pt-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="nav-link flex items-center w-full px-4 py-3 mx-2 rounded-lg text-destructive hover:bg-destructive/10 group"
        >
          <LogOut size={20} className="mr-3 transition-transform duration-200 group-hover:scale-110" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </nav>
  );
};
