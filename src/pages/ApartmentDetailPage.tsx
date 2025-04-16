
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { useApp } from "@/contexts/AppContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  HomeIcon, 
  Edit, 
  ArrowLeft, 
  User, 
  Car, 
  Package
} from "lucide-react";

const ApartmentDetailPage = () => {
  const { condominiums } = useApp();
  const { condominiumId, apartmentId } = useParams<{ condominiumId: string; apartmentId: string }>();
  const navigate = useNavigate();

  const condominium = condominiums.find((c) => c.id === condominiumId);
  const apartment = condominium?.apartments.find((a) => a.id === apartmentId);

  if (!condominium || !apartment) {
    return (
      <AppLayout title="Apartamento no encontrado">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Apartamento no encontrado</h1>
          <p className="text-gray-600 mb-8">El apartamento que estás buscando no existe o ha sido eliminado</p>
          <AppButton onClick={() => navigate(`/condominiums/${condominiumId || ''}`)}>
            Volver al condominio
          </AppButton>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`Apartamento ${apartment.apartmentNumber}`}>
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Volver</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-primary-50 p-3 rounded-full mr-4">
                <HomeIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{condominium.name}</p>
                <h1 className="text-2xl font-bold text-gray-800">Apartamento {apartment.apartmentNumber}</h1>
              </div>
            </div>
            <Link to={`/condominiums/${condominiumId}/apartments/${apartmentId}/edit`}>
              <AppButton
                variant="outline"
                leftIcon={<Edit size={16} />}
              >
                Editar Apartamento
              </AppButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Número de Apartamento</h3>
              <p className="text-lg font-semibold">{apartment.apartmentNumber}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Estacionamiento</h3>
              <p className="text-lg font-semibold">
                {apartment.parkingNumber ? (
                  <div className="flex items-center">
                    <Car size={18} className="mr-2 text-gray-500" />
                    <span>{apartment.parkingNumber}</span>
                  </div>
                ) : (
                  <span className="text-gray-400 italic">No asignado</span>
                )}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Bodega</h3>
              <p className="text-lg font-semibold">
                {apartment.storageUnitNumber ? (
                  <div className="flex items-center">
                    <Package size={18} className="mr-2 text-gray-500" />
                    <span>{apartment.storageUnitNumber}</span>
                  </div>
                ) : (
                  <span className="text-gray-400 italic">No asignada</span>
                )}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Residentes</h2>
            {apartment.residents.length > 0 ? (
              <div className="space-y-3">
                {apartment.residents.map((resident) => (
                  <div
                    key={resident.id}
                    className="flex items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      <User className="h-5 w-5 text-primary-700" />
                    </div>
                    <span className="font-medium">{resident.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-center mb-3">
                  <User className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-gray-500">No hay residentes registrados</p>
                <Link 
                  to={`/condominiums/${condominiumId}/apartments/${apartmentId}/edit`}
                  className="text-primary-600 font-medium inline-block mt-2 hover:underline"
                >
                  Agregar residentes
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ApartmentDetailPage;
