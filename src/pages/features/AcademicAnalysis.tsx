
import { motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Award,
  BookOpen,
  Target,
  Calendar
} from 'lucide-react';

const AcademicAnalysis = () => {
  const performanceData = [
    { subject: "Mathematics", score: 85, trend: "up", color: "bg-green-500" },
    { subject: "Physics", score: 78, trend: "up", color: "bg-blue-500" },
    { subject: "Chemistry", score: 82, trend: "down", color: "bg-yellow-500" },
    { subject: "Computer Science", score: 92, trend: "up", color: "bg-purple-500" },
    { subject: "English", score: 76, trend: "stable", color: "bg-gray-500" }
  ];

  const analytics = [
    { label: "Overall GPA", value: "8.4", icon: Award, color: "text-green-600" },
    { label: "Class Rank", value: "12/150", icon: Target, color: "text-blue-600" },
    { label: "Attendance", value: "94%", icon: Calendar, color: "text-purple-600" },
    { label: "Subjects Passed", value: "18/20", icon: BookOpen, color: "text-orange-600" }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-6">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Academic Analysis</h1>
              <p className="text-muted-foreground">Comprehensive analysis of your academic performance</p>
            </motion.div>

            {/* Analytics Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              {analytics.map((stat, index) => (
                <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Subject Performance */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Subject Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {performanceData.map((subject, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                          <span className="font-medium">{subject.subject}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{subject.score}%</span>
                          <div className="flex items-center">
                            {subject.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                            {subject.trend === 'down' && <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />}
                            {subject.trend === 'stable' && <Activity className="h-4 w-4 text-gray-500" />}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Performance Insights */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Performance Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-800">Strengths</span>
                      </div>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Excellent performance in Computer Science</li>
                        <li>• Consistent improvement in Mathematics</li>
                        <li>• Good attendance record</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">Areas for Improvement</span>
                      </div>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Focus more on English communication</li>
                        <li>• Chemistry concepts need reinforcement</li>
                        <li>• Time management in exams</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">Recommendations</span>
                      </div>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Join study groups for weak subjects</li>
                        <li>• Practice more sample papers</li>
                        <li>• Consult subject teachers regularly</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default AcademicAnalysis;
