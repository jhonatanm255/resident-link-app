
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Lock, UserRound, Google } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    setIsLoading(true);
    try {
      await signUp(email, password);
      toast.success("Cuenta creada correctamente");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(getAuthErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      toast.success("Has iniciado sesión con Google correctamente");
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(getAuthErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  // Función para obtener mensajes de error amigables
  const getAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Este correo ya está en uso. Intenta iniciar sesión";
      case "auth/invalid-email":
        return "El correo electrónico no es válido";
      case "auth/weak-password":
        return "La contraseña es demasiado débil";
      case "auth/popup-closed-by-user":
        return "Ventana de inicio de sesión cerrada";
      default:
        return "Ocurrió un error al crear la cuenta";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Crea tu cuenta en ResidentLink
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Y comienza a gestionar tu condominio
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleEmailRegister}>
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
                  autoComplete="new-password"
                  required
                  className="pl-10"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar contraseña
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="pl-10"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              <UserRound className="h-5 w-5 mr-2" />
              Crear cuenta
            </Button>
          </div>
          
          <div className="flex items-center justify-center">
            <span className="text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-medium text-primary-700 hover:text-primary-500"
              >
                Inicia sesión aquí
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
              <span className="px-2 bg-gray-50 text-gray-500">O regístrate con</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleGoogleRegister}
              className="flex w-full justify-center items-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
              variant="outline"
            >
              <Google className="h-5 w-5 mr-2" />
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
