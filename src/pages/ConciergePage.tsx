
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { Shield, Clock, UserCheck, AlertTriangle, Users, Calendar, CheckCircle } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { ExtraShiftManagement } from "@/components/features/concierge/ExtraShiftManagement";
import { VisitValidation } from "@/components/features/concierge/VisitValidation";

const ConciergePage = () => {
  const { isConcierge, isAdmin } = useUserRole();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isConcierge && !isAdmin) {
    return (
      <AppLayout title="Acceso Denegado">
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tienes permisos para acceder a esta sección.</p>
        </div>
      </AppLayout>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Shield },
    { id: 'shifts', label: 'Turnos Extras', icon: Clock },
    { id: 'visits', label: 'Validar Visitas', icon: UserCheck },
    { id: 'incidents', label: 'Incidentes', icon: AlertTriangle }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Tarjetas de resumen */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <div className="flex items-center">
                  <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Turno Actual</h3>
                    <p className="text-2xl font-bold text-foreground">08:00 - 16:00</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <div className="flex items-center">
                  <div className="bg-green-500 bg-opacity-20 p-3 rounded-full">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Visitas Hoy</h3>
                    <p className="text-2xl font-bold text-foreground">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <div className="flex items-center">
                  <div className="bg-yellow-500 bg-opacity-20 p-3 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Incidentes</h3>
                    <p className="text-2xl font-bold text-foreground">3</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <div className="flex items-center">
                  <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Residentes Activos</h3>
                    <p className="text-2xl font-bold text-foreground">156</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actividades recientes */}
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Actividades Recientes</h3>
              <div className="space-y-3">
                {[
                  { time: '14:30', action: 'Visita autorizada', detail: 'Juan Pérez - Apto 302', icon: CheckCircle, color: 'text-green-600' },
                  { time: '13:45', action: 'Incidente reportado', detail: 'Ruido excesivo - Piso 5', icon: AlertTriangle, color: 'text-yellow-600' },
                  { time: '12:15', action: 'Paquete recibido', detail: 'Para María González - Apto 108', icon: UserCheck, color: 'text-blue-600' },
                  { time: '11:30', action: 'Turno extra aprobado', detail: 'Evento social - 4 horas', icon: Clock, color: 'text-purple-600' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 hover:bg-accent rounded-lg transition-colors">
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.detail}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'shifts':
        return <ExtraShiftManagement />;
      case 'visits':
        return <VisitValidation />;
      case 'incidents':
        return (
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Gestión de Incidentes</h3>
            <p className="text-muted-foreground">Funcionalidad de incidentes en desarrollo...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout title="Portal de Conserjes">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Portal de Conserjes
          </h1>
          <p className="text-muted-foreground">
            Gestiona turnos, visitas e incidentes del condominio
          </p>
        </div>

        {/* Navegación por pestañas */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido de la pestaña activa */}
        {renderTabContent()}
      </div>
    </AppLayout>
  );
};

export default ConciergePage;
