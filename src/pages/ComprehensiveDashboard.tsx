
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
  CheckCircle
} from 'lucide-react';

const ComprehensiveDashboard = () => {
  const navigate = useNavigate();
  const [announcements] = useState([
    { id: 1, title: "Mid-term Exams Schedule Released", type: "exam", urgent: true },
    { id: 2, title: "Library Timings Extended", type: "facility", urgent: false },
    { id: 3, title: "Fee Payment Reminder", type: "payment", urgent: true },
    { id: 4, title: "Sports Day Registration Open", type: "event", urgent: false },
  ]);

  const quickStats = [
    { label: "Total Students", value: "2,847", icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Total Staff", value: "156", icon: UserCheck, color: "text-green-600", bg: "bg-green-100" },
    { label: "Active Courses", value: "48", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Attendance Rate", value: "94.2%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Pending Fees", value: "₹2.4L", icon: CreditCard, color: "text-red-600", bg: "bg-red-100" },
    { label: "Library Books", value: "12,456", icon: School, color: "text-indigo-600", bg: "bg-indigo-100" },
  ];

  const moduleCards = [
    { 
      title: "Student Management", 
      description: "Manage student profiles, admissions, and records",
      icon: Users,
      route: "/students",
      color: "border-blue-200 hover:border-blue-400"
    },
    { 
      title: "Staff Management", 
      description: "Manage teachers, staff, and their schedules",
      icon: UserCheck,
      route: "/staff",
      color: "border-green-200 hover:border-green-400"
    },
    { 
      title: "Attendance System", 
      description: "Track and manage student attendance",
      icon: ClipboardList,
      route: "/attendance/manage",
      color: "border-purple-200 hover:border-purple-400"
    },
    { 
      title: "Academic Management", 
      description: "Courses, timetables, and academic planning",
      icon: BookOpen,
      route: "/academics",
      color: "border-emerald-200 hover:border-emerald-400"
    },
    { 
      title: "Examination System", 
      description: "Manage exams, results, and grading",
      icon: FileText,
      route: "/examinations",
      color: "border-orange-200 hover:border-orange-400"
    },
    { 
      title: "Fee Management", 
      description: "Handle fee collection and payment tracking",
      icon: CreditCard,
      route: "/payments",
      color: "border-red-200 hover:border-red-400"
    },
    { 
      title: "Library System", 
      description: "Manage books, issues, and library resources",
      icon: School,
      route: "/facilities/library",
      color: "border-indigo-200 hover:border-indigo-400"
    },
    { 
      title: "Transport System", 
      description: "Manage buses, routes, and transport",
      icon: Bus,
      route: "/transport",
      color: "border-yellow-200 hover:border-yellow-400"
    },
    { 
      title: "Timetable Management", 
      description: "Create and manage class schedules",
      icon: Calendar,
      route: "/timetable",
      color: "border-pink-200 hover:border-pink-400"
    },
    { 
      title: "Reports & Analytics", 
      description: "Generate reports and view analytics",
      icon: TrendingUp,
      route: "/reports",
      color: "border-cyan-200 hover:border-cyan-400"
    },
    { 
      title: "Notice Board", 
      description: "Manage announcements and notices",
      icon: Bell,
      route: "/notices",
      color: "border-violet-200 hover:border-violet-400"
    },
    { 
      title: "Hostel Management", 
      description: "Manage hostel rooms and residents",
      icon: GraduationCap,
      route: "/facilities/hostel",
      color: "border-teal-200 hover:border-teal-400"
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">School Management Dashboard</h1>
              <p className="text-muted-foreground">Comprehensive school management system</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {quickStats.map((stat, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-semibold">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions & Announcements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button variant="outline" onClick={() => navigate('/students/add')}>
                      <Users className="mr-2 h-4 w-4" />
                      Add Student
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/attendance/mark')}>
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Mark Attendance
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/payments')}>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Fee Collection
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/notices')}>
                      <Bell className="mr-2 h-4 w-4" />
                      Add Notice
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-4 w-4" />
                    Recent Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="flex items-start space-x-3 p-2 rounded-lg bg-secondary/50">
                      <div className="flex-shrink-0">
                        {announcement.urgent ? (
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                        ) : (
                          <Bell className="h-4 w-4 text-blue-500 mt-0.5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{announcement.title}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {announcement.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Modules */}
            <Card>
              <CardHeader>
                <CardTitle>School Management Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {moduleCards.map((module, index) => (
                    <Card 
                      key={index} 
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${module.color}`}
                      onClick={() => navigate(module.route)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <module.icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="font-semibold text-sm">{module.title}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground">{module.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default ComprehensiveDashboard;
