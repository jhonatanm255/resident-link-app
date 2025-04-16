import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import HomePage from "./pages/HomePage";
import CondominiumsPage from "./pages/CondominiumsPage";
import CondominiumDetailPage from "./pages/CondominiumDetailPage";
import CondominiumFormPage from "./pages/CondominiumFormPage";
import ApartmentFormPage from "./pages/ApartmentFormPage";
import ApartmentDetailPage from "./pages/ApartmentDetailPage";
import SharePage from "./pages/SharePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/condominiums" element={<CondominiumsPage />} />
            <Route path="/condominiums/new" element={<CondominiumFormPage />} />
            <Route path="/condominiums/:id" element={<CondominiumDetailPage />} />
            <Route path="/condominiums/:id/edit" element={<CondominiumFormPage />} />
            <Route path="/condominiums/:condominiumId/apartments/new" element={<ApartmentFormPage />} />
            <Route path="/condominiums/:condominiumId/apartments/:apartmentId" element={<ApartmentDetailPage />} />
            <Route path="/condominiums/:condominiumId/apartments/:apartmentId/edit" element={<ApartmentFormPage />} />
            <Route path="/share" element={<SharePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
