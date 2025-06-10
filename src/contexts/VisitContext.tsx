
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Visit {
  id: string;
  visitorName: string;
  residentName: string;
  apartment: string;
  visitDate: string;
  visitTime: string;
  purpose?: string;
  qrCode: string;
  numericCode: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
}

interface VisitContextType {
  visits: Visit[];
  addVisit: (visit: Omit<Visit, 'id' | 'qrCode' | 'numericCode' | 'status' | 'createdAt'>) => void;
  updateVisitStatus: (visitId: string, status: Visit['status']) => void;
  deleteVisit: (visitId: string) => void;
}

const VisitContext = createContext<VisitContextType | undefined>(undefined);

export const VisitProvider = ({ children }: { children: ReactNode }) => {
  const [visits, setVisits] = useState<Visit[]>([
    {
      id: '1',
      visitorName: 'Juan Pérez',
      residentName: 'María González',
      apartment: 'Apt 304',
      visitDate: '2024-01-15',
      visitTime: '14:00',
      purpose: 'Visita familiar',
      qrCode: 'QR123456',
      numericCode: '789123',
      status: 'pending',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      visitorName: 'Ana López',
      residentName: 'Carlos Rodríguez',
      apartment: 'Apt 108',
      visitDate: '2024-01-15',
      visitTime: '16:30',
      purpose: 'Entrega de paquete',
      qrCode: 'QR789012',
      numericCode: '456789',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  ]);

  const generateVisitCode = () => {
    return 'QR' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const generateNumericCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const addVisit = (visitData: Omit<Visit, 'id' | 'qrCode' | 'numericCode' | 'status' | 'createdAt'>) => {
    const newVisit: Visit = {
      id: Date.now().toString(),
      ...visitData,
      qrCode: generateVisitCode(),
      numericCode: generateNumericCode(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setVisits(prev => [...prev, newVisit]);
  };

  const updateVisitStatus = (visitId: string, status: Visit['status']) => {
    setVisits(prev => prev.map(visit => 
      visit.id === visitId ? { ...visit, status } : visit
    ));
  };

  const deleteVisit = (visitId: string) => {
    setVisits(prev => prev.filter(visit => visit.id !== visitId));
  };

  return (
    <VisitContext.Provider value={{
      visits,
      addVisit,
      updateVisitStatus,
      deleteVisit
    }}>
      {children}
    </VisitContext.Provider>
  );
};

export const useVisits = () => {
  const context = useContext(VisitContext);
  if (!context) {
    throw new Error('useVisits debe ser usado dentro de un VisitProvider');
  }
  return context;
};
