
import React from 'react';
import { AppButton } from '@/components/ui/app-button';
import { CreditCard, Plus, FileText, Eye, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PaymentManagement = () => {
  return (
    <div className="bg-card rounded-lg shadow-lg p-6 border transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">Gestión de Pagos</h2>
        <Link to="/admin/payments">
          <AppButton leftIcon={<Eye size={18} />}>
            Ver Todo
          </AppButton>
        </Link>
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
            <TrendingUp className="h-8 w-8 text-red-600 mr-3" />
            <div>
              <h3 className="font-medium text-red-800 dark:text-red-200">Vencidos</h3>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Link to="/admin/payments">
          <AppButton leftIcon={<Plus size={18} />}>
            Nuevo Cargo
          </AppButton>
        </Link>
        <AppButton variant="outline" leftIcon={<FileText size={18} />}>
          Generar Reporte
        </AppButton>
      </div>
    </div>
  );
};
