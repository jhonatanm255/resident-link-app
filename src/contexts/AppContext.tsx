
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Condominium, Apartment, Resident } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  query,
  where,
  onSnapshot
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

interface AppContextType {
  condominiums: Condominium[];
  loading: boolean;
  addCondominium: (condominium: Omit<Condominium, "id" | "apartments">) => Promise<void>;
  updateCondominium: (condominium: Condominium) => Promise<void>;
  deleteCondominium: (id: string) => Promise<void>;
  addApartment: (apartment: Omit<Apartment, "id">) => Promise<void>;
  updateApartment: (apartment: Apartment) => Promise<void>;
  deleteApartment: (id: string, condominiumId: string) => Promise<void>;
  importData: (data: { condominiums: Condominium[] }) => Promise<void>;
  exportData: () => { condominiums: Condominium[] };
  generateSharingCode: (condominiumId: string) => string;
  importFromSharingCode: (code: string) => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [condominiums, setCondominiums] = useState<Condominium[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Cargar datos desde Firestore cuando el usuario cambia
  useEffect(() => {
    if (!currentUser) {
      setCondominiums([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const q = query(
      collection(db, "condominiums"), 
      where("userId", "==", currentUser.uid)
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const condominiumsData: Condominium[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        condominiumsData.push({
          id: doc.id,
          name: data.name,
          address: data.address,
          apartments: data.apartments || [],
        });
      });
      
      setCondominiums(condominiumsData);
      setLoading(false);
    }, (error) => {
      console.error("Error loading condominiums:", error);
      toast.error("Error al cargar los condominios");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Agregar condominio
  const addCondominium = async (condominiumData: Omit<Condominium, "id" | "apartments">) => {
    if (!currentUser) return;
    
    try {
      await addDoc(collection(db, "condominiums"), {
        ...condominiumData,
        userId: currentUser.uid,
        apartments: [],
        createdAt: new Date()
      });
      toast.success("Condominio creado correctamente");
    } catch (error) {
      console.error("Error adding condominium:", error);
      toast.error("Error al crear el condominio");
      throw error;
    }
  };

  // Actualizar condominio
  const updateCondominium = async (updatedCondominium: Condominium) => {
    if (!currentUser) return;
    
    try {
      const docRef = doc(db, "condominiums", updatedCondominium.id);
      
      await updateDoc(docRef, {
        name: updatedCondominium.name,
        address: updatedCondominium.address,
        updatedAt: new Date()
      });
      
      toast.success("Condominio actualizado correctamente");
    } catch (error) {
      console.error("Error updating condominium:", error);
      toast.error("Error al actualizar el condominio");
      throw error;
    }
  };

  // Eliminar condominio
  const deleteCondominium = async (id: string) => {
    if (!currentUser) return;
    
    try {
      await deleteDoc(doc(db, "condominiums", id));
      toast.success("Condominio eliminado correctamente");
    } catch (error) {
      console.error("Error deleting condominium:", error);
      toast.error("Error al eliminar el condominio");
      throw error;
    }
  };

  // Agregar apartamento
  const addApartment = async (apartmentData: Omit<Apartment, "id">) => {
    if (!currentUser) return;
    
    try {
      const condominiumRef = doc(db, "condominiums", apartmentData.condominiumId);
      const apartmentId = Math.random().toString(36).substring(2, 9);
      
      const newApartment: Apartment = {
        id: apartmentId,
        ...apartmentData,
      };
      
      // Obtener condominio actual
      const condominiumIndex = condominiums.findIndex(
        (c) => c.id === apartmentData.condominiumId
      );
      
      if (condominiumIndex === -1) {
        throw new Error("Condominio no encontrado");
      }
      
      // Agregar apartamento a la matriz de apartamentos
      const updatedCondominium = {
        ...condominiums[condominiumIndex],
        apartments: [...condominiums[condominiumIndex].apartments, newApartment],
      };
      
      // Actualizar en Firestore
      await updateDoc(condominiumRef, {
        apartments: updatedCondominium.apartments,
        updatedAt: new Date()
      });
      
      toast.success("Apartamento creado correctamente");
    } catch (error) {
      console.error("Error adding apartment:", error);
      toast.error("Error al crear el apartamento");
      throw error;
    }
  };

  // Actualizar apartamento
  const updateApartment = async (updatedApartment: Apartment) => {
    if (!currentUser) return;
    
    try {
      const condominiumRef = doc(db, "condominiums", updatedApartment.condominiumId);
      
      // Obtener condominio actual
      const condominiumIndex = condominiums.findIndex(
        (c) => c.id === updatedApartment.condominiumId
      );
      
      if (condominiumIndex === -1) {
        throw new Error("Condominio no encontrado");
      }
      
      // Actualizar apartamento en la matriz
      const updatedApartments = condominiums[condominiumIndex].apartments.map(
        (apartment) => (apartment.id === updatedApartment.id ? updatedApartment : apartment)
      );
      
      // Actualizar en Firestore
      await updateDoc(condominiumRef, {
        apartments: updatedApartments,
        updatedAt: new Date()
      });
      
      toast.success("Apartamento actualizado correctamente");
    } catch (error) {
      console.error("Error updating apartment:", error);
      toast.error("Error al actualizar el apartamento");
      throw error;
    }
  };

  // Eliminar apartamento
  const deleteApartment = async (id: string, condominiumId: string) => {
    if (!currentUser) return;
    
    try {
      const condominiumRef = doc(db, "condominiums", condominiumId);
      
      // Obtener condominio actual
      const condominiumIndex = condominiums.findIndex(
        (c) => c.id === condominiumId
      );
      
      if (condominiumIndex === -1) {
        throw new Error("Condominio no encontrado");
      }
      
      // Filtrar apartamento a eliminar
      const updatedApartments = condominiums[condominiumIndex].apartments.filter(
        (apartment) => apartment.id !== id
      );
      
      // Actualizar en Firestore
      await updateDoc(condominiumRef, {
        apartments: updatedApartments,
        updatedAt: new Date()
      });
      
      toast.success("Apartamento eliminado correctamente");
    } catch (error) {
      console.error("Error deleting apartment:", error);
      toast.error("Error al eliminar el apartamento");
      throw error;
    }
  };

  // Importar datos
  const importData = async (data: { condominiums: Condominium[] }) => {
    if (!currentUser) return;
    
    try {
      // Para cada condominio en los datos importados
      for (const condominium of data.condominiums) {
        // Verificar si ya existe
        const existingIndex = condominiums.findIndex((c) => c.id === condominium.id);
        
        if (existingIndex === -1) {
          // Si no existe, crear un nuevo documento
          await addDoc(collection(db, "condominiums"), {
            name: condominium.name,
            address: condominium.address,
            apartments: condominium.apartments || [],
            userId: currentUser.uid,
            createdAt: new Date(),
            importedAt: new Date()
          });
        } else {
          // Si existe, actualizar con los nuevos apartamentos
          const condominiumRef = doc(db, "condominiums", condominium.id);
          const existingApartmentIds = new Set(
            condominiums[existingIndex].apartments.map((a) => a.id)
          );
          
          // Fusionar apartamentos
          const mergedApartments = [...condominiums[existingIndex].apartments];
          
          condominium.apartments.forEach((importedApartment) => {
            if (!existingApartmentIds.has(importedApartment.id)) {
              mergedApartments.push(importedApartment);
            }
          });
          
          await updateDoc(condominiumRef, {
            apartments: mergedApartments,
            updatedAt: new Date(),
            importedAt: new Date()
          });
        }
      }
      
      toast.success("Datos importados correctamente");
    } catch (error) {
      console.error("Error importing data:", error);
      toast.error("Error al importar los datos");
      throw error;
    }
  };

  // Exportar datos
  const exportData = () => {
    return { condominiums };
  };

  // Generar código de compartir para un condominio
  const generateSharingCode = (condominiumId: string) => {
    const condominium = condominiums.find((c) => c.id === condominiumId);
    if (!condominium) return "";
    
    const dataToShare = { condominiums: [condominium] };
    return btoa(JSON.stringify(dataToShare));
  };

  // Importar desde código de compartir
  const importFromSharingCode = async (code: string) => {
    try {
      const decodedData = JSON.parse(atob(code));
      if (decodedData.condominiums) {
        await importData(decodedData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error importing data:", error);
      toast.error("Error al importar los datos");
      return false;
    }
  };

  const value = {
    condominiums,
    loading,
    addCondominium,
    updateCondominium,
    deleteCondominium,
    addApartment,
    updateApartment,
    deleteApartment,
    importData,
    exportData,
    generateSharingCode,
    importFromSharingCode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp debe ser usado dentro de un AppProvider");
  }
  return context;
};
