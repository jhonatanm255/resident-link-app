
import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { useApp } from "@/contexts/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { HomeIcon, Save, ArrowLeft, Trash2, Plus, X } from "lucide-react";
import { Apartment, Resident } from "@/types";

const ApartmentFormPage = () => {
  const { addApartment, updateApartment, deleteApartment, condominiums } = useApp();
  const navigate = useNavigate();
  const { condominiumId, apartmentId } = useParams<{ condominiumId: string; apartmentId: string }>();
  const isEditing = !!apartmentId;

  const [apartmentNumber, setApartmentNumber] = useState("");
  const [parkingNumber, setParkingNumber] = useState("");
  const [storageUnitNumber, setStorageUnitNumber] = useState("");
  const [residents, setResidents] = useState<Resident[]>([]);
  const [newResidentName, setNewResidentName] = useState("");
  const [formError, setFormError] = useState("");

  // Check if condominium exists
  const condominium = condominiums.find((c) => c.id === condominiumId);
  
  useEffect(() => {
    if (!condominium) {
      navigate("/condominiums");
      return;
    }

    if (isEditing) {
      const apartment = condominium.apartments.find((a) => a.id === apartmentId);
      if (apartment) {
        setApartmentNumber(apartment.apartmentNumber);
        setParkingNumber(apartment.parkingNumber);
        setStorageUnitNumber(apartment.storageUnitNumber);
        setResidents(apartment.residents);
      } else {
        navigate(`/condominiums/${condominiumId}`);
      }
    }
  }, [apartmentId, condominium, condominiumId, isEditing, navigate]);

  const handleAddResident = () => {
    if (!newResidentName.trim()) return;
    if (residents.length >= 5) {
      setFormError("No puedes agregar más de 5 residentes por apartamento");
      return;
    }
    
    const newResident: Resident = {
      id: Math.random().toString(36).substring(2, 9),
      name: newResidentName.trim()
    };
    
    setResidents([...residents, newResident]);
    setNewResidentName("");
    setFormError("");
  };

  const handleRemoveResident = (id: string) => {
    setResidents(residents.filter(resident => resident.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!apartmentNumber.trim()) {
      setFormError("El número de apartamento es obligatorio");
      return;
    }

    if (isEditing) {
      const apartment = condominium?.apartments.find((a) => a.id === apartmentId) as Apartment;
      updateApartment({
        ...apartment,
        apartmentNumber,
        parkingNumber,
        storageUnitNumber,
        residents,
      });
      navigate(`/condominiums/${condominiumId}`);
    } else {
      addApartment({
        apartmentNumber,
        parkingNumber,
        storageUnitNumber,
        residents,
        condominiumId: condominiumId as string,
      });
      navigate(`/condominiums/${condominiumId}`);
    }
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro que deseas eliminar este apartamento? Esta acción no se puede deshacer.")) {
      deleteApartment(apartmentId as string, condominiumId as string);
      navigate(`/condominiums/${condominiumId}`);
    }
  };

  if (!condominium) {
    return (
      <AppLayout title="Condominio no encontrado">
        <div className="max-w-2xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Condominio no encontrado</h1>
          <p className="text-gray-600 mb-8">El condominio que estás buscando no existe o ha sido eliminado</p>
          <AppButton onClick={() => navigate("/condominiums")}>
            Ver todos los condominios
          </AppButton>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={isEditing ? "Editar Apartamento" : "Nuevo Apartamento"}>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Volver</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <div className="bg-primary-50 p-3 rounded-full mr-3">
              <HomeIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">
                {isEditing ? "Editar Apartamento" : "Registrar Nuevo Apartamento"}
              </h1>
              <p className="text-sm text-gray-500">{condominium.name}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="apartmentNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Apartamento *
                  </label>
                  <input
                    type="text"
                    id="apartmentNumber"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Ej: 101"
                    value={apartmentNumber}
                    onChange={(e) => setApartmentNumber(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="parkingNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Número de Estacionamiento
                  </label>
                  <input
                    type="text"
                    id="parkingNumber"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Ej: E-12"
                    value={parkingNumber}
                    onChange={(e) => setParkingNumber(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="storageUnitNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Bodega
                </label>
                <input
                  type="text"
                  id="storageUnitNumber"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Ej: B-05"
                  value={storageUnitNumber}
                  onChange={(e) => setStorageUnitNumber(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Residentes (Máximo 5)
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="block flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Nombre del residente"
                    value={newResidentName}
                    onChange={(e) => setNewResidentName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddResident())}
                  />
                  <button
                    type="button"
                    className="bg-primary-600 hover:bg-primary-700 border border-primary-600 text-white px-4 py-2 rounded-r-md"
                    onClick={handleAddResident}
                    disabled={residents.length >= 5}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {residents.length}/5 residentes agregados
                </p>

                {residents.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {residents.map((resident) => (
                      <div 
                        key={resident.id}
                        className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-md"
                      >
                        <span className="text-gray-800">{resident.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveResident(resident.id)}
                          className="text-gray-400 hover:text-destructive"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {formError && (
                <div className="text-destructive text-sm p-2 bg-destructive/10 rounded">
                  {formError}
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                {isEditing && (
                  <AppButton
                    type="button"
                    variant="danger"
                    leftIcon={<Trash2 size={18} />}
                    onClick={handleDelete}
                  >
                    Eliminar
                  </AppButton>
                )}
                <AppButton
                  type="submit"
                  leftIcon={<Save size={18} />}
                >
                  {isEditing ? "Guardar Cambios" : "Registrar Apartamento"}
                </AppButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default ApartmentFormPage;
