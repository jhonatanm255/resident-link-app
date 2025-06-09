
import React from 'react';
import { AppButton } from '@/components/ui/app-button';
import { Truck, Plus, Phone, Mail } from 'lucide-react';

export const ProviderManagement = () => {
  const providers = [
    {
      id: 1,
      name: "Empresa de Limpieza ProClean",
      service: "Limpieza",
      contact: "+56 9 1234 5678",
      email: "contacto@proclean.cl",
      status: "activo"
    },
    {
      id: 2,
      name: "Mantenciones Técnicas SPA",
      service: "Mantención",
      contact: "+56 9 8765 4321",
      email: "servicios@manttec.cl",
      status: "activo"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Gestión de Proveedores</h2>
        <AppButton leftIcon={<Plus size={18} />}>
          Nuevo Proveedor
        </AppButton>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-gray-600">
              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Proveedor</th>
              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Servicio</th>
              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Contacto</th>
              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Estado</th>
              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id} className="border-b dark:border-gray-600">
                <td className="py-3">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-gray-500" />
                    <span className="text-gray-800 dark:text-gray-200">{provider.name}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-600 dark:text-gray-400">{provider.service}</td>
                <td className="py-3">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4 mr-1" />
                      {provider.contact}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="h-4 w-4 mr-1" />
                      {provider.email}
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200">
                    {provider.status}
                  </span>
                </td>
                <td className="py-3">
                  <AppButton size="sm" variant="outline">
                    Editar
                  </AppButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
