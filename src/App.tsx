import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import FormPage from "./pages/FormPage";
import FullStackPlayground from "./pages/FullStackPlayground";
import { supabase } from './lib/supabaseClient';
import SignIn from './pages/SignIn';
import { useEffect, useState } from 'react';
import Services from "./pages/Services";

const queryClient = new QueryClient();

const RequireAuth = ({ children }) => {
  const [session, setSession] = useState(undefined);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);
  if (session === undefined) return null; // loading
  if (!session) return <Navigate to="/signin" replace />;
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/get-started" element={<FormPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/fullstack-playground" element={
            <RequireAuth>
              <FullStackPlayground />
            </RequireAuth>
          } />
          <Route path="/services" element={<Services />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
