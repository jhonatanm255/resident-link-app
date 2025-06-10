
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
            <h1 className="text-2xl font-bold text-foreground transition-colors duration-300">Mis Condominios</h1>
            <p className="text-muted-foreground mt-1 transition-colors duration-300">
              {condominiums.length > 0
                ? `${condominiums.length} condominio${condominiums.length !== 1 ? "s" : ""} registrado${condominiums.length !== 1 ? "s" : ""}`
                : "No hay condominios registrados"}
            </p>
          </div>
          <Link to="/condominiums/new" className="mt-4 md:mt-0">
            <AppButton
              leftIcon={<Plus size={18} />}
              className="transition-all duration-300"
            >
              Nuevo Condominio
            </AppButton>
          </Link>
        </div>

        {condominiums.length > 0 && (
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground transition-colors duration-300" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300"
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
          <div className="text-center py-12 bg-card rounded-lg shadow-sm border border-border transition-colors duration-300">
            {searchTerm ? (
              <>
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-muted-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2 transition-colors duration-300">No se encontraron resultados</h3>
                <p className="text-muted-foreground mb-6 transition-colors duration-300">No hay condominios que coincidan con "{searchTerm}"</p>
                <AppButton
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="transition-all duration-300"
                >
                  Limpiar búsqueda
                </AppButton>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <Building2 className="h-12 w-12 text-muted-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2 transition-colors duration-300">No hay condominios registrados</h3>
                <p className="text-muted-foreground mb-6 transition-colors duration-300">Comienza registrando tu primer condominio</p>
                <Link to="/condominiums/new">
                  <AppButton
                    leftIcon={<Plus size={18} />}
                    className="transition-all duration-300"
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
