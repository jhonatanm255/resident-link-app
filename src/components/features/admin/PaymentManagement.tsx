
import React from 'react';
import { AppButton } from '@/components/ui/app-button';
import { CreditCard, Plus, FileText } from 'lucide-react';

export const PaymentManagement = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Gestión de Pagos</h2>
        <AppButton leftIcon={<Plus size={18} />}>
          Nuevo Cargo
        </AppButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-200">Pagos al Día</h3>
              <p className="text-2xl font-bold text-green-600">85%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Pendientes</h3>
              <p className="text-2xl font-bold text-yellow-600">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <h3 className="font-medium text-red-800 dark:text-red-200">Vencidos</h3>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>Sistema de gestión de pagos en desarrollo</p>
      </div>
    </div>
  );
};
