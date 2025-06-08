import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardOverviewPage from "./pages/DashboardOverviewPage";
import SalesAnalyticsPage from "./pages/SalesAnalyticsPage";
import CustomerInsightsPage from "./pages/CustomerInsightsPage";
import ProductPerformancePage from "./pages/ProductPerformancePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect base path to dashboard or define a separate landing page if needed */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={<DashboardOverviewPage />} />
          <Route path="/dashboard/sales" element={<SalesAnalyticsPage />} />
          <Route path="/dashboard/customers" element={<CustomerInsightsPage />} />
          <Route path="/dashboard/products" element={<ProductPerformancePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;