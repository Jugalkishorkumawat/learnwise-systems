
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

// New Feature Pages - Academic & Learning
import Profile from "./pages/features/Profile";
import AcademicAnalysis from "./pages/features/AcademicAnalysis";
import Results from "./pages/features/Results";
import Activity from "./pages/features/Activity";
import Assignments from "./pages/features/Assignments";
import Homeworks from "./pages/features/Homeworks";

// Calendar & Scheduling
import CollegeCalendar from "./pages/features/CollegeCalendar";

// Financial
import Accounts from "./pages/features/Accounts";
import Wallet from "./pages/features/Wallet";

// Information & Communication
import CentralizedInfo from "./pages/features/CentralizedInfo";
import Circulars from "./pages/features/Circulars";

// Academic Services
import CertificateScholarship from "./pages/features/CertificateScholarship";
import MyClubs from "./pages/features/MyClubs";

// Student Services
import Counselling from "./pages/features/Counselling";
import Grievance from "./pages/features/Grievance";

// Vision & Mission
import DepartmentVision from "./pages/features/DepartmentVision";
import DepartmentMission from "./pages/features/DepartmentMission";

// Digital Resources
import DigitalLibrary from "./pages/features/DigitalLibrary";
import StudyMaterials from "./pages/features/StudyMaterials";
import Tutorials from "./pages/features/Tutorials";

// Administrative
import DutyLeave from "./pages/features/DutyLeave";

// Examinations
import ExamSchedule from "./pages/features/ExamSchedule";
import ExamQuiz from "./pages/features/ExamQuiz";
import ModuleTest from "./pages/features/ModuleTest";
import QuestionBank from "./pages/features/QuestionBank";
import SeriesExam from "./pages/features/SeriesExam";
import EndSemesterExam from "./pages/features/EndSemesterExam";

// Laboratory
import Laboratory from "./pages/features/Laboratory";

// Live & Online Learning
import Live from "./pages/features/Live";
import OnlineVideoClass from "./pages/features/OnlineVideoClass";
import VideoLectures from "./pages/features/VideoLectures";

// MOOC
import MoocRegistration from "./pages/features/MoocRegistration";

// Career
import Placements from "./pages/features/Placements";

// Registration
import SemesterRegistration from "./pages/features/SemesterRegistration";
import SubjectRegistration from "./pages/features/SubjectRegistration";

// Academic Programs
import ProgramOutcomes from "./pages/features/ProgramOutcomes";
import Subject from "./pages/features/Subject";

// Feedback
import Survey from "./pages/features/Survey";
import Remarks from "./pages/features/Remarks";

// Staff
import Teacher from "./pages/features/Teacher";

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
                
                {/* New Feature Routes - Academic & Learning */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/academic-analysis" element={<AcademicAnalysis />} />
                <Route path="/results" element={<Results />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/homeworks" element={<Homeworks />} />
                
                {/* Calendar & Scheduling */}
                <Route path="/college-calendar" element={<CollegeCalendar />} />
                
                {/* Financial */}
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/wallet" element={<Wallet />} />
                
                {/* Information & Communication */}
                <Route path="/centralized-info" element={<CentralizedInfo />} />
                <Route path="/circulars" element={<Circulars />} />
                
                {/* Academic Services */}
                <Route path="/certificate-scholarship" element={<CertificateScholarship />} />
                <Route path="/my-clubs" element={<MyClubs />} />
                
                {/* Student Services */}
                <Route path="/counselling" element={<Counselling />} />
                <Route path="/grievance" element={<Grievance />} />
                
                {/* Vision & Mission */}
                <Route path="/department-vision" element={<DepartmentVision />} />
                <Route path="/department-mission" element={<DepartmentMission />} />
                
                {/* Digital Resources */}
                <Route path="/digital-library" element={<DigitalLibrary />} />
                <Route path="/study-materials" element={<StudyMaterials />} />
                <Route path="/tutorials" element={<Tutorials />} />
                
                {/* Administrative */}
                <Route path="/duty-leave" element={<DutyLeave />} />
                
                {/* Examinations */}
                <Route path="/exam-schedule" element={<ExamSchedule />} />
                <Route path="/exam-quiz" element={<ExamQuiz />} />
                <Route path="/module-test" element={<ModuleTest />} />
                <Route path="/question-bank" element={<QuestionBank />} />
                <Route path="/series-exam" element={<SeriesExam />} />
                <Route path="/end-semester-exam" element={<EndSemesterExam />} />
                
                {/* Laboratory */}
                <Route path="/laboratory" element={<Laboratory />} />
                
                {/* Live & Online Learning */}
                <Route path="/live" element={<Live />} />
                <Route path="/online-video-class" element={<OnlineVideoClass />} />
                <Route path="/video-lectures" element={<VideoLectures />} />
                
                {/* MOOC */}
                <Route path="/mooc-registration" element={<MoocRegistration />} />
                
                {/* Career */}
                <Route path="/placements" element={<Placements />} />
                
                {/* Registration */}
                <Route path="/semester-registration" element={<SemesterRegistration />} />
                <Route path="/subject-registration" element={<SubjectRegistration />} />
                
                {/* Academic Programs */}
                <Route path="/program-outcomes" element={<ProgramOutcomes />} />
                <Route path="/subject" element={<Subject />} />
                
                {/* Feedback */}
                <Route path="/survey" element={<Survey />} />
                <Route path="/remarks" element={<Remarks />} />
                
                {/* Staff */}
                <Route path="/teacher" element={<Teacher />} />
                
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
