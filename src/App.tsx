
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import Mentors from "./pages/Mentors";
import Forums from "./pages/Forums";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import Learning from "./pages/Learning"; // Import the new Learning page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/forums" element={<Forums />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/learning" element={<Learning />} /> {/* Add Learning route */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
