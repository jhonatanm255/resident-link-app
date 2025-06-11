
import React from 'react';
import { AppButton } from '@/components/ui/app-button';
import { Truck, Plus, Phone, Mail, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="bg-card rounded-lg shadow-lg p-6 border transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">Gestión de Proveedores</h2>
        <Link to="/admin/providers">
          <AppButton leftIcon={<Eye size={18} />}>
            Ver Todo
          </AppButton>
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b dark:border-border">
              <th className="text-left py-2 text-foreground">Proveedor</th>
              <th className="text-left py-2 text-foreground">Servicio</th>
              <th className="text-left py-2 text-foreground">Contacto</th>
              <th className="text-left py-2 text-foreground">Estado</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id} className="border-b dark:border-border">
                <td className="py-3">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span className="text-foreground">{provider.name}</span>
                  </div>
                </td>
                <td className="py-3 text-muted-foreground">{provider.service}</td>
                <td className="py-3">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-1" />
                      {provider.contact}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-center">
        <Link to="/admin/providers">
          <AppButton leftIcon={<Plus size={18} />}>
            Nuevo Proveedor
          </AppButton>
        </Link>
      </div>
    </div>
  );
};
