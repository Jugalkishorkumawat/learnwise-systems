
import React from "react";
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
import ComprehensiveDashboard from "./pages/ComprehensiveDashboard";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Feature Pages
import Attendance from "./pages/features/Attendance";

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
import AddStudent from "./pages/students/AddStudent";
import Payments from "./pages/payments/Payments";

// Staff Management
import Staff from "./pages/staff/Staff";

// Academic Management
import Timetable from "./pages/timetable/Timetable";

// Notice Board
import Notices from "./pages/notices/Notices";

// Facility Management
import Facilities from "./pages/facilities/Facilities";
import Library from "./pages/facilities/Library";
import Hostel from "./pages/facilities/Hostel";
import ExamResults from "./pages/facilities/ExamResults";

// Shared Pages
import Chatbot from "./pages/chatbot/Chatbot";
import PaymentGateway from "./pages/payments/PaymentGateway";
import StudentData from "./pages/students/StudentData";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <React.StrictMode>
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
                <Route path="/comprehensive-dashboard" element={<ComprehensiveDashboard />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Feature Pages */}
                <Route path="/features/attendance" element={<Attendance />} />
                
                {/* Student Routes */}
                <Route path="/attendance/view" element={<ViewAttendance />} />
                <Route path="/attendance/mark" element={<MarkAttendance />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/grades" element={<Grades />} />
                <Route path="/payments/student" element={<StudentPayments />} />
                <Route path="/payments/gateway" element={<PaymentGateway />} />
                <Route path="/student/data" element={<StudentData />} />
                
                {/* Teacher/Admin Routes */}
                <Route path="/attendance/manage" element={<ManageAttendance />} />
                <Route path="/students" element={<Students />} />
                <Route path="/students/add" element={<AddStudent />} />
                <Route path="/students/:id" element={<StudentProfile />} />
                <Route path="/students/:id/edit" element={<StudentProfile />} />
                <Route path="/payments" element={<Payments />} />
                
                {/* Staff Management Routes */}
                <Route path="/staff" element={<Staff />} />
                
                {/* Academic Management Routes */}
                <Route path="/timetable" element={<Timetable />} />
                
                {/* Notice Board Routes */}
                <Route path="/notices" element={<Notices />} />
                
                {/* Facility Management Routes */}
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/facilities/library" element={<Library />} />
                <Route path="/facilities/hostel" element={<Hostel />} />
                <Route path="/facilities/exams" element={<ExamResults />} />
                
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
  </React.StrictMode>
);

export default App;
