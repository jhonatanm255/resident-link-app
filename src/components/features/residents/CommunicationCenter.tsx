
import React, { useState } from 'react';
import { AppButton } from '@/components/ui/app-button';
import { Bell, MessageSquare, Users, Calendar, AlertTriangle, Info, CheckCircle } from 'lucide-react';

export const CommunicationCenter = () => {
  const [selectedTab, setSelectedTab] = useState('announcements');

  const tabs = [
    { id: 'announcements', label: 'Comunicados', icon: Bell },
    { id: 'messages', label: 'Mensajes', icon: MessageSquare },
    { id: 'emergency', label: 'Emergencias', icon: AlertTriangle }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Mantenimiento de ascensores',
      content: 'El próximo martes 15 de enero se realizará mantenimiento preventivo de los ascensores.',
      date: '2024-01-10',
      priority: 'high',
      type: 'maintenance'
    },
    {
      id: 2,
      title: 'Reunión de condominio',
      content: 'Se convoca a reunión ordinaria para el día 20 de enero a las 19:00 hrs.',
      date: '2024-01-08',
      priority: 'medium',
      type: 'meeting'
    },
    {
      id: 3,
      title: 'Nuevas normas de convivencia',
      content: 'Se han actualizado las normas de convivencia. Revisar documento adjunto.',
      date: '2024-01-05',
      priority: 'low',
      type: 'info'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800';
      default: return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance': return AlertTriangle;
      case 'meeting': return Calendar;
      default: return Info;
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-lg p-6 border border-border transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-6 text-foreground transition-colors duration-300">Centro de Comunicaciones</h2>
      
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg transition-colors duration-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {selectedTab === 'announcements' && (
        <div className="space-y-4">
          {announcements.map((announcement) => {
            const TypeIcon = getTypeIcon(announcement.type);
            return (
              <div
                key={announcement.id}
                className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${getPriorityColor(announcement.priority)}`}
              >
                <div className="flex items-start space-x-3">
                  <TypeIcon className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{announcement.title}</h3>
                    <p className="text-sm mb-3">{announcement.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs opacity-75">{announcement.date}</span>
                      <AppButton 
                        size="sm" 
                        variant="outline"
                        className="transition-all duration-300"
                      >
                        Ver más
                      </AppButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedTab === 'messages' && (
        <div className="text-center py-8">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 transition-colors duration-300" />
          <h3 className="text-lg font-medium text-foreground mb-2 transition-colors duration-300">Mensajes Privados</h3>
          <p className="text-muted-foreground mb-4 transition-colors duration-300">Aquí podrás ver tus mensajes privados con la administración</p>
          <AppButton className="transition-all duration-300">Nuevo Mensaje</AppButton>
        </div>
      )}

      {selectedTab === 'emergency' && (
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-red-500 dark:text-red-400 mx-auto mb-4 transition-colors duration-300" />
          <h3 className="text-lg font-medium text-foreground mb-2 transition-colors duration-300">Emergencias</h3>
          <p className="text-muted-foreground mb-4 transition-colors duration-300">Contacta inmediatamente en caso de emergencia</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AppButton className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300">
              Emergencia Médica
            </AppButton>
            <AppButton className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300">
              Emergencia Técnica
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
};
