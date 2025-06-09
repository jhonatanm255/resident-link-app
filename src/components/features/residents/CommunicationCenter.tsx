
import React, { useState } from 'react';
import { AppButton } from '@/components/ui/app-button';
import { MessageSquare, Send, Bell, Mail } from 'lucide-react';

export const CommunicationCenter = () => {
  const [messages] = useState([
    {
      id: '1',
      title: 'Reunión de Copropietarios',
      content: 'Se convoca a reunión ordinaria para el próximo viernes 20 de enero a las 19:00 hrs.',
      date: '2024-01-10',
      type: 'announcement',
      read: false
    },
    {
      id: '2',
      title: 'Corte de Agua Programado',
      content: 'Informamos que habrá corte de agua el sábado de 8:00 a 12:00 hrs por mantención.',
      date: '2024-01-08',
      type: 'notice',
      read: true
    }
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Centro de Comunicaciones</h2>
        <AppButton leftIcon={<Send size={18} />}>
          Nuevo Mensaje
        </AppButton>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`border rounded-lg p-4 transition-colors duration-300 ${
            !message.read 
              ? 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20' 
              : 'border-gray-200 dark:border-gray-600'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {message.type === 'announcement' ? (
                    <Bell className="h-4 w-4 text-orange-500" />
                  ) : (
                    <Mail className="h-4 w-4 text-blue-500" />
                  )}
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">{message.title}</h3>
                  {!message.read && (
                    <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full">Nuevo</span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{message.content}</p>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {new Date(message.date).toLocaleDateString('es-ES')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
