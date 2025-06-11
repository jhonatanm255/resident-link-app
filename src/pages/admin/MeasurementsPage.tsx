
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AppButton } from '@/components/ui/app-button';
import { Plus, Gauge, Droplets, Flame, Zap, TrendingUp, Calendar } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';

const MeasurementsPage = () => {
  const { isAdmin } = useUserRole();
  const [measurements] = useState([
    {
      id: '1',
      apartment: 'Apt 304',
      resident: 'Juan Pérez',
      water: 15.5,
      gas: 8.2,
      electricity: 245,
      heating: 12.8,
      period: '2024-01',
      status: 'published'
    },
    {
      id: '2',
      apartment: 'Apt 108',
      resident: 'María González',
      water: 18.2,
      gas: 9.5,
      electricity: 312,
      heating: 15.2,
      period: '2024-01',
      status: 'published'
    },
    {
      id: '3',
      apartment: 'Apt 205',
      resident: 'Carlos Rodríguez',
      water: 12.8,
      gas: 6.8,
      electricity: 198,
      heating: 8.5,
      period: '2024-01',
      status: 'draft'
    }
  ]);

  if (!isAdmin) {
    return (
      <AppLayout title="Acceso Denegado">
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tienes permisos para acceder a esta sección.</p>
        </div>
      </AppLayout>
    );
  }

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'water': return <Droplets className="h-5 w-5 text-blue-600" />;
      case 'gas': return <Flame className="h-5 w-5 text-orange-600" />;
      case 'electricity': return <Zap className="h-5 w-5 text-yellow-600" />;
      case 'heating': return <Gauge className="h-5 w-5 text-red-600" />;
      default: return <Gauge className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">Publicado</span>;
      case 'draft':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">Borrador</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200">Desconocido</span>;
    }
  };

  return (
    <AppLayout title="Mediciones">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mediciones de Servicios</h1>
            <p className="text-muted-foreground">Registra y publica las mediciones de agua, gas, luz y calefacción</p>
          </div>
          <AppButton leftIcon={<Plus size={18} />}>
            Nueva Medición
          </AppButton>
        </div>

        {/* Estadísticas de consumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Droplets className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Agua (m³)</h3>
                <p className="text-2xl font-bold text-blue-600">1,245</p>
                <p className="text-xs text-muted-foreground">Total mensual</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Flame className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Gas (m³)</h3>
                <p className="text-2xl font-bold text-orange-600">892</p>
                <p className="text-xs text-muted-foreground">Total mensual</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Electricidad (kWh)</h3>
                <p className="text-2xl font-bold text-yellow-600">24,580</p>
                <p className="text-xs text-muted-foreground">Total mensual</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Gauge className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Calefacción (cal)</h3>
                <p className="text-2xl font-bold text-red-600">1,856</p>
                <p className="text-xs text-muted-foreground">Total mensual</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de mediciones */}
        <div className="bg-card rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Registro de Mediciones</h2>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Período: Enero 2024</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-6 text-foreground font-medium">Departamento</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Agua (m³)</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Gas (m³)</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Luz (kWh)</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Calefacción</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Estado</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {measurements.map((measurement) => (
                  <tr key={measurement.id} className="border-b hover:bg-accent/50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-foreground">{measurement.apartment}</div>
                        <div className="text-sm text-muted-foreground">{measurement.resident}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Droplets className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-foreground">{measurement.water}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Flame className="h-4 w-4 text-orange-600 mr-2" />
                        <span className="text-foreground">{measurement.gas}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 text-yellow-600 mr-2" />
                        <span className="text-foreground">{measurement.electricity}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Gauge className="h-4 w-4 text-red-600 mr-2" />
                        <span className="text-foreground">{measurement.heating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(measurement.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <AppButton size="sm" variant="outline">
                          Editar
                        </AppButton>
                        {measurement.status === 'draft' && (
                          <AppButton size="sm">
                            Publicar
                          </AppButton>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default MeasurementsPage;
