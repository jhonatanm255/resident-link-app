
import React, { useState } from 'react';
import { AppButton } from '@/components/ui/app-button';
import { QrCode, Plus, Calendar, Clock, User } from 'lucide-react';

export const VisitManagement = () => {
  const [visits, setVisits] = useState([
    {
      id: '1',
      visitorName: 'Juan Pérez',
      visitDate: '2024-01-15',
      visitTime: '14:00',
      qrCode: 'QR123456',
      numericCode: '789123',
      status: 'pending' as const
    }
  ]);

  const generateVisitCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const generateNumericCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleNewVisit = () => {
    // En una implementación real, esto abriría un modal o formulario
    const newVisit = {
      id: Date.now().toString(),
      visitorName: 'Nueva Visita',
      visitDate: new Date().toISOString().split('T')[0],
      visitTime: '15:00',
      qrCode: generateVisitCode(),
      numericCode: generateNumericCode(),
      status: 'pending' as const
    };
    setVisits([...visits, newVisit]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Gestión de Visitas</h2>
        <AppButton leftIcon={<Plus size={18} />} onClick={handleNewVisit}>
          Nueva Visita
        </AppButton>
      </div>
      
      <div className="space-y-4">
        {visits.map((visit) => (
          <div key={visit.id} className="border dark:border-gray-600 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <User className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{visit.visitorName}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {visit.visitDate}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {visit.visitTime}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center mb-2">
                  <QrCode className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-mono text-sm text-blue-600">{visit.qrCode}</span>
                </div>
                <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  #{visit.numericCode}
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
                  {visit.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
