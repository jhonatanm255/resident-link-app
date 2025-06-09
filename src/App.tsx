
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ResidentsPage from "./pages/ResidentsPage";
import ConciergePage from "./pages/ConciergePage";
import CondominiumsPage from "./pages/CondominiumsPage";
import CondominiumDetailPage from "./pages/CondominiumDetailPage";
import CondominiumFormPage from "./pages/CondominiumFormPage";
import ApartmentFormPage from "./pages/ApartmentFormPage";
import ApartmentDetailPage from "./pages/ApartmentDetailPage";
import SharePage from "./pages/SharePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppProvider>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Rutas protegidas */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              
              {/* Secciones principales */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
              <Route path="/residents" element={
                <ProtectedRoute>
                  <ResidentsPage />
                </ProtectedRoute>
              } />
              <Route path="/concierge" element={
                <ProtectedRoute>
                  <ConciergePage />
                </ProtectedRoute>
              } />
              
              {/* Rutas existentes */}
              <Route path="/home" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path="/condominiums" element={
                <ProtectedRoute>
                  <CondominiumsPage />
                </ProtectedRoute>
              } />
              <Route path="/condominiums/new" element={
                <ProtectedRoute>
                  <CondominiumFormPage />
                </ProtectedRoute>
              } />
              <Route path="/condominiums/:id" element={
                <ProtectedRoute>
                  <CondominiumDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/condominiums/:id/edit" element={
                <ProtectedRoute>
                  <CondominiumFormPage />
                </ProtectedRoute>
              } />
              <Route path="/condominiums/:condominiumId/apartments/new" element={
                <ProtectedRoute>
                  <ApartmentFormPage />
                </ProtectedRoute>
              } />
              <Route path="/condominiums/:condominiumId/apartments/:apartmentId" element={
                <ProtectedRoute>
                  <ApartmentDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/condominiums/:condominiumId/apartments/:apartmentId/edit" element={
                <ProtectedRoute>
                  <ApartmentFormPage />
                </ProtectedRoute>
              } />
              <Route path="/share" element={
                <ProtectedRoute>
                  <SharePage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
