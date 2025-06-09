
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { Building2, FileText, BarChart3, Settings, Users, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

const AdminPage = () => {
  const { condominiums } = useApp();

  const adminFeatures = [
    {
      title: "Gestión de Condominios",
      description: "Crear, editar y administrar condominios",
      icon: Building2,
      route: "/condominiums",
      color: "bg-blue-500",
      stats: `${condominiums.length} condominios`
    },
    {
      title: "Dashboard Administrativo", 
      description: "Estadísticas y reportes generales",
      icon: BarChart3,
      route: "/dashboard",
      color: "bg-green-500",
      stats: "Reportes disponibles"
    },
    {
      title: "Gestión de Usuarios",
      description: "Administrar residentes y conserjes",
      icon: Users,
      route: "/admin/users",
      color: "bg-purple-500",
      stats: "En desarrollo"
    },
    {
      title: "Configuración",
      description: "Configurar parámetros del sistema",
      icon: Settings,
      route: "/admin/settings",
      color: "bg-gray-500",
      stats: "Sistema"
    }
  ];

  return (
    <AppLayout title="Administración">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">
            Gestiona todos los aspectos administrativos de los condominios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {adminFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`${feature.color} p-4`}>
                <div className="flex items-center text-white">
                  <feature.icon className="h-8 w-8 mr-3" />
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm opacity-90">{feature.stats}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link to={feature.route}>
                  <AppButton fullWidth>
                    Acceder
                  </AppButton>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/condominiums/new">
              <AppButton variant="outline" fullWidth leftIcon={<Plus size={18} />}>
                Nuevo Condominio
              </AppButton>
            </Link>
            <Link to="/dashboard">
              <AppButton variant="outline" fullWidth leftIcon={<BarChart3 size={18} />}>
                Ver Estadísticas
              </AppButton>
            </Link>
            <Link to="/share">
              <AppButton variant="outline" fullWidth leftIcon={<FileText size={18} />}>
                Compartir Datos
              </AppButton>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminPage;
