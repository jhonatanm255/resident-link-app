
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { FileText, BarChart3, Settings, Users, Plus, CreditCard, Truck, Gauge, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { useUserRole } from "@/hooks/useUserRole";
import { PaymentManagement } from "@/components/features/admin/PaymentManagement";
import { ProviderManagement } from "@/components/features/admin/ProviderManagement";

const AdminPage = () => {
  const { condominiums } = useApp();
  const { isAdmin } = useUserRole();

  if (!isAdmin) {
    return (
      <AppLayout title="Acceso Denegado">
        <div className="text-center py-8">
          <p className="text-muted-foreground transition-colors duration-300">No tienes permisos para acceder a esta sección.</p>
        </div>
      </AppLayout>
    );
  }

  const adminFeatures = [
    {
      title: "Dashboard Administrativo", 
      description: "Estadísticas y reportes generales",
      icon: BarChart3,
      route: "/dashboard",
      color: "bg-green-500 dark:bg-green-600",
      stats: "Reportes disponibles"
    },
    {
      title: "Gestión de Usuarios",
      description: "Administrar residentes y conserjes",
      icon: Users,
      route: "/admin/users",
      color: "bg-purple-500 dark:bg-purple-600",
      stats: "En desarrollo"
    },
    {
      title: "Pagos y Gastos Comunes",
      description: "Gestionar pagos y gastos del condominio",
      icon: CreditCard,
      route: "/admin/payments",
      color: "bg-emerald-500 dark:bg-emerald-600",
      stats: "Sistema de pagos"
    },
    {
      title: "Proveedores",
      description: "Gestionar proveedores de servicios",
      icon: Truck,
      route: "/admin/providers",
      color: "bg-orange-500 dark:bg-orange-600",
      stats: "Gestión de servicios"
    },
    {
      title: "Mediciones",
      description: "Publicar mediciones de servicios básicos",
      icon: Gauge,
      route: "/admin/measurements",
      color: "bg-cyan-500 dark:bg-cyan-600",
      stats: "Agua, gas, calefacción"
    },
    {
      title: "Notificaciones",
      description: "Enviar notificaciones a residentes",
      icon: Bell,
      route: "/admin/notifications",
      color: "bg-red-500 dark:bg-red-600",
      stats: "Comunicación inmediata"
    },
    {
      title: "Configuración",
      description: "Configurar parámetros del sistema",
      icon: Settings,
      route: "/admin/settings",
      color: "bg-gray-500 dark:bg-gray-600",
      stats: "Sistema"
    }
  ];

  return (
    <AppLayout title="Administración">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 transition-colors duration-300">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground transition-colors duration-300">
            Gestiona todos los aspectos administrativos de los condominios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {adminFeatures.map((feature, index) => (
            <div key={index} className="bg-card rounded-lg shadow-lg overflow-hidden card-hover transition-all duration-300 border border-border">
              <div className={`${feature.color} p-4 transition-colors duration-300`}>
                <div className="flex items-center text-white">
                  <feature.icon className="h-8 w-8 mr-3" />
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-sm opacity-90">{feature.stats}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4 transition-colors duration-300">{feature.description}</p>
                <Link to={feature.route}>
                  <AppButton fullWidth className="transition-all duration-300">
                    Acceder
                  </AppButton>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Vista previa de funcionalidades */}
        <div className="space-y-8">
          <PaymentManagement />
          <ProviderManagement />
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-card rounded-lg shadow-lg p-6 mt-8 border border-border transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-4 text-foreground transition-colors duration-300">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/dashboard">
              <AppButton variant="outline" fullWidth leftIcon={<BarChart3 size={18} />} className="transition-all duration-300">
                Ver Estadísticas
              </AppButton>
            </Link>
            <Link to="/admin/notifications">
              <AppButton variant="outline" fullWidth leftIcon={<Bell size={18} />} className="transition-all duration-300">
                Enviar Notificación
              </AppButton>
            </Link>
            <Link to="/share">
              <AppButton variant="outline" fullWidth leftIcon={<FileText size={18} />} className="transition-all duration-300">
                Compartir Datos
              </AppButton>
            </Link>
            <Link to="/admin/settings">
              <AppButton variant="outline" fullWidth leftIcon={<Settings size={18} />} className="transition-all duration-300">
                Configuración
              </AppButton>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AdminPage;
