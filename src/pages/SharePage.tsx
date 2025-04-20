
import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '@/contexts/AppContext';
import { Button } from "@/components/ui/button";
import { Copy, Check, Scan } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Html5QrcodeScanner } from "html5-qrcode";

const SharePage = () => {
  const { condominiums, importFromSharingCode } = useApp();
  const [qrData, setQrData] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const generateQR = () => {
    // Simplificar los datos a compartir
    const simpleData = condominiums.map(condo => ({
      id: condo.id,
      name: condo.name,
      apartments: condo.apartments.map(apt => ({
        id: apt.id,
        apartmentNumber: apt.apartmentNumber
      }))
    }));
    
    const encoded = btoa(JSON.stringify({ condominiums: simpleData }));
    setQrData(encoded);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(qrData);
    setIsCopied(true);
    toast({
      title: "Código copiado!",
      description: "El código se ha copiado al portapapeles.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const startScanner = () => {
    setIsScanning(true);
    setTimeout(() => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
      
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { 
          fps: 5, // Reducido para mejor rendimiento
          qrbox: 250,
          rememberLastUsedCamera: true
        },
        false
      );
      
      scannerRef.current.render(
        async (decodedText) => {
          console.log("QR escaneado:", decodedText);
          const success = await importFromSharingCode(decodedText);
          
          if (success) {
            toast({
              title: "¡Éxito!",
              description: "Datos importados correctamente",
            });
          } else {
            toast({
              title: "Error",
              description: "No se pudo importar el código QR",
              variant: "destructive",
            });
          }
          
          if (scannerRef.current) {
            scannerRef.current.clear();
          }
          setIsScanning(false);
        },
        (error) => {
          console.error("Error de escaneo:", error);
        }
      );
    }, 100);
  };

  const closeScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
    }
    setIsScanning(false);
  };

  return (
    <AppLayout title="Compartir Datos">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Compartir Datos</h2>
        <p className="text-gray-600 mb-4">
          Genera un código QR para compartir la información de tus condominios.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button onClick={generateQR}>
            Generar Código QR
          </Button>

          <Button onClick={startScanner} variant="outline">
            <Scan className="mr-2 h-4 w-4" />
            Escanear QR
          </Button>
        </div>

        {qrData && (
          <div className="mb-4">
            <div className="p-4 bg-white rounded-lg shadow-sm inline-block">
              <QRCodeSVG 
                value={qrData}
                size={256}
                level="L"
                includeMargin={true}
              />
            </div>
            
            <div className="mt-4">
              <Button variant="outline" onClick={handleCopyClick} disabled={isCopied}>
                {isCopied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar Código
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        <Dialog open={isScanning} onOpenChange={(open) => {
          if (!open) closeScanner();
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Escanear Código QR</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div id="reader" className="w-full"></div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={closeScanner}>
                Cancelar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default SharePage;
