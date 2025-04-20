
import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '@/contexts/AppContext';
import { Button } from "@/components/ui/button";
import { Copy, Check, Scan } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Html5QrcodeScannerConfig, Html5QrcodeScanner } from "html5-qrcode";

const SharePage = () => {
  const { condominiums, importFromSharingCode } = useApp();
  const [migrationCode, setMigrationCode] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const generateMigrationCode = () => {
    // Generar un código más simplificado para el QR
    const essentialData = {
      condominiums: condominiums.map(condo => ({
        id: condo.id,
        name: condo.name,
        apartments: condo.apartments.map(apt => ({
          id: apt.id,
          apartmentNumber: apt.apartmentNumber,
          residents: apt.residents
        }))
      }))
    };
    setMigrationCode(JSON.stringify(essentialData));
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(migrationCode);
    setIsCopied(true);
    toast({
      title: "Código copiado!",
      description: "El código de migración se ha copiado al portapapeles.",
    });
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const startScanner = () => {
    setIsScanning(true);
    setTimeout(() => {
      const config: Html5QrcodeScannerConfig = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true
      };
      
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        config,
        /* verbose= */ false
      );
      
      scannerRef.current.render(
        (decodedText) => {
          // Éxito en escaneo
          handleScanSuccess(decodedText);
          if (scannerRef.current) {
            scannerRef.current.clear();
          }
          setIsScanning(false);
        },
        (error) => {
          // Error en escaneo (no necesitamos mostrar error al usuario)
          console.error("Error al escanear:", error);
        }
      );
    }, 100);
  };

  const handleScanSuccess = async (decodedText: string) => {
    try {
      const success = await importFromSharingCode(decodedText);
      if (success) {
        toast({
          title: "QR escaneado con éxito",
          description: "Los datos se han importado correctamente.",
        });
      } else {
        toast({
          title: "Error al importar",
          description: "El código QR no contiene datos válidos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error al procesar",
        description: "Ha ocurrido un error al procesar el código QR.",
        variant: "destructive",
      });
    }
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
          Genera un código QR para compartir la información de tus condominios y apartamentos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button onClick={generateMigrationCode}>
            Generar Código QR
          </Button>

          <Button onClick={startScanner} variant="outline">
            <Scan className="mr-2 h-4 w-4" />
            Escanear QR
          </Button>
        </div>

        {migrationCode && (
          <div className="mb-4">
            <QRCodeSVG value={migrationCode} size={256} level="L" />
          </div>
        )}

        {migrationCode && (
          <div className="mb-4">
            <div className="flex items-center justify-between">
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
