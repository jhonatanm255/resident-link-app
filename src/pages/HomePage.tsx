
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { useApp } from "@/contexts/AppContext";
import { Building2, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { condominiums } = useApp();

  return (
    <AppLayout title="ResidentLink">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Bienvenido a ResidentLink</h1>
          <p className="text-gray-600">
            Gestiona fácilmente la información de residentes en tus condominios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center bg-primary-50 h-16 w-16 rounded-full mx-auto mb-4">
              <Building2 className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-center mb-3">Mis Condominios</h2>
            <p className="text-gray-600 text-center mb-6">
              {condominiums.length > 0
                ? `Tienes ${condominiums.length} condominio${condominiums.length !== 1 ? "s" : ""} registrado${condominiums.length !== 1 ? "s" : ""}`
                : "Comienza a registrar tus condominios"}
            </p>
            <Link to="/condominiums">
              <AppButton fullWidth>Ver Condominios</AppButton>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center bg-primary-50 h-16 w-16 rounded-full mx-auto mb-4">
              <QrCode className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-center mb-3">Compartir Datos</h2>
            <p className="text-gray-600 text-center mb-6">
              Comparte o recibe información de condominios mediante código QR o código numérico
            </p>
            <Link to="/share">
              <AppButton fullWidth>Compartir Datos</AppButton>
            </Link>
          </div>
        </div>

        {condominiums.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
            <div className="space-y-3">
              {condominiums.slice(0, 3).map((condominium) => (
                <Link 
                  key={condominium.id} 
                  to={`/condominiums/${condominium.id}`}
                  className="flex justify-between items-center p-3 rounded-md hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-800">{condominium.name}</p>
                    <p className="text-sm text-gray-500">
                      {condominium.apartments.length} {condominium.apartments.length === 1 ? 'apartamento' : 'apartamentos'}
                    </p>
                  </div>
                  <span className="text-primary-600 text-sm">Ver detalles</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Link to="/condominiums/new">
            <AppButton 
              variant="primary"
              leftIcon={<Building2 size={18} />}
            >
              Registrar Nuevo Condominio
            </AppButton>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
