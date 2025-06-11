
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AppButton } from '@/components/ui/app-button';
import { Plus, CreditCard, DollarSign, TrendingUp, Calendar, Download, Eye } from 'lucide-react';
import { useUserRole } from '@/hooks/useUserRole';

const PaymentsPage = () => {
  const { isAdmin } = useUserRole();
  const [payments] = useState([
    {
      id: '1',
      resident: 'Juan Pérez',
      apartment: 'Apt 304',
      amount: 85000,
      concept: 'Gastos Comunes Enero',
      dueDate: '2024-01-31',
      status: 'paid',
      paidDate: '2024-01-28'
    },
    {
      id: '2',
      resident: 'María González',
      apartment: 'Apt 108',
      amount: 92000,
      concept: 'Gastos Comunes Enero',
      dueDate: '2024-01-31',
      status: 'pending',
      paidDate: null
    },
    {
      id: '3',
      resident: 'Carlos Rodríguez',
      apartment: 'Apt 205',
      amount: 78000,
      concept: 'Gastos Comunes Enero',
      dueDate: '2024-01-31',
      status: 'overdue',
      paidDate: null
    }
  ]);

  if (!isAdmin) {
    return (
      <AppLayout title="Acceso Denegado">
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tienes permisos para acceder a esta sección.</p>
        </div>
      </AppLayout>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">Pagado</span>;
      case 'pending':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">Pendiente</span>;
      case 'overdue':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200">Vencido</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200">Desconocido</span>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(amount);
  };

  return (
    <AppLayout title="Pagos y Gastos Comunes">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pagos y Gastos Comunes</h1>
            <p className="text-muted-foreground">Gestiona los pagos y gastos del condominio</p>
          </div>
          <div className="flex space-x-2">
            <AppButton variant="outline" leftIcon={<Download size={18} />}>
              Exportar
            </AppButton>
            <AppButton leftIcon={<Plus size={18} />}>
              Nuevo Cargo
            </AppButton>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Total Recaudado</h3>
                <p className="text-2xl font-bold text-green-600">$2.450.000</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Pendientes</h3>
                <p className="text-2xl font-bold text-yellow-600">$456.000</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-red-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">Vencidos</h3>
                <p className="text-2xl font-bold text-red-600">$234.000</p>
              </div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-medium text-foreground">% Cobranza</h3>
                <p className="text-2xl font-bold text-blue-600">84%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de pagos */}
        <div className="bg-card rounded-lg shadow-lg border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-foreground">Registro de Pagos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-6 text-foreground font-medium">Residente</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Concepto</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Monto</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Vencimiento</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Estado</th>
                  <th className="text-left py-3 px-6 text-foreground font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-accent/50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-foreground">{payment.resident}</div>
                        <div className="text-sm text-muted-foreground">{payment.apartment}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-foreground">{payment.concept}</td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-foreground">{formatCurrency(payment.amount)}</span>
                    </td>
                    <td className="py-4 px-6 text-muted-foreground">{payment.dueDate}</td>
                    <td className="py-4 px-6">{getStatusBadge(payment.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <AppButton size="sm" variant="outline" leftIcon={<Eye size={16} />}>
                          Ver
                        </AppButton>
                        {payment.status !== 'paid' && (
                          <AppButton size="sm" leftIcon={<CreditCard size={16} />}>
                            Marcar Pagado
                          </AppButton>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PaymentsPage;
