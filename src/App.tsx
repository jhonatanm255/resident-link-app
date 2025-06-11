
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { VisitProvider } from "@/contexts/VisitContext";
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
import CommitteePage from "./pages/CommitteePage";

// Admin Pages
import UsersPage from "./pages/admin/UsersPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import MeasurementsPage from "./pages/admin/MeasurementsPage";
import ProvidersPage from "./pages/admin/ProvidersPage";
import NotificationsPage from "./pages/admin/NotificationsPage";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppProvider>
              <VisitProvider>
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
                  <Route path="/committee" element={
                    <ProtectedRoute>
                      <CommitteePage />
                    </ProtectedRoute>
                  } />
                  
                  {/* Rutas administrativas */}
                  <Route path="/admin/users" element={
                    <ProtectedRoute>
                      <UsersPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/payments" element={
                    <ProtectedRoute>
                      <PaymentsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/measurements" element={
                    <ProtectedRoute>
                      <MeasurementsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/providers" element={
                    <ProtectedRoute>
                      <ProvidersPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/notifications" element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/settings" element={
                    <ProtectedRoute>
                      <SettingsPage />
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
              </VisitProvider>
            </AppProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
