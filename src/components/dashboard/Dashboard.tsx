
import React from 'react';
import CondominiumPieChart from '../dashboard/CondominiumPieChart';
import FeedbackStats from './FeedbackStats';

const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-600">Resumen de condominios y apartamentos</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-8">
        <CondominiumPieChart />
        <FeedbackStats />
      </div>
    </div>
  );
};

export default Dashboard;
