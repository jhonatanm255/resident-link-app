
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AppButton } from '@/components/ui/app-button';
import { Plus, Edit, Trash2, Shield, User, UserCheck, Building } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';

const UsersPage = () => {
  const { isAdmin } = useUserRole();
  const [users] = useState([
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@test.com',
      role: 'resident',
      apartment: 'Apt 304',
      condominium: 'Edificio Central',
      status: 'active'
    },
    {
      id: '2',
      name: 'María González',
      email: 'maria@test.com',
      role: 'concierge',
      apartment: null,
      condominium: 'Edificio Central',
      status: 'active'
    },
    {
      id: '3',
      name: 'Carlos Rodríguez',
      email: 'carlos@test.com',
      role: 'committee',
      apartment: 'Apt 108',
      condominium: 'Torre Norte',
      status: 'active'
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'committee': return <UserCheck className="h-4 w-4" />;
      case 'concierge': return <Building className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'committee': return 'Comité';
      case 'concierge': return 'Conserje';
      default: return 'Residente';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
      case 'committee': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200';
      case 'concierge': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
    }
  };

  return (
    <AppLayout title="Gestión de Usuarios">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios</h1>
            <p className="text-muted-foreground">Administra residentes, conserjes y miembros del comité</p>
          </div>
          <AppButton leftIcon={<Plus size={18} />}>
            Nuevo Usuario
          </AppButton>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <User className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Residentes</h3>
                <p className="text-2xl font-bold text-green-600">156</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Conserjes</h3>
                <p className="text-2xl font-bold text-blue-600">4</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Comité</h3>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Administradores</h3>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className="bg-card rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-foreground">Lista de Usuarios</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-6 text-foreground font-medium">Usuario</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Rol</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Ubicación</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Estado</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-accent/50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        <span className="ml-1">{getRoleLabel(user.role)}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="text-foreground">{user.condominium}</div>
                        {user.apartment && <div className="text-muted-foreground">{user.apartment}</div>}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">
                        Activo
                      </span>
                    </td>
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

export default UsersPage;
