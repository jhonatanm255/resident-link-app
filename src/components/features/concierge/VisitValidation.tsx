
import React, { useState } from 'react';
import { AppButton } from '@/components/ui/app-button';
import { QrCode, Hash, CheckCircle, XCircle, Search, Clock, User } from 'lucide-react';
import { toast } from 'sonner';
import { useVisits } from '@/contexts/VisitContext';

export const VisitValidation = () => {
  const [searchCode, setSearchCode] = useState('');
  const [foundVisit, setFoundVisit] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const { visits, updateVisitStatus } = useVisits();

  const handleSearch = () => {
    if (!searchCode.trim()) {
      toast.error("Ingresa un código para buscar");
      return;
    }

    setIsSearching(true);
    
    // Simular búsqueda
    setTimeout(() => {
      const visit = visits.find(v => 
        v.qrCode === searchCode.trim() || v.numericCode === searchCode.trim()
      );
      
      if (visit) {
        setFoundVisit(visit);
        toast.success("Visita encontrada");
      } else {
        setFoundVisit(null);
        toast.error("No se encontró ninguna visita con ese código");
      }
      setIsSearching(false);
    }, 1000);
  };

  const handleApproveVisit = (visitId: string) => {
    updateVisitStatus(visitId, 'approved');
    
    if (foundVisit && foundVisit.id === visitId) {
      setFoundVisit({ ...foundVisit, status: 'approved' });
    }
    
    toast.success("Visita aprobada exitosamente");
  };

  const handleRejectVisit = (visitId: string) => {
    updateVisitStatus(visitId, 'rejected');
    
    if (foundVisit && foundVisit.id === visitId) {
      setFoundVisit({ ...foundVisit, status: 'rejected' });
    }
    
    toast.success("Visita rechazada");
  };

  const VisitCard = ({ visit, showActions = true }: { visit: any; showActions?: boolean }) => (
    <div className="border border-border rounded-lg p-4 bg-card transition-colors duration-300">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <User className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium text-foreground">{visit.visitorName}</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            Visitando a: {visit.residentName} - {visit.apartment}
          </p>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Clock className="h-4 w-4 mr-1" />
            <span>Hora programada: {visit.visitTime}</span>
          </div>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center">
              <QrCode className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
              <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                {visit.qrCode}
              </span>
            </div>
            <div className="flex items-center">
              <Hash className="h-4 w-4 mr-1 text-purple-600 dark:text-purple-400" />
              <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                {visit.numericCode}
              </span>
            </div>
          </div>

          {visit.status !== 'pending' && (
            <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
              visit.status === 'approved' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {visit.status === 'approved' ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Aprobada
                </>
              ) : (
                <>
                  <XCircle className="h-3 w-3 mr-1" />
                  Rechazada
                </>
              )}
            </div>
          )}
        </div>
        
        {showActions && visit.status === 'pending' && (
          <div className="flex gap-2 ml-4">
            <AppButton 
              size="sm" 
              variant="outline"
              onClick={() => handleApproveVisit(visit.id)}
              className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-300"
            >
              <CheckCircle size={16} className="mr-1" />
              Aprobar
            </AppButton>
            <AppButton 
              size="sm" 
              variant="outline"
              onClick={() => handleRejectVisit(visit.id)}
              className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
            >
              <XCircle size={16} className="mr-1" />
              Rechazar
            </AppButton>
          </div>
        )}
      </div>
    </div>
  );

  const pendingVisits = visits.filter(v => v.status === 'pending');
  const processedVisits = visits.filter(v => v.status !== 'pending');

  return (
    <div className="bg-card rounded-lg shadow-lg p-6 border border-border transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-6 text-foreground flex items-center">
        <QrCode className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
        Validación de Visitas
      </h2>
      
      {/* Buscador de códigos */}
      <div className="mb-6 p-4 bg-muted rounded-lg transition-colors duration-300">
        <h3 className="font-medium text-foreground mb-3">Buscar por Código</h3>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Código QR o Numérico (ej: QR123456 o 789123)"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors duration-300"
            />
          </div>
          <AppButton 
            onClick={handleSearch}
            disabled={isSearching}
            className="transition-all duration-300"
          >
            <Search size={18} className="mr-1" />
            {isSearching ? 'Buscando...' : 'Buscar'}
          </AppButton>
        </div>

        {foundVisit && (
          <div className="mt-4">
            <h4 className="font-medium text-foreground mb-2">Resultado de búsqueda:</h4>
            <VisitCard visit={foundVisit} />
          </div>
        )}
      </div>

      {/* Lista de visitas pendientes */}
      <div className="space-y-4">
        <h3 className="font-medium text-foreground flex items-center">
          <Clock className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-400" />
          Visitas Pendientes ({pendingVisits.length})
        </h3>
        
        {pendingVisits.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <QrCode className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No hay visitas pendientes de validación</p>
          </div>
        ) : (
          pendingVisits.map((visit) => (
            <VisitCard key={visit.id} visit={visit} />
          ))
        )}
      </div>

      {/* Historial de visitas procesadas */}
      {processedVisits.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="font-medium text-foreground flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
            Visitas Procesadas
          </h3>
          
          {processedVisits.map((visit) => (
            <VisitCard key={visit.id} visit={visit} showActions={false} />
          ))}
        </div>
      )}
    </div>
  );
};
