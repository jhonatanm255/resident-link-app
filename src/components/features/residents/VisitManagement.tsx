
import React, { useState } from 'react';
import { QrCode, Calendar, Clock, User, Eye, Trash2 } from 'lucide-react';
import { AppButton } from '@/components/ui/app-button';
import { NewVisitModal } from './NewVisitModal';

interface Visit {
  id: string;
  visitorName: string;
  visitDate: string;
  visitTime: string;
  purpose?: string;
  qrCode: string;
  numericCode: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
}

export const VisitManagement = () => {
  const [visits, setVisits] = useState<Visit[]>([
    {
      id: '1',
      visitorName: 'Juan Pérez',
      visitDate: '2024-01-15',
      visitTime: '14:00',
      purpose: 'Visita familiar',
      qrCode: 'QR123456',
      numericCode: '789123',
      status: 'pending'
    }
  ]);

  const generateVisitCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const generateNumericCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleNewVisit = (visitData: {
    visitorName: string;
    visitDate: string;
    visitTime: string;
    purpose: string;
  }) => {
    const newVisit: Visit = {
      id: Date.now().toString(),
      ...visitData,
      qrCode: generateVisitCode(),
      numericCode: generateNumericCode(),
      status: 'pending'
    };
    setVisits([...visits, newVisit]);
  };

  const handleDeleteVisit = (visitId: string) => {
    setVisits(visits.filter(visit => visit.id !== visitId));
  };

  const getStatusColor = (status: Visit['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusText = (status: Visit['status']) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'approved': return 'Aprobada';
      case 'rejected': return 'Rechazada';
      case 'completed': return 'Completada';
      default: return status;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Gestión de Visitas</h2>
        <NewVisitModal onAddVisit={handleNewVisit} />
      </div>
      
      <div className="space-y-4">
        {visits.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No tienes visitas registradas
          </div>
        ) : (
          visits.map((visit) => (
            <div key={visit.id} className="border dark:border-gray-600 rounded-lg p-4 transition-colors duration-300">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <User className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">{visit.visitorName}</span>
                  </div>
                  
                  {visit.purpose && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{visit.purpose}</p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(visit.visitDate).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {visit.visitTime}
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <div className="flex items-center justify-end mb-2">
                    <QrCode className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="font-mono text-sm text-blue-600 dark:text-blue-400">{visit.qrCode}</span>
                  </div>
                  
                  <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    #{visit.numericCode}
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs transition-colors duration-300 ${getStatusColor(visit.status)}`}>
                    {getStatusText(visit.status)}
                  </span>
                  
                  <div className="flex gap-2 mt-2">
                    <AppButton size="sm" variant="outline" leftIcon={<Eye size={14} />}>
                      Ver QR
                    </AppButton>
                    <AppButton 
                      size="sm" 
                      variant="outline" 
                      leftIcon={<Trash2 size={14} />}
                      className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => handleDeleteVisit(visit.id)}
                    >
                      Eliminar
                    </AppButton>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
