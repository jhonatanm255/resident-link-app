
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { UserCog, FileText, TrendingUp, Users, DollarSign, Calendar, MessageSquare, Settings } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

const CommitteePage = () => {
  const { isCommittee, isAdmin } = useUserRole();

  if (!isCommittee && !isAdmin) {
    return (
      <AppLayout title="Acceso Denegado">
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No tienes permisos para acceder a esta sección.</p>
        </div>
      </AppLayout>
    );
  }

  const committeeFeatures = [
    {
      title: "Gestión Financiera",
      description: "Supervisión de gastos, ingresos y presupuestos",
      icon: DollarSign,
      color: "bg-green-500",
      action: "Ver Finanzas"
    },
    {
      title: "Actas y Reuniones",
      description: "Gestión de actas, convocatorias y seguimiento",
      icon: FileText,
      color: "bg-blue-500",
      action: "Ver Actas"
    },
    {
      title: "Reportes Estadísticos",
      description: "Análisis de datos y tendencias del condominio",
      icon: TrendingUp,
      color: "bg-purple-500",
      action: "Ver Reportes"
    },
    {
      title: "Gestión de Residentes",
      description: "Supervisión y soporte a residentes",
      icon: Users,
      color: "bg-orange-500",
      action: "Gestionar"
    },
    {
      title: "Programación de Eventos",
      description: "Organización de actividades comunitarias",
      icon: Calendar,
      color: "bg-indigo-500",
      action: "Programar"
    },
    {
      title: "Comunicaciones",
      description: "Gestión de comunicados y notificaciones",
      icon: MessageSquare,
      color: "bg-red-500",
      action: "Comunicar"
    },
    {
      title: "Configuración",
      description: "Ajustes y políticas del condominio",
      icon: Settings,
      color: "bg-gray-500",
      action: "Configurar"
    }
  ];

  return (
    <AppLayout title="Panel del Comité Administrativo">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Panel del Comité Administrativo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Supervisión y gestión administrativa del condominio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {committeeFeatures.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className={`${feature.color} p-4 text-white`}>
                <feature.icon className="h-8 w-8 mb-2" />
                <h3 className="font-semibold text-lg">{feature.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                <AppButton fullWidth>
                  {feature.action}
                </AppButton>
              </div>
            </div>
          ))}
        </div>

        {/* Panel de Resumen */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Resumen Ejecutivo</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg transition-colors duration-300">
              <h3 className="font-medium text-green-800 dark:text-green-200">Ingresos del Mes</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">$2.450.000</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg transition-colors duration-300">
              <h3 className="font-medium text-red-800 dark:text-red-200">Gastos del Mes</h3>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">$1.890.000</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg transition-colors duration-300">
              <h3 className="font-medium text-blue-800 dark:text-blue-200">Solicitudes Pendientes</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg transition-colors duration-300">
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Próxima Reunión</h3>
              <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">15 Enero 2024</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CommitteePage;
