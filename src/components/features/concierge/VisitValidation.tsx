
import React, { useState } from 'react';
import { AppButton } from '@/components/ui/app-button';
import { QrCode, Hash, CheckCircle, XCircle, Search } from 'lucide-react';

export const VisitValidation = () => {
  const [searchCode, setSearchCode] = useState('');
  const [pendingVisits] = useState([
    {
      id: '1',
      visitorName: 'Juan Pérez',
      residentName: 'María González - Apt 304',
      visitTime: '14:00',
      qrCode: 'QR123456',
      numericCode: '789123',
      status: 'pending' as const
    }
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Validación de Visitas</h2>
      
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Código QR o Numérico"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <AppButton leftIcon={<Search size={18} />}>
            Buscar
          </AppButton>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">Visitas Pendientes</h3>
        {pendingVisits.map((visit) => (
          <div key={visit.id} className="border dark:border-gray-600 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200">{visit.visitorName}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{visit.residentName}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hora: {visit.visitTime}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center">
                    <QrCode className="h-4 w-4 mr-1 text-blue-600" />
                    <span className="font-mono text-sm">{visit.qrCode}</span>
                  </div>
                  <div className="flex items-center">
                    <Hash className="h-4 w-4 mr-1" />
                    <span className="font-mono text-sm">{visit.numericCode}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <AppButton 
                  size="sm" 
                  variant="outline"
                  leftIcon={<CheckCircle size={16} />}
                  className="text-green-600 border-green-600"
                >
                  Aprobar
                </AppButton>
                <AppButton 
                  size="sm" 
                  variant="outline"
                  leftIcon={<XCircle size={16} />}
                  className="text-red-600 border-red-600"
                >
                  Rechazar
                </AppButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
