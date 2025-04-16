
import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppButton } from "@/components/ui/app-button";
import { useApp } from "@/contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  QrCode, 
  Send, 
  Download, 
  ArrowLeft, 
  Copy,
  Check,
  ScanLine
} from "lucide-react";
import QRCode from "react-qr-code";
import { Html5QrcodeScanner } from "html5-qrcode";

const SharePage = () => {
  const { condominiums, generateSharingCode, importFromSharingCode } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCondominiumId = queryParams.get("condominiumId");

  const [selectedCondominiumId, setSelectedCondominiumId] = useState(initialCondominiumId || "");
  const [shareModeQR, setShareModeQR] = useState(true); // true for QR, false for code
  const [receiveModeQR, setReceiveModeQR] = useState(true); // true for QR, false for code
  const [activeTab, setActiveTab] = useState("share"); // "share" or "receive"
  
  const [shareCode, setShareCode] = useState("");
  const [receiveCode, setReceiveCode] = useState("");
  const [codeCopied, setCodeCopied] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState("");
  const [scannerInitialized, setScannerInitialized] = useState(false);

  // Generate code when a condominium is selected
  useEffect(() => {
    if (selectedCondominiumId) {
      const code = generateSharingCode(selectedCondominiumId);
      setShareCode(code);
    } else {
      setShareCode("");
    }
  }, [selectedCondominiumId, generateSharingCode]);

  // Initialize QR scanner
  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;
    
    if (activeTab === "receive" && receiveModeQR && !scannerInitialized) {
      try {
        scanner = new Html5QrcodeScanner(
          "qr-reader",
          { fps: 10, qrbox: { width: 250, height: 250 } },
          false
        );
        
        scanner.render(
          (decodedText) => {
            handleQRCodeScan(decodedText);
            // Don't clear scanner after successful scan to allow multiple imports
          },
          (error) => {
            // Handle scan errors silently - don't show to user unless they try to import
            console.error("QR scan error:", error);
          }
        );
        
        setScannerInitialized(true);
      } catch (error) {
        console.error("Error initializing QR scanner:", error);
      }
    }
    
    // Cleanup
    return () => {
      if (scanner) {
        try {
          scanner.clear();
        } catch (error) {
          console.error("Error clearing scanner:", error);
        }
      }
    };
  }, [activeTab, receiveModeQR, scannerInitialized]);

  // Reset scanner initialization flag when switching tabs or modes
  useEffect(() => {
    setScannerInitialized(false);
  }, [activeTab, receiveModeQR]);

  const handleQRCodeScan = (decodedText: string) => {
    try {
      const success = importFromSharingCode(decodedText);
      if (success) {
        setImportSuccess(true);
        setImportError("");
        // Show success message briefly
        setTimeout(() => setImportSuccess(false), 3000);
      } else {
        setImportError("El código QR no contiene datos válidos");
      }
    } catch (error) {
      setImportError("Error al importar datos del código QR");
      console.error("Import error:", error);
    }
  };

  const handleImportFromCode = () => {
    try {
      if (!receiveCode.trim()) {
        setImportError("Ingresa un código para importar");
        return;
      }
      
      const success = importFromSharingCode(receiveCode.trim());
      if (success) {
        setImportSuccess(true);
        setImportError("");
        setReceiveCode("");
        // Show success message briefly
        setTimeout(() => setImportSuccess(false), 3000);
      } else {
        setImportError("El código ingresado no es válido");
      }
    } catch (error) {
      setImportError("Error al importar datos del código");
      console.error("Import error:", error);
    }
  };

  const copyCodeToClipboard = () => {
    if (!shareCode) return;
    
    navigator.clipboard.writeText(shareCode).then(
      () => {
        setCodeCopied(true);
        setTimeout(() => setCodeCopied(false), 2000);
      },
      (err) => {
        console.error("Error al copiar código:", err);
      }
    );
  };

  return (
    <AppLayout title="Compartir Datos">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>Volver</span>
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 font-medium text-center ${
                activeTab === "share" 
                  ? "text-primary-700 border-b-2 border-primary-600" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("share")}
            >
              <div className="flex items-center justify-center">
                <Send size={18} className="mr-2" />
                <span>Enviar Datos</span>
              </div>
            </button>
            <button
              className={`flex-1 py-4 font-medium text-center ${
                activeTab === "receive" 
                  ? "text-primary-700 border-b-2 border-primary-600" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("receive")}
            >
              <div className="flex items-center justify-center">
                <Download size={18} className="mr-2" />
                <span>Recibir Datos</span>
              </div>
            </button>
          </div>

          {/* Share Data Tab */}
          {activeTab === "share" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Compartir Datos de Condominio</h2>

              {/* Condominium Selection */}
              <div className="mb-6">
                <label htmlFor="condominium" className="block text-sm font-medium text-gray-700 mb-2">
                  Selecciona un Condominio
                </label>
                <select
                  id="condominium"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={selectedCondominiumId}
                  onChange={(e) => setSelectedCondominiumId(e.target.value)}
                >
                  <option value="">Seleccionar condominio...</option>
                  {condominiums.map((condominium) => (
                    <option key={condominium.id} value={condominium.id}>
                      {condominium.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Share Mode Selector */}
              <div className="mb-6">
                <div className="flex p-1 bg-gray-100 rounded-md">
                  <button
                    className={`flex-1 py-2 px-4 rounded-md font-medium text-center ${
                      shareModeQR 
                        ? "bg-white shadow-sm text-gray-800" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setShareModeQR(true)}
                  >
                    <div className="flex items-center justify-center">
                      <QrCode size={18} className="mr-2" />
                      <span>Código QR</span>
                    </div>
                  </button>
                  <button
                    className={`flex-1 py-2 px-4 rounded-md font-medium text-center ${
                      !shareModeQR 
                        ? "bg-white shadow-sm text-gray-800" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setShareModeQR(false)}
                  >
                    <div className="flex items-center justify-center">
                      <Copy size={18} className="mr-2" />
                      <span>Código Numérico</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Share Content */}
              {!selectedCondominiumId ? (
                <div className="text-center py-10">
                  <QrCode size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Selecciona un condominio para compartir sus datos</p>
                </div>
              ) : (
                <>
                  {shareModeQR ? (
                    <div className="flex flex-col items-center">
                      <div className="mb-6 p-4 bg-white border rounded-lg">
                        <QRCode
                          value={shareCode}
                          size={200}
                          level="H"
                          viewBox="0 0 256 256"
                        />
                      </div>
                      <p className="text-gray-600 text-sm text-center mb-4">
                        Muestra este código QR para que otro dispositivo pueda escanearlo
                      </p>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código para compartir
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          className="block flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-50"
                          value={shareCode}
                          readOnly
                        />
                        <button
                          onClick={copyCodeToClipboard}
                          className="bg-primary-600 hover:bg-primary-700 border border-primary-600 text-white px-4 py-2 rounded-r-md"
                        >
                          {codeCopied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                      <p className="text-gray-500 text-sm mt-2">
                        {codeCopied ? "¡Código copiado!" : "Haz clic para copiar el código"}
                      </p>
                      <p className="text-gray-600 text-sm mt-4">
                        Comparte este código con la persona que necesita recibir los datos del condominio
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Receive Data Tab */}
          {activeTab === "receive" && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Recibir Datos de Condominio</h2>

              {/* Receive Mode Selector */}
              <div className="mb-6">
                <div className="flex p-1 bg-gray-100 rounded-md">
                  <button
                    className={`flex-1 py-2 px-4 rounded-md font-medium text-center ${
                      receiveModeQR 
                        ? "bg-white shadow-sm text-gray-800" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setReceiveModeQR(true)}
                  >
                    <div className="flex items-center justify-center">
                      <ScanLine size={18} className="mr-2" />
                      <span>Escanear QR</span>
                    </div>
                  </button>
                  <button
                    className={`flex-1 py-2 px-4 rounded-md font-medium text-center ${
                      !receiveModeQR 
                        ? "bg-white shadow-sm text-gray-800" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setReceiveModeQR(false)}
                  >
                    <div className="flex items-center justify-center">
                      <Copy size={18} className="mr-2" />
                      <span>Código Numérico</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Success/Error Message */}
              {importSuccess && (
                <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
                  <Check className="mr-2" size={18} />
                  <span>¡Datos importados correctamente!</span>
                </div>
              )}

              {importError && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                  {importError}
                </div>
              )}

              {/* Receive Content */}
              {receiveModeQR ? (
                <div className="text-center">
                  <div id="qr-reader" className="mx-auto mb-4" style={{ maxWidth: "500px" }}></div>
                  <p className="text-gray-600 text-sm">
                    Apunta la cámara al código QR para recibir los datos del condominio
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ingresa el código compartido
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      className="block flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Pega el código aquí"
                      value={receiveCode}
                      onChange={(e) => setReceiveCode(e.target.value)}
                    />
                    <button
                      onClick={handleImportFromCode}
                      className="bg-primary-600 hover:bg-primary-700 border border-primary-600 text-white px-4 py-2 rounded-r-md"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    Pega el código que te han compartido y haz clic en el botón para importar
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default SharePage;
