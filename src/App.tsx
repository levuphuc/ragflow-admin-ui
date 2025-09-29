import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Datasets from "./pages/Datasets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          } />
          <Route path="/datasets" element={
            <AdminLayout>
              <Datasets />
            </AdminLayout>
          } />
          {/* Placeholder routes for other modules */}
          <Route path="/files" element={
            <AdminLayout>
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Files module đang phát triển...</p>
              </div>
            </AdminLayout>
          } />
          <Route path="/chatbots" element={
            <AdminLayout>
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Chatbots module đang phát triển...</p>
              </div>
            </AdminLayout>
          } />
          <Route path="/agents" element={
            <AdminLayout>
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Agents module đang phát triển...</p>
              </div>
            </AdminLayout>
          } />
          <Route path="/models" element={
            <AdminLayout>
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Models module đang phát triển...</p>
              </div>
            </AdminLayout>
          } />
          <Route path="/team" element={
            <AdminLayout>
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Team module đang phát triển...</p>
              </div>
            </AdminLayout>
          } />
          <Route path="/chat-logs" element={
            <AdminLayout>
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Chat Logs module đang phát triển...</p>
              </div>
            </AdminLayout>
          } />
          <Route path="/search-tester" element={
            <AdminLayout>
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Search Tester module đang phát triển...</p>
              </div>
            </AdminLayout>
          } />
          <Route path="/monitoring" element={
            <AdminLayout>
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Monitoring module đang phát triển...</p>
              </div>
            </AdminLayout>
          } />
          <Route path="/tracing" element={
            <AdminLayout>
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">Tracing module đang phát triển...</p>
              </div>
            </AdminLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
