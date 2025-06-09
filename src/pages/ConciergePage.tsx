
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { Shield, Clock, Plus, Calendar, FileText, CheckSquare } from "lucide-react";

const ConciergePage = () => {
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
    }
  ];

  const handleAddExtraShift = () => {
    // Esta funcionalidad se implementaría con un modal o formulario
    console.log("Agregar turno extra");
  };

  return (
    <AppLayout title="Panel de Conserjes">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Panel de Conserjes
          </h1>
          <p className="text-gray-600">
            Gestiona tus turnos, reportes y actividades diarias
          </p>
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {conciergeFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`${feature.color} p-4 text-white`}>
                <feature.icon className="h-8 w-8 mb-2" />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm opacity-90">{feature.count}</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                <AppButton size="sm" fullWidth>
                  Ver
                </AppButton>
              </div>
            </div>
          ))}
        </div>

        {/* Gestión de Turnos Extras */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Turnos Extras</h2>
            <AppButton leftIcon={<Plus size={18} />} onClick={handleAddExtraShift}>
              Registrar Turno Extra
            </AppButton>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Condominio</th>
                  <th className="text-left py-2">Fecha</th>
                  <th className="text-left py-2">Horas</th>
                  <th className="text-left py-2">Descripción</th>
                  <th className="text-left py-2">Estado</th>
                  <th className="text-left py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {extraShifts.map((shift) => (
                  <tr key={shift.id} className="border-b">
                    <td className="py-3">{shift.condominium}</td>
                    <td className="py-3">{shift.date}</td>
                    <td className="py-3">{shift.hours}h</td>
                    <td className="py-3">{shift.description}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        shift.status === 'completado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Resumen de Hoy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800">Turno Actual</h3>
              <p className="text-blue-600 font-semibold">06:00 - 14:00</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800">Tareas Completadas</h3>
              <p className="text-green-600 font-semibold">7 de 10</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-medium text-purple-800">Horas Extra</h3>
              <p className="text-purple-600 font-semibold">2 horas</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ConciergePage;
