
import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { useApp } from "@/contexts/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { Building2, Save, ArrowLeft, Trash2 } from "lucide-react";
import { Condominium } from "@/types";

const CondominiumFormPage = () => {
  const { addCondominium, updateCondominium, deleteCondominium, condominiums } = useApp();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState("");

  // Load condominium data if editing
  useEffect(() => {
    if (isEditing) {
      const condominium = condominiums.find((c) => c.id === id);
      if (condominium) {
        setName(condominium.name);
        setAddress(condominium.address);
      } else {
        navigate("/condominiums");
      }
    }
  }, [id, condominiums, isEditing, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim() || !address.trim()) {
      setFormError("Todos los campos son obligatorios");
      return;
    }

    if (isEditing) {
      const condominium = condominiums.find((c) => c.id === id) as Condominium;
      updateCondominium({
        ...condominium,
        name,
        address,
      });
      navigate(`/condominiums/${id}`);
    } else {
      addCondominium({ name, address });
      navigate("/condominiums");
    }
  };

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro que deseas eliminar este condominio? Esta acción no se puede deshacer.")) {
      deleteCondominium(id as string);
      navigate("/condominiums");
    }
  };

  return (
    <AppLayout title={isEditing ? "Editar Condominio" : "Nuevo Condominio"}>
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
              <Building2 className="h-6 w-6 text-primary-600" />
            </div>
            <h1 className="text-xl font-semibold">
              {isEditing ? "Editar Condominio" : "Registrar Nuevo Condominio"}
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Condominio
                </label>
                <input
                  type="text"
                  id="name"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Ej: Condominio Las Palmas"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Ej: Av. Principal #123, Ciudad"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
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
                  {isEditing ? "Guardar Cambios" : "Registrar Condominio"}
                </AppButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default CondominiumFormPage;
