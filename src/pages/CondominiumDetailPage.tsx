import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { ApartmentCard } from "@/components/cards/ApartmentCard";
import { useApp } from "@/contexts/AppContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Building2, 
  Edit, 
  Plus, 
  ArrowLeft, 
  QrCode, 
  Search,
  HomeIcon
} from "lucide-react";
import { useState } from "react";

const CondominiumDetailPage = () => {
  const { condominiums } = useApp();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const condominium = condominiums.find((c) => c.id === id);

  if (!condominium) {
    return (
      <AppLayout title="Condominio no encontrado">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Condominio no encontrado</h1>
          <p className="text-gray-600 mb-8">El condominio que estás buscando no existe o ha sido eliminado</p>
          <Link to="/condominiums">
            <AppButton>Ver todos los condominios</AppButton>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const filteredApartments = condominium.apartments.filter((apartment) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      apartment.apartmentNumber.toLowerCase().includes(searchTermLower) ||
      apartment.residents.some(r => r.name.toLowerCase().includes(searchTermLower)) ||
      (apartment.parkingNumber && apartment.parkingNumber.toLowerCase().includes(searchTermLower)) ||
      (apartment.storageUnitNumber && apartment.storageUnitNumber.toLowerCase().includes(searchTermLower))
    );
  });

  return (
    <AppLayout title={condominium.name}>
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Volver</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-primary-100 p-3 rounded-full mr-4">
                <Building2 className="h-6 w-6 text-primary-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{condominium.name}</h1>
                <p className="text-gray-600">{condominium.address}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 w-full md:w-auto">
              <Link to={`/condominiums/${id}/edit`}>
                <AppButton
                  variant="outline"
                  leftIcon={<Edit size={16} />}
                  className="justify-center w-full sm:w-auto"
                >
                  Editar
                </AppButton>
              </Link>
              <Link to={`/share?condominiumId=${id}`}>
                <AppButton
                  variant="outline"
                  leftIcon={<QrCode size={16} />}
                  className="justify-center w-full sm:w-auto"
                >
                  Compartir
                </AppButton>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Apartamentos</h2>
            <p className="text-gray-600 mt-1">
              {condominium.apartments.length > 0
                ? `${condominium.apartments.length} apartamento${condominium.apartments.length !== 1 ? "s" : ""} registrado${condominium.apartments.length !== 1 ? "s" : ""}`
                : "No hay apartamentos registrados"}
            </p>
          </div>
          <Link to={`/condominiums/${id}/apartments/new`} className="mt-4 md:mt-0">
            <AppButton
              leftIcon={<Plus size={18} />}
            >
              Nuevo Apartamento
            </AppButton>
          </Link>
        </div>

        {condominium.apartments.length > 0 && (
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Buscar por número, residente, estacionamiento o bodega..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {filteredApartments.length > 0 ? (
          <div className="space-y-4">
            {filteredApartments.map((apartment) => (
              <ApartmentCard
                key={apartment.id}
                apartment={apartment}
                condominiumId={condominium.id}
              />
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
                <p className="text-gray-500 mb-6">No hay apartamentos que coincidan con "{searchTerm}"</p>
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
                  <HomeIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay apartamentos registrados</h3>
                <p className="text-gray-500 mb-6">Comienza registrando el primer apartamento</p>
                <Link to={`/condominiums/${id}/apartments/new`}>
                  <AppButton
                    leftIcon={<Plus size={18} />}
                  >
                    Registrar Apartamento
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

export default CondominiumDetailPage;
