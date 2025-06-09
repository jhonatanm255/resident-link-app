
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { Shield, Clock, Plus, Calendar, FileText, CheckSquare, UserCheck } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";
import { VisitValidation } from "@/components/features/concierge/VisitValidation";

const ConciergePage = () => {
  const { isConcierge, isAdmin } = useUserRole();
  
  if (!isConcierge && !isAdmin) {
    return (
      <AppLayout title="Acceso Denegado">
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No tienes permisos para acceder a esta sección.</p>
        </div>
      </AppLayout>
    );
  }

  const [extraShifts, setExtraShifts] = useState([
    {
      id: 1,
      condominium: "Torre Azul",
      date: "2024-01-15",
      hours: 8,
      description: "Cobertura fin de semana",
      status: "completado"
    },
    {
      id: 2,
      condominium: "Residencias del Norte",
      date: "2024-01-20",
      hours: 4,
      description: "Turno nocturno adicional",
      status: "pendiente"
    }
  ]);

  const conciergeFeatures = [
    {
      title: "Turnos Extras",
      description: "Gestionar y registrar turnos adicionales",
      icon: Clock,
      color: "bg-blue-500",
      count: extraShifts.length
    },
    {
      title: "Reportes Diarios",
      description: "Crear reportes de actividades del turno",
      icon: FileText,
      color: "bg-green-500",
      count: "5 pendientes"
    },
    {
      title: "Tareas Asignadas",
      description: "Ver y completar tareas asignadas",
      icon: CheckSquare,
      color: "bg-purple-500",
      count: "3 activas"
    },
    {
      title: "Horarios",
      description: "Consultar horarios y calendarios",
      icon: Calendar,
      color: "bg-orange-500",
      count: "Esta semana"
    },
    {
      title: "Gestión de Visitas",
      description: "Validar y gestionar visitas de residentes",
      icon: UserCheck,
      color: "bg-teal-500",
      count: "2 pendientes"
    }
  ];

  const handleAddExtraShift = () => {
    const newShift = {
      id: extraShifts.length + 1,
      condominium: "Nuevo Condominio",
      date: new Date().toISOString().split('T')[0],
      hours: 4,
      description: "Turno extra",
      status: "pendiente"
    };
    setExtraShifts([...extraShifts, newShift]);
  };

  return (
    <AppLayout title="Panel de Conserjes">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Panel de Conserjes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona tus turnos, reportes y actividades diarias
          </p>
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {conciergeFeatures.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className={`${feature.color} p-4 text-white`}>
                <feature.icon className="h-8 w-8 mb-2" />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm opacity-90">{feature.count}</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{feature.description}</p>
                <AppButton size="sm" fullWidth>
                  Ver
                </AppButton>
              </div>
            </div>
          ))}
        </div>

        {/* Sistema de validación de visitas */}
        <div className="mb-8">
          <VisitValidation />
        </div>

        {/* Gestión de Turnos Extras */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Turnos Extras</h2>
            <AppButton leftIcon={<Plus size={18} />} onClick={handleAddExtraShift}>
              Registrar Turno Extra
            </AppButton>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-600">
                  <th className="text-left py-2 text-gray-700 dark:text-gray-300">Condominio</th>
                  <th className="text-left py-2 text-gray-700 dark:text-gray-300">Fecha</th>
                  <th className="text-left py-2 text-gray-700 dark:text-gray-300">Horas</th>
                  <th className="text-left py-2 text-gray-700 dark:text-gray-300">Descripción</th>
                  <th className="text-left py-2 text-gray-700 dark:text-gray-300">Estado</th>
                  <th className="text-left py-2 text-gray-700 dark:text-gray-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {extraShifts.map((shift) => (
                  <tr key={shift.id} className="border-b dark:border-gray-600">
                    <td className="py-3 text-gray-800 dark:text-gray-200">{shift.condominium}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{shift.date}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{shift.hours}h</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{shift.description}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        shift.status === 'completado' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                      }`}>
                        {shift.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <AppButton size="sm" variant="outline">
                        Editar
                      </AppButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen del día */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Resumen de Hoy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800 dark:text-blue-200">Turno Actual</h3>
              <p className="text-blue-600 font-semibold">06:00 - 14:00</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 dark:text-green-200">Tareas Completadas</h3>
              <p className="text-green-600 font-semibold">7 de 10</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-medium text-purple-800 dark:text-purple-200">Horas Extra</h3>
              <p className="text-purple-600 font-semibold">2 horas</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ConciergePage;
