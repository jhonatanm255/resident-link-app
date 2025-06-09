
import React from 'react';
import CondominiumPieChart from '../dashboard/CondominiumPieChart';
import { useUserRole } from '@/hooks/useUserRole';

const Dashboard = () => {
  const { isAdmin } = useUserRole();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">Resumen de condominios y apartamentos</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        <CondominiumPieChart />
        {isAdmin && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Panel Administrativo</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Acceso completo a todas las funcionalidades del sistema como administrador.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
