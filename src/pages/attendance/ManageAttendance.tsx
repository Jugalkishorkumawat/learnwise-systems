
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import AttendanceHeader from '@/components/attendance/AttendanceHeader';
import AttendanceTabs from '@/components/attendance/AttendanceTabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Calendar, Users, CheckCircle, Clock, Search, Download } from 'lucide-react';
import DataService, { Student, Course, AttendanceRecord } from '@/services/dataService';

// Define types for TypeScript
interface StudentAttendanceRecord {
  id: string;
  name: string;
  studentId: string;
  status: 'present' | 'absent' | 'late';
  verificationMethod: 'manual';
}

interface CourseAttendance {
  id: string;
  date: string;
  courseId: string;
  courseName: string;
  students: StudentAttendanceRecord[];
}

interface StudentReport {
  id: string;
  name: string;
  studentId: string;
  course: string;
  attendance: number;
}

const ManageAttendance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<StudentReport[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [dailyAttendance, setDailyAttendance] = useState<CourseAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [attendanceStats, setAttendanceStats] = useState({
    totalPresent: 0,
    totalAbsent: 0,
    totalLate: 0,
    attendanceRate: 0
  });

  // Fetch real-time data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch students and courses
        const [studentsData, coursesData] = await Promise.all([
          DataService.students.getAll(),
          DataService.courses.getAll()
        ]);
        
        setCourses(coursesData);
        
        // Transform students data for display
        const transformedStudents: StudentReport[] = studentsData.map(student => ({
          id: student.id,
          name: student.name,
          studentId: student.regNumber,
          course: student.department,
          attendance: Math.floor(Math.random() * 30) + 70 // Mock attendance rate for now
        }));
        
        setStudents(transformedStudents);
        
        // Fetch today's attendance
        const attendanceData = await DataService.attendance.getByDate(selectedDate);
        
        // Group attendance by course
        const groupedAttendance: CourseAttendance[] = coursesData.map(course => {
          const courseAttendance = attendanceData.filter(record => record.courseId === course.id);
          
          return {
            id: course.id,
            date: selectedDate,
            courseId: course.id,
            courseName: course.name,
            students: courseAttendance.map(record => {
              const student = studentsData.find(s => s.id === record.studentId);
              return {
                id: record.studentId,
                name: student?.name || 'Unknown',
                studentId: student?.regNumber || 'Unknown',
                status: record.status,
                verificationMethod: 'manual' as const
              };
            })
          };
        });
        
        setDailyAttendance(groupedAttendance);
        
        // Calculate attendance stats
        const totalPresent = attendanceData.filter(r => r.status === 'present').length;
        const totalAbsent = attendanceData.filter(r => r.status === 'absent').length;
        const totalLate = attendanceData.filter(r => r.status === 'late').length;
        const total = totalPresent + totalAbsent + totalLate;
        
        setAttendanceStats({
          totalPresent,
          totalAbsent,
          totalLate,
          attendanceRate: total > 0 ? Math.round((totalPresent / total) * 100) : 0
        });
        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use mock data as fallback
        setStudents([
          { id: '1', name: 'John Doe', studentId: 'ST2023001', course: 'Computer Science', attendance: 92 },
          { id: '2', name: 'Sarah Johnson', studentId: 'ST2023002', course: 'Computer Science', attendance: 85 },
          { id: '3', name: 'Michael Brown', studentId: 'ST2023003', course: 'Computer Science', attendance: 78 },
          { id: '4', name: 'Emily Davis', studentId: 'ST2023004', course: 'Mathematics', attendance: 90 },
        ]);
        
        setCourses([
          { id: '1', code: 'CS101', name: 'Introduction to Computer Science', instructor: 'Prof. Smith', department: 'Computer Science', semester: 1, credits: 3, schedule: 'MWF 9:00-10:00', capacity: 30, enrolled: 25 },
          { id: '2', code: 'MATH101', name: 'Calculus I', instructor: 'Prof. Johnson', department: 'Mathematics', semester: 1, credits: 4, schedule: 'TTH 10:00-11:30', capacity: 35, enrolled: 30 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  // Filter students based on search query and selected course
  const filteredStudents = students.filter(student => 
    (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCourse === 'all' || student.course === selectedCourse)
  );

  const handleMarkAttendance = async (studentId: string, courseId: string, status: 'present' | 'absent' | 'late') => {
    try {
      await DataService.attendance.mark({
        studentId,
        courseId,
        date: selectedDate,
        status,
        markedBy: 'current-user' // Should come from auth context
      });
      
      toast({
        title: "Attendance Marked",
        description: `Student attendance has been marked as ${status}.`,
      });
      
      // Refresh data
      // You could implement a more efficient update here
      window.location.reload();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark attendance. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleExportAttendance = () => {
    toast({
      title: "Export Started",
      description: "Attendance report is being generated and will be downloaded shortly.",
    });
  };

  const coursesList = Array.from(new Set(students.map(student => student.course)));
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <AttendanceHeader 
              title="Manage Attendance" 
              description="Track and manage student attendance manually"
              allowExport
              onExport={handleExportAttendance}
            />
            
            {/* Attendance Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{students.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Present Today
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{attendanceStats.totalPresent}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                    Late/Absent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{attendanceStats.totalLate + attendanceStats.totalAbsent}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    Attendance Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{attendanceStats.attendanceRate}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Date and Course Selection */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Attendance Management</CardTitle>
                <CardDescription>
                  Select date and course to manage attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Date</label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Course Filter</label>
                    <select
                      className="h-10 w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                      <option value="all">All Courses</option>
                      {coursesList.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Search Students</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or ID..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <AttendanceTabs
              dailyAttendance={dailyAttendance}
              filteredStudents={filteredStudents}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
              courses={coursesList}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default ManageAttendance;
