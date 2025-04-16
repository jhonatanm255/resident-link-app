
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Condominium, Apartment, Resident } from "@/types";

interface AppContextType {
  condominiums: Condominium[];
  addCondominium: (condominium: Omit<Condominium, "id" | "apartments">) => void;
  updateCondominium: (condominium: Condominium) => void;
  deleteCondominium: (id: string) => void;
  addApartment: (apartment: Omit<Apartment, "id">) => void;
  updateApartment: (apartment: Apartment) => void;
  deleteApartment: (id: string) => void;
  importData: (data: { condominiums: Condominium[] }) => void;
  exportData: () => { condominiums: Condominium[] };
  generateSharingCode: (condominiumId: string) => string;
  importFromSharingCode: (code: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "resident-link-data";

// Load data from localStorage
const loadInitialData = (): Condominium[] => {
  try {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData).condominiums || [];
    }
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
  }
  return [];
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [condominiums, setCondominiums] = useState<Condominium[]>(loadInitialData());
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ condominiums }));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [condominiums]);

  // Generate unique ID
  const generateId = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Add condominium
  const addCondominium = (condominiumData: Omit<Condominium, "id" | "apartments">) => {
    const newCondominium: Condominium = {
      id: generateId(),
      ...condominiumData,
      apartments: [],
    };
    setCondominiums([...condominiums, newCondominium]);
  };

  // Update condominium
  const updateCondominium = (updatedCondominium: Condominium) => {
    setCondominiums(
      condominiums.map((condominium) =>
        condominium.id === updatedCondominium.id ? updatedCondominium : condominium
      )
    );
  };

  // Delete condominium
  const deleteCondominium = (id: string) => {
    setCondominiums(condominiums.filter((condominium) => condominium.id !== id));
  };

  // Add apartment
  const addApartment = (apartmentData: Omit<Apartment, "id">) => {
    const newApartment: Apartment = {
      id: generateId(),
      ...apartmentData,
    };

    setCondominiums(
      condominiums.map((condominium) => {
        if (condominium.id === apartmentData.condominiumId) {
          return {
            ...condominium,
            apartments: [...condominium.apartments, newApartment],
          };
        }
        return condominium;
      })
    );
  };

  // Update apartment
  const updateApartment = (updatedApartment: Apartment) => {
    setCondominiums(
      condominiums.map((condominium) => {
        if (condominium.id === updatedApartment.condominiumId) {
          return {
            ...condominium,
            apartments: condominium.apartments.map((apartment) =>
              apartment.id === updatedApartment.id ? updatedApartment : apartment
            ),
          };
        }
        return condominium;
      })
    );
  };

  // Delete apartment
  const deleteApartment = (id: string) => {
    setCondominiums(
      condominiums.map((condominium) => {
        return {
          ...condominium,
          apartments: condominium.apartments.filter((apartment) => apartment.id !== id),
        };
      })
    );
  };

  // Import data
  const importData = (data: { condominiums: Condominium[] }) => {
    setCondominiums(data.condominiums);
  };

  // Export data
  const exportData = () => {
    return { condominiums };
  };

  // Generate sharing code for a condominium
  const generateSharingCode = (condominiumId: string) => {
    const condominium = condominiums.find((c) => c.id === condominiumId);
    if (!condominium) return "";
    
    const dataToShare = { condominiums: [condominium] };
    const encodedData = btoa(JSON.stringify(dataToShare));
    // Create a 6-digit code (in a real app, you'd store this in a database)
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // In a real app, you'd store the code and data in a database
    // For now, we'll just return the encoded data as the "code"
    return encodedData;
  };

  // Import from sharing code
  const importFromSharingCode = (code: string) => {
    try {
      // In a real app, you'd use the code to lookup the shared data from a database
      // For now, we're assuming the code is the encoded data
      const decodedData = JSON.parse(atob(code));
      if (decodedData.condominiums) {
        // Merge with existing data
        const newCondominiums = [...condominiums];
        decodedData.condominiums.forEach((importedCondominium: Condominium) => {
          // Check if the condominium already exists
          const existingIndex = newCondominiums.findIndex(
            (c) => c.id === importedCondominium.id
          );
          if (existingIndex === -1) {
            newCondominiums.push(importedCondominium);
          } else {
            // Merge apartments if condominium exists
            const existingApartmentIds = new Set(
              newCondominiums[existingIndex].apartments.map((a) => a.id)
            );
            importedCondominium.apartments.forEach((importedApartment) => {
              if (!existingApartmentIds.has(importedApartment.id)) {
                newCondominiums[existingIndex].apartments.push(importedApartment);
              }
            });
          }
        });
        setCondominiums(newCondominiums);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error importing data:", error);
      return false;
    }
  };

  const value = {
    condominiums,
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
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
