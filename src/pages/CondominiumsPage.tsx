
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CondominiumCard } from "@/components/cards/CondominiumCard";
import { AppButton } from "@/components/ui/app-button";
import { useApp } from "@/contexts/AppContext";
import { Building2, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CondominiumsPage = () => {
  const { condominiums } = useApp();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCondominiums = condominiums.filter((condominium) =>
    condominium.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    condominium.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout title="Condominios">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mis Condominios</h1>
            <p className="text-gray-600 mt-1">
              {condominiums.length > 0
                ? `${condominiums.length} condominio${condominiums.length !== 1 ? "s" : ""} registrado${condominiums.length !== 1 ? "s" : ""}`
                : "No hay condominios registrados"}
            </p>
          </div>
          <Link to="/condominiums/new" className="mt-4 md:mt-0">
            <AppButton
              leftIcon={<Plus size={18} />}
            >
              Nuevo Condominio
            </AppButton>
          </Link>
        </div>

        {condominiums.length > 0 && (
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Buscar condominio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {filteredCondominiums.length > 0 ? (
          <div className="space-y-4">
            {filteredCondominiums.map((condominium) => (
              <CondominiumCard key={condominium.id} condominium={condominium} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            {searchTerm ? (
              <>
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
                <p className="text-gray-500 mb-6">No hay condominios que coincidan con "{searchTerm}"</p>
                <AppButton
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                >
                  Limpiar búsqueda
                </AppButton>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <Building2 className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay condominios registrados</h3>
                <p className="text-gray-500 mb-6">Comienza registrando tu primer condominio</p>
                <Link to="/condominiums/new">
                  <AppButton
                    leftIcon={<Plus size={18} />}
                  >
                    Registrar Condominio
                  </AppButton>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CondominiumsPage;
