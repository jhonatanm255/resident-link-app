
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AppButton } from '@/components/ui/app-button';
import { Plus, Send, Bell, Users, Calendar, MessageSquare } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';

const NotificationsPage = () => {
  const { isAdmin } = useUserRole();
  const [notifications] = useState([
    {
      id: '1',
      title: 'Corte de Agua Programado',
      message: 'Se realizará mantención del sistema de agua potable el día sábado de 8:00 a 16:00 hrs.',
      recipients: 'all',
      sentDate: '2024-01-15',
      status: 'sent',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Reunión de Condominio',
      message: 'Se convoca a reunión extraordinaria para el día 25 de enero a las 19:00 hrs en el salón de eventos.',
      recipients: 'residents',
      sentDate: '2024-01-12',
      status: 'sent',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Nueva Normativa de Estacionamientos',
      message: 'Se informa sobre las nuevas normas de uso de estacionamientos de visitas.',
      recipients: 'all',
      sentDate: null,
      status: 'draft',
      priority: 'low'
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">Enviado</span>;
      case 'draft':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">Borrador</span>;
      case 'scheduled':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200">Programado</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200">Desconocido</span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200">Alta</span>;
      case 'medium':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">Media</span>;
      case 'low':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">Baja</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200">Normal</span>;
    }
  };

  const getRecipientsLabel = (recipients: string) => {
    switch (recipients) {
      case 'all': return 'Todos los usuarios';
      case 'residents': return 'Solo residentes';
      case 'committee': return 'Solo comité';
      case 'concierge': return 'Solo conserjes';
      default: return 'Grupo personalizado';
    }
  };

  return (
    <AppLayout title="Gestión de Notificaciones">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Notificaciones</h1>
            <p className="text-muted-foreground">Envía notificaciones y comunicados a los residentes</p>
          </div>
          <AppButton leftIcon={<Plus size={18} />}>
            Nueva Notificación
          </AppButton>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Send className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Enviadas</h3>
                <p className="text-2xl font-bold text-green-600">142</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Borradores</h3>
                <p className="text-2xl font-bold text-yellow-600">8</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Programadas</h3>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Alcance Promedio</h3>
                <p className="text-2xl font-bold text-purple-600">89%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plantillas rápidas */}
        <div className="bg-card rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-foreground">Plantillas Rápidas</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AppButton variant="outline" className="h-16 flex-col">
                <Bell className="h-6 w-6 mb-2" />
                <span>Aviso General</span>
              </AppButton>
              <AppButton variant="outline" className="h-16 flex-col">
                <Calendar className="h-6 w-6 mb-2" />
                <span>Reunión</span>
              </AppButton>
              <AppButton variant="outline" className="h-16 flex-col">
                <MessageSquare className="h-6 w-6 mb-2" />
                <span>Emergencia</span>
              </AppButton>
            </div>
          </div>
        </div>

        {/* Tabla de notificaciones */}
        <div className="bg-card rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-foreground">Historial de Notificaciones</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-6 text-foreground font-medium">Título</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Destinatarios</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Prioridad</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Fecha</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Estado</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <tr key={notification.id} className="border-b hover:bg-accent/50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-foreground">{notification.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">{notification.message}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{getRecipientsLabel(notification.recipients)}</td>
                    <td className="py-4 px-6">{getPriorityBadge(notification.priority)}</td>
                    <td className="py-4 px-6 text-muted-foreground">{notification.sentDate || 'No enviado'}</td>
                    <td className="py-4 px-6">{getStatusBadge(notification.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        {notification.status === 'draft' ? (
                          <AppButton size="sm" leftIcon={<Send size={16} />}>
                            Enviar
                          </AppButton>
                        ) : (
                          <AppButton size="sm" variant="outline">
                            Ver
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

export default NotificationsPage;
