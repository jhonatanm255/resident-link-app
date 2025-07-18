import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor ingresa tu correo y contraseña");
      return;
    }
    
    setIsLoading(true);
    try {
      await signIn(email, password);
      toast.success("Has iniciado sesión correctamente");
      navigate("/");
    } catch (error: any) {
      console.error("Error en login con email:", error);
      toast.error(getAuthErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("Iniciando login con Google...");
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      console.log("Login con Google exitoso:", result);
      toast.success("Has iniciado sesión con Google correctamente");
      navigate("/");
    } catch (error: any) {
      console.error("Error detallado en login con Google:", error);
      console.error("Código de error:", error.code);
      console.error("Mensaje de error:", error.message);
      toast.error(getAuthErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const getAuthErrorMessage = (errorCode: string): string => {
    console.log("Procesando código de error:", errorCode);
    switch (errorCode) {
      case "auth/invalid-email":
        return "El correo electrónico no es válido";
      case "auth/user-disabled":
        return "Esta cuenta ha sido deshabilitada";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Correo o contraseña incorrecta";
      case "auth/too-many-requests":
        return "Demasiados intentos fallidos. Intenta más tarde";
      case "auth/popup-closed-by-user":
        return "Ventana de inicio de sesión cerrada por el usuario";
      case "auth/popup-blocked":
        return "El navegador bloqueó la ventana emergente. Permite ventanas emergentes para este sitio";
      case "auth/cancelled-popup-request":
        return "Solicitud de ventana emergente cancelada";
      case "auth/unauthorized-domain":
        return "Este dominio no está autorizado para usar Firebase Auth";
      case "auth/operation-not-allowed":
        return "El inicio de sesión con Google no está habilitado";
      case "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
        return "Error de configuración. Contacta al administrador";
      default:
        return `Error al iniciar sesión: ${errorCode || "Error desconocido"}`;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Inicia sesión en ResidentLink
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Tu plataforma de gestión de condominios
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleEmailLogin}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email" className="sr-only">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-10"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="flex w-full justify-center items-center"
              disabled={isLoading}
            >
              <LogIn className="h-5 w-5 mr-2" />
              Iniciar sesión
            </Button>
          </div>
          
          <div className="flex items-center justify-center">
            <span className="text-sm">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="font-medium text-primary-700 hover:text-primary-500"
              >
                Regístrate aquí
              </Link>
            </span>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">O continúa con</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleGoogleLogin}
              className="flex w-full justify-center items-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
              variant="outline"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
