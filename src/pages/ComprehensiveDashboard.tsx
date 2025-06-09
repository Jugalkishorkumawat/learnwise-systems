
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  FileText, 
  Bell, 
  GraduationCap,
  School,
  Bus,
  UserCheck,
  ClipboardList,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Plus,
  ArrowRight,
  Award,
  Video,
  Globe,
  MessageCircle,
  Search,
  TestTube,
  Clock,
  BookMarked,
  MapPin,
  HelpCircle,
  PenTool,
  Eye,
  Target,
  Settings,
  Calculator,
  Briefcase,
  Library,
  Monitor,
  Wallet,
  UserGraduate,
  Activity,
  Newspaper,
  PlayCircle,
  Shield,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

const ComprehensiveDashboard = () => {
  const navigate = useNavigate();
  const [announcements] = useState([
    { id: 1, title: "Mid-term Exams Schedule Released", type: "exam", urgent: true },
    { id: 2, title: "Library Timings Extended", type: "facility", urgent: false },
    { id: 3, title: "Fee Payment Reminder", type: "payment", urgent: true },
    { id: 4, title: "Sports Day Registration Open", type: "event", urgent: false },
  ]);

  const quickStats = [
    { label: "Total Students", value: "2,847", icon: Users, color: "text-blue-600", bg: "bg-blue-100", change: "+12%", trend: "up" },
    { label: "Total Staff", value: "156", icon: UserCheck, color: "text-green-600", bg: "bg-green-100", change: "+5%", trend: "up" },
    { label: "Active Courses", value: "48", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100", change: "+2", trend: "up" },
    { label: "Attendance Rate", value: "94.2%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100", change: "+2.1%", trend: "up" },
    { label: "Pending Fees", value: "₹2.4L", icon: CreditCard, color: "text-red-600", bg: "bg-red-100", change: "-15%", trend: "down" },
    { label: "Library Books", value: "12,456", icon: School, color: "text-indigo-600", bg: "bg-indigo-100", change: "+120", trend: "up" },
  ];

  const moduleCards = [
    // Academic & Learning
    { 
      title: "My Profile", 
      description: "View and manage personal profile information",
      icon: Users,
      route: "/profile",
      color: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
      bgGradient: "from-blue-50 to-blue-100"
    },
    { 
      title: "Academic Analysis", 
      description: "Detailed analysis of academic performance",
      icon: Search,
      route: "/academic-analysis",
      color: "border-cyan-200 hover:border-cyan-400 hover:shadow-cyan-100",
      bgGradient: "from-cyan-50 to-cyan-100"
    },
    { 
      title: "Results", 
      description: "View exam results and grade reports",
      icon: Award,
      route: "/results",
      color: "border-green-200 hover:border-green-400 hover:shadow-green-100",
      bgGradient: "from-green-50 to-green-100"
    },
    { 
      title: "Activity", 
      description: "Track academic and extracurricular activities",
      icon: Activity,
      route: "/activity",
      color: "border-orange-200 hover:border-orange-400 hover:shadow-orange-100",
      bgGradient: "from-orange-50 to-orange-100"
    },
    
    // Assignments & Tasks
    { 
      title: "Assignments", 
      description: "View and submit course assignments",
      icon: FileText,
      route: "/assignments",
      color: "border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    { 
      title: "Homeworks", 
      description: "Daily homework assignments and submissions",
      icon: BookMarked,
      route: "/homeworks",
      color: "border-teal-200 hover:border-teal-400 hover:shadow-teal-100",
      bgGradient: "from-teal-50 to-teal-100"
    },
    
    // Attendance & Scheduling
    { 
      title: "Attendance System", 
      description: "Track and manage student attendance",
      icon: ClipboardList,
      route: "/attendance/manage",
      color: "border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
      bgGradient: "from-purple-50 to-purple-100"
    },
    { 
      title: "College Calendar", 
      description: "Academic calendar and important dates",
      icon: Calendar,
      route: "/college-calendar",
      color: "border-red-200 hover:border-red-400 hover:shadow-red-100",
      bgGradient: "from-red-50 to-red-100"
    },
    { 
      title: "Timetable", 
      description: "Class schedules and time management",
      icon: Clock,
      route: "/timetable",
      color: "border-pink-200 hover:border-pink-400 hover:shadow-pink-100",
      bgGradient: "from-pink-50 to-pink-100"
    },
    
    // Financial & Administrative
    { 
      title: "Accounts", 
      description: "Fee payments and financial transactions",
      icon: CreditCard,
      route: "/accounts",
      color: "border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-100",
      bgGradient: "from-yellow-50 to-yellow-100"
    },
    { 
      title: "Wallet", 
      description: "Digital wallet for campus transactions",
      icon: Wallet,
      route: "/wallet",
      color: "border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    
    // Information & Communication
    { 
      title: "Centralized Info", 
      description: "Important announcements and notices",
      icon: Monitor,
      route: "/centralized-info",
      color: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
      bgGradient: "from-blue-50 to-blue-100"
    },
    { 
      title: "Circulars", 
      description: "Official circulars and communications",
      icon: Newspaper,
      route: "/circulars",
      color: "border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100",
      bgGradient: "from-indigo-50 to-indigo-100"
    },
    { 
      title: "Notice Board", 
      description: "Campus notices and announcements",
      icon: Bell,
      route: "/notices",
      color: "border-violet-200 hover:border-violet-400 hover:shadow-violet-100",
      bgGradient: "from-violet-50 to-violet-100"
    },
    
    // Academic Services
    { 
      title: "Certificate/Scholarship Request", 
      description: "Apply for certificates and scholarships",
      icon: Award,
      route: "/certificate-scholarship",
      color: "border-amber-200 hover:border-amber-400 hover:shadow-amber-100",
      bgGradient: "from-amber-50 to-amber-100"
    },
    { 
      title: "My Clubs", 
      description: "Join and manage club memberships",
      icon: Users,
      route: "/my-clubs",
      color: "border-rose-200 hover:border-rose-400 hover:shadow-rose-100",
      bgGradient: "from-rose-50 to-rose-100"
    },
    
    // Student Services
    { 
      title: "Counselling", 
      description: "Academic and career counselling services",
      icon: MessageCircle,
      route: "/counselling",
      color: "border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
      bgGradient: "from-purple-50 to-purple-100"
    },
    { 
      title: "Grievance", 
      description: "Submit and track grievances",
      icon: Shield,
      route: "/grievance",
      color: "border-red-200 hover:border-red-400 hover:shadow-red-100",
      bgGradient: "from-red-50 to-red-100"
    },
    
    // Academic Vision & Mission
    { 
      title: "Department Vision", 
      description: "Department vision and objectives",
      icon: Eye,
      route: "/department-vision",
      color: "border-sky-200 hover:border-sky-400 hover:shadow-sky-100",
      bgGradient: "from-sky-50 to-sky-100"
    },
    { 
      title: "Department Mission", 
      description: "Department mission and goals",
      icon: Target,
      route: "/department-mission",
      color: "border-cyan-200 hover:border-cyan-400 hover:shadow-cyan-100",
      bgGradient: "from-cyan-50 to-cyan-100"
    },
    
    // Digital Resources
    { 
      title: "Digital Library", 
      description: "Access digital books and resources",
      icon: Library,
      route: "/digital-library",
      color: "border-green-200 hover:border-green-400 hover:shadow-green-100",
      bgGradient: "from-green-50 to-green-100"
    },
    { 
      title: "Study Materials", 
      description: "Course materials and study resources",
      icon: BookOpen,
      route: "/study-materials",
      color: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
      bgGradient: "from-blue-50 to-blue-100"
    },
    { 
      title: "Tutorials", 
      description: "Video tutorials and learning content",
      icon: PlayCircle,
      route: "/tutorials",
      color: "border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
      bgGradient: "from-purple-50 to-purple-100"
    },
    
    // Administrative
    { 
      title: "Duty Leave", 
      description: "Apply for leave and manage requests",
      icon: Calendar,
      route: "/duty-leave",
      color: "border-orange-200 hover:border-orange-400 hover:shadow-orange-100",
      bgGradient: "from-orange-50 to-orange-100"
    },
    
    // Examinations
    { 
      title: "Exam Schedule", 
      description: "View examination timetable",
      icon: Clock,
      route: "/exam-schedule",
      color: "border-red-200 hover:border-red-400 hover:shadow-red-100",
      bgGradient: "from-red-50 to-red-100"
    },
    { 
      title: "Exam/Quiz", 
      description: "Take online exams and quizzes",
      icon: PenTool,
      route: "/exam-quiz",
      color: "border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-100",
      bgGradient: "from-yellow-50 to-yellow-100"
    },
    { 
      title: "Module Test", 
      description: "Module-wise testing and evaluation",
      icon: TestTube,
      route: "/module-test",
      color: "border-green-200 hover:border-green-400 hover:shadow-green-100",
      bgGradient: "from-green-50 to-green-100"
    },
    { 
      title: "Question Bank", 
      description: "Practice questions and test banks",
      icon: HelpCircle,
      route: "/question-bank",
      color: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
      bgGradient: "from-blue-50 to-blue-100"
    },
    { 
      title: "Series Exam", 
      description: "Semester series examinations",
      icon: BarChart3,
      route: "/series-exam",
      color: "border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100",
      bgGradient: "from-indigo-50 to-indigo-100"
    },
    { 
      title: "End Semester Examination", 
      description: "Final semester examinations",
      icon: GraduationCap,
      route: "/end-semester-exam",
      color: "border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
      bgGradient: "from-purple-50 to-purple-100"
    },
    
    // Laboratory & Practical
    { 
      title: "Laboratory", 
      description: "Lab schedules and practical work",
      icon: TestTube,
      route: "/laboratory",
      color: "border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    
    // Live & Online Learning
    { 
      title: "Live", 
      description: "Live streaming classes and events",
      icon: Video,
      route: "/live",
      color: "border-red-200 hover:border-red-400 hover:shadow-red-100",
      bgGradient: "from-red-50 to-red-100"
    },
    { 
      title: "Online Video Class", 
      description: "Recorded and live video lectures",
      icon: Monitor,
      route: "/online-video-class",
      color: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
      bgGradient: "from-blue-50 to-blue-100"
    },
    { 
      title: "Video Lectures", 
      description: "Educational video content library",
      icon: PlayCircle,
      route: "/video-lectures",
      color: "border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
      bgGradient: "from-purple-50 to-purple-100"
    },
    
    // MOOC & External Learning
    { 
      title: "MOOC Registration", 
      description: "Massive Open Online Course enrollment",
      icon: Globe,
      route: "/mooc-registration",
      color: "border-sky-200 hover:border-sky-400 hover:shadow-sky-100",
      bgGradient: "from-sky-50 to-sky-100"
    },
    
    // Career & Placement
    { 
      title: "Placements", 
      description: "Job placement and career opportunities",
      icon: Briefcase,
      route: "/placements",
      color: "border-green-200 hover:border-green-400 hover:shadow-green-100",
      bgGradient: "from-green-50 to-green-100"
    },
    
    // Registration & Enrollment
    { 
      title: "Semester Registration", 
      description: "Course registration for semester",
      icon: UserGraduate,
      route: "/semester-registration",
      color: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
      bgGradient: "from-blue-50 to-blue-100"
    },
    { 
      title: "Subject Registration", 
      description: "Individual subject enrollment",
      icon: BookOpen,
      route: "/subject-registration",
      color: "border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100",
      bgGradient: "from-indigo-50 to-indigo-100"
    },
    
    // Academic Programs
    { 
      title: "Program Outcomes", 
      description: "Academic program learning outcomes",
      icon: Target,
      route: "/program-outcomes",
      color: "border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    { 
      title: "Subject", 
      description: "Subject details and curriculum",
      icon: BookOpen,
      route: "/subject",
      color: "border-teal-200 hover:border-teal-400 hover:shadow-teal-100",
      bgGradient: "from-teal-50 to-teal-100"
    },
    
    // Feedback & Evaluation
    { 
      title: "Survey", 
      description: "Participate in surveys and feedback",
      icon: BarChart3,
      route: "/survey",
      color: "border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-100",
      bgGradient: "from-yellow-50 to-yellow-100"
    },
    { 
      title: "Remarks", 
      description: "Teacher remarks and feedback",
      icon: MessageCircle,
      route: "/remarks",
      color: "border-pink-200 hover:border-pink-400 hover:shadow-pink-100",
      bgGradient: "from-pink-50 to-pink-100"
    },
    
    // Staff & Faculty
    { 
      title: "Teacher", 
      description: "Faculty profiles and information",
      icon: UserCheck,
      route: "/teacher",
      color: "border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
      bgGradient: "from-purple-50 to-purple-100"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-3 sm:px-4 lg:px-6 xl:px-8 py-4 lg:py-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 lg:mb-6"
            >
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Comprehensive Education Management System
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base mt-1 lg:mt-2">
                Complete academic management with all essential features
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-4 lg:mb-6"
            >
              {quickStats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-2 sm:p-3 lg:p-4 hover:shadow-lg transition-all duration-300 group border-0 bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                        <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                          <stat.icon className={`h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 ${stat.color}`} />
                        </div>
                        <div>
                          <p className="text-xs lg:text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-sm sm:text-base lg:text-xl font-semibold">{stat.value}</p>
                          <div className={`flex items-center text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.trend === 'up' ? '↗' : '↘'} {stat.change}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions & Announcements */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 lg:gap-4 mb-4 lg:mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="xl:col-span-2"
              >
                <Card className="h-full border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2 sm:pb-3">
                    <CardTitle className="flex items-center text-base sm:text-lg lg:text-xl">
                      <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {[
                        { label: "Add Student", icon: Users, route: "/students/add" },
                        { label: "Mark Attendance", icon: ClipboardList, route: "/attendance/mark" },
                        { label: "Fee Collection", icon: CreditCard, route: "/payments" },
                        { label: "Add Notice", icon: Bell, route: "/notices" }
                      ].map((action, index) => (
                        <motion.div
                          key={action.label}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            variant="outline" 
                            className="w-full h-auto p-2 sm:p-3 lg:p-4 flex flex-col items-center space-y-1 sm:space-y-2 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                            onClick={() => navigate(action.route)}
                          >
                            <action.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                            <span className="text-xs sm:text-sm lg:text-sm font-medium text-center">{action.label}</span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="h-full border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-2 sm:pb-3">
                    <CardTitle className="flex items-center text-base sm:text-lg lg:text-xl">
                      <Bell className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      Recent Announcements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 sm:space-y-3">
                    {announcements.map((announcement, index) => (
                      <motion.div 
                        key={announcement.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                          {announcement.urgent ? (
                            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 animate-pulse" />
                          ) : (
                            <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium truncate group-hover:text-primary transition-colors">
                            {announcement.title}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="text-xs">
                              {announcement.type}
                            </Badge>
                            <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* All Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg lg:text-xl">Complete Education Management Features</CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground">Access all system features and services</p>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4"
                  >
                    {moduleCards.map((module, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer"
                        onClick={() => navigate(module.route)}
                      >
                        <Card className={`h-full transition-all duration-300 border-2 ${module.color} hover:shadow-xl group overflow-hidden`}>
                          <div className={`absolute inset-0 bg-gradient-to-br ${module.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                          <CardContent className="p-3 sm:p-4 lg:p-5 relative z-10">
                            <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                              <div className="p-1.5 sm:p-2 lg:p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                <module.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-xs sm:text-sm lg:text-base group-hover:text-primary transition-colors truncate">
                                  {module.title}
                                </h3>
                              </div>
                              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                            </div>
                            <p className="text-xs lg:text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                              {module.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default ComprehensiveDashboard;
