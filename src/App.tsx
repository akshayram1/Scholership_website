import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Scholarships from "./pages/Scholarships";
import Schemes from "./pages/Schemes";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ScholarshipRecommendation from "./pages/ScholarshipRecommendation"; // Import the ScholarshipRecommendation page
import ScholarshipAISearch from "./pages/ScholarshipAISearch"; // Update this import path
import { Chatbot } from "@/components/ui/chatbot"; // Import the Chatbot component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scholarship-recommendation" element={<ScholarshipRecommendation />} />
            <Route path="/ScholarshipAISearch" element={<ScholarshipAISearch />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        {/* Render the Chatbot component globally */}
        <Chatbot />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;