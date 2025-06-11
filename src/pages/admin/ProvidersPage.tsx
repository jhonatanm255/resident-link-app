
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AppButton } from '@/components/ui/app-button';
import { Plus, Phone, Mail, Truck, Wrench, Droplets, Zap, Edit, Trash2 } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';

const ProvidersPage = () => {
  const { isAdmin } = useUserRole();
  const [providers] = useState([
    {
      id: '1',
      name: 'Empresa de Limpieza ProClean',
      service: 'Limpieza',
      category: 'cleaning',
      contact: '+56 9 1234 5678',
      email: 'contacto@proclean.cl',
      address: 'Av. Principal 123, Santiago',
      status: 'active',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Mantenciones Técnicas SPA',
      service: 'Mantención General',
      category: 'maintenance',
      contact: '+56 9 8765 4321',
      email: 'servicios@manttec.cl',
      address: 'Calle Técnica 456, Santiago',
      status: 'active',
      rating: 4.5
    },
    {
      id: '3',
      name: 'Servicios Eléctricos Luz',
      service: 'Electricidad',
      category: 'electrical',
      contact: '+56 9 5555 0000',
      email: 'emergencias@servluz.cl',
      address: 'Sector Industrial 789, Santiago',
      status: 'active',
      rating: 4.2
    },
    {
      id: '4',
      name: 'Gasfitería Express',
      service: 'Gasfitería',
      category: 'plumbing',
      contact: '+56 9 7777 8888',
      email: 'contacto@gasexpress.cl',
      address: 'Villa Los Técnicos 321, Santiago',
      status: 'inactive',
      rating: 3.9
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cleaning': return <Truck className="h-5 w-5 text-blue-600" />;
      case 'maintenance': return <Wrench className="h-5 w-5 text-green-600" />;
      case 'electrical': return <Zap className="h-5 w-5 text-yellow-600" />;
      case 'plumbing': return <Droplets className="h-5 w-5 text-cyan-600" />;
      default: return <Truck className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">Activo</span>;
      case 'inactive':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200">Inactivo</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200">Desconocido</span>;
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <AppLayout title="Gestión de Proveedores">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Proveedores</h1>
            <p className="text-muted-foreground">Administra los proveedores de servicios del condominio</p>
          </div>
          <AppButton leftIcon={<Plus size={18} />}>
            Nuevo Proveedor
          </AppButton>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Total Proveedores</h3>
                <p className="text-2xl font-bold text-blue-600">24</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Wrench className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Activos</h3>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Categorías</h3>
                <p className="text-2xl font-bold text-yellow-600">8</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Droplets className="h-8 w-8 text-cyan-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Rating Promedio</h3>
                <p className="text-2xl font-bold text-cyan-600">4.3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de proveedores */}
        <div className="bg-card rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-foreground">Lista de Proveedores</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-6 text-foreground font-medium">Proveedor</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Servicio</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Contacto</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Rating</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Estado</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider) => (
                  <tr key={provider.id} className="border-b hover:bg-accent/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        {getCategoryIcon(provider.category)}
                        <div className="ml-3">
                          <div className="font-medium text-foreground">{provider.name}</div>
                          <div className="text-sm text-muted-foreground">{provider.address}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-foreground">{provider.service}</td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-foreground">{provider.contact}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">{provider.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="flex mr-2">{getRatingStars(provider.rating)}</div>
                        <span className="text-sm text-muted-foreground">({provider.rating})</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(provider.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <AppButton size="sm" variant="outline" leftIcon={<Edit size={16} />}>
                          Editar
                        </AppButton>
                        <AppButton size="sm" variant="outline" leftIcon={<Trash2 size={16} />}>
                          Eliminar
                        </AppButton>
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

export default ProvidersPage;
