
import React from 'react';
import CondominiumPieChart from './CondominiumPieChart';

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-600">Resumen de condominios y apartamentos</p>
      </div>
      <div className="max-w-3xl mx-auto">
        <CondominiumPieChart />
      </div>
    </div>
  );
};

export default Dashboard;
