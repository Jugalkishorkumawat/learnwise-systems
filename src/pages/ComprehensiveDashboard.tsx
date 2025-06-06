
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
  ArrowRight
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
    { 
      title: "Student Management", 
      description: "Manage student profiles, admissions, and records",
      icon: Users,
      route: "/students",
      color: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
      bgGradient: "from-blue-50 to-blue-100"
    },
    { 
      title: "Staff Management", 
      description: "Manage teachers, staff, and their schedules",
      icon: UserCheck,
      route: "/staff",
      color: "border-green-200 hover:border-green-400 hover:shadow-green-100",
      bgGradient: "from-green-50 to-green-100"
    },
    { 
      title: "Attendance System", 
      description: "Track and manage student attendance",
      icon: ClipboardList,
      route: "/attendance/manage",
      color: "border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
      bgGradient: "from-purple-50 to-purple-100"
    },
    { 
      title: "Academic Management", 
      description: "Courses, timetables, and academic planning",
      icon: BookOpen,
      route: "/academics",
      color: "border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100",
      bgGradient: "from-emerald-50 to-emerald-100"
    },
    { 
      title: "Examination System", 
      description: "Manage exams, results, and grading",
      icon: FileText,
      route: "/examinations",
      color: "border-orange-200 hover:border-orange-400 hover:shadow-orange-100",
      bgGradient: "from-orange-50 to-orange-100"
    },
    { 
      title: "Fee Management", 
      description: "Handle fee collection and payment tracking",
      icon: CreditCard,
      route: "/payments",
      color: "border-red-200 hover:border-red-400 hover:shadow-red-100",
      bgGradient: "from-red-50 to-red-100"
    },
    { 
      title: "Library System", 
      description: "Manage books, issues, and library resources",
      icon: School,
      route: "/facilities/library",
      color: "border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100",
      bgGradient: "from-indigo-50 to-indigo-100"
    },
    { 
      title: "Transport System", 
      description: "Manage buses, routes, and transport",
      icon: Bus,
      route: "/transport",
      color: "border-yellow-200 hover:border-yellow-400 hover:shadow-yellow-100",
      bgGradient: "from-yellow-50 to-yellow-100"
    },
    { 
      title: "Timetable Management", 
      description: "Create and manage class schedules",
      icon: Calendar,
      route: "/timetable",
      color: "border-pink-200 hover:border-pink-400 hover:shadow-pink-100",
      bgGradient: "from-pink-50 to-pink-100"
    },
    { 
      title: "Reports & Analytics", 
      description: "Generate reports and view analytics",
      icon: TrendingUp,
      route: "/reports",
      color: "border-cyan-200 hover:border-cyan-400 hover:shadow-cyan-100",
      bgGradient: "from-cyan-50 to-cyan-100"
    },
    { 
      title: "Notice Board", 
      description: "Manage announcements and notices",
      icon: Bell,
      route: "/notices",
      color: "border-violet-200 hover:border-violet-400 hover:shadow-violet-100",
      bgGradient: "from-violet-50 to-violet-100"
    },
    { 
      title: "Hostel Management", 
      description: "Manage hostel rooms and residents",
      icon: GraduationCap,
      route: "/facilities/hostel",
      color: "border-teal-200 hover:border-teal-400 hover:shadow-teal-100",
      bgGradient: "from-teal-50 to-teal-100"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 lg:mb-8"
            >
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                School Management Dashboard
              </h1>
              <p className="text-muted-foreground text-sm lg:text-base mt-2">
                Comprehensive school management system with real-time insights
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4 mb-6 lg:mb-8"
            >
              {quickStats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-3 lg:p-4 hover:shadow-lg transition-all duration-300 group border-0 bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <div className={`p-2 rounded-lg ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                          <stat.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${stat.color}`} />
                        </div>
                        <div>
                          <p className="text-xs lg:text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-lg lg:text-xl font-semibold">{stat.value}</p>
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
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="xl:col-span-2"
              >
                <Card className="h-full border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg lg:text-xl">
                      <Plus className="mr-2 h-5 w-5 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { label: "Add Student", icon: Users, route: "/students/add" },
                        { label: "Mark Attendance", icon: ClipboardList, route: "/attendance/mark" },
                        { label: "Fee Collection", icon: CreditCard, route: "/payments" },
                        { label: "Add Notice", icon: Bell, route: "/notices" }
                      ].map((action, index) => (
                        <motion.div
                          key={action.label}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            variant="outline" 
                            className="w-full h-auto p-3 lg:p-4 flex flex-col items-center space-y-2 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                            onClick={() => navigate(action.route)}
                          >
                            <action.icon className="h-5 w-5 lg:h-6 lg:w-6" />
                            <span className="text-xs lg:text-sm font-medium">{action.label}</span>
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
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center text-lg lg:text-xl">
                      <Bell className="mr-2 h-5 w-5 text-primary" />
                      Recent Announcements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {announcements.map((announcement, index) => (
                      <motion.div 
                        key={announcement.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {announcement.urgent ? (
                            <AlertCircle className="h-4 w-4 text-red-500 animate-pulse" />
                          ) : (
                            <Bell className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                            {announcement.title}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="text-xs">
                              {announcement.type}
                            </Badge>
                            <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Modules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg lg:text-xl">School Management Modules</CardTitle>
                  <p className="text-sm text-muted-foreground">Access all system features from here</p>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
                  >
                    {moduleCards.map((module, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer"
                        onClick={() => navigate(module.route)}
                      >
                        <Card className={`h-full transition-all duration-300 border-2 ${module.color} hover:shadow-xl group overflow-hidden`}>
                          <div className={`absolute inset-0 bg-gradient-to-br ${module.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                          <CardContent className="p-4 lg:p-6 relative z-10">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="p-2 lg:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                <module.icon className="h-6 w-6 lg:h-7 lg:w-7 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-sm lg:text-base group-hover:text-primary transition-colors">
                                  {module.title}
                                </h3>
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                            <p className="text-xs lg:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
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
