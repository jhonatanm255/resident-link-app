
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { Home, MessageSquare, FileText, Bell, Phone, Calendar } from "lucide-react";

const ResidentsPage = () => {
  const residentFeatures = [
    {
      title: "Mi Vivienda",
      description: "Información de tu apartamento y condominio",
      icon: Home,
      color: "bg-blue-500",
      action: "Ver Información"
    },
    {
      title: "Comunicados",
      description: "Avisos y noticias importantes",
      icon: Bell,
      color: "bg-yellow-500",
      action: "Ver Comunicados"
    },
    {
      title: "Solicitudes",
      description: "Realizar solicitudes a la administración",
      icon: FileText,
      color: "bg-green-500",
      action: "Nueva Solicitud"
    },
    {
      title: "Mensajería",
      description: "Comunicarse con administración y conserjes",
      icon: MessageSquare,
      color: "bg-purple-500",
      action: "Enviar Mensaje"
    },
    {
      title: "Directorio",
      description: "Contactos importantes del condominio",
      icon: Phone,
      color: "bg-red-500",
      action: "Ver Directorio"
    },
    {
      title: "Reservas",
      description: "Reservar espacios comunes",
      icon: Calendar,
      color: "bg-indigo-500",
      action: "Hacer Reserva"
    }
  ];

  return (
    <AppLayout title="Portal de Residentes">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Portal de Residentes
          </h1>
          <p className="text-gray-600">
            Accede a los servicios y información de tu condominio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {residentFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
              <div className={`${feature.color} p-4 text-white`}>
                <feature.icon className="h-8 w-8 mb-2" />
                <h3 className="font-semibold text-lg">{feature.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <AppButton fullWidth>
                  {feature.action}
                </AppButton>
              </div>
            </div>
          ))}
        </div>

        {/* Información Rápida */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Información Rápida</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800">Estado de Pagos</h3>
              <p className="text-green-600 font-semibold">Al día</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800">Próxima Reunión</h3>
              <p className="text-gray-600">No programada</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800">Solicitudes Activas</h3>
              <p className="text-blue-600 font-semibold">0 pendientes</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ResidentsPage;
