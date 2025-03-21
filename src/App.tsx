
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Student Pages
import ViewAttendance from "./pages/attendance/ViewAttendance";
import MarkAttendance from "./pages/attendance/MarkAttendance";
import Courses from "./pages/courses/Courses";
import Grades from "./pages/grades/Grades";
import StudentPayments from "./pages/payments/StudentPayments";

// Teacher Pages
import ManageAttendance from "./pages/attendance/ManageAttendance";
import Students from "./pages/students/Students";
import StudentProfile from "./pages/students/StudentProfile";
import Payments from "./pages/payments/Payments";
import Facilities from "./pages/facilities/Facilities";

// Shared Pages
import Chatbot from "./pages/chatbot/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Student Routes */}
              <Route path="/attendance/view" element={<ViewAttendance />} />
              <Route path="/attendance/mark" element={<MarkAttendance />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/grades" element={<Grades />} />
              <Route path="/payments/student" element={<StudentPayments />} />
              
              {/* Teacher/Admin Routes */}
              <Route path="/attendance/manage" element={<ManageAttendance />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/:id" element={<StudentProfile />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/facilities" element={<Facilities />} />
              
              {/* Shared Routes */}
              <Route path="/chatbot" element={<Chatbot />} />
              
              {/* Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
