
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { Home, MessageSquare, FileText, Bell, Phone, Calendar, UserCheck } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { VisitManagement } from "@/components/features/residents/VisitManagement";
import { CommunicationCenter } from "@/components/features/residents/CommunicationCenter";
import { DirectoryService } from "@/components/features/residents/DirectoryService";
import { ReservationSystem } from "@/components/features/residents/ReservationSystem";

const ResidentsPage = () => {
  const { isResident, isAdmin, isCommittee } = useUserRole();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  if (!isResident && !isAdmin && !isCommittee) {
    return (
      <AppLayout title="Acceso Denegado">
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No tienes permisos para acceder a esta sección.</p>
        </div>
      </AppLayout>
    );
  }

  const residentFeatures = [
    {
      id: "housing",
      title: "Mi Vivienda",
      description: "Información de tu apartamento y condominio",
      icon: Home,
      color: "bg-blue-500",
      action: "Ver Información"
    },
    {
      id: "communications",
      title: "Comunicados",
      description: "Avisos y noticias importantes",
      icon: Bell,
      color: "bg-yellow-500",
      action: "Ver Comunicados"
    },
    {
      id: "requests",
      title: "Solicitudes",
      description: "Realizar solicitudes a la administración",
      icon: FileText,
      color: "bg-green-500",
      action: "Nueva Solicitud"
    },
    {
      id: "messaging",
      title: "Mensajería",
      description: "Comunicarse con administración y conserjes",
      icon: MessageSquare,
      color: "bg-purple-500",
      action: "Enviar Mensaje"
    },
    {
      id: "directory",
      title: "Directorio",
      description: "Contactos importantes del condominio",
      icon: Phone,
      color: "bg-red-500",
      action: "Ver Directorio"
    },
    {
      id: "reservations",
      title: "Reservas",
      description: "Reservar espacios comunes",
      icon: Calendar,
      color: "bg-indigo-500",
      action: "Hacer Reserva"
    },
    {
      id: "visits",
      title: "Gestión de Visitas",
      description: "Registrar y gestionar visitas con códigos QR",
      icon: UserCheck,
      color: "bg-teal-500",
      action: "Gestionar Visitas"
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    setActiveSection(activeSection === featureId ? null : featureId);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'visits':
        return <VisitManagement />;
      case 'communications':
        return <CommunicationCenter />;
      case 'directory':
        return <DirectoryService />;
      case 'reservations':
        return <ReservationSystem />;
      default:
        return null;
    }
  };

  return (
    <AppLayout title="Portal de Residentes">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Portal de Residentes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Accede a los servicios y información de tu condominio
          </p>
        </div>

        {!activeSection && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {residentFeatures.map((feature) => (
                <div key={feature.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                  <div className={`${feature.color} p-4 text-white`}>
                    <feature.icon className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                    <AppButton 
                      fullWidth
                      onClick={() => handleFeatureClick(feature.id)}
                    >
                      {feature.action}
                    </AppButton>
                  </div>
                </div>
              ))}
            </div>

            {/* Información Rápida */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Información Rápida</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">Estado de Pagos</h3>
                  <p className="text-green-600 dark:text-green-400 font-semibold">Al día</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">Próxima Reunión</h3>
                  <p className="text-gray-600 dark:text-gray-400">No programada</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">Solicitudes Activas</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold">0 pendientes</p>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {residentFeatures.find(f => f.id === activeSection)?.title}
              </h2>
              <AppButton 
                variant="outline"
                onClick={() => setActiveSection(null)}
              >
                Volver al Portal
              </AppButton>
            </div>
            {renderActiveSection()}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default ResidentsPage;
