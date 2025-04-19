import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { useApp } from '@/contexts/AppContext';
import { Button } from "@/components/ui/button";
import { Copy, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SharePage = () => {
  const { condominiums } = useApp();
  const [migrationCode, setMigrationCode] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const generateMigrationCode = () => {
    const essentialData = {
      condominiums: condominiums.map(condo => ({
        id: condo.id,
        name: condo.name,
        apartments: condo.apartments.map(apt => ({
          id: apt.id,
          number: apt.number,
          resident: apt.resident
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Compartir Datos</h2>
      <p className="text-gray-600 mb-4">
        Genera un código QR para compartir la información de tus condominios y apartamentos.
      </p>

      <Button onClick={generateMigrationCode} className="mb-4">
        Generar Código QR
      </Button>

      {migrationCode && (
        <div className="mb-4">
          <QRCode value={migrationCode} size={256} level="L" />
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
    </div>
  );
};

export default SharePage;
